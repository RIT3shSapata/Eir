import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import HospitalState from '../../types/HospitalState';
import axios from '../../utils/axios';

type Props = { currPatient: number };

const PatientDetails = ({ currPatient }: Props) => {
    const { patients }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );

    const [details, setDetails] = useState<string>('');

    useEffect(() => {
        const getFile = async () => {
            const res = await axios.post('/getFile', {
                id: patients[currPatient].w3name,
            });
            setDetails(res.data.res);
            console.log(res);
            // console.log(currPatient, patients[currPatient]);
        };
        getFile();
    }, []);
    return (
        <div className='h-full'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    Patient Details{' '}
                </h1>
            </div>
            <div className='h-max w-full flex justify-center mt-5'>
                <textarea
                    value={details}
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 '></textarea>
            </div>
        </div>
    );
};

export default PatientDetails;
