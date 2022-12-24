import {Sequelize, DataTypes} from 'sequelize';
export default function(sequelize:any, DataTypes: any) {
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
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'replylikes',
    timestamps: false,
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
