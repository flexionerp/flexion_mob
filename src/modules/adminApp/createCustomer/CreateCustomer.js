import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS } from '../../../constants'
import { BackButton } from '../../../common/backButton';
import { DropDownSingle } from '../../../common/dropDownColoredSingle'
import { CustomInput } from '../../../common/customInput'
import CustomDatePicker from '../../../common/customDatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { getCityList, getCityList1, getCountList, insertCustomer } from '../../../redux/property/property.action'
import { setLoader } from '../../../redux/loader/loader.action'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather';


let typeArray = [
    {
        id: 'Person',
        name: 'Person'
    },
    {
        id: 'Org',
        name: 'Org'
    }
]

const CreateCustomer = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { countryList, cityList, cityList1 } = useSelector(state => state.property)
    const { loader } = useSelector(state => state.loader)
    const { token } = useSelector(state => state.user)
    const [type, setType] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [arabicName, setArabicName] = useState('')
    const [passCountry, setPassCountry] = useState(null)
    const [passCountryId, setPassCountryId] = useState(null)
    const [passCity, setPassCity] = useState(null)
    const [passCityId, setPassCityId] = useState(null)
    const [resiCountry, setResiCountry] = useState(null)
    const [resiCountryId, setResiCountryId] = useState(null)
    const [resiCity, setResiCity] = useState(null)
    const [resiCityId, setResiCityId] = useState(null)
    const [resiAddress, setResiAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [fromDate, setFromDate] = useState(new Date());

    useEffect(() => {
        dispatch(getCountList())
        return () => {

        }
    }, [])


    useEffect(() => {
        return () => {

        }
    }, [])


    const getFromDate = value => {
        const x = new Date().setHours(0, 0, 0, 0);
        const y = new Date(value).setHours(0, 0, 0, 0);
        if (y > x) {
            alert("DOB should not greater than current date")
            setFromDate(new Date());
        } else {
            setFromDate(value);
        }
    };

    const getPassCountry = (value, id) => {
        setPassCountry(value)
        setPassCountryId(id)
        dispatch(setLoader(true))
        dispatch(getCityList(id))
    }

    const getPassCity = (value, id) => {
        setPassCity(value)
        setPassCityId(id)
    }

    const getResiCountry = (value, id) => {
        setResiCountry(value)
        setResiCountryId(id)
        dispatch(setLoader(true))
        dispatch(getCityList1(id))
    }
    const getResiCity = (value, id) => {
        setResiCity(value)
        setResiCityId(id)
    }


    const apiHit = () => {
        if (type == null) {
            alert("Please select customer type");
            return;
        }
        if (email == '') {
            alert("Email field should not be blank");
            return;
        }
        if (name == '') {
            alert("Name field should not be blank");
            return;
        }
        if (lastName == '') {
            alert("Last name field should not be blank");
            return;
        }
        if (arabicName == '') {
            alert("Arabic name field should not be blank");
            return;
        }
        if (passCountry == null) {
            alert("Please select passport county");
            return;
        }
        if (passCity == null) {
            alert("Please select passport city");
            return;
        }
        if (resiCountry == null) {
            alert("Please select residance country");
            return;
        }
        if (resiCityId == null) {
            alert("Please select residance city");
            return;
        }

        if (resiAddress == '') {
            alert("Address field should not be blank");
            return;
        }
        dispatch(setLoader(true))
        const data = {
            dob: moment(fromDate).format('dd-MMM-YYYY'),
            name: `${name} ${lastName}`,
            type: type,
            fname: name,
            lname: lastName,
            namear: arabicName,
            country: passCountryId,
            city: passCityId,
            country1: resiCountryId,
            city1: resiCityId,
            address1: resiAddress,
            USER_INFO_ID: token,
            email: email
        }
        dispatch(insertCustomer(data, navigation))
    }


    return (
        <SafeAreaView style={styles.container}>
            <BackButton navigation={navigation} label="Create Customer" />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={styles.bottom}>
                    <View style={{ width: '100%', marginTop: 12, marginBottom: 12 }}>
                        <DropDownSingle
                            name={type}
                            data={typeArray}
                            getValue={setType.bind(this)}
                            label="Type"
                        />
                    </View>
                    <CustomInput
                        width={"100%"}
                        label="Email"
                        placeholder='Enter Email'
                        value={email}
                        getValue={setEmail.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        width={"100%"}
                        label="Name"
                        placeholder='Enter Name'
                        value={name}
                        getValue={setName.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        width={"100%"}
                        label="Last Name"
                        placeholder='Enter Last Name'
                        value={lastName}
                        getValue={setLastName.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        width={"100%"}
                        label="Name in Arabic"
                        placeholder='Enter Name'
                        value={arabicName}
                        getValue={setArabicName.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        <CustomDatePicker
                            value={fromDate}
                            getValue={getFromDate.bind(this)}
                        />
                    </View>
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        <DropDownSingle
                            name={passCountry}
                            data={countryList}
                            getValue={getPassCountry.bind(this)}
                            label="Passport Country"
                        />
                    </View>
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        {
                            !loader && <DropDownSingle
                                name={passCity}
                                data={cityList}
                                getValue={getPassCity.bind(this)}
                                label="Passport City"
                            />
                        }
                    </View>
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        <DropDownSingle
                            name={resiCountry}
                            data={countryList}
                            getValue={getResiCountry.bind(this)}
                            label="Residance Country"
                        />
                    </View>
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        {
                            !loader && <DropDownSingle
                                name={resiCity}
                                data={cityList1}
                                getValue={getResiCity.bind(this)}
                                label="Residance City"
                            />
                        }
                    </View>

                    <CustomInput
                        width={"100%"}
                        label="Residance Address"
                        placeholder='Enter Address'
                        value={resiAddress}
                        getValue={setResiAddress.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        width={"100%"}
                        label="Mobile Number"
                        placeholder='Enter Mobile Number'
                        value={phone}
                        getValue={setPhone.bind(this)}
                        keyboardType={'email-address'}
                    />
                </View>
                {
                    loader
                        ?
                        <ActivityIndicator size={'small'} color={COLORS.primary} />
                        :
                        <TouchableOpacity onPress={() => apiHit()} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={styles.btnLabel} >Add Customer</Text>
                            <Icon name='arrow-right' size={14} />
                        </TouchableOpacity>
                }
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateCustomer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    },
    bottom: {
        width: '90%',
        alignItems: 'center'
    },
    labelStyle: {
        width: '100%',
        color: COLORS.primary,
        fontSize: CUSTOMWIDTH('4'),
        fontFamily: FONTS.SemiBold,
        marginBottom: 6,
    },
    btnLabel: {
        color: COLORS.boldText,
        fontSize: 14,
        fontFamily: FONTS.SemiBold,
        marginRight: 6
    }
})