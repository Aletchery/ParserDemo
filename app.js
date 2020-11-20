const express = require('express');
const bodyParser = require('body-parser');
const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4200;

app.get('/',(req,res) => {
res.send('Parser app');

const myParser = new JsonLdParser();

fs.createReadStream('page.json')
  .pipe(myParser)
  .on('data', console.log)
  .on('error', console.error)
  .on('end', () => console.log('All triples were parsed!'));
})

app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`);
})