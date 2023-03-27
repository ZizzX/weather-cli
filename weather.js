#!/usr/bin/env node

// Строка #!/usr/bin/env node называется "шебангом" (shebang) и
// используется в Unix-подобных операционных системах (Linux, macOS и др.),
// чтобы указать путь к интерпретатору,
// который должен использоваться для запуска данного скрипта.
import { getArgs } from './helpers/args.js';

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args["h"]) {
        // Вывод help
    }
    if (args["s"]) {
        // Сохранить город
    }
    if (args["t"]) {
        // Сохранить токен
    }
    // Вывести погоду
}

initCLI();
