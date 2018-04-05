const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);
  if (user.hasPermission('MANAGE_MESSAGES')) return errors.cannotPunish(message);

  let reason = args.slice(1).join(" ");
  if (!reason) return errors.invalidReason(message);

  let muterole = message.guild.roles.find('name', 'Muted');
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: 'Muted',
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  };

  let time = args[1];
  if (!time) return errors.invalidTime(message);

  let embed = new Discord.RichEmbed()
  .setTitle('User has been Temporarily Muted')
  .setColor(config.red)
  .addField('Muted User', `${user}`, true)
  .addField('Muted By', `${message.author}`, true)
  .addField('Muted For', time)
  .addField('Time', message.createdAt)
  .addField('Reason', reason);

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed)

  await(user.addRole(muterole.id));

  setTimeout(function(){
    user.removeRole(muterole.id);
    let embed = new Discord.RichEmbed()
    .setTitle('User has been Unmuted')
    .setColor(config.yellow)
    .addField('Muted User', `${user}`)
    auditlogchannel.send(embed);
  }, ms(time));
};

module.exports.help = {
  name: 'tempmute',
  description: 'Temporarily mutes a user.',
  usage: 'tempmute [@user] [time h/m/s] [reason]'
};
