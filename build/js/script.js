const token = "bcb7e79d086e4fb6f94409d3852ae79029b28556";


//GET-запрос
fetch('http://504080.com/api/v1/services/categories',{
    method: 'GET',
    headers: {
        'Authorization': token
    }
}).then(function (response) {
    response.json().then(function (obj) {
//Service Directory
        if (response.status === 200) {
            for (let i = 0; i < obj.data.length; i++) {
                var el = document.createElement('a');
                el.setAttribute('href', '#');
                el.appendChild(document.createElement('div'));
                el.firstChild.appendChild(document.createElement('img'));
                el.appendChild(document.createElement('p'))
                el.querySelector('img').setAttribute('src', 'http:' + obj.data[i].icon);
                el.querySelector('p').textContent = obj.data[i].title;
                document.querySelector('.content-service-list').appendChild(el);
            }
        }
        else {
//Modal-window
            var modal = document.querySelector('.modal');
            var close = document.querySelector('.modal-window-button');

            document.querySelector('.modal-window-content p').textContent = obj.error.description;
            document.querySelector('.modal-window-header h3').textContent = obj.error.message;

            modal.style.display = 'flex';
            close.onclick = function(){
                modal.style.display = 'none';
            }
        }

    })
});

