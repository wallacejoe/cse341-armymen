const mongodb = require("../database/mongoData")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Personnel']
    const result = await mongodb.getDb().db("cse341-armymen").collection("personnel").find()
    result.toArray().then((personnel) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(personnel)
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Personnel']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid id to find a specific personnel.")
    }
    const personnelId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db("cse341-armymen").collection("personnel").find({_id: personnelId})
    result.toArray().then((personnel) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(personnel)
    })
}

const addPersonnel = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        rank: req.body.rank,
        company: req.body.company,
        dateOfDeployment: req.body.dateOfDeployment
    }
    const response = await mongodb.getDb().db('cse341-armymen').collection('personnel').insertOne(user)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
}

const updatePersonnel = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.')
    }
    const personnelId = new ObjectId(req.params.id)
    const personnel = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        rank: req.body.rank,
        company: req.body.company,
        dateOfDeployment: req.body.dateOfDeployment
    }
    const response = await mongodb.getDb().db('cse341-armymen').collection('personnel').replaceOne({_id: personnelId}, personnel)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
}

const deletePersonnel = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.')
    }
    const personnelId = new ObjectId(req.params.id)
    const response = await mongodb.getDb().db('cse341-armymen').collection('personnel').deleteOne({_id: personnelId})
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
}

module.exports = {getAll, getSingle, addPersonnel, updatePersonnel, deletePersonnel}