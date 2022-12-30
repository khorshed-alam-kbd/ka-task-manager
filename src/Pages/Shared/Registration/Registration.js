import { GoogleAuthProvider } from 'firebase/auth';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Registration = () => {
    const { providerLogin, createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleOnsubmitRegistration = data => {
        console.log(data.email, data.name, data.userType)
        const userName = data.name
        const email = data.email;
        const password = data.password

        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                swal({
                    title: `Your registration successfully completed`,
                    icon: "success",
                    button: "Done",
                });
                // form.reset();
                navigate('/')
                setError('');
                handleUpdateUserProfile(userName);
                // uploadUserToDb(userName, email, userRole, userStatus)

            })
            .catch(error => {
                console.error(error);
                setError(error.message);
                swal({
                    title: "Opps !!",
                    text: `${error.message}`,
                    icon: "error",
                    button: "Try Again",
                });
            });
    };
    const handleUpdateUserProfile = (name) => {
        const profile = {
            displayName: name,
        }
        updateUserProfile(profile)
            .then((result) => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => console.error(error));
    };

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {

        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                // console.log(user.displayName);
                navigate(from, { replace: true });
                swal({
                    title: "Your login successfully",
                    icon: "success",
                    button: "Done",
                });
            })
            .catch(error => console.error(error))
    };

    return (
        <div className="max-w-sm mx-auto my-10">
            <Card>
                <form onSubmit={handleSubmit(handleOnsubmitRegistration)} className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="Name1"
                                value="Name"
                            />
                        </div>
                        <TextInput
                            id="Name1"
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: true })}

                        />
                        {errors.name && <span className='text-red-500' >Name is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Email"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}

                        />
                        {errors.email && <span className='text-red-500' >Email is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Password"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className='text-red-500'>Password is required</span>}
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <Button type="submit">
                        Register
                    </Button>
                </form>
                <p className='mx-auto' >Already have an account? <Link to='/login' className='text-blue-500'> Please Login</Link></p>
                <div className='mx-auto my-3'>
                    <Button color="gray" onClick={handleGoogleSignIn}>
                        <FcGoogle /><span className="pl-3">Continue with Google</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Registration;