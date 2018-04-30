const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const config = require('../config.json');
client.commands = new Discord.Collection();

module.exports = message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);

  // Discord Invite Detector
  const invite = ['discord.gg', 'discord.io', 'discord.me'];
  if (!config.discordinvite) return;
  if (invite.some(word => message.content.toLowerCase().includes(word))) {
  message.delete().catch(O_o=>{});

    let embed = new Discord.RichEmbed()
    .setTitle('Discord Invite Detected')
    .setColor(config.red)
    .setDescription(`${message.author}, you are not allowed to advertise other Discords`);
    message.channel.send(embed);
    return;
  };

  // Swear Detector
  const swearWords = ['shit', 'fuck', 'bitch', 'nigger', 'nigga', 'cunt', 'whore', 'fag', 'faggot', 'dick', 'cock', 'pussy', 'slut', 'bastard'];
  if (!config.swearfilter) return;
  if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
  message.delete().catch(O_o=>{});

    let embed = new Discord.RichEmbed()
    .setTitle('Swear Word Detected')
    .setColor(config.red)
    .setDescription(`${message.author}, you can't say that, this is a Christian Minecraft Server!`);
    message.channel.send(embed).then(message => message.delete(3000));
    return;
  };
}
