var mongoose = require('mongoose');
var database = require('../../config/db/db.users');

//mostrar todos los users
exports.findUsers = async (req, res) => {
    console.log("FIND ALL USERS");
    await res.json(database);
}

//registarar un usario
exports.registerUser = async (req, res) => {
    console.log("Estamos en el register");
    const confirm_exist_user = db_users.find(user => {
        return user.username == JSON.parse(req.params.username);
    });
    if (confirm_exist_user == undefined) {
        db_users.push({ email: JSON.parse(req.params.email), username: JSON.parse(req.params.username), passwd: JSON.parse(req.params.passwd) });
        res.json(JSON.parse(req.params.username));
    } else {
        res.json("User exist");
    }
}

//logear un usario
exports.loginUser = async (req, res) => {

    const confirm_exist_user = db_users.find(user => {
        return user.username == JSON.parse(req.params.username);
    });
    if (confirm_exist_user != undefined) {
        if (confirm_exist_user.passwd == JSON.parse(req.params.passwd)) {
            res.json(JSON.parse(req.params.username));
        } else {
            res.json("Passwd incorrect");
        }
    } else {
        res.json("No user")
    }
}

