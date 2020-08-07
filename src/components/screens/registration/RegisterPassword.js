import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import GoBackHeader from '../../presentation/GoBackHeader';
import {styles} from '../../presentation/styles/AuthStyles'
import {validate} from '../../container/ValidateInput'
import {Feather as Icon} from '@expo/vector-icons'

export default class RegisterPassword extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            secureTextEntry: true
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const firstName = this.props.navigation.getParam('firstName', 'unknown')
        const eyeStatus = this.props.navigation.getParam('eyeStatus', 'unknown')

        return (
            <View style={styles.container}>
            {/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={70} enabled> */}
                <GoBackHeader navigation={this.props.navigation} />
                <View style={[styles.content, {marginTop: 40}]}>
                    <Text style={styles.headline}>Wähle ein Passwort</Text>
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <Text style={ownstyles.subHeadline}>Dein Passwort sollte min. 8 Zeichen </Text>
                        <Text style={ownstyles.subHeadline}>lang sein.</Text>
                    </View>
                    <View onPress={this.showDateTimePicker} style={styles.inputData}>
                        <Text style={styles.textLabel}>Passwort</Text>
                        <View style={{flexDirection: "row"}}>
                            <TextInput 
                                    autoFocus={true}
                                    style={[styles.input, {flex: 1}]}
                                    value={this.state.password}
                                    secureTextEntry={this.state.secureTextEntry}
                                    onChangeText={(text) => {this.setState({password: text})}}
                            />
                            <TouchableOpacity onPress={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}>
                                {this.state.secureTextEntry ? <Icon name="eye" size={24} color="gray" /> : <Icon name="eye-off" size={24} color="gray" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("password", this.state.password)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("password", this.state.password))}
                            onPress={() => navigate('RegisterAccount', {firstName: firstName, password: this.state.password, eyeStatus: eyeStatus})}>
                            <Text style={styles.btnText}>Weiter</Text>
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