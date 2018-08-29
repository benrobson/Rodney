const Discord = require('discord.js');
const config = require('../config.json');
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
  permission: 'ADMINISTRATOR',
  usage: 'say [content]'
};
