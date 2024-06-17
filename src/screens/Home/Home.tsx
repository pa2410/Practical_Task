import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomTextInput from '../../component/InputBox';
import images from '../../utils/images';
import colors from '../../utils/colors';
import {getData} from '../../utils/api';
import NewsItemComponent from '../../component/NewsItemComponent';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debounceTimeoutRef = useRef(null);
  const queryText = useRef('news');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    setLoading(true);
    try {
      const response = await getData(
        queryText.current == '' ? 'news' : queryText.current,
      );
      if (
        response &&
        response.status == 'ok' &&
        response.articles?.length > 0
      ) {
        setNewsData(response?.articles);
      } else {
        setNewsData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const filterNewsData = () => {
    const sortedData = newsData.sort((a, b) => {
      const dateA = moment(a.publishedAt);
      const dateB = moment(b.publishedAt);
      return dateA - dateB;
    });

    setNewsData(sortedData);
  };

  const renderNewsItems = useCallback(({item, index}: any) => {
    return <NewsItemComponent item={item} index={index} />;
  }, []);

  const renderNewsItemsSeperator = useCallback(({item, index}: any) => {
    return (
      <View
        style={{backgroundColor: '#00000030', height: 0.5, margin: 15}}></View>
    );
  }, []);

  const searchOnChangeText = (val: string) => {
    setSearch(val);
    queryText.current = val;
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      fetchNewsData();
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={styles.rowContainer}>
        <CustomTextInput
          placeholder="Search news..."
          leftImg={images.search}
          inputStyle={styles.searchStyle}
          placeHolderColor={colors.blueColorPrimary}
          onChangeText={(val: string) => searchOnChangeText(val)}
          value={search}
        />
        <TouchableOpacity
          onPress={() => {
            filterNewsData();
          }}
          style={styles.frameStyle}>
          <Image
            source={images.frame}
            resizeMode="contain"
            style={styles.frameImg}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={({item, index}) => index + ''}
          renderItem={renderNewsItems}
          ItemSeparatorComponent={renderNewsItemsSeperator}
        />
      )}

      <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchStyle: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.blueColorPrimary,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  frameStyle: {
    marginLeft: -15,
    marginRight: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  frameImg: {
    height: 22,
    width: 22,
  },
  signOutBtn: {
    height: 50,
    margin: 20,
    backgroundColor: colors.blueColorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
