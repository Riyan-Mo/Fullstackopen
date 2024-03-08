import { View, StyleSheet, Text } from "react-native"
import theme from "./theme"

export default function StatTab({name, value}) {
   const style = StyleSheet.create({
        container: {
            display: "flex",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: 6,
            paddingBottom: 6,
        },
        text:{
            textAlign: 'center',
            fontSize: theme.fontSizes.subheading,
            fontWeight: theme.fontWeights.bold,
        }
    })

    return (
        <View style={style.container}>
            <Text style={style.text}>
                {value}
            </Text>
            <Text>
                {name}
            </Text>
        </View>
    )
}