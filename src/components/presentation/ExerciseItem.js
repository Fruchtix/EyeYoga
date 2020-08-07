import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import BuyModal from '../container/BuyModal'

import * as firebase from 'firebase'
import 'firebase/firestore'

export default class ExcerciseItem extends Component {
    constructor() {
        super()
        this.state = {
            buyModalvisibility: false
        }
    }

    onPress() {
        if(this.props.free || this.props.premium) {
            this.props.onPressItem(`${this.props.course === "30 Tage Programm" ? "Tag" : "Übung"} ${this.props.item.name}`,this.props.id)
        } else {
            this.setState({buyModalvisibility: true})
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.onPress()}>
                <View style={[styles.itemWrapper, {backgroundColor: this.props.done >= this.props.id || (this.props.premium && this.props.id === "0")  ? "#5A6175" : "#d4d4d4"}]}>
                    <View style={{marginRight: 10}}>
                        {this.props.free || this.props.premium ? <Icon name="play" size={16} color={this.props.done >= this.props.id || (this.props.premium && this.props.id === "0") ? "#fff" : "grey"} /> : <Icon name="lock" size={16} color={this.props.done >= this.props.id ? "#fff" : "grey"} /> }
                    </View>
                    <View>
                        <Text style={[styles.name, this.props.done >= this.props.id || (this.props.premium && this.props.id === "0") ? {} : {color: "grey"}]}>{this.props.course === "30 Tage Programm" ? "Tag" : "Übung"} {this.props.item.name}</Text>
                    </View>
                </View>
                {this.state.buyModalvisibility ? <BuyModal navigation={this.props.navigation} visibility={this.state.buyModalvisibility} onClose={() => this.setState({buyModalvisibility: false})} /> : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        fontFamily: "Mukta-Bold",
        fontSize: 15,
        color: "#fff",
    },
    itemWrapper: {
        marginBottom: 15,
        borderRadius: 6,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#d4d4d4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
})