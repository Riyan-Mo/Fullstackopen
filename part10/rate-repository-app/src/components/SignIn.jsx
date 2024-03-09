import React from "react"
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native"
import { useFormik } from 'formik'
import theme from "./theme";

export default function SignIn() {
    const initialValues = {
        username: '',
        password: '',
    }

    const onSubmit = (e) => {
        console.log(formik.values)
    }

    const formik = useFormik({
        initialValues,
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
        input:{
            borderRadius: 4,
            borderWidth: 2,
            borderColor: theme.colors.form,
            color: theme.text.black,
            placeholderTextColor: theme.colors.form,
            fontSize: theme.fontSizes.heading,
            padding: 10,
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
        }
    })

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                name="username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                style={styles.input}
                secureTextEntry
            />
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