const Discord = require('discord.js');
const config = require('./config.json');
const token = require('./token.json');
const package = require('./package.json');
const client = new Discord.Client({disableEveryone: true});
const fs = require('fs');
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
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';
  console.log(`${client.user.username} is online and is operating on ${client.guilds.size} ${pluralnonpluralservers} for ${client.users.size} ${pluralnonpluralusers}.`);
  client.user.setActivity(`${client.guilds.size} ${pluralnonpluralservers} // ${client.users.size} ${pluralnonpluralusers}`, {type: 'PLAYING'});
  return
});

// Guild Events
// Deleted Message Notification Event
client.on('messageDelete', async message => {
  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle('A messsage has been deleted.')
  .setColor(config.yellow)
  .addField('Sent By', message.author)
  .addField('Sent At', message.createdAt)
  .addField('Deleted in', message.channel)
  .addField('Message Content', message.content)
  auditlogchannel.send(embed);
  return
});

// User Join Noticication Event
client.on('guildMemberAdd', async member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle('User has joined the server!')
  .setColor(config.green)
  .addField('Username', member.user.username, true)
  .addField('Tag', member, true)
  auditlogchannel.send(embed);
  return
});

// User Leave Noticication Event
client.on('guildMemberRemove', async member => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle('User has left the server!')
  .setColor(config.red)
  .addField('Username', member.user.username, true)
  .addField('Tag', member, true)
  auditlogchannel.send(embed);
  return
});

// Channel Create Noticication Event
client.on('channelCreate', async channel => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

  let embed = new Discord.RichEmbed()
  .setTitle('Channel has been created!')
  .setColor(config.green)
  .addField('Channel Name:', `${channel.name}`)
  .addField('Channel Type:', `${channel.type}`)
  .addField('Created At:', `${channel.createdAt}`)
  auditlogchannel.send(embed);
  return
});

// Channel Delete Noticication Event
client.on('channelDelete', async channel => {
  let auditlogchannel = member.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return

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
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);

    // Discord Invite Detector
    const invite = ['discord.gg', 'discord.io'];
    if (!config.discordinvite) return;
    if (client.user.bot) return;
    if (invite.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o=>{});

      let embed = new Discord.RichEmbed()
      .setTitle('Discord Invite Detected')
      .setColor(config.red)
      .setDescription(`${message.author}, you are not allowed to advertise other Discords`);
      message.channel.send(embed);
      return
    };

    // Swear Detector
    const swearWords = ['shit', 'fuck', 'bitch', 'nigger', 'nigga', 'cunt', 'whore', 'fag', 'faggot', 'dick', 'cock', 'pussy', 'slut', 'bastard'];
    if (!config.swearfilter) return;
    if (client.user.bot) return;
    if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o=>{});

      let embed = new Discord.RichEmbed()
      .setTitle('Swear Word Detected')
      .setColor(config.red)
      .setDescription(`${message.author}, you can't say that, this is a Christian Minecraft Server!`);
      message.channel.send(embed).then(message => message.delete(3000));
      return
    };
  });

client.login(token.token);
