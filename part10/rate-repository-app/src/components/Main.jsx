import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './Appbar';
import SignIn from './SignIn';
import theme from './theme';
import SignOut from './SignOut';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: theme.fonts.main,
    },
});

const Main = () => {

    const routeArr = [
        {
            path: '/',
            element: <RepositoryList />,
        },
        {
            path: 'SignIn',
            element: <SignIn />,
        },
        {
            path: 'SignOut',
            element: <SignOut />,
        },
        {
            path: '*',
            element: <Navigate to="/" replace />,
        },
    ]

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                {routeArr.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
            </Routes>
        </View>
    )
}

export default Main;