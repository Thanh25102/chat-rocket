import React, {useCallback, useState} from 'react';
import {Button} from "@hilla/react-components/Button";
import './IdentifyAccount.css'
import {useNavigate} from "react-router-dom";
import {UserEndpoint} from "Frontend/generated/endpoints";

const IdentifyAccount = () => {

    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    }
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleSearchByEmail = useCallback(() => {
        UserEndpoint.findByEmail(email)
            .then((user) => user ? navigate("/login/recover/option", {state: {user: user}}) : setError(true))
    }, [email]);

    return (
        <div className='p-4 px-8 flex flex-col h-3/4 justify-between'>
            <div className='mt-1'>
                <h3 className='text-xl text-dark-text font-extrabold'>
                    Find Your Account
                </h3>
            </div>
            <hr className="border h-[0.5px]" style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {error && <div
                    className={`bg-red bg-red-500  px-4  text-white rounded-md text-sm opacity-100 my-4 py-2`}
                    role="alert">
                    <span className="block sm:inline">{"Email isn't exist."}</span>
                </div>}
                <h4 className='text-dark-text font-normal my-2'>
                    Please enter your email address or mobile number to search for your account.
                </h4>
                <div className='flex flex-col gap-2'>
                    <input
                        placeholder={"Email address or mobile number"}
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='rounded-md text-dark-text font-semibold text-md bg-dark-background-50 border-none outline-none py-2.5 px-3 shadow-sm border'
                    />
                </div>
            </form>

            <hr className="border h-[0.5px] "
                style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>

            <div className={"space-y-2"}>
                <div className={'flex flex-row-reverse justify-between space-x-6 '}>
                    <div className={'flex flex-row justify-between space-x-2'}>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            // onClick={submit}
                            style={{backgroundColor: 'hsla(214, 87%, 92%, 0.69)', color: 'hsl(214, 35%, 21%)'}}
                        >
                            Cancel
                        </Button>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            onClick={handleSearchByEmail}
                            theme="primary"
                        >
                            Search
                        </Button>
                    </div>
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

export default IdentifyAccount;



