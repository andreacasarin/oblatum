pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/ownership/Claimable.sol';
import '../node_modules/zeppelin-solidity/contracts/ownership/Contactable.sol';
import './Deed.sol';

/**
@title DeedAuthority
@dev This contract issues bicycle ownership deeds and validates them.
 */
contract DeedAuthority is Claimable, Contactable {

    mapping(address => bool) deeds;

    event DeedIssued(address indexed deed, address indexed to, uint256 timestamp);

    /**
    @dev Owner can issue a new ownersheep deed, providing the necessary details.
    @dev The contract saves the deed address to prove genuinity.
    @param _owner The address of the deed owner
    @param _chassis The Sha256Sum of the chassis code
    @param _photo The Sha256Sum of the bicycle photo
    @return deed The deed address
     */
    function issue(address _owner, bytes32 _chassis, bytes32 _photo) onlyOwner external returns (address deed) {
        deed = new Deed(_owner, _chassis, _photo);

        assert(deed != 0x0);

        deeds[deed] = true;
        DeedIssued(deed, _owner, block.timestamp);
    }

    /**
    @dev Check if a deed has been issued by this manager.
    @return A bool set true if genuine, false otherwise.
     */
    function isGenuine(address _deed) external constant returns (bool) {
        return deeds[_deed];
    }

}
