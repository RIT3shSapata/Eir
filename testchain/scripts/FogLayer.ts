import { ethers } from 'hardhat';

async function main() {
    const FogLayerFactory = await ethers.getContractFactory('FogLayer');
    const fogLayer = await FogLayerFactory.deploy();
    await fogLayer.deployed();
    console.log('FogLayer deployed to:', fogLayer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
