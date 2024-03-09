import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from './theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.grey,
        display: "flex",
        flexDirection: "row",
    },
});

const AppBar = () => {
    const tabs = [
        {
            name: "Repositories",
            path: "/",
        },
        {
            name: "SignIn",
            path: "/SignIn",
        },
    ];
    return <View style={styles.container}>
        <ScrollView horizontal>
        {tabs.map((tab) => <AppBarTab key={tab.name} name={tab.name} path={tab.path} />)}
        </ScrollView>
    </View>;
};

export default AppBar;