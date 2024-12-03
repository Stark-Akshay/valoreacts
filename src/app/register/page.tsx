import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import { register } from '../../../actions/user';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComponent from '../(components)/Register';


//change just this to a separate client component
const Register = () => {

    return (
        <div>
            <RegisterComponent />
        </div>
    );
};

export default Register;
