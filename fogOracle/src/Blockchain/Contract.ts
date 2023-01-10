import { FogLayer, FogLayer__factory } from '../typechain-types';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, RPC_URL } from '../utils/Constants';

const provider = new ethers.providers.JsonRpcBatchProvider(RPC_URL);
const signer = provider.getSigner(0);

const FogLayerContract: FogLayer = FogLayer__factory.connect(
    CONTRACT_ADDRESS,
    signer
);

export default FogLayerContract;
