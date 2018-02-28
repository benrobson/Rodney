const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({disableEveryone: true});

client.on("ready", async () => {
  console.log(`${client.user.username} is online.`);
});

client.login(config.token);
