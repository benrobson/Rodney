const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (message.author.id === config.ownerid) {
    if (!args || args.size < 1) return errors.noCommandName(message);
    delete require.cache[require.resolve(`../commands/${args[0]}.js`)];

    let embed = new Discord.RichEmbed()
    .setTitle('Command has been reloaded.')
    .setDescription(`The ${args[0]} command has been reloaded.`)
    .setColor(config.green);

    message.channel.send(embed);
    console.log(`The ${args[0]} command has been reloaded`);
  } else return errors.ownerOnly(message);
};

module.exports.help = {
    name: 'reload',
    description: 'Reload commands.',
    usage: 'reload [command]'
};
