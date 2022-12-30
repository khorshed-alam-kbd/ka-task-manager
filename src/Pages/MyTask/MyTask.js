import { useQuery } from '@tanstack/react-query';
import { Button, Card, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const navigate = useNavigate();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/tasks/user/?email=${email}`)
            .then(res => res.json())
    });
    console.log(tasks);

    const handleDeleteTask = (id) => {
        swal({
            text: `Are you sure to delete the task ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/tasks/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                swal({
                                    text: `Task deleted successfully`,
                                    icon: "success",
                                });
                                refetch();
                            }
                        });
                }
            });
    }

    const handleTaskCompleted = (id) => {
        fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/task/completed/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ taskCompletedStatus: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    swal({
                        text: "Task completed successfully",
                        icon: "success",
                    });
                    navigate('/complete-task')
                    refetch();
                }
            })
            .catch(err => console.error(err));

    }


    return (
        <div>
            {
                isLoading ?
                    < >
                        <Button className='mx-auto' color="gray">
                            <Spinner aria-label="Alternate spinner button example" />
                            <span className="pl-3">
                                Please wait, Data is loading...
                            </span>
                        </Button>
                    </>
                    :
                    <>
                        {
                            tasks.length ?
                                <div className='mx-5 my-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
                                    {
                                        tasks.map((task, i) =>
                                            <Card className="max-w-sm mx-auto"
                                                imgAlt="task-img"
                                                imgSrc={task.taskImage}
                                            >
                                                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white border rounded p-3">
                                                    <span className='text-center block'>Task</span>{task.taskName}
                                                </h5>

                                                <Button.Group className='mx-auto' outline={true}>
                                                    <Button onClick={() => handleDeleteTask(task._id)} color="failure">
                                                        Delete
                                                    </Button>
                                                    <Button color="purple">
                                                        Update
                                                    </Button>
                                                    <Button onClick={() => handleTaskCompleted(task._id)} color="success">
                                                        Completed
                                                    </Button>
                                                </Button.Group>
                                            </Card>
                                        )
                                    }

                                </div>
                                :
                                <div className='text-center text-3xl'>You have no task.
                                    <Link to='/add-task' className='text-xl border rounded-lg p-1'>Add Task</Link> !!
                                </div>
                        }

                    </>
            }



        </div>
    );
};

export default MyTask;