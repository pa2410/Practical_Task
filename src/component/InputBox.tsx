import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import images from '../utils/images';

interface CustomTextInputProps {
  icon?: any;
  showEye?: boolean;
  placeholder?: string;
  value?: string;
  errorText?: string;
  onChangeText?: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  icon,
  showEye,
  placeholder,
  value,
  onChangeText,
  errorText
}) => {

  const [eye, setEye] = useState<boolean>(true);

  const onIconPress = () => {
    setEye(!eye);
  }
  
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={eye}
        />
        {showEye &&
          <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
            <Image
              source={!eye ? images.view : images.hide}
              resizeMode='contain'
              style={{
                height: 20,
                width: 20,
                tintColor: '#0F69F1'
              }}
            />
          </TouchableOpacity>
        }

      </View>
      {errorText && <Text style={{ color: 'red', marginHorizontal: 20 }}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
    height: 50,
    borderColor: '#f2f2f2',
    backgroundColor: '#0F69F110',
    margin: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CustomTextInput;