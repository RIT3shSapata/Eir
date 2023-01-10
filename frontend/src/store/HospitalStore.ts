import { providers } from 'ethers';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Hospital, Hospital__factory } from '../typechain-types';
import HospitalState from '../types/HospitalState';
import UserType from '../types/UserType';
import { CONTRACT_ADDRESS } from '../utils/Constants';

const useHospitalStore = create<HospitalState>()(
    devtools((set) => ({
        provider: null,
        signer: null,
        contract: null,
        account: '',
        userType: UserType.Hospital,
        loggedIn: false,
        patients: [],
        connectWallet: async () => {
            const { ethereum } = window;
            if (!ethereum) return alert('Install Metamask');
            const newProvider: providers.Web3Provider =
                new providers.Web3Provider(ethereum);
            const newSigner: providers.JsonRpcSigner = newProvider.getSigner();
            const accounts: string[] = ethereum.request
                ? await ethereum.request({ method: 'eth_requestAccounts' })
                : [''];
            const hospitalContract: Hospital = Hospital__factory.connect(
                CONTRACT_ADDRESS,
                newSigner
            );

            const user: UserType = await hospitalContract.getUserType(
                accounts[0]
            );
            console.log(user);

            set({
                provider: newProvider,
                signer: newSigner,
                account: accounts[0],
                contract: hospitalContract,
                loggedIn: true,
                userType: user,
            });
        },
        setPatients: (_patients: Hospital.PatientStruct[]) => {
            set({
                patients: _patients,
            });
        },
    }))
);

export default useHospitalStore;
