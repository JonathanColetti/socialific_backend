#!/bin/bash
# typescriptify the models that sequelize cli generates 

CMD=$(cd /Users/famcoletti/Documents/projects/socialific_backend/src/models && ls -p | grep -v /)
for file in $CMD
 do # for now
    if [ $file != "init-models.js" ];
    then
        path=/Users/famcoletti/Documents/projects/socialific_backend/src/models/$file
        sed -i "" "s/const Sequelize = require('sequelize');/import {Sequelize, DataTypes} from 'sequelize';/g" $path
        sed -i "" "s/module.exports = /export default /g" $path
        sed -i "" 's/sequelize, DataTypes/sequelize:any, DataTypes: any/g' $path
        sed -i "" 's/Sequelize.Sequelize/Sequelize/g' $path
        
        mv "/Users/famcoletti/Documents/projects/socialific_backend/src/models/$file" "/Users/famcoletti/Documents/projects/socialific_backend/src/models/${file/.js/.ts}"
    fi
 done  