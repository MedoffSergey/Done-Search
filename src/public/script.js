'use strict'


function delete_files (value) {

    console.log('Из текущей директории был удален файл '+ value );
    let va =  document.getElementById(value)
    va.remove();
    $.ajax({
      url: "/delete",   //путь
      type: "GET",    //Метод отправки
      data:{          //передается ключ значение после ?
        id:value
      },
      success: function(){
        window.location.reload()    //если успешно, то перезапускаем страницу через аякс
      }

    });

}

function add_files () {
    let result = document.getElementById ('recipient-name').value ;
    console.log(result)

    let arr = document.getElementById ('recipient-ip').value;
    console.log(arr)

    $.ajax({
      url: "/add",   //путь
      type: "GET",  //Метод отправки
      data:{        //передается ключ значение после ?
        domain: result,
        ip: arr
      },
      success: function(){
        window.location.reload()    //если успешно, то перезапускаем страницу через аякс
      }
    });
}

function superSearch(){
  let searchResult = document.getElementById ('searchInput').value;
  console.log(searchResult)

  $.ajax({
    url: "/search",   //путь
    type: "GET",  //Метод отправки
    data:{        //передается ключ значение после ?
      search: searchResult,

    },
    success: function(){
      window.location.reload()    //если успешно, то перезапускаем страницу через аякс
    }
  });
}
