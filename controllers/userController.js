var rp = require('request-promise');
let queryString = require('query-string');

var userModel = require('../models/userModel');

let base = "https://api.gapo.vn/";
let path = "main/v1.0/user/view?";

async function insert(options) {
    response = await rp(options);
    return response;

}
function parseData() {
    for (i = 150002; i <= 180000; i++) {
        query = {
            id: i,
        };

        var options = {
            url: base + path + queryString.stringify(query),
            method: 'GET',
            resolveWithFullResponse: true,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6Ijg1MDIifQ.eyJpc3MiOiJhcGkuZ2Fwby52biIsImF1ZCI6ImFwaS5nYXBvLnZuIiwianRpIjoiODUwMiIsImlhdCI6MTU2Mzg0NDc1MSwibmJmIjoxNTYzODQ0NzUxLCJleHAiOjE1NjY0MzY3NTEsInVpZCI6ODUwMiwicGVybWlzc2lvbiI6bnVsbH0.sNW7NWsKgnMOl7xjhsqM7Yey9fGBpeFyetmQKVFNCOE',
            }

        };
        const ins = insert(options).then((htmlString) => {
            data = htmlString.body;
            if (data) {
                console.log(base + path + queryString.stringify(query));
                console.log(data.id);
                // userModel.findOne({ id_user: data.id }, (err, doc) => {
                //     let user;
                //     if (err) {
                //         doc.id_user = data.id;
                //         doc.id_chat = data.id_chat;
                //         doc.username = data.username;
                //         doc.display_name = data.display_name;
                //         doc.avatar = data.avatar;
                //         doc.cover = data.cover;
                //         doc.gender = data.gender;
                //         doc.birthday = data.birthday;
                //         doc.location = data.location;
                //         doc.counts = data.counts;
                //         doc.status = data.status;
                //         doc.create_time = data.create_time;
                //         doc.relation = data.relation;
                //         doc.status_verify = data.status_verify;
                //         doc.data_source = data.data_source;
                //         doc.save();
                //     } else {
                //         user = new userModel({
                //             id_user: data.id,
                //             id_chat: data.id_chat,
                //             username: data.username,
                //             display_name: data.display_name,
                //             avatar: data.avatar,
                //             cover: data.cover,
                //             gender: data.gender,
                //             birthday: data.birthday,
                //             location: data.location,
                //             counts: data.counts,
                //             status: data.status,
                //             create_time: data.create_time,
                //             relation: data.relation,
                //             status_verify: data.status_verify,
                //             data_source: data.data_source
                //         });
                //         user.save();
                //     }

                // });

                user = new userModel({
                    id_user: data.id,
                    id_chat: data.id_chat,
                    username: data.username,
                    display_name: data.display_name,
                    avatar: data.avatar,
                    cover: data.cover,
                    gender: data.gender,
                    birthday: data.birthday,
                    location: data.location,
                    counts: data.counts,
                    status: data.status,
                    create_time: data.create_time,
                    relation: data.relation,
                    status_verify: data.status_verify,
                    data_source: data.data_source
                });
                user.save();
            }

        }).catch(err => {
            // console.log(i);
        });
    }
}
exports.user = (req, res, next) => {
    parseData();
}

