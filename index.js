import express from 'express'
import soap from 'soap'
import fs from 'fs'

const Service = {
  Service: {
    Port: {
      AddNumbers: function(args) {
        const answer = (+args.one) + (+args.other)
        return { answer }
      }
    }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();

app.listen(8001, function() {
  soap.listen(app, '/add', Service, xml, function() {
    console.log('SOAP service started at http://localhost:8001/add?wsdl');
  });
});
