const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  message.channel.createInvite()
    .then((invite) => {
      let embed = new Discord.RichEmbed()
      .setTitle('Instant Invite Created!')
      .setColor(config.yellow)
      .setURL(`https://discord.gg/${invite.code}`)
      .setDescription(`Successfully created an invite!\nhttps://discord.gg/${invite.code}`)
      message.channel.send(embed);

      console.log(`[${message.guild}] ${message.author.username} has generated an invite to the guild ${message.guild}: https://discord.gg/${invite.code}`);
    });
};

module.exports.help = {
  name: 'invite',
  description: 'Generate an instant invite to your guild.',
  usage: 'invite'
};
