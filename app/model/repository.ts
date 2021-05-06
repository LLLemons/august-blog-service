'use strict';

import { Application } from "egg";

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Repository = app.model.define('repository', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: TEXT(),
      allowNull: false
    },
    description: {
      type: TEXT(),
      allowNull: false
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'userId',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    created_at: {
      type: DATE,
      field: 'createdTime'
    },
    updated_at: {
      type: DATE,
      field: 'updatedTime'
    }
  }, {
    tableName: 'repository'
  });

  (Repository as any).associate = function(): void {
    app.model.Repository.belongsTo(app.model.User, { foreignKey: 'userId', targetKey: 'id' });
  };

  return Repository;
};