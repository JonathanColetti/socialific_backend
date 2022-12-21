import {Sequelize} from 'sequelize'; export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ctid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mediatype',
        key: 'id'
      }
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    },
    caption: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    medialnk: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    plocation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pinned: {
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
    tableName: 'posts',
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
        name: "ctid",
        using: "BTREE",
        fields: [
          { name: "ctid" },
        ]
      },
      {
        name: "pid",
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
    ]
  });
};
