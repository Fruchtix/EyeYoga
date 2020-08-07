import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, Modal, Platform  } from 'react-native';

import {Feather as Icon} from '@expo/vector-icons'

export default class FinishExeciseModal extends Component {
    constructor() {
        super()
        this.state = {
            visible: true
        }
    }


    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}
            >
                <View style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            hitSlop={{top: 7, right: 7, left: 7, bottom: 7}}
                            onPress={() => this.setState({visible: false})}>
                            <Icon name="x" size={25} color="#5A6174" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>Finito</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F48B44"
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
        marginTop: Platform.OS === 'android' ? 25 : 50,
    },
    buttonInnerWrapper: {
        width: 110,
        height: 110,
        borderRadius: 110,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF5EB",
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 28,
        color: "#5A6176",
    },
    subHeadline: {
        fontFamily: "Mukta-Regular",
        fontSize: 18,
        color: "#333",
    },
});