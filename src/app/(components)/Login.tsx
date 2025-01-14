"use client"
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { login } from "../../../actions/user";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
const LoginComponent = () => {
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);
        try {
            const result = await login(formData);
            if (result?.success) {
                setError(false);
                router.push('/watch');
            }
            else {
                setError(true);
                setFormMessage("Couldn't log you in, Please register");
                setTimeout(() => {
                    router.push('/register');
                }, 3000);
            }
        } catch (error: any) {
            setError(true);
            setFormMessage
        }
        setLoading(false);
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Please provide your credentials below:</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
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
                            {error && <p className="text-red-900 text-md">{formMessage}</p>}
                        </div>
                        <CardFooter className="flex justify-between mt-4">
                            <Button variant="outline" type="reset">
                                Reset
                            </Button>
                            <Button type="submit">
                                {loading ? <AiOutlineLoading className="!w-[1rem] !h-[1rem] animate-spin" /> : "Login"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginComponent;