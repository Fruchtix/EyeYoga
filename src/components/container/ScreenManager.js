import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Platform, YellowBox } from 'react-native';
import MainNavigator from './navigators/MainNavigator'
import AuthNavigator from './navigators/AuthNavigator'
import SplashScreen from '../screens/SplashScreen'
import VerifyEmailScreen from '../screens/registration/VerifyEmailScreen'
import * as Font from 'expo-font';
import _ from 'lodash';
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/functions'
import * as InAppPurchases from 'expo-in-app-purchases'

class ScreenManager extends React.Component {
    constructor(props) {
      super(props);
      items = Platform.select({
        ios: ['dev.products.premium_monthly', 'dev.products.premium_yearly'],
        android: ['premium_monthly', 'premium_yearly'],
      });

      this.state ={ 
          loggedInStatus: '',
          emailVerified: false,
          fontLoaded: false,
          name: '',
          courses: [],
          currentCourse: "",
          premium: true
      };

      //To supress the "Setting a Timer" warning
      YellowBox.ignoreWarnings(['Setting a timer']);
      const _console = _.clone(console);
      console.warn = message => {
          if (message.indexOf('Setting a timer') <= -1) {
              _console.warn(message);
          }
      }
    }

    componentWillUnmount = async() => {
      await InAppPurchases.disconnectAsync();
    }
  
    componentDidMount() {
      this.checkIfloggedIn()
      Font.loadAsync({
        'Mukta-Regular': require('../../../assets/Fonts/Mukta-Regular.ttf'),
        'Mukta-Bold': require('../../../assets/Fonts/Mukta-Bold.ttf'),
      }).then(() => this.setState({ fontLoaded: true }));
    }

    checkIfloggedIn = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          firebase.firestore().collection("users").doc(user.uid).get()
                .then(async(doc) => {
                    if (doc.exists) {
                        await Promise.all([this.getCurrentCourse(), this.getCurretExecise()/*, this.connectToPayment()*/])
                        // this.setPurchaseListener()
                        this.setState({name: doc.data().first})
                        this.setState({loggedInStatus: 'loggedIn', emailVerified: user.emailVerified})
                    } else {
                        this.setState({loggedInStatus: 'loggedOut'})
                    }
                })
                .catch((error) => console.log(error.message))
        } else {
          this.setState({loggedInStatus: 'loggedOut'})
        }
      })
    }

    connectToPayment = async() => {
      return new Promise(async(resolve, reject) => {
          const history = await InAppPurchases.connectAsync()
          if (history.responseCode === InAppPurchases.IAPResponseCode.OK) {
            //If User bought something get current date and check if still valid
            let monthly
            let yearly
            var getNow = firebase.functions().httpsCallable('getCurrentDate')
            await getNow()
              .then((response) => {
                  monthly = new Date(response.data)
                  yearly = new Date(response.data)
                  monthly=new Date(monthly.setMonth(monthly.getMonth() - 1))
                  yearly = new Date(yearly.setFullYear(yearly.getFullYear() - 1))
              })
              .catch((error) => {
                  console.log(error.message)
              })
            
            history.results.forEach(async(result) => {
              console.log("item gekauft")
              if(result.acknowledged){
                if((result.productId === items[0] && result.purchaseTime > monthly.getTime()) || (result.productId === items[1] && result.purchaseTime > yearly.getTime()))
                  //Premium User
                  console.log("ist premium")
                  await this.setState({premium: true})
                  resolve("SUCCESS")
                }
            })
            //No Item is Valid -> normal user
            if(this.state.premium === null) {
              this.setState({premium: false}, () => {
                resolve("SUCCESS")
              })
            } else {
              resolve("SUCCESS")
            }
          } else {
            console.log("cant connect")
            reject("FAILURE")
          }
      })
    }

    getCurrentCourse = () => {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("History").doc("lastCourse").get()
          .then((doc) => {
            if (doc.exists) {
                this.setState({currentCourse: doc.data().currentCourse}, () => {
                  resolve("SUCCESS")
                })
            } else {
                reject("FAILURE")
            }
          })
          .catch(() => {
            reject("FAILURE")
          })
      })
    }

    getCurretExecise = () => {
      let coursesList = []
      return new Promise((resolve, reject) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").get()
              .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      coursesList.push({name: doc.id,currentExercise: doc.data().currentExercise})
                  });
              })
              .then(() => {
                this.setState({courses: coursesList}, () => {
                  resolve("SUCCESS")
                })
              })
              .catch(() => {
                reject("FAILURE")
              })
        })
    }

    setPurchaseListener = async() => {
        // Set purchase listener
        InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
            // Purchase was successful
            if (responseCode === InAppPurchases.IAPResponseCode.OK) {
                results.forEach(purchase => {
                    if (!purchase.acknowledged) {
                        console.log(`Successfully purchased ${purchase.productId}`);
                        // Process transaction here and unlock content...
                        console.log("unlock premium...")
                        this.setState({premium: true})
    
                        // Then when you're done
                        InAppPurchases.finishTransactionAsync(purchase, false);
                        console.log("Transaction finito")
                    }
                });
            }
            // Else find out what went wrong
             else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
                console.log('User canceled the transaction');
            } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
                console.log('User does not have permissions to buy but requested parental approval (iOS only)');
            } else {
                console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`);
            }
        })
    }
  
    render() {
      if (this.state.loggedInStatus === 'loggedIn' && this.state.fontLoaded && this.state.premium !== null) {
        if(/*this.state.emailVerified*/true) {
          return (
              <MainNavigator screenProps={{name: this.state.name, premium: this.state.premium,courses: this.state.courses, currentCourse: this.state.currentCourse, reload: () => {this.getCurretExecise(); this.getCurrentCourse()}}} />
          )
        } else {
          return(
            <SafeAreaView style={styles.safeArea}>
              <VerifyEmailScreen screenProps={{emailVerified: () => this.setState({emailVerified: true})}} />
            </SafeAreaView>
          )
        }
      }
      else if (this.state.loggedInStatus === 'loggedOut' && this.state.fontLoaded) {
        return (
          <SafeAreaView style={styles.safeArea}>
            <AuthNavigator />
          </SafeAreaView>
        )
      }
      return <SplashScreen />
    }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 25 : 0,
  }
})

export default ScreenManager