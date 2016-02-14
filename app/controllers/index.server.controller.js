/**
 * Created by Aplus on 2016-02-14.
 */

exports.renderIndex = function(req, res){
    res.render('index', { title: 'Express' , name:'KHG'});
}

exports.renderInsert = function(req, res){
    res.render('insert');
}