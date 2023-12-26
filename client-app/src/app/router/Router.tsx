import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import LoginForm from "../../features/users/LoginForm";

export const routes :RouteObject[]= [
    {
        path:'/',
        element:<App />,
        children: [           
            {path: 'activities', element : <ActivityDashboard />},
            {path: 'activities/:id', element : <ActivityDetails/>},
            {path: 'createActivity', element : <ActivityForm key='create'/>},
            {path: 'manage/:id', element : <ActivityForm key='manage' />},
            {path: 'Login', element : <LoginForm/>},
            
        ]


    }
] 

export const router= createBrowserRouter(routes)