import { Asset } from 'expo-asset';
import { ImageSourcePropType } from 'react-native';

export const images: { [key: string]: ImageSourcePropType } = {
  // Change this images
  logoBanner: require('../../assets/images/logoBanner.png'),
  logoBanner2: require('../../assets/images/logoBanner2.png'),
};

type VirtualAssetModuleType = number | string;

// preload images
const imageAssets = Object.keys(images).map((key) => {
  return Asset.fromModule(images[key] as VirtualAssetModuleType).downloadAsync();
});

export const loadImages = () => Promise.all(imageAssets);
