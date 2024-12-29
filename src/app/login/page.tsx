import React, { useState } from 'react'

import LoginComponent from '../(components)/Login';
import { login } from '../../../actions/user';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';


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
        </div>

    )
}

export default Login