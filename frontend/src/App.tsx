import { redirect, useNavigate } from 'react-router-dom';
import useHospitalStore from './store/HospitalStore';
import HospitalState from './types/HospitalState';
import shallow from 'zustand/shallow';
import UserType from './types/UserType';
import { useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    const { connectWallet, userType, loggedIn }: HospitalState =
        useHospitalStore((state) => ({ ...state }), shallow);

    useEffect(() => {
        if (loggedIn) {
            switch (userType) {
                case UserType.Hospital:
                    navigate('/hospital');
                    break;
                case UserType.Doctor:
                    navigate('/doctor');
                    break;
                case UserType.Patient:
                    navigate('/patient');
                    break;
            }
        }
    }, [loggedIn]);

    const login = async () => {
        await connectWallet();
    };

    return (
        <div className='App'>
            <div className='root '>
                <div className='h-1/6 flex flex-col justify-center'>
                    <h1 className='text-6xl text-center text-violet-600 font-bold'>
                        Capstone Project
                    </h1>
                </div>
                <div className='flex flex-col w-full h-5/6 '>
                    <div className='w-fit mx-auto flex flex-col justify-between h-1/4'>
                        <button className='btn-primary' onClick={login}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
