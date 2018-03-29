const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return errors.noPermissions(message, 'ADMINISTRATOR');

  if (!args[0]) return errors.emptyMessage(message);
  let inputmessage = args.join(' ');

  let embed = new Discord.RichEmbed()
  .setColor(config.green)
  .setDescription(inputmessage)

  message.delete().catch(O_o=>{});
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'say',
  description: 'This will send a message as the bot on your behalf.',
  usage: 'say [message]'
};
