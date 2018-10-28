const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({
  disableEveryone: true
});
const fs = require('fs');
const chalk = require('chalk');
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);

// Reads all commands and boots them in
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log(chalk.red('Couldn\'t find commands.'));
    return
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(chalk.green('[Console] ') + chalk.yellow(files) + ` has been loaded.`);
    client.commands.set(props.help.name, props);
  })
});

// Message Guild Event
client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!cmd.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);

  // Discord Invite Detector
  const invite = ['discord.gg', 'discord.io', 'discord.me'];
  if (config.discordinvite == true) {
    if (invite.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o => {});

      let embed = new Discord.RichEmbed()
        .setTitle('Discord Invite Detected')
        .setColor(config.red)
        .setDescription(`${message.author}, you are not allowed to advertise other Discords`);
      message.channel.send(embed);

      console.log(chalk.green(`[${message.guild}]`) + ` ${message.author.username} advertised a Discord server in their message.`);
      return;
    }
  };

  // Swear Detector
  const swearWords = ['shit', 'fuck', 'bitch', 'nigger', 'nigga', 'cunt', 'whore', 'fag', 'faggot', 'dick', 'cock', 'pussy', 'slut', 'bastard'];
  if (config.swearfilter == true) {
    if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
      message.delete().catch(O_o => {});

      let embed = new Discord.RichEmbed()
        .setTitle('Swear Word Detected')
        .setColor(config.red)
        .setDescription(`${message.author}, you can't say that.`);
      message.channel.send(embed).then(message => message.delete(3000));
      return;
    }
  };
});

client.login(process.env.BOT_TOKEN);

//const privatekey = require('./privatekey.json'); // Used for local development
//client.login(privatekey.token); // Used for local development