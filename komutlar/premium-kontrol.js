const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const ms = require('ms')
const moment = require('moment')
require('moment-duration-format')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('premium-kontrol')
    .setDescription('Premium üyeliğinizin olup, olmadığı hakkında bilgi verir.')
    .setDMPermission(false),
              
    async execute(client, interaction) {   
     
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)
      
      if(PremiumÜye) {
        if(db.fetch(`Premium_${interaction.user.id}`)) {
          
      const PremiumAktif = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`<:Yes:1122994864049619127>> **Premium üyeliğiniz bulunmaktadır. Premiumun bitişine kalan zaman:** ${moment.duration(db.fetch(`Premium_${interaction.user.id}`).Bitiş - Date.now()).format('w [hafta] d [gün] h [saat] m [dakika] s [saniye]')}`)
        
      interaction.reply({embeds: [PremiumAktif]}) 
      
      } else {
        
        const PremiumVar = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`<:Yes:1122994864049619127> **Premium üyeliğiniz bulunmaktadır. Premiumun bitişine kalan zaman:** Süresiz`)
        
        interaction.reply({embeds: [PremiumVar]})
        
      }
      } else {
      
       const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.gg/RT62RZssJm`)
        .setLabel("Destek sunucusu")
        .setStyle("Link"))
      
      const PremiumDeaktif = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`<:No:1122993152064765973> **Premium üyeliğiniz bulunmamaktadır, Premium üyelik almak için destek sunucusuna gelebilirsiniz.**`)
        
      interaction.reply({embeds: [PremiumDeaktif], components: [Destek]}) 
      
        }
    }
}