import {LoginI18n} from '@hilla/react-components/LoginOverlay.js';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {LoginModal} from "Frontend/views/login/components/LoginModal";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {login} from "Frontend/auth";
import {UserEndpoint} from "Frontend/generated/endpoints";
import UserStatus from "Frontend/generated/com/hillarocket/application/enumration/UserStatus";
import Role from "Frontend/generated/com/hillarocket/application/domain/Role";

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
    const [hasError, setError] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        console.log("role", user?.role)
        if (user && user.id && url) {
            console.log("user.role === Role.ADMIN ", user.role === Role.ADMIN)
            const path = new URL(url, document.baseURI).pathname;
            UserEndpoint.send({userId: user.id, status: UserStatus.ONLINE});
            user.role === Role.ADMIN ? navigate(`/admin`) : navigate("/")
        }
    }, [user, url]);


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
        <div className='overflow-hidden w-[100vw] h-[100vh] relative'>
            <video
                autoPlay muted loop
                className='w-full h-full object-cover'
            >
                <source src='videos/login-page.mp4' type='video/mp4'/>
            </video>
            <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]'/>
            <LoginModal i18n={loginI18nDefault}
                        onLogin={handleLogin}
                        error={hasError}
                        disabled={disabled}
            />
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