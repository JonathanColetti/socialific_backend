import {Sequelize} from 'sequelize'; export default function(sequelize, DataTypes) {
  return sequelize.define('profilelikes', {
    userauthid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'userauth',
        key: 'id'
      }
    },
    profileid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profiles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'profilelikes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userauthid" },
          { name: "profileid" },
        ]
      },
      {
        name: "profileid",
        using: "BTREE",
        fields: [
          { name: "profileid" },
        ]
      },
    ]
  });
};
