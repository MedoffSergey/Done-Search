  //Подключение модулей
const express = require('express');
const fs = require('fs');
const path = require ('path');
const pug = require('pug');
const url = require('url')
const removeFs = require('fs-extra')
//init app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');    // указываем используемый шаблонизатор HTML кода

const directory = '/home/smedov/Work/Test/';    //Указываем путь текущей дериктории



app.use(express.static(path.join(__dirname, 'public')));    //добовляет файлы которые на компьютере для загрузки если они имеются

//Главная страница
app.get('/', function (req, res) {
    const files = fs.readdirSync(directory);           //Прочитываем файлы из текущей директории

    for(let i=0; i<files.length;i++)               //убираем расширение
      {
        let name = path.basename(files[i], '.conf');
        files[i] = name;
      }

    let searchResult = req.query.search;    //присваиваем переменной результат запроса клиента


    const filterItems = (searchResult) => {             //фильтр Поискового окна
      return files.filter((el) =>
        el.indexOf(searchResult) > -1
      );
    }

    let filterList = filterItems(searchResult);             //присваиваем отфильтрованные переменные в одну переменную


    if(filterList!=''){
      res.render('index', { title: 'Directory', value: filterList});
    }else

    res.render('index', { title: 'Directory', value: files});       //рендерим файл index.pug
});


app.get('/delete', function(req, res) {          //  удаления файла из текущей директории
    const folder = directory+req.query.id+'.conf';
    removeFs.remove(folder, err => {
      console.error(err),
      res.send("Файл " + req.query.id + " был успешно удален");
    })


});


app.get('/add', function(req, res){

    let domain = req.query.domain;
    let fileName = directory + domain + '.conf'
    let ip = req.query.ip;
    let domenWithoutDots=domain.replace(/\./g, ""); //убираем точку глабально


    let fileContent = fs.readFileSync('/home/smedov/Work/Test/template.conf', "utf8");
    var newStr = fileContent.replace(/__DOMAINWITHOUTDOT__/g, domenWithoutDots).replace(/__DOMAIN__/g, domain).replace(/__IP_ADDRESS__/g,ip);

    //записываем в файл домен и ip
    fs.writeFile(fileName, newStr , function(error){
      if(error) throw error; //Использую инструкцию throw для генерирования исключения


      res.send("200");//выведем 200ок

    });
});

app.get('/login', function(req, res){
    res.render('login', {title:'Вход'});
});

app.get('/getLogin', function(req, res){

  const out = {
    token: 'supertoken-3213123123',
    str:req.query.login+'--'+req.query.password,
    name: req.query.login
  }

  // let outStr=JSON.stringify(out);
  console.log(out);
  res.json({outStr});
});


//запускаем сервер
app.listen(3000, function () {
    console.log ('Отслеживаем порт: 3000!');
});
