# typescriptify the models that sequelize cli generates 

CMD=$(cd /Users/famcoletti/Documents/projects/socialific_backend/src/models && ls -p | grep -v /)
for file in $CMD
 do
    if [ $file != "init-models.js" ];
    then
        sed -i "" 's/sequelize, DataTypes/sequelize:any, DataTypes: any/g' /Users/famcoletti/Documents/projects/socialific_backend/src/models/$file
        mv "/Users/famcoletti/Documents/projects/socialific_backend/src/models/$file" "/Users/famcoletti/Documents/projects/socialific_backend/src/models/${file/.js/.ts}"
    fi
 done  