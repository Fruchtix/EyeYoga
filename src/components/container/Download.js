import React, { useState, useEffect } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import * as FileSystem from 'expo-file-system';
import 'firebase/firestore'
import * as firebase from 'firebase'

export default function Download(props) {

    const [isDownloaded, setIsDownloaded] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(null);
    const [editable, setEditable] = useState(true);
    const [downloadCount, setDownloadCount] = useState(0);
    const [didMount, setDidMount] = useState(false);

    let downloadResumable = null

    useEffect(() => {
        setDidMount(true)
        FileSystem.getInfoAsync(FileSystem.documentDirectory + `${props.course}` + `${props.course === "30 Tage Programm" ? "Tag" : "Übung"} ${4}.wav`)
            .then((promise) => {
                if(promise.exists) {
                    console.log("ist da")
                    setIsDownloaded(true)
                } else {
                    console.log("ist n da") 
                    setIsDownloaded(false)
                }
            })
            .catch((promise) => {
                console.log("error")
            })

        return () => {
            setDidMount(false)
        }
    }, []);

    const download = async() => {
        setIsDownloaded(!isDownloaded)
        setEditable(false)
        createDirectory()
        console.log("bearbeitbar false")
        var storage = firebase.storage();

        // Get Audio
        for(let i=1;i<=props.count;i++) {
            var pathReference = storage.ref(`Audios/${props.course}/${props.course === "30 Tage Programm" ? "Tag" : "Übung"} ${i}.wav`) 
            pathReference.getDownloadURL().then((url) => {
                downloadFromUrl(url, i)
            }).catch((error) => {
                console.log("error")
            })
        }
    }

    const deleteDownload = async() => {
        setIsDownloaded(false)

        console.log("löschen")
        for(let i=1;i<=props.count;i++) {
            FileSystem.deleteAsync(FileSystem.documentDirectory + `${props.course}` + `${props.course === "30 Tage Programm" ? "Tag" : "Übung"} ${i}.wav`)
                .then((promise) => {
                    console.log("gelöscht")
                })
                .catch((err) => {
                    console.log(i + " nicht gelöscht")
                })
        }
    }

    const createDirectory = () => {
        //Create Directory
        try {
            FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + `${props.course}`)
            .catch(() => {
                console.log("error")
            })
        } catch(e) {
            console.log("error " + e)
        }
    }

    const downloadFromUrl = async(url, number) => {
        if(didMount) {
            setEditable(false)
        }

        downloadResumable = FileSystem.createDownloadResumable(
            url,
            FileSystem.documentDirectory + `${props.course}` + `${props.course === "30 Tage Programm" ? "Tag" : "Übung"} ${number}.wav`,
            {},
            callback
        );

        try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            if(didMount) {
                if(number === props.count) {
                    setEditable(true)
                }
            }
        } catch (e) {
            if(didMount) {
                setEditable(true)
            }
            console.error(e);
        }
    }

    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        // setDownloadProgress(progress)
    }
  
    return (
        <View style={styles.outer}>
            <View  style={styles.inner}>
                <Text style={styles.h1}>{isDownloaded && editable ? "Übungen sind heruntergeladen" : "Alle Übungen herunterladen"}</Text>
                {editable ? null : <Text>{editable ? `${props.count} Einheiten (${"202"}MB)` : `Download läuft...`}</Text>}
            </View>
            <Switch 
                style={{ transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }] }}
                trackColor={{ false: "#e9e6e1", true: "#77C79F" }}
                thumbColor={isDownloaded ? "#fefffe" : "#fefffe"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={isDownloaded ? deleteDownload : download}
                value={isDownloaded}
                disabled={!editable}
            />
            {/* <Text>{downloadProgress} {props.count} {props.course}</Text> */}
        </View>
      )
  }

const styles = StyleSheet.create({
    outer: {
        marginHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#eae7e2",
        borderTopColor: "#eae7e2",
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    inner: {

    },
    h1: {
        fontFamily: "Mukta-Bold",
        fontSize: 15,
        color: "#5A6176",
        lineHeight: 30,
    },
    h2: {
        fontFamily: "Mukta-Regular",
        fontSize: 15,
        color: "#333",
    }
})