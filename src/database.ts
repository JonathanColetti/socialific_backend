import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

import posts from './models/posts.js';
import Profiles from './models/profiles.js';
import userauth from './models/userauth.js';
import mediatype from './models/mediatype.js';
import tagratings from './models/tagratings.js';
import userratings from './models/userratings.js';
import soundratings from './models/soundratings.js';
import mediatyperatings from './models/mediatyperatings.js';
import comments from './models/comments.js';
import reports from './models/reports.js';


dotenv.config()

var db: any = {

} 

let models: Array<Function> = [
    Profiles,
    userauth,
    posts,
    comments,
    tagratings,
    userratings,
    soundratings,
    mediatyperatings,
    reports
]
export const sequelize = new Sequelize(
    process.env.DB!,
    process.env.DBUSER!,
    process.env.DBPASS!,  
    {
        host: process.env.DBURL!,
        port: 3306,
        dialect: 'mysql',
        define: {
            timestamps: false, // timestamps are handled by us
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
