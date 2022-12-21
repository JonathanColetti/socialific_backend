import {Sequelize} from 'sequelize'; export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('history', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    },
    vid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    clicked: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    rewatched: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'history',
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
        name: "pid",
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
      {
        name: "vid",
        using: "BTREE",
        fields: [
          { name: "vid" },
        ]
      },
    ]
  });
};
