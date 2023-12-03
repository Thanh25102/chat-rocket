import React, { useState } from 'react';
import {useAppDispatch} from "Frontend/redux/hooks";
import {Link} from "react-router-dom";
import {Button} from "@hilla/react-components/Button";

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target.username.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const repeatPassword = e.target.repeatPassword.value;
        if (password !== repeatPassword) {
            setLoading(false)
            return;
        }
        const data = {
            username, name, password, provider: 'credentials', avatar: ''
        }
        try {
            // const action: any = await dispatch(AuthThunks.signUp(data));
            // router.push('/sign-in');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
            <div className='overflow-hidden w-[100vw] h-[100vh] relative'>
                <video
                    autoPlay muted loop
                    className='w-full h-full object-cover'
                >
                    <source src='videos/login-page.mp4' type='video/mp4'/>
                </video>
                <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]' />
                <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgba(0,0,0,0.8)] backdrop-blur-sm shadow-md flex items-start gap-3 rounded-lg min-w-[900px] w-max max-w-[100vh]'>
                    <div className='h-full w-[420px] p-4'>
                        <div className='w-[420px] h-full relative'>
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
                    <div className='flex-1 p-4 px-8'>
                        <div className='mb-8 mt-1'>
                            <h3 className='text-xl text-dark-text font-extrabold'>
                                Sign up to AmigoTasks
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className='mb-3'>
                            <div className='mb-3 flex flex-col gap-2'>
                                <label htmlFor='username' className='text-dark-text-50 font-bold text-md'>
                                    Username
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                                />
                            </div>
                            <div className='mb-3 flex flex-col gap-2'>
                                <label htmlFor='name' className='text-dark-text-50 font-bold text-md'>
                                    Fullname
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                                />
                            </div>
                            <div className='mb-6 flex flex-col gap-2'>
                                <label htmlFor='password' className='text-dark-text-50 font-bold text-md'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                                />
                            </div>
                            <div className='mb-6 flex flex-col gap-2'>
                                <label htmlFor='repeatPassword' className='text-dark-text-50 font-bold text-md'>
                                    Repeat Password
                                </label>
                                <input
                                    type='password'
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                                />
                            </div>
                            <Button
                                className='font-bold text-[0.9rem] w-full rounded-full bg-primary text-dark-text'
                            >
                                Sign Up
                            </Button>
                        </form>
                        <div className='pt-3 flex items-center justify-center'>
                            <p className='flex items-center justify-center gap-1 font-semibold text-dark-text-50 text-md'>
                                Already have an account?
                                <Link
                                    to={"/login"}
                                    className='text-dark-text'
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Login;


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