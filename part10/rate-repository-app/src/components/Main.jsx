import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './Appbar';
import SignIn from './SignIn';
import theme from './theme';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: theme.fonts.main,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='SignIn' element={<SignIn />} />
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
}

export default Main;