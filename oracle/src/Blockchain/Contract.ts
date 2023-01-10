import { FogLayer, FogLayer__factory } from './../typechain-types';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';
const RPC_URL = process.env.RPC_URL;

const provider = new ethers.providers.JsonRpcBatchProvider(RPC_URL);
const signer = provider.getSigner(0);

console.log(CONTRACT_ADDRESS);
console.log(RPC_URL);
const FogLayerContract: FogLayer = FogLayer__factory.connect(
    CONTRACT_ADDRESS,
    signer
);

export default FogLayerContract;
