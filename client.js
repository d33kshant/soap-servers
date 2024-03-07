import soap from 'soap'

const URL = 'http://localhost:8001/hello?wsdl';

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    client.Function({ name: process.argv[2] || 'World' }, function(_, result) {
      console.log(result);
    });
  }
});
