import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../../component/InputBox";
import colors from "../../utils/colors";
import images from "../../utils/images";
import validation from "../../utils/validation";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";

const Login = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();

    const [userName, setUsername] = useState<string>('abc@gmail.com');
    const [password, setPassword] = useState<string>('1234567');
    const [userNameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const LoginHandler = () => {
        const userNameText = userName.trim();
        const passwordText = password.trim();
        let isValid = true;

        if (userNameText === '') {
            setUsernameError('Please enter username.');
            isValid = false;
        } else if (!validation.validateEmail(userNameText)) {
            setUsernameError('Please enter valid username');
            isValid = false;
        } else {
            setUsernameError('');
        }
        if (passwordText === '') {
            setPasswordError('Please enter password.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            dispatch(login({ name: userNameText }));
            navigation.navigate('Home');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <View style={styles.mainContainer}>
                <Image
                    source={images.BGLogin}
                    resizeMode="cover"
                    style={styles.BgImgStyle}
                />
                <Text style={styles.headerText1}>Welcome Back!</Text>
                <Text style={styles.headerText2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra.</Text>
            </View>

            <CustomTextInput
                placeholder="User name"
                value={userName}
                errorText={userNameError}
                onChangeText={(val: string) => setUsername(val)}
            />
            <CustomTextInput
                placeholder="Password"
                showEye
                value={password}
                errorText={passwordError}
                onChangeText={(val: string) => setPassword(val)}
            />
            <Text style={styles.forgotPswText}>Forgot password ?</Text>

            <View style={styles.spaceContainer}>
            </View>

            <TouchableOpacity onPress={() => LoginHandler()} style={styles.signinBtn}>
                <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.footerText1}>Don’t have an account ?
                <Text style={styles.footerText2}> Create Account</Text></Text>

        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        aspectRatio: 375 / 271,
        width: '100%',
        justifyContent: 'flex-end'
    },
    BgImgStyle: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: -100,
        opacity: 0.1
    },
    headerText1: {
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 20
    },
    headerText2: {
        fontSize: 15,
        marginTop: 5,
        marginHorizontal: 20,
        marginBottom: 20,
        color: colors.grey + '65'
    },
    forgotPswText: {
        color: colors.blueColorPrimary, fontWeight: '500', fontSize: 15, alignSelf: 'flex-end', marginRight: 20, marginTop: 15
    },
    spaceContainer: {
        flex: 1
    },
    signinBtn: {
        height: 50,
        margin: 20,
        backgroundColor: colors.blueColorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnText: {
        fontSize: 16, color: 'white', fontWeight: 'bold'
    },
    footerText1: {
        textAlign: 'center', marginBottom: 20, fontWeight: '400', fontSize: 14, color: colors.grey + '40'
    },
    footerText2: {
        fontSize: 14, color: colors.blueColorPrimary, fontWeight: 'bold'
    }
})