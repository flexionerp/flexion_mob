import React, { } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Pdf from 'react-native-pdf';
import Header from '../../common/Header'
import { COLORS } from '../../constants';
import { useSelector } from 'react-redux'
import moment from 'moment'




const UnitStatementOfAccount = ({ navigation, route }) => {
    const UnitLedgerId = route.params.unit
    const token = useSelector(state => state.user.token)
    const source = { uri: `http://task.fakhruddinproperties.com/HolidayHomes/mobReport.aspx?type=SOA-UNIT&Id=${token}&fdate=01/01/${moment().format("YYYY")}&todate=${moment().format("MM/DD/YYYY")}&ctype=OWNR&uid=${UnitLedgerId}`, cache: true };


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label={"Statement Of Account"} />
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </SafeAreaView>
    )
}

export default UnitStatementOfAccount;

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