const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const snekfetch = require('snekfetch');

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

  if (!args.slice(0)
		.join(' ')) return errors.emptyCode(message)
	snekfetch.post('https://hastebin.com/documents')
		.send(args.slice(0)
			.join(' '))
		.then(body => {
      let embed = new Discord.RichEmbed()
      .setTitle('Your hastebin has been posted.')
      .setURL(`https://hastebin.com/${body.body.key}`)
      .setDescription(`Posted text to Hastebin\nURL: https://hastebin.com/${body.body.key}`)
      .setColor(config.green);

      message.channel.send(embed);
		});
};

module.exports.help = {
  name: 'hastebin',
  description: 'This will allow users to take a selected amount of text and export it to the site hastebin.',
  usage: 'hastebin [content]'
};
