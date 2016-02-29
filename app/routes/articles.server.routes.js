/**
 * Created by Aplus on 2016-02-26.
 */

var users = require('../controllers/user.server.controller'),
    articles = require('../controllers/articles.server.controller');

module.exports = function(app){
    app.route('/api/articles')
        .get(articles.list)
        .post(users.requiresLogin, articles.create);

    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    app.param('articleId', articles.articleById);
};