const axios = require('axios');
var userModel = require('../models/userModel');

var total;

async function userAll(req, res, next) {

    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 20;
    let keyword = req.query.keyword ? req.query.keyword : null;
    let know = req.query.know ? req.query.know : null;
    let gender = req.query.keyword ? req.query.gender : null;
    // console.log(req);

    let myArray = [];
    if (keyword != null) {
        tmp = {
            "display_name": new RegExp(
                "^" + keyword + ".*",
                "i"
            )
        };
        myArray.push(tmp);
    }
    if (know != null) {
        if(know == 1){
            tmp = {
                "display_name": { $ne: "" } 
            };
        }else{
            tmp = {
                "display_name": ""
            };
        }
        myArray.push(tmp);
    }
    console.log(myArray);
    var condition = myArray.reduce(function(map, obj) {
        map[obj.id] = obj.car;
        return map;
    }, {});

   console.log(condition)
    await new Promise((resolve, reject) => {
        userModel.total(condition,(err, c) => {
            if (err) return reject(err);

            resolve(c);
        });
    }).then(response => {
        total = response;
        return total;
    });

    // console.log(total);

    userModel.get(function (err, result) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        var format = [];
        result.forEach(element => {
            let tmp = {};
            tmp.id_user = element.id_user;
            tmp.id_chat = element.id_chat;
            tmp.display_name = element.display_name;
            tmp.avatar = element.avatar;
            tmp.cover = element.cover;
            tmp.status = element.status;
            tmp.relation = element.relation;
            tmp.status_verify = element.status_verify;
            tmp.counts = element.counts;
            format.push(tmp);
        });

        res.json({
            status: true,
            message: "success",
            page: page,
            items: limit,
            total: total - (page * limit) < 0 ? 0 : total - (page * limit),
            data: format
        });

    },condition, page - 1, limit);
}
exports.userAll = userAll;