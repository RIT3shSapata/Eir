import React from 'react';
import { Link, Outlet } from 'react-router-dom';

type Props = {};

const Hospital = (props: Props) => {
    return (
        <div className='root'>
            <div className='h-1/6 flex flex-col justify-center'>
                <h1 className='text-6xl text-center text-violet-600 font-bold'>
                    Hospital Dashboard
                </h1>
            </div>
            <div className='flex flex-col w-full h-5/6  '>
                <div className='w-1/2 mx-10 flex justify-between h-fit py-10 self-center'>
                    <Link to='/hospital/doctor'>
                        <button className='btn-primary'>Add Doctor</button>
                    </Link>
                    <Link to='/hospital/patient'>
                        <button className='btn-primary'>Add Patient</button>
                    </Link>
                    <Link to='/hospital/assign'>
                        <button className='btn-primary'>Assign Doctor</button>
                    </Link>
                    <Link to='/hospital/doctors-list'>
                        <button className='btn-primary'>Get Doctors</button>
                    </Link>
                    <Link to='/hospital/patients-list'>
                        <button className='btn-primary'>Get Patients</button>
                    </Link>
                    <Link to='/hospital'>
                        <button className='btn-primary'>Dashboard</button>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Hospital;
