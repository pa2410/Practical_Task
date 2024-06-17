import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../../component/InputBox";
import images from "../../utils/images";
import colors from "../../utils/colors";
import { getData } from "../../utils/api";
import NewsItemComponent from "../../component/NewsItemComponent";

const Home = () => {

    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchNewsData();
    }, []);

    const fetchNewsData = async () => {
        setLoading(true);
        try {
            const response = await getData();
            console.log('response', JSON.stringify(response));
            if (response && response.status == 'ok' && response.articles?.length > 0) {
                setNewsData(response?.articles);
            } else {
                setNewsData([]);
            }
            setLoading(false);
        } catch (error) {
            console.log('error', error);
            setLoading(false);
        }
    }

    const renderNewsItems = useCallback(({ item, index }: any) => {
        return <NewsItemComponent item={item} index={index} />
    }, []);

    const renderNewsItemsSeperator = useCallback(({ item, index }: any) => {
        return (
            <View style={{ backgroundColor: '#00000030', height: 0.5, margin: 15  }}>
                
            </View>
        )
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <CustomTextInput
                    placeholder="Search news..."
                    leftImg={images.search}
                    inputStyle={styles.searchStyle}
                    placeHolderColor={colors.blueColorPrimary}
                />
                <TouchableOpacity style={styles.frameStyle}>
                    <Image
                        source={images.frame}
                        resizeMode="contain"
                        style={styles.frameImg}
                    />
                </TouchableOpacity>
            </View>

            {loading ? <ActivityIndicator size={"large"} /> :
                <FlatList
                    data={newsData}
                    keyExtractor={({ index }) => index + ''}
                    renderItem={renderNewsItems}
                    ItemSeparatorComponent={renderNewsItemsSeperator}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchStyle: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.blueColorPrimary
    },
    rowContainer: {
        flexDirection: 'row'
    },
    frameStyle: {
        marginLeft: -15,
        marginRight: 5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50, height: 50
    },
    frameImg: {
        height: 22,
        width: 22,
    }
})

export default Home;