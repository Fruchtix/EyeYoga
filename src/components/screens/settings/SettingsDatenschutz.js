import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import GoBackHeader from '../../presentation/GoBackHeader'

export default class SettingsDatenschutz extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <GoBackHeader navigation={this.props.navigation} />
                <View>
                    <Text>SettingsDatenschutz</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
})