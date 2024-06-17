import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

interface newsItemsPros {
    item: any;
    index: number
}

const NewsItemComponent = ({
    item,
    index
}: newsItemsPros) => {

    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetail',{
            newsData: item
        })} key={index} style={styles.container}>
            <Image
                source={{ uri: item?.urlToImage }}
                resizeMode="cover"
                style={styles.imageStyle}
            />
            <View style={styles.rightSideContainer}>
                <Text style={styles.titleStyle}>{item?.title}</Text>
                <Text numberOfLines={3} style={styles.descStyle}>{item?.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginHorizontal: 15
    },
    imageStyle: {
        width: 100,
        height: 100
    },
    titleStyle: {
        fontSize: 16, fontWeight: '700', color: colors.grey
    },
    descStyle: {
        fontSize: 12, fontWeight: '400', color: colors.grey + '60'
    },
    rightSideContainer: {
        marginLeft: 10,
        flex: 1
    }
})

export default NewsItemComponent;