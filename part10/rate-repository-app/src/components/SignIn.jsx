import React from "react"
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native"
import { useFormik } from 'formik'
import theme from "./theme";
import useSignIn from "../hooks/useSignIn";
import * as yup from "yup";
import { useNavigate } from 'react-router-native'

export default function SignIn() {
    const navigate = useNavigate();

    const [signIn] = useSignIn();

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(3, 'Username should be atleast 3 characters')
            .required('Username is required'),
        password: yup
            .string()
            .min(8, 'Password should be atleast 8 characters')
            .required('Password is required'),
    })

    const initialValues = {
        username: '',
        password: '',
    }

    const onSubmit = async(values) => {
        const {username, password} = values;

        try{
            const {data} = await signIn({username, password});
            navigate('/');
        }
        catch(e){
            console.log(e);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            padding: 20,
            fontFamily: theme.fonts.main,
            rowGap: 20,
        },
        input: {
            borderRadius: 4,
            borderWidth: 2,
            borderColor: theme.colors.form,
            color: theme.text.black,
            fontSize: theme.fontSizes.heading,
            padding: 10,
        },
        errorText:{
            color: theme.error.primary,
        },
        errorBorder:{
            borderColor: theme.error.primary,
        },
        signInButton: {
            backgroundColor: theme.colors.primary,
            borderRadius: 4,
        },
        signInButtonText: {
            fontSize: theme.fontSizes.heading,
            textAlign: "center",
            padding: 14,
            color: theme.text.white,
            fontWeight: theme.fontWeights.bold,
        },
    })

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder="Username"
                    name="username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    style={formik.errors.username?{...styles.input, ...styles.errorBorder}:{...styles.input}}
                />
                {formik.touched.username || formik.errors.username && (
                    <Text style={styles.errorText}>{formik.errors.username}</Text>
                )}
            </View>
            <View>
                <TextInput
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    style={formik.errors.password?{...styles.input, ...styles.errorBorder}:{...styles.input}}
                    secureTextEntry
                />
                {formik.touched.password || formik.errors.password && (
                    <Text style={styles.errorText}>{formik.errors.password}</Text>
                )}
            </View>
            <Pressable
                style={styles.signInButton}>
                <Text
                    onPress={formik.handleSubmit}
                    style={styles.signInButtonText}>
                    Sign in
                </Text>
            </Pressable>
        </View>
    )
}