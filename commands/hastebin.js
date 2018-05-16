const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {
  if (!args.slice(0)
		.join(' ')) return errors.emptyCode(message)
	snekfetch.post('https://hastebin.com/documents')
		.send(args.slice(0)
			.join(' '))
		.then(body => {
      let embed = new Discord.RichEmbed()
      .setTitle('Posted!')
      .setURL(`https://hastebin.com/${body.body.key}`)
      .setDescription(`Posted text to Hastebin\nURL: https://hastebin.com/${body.body.key}`)
      .setColor(config.green);

      message.channel.send(embed);
		});
};

module.exports.help = {
  name: 'hastebin',
  usage: 'hastebin'
};
