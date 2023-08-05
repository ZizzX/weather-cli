#!/usr/bin/env node

// Строка #!/usr/bin/env node называется "шебангом" (shebang) и
// используется в Unix-подобных операционных системах (Linux, macOS и др.),
// чтобы указать путь к интерпретатору,
// который должен использоваться для запуска данного скрипта.
import { getArgs } from './helpers/args.js';
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен!');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен!');
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Не верно указан город');
        } else if (e?.response?.status === 401) {
            printError('Не верно указан токен');
        } else {
            printError(e?.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    // Переменные окружения
    // console.log(process.env);

    if (args.h) {
       return printHelp();
    }
    if (args.s) {
        // Сохранить город
        return saveCity(args.s);
    }
    if (args.t) {
        // Сохранить токен
        return saveToken(args.t);
    }

    // Вывести погоду
    return getForecast();
}

initCLI();
