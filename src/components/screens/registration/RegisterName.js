import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'
import GoBackHeader from '../../presentation/GoBackHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {styles} from '../../presentation/styles/AuthStyles'
import {validate} from '../../container/ValidateInput'


export default class RegisterName extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
            {/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={70} enabled> */}
                <GoBackHeader navigation={this.props.navigation} />
                <View style={styles.content}>
                    <Text style={styles.headline}>Wie heißt du?</Text>
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
                            onPress={() => {Keyboard.dismiss(), navigate('RegisterEyeStatus', { firstName: this.state.firstName})}}>
                                <Text style={styles.btnText}>Registrieren</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </KeyboardAvoidingView> */}
                </View>
        )
    }
}

