var rp = require('request-promise');
let queryString = require('query-string');
const axios = require('axios');

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/test';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


var userModel = require('./models/userModel');

let base = "https://api.gapo.vn/";
let path = "main/v1.0/user/view?";

async function insert(options) {
    response = await rp(options);
    return response;

}
function getUser(i,url) {
      const response = axios.get(url);
      return response;
  }
(async function parseData() {
    var start = 23375;
    var end = start + 1000;
    var total = 100000;
    for (i = start; i <= end; i++) {
        query = {
            id: i,
        };
         url  = base + path + queryString.stringify(query);
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
        console.log("i : " + i);
        await getUser(i,url).then(response => {
          
            data = response.data;
            console.log("id:" + data.id);
           
            params = {
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
            };

            userModel.findOneAndUpdate({
                id_user: data.id
            }, params, {
                upsert: true,
                new: true,
                overwrite: true
                }, function (err, model) {
                if(err){
                    console.log(err);
                }
                console.log(model);
                // process.exit(0);
            });

            // user = userModel();
            // user.save();
        }).catch(err => {
            // console.log(err);
        });

        if(i == end){
            start+= 1000;
            end = start + 1000;
        }
        if(end == total){
            console.log(end);
            console.log(total);
            console.log("END GAME");
            process.exit(0);
        }
    }
    console.log("END GAME");
})();