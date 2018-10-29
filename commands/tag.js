const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

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

  if (args == 'ateveryone') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media1.tenor.com/images/4503a9e149b20fbf6b6af491220b5000/tenor.gif?itemid=9670656');
    return message.channel.send(embed);
  } else if (args == 'congrats') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/slOhiKAVFgwr6/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'dab') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/A4R8sdUG7G9TG/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'discord') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media1.tenor.com/images/83cdd1dd40cdb87020949e0f075b9648/tenor.gif?itemid=11230336');
    return message.channel.send(embed);
  } else if (args == 'gay') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/ZcYe7jWTLRzkQ/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'hi') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/IThjAlJnD9WNO/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'lol') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/9MFsKQ8A6HCN2/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'no') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media1.tenor.com/images/0a37ef8f52e2232d85a2070d56801987/tenor.gif?itemid=5026106');
    return message.channel.send(embed);
  } else if (args == 'nope') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'oof') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/3oz8xz12ps500JuWnC/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'spaghet') {
    let embed = new Discord.RichEmbed()
      .setImage('http://i0.kym-cdn.com/photos/images/newsfeed/001/332/955/58e.gif');
    return message.channel.send(embed);
  } else if (args == 'thinking') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'triggered') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/vk7VesvyZEwuI/giphy.gif');
    return message.channel.send(embed);
  } else if (args == 'welp') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media1.tenor.com/images/f66275ec82c046b43d5503dbf46af622/tenor.gif?itemid=8398567');
    return message.channel.send(embed);
  } else if (args == 'xd') {
    let embed = new Discord.RichEmbed()
      .setImage('https://media.giphy.com/media/yyoFZ1EjLRkSQ/giphy.gif');
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: 'tag',
  description: 'This allows you top create nice tags to add to your messaging experience.',
  usage: 'tag [args]'
};