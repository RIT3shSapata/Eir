// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;
import "hardhat/console.sol";

contract FogLayer {
    address hospital;
    mapping(address => uint256) public patientDeviceMapping;

    constructor() {
        hospital = msg.sender;
    }

    modifier onlyHospital() {
        require(hospital == msg.sender);
        _;
    }

    function addPatient(address patient, uint256 deviceID) public onlyHospital {
        uint256 genUID = uint(keccak256(abi.encodePacked(deviceID, patient)));
        patientDeviceMapping[patient] = genUID;
    }

    function verifyDevice(
        address patient,
        uint256 deviceID
    ) public view returns (bool) {
        return
            patientDeviceMapping[patient] ==
            uint(keccak256(abi.encodePacked(deviceID, patient)));
    }
}
