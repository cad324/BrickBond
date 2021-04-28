// SPDX-License-Identifier: MIT

pragma solidity >0.6.0 <=0.8.0;

import "./SafeMath.sol";
import "./Ownable.sol";

contract RealProperty is Ownable {

  using SafeMath for uint256;

  enum status{UNDER_CONTRACT, OWNED, FORECLOSED, FOR_SALE, SOLD}

  struct Property {
    string street;
    string city;
    string province;
    string zip_code;
    status property_status;
  }

  Property[] public properties;

  mapping (uint => address) public propertyToBuyer;
  mapping (address => uint) public buyerPropertyCount;
  uint8 public public_offering = 0;

  function registerProperty(address _buyer, string memory _street, string memory _city, string memory _province, string memory _zip) external {
    properties.push(Property(_street, _city, _province, _zip, status.UNDER_CONTRACT));
    uint _propertyId = properties.length - 1;
    propertyToBuyer[_propertyId] = _buyer;
    buyerPropertyCount[_buyer] = buyerPropertyCount[_buyer].add(1);
  }

  function updateStatus(uint _propertyId, status _status) external {
    require(msg.sender == propertyToBuyer[_propertyId]);
    properties[_propertyId].property_status = _status;
  }

  function getPropertiesByAddress(address _buyer) public view returns(uint[] memory) {
    uint _propertyCount = buyerPropertyCount[_buyer];
    uint _counter = 0;
    uint[] memory buyerProperties = new uint[](_propertyCount);
    for (uint i = 0; _counter < _propertyCount; i++) {
      if (propertyToBuyer[i] == _buyer) {
        buyerProperties[_counter] = i;
        _counter++;
      }
    }
    return buyerProperties;
  }
  
  function getAllProperties() external view returns(Property[] memory) {
      return properties;
  }

}
