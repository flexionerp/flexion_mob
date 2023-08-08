import React, { } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../common/HeaderBSh'
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux'
import moment from 'moment'




export const BookingFromStatement = ({ navigation, route }) => {
    const soaUrl = route.params.soaUrl
    const source = { uri: soaUrl, cache: true };


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label={"Booking Form"} url={soaUrl} />
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
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: COLORS.secondry
    }
});