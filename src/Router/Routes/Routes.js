import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompleteTask from "../../Pages/CompleteTask/CompleteTask";
import Home from "../../Pages/Home/Home";
import MyTask from "../../Pages/MyTask/MyTask";
import Login from "../../Pages/Shared/Login/Login";
import Registration from "../../Pages/Shared/Registration/Registration";
import PrivatesRoutes from "../PrivateRoutes/PrivatesRoutes";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-task',
                element: <PrivatesRoutes><AddTask></AddTask></PrivatesRoutes>
            },
            {
                path: '/my-task',
                element: <MyTask></MyTask>
            },
            {
                path: '/complete-task',
                element: <CompleteTask></CompleteTask>
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },

        ]
    },
    // {
    //     path: '*',
    //     element: <Page404></Page404>,
    // }
]);

export default router;