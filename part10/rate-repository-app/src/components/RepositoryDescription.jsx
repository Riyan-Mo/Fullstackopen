import { View, Text, StyleSheet, Dimensions } from "react-native"
import theme from "./theme"

export default function RepositoryDescription({ item }) {    
    const style = StyleSheet.create({
        container:{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            rowGap: 8,
            flex: 1,
        },
        name:{
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.subheading,
            color: theme.colors.textPrimary,
        },
        description: {
            fontSize: theme.fontSizes.subheading,
            color: theme.colors.textSecondary,
        },
        language: {
            backgroundColor: theme.colors.primary,
            color: theme.text.white,
            padding: 4,
            borderRadius: 5,
        }
    })

    return (
        <View style={style.container}>
            <Text style={style.name}>
                {item.fullName}
            </Text>
            <Text style={style.description}>
                {item.description}
            </Text>
            <Text style={style.language}>
                {item.language}
            </Text>
        </View>
    )
}