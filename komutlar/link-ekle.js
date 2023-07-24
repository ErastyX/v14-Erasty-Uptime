const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-ekle')
    .setDescription('Sisteme link eklersiniz.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
  
const LinkEklemeFormu = new ModalBuilder()
    .setCustomId('linkeklemeform')
    .setTitle('Link ekle')
const LinkEkleFormu = new TextInputBuilder()
    .setCustomId('linkekle')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const LinkEklemeSistemi = new ActionRowBuilder().addComponents(LinkEkleFormu);
LinkEklemeFormu.addComponents(LinkEklemeSistemi);
      
const PreYok = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Normal bir kullanıcı en fazla 3 proje ekleyebilir, Destek sunucusuna gelerek link limitinizi arttırabilir veya premium alarak sınırsız link ekleme hakkı kazanabilirsiniz.**`)
    
const FazlaLink = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Bir kullanıcı tarafından en fazla 999 link eklenebilir.**`)
   
const LinkVar = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Belirtilen proje sistemde bulunuyor.**`)
    
const BaşıHatalı = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Proje linkin hatalı, linkin başında \`https://\` olduğundan emin ol.**`)
    
const SonuHatalı = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Yalnızca glitch projeleri aktif tutulmaktdır, linkin sonunda \`.glitch.me\` olduğundan emin ol.**`)
    
const LinkEklendi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`<:Yes:1122994864049619127> **Projen başarıyla sisteme eklendi, linkiniz 2-5 dk içerisinde aktif olacaktır.**`)
        
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973> **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`<:Yes:1122994864049619127> **Projen başarıyla sistemden silindi.**`)
    
const Silindi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`<:Yes:1122994864049619127> **Proje başarıyla sistemden silindi.**`)
    
const ProjeEklenmemiş = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`<:No:1122993152064765973>  **Sisteme hiç proje eklememişsin.**`)
      await interaction.showModal(LinkEklemeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linkeklemeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      
      if (!db.fetch(`UptimeLink_${interaction.user.id}`)) {
           db.set(`UptimeLink_${interaction.user.id}`, [])
        }
        const link = interaction.fields.getTextInputValue("linkekle")
        let link2 = db.fetch(`UptimeLink_${interaction.user.id}`, [])

        const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)

        if(!link) return

        if(PremiumÜye) {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= 999) {
                return interaction.reply({embeds: [FazlaLink]}).catch(e => { })
            }

        } else {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= Limit) {
                return interaction.reply({embeds: [PreYok]}).catch(e => { })}
          }

        if (link2.includes(link)) {
            return interaction.reply({embeds: [LinkVar]}).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({embeds: [BaşıHatalı]}).catch(e => { })
        }

        if (!link.endsWith(".glitch.me")) {
            return interaction.reply({embeds: [SonuHatalı]}).catch(e => { })
        }
      //if(!PremiumÜye) {
        
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`UptimeLink`, link)
      
     /* } else {
        
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`PremiumUptimeLink`, link)
        
      }*/
        interaction.reply({embeds: [LinkEklendi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:No:1122993152064765973>"
        } else {
        PreVarmı = "<:Yes:1122994864049619127>"
        }
      
     
        const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Sistemden bir link eklendi")
         .addFields({name: `<:Kullanici:1122992989325766748> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:Isim:1122979100689174661> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:Id:1122977905727778846> **Kullanıcı id**`, value: `${interaction.user.id}`})
         .addFields({name: `<:Belge:1122988494680232077> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:Link:1122988494680232077> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
         .addFields({name: `<:Premium:1122993100332204146> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1112800957995167824").send({embeds: [ProjeSilindi]})
        
      })  
   }
}