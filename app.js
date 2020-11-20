const express = require('express');
const bodyParser = require('body-parser');
const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;

const app = express();
const port = process.env.PORT || 4200;

app.get('/',(req,res) => {
res.send('Parser app');

const myParser = new JsonLdParser();

myParser
  .on('data', console.log)
  .on('error', console.error)
  .on('end', () => console.log('All triples were parsed!'));

myParser.write('{');
myParser.write(`"@context": "https://schema.org/",`);
myParser.write(`"@type": "Recipe",`);
myParser.write(`"name": "Grandma's Holiday Apple Pie",`);
myParser.write(`"aggregateRating": {`);
myParser.write(`"@type": "AggregateRating",`);
myParser.write(`"ratingValue": "4"`);
myParser.write(`}}`);
myParser.end();
})

app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`);
})