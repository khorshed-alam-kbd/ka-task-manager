import { Button, Card } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../Images/task-management.webp'

const Home = () => {
    return (
        <div>
            <div className=" mx-auto max-w-xl">
                <Card imgSrc={logo}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        MANAGE YOUR TASK WITH 'KTM'
                    </h5>

                    <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                        Task management is essentially a progress tracking system that allows you to plan out your tasks and execute them accordingly.
                    </p>


                    <Link to='/add-task' className='text-md  mx-auto'>
                        <Button gradientDuoTone="cyanToBlue">
                            Get Started
                        </Button>
                    </Link>
                </Card>
            </div>


        </div>
    );
};

export default Home;