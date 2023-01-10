import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import HospitalState from '../../types/HospitalState';

type Props = {};

const Assign = (props: Props) => {
    const navigate = useNavigate();
    const { contract }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );

    const [doctorAddress, setDoctorAddress] = useState('');
    const [patientAddress, setPatientAddress] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(doctorAddress, patientAddress);
        if (contract) {
            await contract.assignDoctor(patientAddress, doctorAddress);
        }
        setDoctorAddress('');
        setPatientAddress('');
        // Use the data to trigger smart contracts
        alert('Doctor Assigned Successfully');
        navigate('/hospital');
    };
    return (
        <div className='root'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    Assign Doctor
                </h1>
            </div>
            <div className='h-full w-full'>
                <form className='h-2/5 ' onSubmit={handleSubmit}>
                    <div className='inputGroupWrapper'>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Doctor Address</label>
                            <input
                                type='text'
                                className='input'
                                value={doctorAddress}
                                onChange={(e) =>
                                    setDoctorAddress(e.target.value)
                                }
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>
                                Patient Address
                            </label>
                            <input
                                type='text'
                                className='input'
                                value={patientAddress}
                                onChange={(e) =>
                                    setPatientAddress(e.target.value)
                                }
                            />
                        </div>
                        <button type='submit' className='btn-primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Assign;
