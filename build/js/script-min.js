const token="bcb7e79d086e4fb6f94409d3852ae79029b28556";fetch("http://504080.com/api/v1/services/categories",{method:"GET",headers:{Authorization:token}}).then(function(e){e.json().then(function(t){if(200===e.status)for(let e=0;e<t.data.length;e++){var n=document.createElement("a");n.setAttribute("href","#"),n.appendChild(document.createElement("div")),n.firstChild.appendChild(document.createElement("img")),n.appendChild(document.createElement("p")),n.querySelector("img").setAttribute("src","http:"+t.data[e].icon),n.querySelector("p").textContent=t.data[e].title,document.querySelector(".content-service-list").appendChild(n)}else{var o=document.querySelector(".modal"),r=document.querySelector(".modal-window-button");document.querySelector(".modal-window-content p").textContent=t.error.description,document.querySelector(".modal-window-header h3").textContent=t.error.message,o.style.display="flex",r.onclick=function(){o.style.display="none"}}})});