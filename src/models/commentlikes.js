import {Sequelize} from 'sequelize'; export default function(sequelize, DataTypes) {
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
