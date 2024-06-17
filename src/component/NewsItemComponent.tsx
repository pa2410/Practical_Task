import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import images from "../utils/images";

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
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', { newsData: item })} key={index} style={styles.container}>
            {item?.urlToImage ?
                <Image
                    source={{ uri: item?.urlToImage }}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />
                :
                <View style={styles.imagePlaceHolderView}>
                    <Image
                        source={images.emptyImg}
                        resizeMode="cover"
                        style={styles.imageStylePlaceHolder}
                    />
                </View>
            }
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
    imagePlaceHolderView: {
        height: 100, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.grey + '10'
    },
    imageStylePlaceHolder: {
        width: 60,
        height: 60
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