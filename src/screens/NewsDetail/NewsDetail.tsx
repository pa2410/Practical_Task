import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../utils/images';
import colors from '../../utils/colors';

const NewsDetail = ({route, navigation}: any) => {
  const newsDetails = route?.params?.newsData;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backImgBtn}
          onPress={() => navigation.goBack()}>
          <Image
            source={images.backImg}
            resizeMode="contain"
            style={styles.backImgStyle}
          />
        </TouchableOpacity>
        <View style={styles.separaterContainer} />
        {newsDetails.url && (
          <TouchableOpacity
            onPress={() => Linking.openURL(newsDetails.url)}
            style={styles.webContainer}>
            <Text style={styles.webSourceText}>Web Source</Text>
            <Image
              source={images.sendImg}
              resizeMode="contain"
              style={styles.webSendImg}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        {newsDetails?.urlToImage ? (
          <Image
            source={{uri: newsDetails?.urlToImage}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        ) : (
          <View style={styles.imagePlaceHolderView}>
            <Image
              source={images.emptyImg}
              resizeMode="cover"
              style={styles.imageStylePlaceHolder}
            />
          </View>
        )}
        <Text style={styles.titleText}>{newsDetails?.title}</Text>
        {newsDetails?.publishedAt && newsDetails?.author && (
          <View style={styles.authorContainer}>
            <Text style={styles.authorName}>
              {newsDetails?.author ? newsDetails.author : 'N/A'}
            </Text>
            {newsDetails?.publishedAt && (
              <Text style={styles.date}>
                {'Date: ' +
                  (newsDetails?.publishedAt ? newsDetails?.publishedAt : 'N/A')}
              </Text>
            )}
          </View>
        )}
        <Text style={styles.descText}>{newsDetails?.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePlaceHolderView: {
    width: '93%',
    aspectRatio: 357 / 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.grey + '10',
  },
  imageStylePlaceHolder: {
    width: 80,
    height: 80,
  },

  authorName: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.grey + '70',
    flex: 1,
  },
  date: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.grey,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 10,
  },
  descText: {
    fontWeight: '400',
    fontSize: 14,
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 10,
    color: colors.grey + '70',
  },
  authorContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey + '15',
    marginHorizontal: 15,
    padding: 10,
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  backImgBtn: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImgStyle: {
    width: 30,
    height: 30,
  },
  separaterContainer: {
    flex: 1,
  },
  webContainer: {
    height: 30,
    marginRight: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: colors.blueColorPrimary + '10',
  },
  webSourceText: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.blueColorPrimary,
  },
  webSendImg: {
    width: 18,
    height: 18,
    marginLeft: 7,
  },
  imageStyle: {
    width: '93%',
    aspectRatio: 357 / 200,
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default NewsDetail;
