import {Button} from "@hilla/react-components/Button";
import SignInWithGoogle from "Frontend/views/login/components/SignInWithGoogle";
import SignInWithGithub from "Frontend/views/login/components/SignInWithGithub";
import React, {FC, useState} from "react";
import {LoginI18n} from "@hilla/react-components/LoginOverlay";

type Props = {
    i18n: LoginI18n;
    onLogin?: (username: string, password: string) => void
    error?: boolean;
    disabled?: boolean;
}
export const LoginModal: FC<Props> = ({i18n, onLogin, error = false, disabled = false}) => {
    const {form, header, errorMessage, additionalInformation} = i18n

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (

        <div
            className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgba(0,0,0,0.8)] backdrop-blur-sm shadow-md flex items-start gap-3 rounded-lg min-w-[900px] w-max max-w-[100vh]'>
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
            <div className='flex-1 p-4 px-8'>
                <div className='mt-1'>
                    <h3 className='text-xl text-dark-text font-extrabold'>
                        {form.title || "Sign in to ChatRocket"}
                    </h3>
                </div>
                <div
                    className={`bg-red bg-red-500  px-4  text-white rounded-md text-sm ${error ? 'opacity-100 my-4 py-2' : 'opacity-0 my-2'}`}
                    role="alert">
                    <span className="block sm:inline">Username or password incorrect</span>
                </div>
                <div className='mb-3'>
                    <div className='mb-2 flex flex-col gap-2'>
                        <label htmlFor='username' className='text-dark-text-50 font-bold text-md'>
                            {form.username || "Username"}
                        </label>

                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                        />
                    </div>
                    <div className={` ${error ? 'mb-4' : 'mb-8'} flex flex-col gap-2`}>
                        <label htmlFor='password' className='text-dark-text-50 font-bold text-md'>
                            {form.password || "Password"}
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                        />
                    </div>
                    <Button
                        // isLoading={false}
                        className='font-bold text-[0.9rem] w-full rounded-full bg-primary text-dark-text'
                        // spinner={<Loading/>}
                        onClick={() => onLogin && onLogin(username, password)}
                        disabled={disabled}
                    >
                        {form.submit || "Sign In"}
                    </Button>
                </div>
                <div
                    className={`flex items-center gap-2 justify-between ${error ? 'mt-6 mb-6' : 'mt-8 mb-8'} opacity-40`}>
                    <p className='flex-1 h-[1px] rounded-full border border-dark-text-50'/>
                    <p className='font-semibold text-xs text-dark-text-50'>
                        OR
                    </p>
                    <p className='flex-1 h-[1px] rounded-full border border-dark-text-50'/>
                </div>
                <div className='pb-2'>
                    <SignInWithGoogle/>
                    <SignInWithGithub/>
                </div>
                <div className='flex items-center justify-center'>
                    <p className='flex items-center justify-center gap-1 font-semibold text-dark-text-50 text-md'>
                        Don&apos;t have an account?
                        <a
                            href={"/register"}
                            className='text-dark-text'
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )

}