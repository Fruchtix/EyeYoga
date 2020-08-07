import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, SafeAreaView,ScrollView,ImageBackground  } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import BuyModal from '../../container/BuyModal'
import DailyModal from '../../presentation/DailyModal'
import PopulareCourses from '../../presentation/PopulareCourses'
import {Feather as Icon} from '@expo/vector-icons'
import {IMAGES} from '../../presentation/Images'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            buyModalvisibility: false,
            dailyModalvisibility: false
        }
    }

    //Logo
    //https://thenounproject.com/term/eye/362215/

    getImage(name) {
        switch(name) {
            case "Grundlagen": return "Grundlagen"
            case "Grundlagen II": return "GrundlagenII"
            case "30 Tage Programm": return "thirtyDayProgramm"
            case "Trockene Augen": return "TrockeneAugen"
            case "Kopfschmerzen": return "Kopfschmerzen"
            case "Augentraining": return "MuskelTraining"
            case "Augenentspannung": return "Augenentspannung"
        }
    }

    getCourseTime(name) {
        switch(name) {
            case "Grundlagen": return "3-5 min"
            case "Grundlagen II": return "3-5 min"
            case "30 Tage Programm": return "8-10 min"
            case "Trockene Augen": return "6-8 min"
            case "Kopfschmerzen": return "6-10 min"
            case "Augentraining": return "8-10 min"
            case "Augenentspannung": return "6-8 min"
        }
    }

    render() { 
        const myCourses = []

        this.props.screenProps.courses.forEach((element, index) => {
            myCourses.push(
            <TouchableWithoutFeedback style={[styles.myCourses]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: element.name, reload: () => this.props.screenProps.reload(), premium: this.props.screenProps.premium})} key={index}>
                <View style={[{flexDirection: "row", alignItems: "center"}]}>
                    <View style={styles.shadow}>
                        <ImageBackground style={[styles.myCoursesImage,styles.shadow]} source={IMAGES[`${this.getImage(element.name)}`]} >
                            <Text></Text>
                        </ImageBackground>
                    </View>
                    <Text style={styles.courseName}>{element.name}</Text>
                </View>
                <View>
                    <Icon name="chevron-right" size={24} color="#5A6176" />
                </View>
            </TouchableWithoutFeedback>)
        });

        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={{marginHorizontal: 20}}>
                            
                            {/* Logo */}
                            <View style={styles.logoWrapper}>
                                <ImageBackground style={styles.logo} source={require("../../../../assets/logo.png")}>
                                    <Text></Text>
                                </ImageBackground>
                            </View>

                            {/* headline */}
                            <View>
                                <Text style={styles.headline}>Augen verbessern?</Text>
                                {/* <Text style={styles.subHeadline}>Beginne mit Übung {this.props.screenProps.courses[this.props.screenProps.courses.length-1].currentExercise +1}</Text> */}
                                <Text style={styles.subHeadline}>Beginne jetzt mit der nächsten Übung</Text>
                                {/* <Text style={styles.subHeadline}>Mache einfach weiter</Text> */}
                            </View>

                        </View>

                        {/* Course */}
                        <TouchableWithoutFeedback style={[{paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 10},styles.shadow]} onPress={() => this.props.navigation.navigate("CourseScreen", {name: this.props.screenProps.currentCourse, reload: () => this.props.screenProps.reload(), premium: this.props.screenProps.premium})}>
                            <ImageBackground style={[styles.courseWrapper, styles.shadow]} source={IMAGES[`${this.getImage(this.props.screenProps.currentCourse)}`]} > 
                                    <View style={styles.innerCourse}>
                                        <Text style={styles.infoBasics}>{this.props.screenProps.currentCourse}</Text>
                                        <Text style={styles.infoBasicsSec}>{this.getCourseTime(this.props.screenProps.currentCourse)}</Text>
                                    </View>
                            </ImageBackground>
                        </TouchableWithoutFeedback>

                        <View style={{marginHorizontal: 20}}>
                            {/* Daily Challange */}
                            <View>
                                <View>
                                    <Text style={styles.headline}>Mehr Infos über EyeYoga</Text>
                                    {/* <Text style={styles.subHeadline}>Wie funktioniert das ganze?</Text> */}
                                </View>

                                <TouchableWithoutFeedback onPress={() => this.setState({dailyModalvisibility: true})}>
                                    <View style={styles.dailyChallengeWrapper}>
                                        <Text style={styles.howdoesitwork}>Das steckt hinter den Übungen</Text>
                                        <View>
                                            <Icon name="help-circle" size={24} color="#5A6176" />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            {/* My Courses */}
                            <View>
                                <View>
                                    <Text style={styles.headline}>Meine Kurse</Text>
                                </View>

                                <View style={styles.myCoursesWrapper}>
                                    {myCourses[0] !== null ? myCourses[0] : null}
                                    {myCourses[1] !== null ? myCourses[1] : null}
                                    {myCourses[2] !== null ? myCourses[2] : null}
                                </View>

                                {myCourses.length > 3 ?
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AllCourses", {courses: myCourses})}>
                                        <View style={styles.showAllWrapper}>
                                            <Text style={styles.showAllTxt}>Alle anzeigen</Text>
                                        </View>
                                    </TouchableOpacity> : null}

                            </View>

                        </View>
                        
                        {/* Populare */}
                        <View>
                            <View>
                                <Text style={[styles.headline, {marginLeft: 20}]}>Beliebt</Text>
                            </View>
                            
                            <View style={{marginTop: 10, marginBottom: 30}}>
                                <PopulareCourses navigation={this.props.navigation} premium={this.props.screenProps.premium} reload={() => this.props.screenProps.reload()} />
                            </View>

                        </View>

                        {/* Buy Premium */}
                        {/* <ImageBackground style={styles.buyWrapper} source={{uri: "https://cdn.pixabay.com/photo/2014/05/03/00/35/wood-336589_960_720.jpg"}} > */}
                        <View style={styles.buyWrapper}>
                            <Text style={styles.headline}>EyeYoga Archiv</Text>
                            <Text style={styles.headline}>{this.props.screenProps.premium ? "freigeschaltet" : "freischalten"}</Text>

                            <ImageBackground style={{flex: 1, height: "100%",width: "100%"}}  source={require("../../../../assets/start2.png")}>
                                {/* Buy Button */}
                                <TouchableOpacity style={{alignSelf: "center"}} onPress={() => {this.props.screenProps.premium ? this.props.navigation.navigate("Erkunde") : this.setState({buyModalvisibility: true})}}>
                                    <View style={styles.buyButton}>
                                        <Text style={styles.btnText}>{this.props.screenProps.premium ? "Jetzt Augen trainieren" : "Jetzt freischalten"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>

                        {this.state.buyModalvisibility ? <BuyModal navigation={this.props.navigation} visibility={this.state.buyModalvisibility} onClose={() => this.setState({buyModalvisibility: false})} /> : null}
                        {this.state.dailyModalvisibility ? <DailyModal visibility={this.state.dailyModalvisibility} onClose={() => this.setState({dailyModalvisibility: false})} /> : null}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    logoWrapper: {
        alignItems: "center",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20
        // 20 30
    },
    logo: {
        width: 70,
        height: 35,
        // borderRadius: 30,
        // backgroundColor: "#B5D780",
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 21,
        color: "#5A6176",
        lineHeight: 32,
    },
    subHeadline: {
        fontFamily: "Mukta-Regular",
        fontSize: 15,
        color: "#333",
    },
    courseWrapper: {
        backgroundColor: "#EBE7E4",
        borderRadius: 8,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        height: 220,
        marginTop: 13,
        marginBottom: 25,
        overflow: "hidden",
    },
    innerCourse: {
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 8,
        backgroundColor: "#5A6176",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    infoBasics: {
        fontFamily: "Mukta-Bold",
        fontSize: 16,
        color: "#fff",
        lineHeight: 19,
    },
    infoBasicsSec: {
        fontFamily: "Mukta-Regular",
        fontSize: 13,
        color: "#fff",
        lineHeight: 17,
        textTransform: "uppercase",
        letterSpacing: 1
    },
    dailyChallengeWrapper: {
        height: 75,
        backgroundColor: "#ebe7e4",
        borderRadius: 8,
        marginTop: 13,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 25
    },
    myCourses: {
        height: 75,
        flexDirection: "row",
        paddingRight: 15,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#ebe7e4",
        borderRadius: 8,
        overflow: "hidden"
    },
    myCoursesWrapper: {
        marginBottom: 13,
        marginTop: 13
    },
    buyWrapper: {
        height: 350,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 25,
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
        marginTop: 15
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Mukta-Bold",
        letterSpacing: 3,
        textTransform: "uppercase"
    },
    showAllWrapper: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#5A6176",
        borderRadius: 30,
        paddingVertical: 8,
        marginBottom: 25,
        marginHorizontal: 45
    },
    showAllTxt: {
        color: "#5A6176",
        fontSize: 13,
        fontFamily: "Mukta-Bold",
        letterSpacing: 2,
        textTransform: "uppercase"
    },
    myCoursesImage: {
        borderRadius: 8,
        height: "100%",
        marginRight: 10,
        overflow: "hidden",
        width: 100
    },
    courseName: {
        fontFamily: "Mukta-Bold",
        fontSize: 15,
        color: "#5A6176",
    },
    howdoesitwork: {
        fontFamily: "Mukta-Bold",
        fontSize: 15,
        color: "#5A6176",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
            },
});