const fs = require('fs');
const path = require('path');
const dir = {
  config: path.join(__dirname, '../save/config.json'),
  data: path.join(__dirname, '../save/data.json')
}


// config
class Config {
  constructor(password) {
    this.masterPassword =  password;
    this.notes = {
      index: 0
    };
  }
}

let config = new Config('Alsarakbi');


// data

let data = {};
class Note {
  constructor(index, title, body) {
    this.index = index;
    this.title = title;
    this.body = body;
  }
}



// object functions
function pack(d, object) {
  fs.writeFileSync(d, JSON.stringify(object));
}

function unpack(d) {
  return JSON.parse(fs.readFileSync(d));
}
