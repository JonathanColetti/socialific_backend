import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('history', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    auid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userauth',
        key: 'id'
      }
    },
    vid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1600
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    time_updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'history',
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
        name: "auid",
        using: "BTREE",
        fields: [
          { name: "auid" },
        ]
      },
      {
        name: "vid",
        using: "BTREE",
        fields: [
          { name: "vid" },
        ]
      },
    ]
  });
};
