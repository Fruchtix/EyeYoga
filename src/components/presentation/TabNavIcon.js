import React, { Component } from 'react'
import { StyleSheet, Text, View  } from 'react-native';
import {Feather as Icon} from '@expo/vector-icons'


export default class ProfileScreen extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View style={{justifyContent: "center", alignItems: "center", paddingTop: 2}}>
                <Icon name={this.props.iconName} size={24} color={this.props.tintColor} />
                <Text style={[styles.text, {color: this.props.tintColor}]}>{this.props.desc}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   text: {
    fontSize: 13,
    fontFamily: "Mukta-Regular"
   }
});