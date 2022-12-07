import {Sequelize} from 'sequelize'; 
export default function(sequelize, DataTypes) {
    return sequelize.define('soundratings', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'userauth',
                key: 'id'
            }
        },
        score: {
            type: DataTypes.INTEGER,
            default: 1600,
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
    })
};
    