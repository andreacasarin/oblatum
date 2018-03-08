pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/ownership/Claimable.sol';

/**
@title Deed
@dev A deed proving ownership of a bicycle.
@dev Self uploading a deed is useless, should be deployed by a trusted issuer.
 */
contract Deed is Claimable {

    bytes32 public chassis;     // sha256sum of chassis code
    bytes32 public photo;       // sha256sum of bicycle photo
    uint256 public timestamp;   // proof of existance timestamp

    /*
    @dev Constructor
    @param _owner The deed owner
    @param _chassis The sha256sum of chassis code
    @param _photo   The sha256sum of bicycle photo
    */
    function Deed(address _owner, bytes32 _chassis, bytes32 _photo) public {
        assert(_owner != 0x0);
        owner = _owner;
        chassis = _chassis;
        photo = _photo;
        timestamp = block.timestamp;
    }

}
