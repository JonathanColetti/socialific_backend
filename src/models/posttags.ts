import {Sequelize} from 'sequelize'; export default function(sequelize:any, DataTypes: any) {
  return sequelize.define('posttags', {
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    tagid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'posttags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "postid" },
          { name: "tagid" },
        ]
      },
      {
        name: "tagid",
        using: "BTREE",
        fields: [
          { name: "tagid" },
        ]
      },
    ]
  });
};
