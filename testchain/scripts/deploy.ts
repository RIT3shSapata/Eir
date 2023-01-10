import { ethers } from 'hardhat';

async function main() {
    const Hospital = await ethers.getContractFactory('Hospital');
    const HospitalContract = await Hospital.deploy();

    await HospitalContract.deployed();

    console.log('Contract Address: ', HospitalContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
