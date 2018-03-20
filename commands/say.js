const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('You do not have sufficent permissions to use this command.');
    message.channel.send(embed);
    return
  };
  if (!args[0]){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.errorembedcolor)
    .setDescription('Please specify the message you would like to send, you cannot send an empty message.');
    message.channel.send(embed);
    return
  };

  let inputmessage = args.join(' ');
  let embed = new Discord.RichEmbed()
  .setColor(config.joinembedcolor)
  .setDescription(inputmessage)
  message.delete().catch(O_o=>{});
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'say',
  description: 'This will send a message as the bot on your behalf.',
  usage: 'say [message]'
};
