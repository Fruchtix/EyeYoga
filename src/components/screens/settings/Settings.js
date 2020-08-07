import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, TouchableOpacity  } from 'react-native';

import {Feather as Icon} from '@expo/vector-icons'
import SettingsIcon from '../../presentation/SettingsIcon'


export default class Settings extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    
    logOut() {
        firebase.auth().signOut().then(function() {
          }).catch(function(error) {
            // An error happened.
          });
    }

    render() {

        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity
                            hitSlop={{top: 7, right: 7, left: 7, bottom: 7}}
                            onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="x" size={27} color="#5A6174" />
                        </TouchableOpacity>
                    </View>

                    <SettingsIcon onPress={() => this.props.navigation.navigate("SettingsProfile")} name="Dein Profil" />
                    <SettingsIcon onPress={() => this.props.navigation.navigate("SettingsDatenschutz")} name="Datenschutz" />
                    <SettingsIcon onPress={() => this.props.navigation.navigate("SettingsGeschaeftsbedingungen")} name="Geschäftsbedingungen" />
                    <SettingsIcon onPress={() => this.props.navigation.navigate("SettingsSupport")} name="Support" />

                    <TouchableOpacity onPress={() => this.logOut()}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
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
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
        paddingTop: 10
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 15,
        flexDirection: "row",
        paddingBottom: 20
    },
});