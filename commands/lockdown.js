const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const ms = require('ms');

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

  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return errors.invalidTime(message);

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      let embed = new Discord.RichEmbed()
      .setColor(config.green)
      .setDescription('Lockdown has been lifted.')
      message.channel.send(embed);
      console.log(`[${message.guild}] The lockdown on #${message.channel.name} has been lifted.`);

      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      let embed = new Discord.RichEmbed()
      .setTitle('This channel has been locked down!')
      .setColor(config.red)
      .setDescription(`${message.channel} has been **locked down** for ${ms(ms(time), { long:true })} by **${message.author.username}**`)
      message.channel.send(embed);
      console.log(`[${message.guild}] ${message.author.username} has locked down #${message.channel.name}.`);

      client.lockit[message.channel.id] = setTimeout(() => {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: null
        })

        let embed = new Discord.RichEmbed()
        .setColor(config.green)
        .setDescription('Lockdown has been lifted.')
        message.channel.send(embed);
        console.log(`[${message.guild}] The lockdown on #${message.channel.name} has been lifted.`);

        delete client.lockit[message.channel.id];
      }, ms(time));
      })
    }
};

module.exports.help = {
  name: 'lockdown',
  description: 'Temporarily lock any channel from interaction from other users.',
  permission: 'MANAGE_MESSAGES',
  usage: 'lockdown [h/m/s] unlock, release'
};
