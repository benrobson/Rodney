const Discord = require('discord.js');
const config = require('../config.json');
const token = require('../token.json');
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

  if (message.author.id !== `${config.ownerid}`) return errors.ownersOnly(message);

  if (message.author.id == `${config.ownerid}`) {
    let embed = new Discord.RichEmbed()
      .setTitle('Shutting Down...')
      .setColor(config.red);

    message.channel.send(embed)
      .then(message => client.destroy())
  }
}

module.exports.help = {
  name: 'shutdown',
  description: 'This will shutdown the bot instance on all Discord servers.',
  permission: 'BOTOWNER',
  usage: 'shutdown'
};