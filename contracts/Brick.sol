// SPDX-License-Identifier: MIT

pragma solidity >0.6.0 <=0.8.0;

import "./Property.sol";
import "./SafeMath.sol";

contract Brick is RealProperty {

  using SafeMath for uint256;

  struct BrickBond {
    uint property;
    uint price;
    uint8 stake;
  }

  event DividendPayout(address indexed _from, address indexed _to, bool _success);

  BrickBond[] public bricks;

  mapping (uint => address) public brickToInvestor;
  mapping (uint => uint) public brickToProperty;
  mapping (address => uint) public holderBrickCount;
  mapping (uint => uint) public propertyBrickCount;

  modifier onlyPropertyOwner(uint _brickId) {
    require(msg.sender == propertyToBuyer[brickToProperty[_brickId]], "Only the property owner can make this call");
    _;
  }

  modifier onlyBrickHolder(uint _brickId) {
    require(msg.sender == brickToInvestor[_brickId], "Only the brick holder can make this call.");
    _;
  }

  function createBrick(uint _propertyId, uint8 _stake, uint _price) external {
    require(msg.sender == propertyToBuyer[_propertyId], string(abi.encodePacked("Only authorized owner: ", propertyToBuyer[_propertyId])));
    require(public_offering + _stake <= 100);
    bricks.push(BrickBond(_propertyId, _price, _stake));
    uint _brickId = bricks.length - 1;
    brickToProperty[_brickId] = _propertyId;
    propertyBrickCount[_propertyId] = propertyBrickCount[_propertyId].add(1);
    brickToInvestor[_brickId] = msg.sender;
    holderBrickCount[msg.sender]++;
    public_offering += _stake;
  }

  function _matureBrick(uint _brickId) internal {
    _destroyBrick(_brickId);
  }

  function _destroyBrick(uint _brickId) internal {
    brickToInvestor[_brickId] = address(0);
    uint _propertyId = brickToProperty[_brickId];
    propertyBrickCount[_propertyId]--;
    (,, uint8 _stake) = getBrickDetails(_brickId);
    public_offering -= _stake;
  }

  function buyBack(uint _brickId) external payable onlyPropertyOwner(_brickId) {
    BrickBond memory brick = bricks[_brickId];
    require(msg.value >= brick.price);
    //TODO: Transfer brick back to owner
    address prevHolder = brickToInvestor[_brickId];
    brickToInvestor[_brickId] = msg.sender;
    holderBrickCount[prevHolder] = holderBrickCount[prevHolder].sub(1);
    _matureBrick(_brickId);
  }

  function _transferBrick(address _to, uint _brickId) internal {
    address _prevOwner = brickToInvestor[_brickId];
    brickToInvestor[_brickId] = _to;
    holderBrickCount[_to]++;
    holderBrickCount[_prevOwner]--;
  }

  function getBricksByAddress(address _investor) public view returns(uint[] memory) {
    require(msg.sender == _investor, "getBricksByAddress: You are not authorized to access this information");
    uint _counter = 0;
    uint _brickCount = holderBrickCount[_investor];
    uint[] memory _myBricks = new uint[](_brickCount);
    for (uint i = 0; i < _brickCount; i++) {
      if (brickToInvestor[i] == _investor) {
        _myBricks[_counter] = i;
        _counter++;
      }
    }
    return _myBricks;
  }

  function getBricksByProperty(uint _propertyId) public view returns(uint[] memory) {
    uint _brickCount = propertyBrickCount[_propertyId];
    uint _counter = 0;
    uint[] memory _myBricks = new uint[](_brickCount);
    for (uint i = 0; _counter < _brickCount; i++) {
      if (brickToProperty[i] == _propertyId) {
        _myBricks[_counter] = i;
        _counter++;
      }
    }
    return _myBricks;
  }

  function getBrickDetails(uint _brickId) public view returns(uint, uint, uint8) {
    return (bricks[_brickId].property, bricks[_brickId].price, bricks[_brickId].stake);
  }

  function _exists(uint _brickId) internal view returns(bool) {
    return (brickToInvestor[_brickId] != address(0));
  }

  function payInvestors(uint _propertyId) external payable onlyPropertyOwner(_propertyId) {
    uint[] memory _bricks = getBricksByProperty(_propertyId);
    uint _dividend;
    for (uint i = 0; i < _bricks.length; i++) {
        (,, uint8 _stake) = getBrickDetails(_bricks[i]);
        _dividend = (msg.value * _stake)/public_offering;
        (bool _success, ) = brickToInvestor[_bricks[i]].call{value: _dividend}("");
        emit DividendPayout(msg.sender, brickToInvestor[_bricks[i]], _success);
    }
  }

}
