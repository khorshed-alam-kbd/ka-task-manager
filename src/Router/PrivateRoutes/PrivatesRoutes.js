import { Button, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const PrivatesRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Button className='mx-auto' color="gray">
            <Spinner aria-label="Spinner button example" />
            <span className="pl-3">
                Please wait, Data is loading...
            </span>
        </Button>;

    }
    if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default PrivatesRoutes;