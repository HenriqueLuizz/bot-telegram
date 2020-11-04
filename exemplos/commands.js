const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${name}!\n\nAvise se precisar de /ajuda`)
})

bot.command('ajuda', ctx => ctx.reply('/ajuda: vou te mostrar as opções'
        + '\n/ajuda2: para testar via hears'
        + '\n/op2: Opção genérica'
        + '\n/op3: Outra opção genérica qualquer'))

bot.hears('/ajuda2', ctx => ctx.reply('Eu também consigo capturar commandos, mas a forma que deve ser utilizado é /ajuda'))
bot.hears(/\/op(2|3)/i, ctx => ctx.reply('Resposta padrão para comandos genéricos'))
bot.hears(/\/op\d+/i, ctx => ctx.reply('Resposta padrão para comandos genéricos'))

bot.startPolling()