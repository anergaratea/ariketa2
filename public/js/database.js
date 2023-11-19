// database.js
const fs = require('fs');
const path = require('path');

const databasePath = "./public/database/database.json"

function readDatabase() {
  const data = fs.readFileSync(databasePath, 'utf-8');
  return JSON.parse(data);
}

const users = readDatabase();

module.exports = users;
