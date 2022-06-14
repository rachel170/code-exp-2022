import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';

export default function App() {

  // Var
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(null);

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    return hours + ':' + minutes;
  }

  // Function to load/process data
  function loadLightningWarningData() {
    setLoading(true);
    // TODO: Process/Fetch data
    setLoading(false);
  }

export default class App extends React.Component {
  state = {
    isLoading: true
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <View>
            <Text> Lightning Warning App</Text>
          </View>
        )}
      </View>
    );
  }
}  
  
  // Function for time update
  useEffect(() => {
    let time = getCurrentTime();
    setTime(time);
  }, []);

  // Function for auto refresh
  useEffect(() => {
    const interval = setInterval(loadLightningWarningData, 15000);

    return () => clearInterval(interval);
  }, []);

  // View
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{time}</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : "arrival" }
      </Text>
      <Text style={[styles.arrivalTime, { fontSize: 20 }]}>
        {loading ? <ActivityIndicator size="large" /> : "arrival2" }
      </Text>
      <TouchableOpacity style={styles.button} onPress={loadLightningWarningData}>
        <Text style={styles.buttonText}>Refresh!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 20
  },
  arrivalTime: {
    fontWeight: "bold",
    fontSize: 52
  },
  button: {
    backgroundColor: "green",
    padding: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
});
