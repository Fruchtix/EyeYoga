import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Modal, Platform , ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import {Feather as Icon} from '@expo/vector-icons'

export default class PlayExeciseScreen extends Component {
    constructor() {
        super()
        this.soundObject = null;
        this.state = {
            isPlaying: false,
            audio: null,
            audioLength: 0,
            currentPosition: 0,
            unlockNext: false,
            currentPositionSec: 0,
            changePositionAvalable: true
        }
        this.didMount = false
    }

    componentWillUnmount() {
        this.didMount = false
        if(this.soundObject !== null) {
            this.soundObject.pauseAsync()
        }
    }

    componentDidMount() {
        this.didMount = true
        Audio.setIsEnabledAsync(true);
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true
          });


        this.checkDownloaded()
    }

    checkDownloaded = () => {
        FileSystem.getInfoAsync(FileSystem.documentDirectory + `${this.props.courseName}` + `${this.props.name}.wav`)
            .then((promise) => {
                if(promise.exists) {
                    console.log("downloaded")
                    this.getExeciseFromUrl({uri: promise.uri})
                } else {
                    console.log("nicht downloaded")
                    this.getUrl()
                }
            })
            .catch((promise) => {
                console.log("error")
            })
    }

    getUrl = () => {
        var storage = firebase.storage();
        var pathReference = storage.ref(`Audios/${this.props.courseName}/${this.props.name}.wav`);
        pathReference.getDownloadURL()
            .then((url) => {
                if(this.didMount) {
                    this.setState({audio: {uri: url}})
                }
                this.getExeciseFromUrl({uri: url})
            })
            .catch((error) => {
                console.log("error")
        });
    }

    getExeciseFromUrl = async(audio) => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              audio,
              { shouldPlay: false }
            );
            this.soundObject = soundObject
            this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            if(this.didMount) {
                this.setState({audioLength: (status.durationMillis/100000).toFixed(2)})
            }
          } catch (error) {
            // An error occurred!
            console.log("error")
          }
    }

    play = async() => {
        try {
            if(this.state.isPlaying) {
                if(this.didMount) {
                    this.setState({isPlaying: false})
                }
                this.soundObject.pauseAsync()
            } else {
                if(this.didMount) {
                    this.setState({isPlaying: true})
                }
                this.soundObject.playAsync();
            }
        }
        catch(e) {

        }
    }

    pushToHistory = () => {
        return new Promise((resolve,reject) => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("History").doc("lastCourse").set(({
                currentCourse: this.props.courseName,
            }))
            .then(() => {
                resolve("SUCCESS")
            })
            .catch(() => {
                console.log("error")
                reject("FAILURE")
            })
        })
    }

    unlockNext = () => {
        return new Promise((resolve,reject) => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(this.props.courseName).get()
            .then((doc) => {
                if (doc.exists) {
                    if(doc.data().currentExercise <= this.props.id) {
                        //Unlock next Exercise
                        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(this.props.courseName).update({
                            currentExercise: doc.data().currentExercise + 1
                        })
                        .then(() => {
                            resolve("SUCCESS")
                        })
                        .catch(function(error) {
                            console.error("Error updating document: ", error);
                            reject("FAILURE")
                        });
                    }
                    else {
                        resolve("SUCCESS")
                    }
                } else {
                    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(this.props.courseName).set({
                        currentExercise: 1
                    })
                    .then(() => {
                        resolve("SUCCESS")
                    })
                    .catch(function(error) {
                        console.error("Error updating document: ", error);
                        reject("FAILURE")
                    });
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                reject("FAILURE")
            });
        })
    } 

    _onPlaybackStatusUpdate = async(playbackStatus) => {
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
          // Update your UI for the loaded state
      
          if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
                if(this.didMount) {
                    this.setState({currentPositionSec: playbackStatus.positionMillis,currentPosition: (playbackStatus.positionMillis/playbackStatus.durationMillis) * 100})
                }
                if(((playbackStatus.positionMillis/playbackStatus.durationMillis) * 100) >= 65 && !this.state.unlockNext ) {
                    if(this.didMount) {
                        this.setState({unlockNext: true})
                    }
                    try {
                        await Promise.all([this.pushToHistory(), this.unlockNext()]) 
                        this.props.reload()
                    } catch(e) {
                        console.log("error")
                    }
                }
          } else {
            // Update your UI for the paused state
          }
      
          if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            if(this.didMount) {
                this.setState({currentPosition: 100})
            }
          }
        }
      };

    changePosition = (type) => {
        if(this.soundObject !== null && this.state.changePositionAvalable) {
            try {
                if(this.didMount) {
                    this.setState({changePositionAvalable: false})
                }
                if(type === "forward") {
                    // this.soundObject.setStatusAsync({ shouldPlay: true, positionMillis: this.state.currentPositionSec + 10000 })
                    this.soundObject.playFromPositionAsync(this.state.currentPositionSec + 10000)
                } else {
                    this.soundObject.playFromPositionAsync(this.state.currentPositionSec - 10000)
                }
                setTimeout(() => {if(this.didMount) {this.setState({changePositionAvalable: true})}}, 1000)
            } catch(e) {

            }
        }
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                statusBarTranslucent={true}
            >
                {/* <View style={styles.safeArea}> this.props.source*/}
                <ImageBackground style={styles.safeArea} source={this.props.source} >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                hitSlop={{top: 7, right: 7, left: 7, bottom: 7}}
                                onPress={() => this.props.close()}>
                                <Icon name="x" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.subHeadline}>{this.props.courseName}</Text>
                        </View>

                        <View style={{flex: 2, justifyContent: "center"}}>
                            <Text style={styles.headline}>{this.props.name}</Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <TouchableOpacity hitSlop={{top: 7, right: 7, left: 7, bottom: 7}} style={{justifyContent: "flex-end", marginRight: 23}} onPress={() => this.changePosition("rewind")}>
                                <Icon name="rewind" size={25} color="#fff" />
                            </TouchableOpacity>

                            <AnimatedCircularProgress
                                size={125}
                                width={10}
                                rotation={0}
                                fill={this.state.currentPosition}
                                tintColor="#5A6175"
                                onAnimationComplete={this.state.currentPosition===100? () => setTimeout(() => this.props.close(), 800): () => {}}
                                style={{alignItems: "center",justifyContent: "center"}}
                                backgroundColor="#d4d4d4">
                                {
                                    (fill) => (
                                        <TouchableWithoutFeedback onPress={this.soundObject !== null ? () => this.play() : () => {}}>
                                            <View style={styles.buttonInnerWrapper}>
                                                {this.soundObject === null ? <ActivityIndicator size="small" color="#5A6175" /> : <Icon name={this.state.isPlaying ? "pause" : "play"} size={28} color="#5A6175" />}
                                            </View> 
                                        </TouchableWithoutFeedback>
                                    )
                                }
                            </AnimatedCircularProgress>

                            <TouchableOpacity hitSlop={{top: 7, right: 7, left: 7, bottom: 7}} style={{justifyContent: "center", marginLeft: 23}} onPress={() => this.changePosition("forward")}>
                                <Icon name="fast-forward" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop: 20, flex: 3, justifyContent: "flex-start", alignItems: "center"}}>
                            <Text>
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#EBE7E4",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
        marginTop: Platform.OS === 'android' ? 25 : 50,
    },
    buttonInnerWrapper: {
        width: 110,
        height: 110,
        borderRadius: 110,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF5EB",
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 28,
        color: "#fff",
    },
    subHeadline: {
        fontFamily: "Mukta-Regular",
        fontSize: 18,
        color: "#fff",
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        // width: "70%",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1,
        paddingTop: 16
    },
});