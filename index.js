import express from 'express'
import soap from 'soap'
import fs from 'fs'

const Service = {
  Service: {
    Port: {
      GetCapital: function(args, callback) {
        const country = args.country

        const API_URL = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?wsdl"

        soap.createClient(API_URL, function(error, client) {
          if (error) {
            callback({ capital: "Failed to fetch" })
            return
          }

          client.CapitalCity({ sCountryISOCode: country }, function(_, response) {
            if (_) {
              callback({ capital: "Failed to get capital" })
              return
            }
            callback({ capital: response.CapitalCityResult })
          })
        })
      }
    }
  }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');

var app = express();

app.listen(8001, function() {
  soap.listen(app, '/capital', Service, xml, function() {
    console.log('SOAP service started at http://localhost:8001/capital?wsdl');
  });
});
