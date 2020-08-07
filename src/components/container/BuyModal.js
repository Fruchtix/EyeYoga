import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal, Platform, Dimensions,ImageBackground } from 'react-native';

import {Feather as Icon} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as InAppPurchases from 'expo-in-app-purchases'

export default class BuyModal extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    buyItem = async(type) => {
        // Itemlist
        const items = Platform.select({
            ios: ['dev.products.premium_monthly', 'dev.products.premium_yearly'],
            android: ['premium_monthly', 'premium_yearly'],
        });
        
        // Get all Products
        const { responseCode, results } = await InAppPurchases.getProductsAsync(items);
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
            // setIcons({ items: results });
            console.log(results)
            // To replace an existing subscription on Android
            await InAppPurchases.purchaseItemAsync(items[type]);
            this.props.onClose()
        } else {
            console.log("Cant find item")
        }    
    }
    

    render() {
        const screenHeight = Math.round(Dimensions.get('window').height);
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visibility}
                statusBarTranslucent={true}
            >
                <View style={styles.safeArea}>
                {/* <ImageBackground blurRadius={0.1} source={{uri: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_960_720.jpg"}} style={{width: '100%', height: '100%'}}> */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                            onPress={() => this.props.onClose()}>
                            <Icon name="x" size={25} color="#5A6174" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>

                        {/* Logo */}
                        <View style={styles.logoWrapper}>
                            <ImageBackground style={styles.logo} source={require("../../../assets/logo.png")}>
                                <Text></Text>
                            </ImageBackground>
                        </View>

                        <Text style={styles.headline}>Jetzt alles freischalten!</Text>

                        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            <View style={{height: (screenHeight - 160)}}>
                                {/* Vorteile von EyeYoga */}
                                <View style={{marginBottom: 35}}>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text style={styles.proText}>Ungebgrenzter Zugang zum gesamten</Text>
                                            <Text style={styles.proText}>EyeYoga Archiv</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text style={styles.proText}>Kurse zu Themen wie Augentraining,</Text>
                                            <Text style={styles.proText}>Entspannung, trockene Augen und mehr</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text style={styles.proText}>EyeYoga - Lass uns zusammen deine Augen</Text>
                                            <Text style={styles.proText}>verbessern!</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Buyoptions */}
                                <View style={{flex: 1, justifyContent: "flex-start"}}>
                                    <TouchableOpacity onPress={() => this.buyItem(1)}>
                                        <View style={styles.buyWrapper}>
                                            <View>
                                                <Text style={styles.buyoptionTxt}>EyeYoga Jährlich</Text>
                                                <Text style={styles.price}>29,99 € / jährlich*</Text>
                                            </View>

                                            <View style={styles.unlockWrapper}>
                                                <Text style={styles.unlockTxt}>Freischalten</Text>
                                            </View>

                                            <View style={{position: "absolute", alignSelf: "flex-end"}}>
                                                <View style={{marginRight: 10, marginTop: 0, backgroundColor: "#F47D31", borderRadius: 0, paddingHorizontal: 6, paddingVertical: 3}}>
                                                    <Text style={styles.bestPrice}>Bester Wert</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.buyItem(0)}>
                                        <View style={styles.buyWrapper}>
                                            <View>
                                                <Text style={styles.buyoptionTxt}>EyeYoga Monatlich</Text>
                                                <Text style={styles.price}>8,99 € / monatlich*</Text>
                                            </View>

                                            <View style={[styles.unlockWrapper, {backgroundColor: "#fff"}]}>
                                                <Text style={[styles.unlockTxt, {color: "#77C79F"}]}>Freischalten</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{marginBottom: 70, alignItems: "center", alignSelf: "center"}}>
                                <Text style={styles.rechtliches}>
                                    * Alle Abonnements werden als Einmalzahlung beim Kauf fällig und diese wird automatisch wiederkehrend in Zahlung gestellt.
                                </Text>

                                <Text style={styles.rechtliches}>
                                    Ein abgeschlossenes Abonnement mit EyeYoga wird automatisch verlängert, außer die Funktion der automatischen Verlängerung wird innerhalb von 24-Stunden vor dem Auslaufen einer bestehenden Abolaufzeit deaktiviert.
                                </Text>

                                <TouchableOpacity onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "datenschutz"}), this.props.onClose()}}> 
                                    <Text style={[styles.agb, {marginTop: 12}]}>Datenschutzbestimmungen</Text>
                                </TouchableOpacity>

                                <View style={{flexDirection: "row", justifyContent: "center"}}>
                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "impressum"}), this.props.onClose()}}>
                                        <Text style={[styles.agb, {marginRight: 15}]}>Impressum</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "agb"}), this.props.onClose()}}>
                                        <Text style={styles.agb}>AGB</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>

                        <View style={[styles.downIcon, {marginTop: (screenHeight-140)}]}>
                            <Icon name="chevrons-down" size={28} color="#333" />
                        </View>

                    </View>
                {/* </ImageBackground> */}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 19
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
        // marginTop: Platform.OS === 'android' ? 25 : 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
        marginTop: Platform.OS === 'android' ? 15 : 50,
        // position: "absolute",
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 28,
        color: "#5A6176",
        marginBottom: 7
    },
    proArgument: {
        flexDirection: "row",
        marginBottom: 15
    },
    buyWrapper: {
        borderRadius: 8,
        backgroundColor: "#5A6175",
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    downIcon: {
        alignSelf: "flex-end",
        position: "absolute"
    },
    unlockWrapper: {
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#77C79F",
        backgroundColor: "#77C79F",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15
    },
    unlockTxt: {
        fontFamily: "Mukta-Regular",
        fontSize: 14,
        color: "#fff",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    buyoptionTxt: {
        color: "#fff",
        fontFamily: "Mukta-Bold",
        fontSize: 16,
    },
    iconWrapper: {
        marginRight: 6,
        // justifyContent: "center"
    },
    proText: {
        fontFamily: "Mukta-Regular",
        fontSize: 16,
        lineHeight: 21
        // color: "#fff",
    },
    bestPrice: {
        color: "#fff",
        fontFamily: "Mukta-Bold",
        fontSize: 11,
        letterSpacing: 1,
        textTransform: "uppercase"
    },
    price: {
        color: "#fff"
    },
    logoWrapper: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20
    },
    logo: {
        width: 70,
        height: 35,
        // borderRadius: 30,
        // backgroundColor: "#B5D780",
    },
    rechtliches: {
        marginHorizontal: 10,
        fontSize: 11,
        marginBottom: 15,
    },
    agb: {
        textTransform: "uppercase",
        marginBottom: 18,
        fontWeight: "bold",
        fontFamily: "Mukta-Bold",
        fontSize: 13,
        textTransform: "uppercase"
    }
});