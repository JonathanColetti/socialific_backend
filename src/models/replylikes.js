import {Sequelize} from 'sequelize'; export default function(sequelize, DataTypes) {
  return sequelize.define('replylikes', {
    profileid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profiles',
        key: 'id'
      }
    },
    rplyid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'replies',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'replylikes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "profileid" },
          { name: "rplyid" },
        ]
      },
      {
        name: "rplyid",
        using: "BTREE",
        fields: [
          { name: "rplyid" },
        ]
      },
    ]
  });
};
