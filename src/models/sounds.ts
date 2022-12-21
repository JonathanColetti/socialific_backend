import {Sequelize} from 'sequelize'; export default function(sequelize:any, DataTypes: any) {
return sequelize.define('sounds', {
        id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
        soundlnk: {
            type: DataTypes.STRING(300),
            allowNull: false,
            unique: "soundlnk"
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
        tableName: 'sounds',
        timestamps: false,
    })
};
