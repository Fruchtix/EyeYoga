import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import GoBackHeader from '../presentation/GoBackHeader'

import * as firebase from 'firebase'
import 'firebase/firestore'

export default class AllCourses extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        const courses = this.props.navigation.getParam("courses", "error")
        return (
            <SafeAreaView style={styles.safeArea}>
                <GoBackHeader navigation={this.props.navigation} />
                <ScrollView style={{paddingHorizontal: 20, marginTop: 20}}>
                    <Text style={styles.headline}>Meine Kurse</Text>
                    {courses}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 21,
        color: "#5A6176",
        lineHeight: 32,
        marginBottom: 15
    },
})