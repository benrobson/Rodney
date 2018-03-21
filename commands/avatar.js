const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This user could not be found, or does not exist.');
    message.channel.send(embed);
    return
  };

  let embed = new Discord.RichEmbed()
  .setTitle(`Here is ${user.displayName}s avatar.`)
  .setColor(config.white)
  .setImage(user.avatarURL);
  message.channel.send(embed);
  return
};

  module.exports.help = {
    name: 'avatar',
    description: 'This will display your avatar.',
    usage: 'avatar [@user]'
  }
