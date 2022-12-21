import {Sequelize} from 'sequelize'; 

export default function Profiles(sequelize:any, DataTypes: any) {
  return sequelize.define('profiles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "username"
    },
    propic: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    bg: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    pubbg: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    stickers: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    border: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    font: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    rname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sviews: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    slikes: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
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
    tableName: 'profiles',
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
