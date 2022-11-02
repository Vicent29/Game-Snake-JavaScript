if (localStorage.getItem('dataEasy') || localStorage.getItem('dataEasy') ||  localStorage.getItem('dataEasy') ){
    console.log("Laderboard okey");
}else {
    post_laderboard();
}
get_laderboard("easy")

function show_laderboard(modo) {
    if (modo == "easy") {
        get_laderboard("easy")
    } else if (modo == "medio") {
        get_laderboard("medio")
    } else if (modo == "pro") {
        get_laderboard("pro")
    }
}

function Updateladerboard(score) {

    let mode = localStorage.getItem('dificult');
    let name = atob(localStorage.getItem("token"));

    if (mode == "easy") {
        update_laderboard("dataEasy", name, score);
    } else if (mode == "medium") {
        update_laderboard("dataMedio", name, score);
    } else if (mode == "pro") {
        update_laderboard("dataPro", name, score);
    }else {
        update_laderboard("dataEasy", name, score);
    }
   
}