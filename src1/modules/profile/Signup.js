import { StyleSheet, Text, View, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, ICONS, SCREENS, CUSTOMHEIGHT } from '../../constants';
import { CustomInputP } from '../../common/customInputP'
import { RegularBtn } from '../../common/regularBtn'
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../redux/user/user.action';
import { setLoader } from '../../redux/loader/loader.action';



export function Signup({ navigation, route }) {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.loader)
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(setLoader(false))
    return () => {
    }
  }, [])


  const apiCall = () => {
    const data = {
      fName,
      lName,
      phone,
      email
    }
    dispatch(setLoader(true))
    dispatch(userSignup(data, navigation, clearData.bind(this)))
  }

  const clearData = () => {
    setFName('');
    setLName('');
    setPhone('');
    setEmail('');
  }


  return (
    <LinearGradient
      colors={[COLORS.g1, COLORS.g2, COLORS.g3]}
      style={styles.container}>
      <ImageBackground
        source={ICONS.bgImg}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ flex: 1, width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.main}>
            <Text style={styles.headingStyle} >Create Account</Text>
            <View style={{ height: 12 }} />
            <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <CustomInputP
                width={'48%'}
                placeholder='First Name'
                value={fName}
                getValue={setFName.bind(this)}
                keyboardType={'email-address'}
              />
              <CustomInputP
                width={'48%'}
                placeholder='Last Name'
                value={lName}
                getValue={setLName.bind(this)}
                keyboardType={'email-address'}
              />
              <CustomInputP
                width={'100%'}
                placeholder='Registered Email'
                value={email}
                getValue={setEmail.bind(this)}
                keyboardType={'email-address'}
              />
              <CustomInputP
                width={'48%'}
                placeholder='Phone No.'
                value={phone}
                getValue={setPhone.bind(this)}
                keyboardType={'email-address'}
              />
              <CustomInputP
                width={'48%'}
                placeholder='Country'
                value={phone}
                getValue={setPhone.bind(this)}
                keyboardType={'email-address'}
              />
              <CustomInputP
                width={'100%'}
                placeholder='Enter Password'
                value={phone}
                getValue={setPhone.bind(this)}
                keyboardType={'email-address'}
              />
              <CustomInputP
                width={'100%'}
                placeholder='Re-enter Password'
                value={phone}
                getValue={setPhone.bind(this)}
                keyboardType={'email-address'}
              />
            </View>
            <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}} >
              <View style={{ height: 40 }} />
              {
                loader
                  ?
                  <View style={{ width: '45%', alignItems: 'center', }}>
                    <ActivityIndicator size={"small"} color={COLORS.primary} />
                  </View>
                  :
                  <RegularBtn
                    label={"Sign up"}
                    size="50%"
                    onClick={() => apiCall()}
                    bgColor={COLORS.primary}
                  />
              }
              <View style={{ height: 18 }} />
              <Text onPress={() => navigation.navigate(SCREENS.LOGINSCREEN)} style={styles.footerText}>Already have an account? <Text style={{ textDecorationLine: 'underline' }} >Sign in</Text></Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  )
}

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
  },
  top: {
    alignItems: 'center'
  },
  headingStyle: {
    color: "#204866",
    fontSize: 25,
    fontFamily: FONTS.SemiBold,
    marginVertical: 6
  },
  forgotStyle: {
    color: COLORS.secondry,
    fontSize: 13,
    fontFamily: FONTS.Regular,
    alignSelf: 'center'
  },
  footerText: {
    color: "#A1A1A1",
    fontSize: 13,
    fontFamily: FONTS.Medium,
    textAlign: 'center'
  },
})