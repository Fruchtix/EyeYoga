import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class PopulareCourses extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        const IMAGES = {
            Grundlagen: require('../../../assets/Grundlagen.png'), 
            GrundlagenII: require('../../../assets/GrundlagenII.png'), 
            thirtyDayProgramm: require('../../../assets/thirtyDayProgramm.png'), 
            TrockeneAugen: require('../../../assets/TrockeneAugen.png'), 
            Kopfschmerzen: require('../../../assets/Kopfschmerzen.png'), 
            MuskelTraining: require('../../../assets/MuskelTraining.png'), 
            Augenentspannung: require('../../../assets/Augenentspannung.png'), 
        }

        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableWithoutFeedback style={[styles.wrapper,styles.shadow,{paddingLeft: 20}]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "30 Tage Programm", reload: this.props.reload(), premium: this.props.premium})}>
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['thirtyDayProgramm']} >
                        <View style={styles.border}>
                            <Text style={styles.courseName}>30 Tage Programm</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={[styles.wrapper, styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "Augenentspannung", reload: () => this.props.reload(),premium: this.props.premium})}>
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['Augenentspannung']} >
                    <View style={styles.border}>
                            <Text style={styles.courseName}>Augenentspannung</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={[styles.wrapper, styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "Grundlagen", reload: () => this.props.reload(),premium: this.props.premium})}>
                    {/* <View style={styles.item}><Text></Text></View> */}
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['Grundlagen']} >
                        <View style={styles.border}>
                            <Text style={styles.courseName}>Grundlagen</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={[styles.wrapper, styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "Grundlagen II", reload: () => this.props.reload(),premium: this.props.premium})}>
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['GrundlagenII']} >
                        <View style={styles.border}>
                            <Text style={styles.courseName}>Grundlagen II</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={[styles.wrapper, styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "Trockene Augen", reload: () => this.props.reload(),premium: this.props.premium})}>
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['TrockeneAugen']} >
                        <View style={styles.border}>
                            <Text style={styles.courseName}>Trockene Augen</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={[styles.wrapper, styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "Kopfschmerzen", reload: () => this.props.reload(),premium: this.props.premium})}>
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['Kopfschmerzen']} >
                        <View style={styles.border}>
                            <Text style={styles.courseName}>Kopfschmerzen</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={[styles.wrapper, styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: "Augentraining", reload: () => this.props.reload(),premium: this.props.premium})}>
                    <ImageBackground style={[styles.item, styles.shadow]} source={IMAGES['MuskelTraining']} >
                        <View style={styles.border}>
                            <Text style={styles.courseName}>Augentraining</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginRight: 8,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    item: {
        borderRadius: 8,
        // borderWidth: 2,
        // borderColor: "#5A6176",
        height: 145,
        width: 185,
        overflow: "hidden",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingBottom: 4,
        paddingLeft: 4,
    },
    border: {
        justifyContent: "center",
        borderRadius: 6,
        backgroundColor: '#f4f4f4',
        paddingVertical: 2,
        paddingHorizontal: 4
    },
    courseName: {
        fontFamily: "Mukta-Bold",
        fontSize: 14,
        color: "#5A6176",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
})