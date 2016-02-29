/**
 * Created by Aplus on 2016-02-25.
 */

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var getErrorMessage = function(err){
    if(err.errors){
        for(var errName in err.errors){
            if(err.errors[errName].message) return err.errors[errName].message;
        }
    }else{
        return 'Unknown server error';
    }
};

exports.create = function(req, res){ //req.body는 post나 put요청으로 들어온 객체
    var article = new Article(req.body);
    article.creator = req.user;
    article.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(article);
        }
    });
};

exports.list = function(req, res){
    Article.find().sort('-created').populate('creator', 'username').exec(function(err, articles){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(articles);
        }
    });
};

exports.articleById = function(req, res, next, id){
    Article.findById(id).populate('creator', 'username').exec(function(err, article){
        if(err) return next(err);
        if(!article) return next(new Error('Failed to load article' | id));

        req.article = article;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.article);
};

exports.update = function(req, res){
    var article = req.article;

    article.title = req.body.title;
    article.content = req.body.content;

    article.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(article);
        }
    });
};

exports.delete = function(req, res){
    var article = req.article;

    article.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(article);
        }
    });
};

exports.hasAuthorization = function(req, res, next){ //글 작성자가 수정이나 지우려고 할 때 너가 권한 갖고있니? 이거
    if(req.article.creator.id !== req.user.id){ //글 작성자와 현재 유저가 같은지 확인
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};