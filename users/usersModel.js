const db = require('../data/config')
const bcrypt = require('bcryptjs')

module.exports = {
    find,
    findBy,
    findById,
    findByDept,
    add
}

function find() {
    return db('user_directory')
        .select('id', 'username')
};

function findBy(filter) {
    return db('user_directory')
        .select('id', 'username', 'password')
        .where(filter)
};

function findById(id) {
    return db('user_directory')
        .select('id', 'username')
        .where({ id })
        .first()
}

function findByDept(department) {
    return db('user_directory')
        .select('id', 'username', 'department')
        .where({ department })
        .first()
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db('user_directory').insert(user)
    return findById(id)        
}