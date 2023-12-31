import {useState} from "react";
import {Loading} from "Frontend/views/auth/login/LoginView";

const host = "http://103.20.102.120:8080"
// const host = "http://localhost:8080"
const SignInWithGoogle = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = (e: any) => {
        e.preventDefault();
        location.href = `${host}/oauth2/authorization/github`
    }

    return (
        <button
            onClick={handleClick}
            tabIndex={-1}
            className='w-full mb-3 bg-black rounded-full flex items-center justify-center gap-4 p-2'
        >
            {loading ?
                <Loading/> :
                <img
                    width={20}
                    height={20}
                    alt='google'
                    src='../../../../../src/main/resources/META-INF/resources/icons/google.png'
                    className='w-[20px] h-[20xp]'
                />
            }
            <p className='font-bold text-md text-white'>
                Log in with Google
            </p>
        </button>
    )
}

export default SignInWithGoogle