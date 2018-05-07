const Discord = require('discord.js');
const config = require('./config.json');
const token = require('./token.json');
const client = new Discord.Client({disableEveryone: true});
const fs = require('fs');
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);

// Reads all commands and boots them in
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Couldn\'t find commands.');
    return
  }

jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`${files} has been loaded.`);
    client.commands.set(props.help.name, props);
  })
});

// Voice Channel assign Role
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let oldUserChannel = oldMember.voiceChannel;
  let newUserChannel = newMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    console.log('User Joins a voice channel');

  } else if (newUserChannel === undefined){
    console.log('User leaves a voice channel');
  }
});

// Message Guild Event
client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client,message,args);

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


  if (message.content.startsWith(config.prefix + 'list')) {

    const List = message.guild.emojis.map(e => e.toString()).join(" ");

    const EmojiList = new Discord.MessageEmbed() //Embed Constructor || If lower than v12.0.0 | Use RichEmbed
        .setTitle('➠ Emoji\'s') //Title
        .setAuthor(message.guild.name, message.guild.iconURL `https://cdn.discordapp.com/attachments/383886042178256909/397988796186230784/4zBNFjA8S9yjNB_ONwqBvxTvyXYdC7Nh1jYZ2x6YEcldBr2fyijdjM2J5EoVdTpnkAw300.png`) //<Guild> Name, Icon URL || If <Guild> Icon => Null Sends Custom Image URL
        .setColor('RANDOM') //Random colour || Any HexCode Can be used Instead
        .setDescription(List) //Here will List of Emoji's
        .setTimestamp() //The timestamp of this embed
        .setFooter(message.guild.name) //Change To Anything As You Wish
    message.channel.send(EmojiList) //Sends to Channel
  };
});


client.login(token.token);
