import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export default GetUserCoords = () => {
  const api_key = 'AIzaSyBxfjFAgtngaVV22GM33zZK7omHw31hw3Q';
  const [currentLocation, setCurrentLocation] = useState(null);
  const [district, setDistrict] = useState(null);
  const [location_permission, setLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);
  
  useEffect(() => {
    if (location_permission) {
      getCurrentLocation();
    }
  }, [location_permission]);

  useEffect(() => {
    console.log('getDistrict')
    getDistrict();
  }, [currentLocation]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Weather Information App Location Permission',
          message: 'Weather Information App access to your Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can get the location');
        setLocationPermission(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    console.log('Getting current location...');
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude })
        if (currentLocation !== null){
          getDistrict();
        }
      },
      error => console.error('Error:', error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const getDistrict = async () => {

    if (currentLocation !== null) {
      const { latitude, longitude } = currentLocation;
      console.log('latitude:', latitude, 'longitude:', longitude);
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`
          // `https://maps.googleapis.com/maps/api/geocode/json?latlng=22.325892349291355,114.16192142787912&key=${api_key}`
        );
        const results = response.data.results;
        if (results.length > 0) {
          results.forEach(element => {
            let formattedAddress = element.formatted_address;
            if (formattedAddress.includes("District")) {
              let subStringIndex = formattedAddress.indexOf("District") + "District".length;
              let district = formattedAddress.substring(0, subStringIndex);
              setDistrict(district);
              console.log('district:', district);
            }
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }

    }
    
  };

  return district
};

