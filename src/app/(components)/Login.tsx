"use client"
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";
import { login } from "../../../actions/user";
const LoginComponent = () => {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const result = await login(formData);
            if (result?.success) {
                toast.success("Registration successful!");
                router.push('/login')
            }
            else {
                toast.error("Could not log you in or Please register!");
                setTimeout(() => {
                    router.push('/register');
                }, 3000);
            }
        } catch (error: any) {
            toast.error(error.message || "An unexpected error occurred");
        }
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
    );
}

export default LoginComponent;