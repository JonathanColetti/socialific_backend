import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
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
    ctid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    auid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userauth',
        key: 'id'
      }
    },
    propic: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    bg: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    whosees: {
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
    cmntstickers: {
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
