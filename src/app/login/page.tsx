import React, { useState } from 'react'

import LoginComponent from '../(components)/Login';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';


const Login = async () => {
    const session = await auth();
    if (session?.user.role == "admin") {
        redirect('/watch')
    }
    if (session?.user.role == "user") {
        redirect('/');
    }
    return (
        <div className='bg-valobg bg-cover'>
            <LoginComponent />
            <ToastContainer />
        </div>

    )
}

export default Login