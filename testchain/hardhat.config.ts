import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    networks: {
        hardhat: {},
        fogChain: {
            chainId: 33402,
            url: 'http://localhost:8501',
            accounts: [
                '11e83fcc75343dc419a0c30ff8732ba8c249b0ed876f4475786472b05e911601',
            ],
        },
        ganache: {
            chainId: 1337,
            url: 'HTTP://127.0.0.1:7545',
            accounts: [
                'e84093ac9d6e97911408d29c0b5a88efb67406ae7b60a205a2aff4a3f3c9fa1c',
            ],
        },
    },
};

export default config;
