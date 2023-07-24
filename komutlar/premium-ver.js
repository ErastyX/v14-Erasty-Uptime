const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('premium-ver')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Premium verilecek kullanıcıyı belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:No:1122993152064765973> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
        
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "1059475189588570122"){
      return interaction.reply({embeds: [YetkiYok]});
}
      
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const PremiumÜye = db.fetch(`PremiumÜye_${kullanıcı.id}`);
      
      const PremiumEklendi = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`<:Yes:1122994864049619127> ${kullanıcı} **adlı kullanıcıya premium verildi.**`)
        
      const PremiumVar = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`<:No:1122993152064765973> ${kullanıcı} **adlı kullanıcının zaten premium üyeliği bulunuyor.**`)
        
      const PremiumVerildi = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Bir kullanıcıya premium verildi")
         .addFields({name: `<:Kullanici:1122992989325766748> **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: `<:Isim:1122979100689174661> **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: `<:Id:1122977905727778846> **Kullanıcı id**`, value: `${kullanıcı.id}`})
      
      if(!PremiumÜye) {
      
      db.set(`PremiumÜye_${kullanıcı.id}`, true)
      interaction.reply({embeds: [PremiumEklendi]})
      client.channels.cache.get("1112800957995167824").send({embeds: [PremiumVerildi]})
      db.add(`PremiumSayı`, 1)
      
      } else {
   
      interaction.reply({embeds: [PremiumVar]})
      
        }
    }
}