"use client"
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import { register } from '../../../actions/user';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComponent = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const result = await register(formData);
            if (result.success) {
                toast.success("Registration successful!");
            }
        } catch (error: any) {
            toast.error(error.message || "An unexpected error occurred");
        }
    };
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register your Streamer account</CardTitle>
                    <CardDescription>Please provide your Youtube/In game name</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="ign">In Game Name / Youtube Name</Label>
                                <Input
                                    id="ign"
                                    name="ign"
                                    type='text'
                                    placeholder="MenAtArms Gaming"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
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
                            <Button type="submit">Register</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );


}

export default RegisterComponent;