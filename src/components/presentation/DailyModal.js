import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Linking  } from 'react-native';

import 'firebase/functions'
import * as firebase from 'firebase'
import {Feather as Icon} from '@expo/vector-icons'

export default class DailyModal extends Component {
    constructor(){
        super()
        this.state={
        
        }
    }
  
    render() {

        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                                onPress={() => this.props.onClose()}>
                                <Icon name="x" size={25} color="#5A6174" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{marginBottom: 15}}>
                                <Text style={styles.headline}>Über EyeYoga</Text>
                            </View>

                            <View>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.infoText}>Augen rechts, Augen links, Augen drücken, Augen rollen. Mit Übungen wie diesen sieht man nach einer Weile besser, versprechen Sehtrainer. Aber: Wenn das so einfach wäre, warum machen das dann nicht alle?</Text>
                                </View>

                                <View style={styles.textWrapper}>
                                    <Text style={styles.infoText}>Weil viele einfach nicht wissen wie genau das funktioniert. Genau dafür ist EyeYoga da! Zusammen mit EyeYoga kannst du systematisch deine Augen trainieren.</Text>
                                </View>

                                <View style={styles.textWrapper}>
                                    <Text style={styles.infoText}>Der Gründervater des Augentrainings ist William Bates. Der amerikanische Augenarzt entwickelte in den 1920er Jahren ein Sehtraining, welches die Augenmuskeln stärken und Entspannung fördern soll. Bates vertrat die Auffassung, dass Augen bis ins Alter ohne Brille auskommen können. Laut Bates dürfen die Augen nur nicht überanstrengt werden, müssen genügend Wärme und Sonnenlicht bekommen und die Muskulatur muss trainiert werden.</Text>
                                </View>

                                <View style={styles.textWrapper}>
                                    <Text style={styles.infoText}>Mithilfe der Übungen soll der Stress des Sehens reduziert und gleichzeitig deine Augenmuskeln gestärkt werden. Die Techniken zielen außerdem darauf ab, Nacken und Schultern zu entspannen.</Text>
                                </View>

                                <View style={styles.textWrapper}>
                                    <Text style={styles.infoText}>Disclaimer: Wir können dir nicht versprechen, dass deine Augen tatsächlicher besser werden.</Text>
                                </View>

                                <View style={styles.textWrapper}>
                                    <Text style={styles.infoText} onPress={() => Linking.openURL('https://icons8.com')}>Illustrations by <Text style={{color: '#feaf15'}} onPress={() => Linking.openURL('https://icons8.com')}>Ouch.pics</Text></Text>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        backgroundColor: "#00000080",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 20,
        flex: 1,
        height: "100%"
    },
    innerWrapper: {
        width: "100%",
        height: "70%",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 18
    },
    optionButtons: {
        alignItems: "center"
    },
    headline: {
        fontFamily: "Mukta-Bold",
        fontSize: 19,
        color: "#5A6176"
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 18,
    },
    textWrapper: {
        marginBottom: 15
    },
    infoText: {
        fontFamily: "Mukta-Regular",
        fontSize: 16,
        color: "#333",
    }
})
