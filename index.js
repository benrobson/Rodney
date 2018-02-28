const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({disableEveryone: true});

client.on('ready', async () => {
  console.log(`${client.user.username} is online.`);
  client.user.setActivity('in Development...', {type: 'WORKING'})
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return; // if a User send a command to the bot via DM, it will not respond
  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}report`){
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.join(" ").slice(22);
    if(!user) return message.channel.send('Sorry, I couldn\'t find that user.');

    let embed = new Discord.RichEmbed()
    .setDescription('Report')
    .setColor('#15f153')
    .addField('Reported User', `${user} with ID: ${user.id}`)
    .addField('Reported By:', `${message.author} with ID: ${message.author.id}`)
    .addField('Channel:', message.channel)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    return message.channel.send(embed);
  }

  if (cmd === `${prefix}serverinfo`){
    let icon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()

    .setDescription('Guild Information')
    .setColor('#15f153')
    .setThumbnail(icon)
    .addField('Server Name:', message.guild.name)
    .addField('Created At:', message.guild.createdAt)
    .addField("You Joined:", message.member.joinedAt)
    .addField("Total Members:", message.guild.memberCount);

    return message.channel.send(embed);
  }

  if (cmd === `${prefix}botinfo`){
    let icon = client.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()

    .setDescription('Bot Information')
    .setColor('#15f153')
    .setThumbnail(icon)
    .addField('Bot Name:', client.user.username)
    .addField('Created At:', client.user.createdAt);

    return message.channel.send(embed);
  }

});

client.login(config.token);
