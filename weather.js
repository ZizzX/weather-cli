#!/usr/bin/env node

// Строка #!/usr/bin/env node называется "шебангом" (shebang) и
// используется в Unix-подобных операционных системах (Linux, macOS и др.),
// чтобы указать путь к интерпретатору,
// который должен использоваться для запуска данного скрипта.
import { getArgs } from './helpers/args.js';
import {printHelp, printSuccess, printError} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

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

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }
    if (args.s) {
        // Сохранить город
    }
    if (args.t) {
        return saveToken(args.t);
        // Сохранить токен
    }

    return getWeather('moscow');
    // Вывести погоду
}

initCLI();
