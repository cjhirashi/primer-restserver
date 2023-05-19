//===============================================================================================================
//TITLE: VARIABLES ROUTES
//DESCRIPTION: RUTAS PARA GESTION DE REGISTROS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');
const { variablesGet, createVariable, variableNota } = require('../controllers/variables.controller');
const { validateJWT } = require('../middlewares');

//LIBRERIAS LOCALES


//_______________________________________________________________________________________________________________
//SERVIDOR DE RUTAS
const router = Router();

//Ruto de consulta de Usuarios
//BUSCAR TODOS LOS REGISTROS
router.get('/', variablesGet);

//CREAR REGISTRO
router.post('/', [
    validateJWT
], createVariable);

//ELIMINAR REGISTRO POR ID
router.delete('/delete/:id', (req, res) => {
    res.json({response: 'eliminar registro por id'})
});

//AGREGAR NOTA POR ID
router.put('/nota/:id', variableNota);

//BUSCAR REGISTRO POR ID
router.get('/:id', (req, res) => {
    res.json({response: 'buscar registro por id'})
});

//ACTUALIZAR REGISTROS POR ID
router.put('/:id', (req, res) => {
    res.json({response: 'actualizar registro por id'})
});

//DESACTIVAR REGISTRO POR ID
router.delete('/:id',(req, res) => {
    res.json({response: 'desactivar registro por id'})
});


module.exports = router;