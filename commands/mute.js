const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .addField('Permission', `${module.exports.help.permission}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);
  if (user.hasPermission(`${module.exports.help.permission}`)) return errors.cannotPunish(message);

  let reason = args.slice(2).join(" ");
  if (!reason) return errors.invalidReason(message);

  let muterole = message.guild.roles.find(c => c.name === 'Muted');
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

  let auditlogchannel = message.guild.channels.find(c => c.name === 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  message.delete().catch(O_o=>{});
  auditlogchannel.send(embed);
  console.log(`[${message.guild}] ${message.author.username} has muted ${user.user.username} in ${message.guild} for ${time} for ${reason}.`);

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
  name: 'mute',
  description: 'Temporarily mutes a user.',
  permission: 'MANAGE_MESSAGES',
  usage: 'mute [@user] [h/m/s] [reason]'
};
