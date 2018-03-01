const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('./config.json'); // this links to the config.json file
const package = require('./package.json'); // this links to the package.json file
const client = new Discord.Client({disableEveryone: true}); // this is the object for the bot itself
const fs = require('fs'); // this is the 'File System' that reads all of the commands in the commands folder

fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Couldn\'t find commands.');
    return;
  }
})

client.on('ready', async () => {
  console.log(`${client.user.username} is online.`);
  client.user.setActivity('in Development...', {type: 'PLAYING'});
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
    .addField(`Want to see the current and future progression of ${client.user.username}, see the link to the progression roadmap:`, 'https://goo.gl/2jCKvp');

    return message.channel.send(embed);
  }

  // Report Command
  if (cmd === `${prefix}report`){
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.join(' ').slice(22);
    if(!user) return message.channel.send('Sorry, I couldn\'t find that user.');

    let embed = new Discord.RichEmbed()
    .setDescription('**Incoming Report!**')
    .setColor(config.reportembedcolor)
    .addField('Reported User', `${user} with ID: ${user.id}`)
    .addField('Reported By:', `${message.author} with ID: ${message.author.id}`)
    .addField('Channel:', message.channel)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    let reportschannel = message.guild.channels.find('name', 'reports');
    if (!reportschannel) return message.channel.send('Sorry, I couldn\'t find the Reports Channel, unable to send this report.');

    message.delete().catch(O_o=>{});
    reportschannel.send(embed);
    return;
  }

  // Kick Command
  if (cmd === `${prefix}kick`){
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send('Sorry, I couldn\'t find that user.');
    let reason = args.join(' ').slice(22);
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Insuffenient Permissions.');
    if (user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('This user cannot be kicked.');


    let embed = new Discord.RichEmbed()
    .setDescription('**User has been Kicked**')
    .setColor(config.reportembedcolor)
    .addField('Kicked User', `${user} with ID: ${user.id}`)
    .addField('Kicked By:', `${message.author} with ID: ${message.author.id}`)
    .addField('Kicked in Channel:', message.channel)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    let auditlogchannel = message.guild.channels.find('name', 'audit-log');
    if (!reportschannel) return message.channel.send('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');

    message.guild.member(user).kick(reason);
    message.delete().catch(O_o=>{});
    auditlogchannel.send(embed);

    return;
    }

    // Ban Command
    if (cmd === `${prefix}ban`){
      let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!user) return message.channel.send('Sorry, I couldn\'t find that user.');
      let reason = args.join(' ').slice(22);
      if (!message.member.hasPermission('MANAGE_MEMBERS')) return message.channel.send('Insuffenient Permissions.');
      if (user.hasPermission('MANAGE_MEMBERS')) return message.channel.send('This user cannot be banned.');


      let embed = new Discord.RichEmbed()
      .setDescription('**User has been Banned**')
      .setColor(config.reportembedcolor)
      .addField('Banned User', `${user} with ID: ${user.id}`)
      .addField('Banned By:', `${message.author} with ID: ${message.author.id}`)
      .addField('Banned in Channel:', message.channel)
      .addField('Time:', message.createdAt)
      .addField('Reason:', reason);

      let auditlogchannel = message.guild.channels.find('name', 'audit-log');
      if (!reportschannel) return message.channel.send('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');

      message.guild.member(user).ban(reason);
      message.delete().catch(O_o=>{});
      auditlogchannel.send(embed);

      return;
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
    .addField('You Joined:', message.member.joinedAt)
    .addField('Total Members:', message.guild.memberCount);

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
    .addField('Created At:', client.user.createdAt)
    .addField('Current Version:', package.version);

    return message.channel.send(embed);
  }

});

client.login(config.token);
