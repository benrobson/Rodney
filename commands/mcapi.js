const Discord = require('discord.js');
const config = require('../config.json');
const superagent = require('superagent');
const request = require('request');

module.exports.run = async (client, message, args) => {
  const url = "https://status.mojang.com/check"

    request(url, function (err, response, body) {
      if (err) {
        console.log(err);
        return message.reply('Sorry, cannot get Mojang status at this time.');
      }

      body = JSON.parse(body);
      for (status in body) {
        const domain = Object.keys(body[status])[0]
        const connected = body[status][domain];
      }

      const embed = new Discord.RichEmbed().addField(`${Object.keys(body[0])[0]}`,`${body[0]['minecraft.net'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//Minecraft.net
      .addField(`${Object.keys(body[1])[0]}`,`${body[1]['session.minecraft.net'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//session.minecraft.net
      .addField(`${Object.keys(body[2])[0]}`,`${body[2]['account.mojang.com'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//account.mojang.com
      .addField(`${Object.keys(body[3])[0]}`,`${body[3]['authserver.mojang.com'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//authserver.mojang.com
      .addField(`${Object.keys(body[4])[0]}`,`${body[4]['sessionserver.mojang.com'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//sessionserver.mojang.com
      .addField(`${Object.keys(body[5])[0]}`,`${body[5]['api.mojang.com'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//api.mojang.com
      .addField(`${Object.keys(body[6])[0]}`,`${body[6]['textures.minecraft.net'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//textures.minecraft.net
      .addField(`${Object.keys(body[7])[0]}`,`${body[7]['mojang.com'] ? 'Up And Online! :white_check_mark: ' : 'Sorry, But this site appears to be down :x:'}`)//mojang.com
      .setColor(config.green)
      message.channel.send(embed);
  });
};

module.exports.help = {
  name: 'mcapi',
  description: '',
  usage: 'mcapi'
};
