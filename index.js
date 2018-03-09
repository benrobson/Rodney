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
    console.log('Couldn\'t find commands.'); // if the bot cannot find any commands in the file path given, it will error out
    return;
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`); // this is the file path where the bot will find commands from
    console.log(`${files} has been loaded!`); // this is the message you will see when commands are loading into bot instance
    client.commands.set(props.help.name, props);
  })});

// Bot Bootup Event
client.on('ready', async () => {
    console.log(`${client.user.username} is online and is operating on ${client.guilds.size} servers.`); // this is the message you will see when the bot is online
    client.user.setActivity('in Development...', {type: 'PLAYING'}); // this sets the Activity Status of the bot
    return
});


// Guild Events
// User Join Noticication Event
client.on('guildMemberAdd', async member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('User has joined the server!')
  .setColor(config.joinembedcolor)
  .addField('Username:', `${member}`)
  auditlogchannel.send(embed);
  return
});

// User Leave Noticication Event
client.on('guildMemberRemove', async member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('User has left the server!')
  .setColor(config.leaveembedcolor)
  .addField('Username:', `${member}`)
  auditlogchannel.send(embed);
  return
});

// Channel Create Noticication Event
client.on('channelCreate', async channel => {
  let auditlogchannel = channel.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('Channel has been created!')
  .setColor(config.joinembedcolor)
  .addField('Channel Name:', `${channel}`)
  .addField('Channel Type:', `${channel.type}`)
  .addField('Created At:', `${channel.createdAt}`)
  auditlogchannel.send(embed);
  return
});

// Channel Delete Noticication Event
client.on('channelDelete', async channel => {
  let auditlogchannel = channel.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('Channel has been deleted!')
  .setColor(config.leaveembedcolor)
  .addField('Channel Name:', `${channel.name}`)
  .addField('Channel Type:', `${channel.type}`)
  .addField('Deleted At:', `${channel.createdAt}`)
  auditlogchannel.send(embed);
  return
});

// Message Handler
client.on('message', async message => {
    if (message.author.bot) return; // this will not allow the bot to respond to it's own messages
    if (message.channel.type === 'dm') return; // the bot will not respond to messages from a DM

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
  });

//client.login(config.token);  // this link to the config.json where you should have put your token.
client.login(token.token); // this links to an external file where I keep my token for development purposes.
