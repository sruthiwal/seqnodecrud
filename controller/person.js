const { Person, Image, Item, Sequelize } = require('../models')
const t = require('../helpers/transaction');
const create = async (req, res, next) => {
    try {
        const { data } = req.body;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const createPerson = await Person.bulkCreate(data, { transaction: transaction.data });
        if (!createPerson) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(400).send({
                status: 'error',
                message: 'Person failed created'
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }

        res.status(201).send({
            status: 'success',
            data: createPerson
        });
    } catch (error) {
        next(error);
    }
}

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findPersonById = await Person.findByPk(id, {
            include: [
                {
                    model: Image,
                },
                {
                    model: Item,
                }

            ],
        });
        if (!findPersonById) {
            res.status(404).send({
                status: 'error',
                message: `Person with id ${id} not found`
            });
        }
        res.status(200).send({
            status: 'success',
            data: findPersonById
        });

    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const { name, age, gender, address } = req.body;
        const findPersonById = await Person.findOne({
            where: {
                id
            },
            transaction: transaction.data
        });
        if (!findPersonById) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(404).send({
                status: 'error',
                message: `Person with id ${id} not found`
            });
        }
        if (name) findPersonById.name = name;
        if (age) findPersonById.age = age;
        if (gender) findPersonById.gender = gender;
        if (address) findPersonById.address = address;
        const updatePerson = await findPersonById.save({ transaction: transaction.data });
        if (!updatePerson) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(400).send({
                status: 'error',
                message: `data person with id ${id} failed update`
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }
        res.status(200).send({
            status: 'success',
            data: updatePerson
        });

    } catch (error) {
        next(error);
    }
}
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const findPersonById = await Person.findByPk(id, { transaction: transaction.data });
        if (!findPersonById) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(404).send({
                status: 'error',
                message: `person with id ${id} not found`
            })
        }
        const deletePerson = await findPersonById.destroy({ transaction: transaction.data });
        if (!deletePerson) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(503).send({
                status: 'error',
                message: `person with id ${id} failed delete`
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }
        res.status(200).send({
            status: 'success',
            message: `person with id ${id} deleted`
        });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    create,
    findById,
    update,
    destroy,
}