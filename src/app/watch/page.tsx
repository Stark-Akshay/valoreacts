import { Button } from '@/components/ui/button';

import { auth, signOut } from '../../../auth';
import { redirect } from 'next/navigation';
import { lazy, Suspense } from 'react';

const LazyVideoComponent = lazy(() => import('../(components)/WatchComponent'));


const WatchPage = async () => {
    const session = await auth();
    if (session?.user.role != "admin") {
        redirect('/')
    }
    return (
        <div className='bg-reaverbg bg-cover h-dvh'>

            <form action={
                async () => {
                    "use server"
                    await signOut();
                }
            }>
                <Button type='submit' className='bg-red-600'>Logout</Button>
            </form>

            {/* <WatchComponent /> */}
            <Suspense fallback={<div>Loading the video component!</div>}>
                <LazyVideoComponent />
            </Suspense>
        </div>
    )
}

export default WatchPage;
