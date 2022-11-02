async function service_login(data) {
  let requestServer = await (await fetch('http://localhost:3000/' + JSON.stringify(data.username) + "/" + JSON.stringify(data.passwd))).json();
  if (requestServer == "No user") {
    document.getElementById('log_username_error').innerHTML = '*El usuario no existe';
  } else if (requestServer == "Passwd incorrect") {
    document.getElementById('log_passwd_error').innerHTML = '*La passwd es icorrecta';
  } else {
    console.log(requestServer);
    localStorage.setItem("token", btoa(requestServer));
    location.href ="../../../frontend/index.html";
  }

}

async function service_register(data) {
  console.log("Soy el service del register ");
  let requestServer = await (await fetch('http://localhost:3000/' + JSON.stringify(data.username) + "/" + JSON.stringify(data.passwd1) + "/" + JSON.stringify(data.email))).json();
  if (requestServer == "User exist") {
    document.getElementById('reg_username_error').innerHTML = '*El usuario ya exite';
  }else {
    console.log(requestServer);
    localStorage.setItem("token", btoa(requestServer));
    location.href ="../../../frontend/index.html";
  }
}