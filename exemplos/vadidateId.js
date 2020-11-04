const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)
const idsValid = env.ids


bot.start(ctx => {
    const from = ctx.update.message.from 
    console.log(from)
    
    idsValid.includes(from.id) ? 
    ctx.reply('Ao seu dispor, mestre!') : 
    ctx.reply('Sinto muito, mas eu só falo com o meu mestre')
})

bot.on('text', async (ctx, next) => {
    const from = ctx.update.message.from 
    
    idsValid.includes(from.id) ?  
    ctx.reply('Fala campeão') : 
    ctx.reply('Sinto muito, mas eu só falo com o meu mestre')
})


bot.startPolling()