const express= require('express')
const routes= express.Router()
const estudianteesquema=require("./models/estudiante")


// crud mondodb


/**
 * @swagger
 * components:
 *  schemas:
 *      Estudiante:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre del estudiante
 *              carrera:
 *                  type: string
 *                  description: carrera del estudiante
 *              semestre:
 *                  type: integer
 *                  description: semestre del estudiante
 *              cedula:
 *                  type: integer
 *                  description: cedula del estudiante
 *          required:
 *              - nombre
 *              - carrera
 *              - semestre
 *              - cedula
 *          example:
 *              nombre: Sebastian Salamanca
 *              carrera: Ing Sistemas
 *              semestre: 9
 *              cedula: 12334545
 */

/**
 * @swagger
 * /api/estudiantes:
 *  post:
 *      summary: crea un nuevo estudiante
 *      tags: [Estudiante]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Estudiante'
 *      responses:
 *          200:
 *              description: estudiante guardado
 */
routes.post("/estudiantes",(req,res) => {
    const estudiante = estudianteesquema(req.body);
    estudiante
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Obetener estudiante
/**
 * @swagger
 * /api/estudiantes:
 *  get:
 *      summary: retorna todos los estudiantes
 *      tags: [Estudiante]
 *      responses:
 *          200:
 *              description: todos los estudiantes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Estudiante'
 */
routes.get("/estudiantes",(req,res) => {
    estudianteesquema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Obtener un  estudiante
/**
 * @swagger
 * /api/estudiantes/{id}:
 *  get:
 *      summary: retorna un estudiante
 *      tags: [Estudiante]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : id del estudiante
 *      responses:
 *          200:
 *              description: un  estudiante
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Estudiante'
 *          404:
 *              description: no existe el estudiante
 */
routes.get("/estudiantes/:id",(req,res) => {
    const{id}= req.params;
    estudianteesquema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Actualizar un  estudiante
/**
 * @swagger
 * /api/estudiantes/{id}:
 *  put:
 *      summary: actualiza un estudiante
 *      tags: [Estudiante]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : id del estudiante
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Estudiante'
 *      responses:
 *          200:
 *              description: estudiante actualizado
 *          404:
 *              description: no existe el estudiante
 */
routes.put("/estudiantes/:id",(req,res) => {
    const{id}= req.params;
    const{nombre, carrera, semestre, cedula}= req.body;
    estudianteesquema
    .updateOne({_id:id}, {$set:{nombre, carrera, semestre, cedula}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Eliminar un estudiante
/**
 * @swagger
 * /api/estudiantes/{id}:
 *  delete:
 *      summary: borra un estudiante
 *      tags: [Estudiante]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : id del estudiante
 *      responses:
 *          200:
 *              description: estudiante borrado
 *          404:
 *              description: no existe el estudiante
 */
routes.delete("/estudiantes/:id",(req,res) => {
    const{id}= req.params;
    estudianteesquema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});


module.exports=routes