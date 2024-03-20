import soap from 'soap'

const URL = 'http://localhost:8001/person?wsdl';

if (process.argv.length < 5) {
  console.log("Missing required arguments")
  process.exit(1)
}

const name = process.argv[2]
const age = +process.argv[3]
const address = process.argv[4]

const person = { name, age, address }

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    client.GetPerson({ person }, function(_, result) {
      console.log(result);
    });
  }
});
