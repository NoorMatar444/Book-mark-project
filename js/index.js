var siteName = document.getElementById("siteName");
var url = document.getElementById("url");

if (localStorage.getItem("sitesList") !== null) {
  siteLists = JSON.parse(localStorage.getItem("sitesList"));
  displayData();
}

var siteLists = [];

function addSite() {
  if(validationName() && validationUrl()){
    var site = {
    name: siteName.value,
    url: url.value,
  };
  siteLists.push(site);
  localStorage.setItem("sitesList", JSON.stringify(siteLists));
  displayData();
  clearData();
  }
}

function displayData() {
  element = "";
  for (var i = 0; i < siteLists.length; i++) {
    element += `
                <tr>
                    <td>${i}</td>
                    <td>${siteLists[i].name}</td>
                    <td><button class="one rounded-3"><i class="fa-solid fa-eye"></i><a href="${siteLists[i].url}">Visit</a></button></td>
                    <td><button onclick="deleteItem(${i})" class="two rounded-3"><i class="fa-solid fa-trash"></i>Delete</button></td>
                </tr>
        `;
  }
  document.getElementById("tableData").innerHTML = element;
}
function clearData() {
  siteName.value = "";
  url.value = "";
}
function deleteItem(index) {
  siteLists.splice(index, 1);
  localStorage.setItem("sitesList", JSON.stringify(siteLists));
  displayData();
}
function validationName(){
    var regex=/^www.[a-zA-Z][a-zA-Z0-9]{2,19}.com$/;
    var text=siteName.value;
    var message=document.getElementById("message");
    if(regex.test(text)){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        message.classList.add("d-none");
        return true;
    }
    else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        message.classList.remove("d-none");
        return false;
    }
}
function validationUrl(){
    var regex=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    var text=url.value;
    var messageUrl=document.getElementById("messageUrl");
    if(regex.test(text)){
        url.classList.add("is-valid");
        url.classList.remove("is-invalid");
        messageUrl.classList.add("d-none");
        return true;
    }
    else {
        url.classList.add("is-invalid");
        url.classList.remove("is-valid");
        messageUrl.classList.remove("d-none");
        return false;
    }
}
