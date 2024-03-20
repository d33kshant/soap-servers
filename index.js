import express from 'express'
import soap from 'soap'
import fs from 'fs'

const Service = {
  Service: {
    Port: {
      GetPerson: function(args) {
        return { person: args.person }
      }
    }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();

app.listen(8001, function() {
  soap.listen(app, '/person', Service, xml, function() {
    console.log('SOAP service started at http://localhost:8001/person?wsdl');
  });
});
