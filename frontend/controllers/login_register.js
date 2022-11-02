'use strict';

//variables transiciones btns
var form_login = document.getElementById("login");
var form_register = document.getElementById("register");
var z = document.getElementById("btn");

// Declation variables refex
const reg_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
const reg_passwd = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;

function register_css() {
  form_login.style.left = "-400px";
  form_register.style.left = "50px";
  z.style.left = "110px";
}

function login_css() {
  form_login.style.left = "50px";
  form_register.style.left = "450px";
  z.style.left = "0px";
}

//Login Submit server
form_login.addEventListener('submit', e => {
  e.preventDefault();
  let username = document.getElementById('log_username').value;
  let passwd = document.getElementById('log_passwd').value;
  const data = { username: username, passwd: passwd }
  if (regex_log(data) == true) {
    service_login(data);
  } else {
    console.log("Datos Login Incorrectos");
  }
});

//Login regex
function regex_log(data) {
  let username_error = document.getElementById('log_username_error');
  let passwd_error = document.getElementById('log_passwd_error');
  passwd_error.innerHTML = '';
  username_error.innerHTML = '';

  if (data.username.length == 0) {
    username_error.innerHTML = '*El usario es obligaorio';
    return false;
  } else if (data.passwd.length == 0) {
    passwd_error.innerHTML = '*Introduzca la password';
    return false;
  } else {
    return true;
  }
}

//Register Submit server
form_register.addEventListener('submit', e => {
  e.preventDefault();
    let username = document.getElementById('reg_username').value;
    let email = document.getElementById('reg_email').value;
    let passwd1 = document.getElementById('reg_passwd1').value;
    let passwd2 = document.getElementById('reg_passwd2').value;
    let condition = document.getElementById('acept_cond').checked;
    const data = { username: username, email: email, passwd1: passwd1, passwd2: passwd2, condition: condition }
    if (regex_reg(data) == true){
      service_register(data);
    }else {
      console.log("Datos Register incorrectos");
    }

});


function regex_reg(data) {
  let username_error = document.getElementById('reg_username_error');
  let email_error = document.getElementById('reg_email_error');
  let passwd1_error = document.getElementById('reg_passwd1_error');
  let passwd2_error = document.getElementById('reg_passwd2_error');
  let condition_error = document.getElementById('register_condition_error');
  username_error.innerHTML = '';
  email_error.innerHTML = '';
  passwd1_error.innerHTML = '';
  passwd2_error.innerHTML = '';
  condition_error.innerHTML = '';

  if (data.username.length == 0) {
    username_error.innerHTML = '*El usario es obligaorio';
    return false;
  } else if (data.email.length == 0) {
    email_error.innerHTML = '*El email es obligatorio';
    return false;
  }else if (data.passwd1.length == 0) {
    passwd1_error.innerHTML = '*La password es obligatoria';
    return false;
  }else if (data.passwd2.length == 0) {
    passwd2_error.innerHTML = '*Confirma la password';
    return false;
  }else if (data.condition == false){
    condition_error.innerHTML = '*Debe  aceptar las condiciones';
    return false;
  }else if (reg_email.test(data.email) == false){
    email_error.innerHTML = '*El foramto no es correcto';
    return false;
  }else if (reg_passwd.test(data.passwd1) == false){
    passwd1_error.innerHTML = '*+8 carcteres (mayusculas,simbolos,numeros)';
    return false;
  }else if (data.passwd2 != data.passwd1){
    passwd2_error.innerHTML = '*Las passwords no coinciden';
    return false;
  }else {
    console.log("Entro aqui");
    return true;
  }
}


// function used to display the password
function showpasswd(data) {
  if (data == 'log_passwd') {
    var DivPasswd = document.getElementById("log_passwd");
    var change_class = document.getElementById("btn_passwd_log");
  } else if (data == 'reg_passwd1') {
    var DivPasswd = document.getElementById("reg_passwd1");
    var change_class = document.getElementById("btn_passwd1_reg");
  } else if (data == 'reg_passwd2') {
    var DivPasswd = document.getElementById("reg_passwd2");
    var change_class = document.getElementById("btn_passwd2_reg");
  }
  if (DivPasswd.type == "password") {
    DivPasswd.type = "text";
    change_class.classList.remove("fa-eye");
    change_class.className += " fa-eye-slash";
  } else {
    DivPasswd.type = "password";
    change_class.classList.remove("fa-eye-slash");
    change_class.className += " fa-eye";
  }
}
