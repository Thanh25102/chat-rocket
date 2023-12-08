import React, {useCallback, useState} from 'react';
import {Button} from "@hilla/react-components/Button";
import './RecoverOption.css'
import {Avatar} from "Frontend/components/avatar/Avatar";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

import UserDto from "Frontend/generated/com/hillarocket/application/dto/UserDto";
import {UserEndpoint} from "Frontend/generated/endpoints";
import {Notification} from '@hilla/react-components/Notification.js';
import {RadioGroup} from "@hilla/react-components/RadioGroup";
import {RadioButton} from "@hilla/react-components/RadioButton";

const options = [
    {
        id: 'GOOGLE',
        type: 'Use my Google account',
        desc: 'Log in to Google (if you aren\'t already) to quickly reset your password.'
    },
    {
        id: 'EMAIL',
        type: 'Send code via email.',
        desc: 'manhthanh147@gmail.com'
    },

]
const RecoverOption = () => {
    const [items, setItems] = useState(options);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const user: UserDto | undefined = location.state?.user;

    const [selectedValue, setSelectedValue] = React.useState("EMAIL");

    if (!user) return <Navigate to={"/login"}/>


    const handleContinue = useCallback(() => {
        setLoading(true)
        selectedValue === "EMAIL" && UserEndpoint.recoverAccount(user.email).then(() => navigate("/recover/code", {state: {user: user}})).catch(() =>
            Notification.show('Something went wrong, please try again!', {
                position: 'bottom-start',
                duration: 0,
            })
        ).finally(() => setLoading(false));
    }, [user.email, selectedValue])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    const controlProps = (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: {'aria-label': item},
    });


    return (
        <div className='p-4 px-8 flex flex-col h-full justify-between'>
            <div className='mt-1'>
                <h3 className='text-xl text-dark-text font-extrabold'>
                    Reset Your Password
                </h3>
            </div>
            <hr className="border h-[0.5px]" style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>

            <form className='mb-3'>
                <h4 className='text-dark-text font-normal '>
                    How do you want to receive the code to reset your password?
                </h4>
                <div className='mb-2 flex flex-row justify-between my-4'>
                    <RadioGroup theme="vertical">
                        {items.map(card =>
                            <RadioButton value={card.id} key={card.id}
                                         style={{
                                             '--vaadin-input-field-border-width': '2px',
                                         } as React.CSSProperties}
                            >
                                <label slot="label">
                                    <p className={'text-md text-dark-text font-normal'}>
                                        {card.type}
                                    </p>
                                    <p className={'text-sm text-dark-text font-light'}>
                                        {card.desc}
                                    </p>
                                </label>
                            </RadioButton>
                        )}
                    </RadioGroup>

                    <div className="flex flex-col flex-grow  w-[120px] justify-center align-middle space-y-1"
                         style={{alignItems: "center"}}>
                        <Avatar names={[user.fullName || "UK"]}/>
                        <p className={'truncate w-full text-sm text-dark-text font-light'}>
                            {user.fullName}
                        </p>
                    </div>
                </div>
            </form>
            <hr className="border h-[0.5px]"
                style={{backgroundColor: "hsla(214, 91%, 94%, 0.8)"}}></hr>
            <div className={"space-y-2 mb-6"}>
                <div className={'flex flex-row-reverse justify-between space-x-6 mt-4 '}>
                    <div className={'flex flex-row justify-between space-x-2'}>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            onClick={() => navigate("/login/identify")}
                            style={{backgroundColor: 'hsla(214, 87%, 92%, 0.69)', color: 'hsl(214, 35%, 21%)'}}
                        >
                            Not you?
                        </Button>
                        <Button
                            className='font-bold text-[0.9rem] rounded-l text-dark-text'
                            onClick={handleContinue}
                            theme="primary"
                            disabled={loading}
                        >
                            Continue
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
            <div></div>
        </div>
    )
}

export default RecoverOption;


