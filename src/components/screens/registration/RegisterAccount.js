import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'
import {validate} from '../../container/ValidateInput'
import * as firebase from 'firebase'
import 'firebase/firestore'
import GoBackHeader from '../../presentation/GoBackHeader';
import {styles} from '../../presentation/styles/AuthStyles'

export default class RegisterAccount extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            errorVisibility: false,
            showActivityIndicator: false
        }
    }

    createUser(email, password, firstName,eyeStatus) {
        this.setState({showActivityIndicator: true})
        firebase.auth().createUserWithEmailAndPassword(email, password)
            // .then(() => this.sendVerificationEmail())
            .then(() => this.updateUserProfile(firstName,eyeStatus))
            .catch((error) => {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage)
            this.setState({errorVisibility: true, showActivityIndicator: false})
        });
    }

    // sendVerificationEmail = () => {
    //     var user = firebase.auth().currentUser;
      
    //     if(user) {
    //         user.sendEmailVerification().then(function() {
    //             // Email sent.
    //         }).catch(function(error) {
    //             // An error happened.
    //         });
    //     } 
    // }

    updateUserProfile(firstName,eyeStatus) {
        userId = firebase.auth().currentUser.uid
        //Connect to UserDb and add information
        firebase.firestore().collection("users").doc(userId).set({
            first: firstName,
            eyeStatus: eyeStatus,
            token: ""
        })
        .then(function() {
        })
        .catch(function(error) {
        });

        firebase.firestore().collection("users").doc(userId).collection("Courses").doc("Grundlagen").set({
            currentExercise: 0
        })
        .then(function() {
        })
        .catch(function(error) {
        });

        firebase.firestore().collection("users").doc(userId).collection("History").doc("lastCourse").set({
            currentCourse: "Grundlagen"
        })
        .then(function() {
        })
        .catch(function(error) {
        });
        
    }

    render() {
        const firstName = this.props.navigation.getParam('firstName', 'unknown')
        const password = this.props.navigation.getParam('password', 'unknown')
        const eyeStatus = this.props.navigation.getParam('eyeStatus', 'unknown')

        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
            {/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={70} enabled> */}
                <GoBackHeader navigation={this.props.navigation} />
                <View style={[styles.content, {marginTop: 40}]}>
                    <Text style={styles.headline}>Wie lautet deine Email?</Text>
                    <View onPress={this.showDateTimePicker} style={styles.inputData}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput 
                                autoFocus={true}
                                style={styles.input}
                                keyboardType="email-address"
                                autoCompleteType="email"
                                value={this.state.email}
                                onChangeText={(text) => {this.setState({email: text})}}
                        />
                    </View>

                    {this.state.errorVisibility ? <View>
                        <Text style={styles.error}>Ups! Da ist etwas schief gelaufen.</Text>
                    </View> : null}

                    <View style={styles.documents}>
                        <Text>
                            <Text style={{fontSize: 13}}>Wenn du auf "Registrierung abschließen" tippst, bestätigst du, dass du die </Text>
                            <Text onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "datenschutz", color: "#fff"})}} style={{color: "#feaf15",fontSize: 13}}>Datenschutzbestimmungen</Text>
                            <Text style={{fontSize: 13}}> gelesen hast und dass du den </Text> 
                            <Text onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "agb", color: "#fff"})}} style={{color: "#feaf15",fontSize: 13}}>AGB's</Text>
                            <Text style={{fontSize: 13}}> zustimmst.</Text>
                        </Text>
                    </View>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("email", this.state.email)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("email", this.state.email)) || this.state.showActivityIndicator}
                            onPress={() => {this.createUser(this.state.email, password, firstName,eyeStatus), Keyboard.dismiss()}}>
                                {this.state.showActivityIndicator ? <ActivityIndicator color="#333" /> : null}
                                <Text style={styles.btnText}> Registrierung abschließen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </KeyboardAvoidingView> */}
            </View>
        )
    }
}

const ownstyles = StyleSheet.create({

})