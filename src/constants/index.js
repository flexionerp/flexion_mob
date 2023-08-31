import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
};
export * from './colors';
export * from './icons';
export * from './fonts';
export * from './baseURL';
export * from './imageBaseURL';
export * from './layout';
export * from './screenNames';