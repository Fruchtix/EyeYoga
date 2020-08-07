import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default class StartScreen extends Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>

                {/* Logo */}
                {/* <View style={styles.logoWrapper}>
                    <View style={styles.logo}><Text></Text></View>
                    <Text style={styles.logoTxt}>EyeYoga</Text>
                </View> */}

                {/* Logo */}
                <View style={styles.logoWrapper}>
                    <ImageBackground style={styles.logo} source={require("../../../../assets/logo.png")}>
                        <Text></Text>
                    </ImageBackground>
                </View>
                
                {/* Headline */}
                <View style={styles.headlineWrapper}>
                    <Text style={styles.headline}>Lass uns heute etwas für</Text>
                    <Text style={styles.headline}>deine Augengesundheit tun</Text>
                </View>

                {/* Image in center */}
                {/*https://icons8.com/ouch/illustration/fogg-unsubscribed-1*/}
                <View style={{flex: 1, justifyContent: "center", overflow: "hidden"}}>
                    <ImageBackground style={{height: "100%"}} source={require("../../../../assets/start.png")}>
                    </ImageBackground>
                </View>

                {/* Register and Login Btn */}
                <View style={styles.submitBtnWrapper} >
                        <TouchableOpacity 
                            style={styles.submitBtn}
                            onPress={() => navigate('RegisterName')}
                        >
                            <Text style={styles.btnText}>Registrieren</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.submitBtnLogIn}
                            onPress={() => navigate('LogIn')}
                        >
                            <Text style={styles.btnTextLogIn}>Ich habe ein Konto</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoTxt: {
        fontFamily: "Mukta-Bold",
        fontSize: 21,
        color: "#333"
    },  
    // logoWrapper: {
    //     alignItems: "center",
    //     marginTop: 20,
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     marginBottom: 25
    // },
    // logo: {
    //     width: 30,
    //     height: 30,
    //     borderRadius: 30,
    //     backgroundColor: "#df9401",
    //     marginRight: 10
    // },
    logoWrapper: {
        alignItems: "center",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30
    },
    logo: {
        width: 70,
        height: 35,
    },
    headlineWrapper: {
        alignItems: "center"
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 22,
        color: "#5A6176",
        lineHeight: 30
    },
    submitBtnWrapper: {
        alignItems: "stretch",
        marginBottom: 25,
        marginHorizontal: 35
    },
    submitBtn: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 13,
        borderRadius: 35,
        backgroundColor: "#5A6176",
        marginBottom: 5
    },
    btnText: {
        color: "#fff",
        fontFamily: "Mukta-Bold",
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 3
    },
    submitBtnLogIn: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 13,
        borderRadius: 35,
        backgroundColor: "#fff",
        // borderWidth: 2,
        // borderColor: "#5A6174",
        marginBottom: 15
    },
    btnTextLogIn: {
        color: "#5A6174",
        fontFamily: "Mukta-Bold",
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 3
    }
});