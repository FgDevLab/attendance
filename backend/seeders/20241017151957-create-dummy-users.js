'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedEmployeePassword = await bcrypt.hash('@employee2024', 10);
    const hashedAdminPassword = await bcrypt.hash('@admin2024', 10);

    return queryInterface.bulkInsert('users', [
      {
        name: 'Employee User',
        email: 'employee@example.com',
        password: hashedEmployeePassword,
        role: 'employee',
        bio: 'I am an employee in the company.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
        bio: 'I am the administrator of the company.', 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', {
      email: ['employee@example.com', 'admin@example.com']
    });
  }
};
