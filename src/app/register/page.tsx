import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import { register } from '../../../actions/user';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComponent from '../(components)/Register';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';


//change just this to a separate client component
const Register = async () => {
    const session = await auth();
    if (session?.user.role == "admin") {
        redirect('/watch')
    }
    if (session?.user.role == "user") {
        redirect('/');
    }
    return (
        <div className='bg-valobg bg-cover'>
            <RegisterComponent />
        </div>
    );
};

export default Register;
