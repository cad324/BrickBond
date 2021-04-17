// SPDX-License-Identifier: MIT

pragma solidity >0.6.0 <=0.8.0;

import "./ERC721.sol";
import "./Brick.sol";
import "./IERC721Receiver.sol";
import "../utils/Address.sol";

contract BrickBond is Brick, ERC721 {

  using Address for address;
  
  event TransferResponse(address indexed _from, bool _success);
  
  mapping (uint => address) private _brickApprovals;
  
  function name() pure external returns (string memory) {
    return "BrickBond";
  }
  
  function symbol() pure external returns (string memory) {
      return "BRICK";
  }

  function totalSupply() view external returns (uint) {
    return bricks.length;
  }
  
  function balanceOf(address _owner) external view virtual override returns (uint256) {
    return holderBrickCount[_owner];
  }
  
  function ownerOf(uint256 _tokenId) external view virtual override returns (address) {
    return brickToInvestor[_tokenId];
  }
 
  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) external virtual override payable {
    transferFrom(_from, _to, _tokenId);
    require(_checkOnERC721Received(_from, _to, _tokenId, _data));
  }
  
  function safeTransferFrom(address _from, address _to, uint256 _tokenId) public virtual override payable {
    safeTransferFrom(_from, _to, _tokenId);
  }
 
  function transferFrom(address _from, address _to, uint256 _tokenId) public virtual override payable {
    uint _price = (bricks[_tokenId].price * 1000000000000000000 wei)/1500;
    uint _fee = (_price * 2 wei)/100;
    if (msg.sender == _from) _price = 0 wei;
    require(msg.sender == _from || msg.sender == _brickApprovals[_tokenId], "TransferFrom: Unauthorized transfer");
    require(msg.value >= _price + _fee, 
        string(abi.encodePacked("transferFrom: Insufficient funds")));
    require(brickToInvestor[_tokenId] == _from, "TransferFrom: No such token found at this address");
    _transferBrick(_to, _tokenId);
    if (msg.sender != _from) {
      (bool _success, ) = _from.call{value: _price}('');
      emit TransferResponse(_from, _success);
    }
    emit Transfer(_from, _to, _tokenId);
  }
  
  function approve(address _approved, uint256 _tokenId) external virtual override payable onlyBrickHolder(_tokenId) {
    _brickApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }
  
  function getApproved(uint256 _tokenId) external view virtual override returns (address) {
    require(_exists(_tokenId));
    return _brickApprovals[_tokenId];
  }
           
  function isApprovedForAll(address _owner, address _operator) external view virtual override returns (bool) {
    return _operator == _owner;
  }
  
  function setApprovalForAll(address _operator, bool _approved) external virtual override {
    //TODO
  }
  
  function tokenMetadata(uint256 _tokenId) public view returns (string memory) {
      (uint _property, uint _price, uint8 _stake) = getBrickDetails(_tokenId);
      return string(abi.encodePacked("BrickBond #", itod(_tokenId), " represents a ", 
            itod(_stake), "% stake in property ", 
            itod(_property), ". It has a face value price of $", 
            itod(_price), " CA."));
  }
  
  function withdraw(uint _amount, address payable _account) external onlyOwner {
    require(_amount < address(this).balance);
    (bool success, ) = _account.call{value: _amount}('');
    emit TransferResponse(_account, success);
  }
  
  /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
        private returns (bool)
    {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver(to).onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    // solhint-disable-next-line no-inline-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }
    
    function itod(uint256 x) private pure returns (string memory) {
        if (x > 0) {
            string memory str;
            while (x > 0) {
                str = string(abi.encodePacked(uint8(x % 10 + 48), str));
                x /= 10;
            }
            return str;
        }
        return "0";
    }


}