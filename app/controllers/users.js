var models = require('../models/index');

exports.read = function(req, res) {
    if(req.params.userId) {
        models.User.findById(req.params.userId).then(user => {
            res.json(user);
        });
    } else {
        models.User.findAll().then(users => {
            res.json(users);
        });
    }
};

exports.create = function(req, res) {
    res.json('NOT IMPLEMENTED: User create');
};

exports.update = function(req, res) {
    res.json('NOT IMPLEMENTED: User update');
};

exports.delete = function(req, res) {
    res.json('NOT IMPLEMENTED: User delete');
};
