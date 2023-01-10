import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AddDoctor from './Components/Hospital/AddDoctor';
import AddPatient from './Components/Hospital/AddPatient';
import ListDoctor from './Components/Hospital/ListDoctor';
import ListPatients from './Components/Hospital/ListPatients';
import AssignDoctor from './Components/Hospital/AssignDoctor';
import Doctor from './pages/Doctor';
import Hospital from './pages/Hospital';
import Patient from './pages/Patient';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/hospital',
        element: <Hospital />,
        children: [
            {
                path: '/hospital/doctor',
                element: <AddDoctor />,
            },
            {
                path: '/hospital/patient',
                element: <AddPatient />,
            },
            {
                path: '/hospital/assign',
                element: <AssignDoctor />,
            },
            {
                path: '/hospital/doctors-list',
                element: <ListDoctor />,
            },
            {
                path: '/hospital/patients-list',
                element: <ListPatients />,
            },
        ],
    },
    {
        path: '/doctor',
        element: <Doctor />,
    },
]);

export default router;
