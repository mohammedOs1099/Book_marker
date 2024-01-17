var bookName = document.getElementById("sitName");
var bookUrl = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("submit");
var btnDelete = document.getElementById("delete");
var id = "";
var urlList;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
if (localStorage.getItem("urlList") == null) {
  urlList = [];
} else {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  display_urls(urlList);
}

function addUrl() {
  var urlobj = {
    name: bookName.value,
    url: bookUrl.value,
    id: id++,
  };

  if (isValidURL(bookUrl.value) === true && isValidName() === true) {
    urlList.push(urlobj);
    empty();
    localStorage.setItem("urlList", JSON.stringify(urlList));

    display_urls(urlList);
  }
}
function empty() {
  bookName.value = "";
  bookUrl.value = "";
}
btnSubmit.addEventListener("click", addUrl);

function display_urls(urls) {
  var container = "";
  for (var i = 0; i < urls.length; i++) {
    container += `
        <tr>
        <td>${i + 1}</td>
        <td>${urls[i].name}</td>
        
        <td><button
        onclick="visetUrl(${urls[i].id})"

         class=" btn  text-center btn-outline-success px-2 "><i class="fa-regular fa-eye px-1"></i>Viset
         </button></td> 
          <td>
          <button onclick="delete_url(${urls[i]
            .id})" class=" btn btn-outline-danger px-2 text-center " >
         <i class="fa-regular fa-trash-can px-1"></i>Delete</button></td>
    </tr>
        `;
  }
  document.getElementById("display").innerHTML = container;
}

function delete_url(id) {
  for (var i = 0; i < urlList.length; i++) {
    if (urlList[i].id === id) {
      urlList.splice(urlList.indexOf(urlList[i]), 1);
    }
  }
  localStorage.setItem("urlList", JSON.stringify(urlList));
  display_urls(urlList);
}
function visetUrl(id) {
  for (var i = 0; i < urlList.length; i++) {
    if (urlList[i].id === id) {
      open(urlList[i].url);
    }
  }
}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    boxModal.classList.remove("visually-hidden");
    return false;
  }
}

function isValidName() {
  var regex = /^[A-Z][a-z]{2,10}$/;
  if (regex.test(bookName.value) === true) {
    return true;
  } else {
    boxModal.classList.remove("visually-hidden");

    return false;
  }
}
function closeInvalidBtn() {
  boxModal.classList.add("visually-hidden");
}
