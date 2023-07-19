import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import axios from "axios";

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            'q': city,
            'appid': token,
            'lang': 'ru',
            'units': 'metrics'
        }
    });

    return data;
}

export { getWeather };

/*const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'ru');
    url.searchParams.append('units', 'metrics');

    https.get(url, (response) => {
        let res = '';
        response.on('data', (chunk) => {
            res += chunk;
        })

        response.on('end', () => {
            console.log(res)
        })

        response.on('error', (err) => {
            console.error(err);
        })
    });*/
