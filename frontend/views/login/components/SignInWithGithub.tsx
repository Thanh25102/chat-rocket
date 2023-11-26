import {useState} from "react";
import {Loading} from "Frontend/views/login/LoginView";
import {Img} from "react-image";
import {Navigate, useNavigate} from "react-router-dom";

const SignInWithGithub = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleClick = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        // await signIn("github", { callbackUrl: '/' })
        window.location.replace('http://localhost:8080/oauth2/authorization/github');
        setLoading(false);
    }

    return (
        <button
            onClick={handleClick}
            tabIndex={-1}
            className='w-full mb-3 bg-black rounded-full flex items-center justify-center gap-4 p-2'
        >
            {loading ?
                <Loading/> :
                <Img
                    width={20}
                    height={20}
                    alt='github'
                    src='icons/github.png'
                    className='w-[20px] h-[20xp] bg-[transparent]'
                />
            }
            <p className='font-bold text-md text-white'>
                Sign in with Github
            </p>
        </button>
    )
}

export default SignInWithGithub;