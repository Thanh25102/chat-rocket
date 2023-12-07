import React, {useCallback, useState} from 'react';
import {Button} from "@hilla/react-components/Button";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {PasswordField} from "@hilla/react-components/PasswordField";
import "./ChangePassword.css"
import {FaQuestion} from "react-icons/fa";
import {Dialog} from '@hilla/react-components/Dialog.js';
import UserDto from "Frontend/generated/com/hillarocket/application/dto/UserDto";
import {UserEndpoint} from "Frontend/generated/endpoints";
import {Notification} from "@hilla/react-components/Notification";

type PasswordStrength = {
    message: string;
    color: 'red' | 'orange' | 'blue' | 'green';
};

const ChangePassword = () => {

    const navigate = useNavigate();
    const [dialogOpened, setDialogOpened] = useState(false);
    const location = useLocation();
    const user: UserDto | undefined = location.state?.user;
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState({message: '', color: ''});
    const [strengthScore, setStrengthScore] = useState(0);

    const evaluatePasswordStrength = (password: string): PasswordStrength => {
        if (password.length < 6) {
            return {message: 'Too short', color: 'red'};
        }

        const checks = [
            /[A-Z]/.test(password), // Uppercase
            /[a-z]/.test(password), // Lowercase
            /\d/.test(password),    // Numbers
            !/yourName/i.test(password),  // Exclude name
            !/commonWord/i.test(password) // Exclude common word
        ];

        const strengthScore = checks.filter(Boolean).length;
        setStrengthScore(strengthScore)
        if (strengthScore < 3) {
            return {message: 'Weak', color: 'orange'};
        } else if (strengthScore === 3) {
            return {message: 'Medium', color: 'blue'};
        } else {
            return {message: 'Strong', color: 'green'};
        }
    };
    const handleChange = (e: any) => {
        const {value} = e.target;
        setPassword(value);
        setStrength(evaluatePasswordStrength(value));
    };

    const handleChangePassword = useCallback(() => {
        UserEndpoint.changePassword(user?.email, password).then(() => {
            Notification.show('Change password success please sign in.', {
                position: 'bottom-start',
                duration: 1,
                theme: 'success'
            })
            navigate("/login")
        }).catch(() => {
            Notification.show('Can\'t find your email please try again', {
                position: 'bottom-start',
                duration: 1,
                theme: 'error'
            })
            navigate("/login")
        })
    }, [password, strengthScore])

    if (!user) return <Navigate to={"/login"}/>
    return (
        <div className='p-4 px-8 flex flex-col h-3/4 justify-between'>
            <div className='mt-1'>
                <h3 className='text-xl text-dark-text font-extrabold'>
                    Choose a new password
                </h3>
            </div>
            <hr className="border h-[0.5px]" style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>
            <form className='space-y-4'>
                <h4 className='text-dark-text font-normal my-2'>
                    Create a new password that is at least 6 characters long. A strong password has a combination of
                    letters, digits and punctuation marks.
                </h4>
                <div className={"w-full space-x-4"}>
                    <PasswordField
                        allowedCharPattern="[A-Za-z0-9]"
                        placeholder={"New password"}
                        onValueChanged={handleChange}
                        id='password'
                        value={password}
                        className='text-md border-none outline-none border w-[70%]'
                        required
                        minlength={6}
                        maxlength={32}
                        errorMessage="Password 6 to 32 characters. Only letters A-Z and numbers supported."
                        helperText={strength.message}
                    />
                    <Button
                        onClick={() => setDialogOpened(true)}
                        className='font-bold text-[0.9rem] rounded-l text-dark-text w-[10px] py-2'
                        theme="primary" style={{backgroundColor: "hsla(214, 87%, 92%, 0.69)", color: "#333333"}}>
                        <FaQuestion/>
                    </Button>
                </div>

            </form>

            <hr className="border h-[0.5px] "
                style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>

            <div className={"space-y-2"}>
                <div className={'flex flex-row-reverse justify-between space-x-6 '}>
                    <div className={'flex flex-row justify-between space-x-2'}>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            onClick={() => navigate("/login")}
                            style={{backgroundColor: 'hsla(214, 87%, 92%, 0.69)', color: 'hsl(214, 35%, 21%)'}}
                        >
                            Skip
                        </Button>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            theme="primary"
                            onClick={() => handleChangePassword()}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog
                headerTitle="Create a strong password"
                opened={dialogOpened}
                onOpenedChanged={({detail}) => {
                    setDialogOpened(detail.value);
                }}
                footerRenderer={() => (
                    <Button theme="primary" onClick={() => setDialogOpened(false)}>
                        OK
                    </Button>
                )}
            >
                <p>As you create your password, remember the following:</p>
                <p>It <b>should not</b> contain your name.</p>
                <p>It <b>should not</b> contain a common dictionary word.</p>
                <p>It <b>should</b> contain one or more numbers.</p>
                <p>It <b>should</b> have both uppercase and lowercase characters.</p>
                <p>It <b>should</b> be at least six characters long.</p>
            </Dialog>
        </div>
    )
}

export default ChangePassword;



