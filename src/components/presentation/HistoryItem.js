import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

import * as firebase from 'firebase'
import 'firebase/firestore'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default class historyItem extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        const date = this.props.item.date.toDate()

        return (
            <TouchableWithoutFeedback onPress={() => console.log("hallo")}>
                <View style={styles.itemWrapper}>
                    <View style={styles.line}>
                        <View style={styles.point}><Text></Text></View>
                    </View>
                    <View style={styles.itemData}>
                        <Text>{this.props.item.course}</Text>
                        <Text>{this.props.item.exercise}</Text>
                        <Text>{date.getMonth()+1} Monat</Text>
                        <Text>{date.getDate()} Tag</Text>
                    </View>
                </View>
                {this.props.length > (this.props.id + 1) ? <View style={styles.lineBottom}>
                    <Text></Text>
                </View> : <View style={{height: 15}}></View>}
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        marginHorizontal: 25,
        height: 100
    },
    line: {
        borderColor: "#777E86",
        marginTop: 20,
        borderWidth: 1,
        justifyContent: "flex-start",
        marginRight: 20
    },
    lineBottom: {
        borderLeftWidth: 2,
        borderLeftColor: "#777E86",
        height: 15,
        marginLeft: 25
    },
    point: {
        position: "absolute",
        borderRadius: 15,
        width: 15,
        height: 15,
        backgroundColor: "black",
        marginLeft: -7.5
    },
    itemData: {
        borderRadius: 8,
        backgroundColor: "#EBE7E4",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    }
})