const db = require('../data/config')
const brcypt = require('bcryptjs')

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('user_directory')
        .select('id', 'username')
};

function findBy(filter) {
    return db('user_directory')
        .selelct('id', 'username', 'password')
        .where(filter)
};

function findById(id) {
    return db('user_directory')
        .select('id', 'username')
        .where({ id })
        .first()
}

async function add(user) {
    user.password = await brcypt.hash(user.password, 13)
    const [id] = await db('user_directory').insert(user)
    return findById(id)
        
}