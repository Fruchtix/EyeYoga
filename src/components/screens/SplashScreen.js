import React, { Component } from 'react';
import { View, StyleSheet, Image,Text, ImageBackground, SafeAreaView, Platform } from 'react-native'

class SplashScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                {/* <ImageBackground source={{uri: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_960_720.jpg"}} style={styles.container}> */}
                    <View style={styles.logoWrapper}>
                        <ImageBackground style={styles.logo} source={require("../../../assets/logo.png")}>
                            <Text></Text>
                        </ImageBackground>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
    container: {
        flex: 1,
        backgroundColor: "#FDFEFD",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20
        // flexDirection: "row"
    },
    name: {
        fontSize: 33,
        fontWeight: "bold",
        color: "#5A6176",
    },
    logoWrapper: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    logo: {
        width: 70,
        height: 35,
        // borderRadius: 30,
        // backgroundColor: "#B5D780",
        // marginRight: 10,
        marginBottom: 15
    },
})

export default SplashScreen;
