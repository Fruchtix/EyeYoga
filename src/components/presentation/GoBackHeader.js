import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import {Feather as Icon} from '@expo/vector-icons'

export default class GoBackHeader extends Component {
    render() {
        return (
            <View style={styles.goBack}>
                    <TouchableOpacity
                        hitSlop={{top: 7, right: 7, left: 7, bottom: 7}}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-left" size={32} color={this.props.color ? this.props.color : "#5A6174"} />
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    goBack: {
        alignContent: "flex-start",
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
})