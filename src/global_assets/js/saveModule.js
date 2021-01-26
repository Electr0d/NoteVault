const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dir = {
  config: path.join(__dirname, '../save/config.json'),
  data: path.join(__dirname, '../save/data.json'),
  key: path.join(__dirname, '../save/key.json')
}
class Cooldown {
  constructor() {
    this.cooldown = 0;
    this.cooldowns = 1;
    this.attempts = 0;
  }
}

// config
class Config {
  constructor(password) {
    this.masterPassword =  password;
    this.notes = {
      index: 0
    };
    this.login = new Cooldown()
  }
}
class Key {
  constructor() {    
    this.key = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
  }
}

let config, key, data;
unpackAll();
function unpackAll() {
  let newKey = new Key();
  let oldKey = unpack(dir.key, true)
  key = oldKey ? oldKey : newKey;
  key.key = Buffer.from(key.key);
  key.iv = Buffer.from(key.iv);


  let newConfig = new Config("Alsarakbi");
  let oldConfig = unpack(dir.config);
  config = oldConfig ? oldConfig : newConfig;
    
}

// data

class Note {
  constructor(index, title, body) {
    this.index = index;
    this.title = title;
    this.body = body;
  }
}


function save(action) {
  if(action == 'config') {
    
    // save new key
    pack(dir.config, config);
  } else if(action == 'hide') {
    // remove button
    let button = document.querySelector('.save-button');
    // if button isn't null
    if(button) {
      button.style = 'transform: translateX(-100%); opacity: 0';
      setTimeout(() => {
        el.app.removeChild(button);
        components.save.button = false;
      }, 200);
    }
  } else {

    // generate new key
    key = new Key();

    // save all 
    save('config');
    save('hide');
    pack(dir.key, key, true);
    pack(dir.data, data);
  }
}



// object functions
function pack(d, object, unencrypted) {
  if(unencrypted) {
    fs.writeFileSync(d, JSON.stringify(object));
  } else {
    fs.writeFileSync(d, JSON.stringify(encrypt(JSON.stringify(object))));
  }
}

function unpack(d, unencrypted) {
  try {
    if(unencrypted) {
      return JSON.parse(fs.readFileSync(d));
    } else {
      return JSON.parse(decrypt(JSON.parse(fs.readFileSync(d))));
    }
  } catch(err) {
    console.log('%c ERROR: Cannot unpack at the dir specified: "' + d + '".\n File possibly does not exist.', terminal.red);
  }
}


function encrypt(text) {
	// encrypt string
	let cipher = crypto.createCipheriv('aes-256-cbc', key.key, key.iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([ encrypted, cipher.final() ]);
	return { iv: key.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
	let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
	let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key.key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([ decrypted, decipher.final() ]);
	return decrypted.toString();
}


function autoSave() {
  let savedData = decrypt(JSON.parse(fs.readFileSync(dir.data)));
  let currentData = JSON.stringify(data);

  // if data is changed
  if(savedData != currentData) {
    if(!components.save.button) {
      components.save.button = true;
      console.log('changed detected!');
      addElement('button', { class: 'save-button', onclick: 'save()'}, 'Save', el.app);

    }
  } else {
    components.save.button = false;
    save('hide');
  }
}