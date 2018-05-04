const Discord = require('discord.js');
const config = require('./config.json');
const token = require('./token.json');
const client = new Discord.Client({disableEveryone: true});
const fs = require('fs');
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);

// Reads all commands and boots them in
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Couldn\'t find commands.');
    return
  }

jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`${files} has been loaded.`);
    client.commands.set(props.help.name, props);
  })
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    // User Joins a voice channel
    console.log('User has joined a channel.');

    let voicerole = message.guild.roles.find('name', 'Voice');
    if (!voicerole) {
      try {
        voicerole = message.guild.createRole({
          name: 'Voice',
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach((channel, id) => {
          channel.overwritePermissions(voicerole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false
          });
        });
      } catch(e) {
        console.log(e.stack);
      }
    };

  } else if (newUserChannel === undefined) {
    // User leaves a voice channel
    console.log('User has left a channel.');
  }});


client.login(token.token);
