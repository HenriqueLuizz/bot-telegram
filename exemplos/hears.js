const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)

bot.hears('pizza', ctx => ctx.reply('Quero!'))
bot.hears(['figado', 'chuchu'], ctx => ctx.reply('Passo!'))
bot.hears('\t', ctx => ctx.reply('Bacon \t'))
bot.hears(/burger/i, ctx => ctx.reply('Quero!'))
bot.hears([/brocolis/i,/salada/i], ctx => ctx.reply('Passo!'))
bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx => {
    moment.locale('pt-BR')
    const data = moment(ctx.match[1], 'DD/MM/YYYY')
    ctx.reply(`${ctx.match[1]} cai no ${data.format('dddd')}`)
})

bot.startPolling()