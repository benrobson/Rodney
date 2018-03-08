const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const fs = require('fs'); // this is the 'File System' that reads all of the commands in the commands folder
const ms = require('ms'); // this package allows us to use time
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8')); // this links to the warnings.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('This user could not be found, or does not exist.');
    message.channel.send(embed);
    return
  };
  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply('Insufficent Permissions.');
  if (user.hasPermission("MANAGE_MESSAGES")) return message.reply('This user cannot be warned.');
  let reason = args.join(" ").slice(22);
  if (!reason){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('There is no reason for this punishment, please provide a reason.');
    message.channel.send(embed);
    return
  };

  if (!warns[user.id]) warns[user.id] = {
    warns: 0
  };

  warns[user.id].warns++;

  fs.writeFile('./warnings.json', JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Warned')
  .setColor(config.reportembedcolor)
  .addField('Warned User', `${user} with ID: ${user.id}`)
  .addField('Warned By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Warned in Channel:', message.channel)
  .addField('Number Of Warnings:', `**${warns[user.id].warns}**`)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) {
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('A `#audit-log` channel channel could not be found, the punishment notification could not be sent.');
    message.channel.send(embed);
  }

  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed);

  // Punishments
  // 2nd warning is user is Muted for 5 minutes
  if (warns[user.id].warns === 2){
    let muterole = message.guild.roles.find('name', 'Muted'); // Bot checks to see if there is a role named Muted.
    if (!muterole){ // if there is no role named Muted, the bot will go ahead and create the role and apply permissions to every channel.
      try {
        muterole = await message.guild.createRole({
          name: 'Muted',
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch(e) {
        console.log(e.stack);
      }
    }

    let time = '5m';
    await(user.addRole(muterole.id));

    setTimeout(function(){
      user.removeRole(muterole.id);
      let embed = new Discord.RichEmbed()
      .setTitle('User has been Unmuted')
      .setColor(config.plainembedcolor)
      .addField('Muted User', `${user} with ID: ${user.id}`)
      auditlogchannel.send(embed);
    }, ms(time))

    let embed = new Discord.RichEmbed()
    .setTitle('User has been Temporarily Muted')
    .setColor(config.muteembedcolor)
    .addField('Muted User', `${user} with ID: ${user.id}`)
    .addField('Muted By:', '**AUTOMATIC ESCALATION SYSTEM**')
    .addField('Muted for:', time)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    let auditlogchannel = message.guild.channels.find('name', 'audit-log');
    if (!auditlogchannel) return message.channel.send('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');

    auditlogchannel.send(embed);
  }

  // 3nd warning is user is Muted for 15 minutes
  if (warns[user.id].warns === 3){
    let muterole = message.guild.roles.find('name', 'Muted'); // Bot checks to see if there is a role named Muted.
    let time = '15m';
    await(user.addRole(muterole.id));

    setTimeout(function(){
      user.removeRole(muterole.id);
      let embed = new Discord.RichEmbed()
      .setTitle('User has been Unmuted')
      .setColor(config.plainembedcolor)
      .addField('Muted User', `${user} with ID: ${user.id}`)
      auditlogchannel.send(embed);
    }, ms(time))

    let embed = new Discord.RichEmbed()
    .setTitle('User has been Temporarily Muted')
    .setColor(config.muteembedcolor)
    .addField('Muted User', `${user} with ID: ${user.id}`)
    .addField('Muted By:', '**AUTOMATIC ESCALATION SYSTEM**')
    .addField('Muted for:', time)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    auditlogchannel.send(embed);
  }

  // 4th warning is user is Muted for 1 hour
  if (warns[user.id].warns === 4){
    let muterole = message.guild.roles.find('name', 'Muted'); // Bot checks to see if there is a role named Muted.
    let time = '1h';
    await(user.addRole(muterole.id));

    setTimeout(function(){
      user.removeRole(muterole.id);
      let embed = new Discord.RichEmbed()
      .setTitle('User has been Unmuted')
      .setColor(config.plainembedcolor)
      .addField('Muted User', `${user} with ID: ${user.id}`)
      auditlogchannel.send(embed);
    }, ms(time))

    let embed = new Discord.RichEmbed()
    .setTitle('User has been Temporarily Muted')
    .setColor(config.muteembedcolor)
    .addField('Muted User', `${user} with ID: ${user.id}`)
    .addField('Muted By:', '**AUTOMATIC ESCALATION SYSTEM**')
    .addField('Muted for:', time)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    auditlogchannel.send(embed);
  }

  // 5th warning is user is kicked from server/guild
  if (warns[user.id].warns === 5){
    message.guild.member(user).kick(reason);

    let embed = new Discord.RichEmbed()
    .setTitle('User has been Kicked')
    .setColor(config.kickembedcolor)
    .addField('Kicked User', `${user} with ID: ${user.id}`)
    .addField('Kicked By:', '**AUTOMATIC ESCALATION SYSTEM**')
    .addField('Kicked in Channel:', message.channel)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);

    auditlogchannel.send(embed);
  }

  // 4th warning is user is Muted for 1 day
  if (warns[user.id].warns === 6){
    let muterole = message.guild.roles.find('name', 'Muted'); // Bot checks to see if there is a role named Muted.
    let time = '1d';
    await(user.addRole(muterole.id));

    setTimeout(function(){
      user.removeRole(muterole.id);
      let embed = new Discord.RichEmbed()
      .setTitle('User has been Unmuted')
      .setColor(config.plainembedcolor)
      .addField('Muted User', `${user} with ID: ${user.id}`)
      auditlogchannel.send(embed);
    }, ms(time))

    let embed = new Discord.RichEmbed()
    .setTitle('User has been Temporarily Muted')
    .setColor(config.muteembedcolor)
    .addField('Muted User', `${user} with ID: ${user.id}`)
    .addField('Muted By:', '**AUTOMATIC ESCALATION SYSTEM**')
    .addField('Muted for:', time)
    .addField('Time:', message.createdAt)
    .addField('Reason:', reason);
    auditlogchannel.send(embed);
  };
};

module.exports.help = {
  name: 'warn',
  description: 'This warns the user, after an amount of warns, user goes through the Automatic Escalation System.',
  usage: 'warn [user] [reason]'
}
