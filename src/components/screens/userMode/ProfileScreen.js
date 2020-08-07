import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ImageBackground, TouchableOpacity, ScrollView  } from 'react-native';

import * as firebase from 'firebase'
import 'firebase/firestore'

import HistoryFlatlist from '../../container/HistoryFlatlist'
import AccountDeatils from '../../container/AccountDetails'

import {Feather as Icon} from '@expo/vector-icons'

export default class ProfileScreen extends Component {
    constructor() {
        super()
        this.state = {
            history: null,
            isRefreshing: false
        }
    }

    componentDidMount() {
        //GetHistoryFromFB
        this.getHistory()
    }

    getHistory = () => {
        let history = []
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("History").get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    history.push(doc.data());
                });
            })
            .then(() => {
                this.setState({history: history, isRefreshing: false})
            })
            .catch(() => {
                console.log("error")
            })
    }

    render() {
        return (
            <View style={styles.safeArea}>
                    {/* Profile */}
                    <View>
                        {/* Background */}
                        {/* <View style={{backgroundColor: "#5A6176", height: 165}}></View> */}
                        <ImageBackground style={{height: 165+155, justifyContent: "flex-end", marginBottom: 20}} source={require("../../../../assets/start3.png")} >
                            <View style={styles.profileWrapper}>
                                <View style={styles.specifications}>
                                    <Text style={styles.name}>Hallo {this.props.screenProps.name}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                        {/* <View style={{backgroundColor: "#EBE7E4", height: 165, alignItems: "flex-end", justifyContent: "flex-end", paddingRight: 20, paddingBottom: 15}}> */}
                            {/* <Text style={styles.number}>6</Text>
                            <Text style={styles.numberTxt}>Übungen</Text> */}
                        {/* </View> */}

                        {/* Settings */}
                        {/* <View style={styles.settingsWrapper}>
                            <View style={styles.settings}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("SettingsContainer")}>
                                    <Icon name="settings" size={27} color="#EBE7E4" />
                                </TouchableOpacity>
                            </View>
                        </View> */}

                        {/* Pic */}
                        {/* <View style={styles.profileWrapper}>
                            <View style={styles.profilePic} >
                                <ImageBackground style={{width: 70, height: 35,}} source={require("../../../../assets/logo.png")}>
                                    <Text></Text>
                                </ImageBackground>
                            </View>
                            <View style={styles.specifications}>
                                <Text style={styles.name}>Hallo {this.props.screenProps.name}</Text>
                            </View>
                        </View> */}
                    </View>

                    {/* Logbuch */}
                    {/* <View style={{marginVertical: 15, marginHorizontal: 20}}>
                        <Text style={styles.logbuchTxt}>Dein Logbuch</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {this.state.history === null ? <ActivityIndicator size="small" color="#333" /> : this.state.history.length === 0 ? <Text>Uff leer</Text> : <HistoryFlatlist isRefreshing={this.state.isRefreshing} data={this.state.history} onRefresh={() => this.setState({isRefreshing: true}, () => this.getHistory())} />}
                    </View> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AccountDeatils navigation={this.props.navigation} name={this.props.screenProps.name} reload={() => this.props.screenProps.reload()} />
                    </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    profileWrapper: {
        alignSelf: "center", 
        alignItems: "center", 
        justifyContent: "flex-end", 
        // position: "absolute", 
        // height: 365
    },
    profilePic: {
        width: 115, 
        height: 115,
        borderRadius: 115,
        backgroundColor: "#fff",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#5A6176"
    },
    name: {
        fontFamily: "Mukta-Bold",
        fontSize: 19,
        color: "#fff",
    },
    settings: {
        marginRight: 23,
    },
    settingsWrapper: {
        marginTop: 50,
        position: "absolute",
        alignSelf: "flex-end"
    },
    logbuchTxt: {
        fontFamily: "Mukta-Bold",
        fontSize: 19,
        color: "#333",
    },
    numberTxt: {
        fontFamily: "Mukta-Bold",
        fontSize: 16,
        color: "#333",
    },
    number: {
        fontFamily: "Mukta-Bold",
        fontSize: 25,
        color: "#333",
    },
    specifications: {
        backgroundColor: '#5A6176',
        paddingVertical: 7,
        paddingHorizontal: 13,
        borderRadius: 8,
        marginTop: 10,
    },
});