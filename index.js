import express from 'express'
import soap from 'soap'
import fs from 'fs'

const Service = {
  Service: {
    Port: {
      GetWords: function(args) {
        const words = args.text.split(/\s+/)
        return { words: JSON.stringify(words) }
      }
    }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();

app.listen(8001, function() {
  soap.listen(app, '/words', Service, xml, function() {
    console.log('SOAP service started at http://localhost:8001/words?wsdl');
  });
});
