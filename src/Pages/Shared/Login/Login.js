import { GoogleAuthProvider } from 'firebase/auth';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { providerLogin, logIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'

    const handleOnSubmitLogin = data => {
        console.log(data.email, data.name)
        const email = data.email;
        const password = data.password

        logIn(email, password)
            .then(result => {
                const user = result.user
                const currentUser = {
                    email: user.email,

                }
                fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // form.reset();
                        localStorage.setItem('ka-task-manager', data.token)
                        navigate(from, { replace: true });
                        swal({
                            title: "Your login successfully",
                            icon: "success",
                            button: "Done",
                        });

                    })

            })
            .catch(error => {
                console.error(error)
                setError('Email or Password is wrong, Please Enter Correct email or password !')
                // form.reset();
            })

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
                <form onSubmit={handleSubmit(handleOnSubmitLogin)} className="flex flex-col gap-4">
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
                        Login
                    </Button>
                </form>
                <p className='mx-auto' >Don't have an account? <Link to='/register' className='text-blue-500'>Registration Now</Link> </p>
                <div className='mx-auto my-3'>
                    <Button color="gray" onClick={handleGoogleSignIn}>
                        <FcGoogle /><span className="pl-3">Continue with Google</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;