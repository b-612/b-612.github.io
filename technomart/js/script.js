var map = document.querySelector(".modal-map");
var openMap = document.querySelector(".contacts__map");
var closeMap;

var contacts = document.querySelector(".modal-write");
var contactsLink = document.querySelector(".contacts__link");
var closeContacts;

var contactsForm = document.querySelector(".write-form");
var nameField;
var emailField;
var messageField;
var isStorageSupport = true;
var nameStorage;
var emailStorage;

var products = document.querySelector(".products__products--catalog");
var btnBuy;
var buy;
var closeBuy;

var overlay = document.querySelector(".overlay");

try {
  closeMap = map.querySelector(".modal-close");
  closeContacts = contacts.querySelector(".modal-close")

  nameField = contacts.querySelector("[name=name]");
  emailField = contacts.querySelector("[name=email]");
  messageField = contacts.querySelector("[name=letter]");

  try {
    nameStorage = localStorage.getItem("nameField");
    emailStorage = localStorage.getItem("emailField");
  }
  catch (err) {
    isStorageSupport = false;
  }

  openMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    map.classList.add("modal-show");
    overlay.classList.add("modal-show");
  });

  closeMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    map.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
  });

  contactsLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    contacts.classList.add("modal-animation");
    nameField.focus();
    if (nameStorage && emailStorage) {
      nameField.value = nameStorage;
      emailField.value = emailStorage;
      messageField.focus();
    }
    overlay.classList.add("modal-show");
  });

  contactsForm.addEventListener("submit", function (evt) {
    if (!nameField.value || !emailField.value || !messageField.value) {
      evt.preventDefault();
      contacts.classList.add("modal-error");
      setTimeout(function() {
        contacts.classList.remove("modal-error");
        contacts.classList.remove("modal-animation");
        contacts.classList.add("modal-show");
      }, 700);
    }
    else if (isStorageSupport) {
      localStorage.setItem("nameField", nameField.value);
      localStorage.setItem("emailField", emailField.value);
    }
  });

  closeContacts.addEventListener("click", function (evt) {
    evt.preventDefault();
    contacts.classList.remove("modal-animation");
    contacts.classList.remove("modal-show");
    contacts.classList.remove("modal-error");
    overlay.classList.remove("modal-show");
  });

  overlay.addEventListener("click", function () {
    map.classList.remove("modal-show");
    contacts.classList.remove("modal-animation");
    contacts.classList.remove("modal-show");
    contacts.classList.remove("modal-error");
    overlay.classList.remove("modal-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (map.classList.contains("modal-show")) {
        map.classList.remove("modal-show");
        overlay.classList.remove("modal-show");
      }
      else if (contacts.classList.contains("modal-animation") || contacts.classList.contains("modal-show")) {
        contacts.classList.remove("modal-animation");
        contacts.classList.remove("modal-show");
        contacts.classList.remove("modal-error");
        overlay.classList.remove("modal-show");
      }
    }
  });
}
catch (err) {
  console.log("На этой странице есть код, который относится к странице index.html и здесь не выполняется");
}

try {
  btnBuy = products.querySelectorAll(".btn--buy");
  buy = document.querySelector(".modal-order");
  closeBuy = buy.querySelector(".order-close");

  for (var i = 0; i < btnBuy.length; i++) {
    btnBuy[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      buy.classList.add("modal-show");
      overlay.classList.add("modal-show");
    });
  }

  closeBuy.addEventListener("click", function (evt) {
    evt.preventDefault();
    buy.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
  });

  overlay.addEventListener("click", function () {
    buy.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (buy.classList.contains("modal-show")) {
        buy.classList.remove("modal-show");
        overlay.classList.remove("modal-show");
      }
    }
  });
}
catch (err) {
  console.log("На этой странице есть код, который относится к странице catalog.html и здесь не выполняется");
}
