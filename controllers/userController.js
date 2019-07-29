const axios = require('axios');
var userModel = require('../models/userModel');


exports.userAll = (req,res,next) => {
    // let find = userModel.find({'status' : 1}).limit( 10 ).exec();
    // res.send(find); 
    let page = req.query.page ? parseInt(req.query.page) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    console.log(page);
    console.log(limit);

    userModel.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        let counts = userModel.count();
        console.log(counts);
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            total : counts,
            data: contacts
        });
    },page,limit);
}
