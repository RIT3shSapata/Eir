import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import useHospitalStore from '../../store/HospitalStore';
import { Hospital } from '../../typechain-types';
import HospitalState from '../../types/HospitalState';

type Props = {};

const ListDoctor = (props: Props) => {
    const { contract }: HospitalState = useHospitalStore(
        (state) => ({ ...state }),
        shallow
    );
    const [doctors, setDoctors] = useState<Hospital.DoctorStruct[]>([]);

    useEffect(() => {
        const getDoctors = async () => {
            if (contract) {
                const docs: Hospital.DoctorStruct[] =
                    await contract.getDoctors();
                setDoctors(docs);
            }
        };
        getDoctors();
    }, []);
    return (
        <div className='h-full'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-3xl text-center text-violet-600 font-bold'>
                    List of Doctors
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
                                Register Number
                            </th>
                            <th className='px-6 py-2 text-xs text-gray-500'>
                                Phone Number
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-300'>
                        {doctors.map((doctor) => {
                            console.log(doctor);
                            return (
                                <tr
                                    key={doctor.uid.toString()}
                                    className='whitespace-nowrap'>
                                    <td className='px-6 py-4'>
                                        <span className='text-sm text-gray-900'>
                                            {doctor.d_add.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {doctor.name.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {doctor.age.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {doctor.reg_no.toString()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-sm text-gray-900'>
                                            {doctor.ph_no.toString()}
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

export default ListDoctor;
