import React, { useState, useEffect } from 'react';
import S3 from 'aws-s3-reactjs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {DropzoneDialog} from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ENDPOINT = process.env.REACT_APP_PROPERTY_ENDPOINT;

const useStyles = makeStyles((theme) => ({
    img: {
        '& img': {
            width: theme.spacing(21),
            marginRight: theme.spacing(1)
        }
    },
    btnCtrl: {
        marginBottom: theme.spacing(2)
    }
}))
 
const FileUpload = ({property}) => {

    const [openModal, setOpenModal] = useState(false);
    const [uploadedFile, setUploadedFile] = useState([false, ""]);
    const [imagePaths, setImagePaths] = useState([]);

    useEffect(() => {
        fetch(ENDPOINT.concat(property), {
            method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
            console.log('[FETCH IMAGE PATHS]', data);
            setImagePaths(data.images);
        }, (err) => {
            console.log('[ERROR FETCHING PATHS]', err);
        })
    }, []);

    const handleSubmit = (files) => {
        for (let i = 0; i < files.length; i++) {
            let fileName = files[i].name;
            let propertyId = parseInt(property);
            let updateDBBody = {id: propertyId, file: fileName};
            console.log('[EVENT BODY]', updateDBBody);
            ReactS3Client
            .uploadFile(files[i], fileName)
            .then(data => {
                showUploadedFileMsg("success");
                try {
                    fetch(ENDPOINT, {
                        method: 'PUT',
                        body: JSON.stringify(updateDBBody)
                    })
                    .then(response => response.json(), (err) => console.log('[RESPONSE]', err))
                    .then(data => console.log('[IMAGE PATHS UPDATED]', data), (err) => 
                        console.log('[ERROR ADDING IMG PATH]', err)
                    );
                } catch (err) {
                    console.log('[FETCH ERROR]', err);
                }
                console.log('[FILE UPLOAD]', data);
            })
            .catch(err => {
                showUploadedFileMsg("error");
                console.error('[FILE UPLOAD]', err)
            })
        }
        toggleModal();
    }

    const showUploadedFileMsg = (res) => {
        setUploadedFile([true, res]);
        setTimeout(() => {
            setUploadedFile([false, ""]);
        }, 5000);
    }

    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        dirName: `images/properties/${property}`,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        s3Url: process.env.REACT_APP_S3_URL
    }

    const classes = useStyles();
     
    const ReactS3Client = new S3(config);

    return (
        <div>
            <div className={classes.img}>
            {imagePaths.map(path => 
                <img src={`${process.env.REACT_APP_S3_URL}images/properties/${property}/${path}`} />
            )
            }
            </div>
            <Button
            size="small"
            className={classes.btnCtrl}
            onClick={toggleModal}
            variant="contained">
              <Typography variant="caption" component="p">+ Add Media</Typography>
            </Button>
            <DropzoneDialog
                open={openModal}
                onClose={toggleModal}
                onSave={(files) => handleSubmit(files)}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
            />
            <Snackbar open={uploadedFile[0]} autoHideDuration={5000}>
                {uploadedFile[1] === "success" ?
                    <Alert severity="success">
                        File(s) uploaded successfully! Refresh to see updates
                    </Alert> : uploadedFile[1] === "error" ?
                    <Alert severity="error">
                        Could not upload files. Please try again later.
                    </Alert> : null
                }
            </Snackbar>
        </div>
    )
}

export default FileUpload;