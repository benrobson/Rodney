const Discord = require('discord.js');
const config = require('./config.json');
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});

client.on('ready', async () => {
  console.log(`${client.user.username} is online.`);
  client.user.setActivity('in Development...', {type: 'WORKING'})
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return; // the bot will not respond to messages from a DM
  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // Roadmap Command
  if (cmd === `${prefix}roadmap`){
    let embed = new Discord.RichEmbed()

    .setDescription(`**Roadmap [Current and Future Development Progress]**`)
    .setColor(config.plainembedcolor)
    .addField(`Want to see the current and future progression of ${client.user.username}, see the link to the progression roadmap:`, 'https://goo.gl/j6F65M');

    return message.channel.send(embed);
  }

  // Report Command
  if (cmd === `${prefix}report`){
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.join(" ").slice(22);
    if(!user) return message.channel.send('Sorry, I couldn\'t find that user.');

    let embed = new Discord.RichEmbed()
    .setDescription('**Incoming Report**')
    .setColor(config.reportembedcolor)
    .addField('Reported User', `${user} with ID: ${user.id}`)
    .addField('Reported By:', `${message.author} with ID: ${message.author.id}`)
    .addField('Channel:', message.channel)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    let reportschannel = messgae.guild.channels.find('name', 'reports');
    if (!reportschannel) return message.channel.send('Sorry, I couldn\'t find the Reports Channel, unable to send this report.')

    return message.channel.send(embed);
  }

  // Server Information Command
  if (cmd === `${prefix}serverinfo`){
    let icon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()

    .setDescription(`**Information about ${message.guild.name}**`)
    .setColor(config.plainembedcolor)
    .setThumbnail(icon)
    .addField('Server Name:', message.guild.name)
    .addField('Created At:', message.guild.createdAt)
    .addField("You Joined:", message.member.joinedAt)
    .addField("Total Members:", message.guild.memberCount);

    return message.channel.send(embed);
  }

  // Bot Information Command
  if (cmd === `${prefix}botinfo`){
    let icon = client.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()

    .setDescription(`**Information about ${client.user.username}**`)
    .setColor(config.plainembedcolor)
    .setThumbnail(icon)
    .addField('Bot Name:', client.user.username)
    .addField('Created At:', client.user.createdAt);

    return message.channel.send(embed);
  }

});

client.login(config.token);
