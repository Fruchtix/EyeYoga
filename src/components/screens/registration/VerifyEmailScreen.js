import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, YellowBox, Image} from 'react-native'
import * as firebase from 'firebase'
import {styles} from '../../presentation/styles/AuthStyles'
import _ from 'lodash';

export default class VerifyEmailScreen extends Component {
    constructor() {
        super()
        this.state = {
            showActivityIndicatorResend: false,
            showActivityIndicatorDelete: false
        }

        this.checkIfVerifyed = this.checkIfVerifyed.bind(this)
        this.resendVerificationEmail = this.resendVerificationEmail.bind(this)
        this.deleteUser = this.deleteUser.bind(this)

        //To supress the "Setting a Timer" warning
        YellowBox.ignoreWarnings(['Setting a timer']);
        const _console = _.clone(console);
        console.warn = message => {
            if (message.indexOf('Setting a timer') <= -1) {
                _console.warn(message);
            }
        }
    }

    componentDidMount() {
        this.checkForVerifiedInterval = setInterval(() => this.checkIfVerifyed() ,1000)
    }

    componentWillUnmount() {
        clearInterval(this.checkForVerifiedInterval)
    }

    checkIfVerifyed() {
        firebase.auth().currentUser.reload()
            .then(ok => {
                if(firebase.auth().currentUser) {
                    if (firebase.auth().currentUser.emailVerified) {
                    clearInterval(this.checkForVerifiedInterval)
                    this.props.screenProps.emailVerified()
                    }
                } else {
                    clearInterval(this.checkForVerifiedInterval)
                }
            })
            .catch((error) => console.log(error))
    }

    resendVerificationEmail() {
        var user = firebase.auth().currentUser;
        console.log(user.uid)

        if(user) {
            user.sendEmailVerification().then(() => {
                this.setState({showActivityIndicatorResend: false})
            }).catch((error) => {
                console.log(error.message)
                this.setState({showActivityIndicatorResend: false})
            });
        } 
    }

    deleteUser() {
        var user = firebase.auth().currentUser;
        //Delete from User DB
        firebase.firestore().collection("users").doc(user.uid).delete()
            .then(function() {
                console.log("löschung")})
            .catch(function(error) {
                console.error("Error removing document: ", error);
        });
        
        //Delete after Signout
        firebase.auth().signOut().then(function() {
        })
            .then(() => user.delete().then(function() {
                    // User deleted.
                    clearInterval(this.checkForVerifiedInterval)
                }).catch(function(error) {
                    // An error happened.
                }))
            .catch((error) => {
                this.setState({showActivityIndicatorDelete: false})
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, marginTop: 25}}>
                    <Text style={ownstyles.headline}>Bitte bestätige deine</Text>
                    <Text style={ownstyles.headline}>Email Adresse...</Text>    
 
                    {/* Der Flyer */}
                    <View style={{flex: 6, justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                        <Image resizeMode="center" source={require('../../../../assets/flyer.png')} />
                    </View>

                    <View style={{justifyContent: "flex-end", marginHorizontal: 35}}>
                            <TouchableOpacity 
                                style={[styles.submitBtn, {backgroundColor: "#5A6174"}]}
                                onPress={() => {this.resendVerificationEmail(), this.setState({showActivityIndicatorResend: true})}}>
                                    {this.state.showActivityIndicatorResend ? <ActivityIndicator color="#333" /> : null}
                                    <Text style={[styles.btnText, {color: "#fff"}]}>Mail erneut schicken</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.submitBtn, {backgroundColor: "#fff"}]}
                                onPress={() => {this.deleteUser(), this.setState({showActivityIndicatorDelete: true})}}>
                                    {this.state.showActivityIndicatorDelete ? <ActivityIndicator color="#333" /> : null}
                                    <Text style={[styles.btnText, {color: "#5A6174"}]}>Anmeldedaten ändern</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const ownstyles = StyleSheet.create({
    headline: {
        alignSelf: "center",
        fontSize: 25,
        lineHeight: 32,
        color: "#5A6174",
        textTransform: "uppercase",
        fontFamily: 'Mukta-Bold'
    },
    subHeadline: {
        color: "#999",
        fontFamily: 'Mukta-Regular',
        alignSelf: "center",
        marginTop: 4
    }
})