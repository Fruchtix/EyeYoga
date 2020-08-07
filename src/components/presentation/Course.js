import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import {Feather as Icon} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class Course extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={[styles.outter, styles.shadow]} onPress={() => {this.props.navigation.navigate("CourseScreen", {name: this.props.name, reload: () => this.props.reload(), premium: this.props.premium})}}>
                <ImageBackground style={[styles.courseWrapper, styles.shadow]} source={this.props.uri} >
                    <View style={styles.infoWrapper}>
                        <Text style={styles.text}>{this.props.name}</Text>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    courseWrapper: {
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 7,
        height: 150,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        overflow: "hidden",
        paddingBottom: 7,
    },
    text: {
        fontFamily: "Mukta-Bold",
        fontSize: 16,
        color: "#fff",
    },
    infoWrapper: {
        borderRadius: 8,
        backgroundColor: "#5A6176",
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    outter: {
        // borderWidth: 1,
        // borderColor: "#333",
        paddingHorizontal: 10,
        paddingVertical: 10,
        // marginBottom: 5,
    }
});