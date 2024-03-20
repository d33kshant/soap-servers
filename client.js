import soap from 'soap'

const URL = 'http://localhost:8001/user?wsdl';

const command = process.argv[2]
if (!command) {
  console.log("Missing required arguments")
  process.exit(1)
}

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    if (command === "create") {
      const name = process.argv[3]
      const age = +process.argv[4]

      client.CreateUser({ name, age }, function(_, { result }) {
        console.log(result)
      });
    } else if (command === "get") {
      client.GetUsers(null, function(_, { result }) {
        console.log(result)
      })
    }
  }
});
