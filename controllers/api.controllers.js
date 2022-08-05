const endpointsJSON = require('../endpoints.json')

exports.getJSON = (req, res, next) => {
    res.status(200).send({endpointsJSON})
};