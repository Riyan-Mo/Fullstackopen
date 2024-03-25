import { useEffect } from "react";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { Text } from "react-native";
import { useNavigate } from "react-router-native";

export default function SignOut(){
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const signOut = async() => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
    }
    
    useEffect(()=>{
        signOut();
        setTimeout(()=>{
            navigate('/');
        }, 5000);
    })

    return <Text>Signed Out Successfully!</Text>;
}