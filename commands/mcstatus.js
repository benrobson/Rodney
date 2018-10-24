const Discord = require('discord.js');
const config = require('../config.json');
const superagent = require('superagent');
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

  let mcIP = args[0];
  if (!mcIP) return errors.invalidIP(message);

  let {body} = await superagent
  .get('http://mcapi.us/server/status?ip=' + mcIP);
  let status = body.online ? "✅" : "❎";

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${mcIP}`)
  .setThumbnail('https://vignette.wikia.nocookie.net/minecraftpocketedition/images/f/f1/Minecraft_1.2_Logo.png/revision/latest?cb=20171204231225')
  .setColor(body.online ? config.green : config.red)
  .addField('Server Online', status)
  .addField('Players On', body.players.now, true)
  .addField('Max Players', body.players.max, true);
  message.channel.send(embed);

  console.log(chalk.yellow(`[${message.guild}]`) + ` ${message.author.username} requested the Minecraft Server status for ${mcIP}`);
  return
};

module.exports.help = {
  name: 'mcstatus',
  description: 'Display information about a Minecraft Server.',
  usage: 'mcstatus [ip]'
};
