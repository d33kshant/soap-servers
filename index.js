import express from 'express'
import soap from 'soap'
import fs from 'fs'

const Service = {
  Service: {
    Port: {
      Calculate: function(args) {
        const op = args.op
        const one = +args.one
        const other = +args.other

        switch(op) {
          case "+": {
            return { answer: one + other }
          }
          case "-": {
            return { answer: one - other }
          }
          case "*": {
            return { answer: one * other }
          }
          case "/": {
            if (other === 0) {
              return { answer: 0 }
            }
            return { answer: one / other }
          }
          default: {
            return { answer: 0 }
          }
        }
      }
    }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();

app.listen(8001, function() {
  soap.listen(app, '/calc', Service, xml, function() {
    console.log('SOAP service started at http://localhost:8001/calc?wsdl');
  });
});
