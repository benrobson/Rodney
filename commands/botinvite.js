const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

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

  if (!args[0] < 17) return errors.invalidClientID(message);
  let inputid = args.join(' ');

  let embed = new Discord.RichEmbed()
  .setColor(config.green)
  .setDescription(`Here is a link to invite your bot:\nhttps://discordapp.com/oauth2/authorize?client_id=${inputid}&scope=bot`)

  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'botinvite',
  description: 'Users can use this as an easy utility to invite bots to their servers, or yours if you allow it.',
  usage: 'botinvite [client id]'
};
