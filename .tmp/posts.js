const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ctid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mediatype',
        key: 'id'
      }
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    },
    soundid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sounds',
        key: 'id'
      }
    },
    caption: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    medialnk: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    plocation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pinned: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    time_updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "soundid",
        using: "BTREE",
        fields: [
          { name: "soundid" },
        ]
      },
      {
        name: "ctid",
        using: "BTREE",
        fields: [
          { name: "ctid" },
        ]
      },
      {
        name: "pid",
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
    ]
  });
};