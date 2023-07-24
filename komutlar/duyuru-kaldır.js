const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
  slash: true,                                
  cooldown: 5,                              

    data: new SlashCommandBuilder()         
      .setName('duyuru-kaldır')
      .setDescription('Sistemdeki bir duyuruyu kaldırır.')
      .setDMPermission(false)
      .addStringOption(option =>
        option
          .setName('duyuru')
          .setDescription('Kaldırılacak duyuruyu belirtin.')
          .setRequired(true)),
      
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()
        .setDescription(`**<:No:1122993152064765973> Bu komutu kullanabilmek için \`Bot sahibi\` olmalısın.**`)
        .setColor('Red')
      
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]})
      }
      
      const duyuru = interaction.options.getString('duyuru')
        
      const Duyurular = db.fetch(`Duyurular`, [])
      if(!Duyurular.includes(duyuru)) {
      
      const DuyuruYok = new EmbedBuilder()
        .setDescription(`**<:No:1122993152064765973> Sistemde \`${duyuru}\` adında bir duyuru bulunmuyor.**`)
        .setColor('Red')
      interaction.reply({embeds: [DuyuruYok]})
       
      } else {
      
      const Embed = new EmbedBuilder()
        .setDescription(`**<:Yes:1122994864049619127> \`${duyuru}\` adlı duyuru sistemden kaldırıldı.**`)
        .setColor("Green")
      interaction.reply({embeds: [Embed]})
       
      db.unpush(`Duyurular`, `${duyuru}`)
   
    }
  }
}