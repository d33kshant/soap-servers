import soap from 'soap'

const URL = 'http://localhost:8001/add?wsdl';

if (process.argv.length < 4) {
  console.log("Missing required arguments")
  process.exit(1)
}

const one = +process.argv[2]
const other = +process.argv[3]

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    client.AddNumbers({ one, other }, function(_, result) {
      console.log(result);
    });
  }
});
