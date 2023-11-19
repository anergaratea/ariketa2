// database.js
const fs = require('fs');
const path = require('path');

const databasePath = "C:/Users/garat/Desktop/4.urtea/WS/ariketa2/ariketa2/public/database/database.json"

function readDatabase() {
  const data = fs.readFileSync(databasePath, 'utf-8');
  return JSON.parse(data);
}

const users = readDatabase();

module.exports = users;
