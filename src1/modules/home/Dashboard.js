import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../common/HeaderN'
import { UserDetail } from '../../common/UserDetail'
import { StatsRow } from '../../common/statsRow'
import { OtherStats } from '../../common/otherStats'
import { getCountryList, getReservationList, getPropertyStats } from '../../redux/property/property.action';
import { useDispatch, useSelector } from 'react-redux';
import { ICONS } from '../../constants';



export function Dashboard({ navigation, route }) {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getReservationList(token))
    dispatch(getCountryList())
    dispatch(getPropertyStats())
    return () => {

    }
  }, [token])


  return (
    <ImageBackground
      source={ICONS.bgImg}
      style={styles.container}>
      <SafeAreaView style={styles.main}>
        <ScrollView style={{ width: '100%' }} >
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
            <UserDetail />
            <OtherStats navigation={navigation} />
            <StatsRow navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  }
})