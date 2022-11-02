var contentUser = document.getElementById('div_user');
var btn_login = document.getElementById('btn_login');

if (localStorage.getItem('token')) {
    contentUser.classList.remove("div_hide");
    btn_login.className += " div_hide";

    let username = document.getElementById('name');
    username.innerHTML = atob(localStorage.getItem("token"));
    let avatar = document.getElementById('avatar')
    avatar.src = "https://avatars.dicebear.com/api/personas/" + atob(localStorage.getItem("token")) + ".svg";
}

function logout() {
    localStorage.removeItem("token");
    location.href = "../index.html";
}