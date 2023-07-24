const Discord = require('discord.js')
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-sil')
    .setDescription('Sistemden link silersiniz.')
    .setDMPermission(false),
  
    async execute(client, interaction) { 
      
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`<:Yes:1122994864049619127> **Projen başarıyla sistemden silindi.**`)
    
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://erasty-uptime.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi);
      
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      await interaction.showModal(LinkSilmeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linksilmeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
      
     // if(!PremiumÜye) {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
     
     /* } else {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`PremiumUptimeLink`, linkInput)
        
      }*/
        interaction.reply({embeds: [LinkSilindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:No:1122993152064765973>"
        } else {
        PreVarmı = "<:Yes:1122994864049619127>"
        }
  
        const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Sistemden bir link silindi")
         .addFields({name: `<:Kullanici:1122992989325766748> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:Isim:1122979100689174661> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:Id:1122977905727778846> **Kullanıcı id**`, value: `${interaction.user.id}`})
         .addFields({name: `<:Belge:1098184485524230144> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:Link:1122988494680232077> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
         .addFields({name: `<:Premium:1122993100332204146> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1112800957995167824").send({embeds: [ProjeSilindi]})
        
      })  
   }
}