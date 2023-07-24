const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true, 
    yetki: 'Administrator',
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('uptime-sistemi-kur')
    .setDescription('Uptime sistemini sunucunuzda ayarlar.')
    .setDMPermission(false)
    .addChannelOption(option =>
        option
            .setName('kanal')
            .setDescription('Uptime sisteminin kurulacağı kanalı belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
        
      const kanal = interaction.options.getChannel('kanal');
      const Sistem = db.fetch(`UptimeSistemi_${interaction.guild.id}`)
      
      if(!Sistem) {
          
        const SistemAçıldı = new EmbedBuilder()
             .setColor("Green")
             .setDescription(`<:Yes:1122994864049619127> Uptime kanalı başarıyla <#${kanal.id}> olarak ayarlandı.`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blue")
             .setImage("https://cdn.discordapp.com/attachments/1112643961392209981/1132472847386816552/Picsart_23-07-23_03-42-28-909.png")
             .setDescription("**Uptime Sistemi | Uptime System** \n")
.addFields({name: "<:Tr:1126168752992550963>", value: "<:Poltika:1132425331589009419> | Gizlilik ve Güvenlik politikamızı destek sunucumuzdan görebilirsin! \n <:Ekle:1132419170596831232> | Link eklemek için: **Ekle | Add** \n <:Sil:1132424813705711747> | Linkinizi silmek için: **Sil | Delete** \n <:Liste:1132425047731085333> | Linklerinizi görmek için: **Liste | List** \n <:Help:1132425356184387634> | Aradığınızı bulamadıysanız veya öneriniz varsa sizi destek sunucumuza bekleriz. \n "}, {name: "<:Us:1126168782130380891>", value: "<:Poltika:1132425331589009419> | You can view our Privacy and Security policy on our support server! \n <:Ekle:1132419170596831232> | To add link: **Ekle | Add** \n <:Sil:1132424813705711747> | To remove your links: **Sil | Delete** \n <:Liste:1132425047731085333> | To see your links: **Liste | List** \n <:Help:1132425356184387634> | If you didn't find what you were looking for or if you have a suggestion, we welcome you to our support server."})
        
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
     
        const Butonlar = new ActionRowBuilder() 
           .addComponents(new Discord.ButtonBuilder()
           .setEmoji("<:Ekle:1132419170596831232>")
           .setLabel("Ekle")
           .setStyle(ButtonStyle.Success)
           .setCustomId("eklebuton"),
          new Discord.ButtonBuilder()
           .setEmoji("<:Sil:1132424813705711747>")
           .setLabel("Sil")
           .setStyle(ButtonStyle.Danger)
           .setCustomId("silbuton"),
           new Discord.ButtonBuilder()
           .setEmoji("<:Liste:1132425047731085333>")
           .setLabel("Liste")
           .setStyle(ButtonStyle.Primary)
           .setCustomId("listebuton"),
           new Discord.ButtonBuilder()        
        .setURL(`https://discord.gg/RT62RZssJm`)
        .setLabel(`Destek sunucusu`)
        .setStyle("Link"))
        
        client.channels.cache.get(kanal.id).send({embeds: [SistemMesajı], components: [Butonlar]})
        
        db.set(`UptimeSistemi_${interaction.guild.id}`, kanal.id)
          
        } else {
           
        const SistemAçık = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`<:No:1121426474856087632> Uptime sistemi zaten kurulu. Sıfırlamak için </uptime-sistemi-sıfırla0>`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}