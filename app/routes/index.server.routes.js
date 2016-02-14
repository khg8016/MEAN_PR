/**
 * Created by Aplus on 2016-02-14.
 */

module.exports = function (app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.renderIndex);
    app.post('/insert', index.renderInsert );
}