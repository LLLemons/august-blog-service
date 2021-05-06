'use strict';

import { Application } from "egg";

module.exports = (app: Application) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: {
      type: new TEXT('long'),
      allowNull: false,
    },
    avatar: {
      type: new TEXT('long'),
      allowNull: false
    },
    password: {
      type: new TEXT('long'),
      allowNull: false
    },
    created_at: {
      type: DATE,
      field: 'createdTime'
    },
    updated_at: {
      type: DATE,
      field: 'updatedTime'
    }
  });

  (User as any).associate = function(): void {
    app.model.User.hasMany(app.model.Repository, { foreignKey: 'userId' });
  };

  return User;
};