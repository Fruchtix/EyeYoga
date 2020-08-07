import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ImageBackground } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

import GoBackHeader from '../presentation/GoBackHeader'
import {styles} from '../presentation/styles/AuthStyles'
import {validate} from '../container/ValidateInput'

import * as firebase from 'firebase'
import 'firebase/firestore'

export default class ChangeUserData extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            email: '',
            pw: '',
            secureTextEntry: true
        }
    }

    changeName = () => {
        const reload = this.props.navigation.getParam("reload", "error")

        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
            first: this.state.firstName,
        })
        .then(() => {
            this.props.navigation.goBack()
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    changeEmail = () => {
        var user = firebase.auth().currentUser;
        var credentials = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, this.state.pw);
        user.reauthenticateWithCredential(credentials)
            .then(() => {
                firebase.auth().currentUser.updateEmail(this.state.email).then(() => {
                    this.props.navigation.goBack()
                }).catch(function(error) {
                    console.log(error)
                });
            })
            .catch(() => {
                console.log("neee")
            })
    }

    componentDidMount() {
        const name = this.props.navigation.getParam("name", "error")
        this.setState({firstName: name, email: firebase.auth().currentUser.email})
    }


    render() {
        const element = this.props.navigation.getParam("element", "error")

        return (
            // <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={40} enabled>
            <View style={styles.container}>
                <View style={ownstyles.colorTop}>
                    <GoBackHeader navigation={this.props.navigation} />    
                </View>

                <View style={[styles.content, {marginHorizontal: 0}]}>
                        {element === "name" ? 
                        <View style={{flex: 1, marginHorizontal: 50}}>
                            <Text style={styles.headline}>Namen ändern</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textLabel}>Vorname</Text>
                                <TextInput 
                                        autoFocus={true}
                                        style={styles.input}
                                        value={this.state.firstName}
                                        // onFocus={() => validate("text", this.state.firstName)}
                                        onChangeText={(text) => {this.setState({firstName: text})}}
                                />
                            </View>

                            <View style={styles.submitBtnWrapper}>
                                <TouchableOpacity 
                                    style={[styles.submitBtn, (!(validate("text", this.state.firstName)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"})]}
                                    disabled={!(validate("text", this.state.firstName))}
                                    onPress={() => this.changeName()}>
                                        <Text style={styles.btnText}>Speichern</Text>
                                </TouchableOpacity>
                            </View>
                        </View>    
                        : null}

                        {element === "email" ?
                            <View style={{flex: 1, marginHorizontal: 50}}>
                            <Text style={styles.headline}>Email ändern</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textLabel}>Email</Text>
                                <TextInput 
                                        autoFocus={true}
                                        style={styles.input}
                                        value={this.state.email}
                                        // onFocus={() => validate("text", this.state.firstName)}
                                        onChangeText={(text) => {this.setState({email: text})}}
                                />
                            </View>

                            <View style={styles.inputData}>
                                <Text style={styles.textLabel}>Passwort</Text>
                                <View style={{flexDirection: "row"}}>
                                    <TextInput 
                                            autoFocus={true}
                                            style={[styles.input, {flex: 1}]}
                                            value={this.state.pw}
                                            secureTextEntry={this.state.secureTextEntry}
                                            onChangeText={(text) => {this.setState({pw: text})}}
                                    />
                                    <TouchableOpacity onPress={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}>
                                        {this.state.secureTextEntry ? <Icon name="eye" size={24} color="gray" /> : <Icon name="eye-off" size={24} color="gray" />}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.submitBtnWrapper}>
                                <TouchableOpacity 
                                    style={[styles.submitBtn, (!(validate("email", this.state.email)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"})]}
                                    disabled={!(validate("email", this.state.email))}
                                    onPress={() => this.changeEmail()}>
                                        <Text style={styles.btnText}>Speichern</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}

                        {element === "language" ?
                            <View style={{flex: 1, marginHorizontal: 50}}>
                                <Text style={styles.headline}>Sprache auswählen</Text>
                                <View style={ownstyles.language}>
                                    <Text>Deutsch</Text>
                                    <View style={ownstyles.check}>
                                        <Icon name="check" size={20} color="#fff" />
                                    </View>
                                </View>

                                <View style={ownstyles.language}>
                                    <Text>Coming soon...</Text>
                                    {/* <View style={ownstyles.check}>
                                        <Icon name="check" size={20} color="#fff" />
                                    </View> */}
                                </View>
                            </View> 
                        : null}

                    {element === "benachrichtigungen" ?
                        <View style={{flex: 1}}>
                            <Text style={styles.headline}>Hier wird gerade</Text>
                            <Text style={styles.headline}>noch dran gearbeitet</Text>
                            <View style={{alignItems: "center", justifyContent: "center"}}>
                                <ImageBackground style={{width: "100%", height: 300}} source={require("../../../assets/inwork.png")} >
                                    <Text></Text>
                                </ImageBackground>
                            </View>
                            
                        </View> 
                    : null}

                </View>
            {/* </KeyboardAvoidingView> */}
            </View>
        )
    }
}

const ownstyles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    colorTop: {
        paddingTop: Platform.OS === "android" ? 25 : 40,
        paddingBottom: 25,
        backgroundColor: "#ebe7e4",
    },
    container: {
        //marginHorizontal: 20,
        marginTop: 15,
        flex: 1,
    },
    language: {
        marginTop: 20,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#EBE7E4",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    check: {
        width: 30, 
        height: 30,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#77C79F"
    }
})