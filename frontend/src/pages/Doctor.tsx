import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientsList from '../Components/Doctor/PatientsList';
import shallow from 'zustand/shallow';
import HospitalState from '../types/HospitalState';
import useHospitalStore from '../store/HospitalStore';
import { Hospital } from '../typechain-types';
import PatientDetails from '../Components/Doctor/PatientDetails';

type Props = {};

const Doctor = (props: Props) => {
    const navigate = useNavigate();

    const [view, setView] = useState<'list' | 'details'>('list');
    const [currPatient, setCurrPatient] = useState<number>(0);

    const { account, setPatients, patients, contract }: HospitalState =
        useHospitalStore((state) => ({ ...state }), shallow);

    const handleClick = (index: number) => {
        setView('details');
        setCurrPatient(index);
    };
    useEffect(() => {
        const getPatients = async () => {
            if (contract) {
                const p: Hospital.PatientStruct[] =
                    await contract.getDoctorPatients(account);
                setPatients(p);
            }
        };
        getPatients();
    }, []);

    return (
        <div className='root'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-5xl text-center text-violet-600 font-bold'>
                    Doctor Dashboard
                </h1>
            </div>
            <div className='h-full w-full'>
                <div className='w-fit mx-auto flex flex-col justify-between '>
                    <button
                        className='btn-primary'
                        onClick={() => {
                            setView('list');
                        }}>
                        Dashboard
                    </button>
                </div>
                <div className='flex flex-col w-full h-5/6  '>
                    <div className='w-1/2 mx-10 flex justify-between h-fit py-10 self-center'>
                        {patients.length > 0 &&
                            (view === 'list' ? (
                                <PatientsList handleClick={handleClick} />
                            ) : (
                                <PatientDetails currPatient={currPatient} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctor;
