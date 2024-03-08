import { Pressable, Text, StyleSheet } from "react-native";
import theme from "./theme";

export default function AppBarTab({ name }) {
    const styles = StyleSheet.create({
        tab: {
            padding: 25,
            backgroundColor: theme.colors.grey,
            color: theme.text.white,
            fontSize: theme.fontSizes.heading,
        }
    })

    return (
        <Pressable>
            <Text style={styles.tab}>{name}</Text>
        </Pressable>
    )
}