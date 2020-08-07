import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'
import GoBackHeader from '../../presentation/GoBackHeader';
import {styles} from '../../presentation/styles/AuthStyles'
import {validate} from '../../container/ValidateInput'

export default class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            errorVisibility: false,
            showActivityIndicator: false
        }
    } 

    sendPasswordResetEmail(navigate) {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
            console.log("test")
            // navigate.setParams({ emailReset: this.state.email})
            navigate.goBack()
            // this.props.navigation.navigate("LogIn", {email: this.state.email})
        }).catch((error) => {
            // An error happened.
            this.setState({errorVisibility: true, showActivityIndicator: false})        
        });
    }

    render() {
        return (
            <View style={styles.container}>
            {/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={70} enabled> */}
                <GoBackHeader navigation={this.props.navigation} />
                <View style={[styles.content, {marginTop: 40}]}>
                    <Text style={styles.headline}>Passwort zurücksetzen</Text>
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <Text style={ownstyles.subHeadline}>Wenn du dein Passwort vergessen hast </Text>
                        <Text style={ownstyles.subHeadline}>kannst du es hier ändern.</Text>
                    </View>
                    <View style={styles.inputData}>
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
                        <Text style={styles.error}>Ups! Die Email-Adresse ist falsch.</Text>
                    </View> : null}

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("email", this.state.email)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("email", this.state.email))}
                            onPress={() => this.sendPasswordResetEmail(this.props.navigation)}>
                                {this.state.showActivityIndicator ? <ActivityIndicator color="#333" /> : null}
                                <Text style={styles.btnText}>Senden</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </KeyboardAvoidingView> */}
            </View>
        )
    }
}

const ownstyles = StyleSheet.create({
    subHeadline: {
        color: "#999",
    }
})