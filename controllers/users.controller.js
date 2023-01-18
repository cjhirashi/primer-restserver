const { response, request  } = require('express');

const usersGet = (req = request, res = response) => {

    const params = req.query;
    
    res.json({
        msg: 'get API - Controller'
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    });
}

const usersPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - Controller',
        body

    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
};