const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const chalk = require('chalk');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  message.channel.createInvite()
    .then((invite) => {
      let embed = new Discord.RichEmbed()
      .setTitle('Instant Invite Created!')
      .setColor(config.yellow)
      .setURL(`https://discord.gg/${invite.code}`)
      .setDescription(`Successfully created an invite!\nhttps://discord.gg/${invite.code}`)
      message.channel.send(embed);

      console.log(chalk.yellow(`[${message.guild}]`) + ` ${message.author.username} has generated an invite to the guild ${message.guild}: https://discord.gg/${invite.code}`);
    });
};

module.exports.help = {
  name: 'invite',
  description: 'Generates an instant invite to your guild.',
  usage: 'invite'
};
