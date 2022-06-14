import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Weather(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.locationText}>{props.location} </Text>
            <Text style={styles.temperatureText}>{props.temperature} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'steelblue',
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    locationText: {
      flexGrow: 4,
      flexBasis: 200,
      fontSize: 20,
      alignItems: 'stretch',
      alignSelf: 'flex-start',
      backgroundColor:'white',
      padding: 10,

    },
    temperatureText: {
      flexGrow: 1,
      flexBasis: 75,
      fontSize: 20,
      alignSelf: 'flex-end',
      alignItems: 'stretch',
      backgroundColor:'limegreen',
      textAlign: 'center',
      padding: 10,
    },
  });