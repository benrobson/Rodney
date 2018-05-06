const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  message.channel.createInvite()
    .then((i) => {
      let embed = new Discord.RichEmbed()
      .setTitle('Instant Invite Created!')
      .setColor(config.yellow)
      .setURL(`https://discord.gg/${i.code}`)
      .setDescription(`Successfully created an invite!\nhttps://discord.gg/${i.code}`)
      message.channel.send(embed);
    });
};

module.exports.help = {
  name: 'invite',
  description: 'Generate an instant invite to your guild.',
  usage: 'invite'
};
