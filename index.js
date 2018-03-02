const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('./config.json'); // this links to the config.json file
const token = require('./token.json'); // this links to the token.json file where my bot token is stored for Development Purposes
const package = require('./package.json'); // this links to the package.json file
const client = new Discord.Client({disableEveryone: true}); // this is the object for the bot itself
const fs = require('fs'); // this is the 'File System' that reads all of the commands in the commands folder
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Couldn\'t find commands.');
    return;
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`${files} has been loaded!`);
    client.commands.set(props.help.name, props);
  })});

// Bot Bootup Event
client.on('ready', async () => {
  console.log(`${client.user.username} is online.`);
  client.user.setActivity('in Development...', {type: 'PLAYING'});
});

client.on('message', async message => {
  if (message.author.bot) return; // this will not allow the bot to respond to it's own messages
  if (message.channel.type === 'dm') return; // the bot will not respond to messages from a DM
  let prefix = config.prefix; // this redirects to the config where the prefix is stored
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);

});

client.login(token.token);
