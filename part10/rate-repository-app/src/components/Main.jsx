import { StyleSheet, View, ScrollView } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './Appbar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
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