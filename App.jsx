/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const [isNotDimigo, setNotDimigo] = useState(false);

  useEffect(()=> {
    GoogleSignin.configure({
                    //...디미고 내부 대회인데... .env 안써도 되겠죠.....
      webClientId : '372326566736-tri1dhp6nnarlvimg3iqbe5ct2l3vqc3.apps.googleusercontent.com'
    })
  })

  const pressGoogleButton = async () => {
    try {
      
      const {data : {idToken}} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log(userCredential.user)

      if(userCredential.user.email.endsWith('@dimigo.hs.kr')){
        setNotDimigo(false);
        await AsyncStorage.setItem('email', userCredential.user.email)
        
      }else{
        setNotDimigo(true);
        GoogleSignin.signOut()
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView>
        <View style={styles.wrap}>
            <View style={[styles.Top]}>
              <Text style={[styles.Title]}>DIMI FRIEND</Text>
              <Text style={[styles.descript]}>하루 1시간 새로운 친구를!</Text>
            </View>
            <View style={[styles.loginBtn]}>
              <GoogleSigninButton onPress={pressGoogleButton}></GoogleSigninButton>
              {isNotDimigo && (
                <Text style={[styles.error]}>디미고 계정을 사용해주세요</Text>
              )}
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Top: {
    width : '100%',
    height : '70%',
    justifyContent : 'center',
    display : 'flex',
    alignItems : 'center'

  },
  error : {
    color : 'red'
  },
  Img : {
    width : 25,
    height : 25,
  },
  loginBtn : {
    justifyContent : 'space-evenly',
    alignItems : 'center',
    width : '60%',
    height : '5%',
    borderRadius : 15,
    flexDirection : 'row',
    position : 'relative',
    top : '-10%',
    flexWrap : 'wrap'
  },
  loginTxt:{
    width : '70%',
    position : 'relative',
    left : '8%'
  },
  Title : {
    color : '#E83C77',
    fontWeight : 'bold',
    fontSize : 40,
    width : '57.5%',
  },
  descript:{
    color : '#555969'
  }
  ,
  wrap : {
    height : '100%',
    width : '100%',
    alignItems : 'center',
    borderStyle : 'solid',
    borderWidth : 2,
    borderColor : '#000000',
    backgroundColor : '#EFF0F6'
  },
  ShowBorder : {
    borderStyle : 'solid',
    borderColor : 'black',
    borderWidth : 2
  }
});

export default App;