import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from './theme';
import { useQuery } from "@apollo/client";
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.grey,
        display: "flex",
        flexDirection: "row",
    },
});

const AppBar = () => {
    const response = useQuery(ME)

    const isUser = response?.data?.me !== null

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
            {tabs.map((tab) => {
                if (isUser && tab.name === 'SignIn') {
                    const name = "SignOut"
                    const path = "/SignOut"
                    return (
                        <AppBarTab key={name} name={name} path={path} />
                    )
                }
                return (
                    <AppBarTab key={tab.name} name={tab.name} path={tab.path} />)
            }
            )}

        </ScrollView>
    </View>;
};

export default AppBar;