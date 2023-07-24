const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-çıkart')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteden çıkartılacak kullanıcıyı belirtin.')
            .setRequired(true)),
              
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()
         .setDescription(`<:No:1122993152064765973> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
         .setColor('Red')
        
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteÇıkartılmaz = new EmbedBuilder()
        .setDescription(`<:No:1122993152064765973> **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
      
      const KaralisteGitti = new EmbedBuilder()
      .setDescription(`<:Yes:1122994864049619127> ${kullanıcı} **adlı kullanıcı karalisteden çıkartıldı, artık botu kullanabilir.**`)
      .setColor('Green')
      
      const KaralistedenÇıkartıldı = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Bir kullanıcı karalisteden çıkartıldı")
         .addFields({name: ` **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: ` **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: ` **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: ` **Yetkili adı**`, value: `${interaction.user}`})
         .addFields({name: ` **Yetkili tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: ` **Yetkili id**`, value: `${interaction.user.id}`})
       
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteÇıkartılmaz]})
     
      if(!Karaliste) {
        
        const KaralistedeYok = new EmbedBuilder()
           .setDescription(`:x: ${kullanıcı} **adlı kullanıcı zaten karalistede bulunmuyor.**`)
           .setColor('Red')
        
        interaction.reply({embeds: [KaralistedeYok]})
      
      } else {
       
        db.delete(`Karaliste_${kullanıcı.id}`)
        db.delete(`KaralisteSebep_${kullanıcı.id}`)
        interaction.reply({embeds: [KaralisteGitti]})
        client.channels.cache.get("1097944716676436060").send({embeds: [KaralistedenÇıkartıldı]})
        
        }
    }
}