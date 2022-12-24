#!/bin/bash
# a script to generate and insert data into mysql db
# this script only works when certain if statements are commented out (DEBUG MODE)

function insertuid {
    birthday=$1
    email=$2
    gender=$3
    password=$4
    phonenum=$5
}

function insertprofile {
    uid=$1
    username=$2
    curl --request POST \
    --header "content-type: application/json" \
    --url http://localhost:5100/ \
    --data "{\"query\":\"mutation Mutation(\$input: ProfileInput) {\n  cprofile(input: \$input) {\n    state\n    \n    \n  }\n}\",\"variables\":{\"input\":{\"uid\":\"$uid\",\"username\":\"$username\",\"propic\":\"\",\"bio\":\"\"}}}"
}


insertprofile "test" "test2"
