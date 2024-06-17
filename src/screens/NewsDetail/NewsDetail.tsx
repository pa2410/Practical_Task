import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import images from "../../utils/images";
import colors from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";

const NewsDetail = ({ route, navigation }: any) => {

    const newsDetails = route?.params?.newsData;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backImgBtn} onPress={() => navigation.goBack()}>
                    <Image
                        source={images.backImg}
                        resizeMode="contain"
                        style={styles.backImgStyle}
                    />
                </TouchableOpacity>
                <View style={styles.separaterContainer}>

                </View>
                <TouchableOpacity style={styles.webContainer}>
                    <Text style={styles.webSourceText}>Web Source</Text>
                    <Image
                        source={images.sendImg}
                        resizeMode="contain"
                        style={styles.webSendImg}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Image
                    source={{ uri: newsDetails?.urlToImage }}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />

                <Text>{newsDetails?.title}</Text>
                <Text>{newsDetails?.description}</Text>
                <View style={styles.authorContainer}>
                <Text>{newsDetails?.author ? newsDetails.author:'N/A'}</Text>
                <Text>{'Date: '+newsDetails?.publishedAt ? newsDetails.author:'N/A'}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    authorContainer:{
        flexDirection:'row',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:colors.grey+'15'
    },
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    backImgBtn: {
        height: 50, width: 50, justifyContent: 'center', alignItems: 'center'
    },
    backImgStyle: {
        width: 30,
        height: 30
    },
    separaterContainer: {
        flex: 1
    },
    webContainer: {
        height: 30, marginRight: 10, alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', borderRadius: 15, backgroundColor: colors.blueColorPrimary + '10'
    },
    webSourceText: {
        fontWeight: '400', fontSize: 12, color: colors.blueColorPrimary
    },
    webSendImg: {
        width: 18,
        height: 18,
        marginLeft: 7,
    },
    imageStyle: {
        width: '90%',
        aspectRatio: 357 / 200,
        alignSelf: 'center',
        marginTop: 15
    },
})

export default NewsDetail;