import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs'; // Работа с файловой системой (запись, считывание и тд)

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
}

const filePath = join(homedir(), 'weather-data.json')

const saveKeyValue = async (key, value) => {
    let data = {};

    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
}

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch {
        return false;
    }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };

/*
import from 'path';
    console.log(basename(filePath)); // конечный файл или папка "weather-data.json"
    console.log(dirname(filePath)); // директория "C:\Users\user"
    console.log(extname(filePath)); // тип расширения ".json"
    console.log(relative(filePath, dirname(filePath))); // относительные пути между одним и вторым ".."
    console.log(isAbsolute(filePath)) // 'true'
    console.log(resolve('..')) // 'E:\code\courses\Node.js' - относительно текущей папке
    console.log(sep) // '\' - текущий сепаратор
*/
