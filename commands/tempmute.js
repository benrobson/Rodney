const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const ms = require('ms'); // this package allows us to use time

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')){
      const embed = new Discord.RichEmbed()
      .setTitle('An error has occurred!')
      .setColor(config.red)
      .setDescription('You do not have permission to use this command.');
      message.channel.send(embed)
      return
  };

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) {
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('The user you would like to Temporarily Mute could not be found.');
    message.channel.send(embed);
    message.delete().catch(O_o=>{})
    return
  };
  if (user.hasPermission('MANAGE_MESSAGES')) {
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('You cannot mute this user.');
    message.channel.send(embed);
    message.delete().catch(O_o=>{})
    return
  };

  let reason = args.slice(2).join(' ');
  if (!reason){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Please supply a reason for the Temporary Mute.');
    message.channel.send(embed);
    message.delete().catch(O_o=>{})
    return
  };

  let muterole = message.guild.roles.find('name', 'Muted'); // Bot checks to see if there is a role named Muted.
  if (!muterole) { // if there is no role named Muted, the bot will go ahead and create the role and apply permissions to every channel.
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
  };

  let time = args[1];
  if (!time){
    const embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('You have not specified a time.');
    message.channel.send(embed);
  };

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Temporarily Muted')
  .setColor(config.red)
  .addField('Muted User', `${user} with ID: ${user.id}`)
  .addField('Muted By:', `${message.author} with ID: ${message.author.id}`)
  .addField('Muted for:', time)
  .addField('Time:', message.createdAt)
  .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return message.channel.send('Sorry, I couldn\'t find the Audit Log Channel, unable to send this punishment notification.');

  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed)

  await(user.addRole(muterole.id));

  setTimeout(function(){
    user.removeRole(muterole.id);
    let embed = new Discord.RichEmbed()
    .setTitle('User has been Unmuted')
    .setColor(config.yellow)
    .addField('Muted User', `${user} with ID: ${user.id}`)
    auditlogchannel.send(embed);
  }, ms(time));
};

module.exports.help = {
  name: 'tempmute',
  description: 'This will temporarily mute a user',
  usage: 'tempmute [user] [time h/m/s] [reason]'
};
