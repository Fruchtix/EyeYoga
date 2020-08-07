import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default class SettingsIcon extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.item}>
                <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
                    <Text>{this.props.name}</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 20,
        marginBottom: 20
    }
})