import {Sequelize} from 'sequelize'; export default function(sequelize, DataTypes) {
  return sequelize.define('userratings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uauth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userauth',
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1600
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
    tableName: 'userratings',
    timestamps: true,
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
        name: "pid",
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
      {
        name: "uauth",
        using: "BTREE",
        fields: [
          { name: "uauth" },
        ]
      },
    ]
  });
};
