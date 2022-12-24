import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('reports', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    severity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    info: {
      type: DataTypes.STRING(300),
      allowNull: true
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
    tableName: 'reports',
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
