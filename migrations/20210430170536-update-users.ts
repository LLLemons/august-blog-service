'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.changeColumn('users', 'avatar', {
      type: new TEXT('long'),
      allowNull: false
    })
    await queryInterface.changeColumn('users', 'password', {
      type: new TEXT('long'),
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
