function post_laderboard() {
    let easy = [{ nombre: "Vicent", pts: 2 }, { nombre: "Cristian", pts: 25 }, { nombre: "Raul", pts: 23 }, { nombre: "Susan", pts: 22 }, { nombre: "Marina", pts: 21 }];
    let medio = [{ nombre: "Raul", pts: 2 }, { nombre: "Sofia", pts: 33 }, { nombre: "Ivan", pts: 23 }, { nombre: "Susan", pts: 22 }, { nombre: "Carla", pts: 30 }];
    let pro = [{ nombre: "David", pts: 21 }, { nombre: "Luis", pts: 13 }, { nombre: "Blai", pts: 18 }, { nombre: "Andrea", pts: 25 }, { nombre: "Angela", pts: 1 }];
    localStorage.setItem("dataEasy", JSON.stringify(easy));
    localStorage.setItem("dataMedio", JSON.stringify(medio));
    localStorage.setItem("dataPro", JSON.stringify(pro))
}

function SortArray(x, y) {
    if (x.pts < y.pts) { return 1; }
    if (x.pts > y.pts) { return -1; }
}

function get_laderboard(modo) {
    var title = document.getElementById('titlelader');

    if (modo == "easy") {
        title.innerHTML = "LADERRBOARD EASY"
        var data = JSON.parse(localStorage.getItem("dataEasy"));
    } else if (modo == "medio") {
        title.innerHTML = "LADERRBOARD MEDIUM"
        var data = JSON.parse(localStorage.getItem("dataMedio"));
    } else if (modo == "pro") {
        title.innerHTML = "LADERRBOARD PRO"
        var data = JSON.parse(localStorage.getItem("dataPro"));
    }
    const dataSort = data.sort(SortArray);
    var capa = document.getElementById("table_lader");
    capa.innerHTML = "";
    var tr = document.createElement("tr");
    capa.appendChild(tr);
    var tdAvatar = document.createElement("td");
    var tdName = document.createElement("td");
    var tdPts = document.createElement("td");

    tdAvatar.className += " sin_borde";
    tdName.innerHTML = "NAME";
    tdPts.innerHTML = "PTS."

    tr.appendChild(tdAvatar);
    tr.appendChild(tdName);
    tr.appendChild(tdPts);

    for (let i = 0; i < 5; i++) {
        var tr = document.createElement("tr");
        capa.appendChild(tr);
        var tdAvatar = document.createElement("td");
        var tdName = document.createElement("td");
        var tdPts = document.createElement("td");

        var image = new Image();
        image.src = "https://avatars.dicebear.com/api/personas/" + dataSort[i].nombre + ".svg";
        image.className += " img_lader"
        tdAvatar.className += " div_avatar";
        tdAvatar.appendChild(image);
        tdName.innerHTML = dataSort[i].nombre;
        tdPts.innerHTML = dataSort[i].pts

        tr.appendChild(tdAvatar);
        tr.appendChild(tdName);
        tr.appendChild(tdPts);
    }

}

function update_laderboard(mode, name, score) {

    if (mode == "dataEasy") {
        var data = JSON.parse(localStorage.getItem('dataEasy'));
    } else if (mode == "dataMedio") {
        var data = JSON.parse(localStorage.getItem('dataMedio'));
    } else if (mode == "dataPro") {
        var data = JSON.parse(localStorage.getItem('dataPro'));
    } else {
        var data = JSON.parse(localStorage.getItem('dataEasy'));
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].nombre == name) {
            if (data[i].pts < score) {
                data[i].pts = score;
            }
            var exist = "yes";
        }
    }
    if (exist != "yes") {
        data.push({nombre: name, pts: score});
    }


    localStorage.setItem(mode, JSON.stringify(data));
}