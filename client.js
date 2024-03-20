import soap from 'soap'

const URL = 'http://localhost:8001/words?wsdl';

const text = process.argv[2]
if (!text) {
  console.log("Missing required arguments")
  process.exit(1)
}

soap.createClient(URL, function(err, client) {
  if (err != null) {
    console.log("client create error: ", err);
  }

  if (client != null) {
    client.GetWords({ text }, function(_, result) {
      const words = JSON.parse(result.words)
      console.log({ words });
    });
  }
});
