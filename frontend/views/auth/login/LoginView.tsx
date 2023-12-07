import {LoginI18n} from '@hilla/react-components/LoginOverlay.js';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {login} from "Frontend/auth";
import {UserEndpoint} from "Frontend/generated/endpoints";
import UserStatus from "Frontend/generated/com/hillarocket/application/enumration/UserStatus";
import Role from "Frontend/generated/com/hillarocket/application/domain/Role";
import {Button} from "@hilla/react-components/Button";
import SignInWithGoogle from "Frontend/views/auth/login/components/SignInWithGoogle";
import SignInWithGithub from "Frontend/views/auth/login/components/SignInWithGithub";

const loginI18nDefault: LoginI18n = {
    form: {
        title: "Sign in to ChatRocket",
        username: 'Username',
        password: 'Password',
        submit: 'Sign In',
        forgotPassword: 'Forgot password',
    },
    header: {title: 'hilla-with-auth-22-12-20', description: 'Login using user/user or admin/admin'},
    errorMessage: {
        title: 'Incorrect username or password',
        message: 'Check that you have entered the correct username and password and try again.',
        username: 'Username is required',
        password: 'Password is required',
    },
};

export default function LoginView() {
    const {user} = useAppSelector(state => state.auth)
    const [error, setError] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.id && url) {
            const path = new URL(url, document.baseURI).pathname;
            UserEndpoint.send({userId: user.id, status: UserStatus.ONLINE});
            user.role === Role.ADMIN ? navigate(`/admin`) : navigate("/")
        }
    }, [user, url]);

    const {form, header, errorMessage, additionalInformation} = loginI18nDefault

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (username: string, password: string) => {
        setDisabled(true)
        const {
            defaultUrl,
            error,
            redirectUrl,
        } = await login(username, password, AuthThunks.getUser);
        if (error) {
            setError(true);
            setDisabled(false)
        } else {
            dispatch(AuthThunks.getUser()).then(() => {
                setUrl(redirectUrl ?? defaultUrl ?? '/');
                setUrl('/');
            })
        }
    }

    return (
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
                    onClick={() => handleLogin && handleLogin(username, password)}
                    disabled={disabled}
                >
                    {form.submit || "Sign In"}
                </Button>
                <p className={'text-md text-dark-text font-light text-center'} style={{lineHeight:"44px",cursor:"pointer"}} onClick={()=>navigate("/login/identify")}>Forgot password?</p>

            </div>
            <div
                className={`flex items-center gap-2 justify-between ${error ? 'mt-2 mb-2' : 'mt-4 mb-4'} opacity-40`}>
                <p className='flex-1 h-[1px] rounded-full border border-dark-text-50'/>
                <p className='font-semibold text-xs text-dark-text-50'>
                    OR
                </p>
                <p className='flex-1 h-[1px] rounded-full border border-dark-text-50'/>
            </div>
            <div>
                <SignInWithGoogle/>
                <SignInWithGithub/>
            </div>
            <div className='flex items-center justify-center'>
                <p className='flex items-center justify-center gap-1 font-semibold text-dark-text-50 text-md'>
                    Don&apos;t have an account?
                    <p
                        onClick={() => navigate("/register")}
                        className='text-dark-text'
                        style={{cursor: "pointer"}}
                    >
                        Sign up
                    </p>
                </p>
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