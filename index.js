const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({disableEveryone: true});

client.on('ready', async () => {
  console.log(`${client.user.username} is online.`);
  client.user.setActivity('Minecraft')
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return; // if a User send a command to the bot via DM, it will not respond
  let prefix = config.prefix;
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}hello`){
    message.channel.send('Hello');
  }

  if (cmd === `${prefix}botinfo`){
    let embed = new Discord.RichEmbed()
    .setDescription('Bot Information')
    .setColor('#15f153')
    .addField('Bot Name', client.user.username)

    return message.channel.send(embed);
  }

});

client.login(config.token);
