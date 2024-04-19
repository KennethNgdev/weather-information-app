/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ViewBase, ScrollView, useColorScheme } from 'react-native';
import CurrentTime from '../components/get_current_time';
import UserLocation from '../components/get_geo_location';
import axios from 'axios';
import dayjs from 'dayjs';

const api_key = "AIzaSyD7h9XihSYhJQrEVMGrVwVe7ps0y81nQjk"

const HomeScreen = () => {
  const district = UserLocation()
  const district_map_temperature = {
    "Islands District": "Chek Lap Kok",
    "Kwai Tsing District": "Tsing Yi",
    "North District": "Ta Ku Ling",
    "Sai Kung District": "Tseung Kwan O",
    "Sha Tin District": "Sha Tin",
    "Tai Po District": "Tai Po",
    "Tsuen Wan District": "Tsuen Wan Shing Mun Valley",
    "Tuen Mun District": "Tuen Mun",
    "Yuen Long District": "Yuen Long Park",
    "Kowloon City District": "Kowloon City",
    "Kwun Tong District": "Kwun Tong",
    "Sham Shui Po District": "Sham Shui Po",
    "Wong Tai Sin District": "Wong Tai Sin",
    "Yau Tsim Mong District": "King's Park",
    "Central and Western District": "Hong Kong Park",
    "Eastern District": "Shau Kei Wan",
    "Southern District": "Stanley",
    "Wan Chai District": "Happy Valley",
};

  const [rainFall, setRainFall] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);
  }, []);
  
  const get_weather_report =  async () => {
    const response = await axios.get(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en`
    );
    const temperature_data = response.data.temperature.data;
    const rainFall_data = response.data.rainfall.data;
    setTemperature(temperature_data);
    setRainFall(rainFall_data);

  } 

  const location_temp = () => {
    if(district in district_map_temperature){
      const location = district_map_temperature[district]
      const temp = temperature.find(item => item.place === location)
      return temp.value
    }
  }

  const location_temperature = location_temp();
  useEffect(() => {
    get_weather_report();
  }, [])

  return (
    <View>
      <View style={styles.upperStyle}>
        <View >
          <Text style={{ fontSize: 18 }}>{dayjs().format("DD MMMM YYYY (dddd)")}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 32 }}>{dayjs().format("hh:mm")}</Text>
        </View>
        <View>
          <Text style={{fontSize: 18}}>{district || "Loading..."}</Text>
          <Text style={styles.temperatureStyle}>{location_temperature ? `${location_temperature} \u00B0C` : "Loading..."}</Text>
        </View>
      </View>
      <ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  upperStyle: {
    width: "100%",
    height: 150,
    alignItems: 'center',
  },
  temperatureStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;