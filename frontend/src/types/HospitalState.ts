import { ethers } from 'ethers';
import { Hospital } from '../typechain-types';
import UserType from './UserType';

interface HospitalState {
    provider: ethers.providers.Web3Provider | null;
    signer: ethers.providers.JsonRpcSigner | null;
    account: string;
    contract: Hospital | null;
    userType: UserType;
    loggedIn: boolean;
    patients: Hospital.PatientStruct[];
    connectWallet: () => void;
    setPatients: (_patients: Hospital.PatientStruct[]) => void;
}

export default HospitalState;
