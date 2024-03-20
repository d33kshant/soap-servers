import express from 'express'
import soap from 'soap'
import fs from 'fs'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import jstoxml from "jstoxml"

open({
  filename: 'users.db',
  driver: sqlite3.Database,
}).then(async function(database) {
  await database.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);")
  const Service = {
    Service: {
      Port: {
        GetUsers: async function() {
          const result = await database.all(
            "SELECT * FROM users;"
          )
          return { result: jstoxml.toXML({ result: result.map(item => ({ user: item })) }, { indent: '  ' }) }
        },
        CreateUser: async function(args) {
          console.log("CREATE USER", args)
          const insert = await database.run(
            "INSERT INTO users (name, age) VALUES (?, ?);",
            args.name, +args.age,
          )

          if (!insert.lastID) {
            return { result: "Failed to create user"}
          }
          
          const result = await database.get(
            "SELECT * FROM users WHERE id=?;",
            insert.lastID,
          )
          return { result: jstoxml.toXML({ result }, { indent: '  ' }) }
        }
      }
    }
  };

  var xml = fs.readFileSync('service.wsdl', 'utf8');

  var app = express();

  app.listen(8001, function() {
    soap.listen(app, '/user', Service, xml, function() {
      console.log('SOAP service started at http://localhost:8001/user?wsdl');
    });
  });
})
.catch(function() {
  console.log("Failed to connect to database")
})
