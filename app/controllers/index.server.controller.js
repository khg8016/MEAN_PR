/**
 * Created by Aplus on 2016-02-14.
 */
'use strict';

//view를 뿌려주는 controller
exports.renderIndex = function(req, res){
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    res.render('index', { title: 'Express' , user: JSON.stringify(req.user) || 'undefined'});
};

exports.renderInsert = function(req, res){
    res.render('insert');
};