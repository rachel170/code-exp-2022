import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Animated, FlatList, Button} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Weather from "./components/Weather";


const SGTEMPERATURE_URL = "https://api.data.gov.sg/v1/environment/air-temperature?date_time="

function MainScreen({ navigation }) {

  // Var
  const [isLoading, setLoading] = useState(true);
  const [readings, setReadings] = useState([]);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={loadWeatherData} title="Update" />,
    });
  });

  // Function to load/process data
  function loadWeatherData() {
    setLoading(true);

    datetime = getCurrentTime();

    fetch(SGTEMPERATURE_URL + datetime)
      .then((response) => { return response.json(); })
      .then((responseData) => {

        setStations(responseData.metadata.stations);
        setReadings(responseData.items[0]);
        
        setLoading(false);
      });
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

  const getCurrentTime = () => {
    let today = new Date();
    let date = today.toISOString().split('T')[0];
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return date + 'T' + hours + ':' + minutes + ':' + seconds;
}


  // Function for auto refresh every minute
  useEffect(() => {
    const interval = setInterval(loadWeatherData, 5 * 60000);

    return () => clearInterval(interval);
  },[]);

  function renderItem({ item }) {
    let temp = 0;
    let arr = readings.readings;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].station_id === item.id) {
        temp = arr[i].value;
      }
    }

    return (
      <View style={{borderColor:'black',}}>
      <Weather temperature={temp} location={item.name} />
      </View>
    );
  }

  // View
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Fetching The Temperatures</Text>
        </View>
      ) : (
        <FlatList style={styles.list} data={stations} renderItem={renderItem} />
      )}
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Live Temperatures in Singapore" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  },
});
