const Discord = require('discord.js')
const db = require("croxydb")
const links = db.fetch("UptimeLink") || []
const Linkler = db.fetch(`UptimeLink`) || []

module.exports = {
    name: 'ready',
      
    execute(client) {
     
      console.log(`Bot Aktif`)

      setInterval(function () {
        client.user.setActivity(`${Linkler.length} Link Uptime Ediyor!`)
        client.user.setActivity(`YouTube; Erasty`)
        }, 2000)
    }
}
