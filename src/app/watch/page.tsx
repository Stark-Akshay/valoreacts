import { Button } from '@/components/ui/button';
import WatchComponent from '../(components)/WatchComponent';
import { auth, signOut } from '../../../auth';
import { redirect } from 'next/navigation';


const WatchPage = async () => {
    const session = await auth();
    if (session?.user.role != "admin") {
        redirect('/')
    }
    return (
        <div className='bg-reaverbg bg-cover h-screen'>

            <form action={
                async () => {
                    "use server"
                    await signOut();
                }
            }>
                <Button type='submit' className='bg-red-600'>Logout</Button>
            </form>

            <WatchComponent />
        </div>
    )
}

export default WatchPage;
