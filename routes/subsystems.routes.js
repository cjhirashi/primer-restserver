//===============================================================================================================
//TITLE: SUBSYSTEMS ROUTES
//DESCRIPTION: RUTAS PARA GESTION DE REGISTROS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');

//LIBRERIAS LOCALES


//_______________________________________________________________________________________________________________
//SERVIDOR DE RUTAS
const router = Router();

//Ruto de consulta de Usuarios
//BUSCAR TODOS LOS REGISTROS
router.get('/', (req, res) => {
    res.json({response: 'buscar todos los registros'})
});

//CREAR REGISTRO
router.post('/', (req, res) => {
    res.json({response: 'crear registro'})
});

//ELIMINAR REGISTRO POR ID
router.delete('/delete/:id', (req, res) => {
    res.json({response: 'eliminar registro por id'})
});

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