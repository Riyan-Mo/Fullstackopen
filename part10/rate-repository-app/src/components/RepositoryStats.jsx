import { View, StyleSheet } from "react-native";
import StatTab from "./StatTab";
import theme from "./theme";

export default function RepositoryStats({ item }) {
    const style = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
        },
        text: {
            fontSize: theme.fontSizes.subheading,
        }
    })

    const statSet = {
        'Stars': item.stargazersCount,
        'Forks': item.forksCount,
        'Reviews': item.reviewCount,
        'Rating': item.ratingAverage,
    }

    function roundNumber(number){
        return (number/1000).toFixed(1)+"k";
    }

    const Stats = [];
    for (const key in statSet) {
            const intialValue = statSet[key];
            const value = intialValue>=1000? roundNumber(intialValue) : intialValue;
            Stats.push(
                <StatTab
                key={key+value} 
                name={key}
                value={value} />
            )
    }

    return (
        <View style={style.container}>
            {Stats}
        </View>
    )
}