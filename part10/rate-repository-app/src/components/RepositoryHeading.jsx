import { Image, View, StyleSheet } from "react-native"
import RepositoryDescription from "./RepositoryDescription"
import theme from "./theme"

export default function RepositoryHeading({item}) {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            columnGap: 18,
            padding: 15,
        },
        image:{
            borderRadius: theme.image.borderRadius,
        }
    })

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: item.ownerAvatarUrl,
                }}
                height={theme.image.height}
                width={theme.image.width}
                style={styles.image}
            />
            <RepositoryDescription item={item}/>
        </View>
    )
}