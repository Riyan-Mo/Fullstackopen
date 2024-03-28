import React from "react"
import { useNavigate } from 'react-router-native'
import useSignIn from "../hooks/useSignIn";
import { SignInContainer } from "./SignInContainer";

export default function SignIn() {
    const navigate = useNavigate();

    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });
            navigate('/');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <SignInContainer onSubmit={onSubmit} />
    )
}