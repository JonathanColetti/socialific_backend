import {Sequelize} from 'sequelize';
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
    'TMP',
    'TMP',  
    {
        host: 'database-1.cemuo1fwz6go.us-east-1.rds.amazonaws.com',
        port: 3306,
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
