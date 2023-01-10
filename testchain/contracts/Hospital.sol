// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;
import "hardhat/console.sol";

contract Hospital {
    address hospital;

    enum UserType {
        Hospital,
        Doctor,
        Patient
    }

    mapping(address => UserType) public UserMapping;

    struct patient {
        bool uid_check;
        address p_add;
        uint256 uid;
        string name;
        uint8 age;
        uint8 weight;
        string w3name;
        address[] doctors;
    }
    struct doctor {
        bool uid_check;
        address d_add;
        uint256 uid;
        string name;
        uint8 age;
        uint256 reg_no;
        uint256 ph_no;
        address[] patients;
    }
    mapping(address => patient) public patientmapping;
    mapping(address => doctor) public doctormapping;

    address[] public patientsList;
    address[] public doctorsList;

    constructor() {
        hospital = msg.sender;
        UserMapping[hospital] = UserType.Hospital;
    }

    modifier onlyHospital() {
        require(hospital == msg.sender);
        _;
    }

    modifier onlyDoctor() {
        require(UserMapping[msg.sender] == UserType.Doctor);
        _;
    }

    modifier onlyPatient() {
        require(UserMapping[msg.sender] == UserType.Patient);
        _;
    }

    function getUserType(address user) public view returns (UserType) {
        return UserMapping[user];
    }

    function setDoctorData(
        address _address,
        string memory name,
        uint8 age,
        uint256 reg_no,
        uint256 ph_no
    ) public onlyHospital {
        console.log(doctormapping[_address].uid_check);
        require(!doctormapping[_address].uid_check);
        uint256 gen_uid = uint(
            sha256(abi.encodePacked(_address, block.timestamp))
        );

        doctor memory doc;
        doc.uid_check = true;
        doc.name = name;
        doc.age = age;
        doc.reg_no = reg_no;
        doc.uid = gen_uid;
        doc.ph_no = ph_no;
        doc.d_add = _address;

        doctormapping[_address] = doc;
        UserMapping[_address] = UserType.Doctor;
        doctorsList.push(_address);
    }

    function setPatientData(
        address _address,
        string memory name,
        uint8 age,
        uint8 weight,
        string memory w3name
    ) public onlyHospital {
        require(!patientmapping[_address].uid_check);
        uint256 gen_uid = uint(
            sha256(abi.encodePacked(_address, block.timestamp))
        );

        patient memory pat;
        pat.p_add = _address;
        pat.uid_check = true;
        pat.uid = gen_uid;
        pat.name = name;
        pat.age = age;
        pat.weight = weight;
        pat.w3name = w3name;

        patientmapping[_address] = pat;
        UserMapping[_address] = UserType.Patient;
        patientsList.push(_address);
    }

    function getDoctors() public view onlyHospital returns (doctor[] memory) {
        doctor[] memory doctors = new doctor[](doctorsList.length);
        for (uint i = 0; i < doctorsList.length; i++) {
            doctors[i] = doctormapping[doctorsList[i]];
        }
        return doctors;
    }

    function getPatients() public view onlyHospital returns (patient[] memory) {
        patient[] memory patients = new patient[](patientsList.length);
        for (uint i = 0; i < patientsList.length; i++) {
            patients[i] = patientmapping[patientsList[i]];
        }
        return patients;
    }

    function assignDoctor(
        address patient_address,
        address doctor_address
    ) public onlyHospital {
        patientmapping[patient_address].doctors.push(doctor_address);
        doctormapping[doctor_address].patients.push(patient_address);
    }

    function getDoctorPatients(
        address doc_address
    ) public view onlyDoctor returns (patient[] memory) {
        doctor memory doc = doctormapping[doc_address];
        patient[] memory patients = new patient[](doc.patients.length);
        for (uint i = 0; i < doc.patients.length; i++) {
            patients[i] = patientmapping[doc.patients[i]];
        }
        return patients;
    }

    event viewData(string name, uint8 age, uint8 weight, string w3name);

    function PatientData(address p_add) public {
        // require(patientmapping[p_add].doc == msg.sender);
        emit viewData(
            patientmapping[p_add].name,
            patientmapping[p_add].age,
            patientmapping[p_add].weight,
            patientmapping[p_add].w3name
        );
    }
}
