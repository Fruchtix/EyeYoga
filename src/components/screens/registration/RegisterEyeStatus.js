import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import GoBackHeader from '../../presentation/GoBackHeader';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {styles} from '../../presentation/styles/AuthStyles'
import {Feather as Icon} from '@expo/vector-icons'


export default class RegisterEyeStatus extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            eyeStatus: null
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        const firstName = this.props.navigation.getParam("firstName","error")

        return (
            <View style={styles.container}>
                <GoBackHeader navigation={this.props.navigation} />
                <View style={styles.content}>
                    <Text style={styles.headline}>Wie ist dein</Text>
                    <Text style={styles.headline}>Sehvermögen?</Text>
                    
                    <View style={{marginTop: 10}}>
                        <TouchableWithoutFeedback style={ownstyles.item} onPress={() => this.setState({eyeStatus: 'Gutes Sehvermögen'})}>
                            <Text style={ownstyles.text}>Gutes Sehvermögen</Text>
                            {this.state.eyeStatus === "Gutes Sehvermögen" ? <View style={ownstyles.check}>
                                <Icon name="check" size={20} color="#fff" />
                            </View> : <View style={ownstyles.notcheck}></View>}
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={ownstyles.item} onPress={() => this.setState({eyeStatus: 'Kurzsichtigkeit'})}>
                            <Text style={ownstyles.text}>Kurzsichtigkeit</Text>
                            {this.state.eyeStatus === "Kurzsichtigkeit" ? <View style={ownstyles.check}>
                                <Icon name="check" size={20} color="#fff" />
                            </View> : <View style={ownstyles.notcheck}></View>}
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={ownstyles.item} onPress={() => this.setState({eyeStatus: 'Weitsichtigkeit'})}>
                            <Text style={ownstyles.text}>Weitsichtigkeit</Text>
                            {this.state.eyeStatus === "Weitsichtigkeit" ? <View style={ownstyles.check}>
                                <Icon name="check" size={20} color="#fff" />
                            </View> : <View style={ownstyles.notcheck}></View>}
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={ownstyles.item} onPress={() => this.setState({eyeStatus: 'idk'})}>
                            <Text style={ownstyles.text}>Ich weiß es nicht</Text>
                            {this.state.eyeStatus === "idk" ? <View style={ownstyles.check}>
                                <Icon name="check" size={20} color="#fff" />
                            </View> : <View style={ownstyles.notcheck}></View>}
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, (!(this.state.eyeStatus) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"})]}
                            disabled={!(this.state.eyeStatus)}
                            onPress={() => {navigate('RegisterPassword', { firstName: firstName, eyeStatus: this.state.eyeStatus})}}>
                                <Text style={styles.btnText}>Weiter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const ownstyles = StyleSheet.create({
    item: {
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
    },
    text: {
        fontFamily: "Mukta-Bold",
        fontSize: 15,
        color: "#5A6176",
    },
    notcheck: {
        width: 30, 
        height: 30,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7"
    }
})