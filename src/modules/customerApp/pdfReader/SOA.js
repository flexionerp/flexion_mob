import React, { } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Pdf from 'react-native-pdf';
import {BackButton} from '../../../common/backButton'
import { COLORS } from '../../../constants';


export const SOA = ({ navigation, route }) => {
    
    const source = { uri: 'http://tvh.flexion.ae:9092/api/reports/customer/soa_UNIT/396/true/33/730', cache: true };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton navigation={navigation} label={"SOA"} />
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
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: COLORS.secondry
    }
});