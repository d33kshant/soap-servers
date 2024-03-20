import soap from 'soap'

const URL = 'http://localhost:8001/calc?wsdl';

if (process.argv.length < 5) {
  console.log("Missing required arguments")
  process.exit(1)
}

const op = process.argv[2]
const one = +process.argv[3]
const other = +process.argv[4]

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    client.Calculate({ op, one, other }, function(_, result) {
      console.log(result);
    });
  }
});
