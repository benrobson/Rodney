const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  if (!args) return message.reply('Sorry, but you must specify what you want to set the custom server prefix as.');
  client.prefixes.set(message.guild.id, args);
  const embed = new Discord.RichEmbed()
    .setTitle('Prefix Set!')
    .setDescription(`The server custom prefix has been set to ${args}`)
    .setColor('RANDOM');
  return message.channel.send(embed);
}

module.exports.help = {
  name: 'prefix',
  description: 'Sets the custom server prefix.',
  permission: 'MANAGE_GUILD',
  usage: 'prefix <prefix>'
}
