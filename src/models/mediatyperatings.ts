import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('mediatyperatings', {
    id: {
      autoIncrement: true,
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
    auid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userauth',
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
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    time_updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'mediatyperatings',
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
        name: "ctid",
        using: "BTREE",
        fields: [
          { name: "ctid" },
        ]
      },
      {
        name: "auid",
        using: "BTREE",
        fields: [
          { name: "auid" },
        ]
      },
    ]
  });
};
