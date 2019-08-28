"use strict";

const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();

const myArgs = process.argv.slice(2);

if (myArgs.length !==1) {
    console.log('You have to pass just one parameter, like fileName for upload');
    process.exit(-1);
}

const fileName = myArgs[0];


if (!fs.existsSync(fileName)) {
    console.log('Not Found file');
    process.exit(-1);
}

form.append('file', fs.createReadStream(fileName))

axios.post('https://file.io', form, {headers: form.getHeaders()})
    .then(res=>console.log(res.data.link))
    .catch(e=>console.log(e));


