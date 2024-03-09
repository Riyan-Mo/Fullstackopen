import { Pressable, Text, StyleSheet } from "react-native";
import theme from "./theme";
import { Link } from "react-router-native";
import { useLocation } from "react-router-native";

export default function AppBarTab({ name, path }) {
    const pathname = useLocation().pathname
    const backgroundColor = pathname==path?"#111518":"transparent"
    const styles = StyleSheet.create({
        tab: {
            padding: 20,
            color: theme.text.white,
            fontSize: theme.fontSizes.heading,
            backgroundColor: backgroundColor,
        }
    })

    return (
        <Pressable>
            <Link to={path}><Text style={styles.tab}>{name}</Text></Link>
        </Pressable>
    )
}