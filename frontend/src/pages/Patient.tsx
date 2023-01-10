import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { HospitalContext } from '../context/HospitalContext';

type Props = {};

const Patient = () => {
    // const {connectWallet,currentAccount,FormData,setPatientFormData,handleChange} = useContext(HospitalContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const{address,name,age,weight} = FormData
        console.log(address, name, age, weight);
        // setAddress('');
        // setName('');
        // setAge(0);
        // setWeight(0);

        // Use the data to trigger smart contracts
        alert('Patient Added Successfully');
        navigate('/');
    };
    return (
        <div className='root'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-5xl text-center text-violet-600 font-bold'>
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
                                onChange={(e) => setAge(+e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Age</label>
                            <input
                                type='number'
                                className='input'
                                value={age}
                                onChange={(e) => setWeight(+e.target.value)}
                            />
                        </div>
                        <div className='inputGroup'>
                            <label className='inputLabel'>Weight</label>
                            <input
                                type='number'
                                className='input'
                                value={weight}
                                // onChange={handleChange}
                            />
                        </div>
                        <button type='button' className='btn-primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Patient;
