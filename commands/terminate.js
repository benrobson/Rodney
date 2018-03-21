const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {

  if (message.author.id !== `${config.ownerid}`){
    let embed = new Discord.RichEmbed()
    .setTitle(`An error has occurred!`)
    .setColor(config.red)
    .setDescription(`Only <@${config.ownerid}> terminate the instance.`)
    message.channel.send(embed);
  }

  if (message.author.id == `${config.ownerid}`){
    let embed = new Discord.RichEmbed()
    .setTitle(`It's time for ${client.user.username} to go!!!`)
    .setColor(config.red)
    .setDescription('Leaving Guild...')
    message.channel.send(embed);

    message.guild.leave();
    return
  }
}

module.exports.help = {
  name: 'terminate',
  description: 'Will make the bot leave the guild and terminate it\'s instance.',
  usage: 'terminate'
}
