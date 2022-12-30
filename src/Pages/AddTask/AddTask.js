import { Button, FileInput, Label, Spinner, Textarea } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const AddTask = () => {

    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_NOT_SECRET_imageBB_key



    const { register, handleSubmit } = useForm();
    const handleOnSubmit = (data) => {

        setLoading(true);

        const userName = user?.displayName
        const userEmail = user?.email
        const taskName = data.task
        const taskCompletedStatus = false

        const image = data.image[0]
        // console.log(image);
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Image url', result.data.url);
                const taskImage = result.data.url;
                console.log(taskImage);
                uploadTaskToDB(userName, userEmail, taskName, taskImage, taskCompletedStatus);

                swal({
                    text: `Task added successfully`,
                    icon: "success",
                    button: "Done",
                });
                setLoading(false);
                navigate('/my-task')
            })
            .catch((error) => {
                console.error('Error:', error);
                swal({
                    text: "something wrong, product not added",
                    icon: "error",
                    button: "Done",
                });
                setLoading(false);
            });

    }
    const uploadTaskToDB = (userName, userEmail, taskName, taskImage, taskCompletedStatus) => {
        const task = { userName, userEmail, taskName, taskImage, taskCompletedStatus }
        console.log(task)
        fetch(`${process.env.REACT_APP_NOT_SECRET_serverLink}/tasks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    };


    const handleKeypress = e => {
        if (e.keyCode === 13) {
            handleOnSubmit();
        }
    };

    return (
        <div >
            <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-4 m-4 p-4 border rounded mx-auto max-w-lg">
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="task"
                            value="Your Task:"
                        />
                    </div>
                    <Textarea
                        id="task"
                        placeholder="Type your Task..."
                        required={true}
                        rows={4}
                        onKeyPress={handleKeypress}
                        {...register("task", { required: true })}
                    />
                </div>
                <div id="fileUpload">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="photo"
                            value="Upload file"
                        />
                    </div>
                    <FileInput
                        id="photo"
                        onKeyPress={handleKeypress}
                        {...register("image", { required: true })}
                    />
                </div>
                {
                    loading ? <Button type="submit">
                        <Spinner aria-label="Spinner button example" />
                        <span className="pl-3">
                            Submitting...
                        </span>
                    </Button> : <Button type="submit">
                        Submit
                    </Button>
                }
            </form>
        </div>

    );
};

export default AddTask;