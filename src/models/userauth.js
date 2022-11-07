import {Sequelize} from 'sequelize'; 
export default function(sequelize, DataTypes) {
  return sequelize.define('userauth', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "userid"
    },
    phonenum: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    userpass: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    ipaddr: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    lastlgn: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false, 
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    time_updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'userauth',
    timestamps: true,
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
        name: "userid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};