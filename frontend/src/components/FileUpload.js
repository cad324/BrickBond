import React, {useState} from 'react';
import S3 from 'aws-s3-reactjs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 
const FileUpload = ({property}) => {

    const [files, setFiles] = useState([]);
    const [uploadedFile, setUploadedFile] = useState([false, ""])

    const handleUpload = e => {
        console.log('[FILES]', e);
        setFiles(e);
    }

    const handleSubmit = () => {
        console.log('[FILES STATE]', files);
        for (let i = 0; i < files.length; i++) {
            ReactS3Client
            .uploadFile(files[i], files[i].name)
            .then(data => {
                showUploadedFileMsg("success");
                console.log('[FILE UPLOAD]', data);
            })
            .catch(err => {
                showUploadedFileMsg("error");
                console.error('[FILE UPLOAD]', err)
            })
        }
    }

    const showUploadedFileMsg = (res) => {
        setUploadedFile([true, res]);
        setTimeout(() => {
            setUploadedFile([false, ""]);
        }, 5000);
    }

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        dirName: `images/properties/${property}`,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        s3Url: process.env.REACT_APP_S3_URL
    }
     
    const ReactS3Client = new S3(config);

    return (
        <div>
            <form>
                <label>
                    <input
                        type="file"
                        name="file"
                        multiple
                        accept="image/png, image/jpeg"
                        onChange={e => handleUpload(e.target.files)}
                    />
                </label>
            </form>
            <Button
            size="small"
            onClick={() => handleSubmit()}
            variant="contained">
              <Typography variant="caption" component="p">Upload</Typography>
            </Button>
            <Snackbar open={uploadedFile[0]} autoHideDuration={5000}>
                {uploadedFile[1] === "success" ?
                    <Alert severity="success">
                    File(s) uploaded successfully.
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