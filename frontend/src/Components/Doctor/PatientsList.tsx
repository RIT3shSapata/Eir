import React from 'react';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import HospitalState from '../../types/HospitalState';

type Props = {
    handleClick: (index: number) => void;
};

const PatientsList = ({ handleClick }: Props) => {
    const { patients }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );
    return (
        <div className='h-full'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    List of Patients
                </h1>
            </div>
            <div className='h-max w-full flex justify-center mt-5'>
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
                            <th className='px-6 py-2 text-xs text-gray-500'>
                                Check Patient
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-300'>
                        {patients.map((patient, i) => {
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
                                    <td>
                                        <button
                                            className='btn-primary'
                                            onClick={() => handleClick(i)}>
                                            See Details
                                        </button>
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

export default PatientsList;
