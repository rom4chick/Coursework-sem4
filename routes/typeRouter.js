const express = require('express');
const typeRouter = express.Router();
const cors = require('cors');
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware');

typeRouter.use(express.json());
typeRouter.use(cors());               
typeRouter.use(express.urlencoded({extended: true}));

typeRouter.get('/', typeController.getAll);

typeRouter.post('/', typeController.create);

module.exports = typeRouter;