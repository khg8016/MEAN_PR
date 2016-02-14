/**
 * Created by Aplus on 2016-02-14.
 */

exports.renderIndex = function(req, res){
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    res.render('index', { title: 'Express' , name:'KHG'});
}

exports.renderInsert = function(req, res){
    res.render('insert');
}