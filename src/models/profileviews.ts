import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('profileviews', {
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
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'profileviews',
    timestamps: false,
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
