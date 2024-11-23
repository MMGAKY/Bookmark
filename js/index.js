var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var nameCheck;
var bookList = [];
if (localStorage.getItem("Bookmarkers") !== null) {
  bookList = JSON.parse(localStorage.getItem("Bookmarkers"));
  display();
}

function addUrl() {
  if (validationName() && validationUrl()) {
    var book = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookList.push(book);
    localStorage.setItem("Bookmarkers", JSON.stringify(bookList));
    display();
    clear();
  }
}

function display() {
  var cartona = `
        <tr>
            <td><h4>Index</h4></td>
            <td><h4>Website Name</h4></td>
            <td><h4>Visit</h4></td>
            <td><h4>Delete</h4></td>
        </tr>`;
  for (var i = 0; i < bookList.length; i++) {
    cartona += `<tr>
        <td><p>${i + 1}</p></td>
        <td><p>${bookList[i].name}</p></td>
        <td>
          <a href="${bookList[i].url}" target="_blank"
            ><button class="btn btn-primary px-3">
              <i class="fa-regular fa-eye me-1"></i> Visit
            </button></a
          >
        </td>
        <td>
            <button onclick="deleteItem(${i})" class="btn btn-danger px-3">
              <i class="fa-solid fa-trash-can me-1"></i> Delete
            </button>
        </td>
      </tr>`;
  }
  document.getElementById("inner").innerHTML = cartona;
}

function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-invalid");
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-valid");
}

function deleteItem(index) {
  bookList.splice(index, 1);
  localStorage.setItem("Bookmarkers", JSON.stringify(bookList));
  display();
}

function validationName() {
  var regex = /^[A-Z][a-z0-9]{2,19}$/;
  var userMsg = document.getElementById("alertname");
  nameCheck = siteNameInput.value;

  if (regex.test(nameCheck)) {
    for (var i = 0; i < bookList.length; i++) {
      if (nameCheck !== bookList[i].name) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        userMsg.classList.remove("d-block");
        userMsg.classList.add("d-none");
      } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        userMsg.classList.add("d-block");
        userMsg.classList.remove("d-none");
        return false;
      }
    }
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  }
}
function validationUrl() {
  var regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var text = siteUrlInput.value;
  var userMsg = document.getElementById("alerturl");
  if (regex.test(text)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    userMsg.classList.remove("d-block");
    userMsg.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    userMsg.classList.add("d-block");
    userMsg.classList.remove("d-none");
    return false;
  }
}
