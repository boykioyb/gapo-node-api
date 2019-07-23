var rp = require('request-promise');
let queryString = require('query-string');

var userModel = require('../models/userModel');

let base = "https://api.gapo.vn/";
let path = "main/v1.0/user/view?";

async function parseData() {
    //var validOrders = [];
    const options = {
        url: base + path + queryString.stringify(query),
        method: 'GET',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6Ijg1MDIifQ.eyJpc3MiOiJhcGkuZ2Fwby52biIsImF1ZCI6ImFwaS5nYXBvLnZuIiwianRpIjoiODUwMiIsImlhdCI6MTU2Mzg0NDc1MSwibmJmIjoxNTYzODQ0NzUxLCJleHAiOjE1NjY0MzY3NTEsInVpZCI6ODUwMiwicGVybWlzc2lvbiI6bnVsbH0.sNW7NWsKgnMOl7xjhsqM7Yey9fGBpeFyetmQKVFNCOE',
        }
        // transform: function (body, response) {
        //     let data = response.body;
        //     console.log(response);
        //     validOrders.push(data.id);
        //     return data.id;
        // }
    };
    
    return rp(options)
    // return validOrders;
}

function insert() {
   for(i=0;i<= 9000;i++){
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
    rp(options).then((htmlString) => {
        data = htmlString.body;
        let user = new userModel({
            id_user: data.id,
            id_chat: data.id_chat,
            username: data.username,
            display_name: data.display_name,
            avatar: data.avatar,
            cover: data.cover,
            gender:data.gender,
            birthday:data.birthday,
            location:data.location,
            counts:data.counts,
            status:data.status,
            create_time:data.create_time,
            relation: data.relation,
            status_verify:data.status_verify,
            data_source:data.data_source
        });
        user.save();
    }).catch(err => {
        console.log(err);
    });
   }
   
}

exports.user = (req, res,next) => {
    insert();
    // res.send(userDetails);
    // res.render('home', {
    //     'data': userDetails
    // });
    // res.end();
}

