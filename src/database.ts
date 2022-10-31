import {Sequelize} from 'sequelize';
import {resolve} from 'path';
import Profiles from './models/profiles.js';
import userauth from './models/userauth.js';
import posts from './models/posts.js';
import dotenv from 'dotenv';

dotenv.config()

var db: any = {

} 

let models: Array<Function> = [
    Profiles,
    userauth,
    posts,
]
export const sequelize = new Sequelize(
    'highlightit',
    process.env.DBUSER!,
    process.env.DBPASS,
    {
        host: process.env.DBIP,
        port: parseInt(process.env.DBPORT!),
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
)

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db;
