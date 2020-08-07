import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, Text, View, TextInput, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase'
import {validate} from '../../container/ValidateInput'
import {styles} from '../../presentation/styles/AuthStyles'

import GoBackHeader from '../../presentation/GoBackHeader';

export default class LogIn extends Component {
    constructor() {
        super()
        this.state={
            email: '',
            password: '',
            errorVisibility: false,
            showActivityIndicator: false
        }
    }

    validateUser() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.setState({errorVisibility: true, showActivityIndicator: false})
        });
    }

    onFocus(type) {
        if(type === 'password') {
            this.setState({errorVisibility: false, password: ''})
        } else {
            this.setState({errorVisibility: false})
        }
    }

    render() {

        const emailReset = this.props.navigation.getParam('email', 'Error')
        if(emailReset !== 'Error') {
            this.setState({email: emailReset})
        }

        return (
            <View style={styles.container}>
            {/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={70} enabled> */}
                <GoBackHeader navigation={this.props.navigation} />
                <View style={styles.content}>
                    <Text style={styles.headline}>Login</Text>
                    <View style={styles.inputData}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput 
                                autoFocus={true}
                                style={styles.input}
                                keyboardType="email-address"
                                autoCompleteType="email"
                                value={this.state.email}
                                onFocus={() => this.onFocus('email')}
                                onChangeText={(text) => {this.setState({email: text})}}
                        />
                    </View>
                    <View style={styles.inputData}>
                        <Text style={styles.textLabel}>Passwort</Text>
                        <TextInput 
                                style={styles.input}
                                onFocus={() => this.onFocus('password')}
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(text) => {this.setState({password: text})}}
                        />
                    </View>

                    {this.state.errorVisibility ? <View>
                        <Text style={styles.error}>Ups! Die Email-Adresse oder das Passwort ist falsch.</Text>
                    </View> : null}

                    <TouchableOpacity 
                        style={{alignItems: "center", marginTop: 5}}
                        onPress={() => this.props.navigation.navigate('ResetPassword')}
                    >
                        <Text style={{color: "#df9401", marginTop: 2}}>Passwort vergessen?</Text>
                    </TouchableOpacity>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("email", this.state.email)) || !(validate("password", this.state.password)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("email", this.state.email)) || !(validate("password", this.state.password))}
                            onPress={() => {this.validateUser(), Keyboard.dismiss(), this.setState({showActivityIndicator: true})}}>
                                {this.state.showActivityIndicator ? <ActivityIndicator color="#333" /> : null}
                                <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </KeyboardAvoidingView> */}
            </View>
        )
    }
}

const ownstyles = StyleSheet.create({
    
});