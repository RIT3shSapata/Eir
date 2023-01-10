import { ethers } from 'hardhat';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function main() {
    const Hospital = await ethers.getContractFactory('Hospital');

    const HospitalContract = await Hospital.attach(CONTRACT_ADDRESS);

    console.log(HospitalContract.patientmapping.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
