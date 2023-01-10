import React, { useState, useEffect } from 'react';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import { Hospital } from '../../typechain-types';
import HospitalState from '../../types/HospitalState';

type Props = {};

const ListPatients = (props: Props) => {
    const { contract }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );
    const [patients, setPatients] = useState<Hospital.PatientStruct[]>([]);

    useEffect(() => {
        const getPatients = async () => {
            if (contract) {
                const docs: Hospital.PatientStruct[] =
                    await contract.getPatients();
                setPatients(docs);
            }
        };
        getPatients();
    }, []);
    return (
        <div className='h-full'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    List of Patients
                </h1>
            </div>
            <div className='h-max w-full flex justify-center'>
                <table className='table-auto divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-2 text-xs text-gray-500'>
                                Address
                            </th>
                            <th className='px-6 py-2 text-xs text-gray-500'>
                                Name
                            </th>
                            <th className='px-6 py-2 text-xs text-gray-500'>
                                Age
                            </th>
                            <th className='px-6 py-2 text-xs text-gray-500'>
                                Weight
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-300'>
                        {patients.map((patient) => {
                            console.log(patient);
                            return (
                                <tr
                                    key={patient.uid.toString()}
                                    className='whitespace-nowrap'>
                                    <td className='px-6 py-4'>
                                        <span className='text-sm text-gray-900'>
                                            {patient.p_add.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {patient.name.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {patient.age.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {patient.weight.toString()}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPatients;
