import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ToastContainer } from 'react-toastify';


const Login = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Please provide your credentials below:</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="riotID">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="johndoe@gmail.com"
                                    type='email'
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="*********"
                                    type='password'
                                    required
                                />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between mt-4">
                            <Button variant="outline" type="reset">
                                Reset
                            </Button>
                            <Button type="submit">Login</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default Login