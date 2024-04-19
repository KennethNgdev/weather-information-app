import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import cheerio from 'react-native-cheerio';

export default function WeatherImage() {
    const [weatherData, setWeatherData] = useState([]);
    
    

    useEffect(() => {
        const fetchData = async () => {
            const { data: html } = await axios.get('https://www.hko.gov.hk/tc/wxinfo/ts/index_webcam.htm');
            const $ = cheerio.load(html);
            const newWeatherData = [];            
            $('img').each((index, element) => {
                const imgName = $(element).attr('alt');
                let imgUrl = $(element).attr('src');
                imgUrl = imgUrl.replace("../../../", 'https://www.hko.gov.hk/');
                var b =  Math.floor(Math.random()*100+1);
                imgUrl += "?b=" + b;
                imgUrl = imgUrl.replace("_thumb", '');
                newWeatherData.push({ name: imgName, url: imgUrl });
                                
            });
            setWeatherData(newWeatherData);
            
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);

        ;
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (weatherData.length === 0) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    {weatherData.map((data, index) => {
                        if (!data.name) {
                            return null; 
                        }
                        
                        return (
                            <View key={index} style={styles.container}>
                                <Text style={styles.text}>{data.name}:</Text>
                                
                                <Image
                                    style={styles.image}
                                    resizeMode='contain'
                                    source={{ uri: data.url }}
                                />
                                
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    image: {
        aspectRatio: '720/405',
        height: 'auto',
        width: "100%",
        
        
        // marginBottom: -60,
    },
    container: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#13a19a',
        paddingBottom:15,        
        marginBottom: 15, 
    },
    text: {
        fontWeight: 'bold', 
        fontSize: 20, 
        // marginBottom:-100,

    },

})
