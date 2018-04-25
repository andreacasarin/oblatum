pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/ownership/Claimable.sol';

/**
@title Deed
@dev A deed proving ownership of an asset.
@dev Self uploading a deed is useless, should be deployed by a trusted issuer.
 */
contract Deed is Claimable {

    bytes32 public manufacturer; // The asset manufacturer
    bytes32 public model;        // The asset model
    bytes32 public serial;       // The asset serial
    uint256 public timestamp;    // Proof of existance timestamp

    /*
    @dev Constructor
    @param _owner The deed owner
    @param _manufacturer The asset manufacturer
    @param _model The asset model
    @param _serial The asset serial
    */
    function Deed(address _owner, bytes32 _manufacturer, bytes32 _model, bytes32 _serial) public {
        assert(_owner != 0x0);
        owner = _owner;
        manufacturer = _manufacturer;
        model = _model;
        serial = _serial;
        timestamp = block.timestamp;
    }

}
