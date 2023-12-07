import React, {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Placeholder from "Frontend/components/placeholder/Placeholder";


export default function AuthLayout() {


    return (
        <div className='overflow-hidden w-[100vw] h-[100vh] relative'>
            <video
                autoPlay muted loop
                className='w-full h-full object-cover'
            >
                <source src='videos/login-page.mp4' type='video/mp4'/>
            </video>
            <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]'/>
            <div
                className=' h-[530px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgba(0,0,0,0.8)] backdrop-blur-sm shadow-md flex items-start gap-3 rounded-lg min-w-[900px] w-max max-w-[100vh]'>
                <div className='h-full w-[400px] p-4'>
                    <div className='w-[400px] h-full relative'>
                        <img
                            alt='sign in'
                            src='https://images.unsplash.com/photo-1493839523149-2864fca44919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80'
                            className='w-full object-cover rounded-lg'
                        />
                        <div className='absolute flex gap-2 items-center justify-start top-3 left-3 text-md font-bold'>
                            <p className='bg-background text-text rounded-full py-1 px-4'>
                                ChatRocket
                            </p>
                        </div>
                        <div
                            className='absolute flex gap-2 items-center justify-start bottom-3 left-3 text-xs font-bold'>
                            <p className='bg-background text-text rounded-full py-1 px-4 cursor-default'>
                                #ChatRocket
                            </p>
                            <p className='bg-background text-text rounded-full py-1 px-4 cursor-default'>
                                #ManhThanh
                            </p>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<Placeholder/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    )
}

export const Loading = () => {
    return (
        <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
            />
        </svg>
    )
}