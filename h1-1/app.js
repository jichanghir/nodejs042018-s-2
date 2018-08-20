const path = require('path');

// сохраняем соурс и дест папки в переменные
const srcDir = process.argv[2];
const destDir = process.argv[3];

// надо проверить была ли переданы имена соурс и дест папком в качестве аргумента, и если нет то выводим ошибку и завершаем выполнение скрипта
if (!srcDir || !destDir) {
    console.error('Source dir and dest dir are required');
    process.exit(1);
}

// проверяем есть ли destination папка, и если нету то создаем
if (!fs.existsSync(path.join(process.cwd(), destDir))) {
    fs.mkdir(path.join(process.cwd(), destDir), (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        // Если папка создалась то работаем дальше

        go();
    })
}
else {
    go();
}

function go() {

    // далее нам надо прочитать соурс папку. Так как у нас в папке могут быть еще папки, а тех еще и так далее, то надо прочитать каталог рекурсивно. Для этого оборачиваем метод чтения в функцию с одним параметром, в который будем передавать читаемую папку, и рекурсивно будем вызывать эту функцию если наткнемся еще на какую-то папку
    const readDir = (base) => {
        fs.readdir(base, (err, files) => {
            // Если при чтении какой-то папки произойдет ошибка, то выводим сообщение об ошике и завершаем выполнение скрипта, так как дальнейшее его выполнение не имеет смысла
            if (err) {
                console.error(err);
                process.exit(1);
            }

            files.forEach(item => {
                // Далее читаем статистику каждого файла. Надо учитывать путь той папки в которой будет находится функция, и имя файлы которй читаем. Дело в том что при рекурсии base будем все время разный
                fs.stat(path.join(base, item), (err, stats) => {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }

                    // Далее прооверяем если это папака то рекурсивно читаем ее
                    if (stats.isDirectory()) {
                        readDir(path.join(base, item));
                    }

                    // если не папка, значит файл
                    else {
                        // получаем пурвую букву
                        const nameFolder = item.charAt(0).toLowerCase();

                        // собираем адрем папки куда положим файл
                        const newBase = path.join(process.cwd(), destDir, nameFolder);

                        // проверяем если такой папки еще нет то создаем
                        if (!fs.existsSync(newBase)) {
                            fs.mkdirSync(newBase);
                        }

                        // копируем файл, по дефолту если файл с таким именем уже есть он перезапишется
                        fs.copyFile(path.join(base, item), path.join(newBase, item), (err) => {
                            if (err) {
                                // в данном случае можно не завершать процесс, а просто выводить уведомление об ошибке
                                console.error(err);
                            }
                        });
                    }
                })
            });
        })
    }
    readDir(path.join(process.cwd(), srcDir));
}
