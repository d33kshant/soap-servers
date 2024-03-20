import soap from 'soap'

const URL = 'http://localhost:8001/capital?wsdl';

const country = process.argv[2] || "IN"

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    client.GetCapital({ country }, function(_, result) {
      console.log(result);
    });
  }
});
