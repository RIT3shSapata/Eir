import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import HospitalState from '../../types/HospitalState';
import AddPatientResponse from '../../types/ResponseTypes';
import axios from '../../utils/axios';

type Props = {};

const AddPatient = (props: Props) => {
    const navigate = useNavigate();
    const { contract }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [deviceID, setDeviceID] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const{address,name,age,weight} = FormData
        console.log(address, name, age, weight, deviceID);
        const content: string =
            'temp:27.10,hum:54.0\ntemp:27.10,hum:54.0\ntemp:27.10,hum:54.0\ntemp:27.10,hum:54.0\ntemp:27.10,hum:54.0\ntemp:27.20,hum:54.1\n';
        const res = await axios.post('/addPatient', {
            address,
            content,
            deviceID,
        });

        const data: AddPatientResponse = await res.data;

        const w3name: string = data.name;

        console.log(w3name);

        await contract?.setPatientData(address, name, age, weight, w3name);
        console.log('Patient Added Successfully');

        setAddress('');
        setName('');
        setAge(0);
        setWeight(0);

        navigate('/hospital');
    };
    return (
        <div className='h-full'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    Add Patient
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
                            <label className='inputLabel'>Weight</label>
                            <input
                                type='number'
                                className='input'
                                value={weight}
                                onChange={(e) => setWeight(+e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Device ID</label>
                            <input
                                type='number'
                                className='input'
                                value={deviceID}
                                onChange={(e) => setDeviceID(+e.target.value)}
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

export default AddPatient;
