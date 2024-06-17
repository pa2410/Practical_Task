import React from 'react';
import {Modal, StatusBar, Text, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
type Props = {
  images: any;
  isVisible: boolean;
  onClose: () => void;
};

function ImageViewerComponent({onClose, images, isVisible}: Props) {
  return (
    <Modal visible={isVisible} transparent={true}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <ImageViewer imageUrls={images} />
      <TouchableOpacity
        onPress={() => {
          onClose();
        }}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF50',
          borderRadius: 25,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          X
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}

export default ImageViewerComponent;
