import React, { } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import Pdf from 'react-native-pdf';
import { BackButton } from '../../../common/backButton';
import Header from '../../../common/HeaderSOA'
import { COLORS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';





export const BookingFromStatement = ({ navigation, route }) => {
    const soaUrl = route.params.soaUrl
    const source = { uri: soaUrl, cache: true };


    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }} >
            <ImageBackground
                source={ICONS.bgImg}
                style={styles.container}>
                <Header navigation={navigation} label={"Booking Form"} url={soaUrl} />
                <BackButton navigation={navigation} />
                <Pdf
                    trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {

                    }}
                    onPageChanged={(page, numberOfPages) => {

                    }}
                    onError={(error) => {

                    }}
                    onPressLink={(uri) => {

                    }}
                    style={styles.pdf} />
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.76,
        backgroundColor: COLORS.secondry,
        borderRadius: 10,
        // shadowColor: '#00000080',
        // shadowOffset: { width: 4, height: 5 },
        // shadowRadius: 4,
        // shadowOpacity: 0.26,
    }
});