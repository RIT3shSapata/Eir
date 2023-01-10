import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import HospitalState from '../../types/HospitalState';

type Props = {};

const AddDoctor = (props: Props) => {
    const { contract }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(address, name, regNo, phone, age);
        setAddress('');
        setName('');
        setRegNo('');
        setPhone('');
        setAge(0);
        if (contract) {
            await contract.setDoctorData(address, name, age, regNo, phone);
        }
        // Use the data to trigger smart contracts
        alert('Doctor Added Successfully');
        navigate('/hospital');
    };
    return (
        <div className='h-full'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    Add Doctor
                </h1>
            </div>
            <div className='h-full w-full'>
                <form className='h-2/5 ' onSubmit={handleSubmit}>
                    <div className='inputGroupWrapper'>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Address</label>
                            <input
                                type='text'
                                className='input'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Name</label>
                            <input
                                type='text'
                                className='input'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Age</label>
                            <input
                                type='number'
                                className='input'
                                value={age}
                                onChange={(e) => setAge(+e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>
                                Registration Number
                            </label>
                            <input
                                type='text'
                                className='input'
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Phone Number</label>
                            <input
                                type='text'
                                className='input'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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

export default AddDoctor;
