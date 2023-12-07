import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@hilla/react-components/Button";
import './SendCodeView.css'
import {NumberField} from "@hilla/react-components/NumberField";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {UserEndpoint} from "Frontend/generated/endpoints";
import UserDto from "Frontend/generated/com/hillarocket/application/dto/UserDto";
import {Notification} from "@hilla/react-components/Notification";

const SendCodeView = () => {
    const location = useLocation();
    const user: UserDto | undefined = location.state?.user;
    if (!user) return <Navigate to={"/login"}/>
    const [code, setCode] = useState<number>();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    }
    const verifyCode = useCallback(() => {
        UserEndpoint.verifyCode(user.email, code + "").then(r => {
                Notification.show(r ? 'Verify success' : 'Verify failed', {
                    position: 'bottom-start',
                    duration: 1,
                    theme: r ? 'success' : 'error',
                })
                navigate("/recover/password", {state: {user: user}})
            }
        ).catch(()=>
            Notification.show('Something went wrong, please try again.', {
                position: 'bottom-start',
                duration: 1,
                theme:'error',
            })
        )
    }, [code]);
    const navigate = useNavigate();

    const [durationCode, setDurationCode] = useState<number>(56);

    useEffect(() => {
        if (durationCode === 0) return;
        const interval = setInterval(() => setDurationCode(durationCode - 1), 1000);
        return () => clearInterval(interval);
    }, [durationCode]);

    const [loading, setLoading] = useState<boolean>(false)
    const resendCode = () => {
        setLoading(true)
        UserEndpoint.recoverAccount(user.email).then(() => {
            setDurationCode(59);
        }).catch(() => {
            Notification.show('Something went wrong, please try again!', {
                position: 'bottom-start',
                duration: 0,
            })
        }).finally(() => setLoading(false))
    }

    return (
        <div className='p-4 px-8 flex flex-col h-4/5 justify-between'>
            <div className='mt-1'>
                <h3 className='text-xl text-dark-text font-extrabold'>
                    Enter security code
                </h3>
            </div>
            <hr className="border h-[0.5px]" style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>

            <form onSubmit={handleSubmit} className='mb-3'>
                <h4 className='text-dark-text font-normal '>
                    Please check your emails for a message with your code, your code is 6 numbers long.
                </h4>
                {
                    durationCode === 0 ?
                        <h5 className='text-md mt-3 text-dark-text font-normal '>Code has expired, please resend a
                            code.</h5> :
                        <h5 className='text-md mt-3 text-dark-text font-normal '>Code expires
                            in {durationCode} seconds.</h5>
                }
                <div className='mb-10 flex flex-row justify-between space-x-6 mt-6 -align-center '>
                    <NumberField
                        placeholder={'Enter code'}
                        required
                        id='repeatPassword'
                        name='repeatPassword'
                        className='text-md  border-none outline-none border flex-1'
                        onValueChanged={(e) => setCode(+e.detail.value)}
                    />
                    <h4 className='text-m text-dark-text font-normal flex-1'>We sent your code to:
                        <span className='text-md text-dark-text font-normal'>{user.email}</span>
                    </h4>
                </div>
                <hr className="border h-[0.5px] mb-8"
                    style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>
                <div className={'flex flex-row justify-between space-x-6 mt-4 '}>
                    <p className={'text-md text-dark-text font-light '} style={{cursor: "pointer", lineHeight: "44px"}}
                       onClick={resendCode}>Resend a
                        code?</p>
                    <div className={'flex flex-row justify-between space-x-2'}>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            onClick={() => navigate("/login")}
                            style={{backgroundColor: 'hsla(214, 87%, 92%, 0.69)', color: 'hsl(214, 35%, 21%)'}}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            onClick={verifyCode}
                            theme="primary"
                            disabled={loading}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </form>
            <div className='flex items-center justify-center'>
                <p className='flex items-center justify-center gap-1 font-semibold text-dark-text-50 text-md'>
                    Don&apos;t have an account?
                    <p
                        style={{cursor: "pointer"}}
                        onClick={() => navigate("/register")}
                        className='text-dark-text'
                    >
                        Sign up
                    </p>
                </p>
            </div>
        </div>
    )
}

export default SendCodeView;


