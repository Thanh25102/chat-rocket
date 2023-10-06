import {useState} from "react";
import {Loading} from "Frontend/views/login/LoginView";

const SignInWithGoogle = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        // signIn("google", { callbackUrl: '/' })
    }

    return (
        <button
            onClick={handleClick}
            tabIndex={-1}
            className='w-full mb-3 bg-black rounded-full flex items-center justify-center gap-4 p-2'
        >
            {loading ?
                <Loading /> :
                <img
                    width={20}
                    height={20}
                    alt='google'
                    src='icons/google.png'
                    className='w-[20px] h-[20xp]'
                />
            }
            <p className='font-bold text-md text-white'>
                Sign in with Google
            </p>
        </button>
    )
}

export default SignInWithGoogle