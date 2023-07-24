const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-ekle')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteye eklenecek kullanıcıyı belirtin.')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('sebep')
            .setDescription('Karalisteye ekleme sebebini belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
     
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
        
      const KaralisteAlınamaz = new EmbedBuilder()
        .setDescription(`<:No:1122993152064765973> **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
      
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const sebep = interaction.options.getString('sebep');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteEklendi = new EmbedBuilder()
      .setDescription(`<:Yes:1122994864049619127> ${kullanıcı} **adlı kullanıcı karalisteye eklendi, artık botu kullanamayacak.**`)
      .setColor('Green')
      
      const KaralisteyeAlındı = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bir kullanıcı karalisteye eklendi")
         .addFields({name: ` **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: ` **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: ` **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: ` **Yetkili adı**`, value: `${interaction.user}`})
         .addFields({name: ` **Yetkili tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: ` **Yetkili id**`, value: `${interaction.user.id}`})
         .addFields({name: ` **Karaliste eklenme sebebi**`, value: `${sebep}`})
      
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteAlınamaz]})
     
      if(!Karaliste) {
        
      db.set(`Karaliste_${kullanıcı.id}`, true)
      db.set(`KaralisteSebep_${kullanıcı.id}`, sebep)
    //  db.delete(`UptimeLink_${kullanıcı.id}`)
      interaction.reply({embeds: [KaralisteEklendi]})
      client.channels.cache.get("1094246311424950292").send({embeds: [KaralisteyeAlındı]})
     
      } else {
  
      const KaralistedeVar = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> ${kullanıcı} **adlı kullanıcı zaten karalistede bulunuyor.**`)
      .setColor('Red')
      
      interaction.reply({embeds: [KaralistedeVar]})
  
       }
    }
}


