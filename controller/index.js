const Users = require('../model/user-model')
const SmoothieSchema = require('../model/smoothie-model')
const mongoose = require("mongoose");
const {smoothieSchema, userSchema} = require('../library/validationSchemas')

let UserController = function() {

}

UserController.prototype.getAllUsers = async function(req, res, next) {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

UserController.prototype.addUser = async function(req, res, next) {
    const user = new Users({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const newuser = await user.save()
        res.status(201).json(newuser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

let SmoothieController = function(endpoint) {
    this.endpoint = endpoint
}

SmoothieController.prototype.getAllSmoothies = async function(req, res, next) {
    const SmoothieType = mongoose.model(this.endpoint, SmoothieSchema, this.endpoint);
    try {
        const smoothie = await SmoothieType.find()
        res.json(smoothie)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

SmoothieController.prototype.getSingleSmoothie = async function(req, res, next) {
    try {
        const SmoothieType = mongoose.model(this.endpoint, SmoothieSchema, this.endpoint);
        const smoothie = await SmoothieType.find({_id: req.params.id})
        res.json(smoothie)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

SmoothieController.prototype.createSmoothie = async function(req, res, next) {

    if (!req.body.name || !req.body.image || !req.body.price || !req.body.calories || !req.body.ingredients || !req.body.quantity || !req.body.category) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const smoothieEntries = await smoothieSchema.validateAsync(req.body)

    if (smoothieEntries.error) {
      res.status(400).send({ message: smoothieEntries.error });
      return;
    }


    const SmoothieType = mongoose.model(this.endpoint, SmoothieSchema, this.endpoint);
    const smoothie = new SmoothieType({
        name: req.body.name,
        image: req.body.image,
        alt: req.body.alt,
        price: req.body.price,
        calories: req.body.calories,
        ingredients: req.body.ingredients,
        quantity: req.body.quantity,
        category: req.body.category,
    })



    try {
        const newsmoothie = await smoothie.save()
        res.status(201).json(newsmoothie)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

SmoothieController.prototype.updateSmoothie = async function(req, res, next) {

    if (!req.body.name || !req.body.image || !req.body.price || !req.body.calories || !req.body.ingredients || !req.body.quantity || !req.body.category) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const smoothieEntries = await smoothieSchema.validateAsync(req.body)

    if (smoothieEntries.error) {
      res.status(400).send({ message: smoothieEntries.error });
      return;
    }

    const SmoothieType = mongoose.model(this.endpoint, SmoothieSchema, this.endpoint);
    const smoothie = {
        name: req.body.name,
        image: req.body.image,
        alt: req.body.alt,
        price: req.body.price,
        calories: req.body.calories,
        ingredients: req.body.ingredients,
        quantity: req.body.quantity,
        category: req.body.category,
    }

    try {
        // const newsmoothie = await smoothie.save()
        const newsmoothie = await SmoothieType.updateOne({_id: req.params.id}, smoothie)
        res.status(201).json(newsmoothie)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


SmoothieController.prototype.deleteSmoothie = async function(req, res, next) {
    const SmoothieType = mongoose.model(this.endpoint, SmoothieSchema, this.endpoint);

    try {
        // const newsmoothie = await smoothie.save()
        const deletedsmoothie = await SmoothieType.findOneAndDelete({_id: req.params.id})
        res.status(200).json(deletedsmoothie)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    UserController, 
    SmoothieController
}