const sequelize = require('../db'); 

const User = require('./user');
const Attendance = require('./attendance');

const models = {
    User,
    Attendance,
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});


module.exports = {
    ...models,
    sequelize,
};
