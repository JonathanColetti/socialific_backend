import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('sounds', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    soundlnk: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    auid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userauth',
        key: 'id'
      }
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
    tableName: 'sounds',
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
    ]
  });
};
