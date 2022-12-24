import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('replies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cmtid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comments',
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
    comment: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    commentlnk: {
      type: DataTypes.STRING(100),
      allowNull: true
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
    tableName: 'replies',
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
        name: "cmtid",
        using: "BTREE",
        fields: [
          { name: "cmtid" },
        ]
      },
    ]
  });
};
