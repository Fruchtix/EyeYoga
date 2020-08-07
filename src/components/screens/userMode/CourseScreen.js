import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, ImageBackground, Platform, Switch  } from 'react-native';

import {Feather as Icon} from '@expo/vector-icons'
import GoBackHeader from '../../presentation/GoBackHeader'

import ExerciseFlatlist from '../../container/ExerciseFlatlist'
import PlayExerciseScreen from '../userMode/PlayExerciseScreen'
import Download from '../../container/Download'

import registerForPushNotificationsAsync from '../../presentation/PushNotifactions'

import * as firebase from 'firebase'
import 'firebase/firestore'

import * as StoreReview from 'expo-store-review';

export default class CourseScreen extends Component {
    constructor() {
        super()
        this.state = {
            displayExercise: false,
            displayExerciseName: "",
            doneCount: -1,
            isUpdating: true,
            exerciseList: [],
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this.update()
        this.getExercisesFromFB()
    }

    getExercisesFromFB = () => {
        const name = this.props.navigation.getParam("name","error")
        const exerciseList = []

        firebase.firestore().collection("courses").doc(name).get()
            .then((doc) => {
                if (doc.exists) {
                    for (const [key, value] of Object.entries(doc.data())) {
                        exerciseList.push({name: key, free: value})
                    }
                    this.setState({exerciseList: exerciseList})
                } else {

                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            })
    }

    update = () => {
        const name = this.props.navigation.getParam("name","error")

        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(name).get()
        .then((doc) => {
            if (doc.exists) {
                this.setState({doneCount: doc.data().currentExercise})
            } else {
                
            }
        })
        .then(() => {
            this.setState({isUpdating: false, isRefreshing: false})
        }).catch(function(error) {
            this.setState({isUpdating: false, isRefreshing: false})
            console.log("Error getting document:", error);
        });
    }

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

    getItems(name) {
        switch(name) {
            case "Grundlagen": return 5
            case "Grundlagen II": return 5
            case "30 Tage Programm": return 30
            case "Trockene Augen": return 7
            case "Kopfschmerzen": return 5
            case "Augentraining": return 10
            case "Augenentspannung": return 7
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

    getDesc(name) {
        switch(name) {
            case "Grundlagen": return "Lege mit nur 5 Übungen den Grundstein für stärkere Augenmuskeln und entspannteres Sehen. Es ist ganz einfach!"
            case "Grundlagen II": return "Ergänze deinen Übungspool und fange an dein Training zu vertiefen. Lege jetzt direkt los!"
            case "30 Tage Programm": return "Trainiere 30 Tage lang täglich deine Augen mit EyeYoga. Schaffst du die Challenge?"
            case "Trockene Augen": return "Erhöhe deine Tränenflussigkeit, verbessere deine Sicht und mach Sehen wieder angenehm!"
            case "Kopfschmerzen": return "Lockere deine Augenmuskulatur und entspanne somit deinen ganzen Kopf. Probiere es einfach mal aus!"
            case "Augentraining": return "Trainiere verstärkt deine Augen für ein gesünderes und angenhemeres Sehen. Stell dich der Herausforderung!"
            case "Augenentspannung": return "Atme durch und lass deine Augen mal zur Ruhe kommen. Es ist ganz einfach!"
        }
    }

    // getColorTheme(name) {
    //     switch(name) {
    //         case "Grundlagen": return "#5A6174"
    //         case "Grundlagen II": return "#fff" 
    //         case "30 Tage Programm": return "#fff"
    //         case "Trockene Augen": return "#5A6174"
    //         case "Kopfschmerzen": return "#fff"
    //         case "Muskel Training": return "#5A6174"
    //         case "Augenentspannung": return "#fff"
    //     }
    // }

    render() {
        const name = this.props.navigation.getParam("name","error")
        const reload = this.props.navigation.getParam("reload","erroooor")
        const premium = this.props.navigation.getParam("premium","erroooor")
        
        const IMAGES = {
            Grundlagen: require('../../../../assets/Grundlagen.png'), 
            GrundlagenII: require('../../../../assets/GrundlagenII.png'), 
            thirtyDayProgramm: require('../../../../assets/thirtyDayProgramm.png'), 
            TrockeneAugen: require('../../../../assets/TrockeneAugen.png'), 
            Kopfschmerzen: require('../../../../assets/Kopfschmerzen.png'), 
            MuskelTraining: require('../../../../assets/MuskelTraining.png'), 
            Augenentspannung: require('../../../../assets/Augenentspannung.png'), 
        }

        return (
            <View style={styles.safeArea}>

                    {/* COurse Description {uri: this.getImage(name)} */}
                    <ImageBackground style={styles.courseDesc} source={IMAGES[`${this.getImage(name)}`]} >

                        <GoBackHeader color={"#5A6174"} navigation={this.props.navigation} />
                        <View style={styles.container}>
                            {/* Specifications */}
                            <View style={styles.specifications}>
                                <Text style={styles.courseName}>{name}</Text>
                                <Text style={styles.courseDetails}>Kurs | {this.getItems(name)} Einheiten | {this.getCourseTime(name)}</Text>

                                <Text style={styles.desc}>{this.getDesc(name)}</Text>
                            </View>
                        </View>
                    </ImageBackground>



                    <View>
                        <Download course={name} count={this.getItems(name)} />
                    </View>

                    {/* Exercises */}
                    <View style={styles.exerciseWrapper}>
                        {this.state.isUpdating ? <ActivityIndicator size="small" color="#333" /> : <ExerciseFlatlist premium={premium} navigation={this.props.navigation} isRefreshing={this.state.isRefreshing} course={name} onPress={(name,id) => this.setState({displayExerciseName: name,displayExercise: true,id: id})} doneCount={this.state.doneCount} data={this.state.exerciseList.sort()} onRefresh={() => this.setState({isRefreshing: true}, () => this.update())}/>}
                    </View>

                    {this.state.displayExercise && this.state.displayExerciseName ? <PlayExerciseScreen source={IMAGES[`${this.getImage(name)}`]} id={this.state.id} courseName={name} reload={() => reload()} name={this.state.displayExerciseName} close={() => {this.update(),this.setState({displayExercise: false}), this.state.id === "pushnotifications" ? registerForPushNotificationsAsync() : null, this.state.id === "4" && name === "Grundlagen" ? StoreReview.requestReview() : null}} visible={this.state.displayExercise && this.state.displayExerciseName !== ""} /> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        marginHorizontal: 20,
        marginTop: 15,
        flexDirection: "row",
        paddingBottom: 20,
    },
    courseDesc: {
        paddingTop: Platform.OS === "android" ? 15 : 40,
        backgroundColor: "#EBE7E4",
    },
    specifications: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "70%",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    picture: {
        width: "40%",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    desc: {
        marginTop: 10,
        fontFamily: "Mukta-Regular",
        fontSize: 15,
        color: "#fff",
        lineHeight: 20,
    },
    courseName: {
        fontFamily: "Mukta-Bold",
        fontSize: 23,
        color: "#fff",
        lineHeight: 28,
    },
    courseDetails: {
        fontFamily: "Mukta-Regular",
        fontSize: 14,
        color: "#fff",
        lineHeight: 17,
        letterSpacing: 1
    },
    exerciseWrapper: {
        marginTop: 25,
        marginHorizontal: 20,
        position: "relative",
        flex: 1,
        paddingBottom: 25
    }
});