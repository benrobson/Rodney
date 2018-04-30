const Discord = require('discord.js');
const config = require('./config.json');
const token = require('./token.json');
const client = new Discord.Client({disableEveryone: true});
const fs = require('fs');
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);

//Reads all commands and boots them in
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Couldn\'t find commands.');
    return;
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`${files} has been loaded.`);
    client.commands.set(props.help.name, props);
  })});

client.login(token.token);
