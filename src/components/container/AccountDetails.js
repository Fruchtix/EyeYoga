import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

import * as firebase from 'firebase'
import 'firebase/firestore'
import LogOutModal from '../presentation/LogOutModal'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as InAppPurchases from 'expo-in-app-purchases'

export default class AccountDetails extends Component {
    constructor() {
        super()
        this.state = {
            logOutModalvisibility: false,
        }
    }

    logOut = async() => {
        await InAppPurchases.disconnectAsync();
        firebase.auth().signOut().then(function() {
          }).catch(function(error) {
            // An error happened.
          });
    }

    render() {

        return (
            <View>
                {/* <TouchableWithoutFeedback style={styles.ctaWrapper} onPress={() => console.log("test")}>
                    <Text style={styles.headline}>EyeYoga Archiv freischalten</Text>
                    <View style={{marginLeft: 10, width: 30, height: 30, borderRadius: 30, backgroundColor: "#313F40", alignItems: "center", justifyContent: "center"}}>
                        <Icon name="arrow-right" size={18} color="#fff" />
                    </View>
                </TouchableWithoutFeedback> */}

                <View style={[styles.item, {marginTop: 0}]}>
                    <Text style={styles.accountItemtxtHeadline}>Account</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#333"}}>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("ChangeUserData", {element: "name", name: this.props.name, reload: () => this.props.reload()})}>
                            <Text style={styles.accountItemtxt}>Name</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#333"}}>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("ChangeUserData", {element: "email"})}>
                            <Text style={styles.accountItemtxt}>Email</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("ChangeUserData", {element: "language"})}>
                            <Text style={styles.accountItemtxt}>Sprache</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.accountItemtxtHeadline}>Benachrichtigungen</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#333"}}>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("ChangeUserData", {element: "benachrichtigungen"})}>
                            <Text style={styles.accountItemtxt}>EyeYoga</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                {/* <Text style={styles.accountItemtxt}>deaktiviert</Text> */}
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("ChangeUserData", {element: "benachrichtigungen"})}>
                            <Text style={styles.accountItemtxt}>Erinnerungen</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                {/* <Text style={styles.accountItemtxt}>deaktiviert</Text> */}
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.item}>
                    <Text style={styles.accountItemtxtHeadline}>Rechtliches</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#333"}}>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("LawWebsite", {type: "datenschutz"})}>
                            <Text style={styles.accountItemtxt}>Datenschutz</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#333"}}>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("LawWebsite", {type: "agb"})}>
                            <Text style={styles.accountItemtxt}>AGB</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.accountItem} onPress={() => this.props.navigation.navigate("LawWebsite", {type: "impressum"})}>
                            <Text style={styles.accountItemtxt}>Impressum</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="chevron-right" size={24} color="#333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.logOut} onPress={() => this.logOut()}>
                    <Text style={styles.logOutTxt}>Abmelden</Text>
                </TouchableOpacity>

                {this.state.logOutModalvisibility ? <LogOutModal visibility={this.state.logOutModalvisibility} onClose={() => this.setState({logOutModalvisibility: false})} logOut={() => this.logOut()} /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    accountItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8
    },
    accountItemtxt: {
        fontFamily: "Mukta-Regular",
        fontSize: 15,
        color: "#333", 
        marginRight: 5
    },
    accountItemtxtHeadline: {
        fontFamily: "Mukta-Bold",
        fontSize: 17,
        color: "#5A6176",
    },
    logOut: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#5A6176",
        borderRadius: 30,
        paddingVertical: 8,
        marginBottom: 25,
        width: "60%",
        alignSelf: "center",
        marginTop: 25,
    },
    logOutTxt: {
        color: "#5A6176",
        fontSize: 13,
        fontFamily: "Mukta-Bold",
        letterSpacing: 2,
        textTransform: "uppercase"
    },
    item: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: "#ebe7e4",
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    ctaWrapper: {
        borderRadius: 8,
        backgroundColor: "#5A6176",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: 20
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 18,
        color: "#fff",
    },
})