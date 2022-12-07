import { Sequelize as _Sequelize } from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('commentlikes', {
    profileid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profiles',
        key: 'id'
      }
    },
    cmtid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comments',
        key: 'id'
      }
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: _Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'commentlikes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "profileid" },
          { name: "cmtid" },
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