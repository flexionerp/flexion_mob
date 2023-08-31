import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, ICONS, FONTS, SCREEN_WIDTH } from '../../../constants'
import { CustomInput } from '../../../common/customInput'
import { CustomMultiInput } from '../../../common/customMultiInput'
import { CheckBox } from '../../../common/checkbox'
import { RegularBtn } from '../../../common/regularBtn'


const AddPayment = ({ navigation, route }) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [terms, setTerms] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }} >
            <ImageBackground
                source={ICONS.bgImg}
                style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ flex: 1, width: '100%', backgroundColor: 'transparent', alignItems: 'center' }}>
                    <View style={styles.main}>
                        <Text style={styles.headingStyle} >Payment</Text>
                        <View style={{ height: 12 }} />
                        <View style={styles.inputContainer} >
                            <CustomInput
                                width={'48%'}
                                placeholder='First Name'
                                value={fName}
                                getValue={setFName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <CustomInput
                                width={'48%'}
                                placeholder='Last Name'
                                value={lName}
                                getValue={setLName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <CustomInput
                                width={'100%'}
                                placeholder='Res No.'
                                value={lName}
                                getValue={setLName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <CustomInput
                                width={'100%'}
                                placeholder='Unit Desc.'
                                value={lName}
                                getValue={setLName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <CustomInput
                                width={'100%'}
                                placeholder='Total Dues'
                                value={lName}
                                getValue={setLName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <CustomInput
                                width={'100%'}
                                placeholder='Amount (AED) *'
                                value={lName}
                                getValue={setLName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <CustomMultiInput
                                width={'100%'}
                                placeholder='Please provide the details if the amount paid is for multiple units and  transactions (Booking Fee, Installment, OQOOD Fee, ERES Fee, etc.) '
                                value={lName}
                                getValue={setLName.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                                <CheckBox
                                    value={terms}
                                    getValue={setTerms.bind(this)}
                                />
                                <Text style={styles.termsText} >Accept Terms & Conditions</Text>
                            </View>
                            <View style={{ width: '95%', flexDirection: 'row', marginTop: 4 }}>
                                <Text style={styles.feeText} >* </Text>
                                <Text style={styles.feeText}>Service fees of 3% will be charged on the payments processed through this link,
                                    Booking Fees (upto 10% of less of the property Value) paid towards the purchase of property is strictly non-refundable.</Text>
                            </View>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                                <Text style={[styles.termsText, { textDecorationLine: 'underline' }]} >Accept Terms & Conditions</Text>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }} >
                                <RegularBtn
                                    label={"Pay"}
                                    size="50%"
                                    onClick={() => {}}
                                    bgColor={COLORS.primary}
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default AddPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingStyle: {
        width: '90%',
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.044,
        fontFamily: FONTS.SemiBold,
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    termsText: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.03,
        fontFamily: FONTS.Regular,
        marginLeft: 5
    },
    feeText: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.023,
        fontFamily: FONTS.Regular,
    }
})