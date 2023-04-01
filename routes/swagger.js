
//separating our swagger-ui-express files from index and contacts router
//This module allows you to serve auto-generated swagger-ui generated API docs from express, 
//based on a swagger.json file. 
//The result is living documentation for your API hosted from your API server via a route.
const router = require('express').Router();
//set up swagger-ui-express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
//Open http://<app_host>:<app_port>/api-docs in your browser to view the documentation.
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;