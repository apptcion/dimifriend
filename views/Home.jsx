import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

const Home = ({ navigation}) => {
  const [nickname, setNickname] = useState('')
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const getNickname = async () => {
      const storedNickname = await AsyncStorage.getItem('Nickname');
      if (storedNickname) {
        setNickname(storedNickname); // 초기값 설정
      } else {
        navigation.navigate('Login');
      }
      console.log(await AsyncStorage.getItem('profile'))
    };
    getNickname();
  }, [navigation]);

  return (
      <SafeAreaView>            
        <View style={[ styles.BG]}>
          <Image style={[styles.BG_pattern]} source={require('../assets/img/BG_pattern.png')}></Image>
          <View style={[styles.TitleWrap]}>
            <View style={[styles.Title]}><Text style={[styles.TitleMsg]}>DIMI</Text></View>
            <View style={[styles.Title]}><Text style={[styles.TitleMsg]}>FRIENDS</Text></View>
            <View style={[styles.Underbar]}></View>
          </View>
          <View style={styles.inputWrap}>
            <TextInput style={styles.input}
              placeholder='채팅에 사용할 닉네임 입력'
              placeholderTextColor="rgba(0,0,0,0.3)"
              value={nickname}
              onChangeText={(text) => {
                setNickname(text);
                AsyncStorage.setItem('Nickname', text);
                }}
            />
          </View>
          {showWarning && <Text style={[styles.warning]}>닉네임이 너무 짧거나 길어요</Text>}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(0 < nickname.length && nickname.length <= 10){
                AsyncStorage.setItem('Nickname', nickname)
                let now = new Date().getHours();
                if(now < 23){
                  navigation.navigate('Wait')
                }else{
                  navigation.navigate('Match')
                }
              }else{
                setShowWarning(true)
              }
            }}
          >
              <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectProfile]}
            onPress={() => {
              navigation.navigate('Profile')
            }}
          >
            <Text style={styles.selectProfileTxt}>프로필 선택하러 가기 {'❯'}</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/img/BG_pattern2.png')} style={styles.bottomPattern}/>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  ShowBorder : {
      borderStyle : 'solid',
      borderColor : 'black',
      borderWidth : 1
  },
  BG : {
      padding : '7%',
      width : '100%',
      height : '100%',
      backgroundColor : '#EFF0F6'
  },
  BG_pattern : {
    position : 'absolute',
    top : 0,
    right : 0
  },
  TitleWrap : {
    width : '100%',
    height : '12%',
    marginTop : '49.5%',
  },
  Title : {
    display : 'flex',
    justifyContent : 'center',
    flexDirection : 'row',
    height : '38%'
  },
  TitleMsg : {
    color : '#E83C77',
    fontSize : 30,
    fontWeight : 'bold',
    textShadowColor : 'rgba(0,0,0,0.1)',
    textShadowOffset : {height : 4, width : 0},
    textShadowRadius : 7
  },
  Underbar : {
    width : '44%',
    height : '7%',
    backgroundColor : '#E83C77',
    shadowColor : 'rgba(0,0,0,0.1)',
    shadowOffset : {height : 5, width : 0},
    shadowRadius : 1,
    ...Platform.select({
      android : {
        elevation : 10,
      }
    }),
    marginTop : '2%',
    marginLeft : '28%'
  },
  inputWrap : {
    marginTop : '10%',
    backgroundColor : 'white',
    width : '56%',
    position : 'relative',
    left : '22%',
    borderRadius : 12,
    paddingLeft : '5%',
    paddingRight : '5%',
    shadowColor : 'rgba(0,0,0,0.03)',
    shadowOffset : {
      width : 0, height : 3
    },
    marginBottom : '10%'
  },
  input : {
    width : '100%'
  },
  warning : {
      position : 'absolute',
      left : '40.8%',
      top : '48%',
      width : '35%',
      color : 'red',
      fontSize : 10
  },
  button : {
    marginLeft : '29%',
    backgroundColor : '#E83C77',
    borderRadius : 25,
    width : '42%',
    height : '9%',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  },
  buttonText : {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 20
  },
  selectProfile : {
    marginTop : '3%',
    width : '33.5%',
    marginLeft : '33.25%'
  },
  selectProfileTxt : {
    fontSize : 12,
    color : '#787779',
    fontWeight : 'bold'
  },
  bottomPattern : {
    position : 'absolute',
    top : '80%',
    width : '100%',
  }
})

export default Home;