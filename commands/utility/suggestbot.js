const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const crypto = require("crypto");
const webhookClient = new Discord.WebhookClient('827490109066051614', 'C_JL4Dm0DoJUHTqq5bXHrEnvyinI1d92ydr5PgI6qfzRLvgK56zyhYJ7AbDU3-XhmqNR');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'suggestbot',
        aliases: [ 'botsuggest' ],
        description: `Suggest a new feature for Pogy!`,
        category: 'Utility',
        examples: [ 'suggest Can you add music Please!' ],
        cooldown: 60
      });
    }

    async run(message, args) {

             const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)

      var id = crypto.randomBytes(4).toString('hex');
      
      if (args.length < 1) {
        return message.channel.send( new MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.suggest1}`));

      }
    
      if (args.length < 3) {
        return message.channel.send( new MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.suggest2}`));
      }

//args.join(' ').split('').join('')
let invite = await message.channel.createInvite({
  maxAge: 0,
  maxUses: 0
}).catch(() => {});

let report = args.join(' ').split('').join('')
      const embed = new MessageEmbed()
      .setTitle('New Suggestion')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(report) 
      .addField('User', message.member, true)
      .addField('User username', message.member.user.username, true)
      .addField('User ID', message.member.id, true)
      .addField('User Tag', message.member.user.tag, true)
      .addField('Server',  `[${message.guild.name}](${invite ||'none '})`, true)
      .addField('Feedback ID:', `#${id}`, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('GREEN');

      const confirmation = new MessageEmbed()
      .setTitle('Bot Suggestions')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${language.suggest3} Support [**Server**](https://discord.gg/FqdH4sfKBg)`)
      .addField('Member', message.member, true)
      .addField('Message', report, true)
      .addField('Suggestion ID:', `#${id}`, true)
      .setFooter(`https://pogy.xyz`)
      .setTimestamp()
      .setColor('GREEN');
     
        
      webhookClient.send({
        username: 'Pogy Suggestions',
        avatarURL: `${message.client.domain}/logo.png`,
        embeds: [embed],
           });
           
           message.delete().catch(()=>{})
           message.author.send(confirmation).catch(()=>{})
        
          
    }
};