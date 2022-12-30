import { useQuery } from '@tanstack/react-query';
import { Button, Card, Label, Spinner, Textarea } from 'flowbite-react';
import { comment } from 'postcss';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const CompleteTask = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const navigate = useNavigate();


    const { data: completedTasks = [], refetch, isLoading } = useQuery({
        queryKey: ['completedTasks'],
        queryFn: () => fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/tasks/completed/?email=${email}`)
            .then(res => res.json())
    });

    if (isLoading) {
        <div>
            <Button color="gray">
                <Spinner aria-label="Alternate spinner button example" />
                <span className="pl-3">
                    Please wait, Data is loading...
                </span>
            </Button>
        </div>
    }
    console.log(completedTasks);
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

    const handleTaskNotCompleted = (id) => {
        fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/task/completed/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ taskCompletedStatus: false })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    swal({
                        text: "Task Not completed",
                        icon: "warning",
                    });
                    navigate('/my-task')
                    refetch();
                }
            })
            .catch(err => console.error(err));

    }

    // const { register, handleSubmit } = useForm();

    // const [Comment, setTaskComment] = useState(null)

    // const handleOnSubmit = (data) => {
    //     const Comment = data.comment
    //     console.log(Comment)
    //     setTaskComment(Comment);

    // }

    // const handleAddComment = (id) => {

    //     fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/task/comment/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ taskComment: Comment })
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.modifiedCount > 0) {
    //                 swal({
    //                     text: "Comment Added successfully",
    //                     icon: "success",
    //                 });
    //                 refetch();
    //             }
    //         })
    //         .catch(err => console.error(err));
    // }


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
                            completedTasks.length ?
                                <div className='mx-5 my-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
                                    {
                                        completedTasks.map((task, i) =>
                                            <Card className="max-w-sm mx-auto"
                                                imgAlt="task-img"
                                                imgSrc={task.taskImage}
                                                key={i}

                                            >
                                                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white border rounded p-3">
                                                    <span className='text-center block'>Task</span>{task.taskName}
                                                </h5>
                                                {/* <div className='border rounded p-3'>
                                                    <form onSubmit={handleSubmit(handleOnSubmit)} className='flex flex-row border rounded py-2'>
                                                        <div id="textarea">
                                                            <Textarea
                                                                id="comment"
                                                                placeholder="Leave a comment..."
                                                                required={true}
                                                                rows={1}
                                                                {...register("comment", { required: true })}
                                                            />
                                                        </div>
                                                        <Button onClick={() => handleAddComment(task._id)} className='mx-auto my-auto' size="xs" color="gray">
                                                            Add Comment
                                                        </Button>
                                                    </form>
                                                </div> */}

                                                <Button.Group className='mx-auto' outline={true}>
                                                    <Button onClick={() => handleDeleteTask(task._id)} color="failure">
                                                        Delete
                                                    </Button>
                                                    <Button onClick={() => handleTaskNotCompleted(task._id)} color="warning">
                                                        Not Completed
                                                    </Button>
                                                </Button.Group>
                                            </Card>
                                        )
                                    }

                                </div>
                                : <div className='text-center text-3xl'>You have no completed task.
                                    <Link to='/add-task' className='text-xl border rounded-lg p-1'>Add Task</Link> !!</div>
                        }

                    </>
            }


        </div>
    );
};

export default CompleteTask;