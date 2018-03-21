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
    console.log(`${client.user.username} is online and is operating on ${client.guilds.size} servers for ${client.users.size} users.`); // this is the message you will see when the bot is online
    client.user.setActivity(`${client.guilds.size} Servers // ${client.users.size} Users`, {type: 'PLAYING'}); // this sets the Activity Status of the bot
    return
});

// Guild Events
// User Join Noticication Event
client.on('guildMemberAdd', async member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('User has joined the server!')
  .setColor(config.green)
  .addField('Username:', `${member}`)
  auditlogchannel.send(embed);
  return
});

// User Leave Noticication Event
client.on('guildMemberRemove', async member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('User has left the server!')
  .setColor(config.red)
  .addField('Username:', `${member}`)
  auditlogchannel.send(embed);
  return
});

// Channel Create Noticication Event
client.on('channelCreate', async channel => {
  let auditlogchannel = channel.guild.channels.find('name', 'audit-log');

  let embed = new Discord.RichEmbed()
  .setTitle('Channel has been created!')
  .setColor(config.green)
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
  .setColor(config.red)
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

    // Discord Invite Detector
    const invite = ['discord.gg'];
    if(invite.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o=>{});

      let embed = new Discord.RichEmbed()
      .setTitle('Discord Invite Detected')
      .setColor(config.red)
      .setDescription(`${message.author}, you are not allowed to advertise other Discord Servers in this server!`);
      message.channel.send(embed);
      return
    };

    // Swear Detector
    const swearWords = ['shit', 'fuck', 'bitch', 'nigger', 'nigga', 'cunt', 'whore', 'fag', 'faggot', 'dick', 'cock', 'pussy', 'slut', 'bastard'];
    if(swearWords.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o=>{});

      let embed = new Discord.RichEmbed()
      .setTitle('Swear Word Detected')
      .setColor(config.red)
      .setDescription(`${message.author}, you can't say that, this is a Christian Minecraft Server!`);
      message.channel.send(embed).then(msg => msg.delete(3000));
      return
    };
  });

client.login(token.token); // this links to an external file where your tokens are stored (token.json)
