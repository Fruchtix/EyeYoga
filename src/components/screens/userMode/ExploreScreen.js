import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform,SafeAreaView, ScrollView, TouchableOpacity, ImageBackground  } from 'react-native';
import Course from '../../presentation/Course'
import BuyModal from '../../container/BuyModal'
import {IMAGES} from '../../presentation/Images'

export default class ExploreScreen extends Component {
    constructor() {
        super()
        this.state = {
            buyModalvisibility: false
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>

                        <View style={styles.headlineWrapper}>
                            <Text style={styles.headline}>Erkunde EyeYoga</Text>
                        </View>
            
                        <Course name="Grundlagen" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['Grundlagen']} />
                        <Course name="Grundlagen II" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['GrundlagenII']} />

                        {/* Buy Premium */}
                        {/* <ImageBackground style={styles.buyWrapper} source={{uri: "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg"}} > */}
                        <View style={[styles.shadow, this.props.screenProps.premium ? {display: "none"} : {}]}>
                            <View style={[styles.buyWrapper, styles.shadow]}>
                                <Text style={styles.headline}>EyeYoga Archiv</Text>
                                <Text style={styles.headline}>freischalten</Text>

                                {/* Buy Button */}
                                <TouchableOpacity onPress={() => this.setState({buyModalvisibility: true})}>
                                    <View style={styles.buyButton}>
                                        <Text style={styles.btnText}>Jetzt freischalten</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* </ImageBackground> */}

                        <Course name="30 Tage Programm" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['thirtyDayProgramm']} />
                        <Course name="Trockene Augen" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['TrockeneAugen']} />
                        <Course name="Kopfschmerzen" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['Kopfschmerzen']} />
                        <Course name="Augentraining" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['MuskelTraining']} />
                        <Course name="Augenentspannung" navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} uri={IMAGES['Augenentspannung']} />

                        {this.state.buyModalvisibility ? <BuyModal navigation={this.props.navigation} visibility={this.state.buyModalvisibility} onClose={() => this.setState({buyModalvisibility: false})} /> : null}


                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    buyButton: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flexDirection: "row",
        backgroundColor: "#5A6176",
        paddingHorizontal: 25,
        marginTop: 15,
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Mukta-Bold",
        letterSpacing: 3,
        textTransform: "uppercase"
    },
    buyWrapper: {
        backgroundColor: "#ebe7e4",
        alignItems: "center",
        paddingTop: 10,
        marginBottom: 5,
        borderRadius: 8,
        height: 150,
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 21,
        color: "#5A6176",
        lineHeight: 32,
    },
    headlineWrapper: {
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 10
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
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});