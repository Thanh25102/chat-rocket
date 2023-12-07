import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@hilla/react-components/Button";
import {useForm, useFormPart} from "@hilla/react-form";
import {UserEndpoint} from "Frontend/generated/endpoints";
import UserModel from "Frontend/generated/com/hillarocket/application/domain/UserModel";
import {PasswordField} from "@hilla/react-components/PasswordField";
import {TextField} from "@hilla/react-components/TextField";
import {EmailField} from "@hilla/react-components/EmailField";
import './RegisterView.css'
import User from "Frontend/generated/com/hillarocket/application/domain/User";

const RegisterView = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const [emailUniqueErr, setEmailUniqueErr] = useState('')

    const {model, field, submit, addValidator, invalid, read} = useForm(UserModel, {
        onSubmit: async (user) => {
            await UserEndpoint.register(user).then(() => navigate("/login")).catch(e => setEmailUniqueErr(e.message))
        }
    });
    const emailField = useFormPart(model.email);
    useEffect(() => {
        addValidator({
            message: 'Please check that the password is repeated correctly',
            validate: (value: User) => {
                if (value.password != value.repeatedPassword) {
                    return [{property: model.repeatedPassword}];
                }
                return [];
            }
        });
    }, []);
    useEffect(() => {
        setEmailUniqueErr('')
    }, [invalid]);

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target.username.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const repeatPassword = e.target.repeatPassword.value;
        if (password !== repeatPassword) {
            setLoading(false)
            return;
        }
        const data = {
            username, name, password, provider: 'credentials', avatar: ''
        }
        try {
            // const action: any = await dispatch(AuthThunks.signUp(data));
            // router.push('/sign-in');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex-1 p-2 px-8'>
            <div className='mb-4 mt-1'>
                <h3 className='text-xl text-dark-text font-extrabold'>
                    Sign up to AmigoTasks
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                {emailUniqueErr && <div
                    className={`bg-red bg-red-500  px-4  text-white rounded-md text-sm opacity-100 my-4 py-2`}
                    role="alert">
                    <span className="block sm:inline">{emailUniqueErr}</span>
                </div>}
                <div className='flex flex-col gap-2'>
                    <EmailField
                        required
                        label={'Email'}
                        {...field(model.email)}
                        id='email'
                        name='email'
                        errorMessage={emailUniqueErr || "Enter a valid email address"}
                    ></EmailField>
                </div>
                <div className='flex flex-col gap-2'>
                    <TextField
                        required
                        label={'Fullname'}
                        {...field(model.fullName)}
                        id='fullName'
                        name='fullName'
                    />
                </div>
                <div className='flex flex-col gap-2 '>
                    <PasswordField
                        allowedCharPattern="[A-Za-z0-9]"
                        label={'Password'}
                        {...field(model.password)}
                        id='password'
                        className='text-md border-none outline-none border'
                        required
                        minlength={6}
                        maxlength={32}
                        errorMessage="Password
                                   6 to 32 characters. Only letters A-Z and numbers supported."
                    />

                </div>
                <div className='mb-4 flex flex-col gap-2'>
                    <PasswordField
                        required
                        label={'Repeat Password'}
                        {...field(model.repeatedPassword)}
                        id='repeatPassword'
                        name='repeatPassword'
                        className='text-md  border-none outline-none border'
                        errorMessage={'Please check that the password is repeated correctly'}
                    />
                </div>
                <Button
                    className='font-bold text-[0.9rem] w-full rounded-full bg-primary text-dark-text'
                    onClick={submit}
                    disabled={invalid}
                >
                    Sign Up
                </Button>
            </form>
            <div className='flex items-center justify-center'>
                <p className='flex items-center justify-center gap-1 font-semibold text-dark-text-50 text-md'>
                    Already have an account?
                    <Link
                        to={"/login"}
                        className='text-dark-text'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterView;


