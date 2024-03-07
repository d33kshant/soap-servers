import express from 'express'
import soap from 'soap'
import fs from 'fs'

const Service = {
  Service: {
    Port: {
      Function: function(args) {
        return { message: `Hello, ${args.name}!` }
      }
    }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();

app.listen(8001, function() {
  soap.listen(app, '/hello', Service, xml, function() {
    console.log('SOAP service started at http://localhost:8001/hello?wsdl');
  });
});
