const Discord = require('discord.js');
const config = require('../config.json');
const meme = require('memejs');

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

  meme(function(data) {
    const embed = new Discord.RichEmbed()
    .setTitle(data.title[0])
    .setImage(data.url[0])
    message.channel.send({embed});
  });
};

module.exports.help = {
  name: 'meme',
  description: 'Generate a meme.',
  usage: 'meme'
};
