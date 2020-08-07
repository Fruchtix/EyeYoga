import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView } from 'react-native';

import 'firebase/functions'
import * as firebase from 'firebase'

export default class LogOutModal extends Component {
    constructor(){
        super()
        this.state={
        
        }
    }
  
    render() {

        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <View style={{marginBottom: 15, alignItems: "center"}}>
                            <Text style={styles.headline}>Bist du dir sicher?</Text>
                        </View>

                        <View style={styles.optionButtons}>
                            <TouchableOpacity onPress={() => this.props.logOut()}>
                                <View style={{borderRadius: 10, backgroundColor: "#A3CFE1", alignItems: "center", justifyContent: "center"}}>
                                    <Text style={[styles.text, {color: "#fff", paddingHorizontal: 10, paddingVertical: 5}]}>Ja</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.onClose()}>
                                <Text style={[styles.text, {color: "#eee"}]}>Abbrechen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        backgroundColor: "#00000080",
        justifyContent: "center",
        width: "100%",
        flex: 1
    },
    innerWrapper: {
        paddingVertical: 18,
        width: "80%",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    optionButtons: {
        alignItems: "center"
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 16,
        color: "#333"
    }
})
