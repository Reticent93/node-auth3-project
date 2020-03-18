const bycrypt = require('bcryptjs')
const db = require('../data/config')

async function add(user) {
    user.password = await bycrypt.hash(user.password, 13)
    const [id] = await db('users').insert(users)
    return findBy(id)
}

function find() {
    return db('users').select('id', 'username')
}

function findBy(filter) {
    return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}

function findById(id) {
    return db('users')
    .select('id', 'username')
    .where({id})
    .first()
}

module.exports = {
    add,
    find,
    findBy,
    findById
}