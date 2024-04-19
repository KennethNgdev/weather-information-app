// https://www.hko.gov.hk/tc/abouthko/opendata_intro.htm

import axios, {isCancel, AxiosError} from 'axios';

export default class WeatherForecastModel {
    getFlw(lang = "tc"): any {
        return new Promise((resolve, reject) => {
            axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php', {
                params: {
                dataType: "flw",
                lang: lang
                }
            })
            .then(function (response) {
                // console.log(response["data"]);
                resolve(response["data"])
            })
            .catch(function (error) {
                console.log(error);
                reject(error)
            })
            .finally(function () {
            // always executed
            });
        })
    }

    getFnd(lang = "tc"): any {
        return new Promise((resolve, reject) => {
            axios.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php', {
                params: {
                dataType: "fnd",
                lang: lang
                }
            })
            .then(function (response) {
                // console.log(response["data"]);
                resolve(response["data"])
            })
            .catch(function (error) {
                console.log(error);
                reject(error)
            })
            .finally(function () {
            // always executed
            });
        })
    }
}