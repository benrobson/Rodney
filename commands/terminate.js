const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let icon = message.guild.iconURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`It's time for ${client.user.username} to go!!!`)
  .setColor(config.errorembedcolor)
  .setDescription('Leaving Guild...')

  return message.channel.send(embed);


  guild.leave()
  .then(g => console.log(`Left the guild ${g}`))
  .catch(console.error);
}

module.exports.help = {
  name: 'terminate',
  description: 'Will make the bot leave the guild and terminate it\'s instance.',
  usage: 'terminate'
}
