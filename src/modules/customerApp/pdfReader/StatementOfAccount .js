import React, { } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { BackButton } from '../../../common/backButton';
import Header from '../../../common/HeaderSOA'
import { COLORS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';



export const StatementOfAccount = ({ navigation, route }) => {
    const soaUrl = route.params.soaUrl
    const label = route.params.label
    const source = { uri: soaUrl, cache: true };
   
    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }} >
            <ImageBackground
                source={ICONS.bgImg}
                style={styles.container}>
                <Header navigation={navigation} label={label} url={soaUrl} />
                <BackButton navigation={navigation} label={''} />
                <View style={{height:3}} />
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
    }
});