const mongodb = require("../database/mongoData")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Company']
    const result = await mongodb.getDb().db("cse341-armymen").collection("company").find()
    result.toArray().then((company, err) => {
        if (err) {
            res.status(400).json({message: err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(company)
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Company']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid id to find a specific company.")
    }
    const companyId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db("cse341-armymen").collection("company").find({_id: companyId})
    result.toArray().then((company, err) => {
        if (err) {
            res.status(400).json({message: err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(company)
    })
}

const addCompany = async (req, res) => {
    //#swagger.tags=['Company']
    const company = {
        companyName: req.body.companyName,
        deployment: req.body.deployment,
        location: req.body.location
    }
    const response = await mongodb.getDb().db('cse341-armymen').collection('company').insertOne(company)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the company.')
    }
}

const updateCompany = async (req, res) => {
    //#swagger.tags=['Company']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid company id to find a company.')
    }
    const companyId = new ObjectId(req.params.id)
    const company = {
        companyName: req.body.companyName,
        deployment: req.body.deployment,
        location: req.body.location
    }
    const response = await mongodb.getDb().db('cse341-armymen').collection('company').replaceOne({_id: companyId}, company)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the company.')
    }
}

const deleteCompany = async (req, res) => {
    //#swagger.tags=['Company']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid company id to find a company.')
    }
    const companyId = new ObjectId(req.params.id)
    const response = await mongodb.getDb().db('cse341-armymen').collection('company').deleteOne({_id: companyId})
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the company.')
    }
}

module.exports = {getAll, getSingle, addCompany, updateCompany, deleteCompany}