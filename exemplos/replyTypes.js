const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}! 👀`)
    await ctx.replyWithHTML(`Destacado a mensagem <b>HTML</b> 
    <i>de varias</i> <code>formas</code> || <pre>possíveis</pre>
    <a href="https://pt.piliapp.com/emoji/list/">Lista de Emoji</a>`)
    await ctx.replyWithMarkdown('Destacando com *Markdown* _de varias_ `formas` ```possiveis```')
    await ctx.replyWithPhoto({ source: `${__dirname}/bot.png`})
    await ctx.replyWithPhoto('https://upload.wikimedia.org/wikipedia/commons/9/9a/Wikipedia_Bots.png',
    {caption: 'Essa imagem eu peguei no wikimedia'})
    await ctx.replyWithPhoto({ url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Wikipedia_Bots.png'})
    await ctx.replyWithLocation(-23.541828, -46.318507)
    await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v')
}) 

bot.startPolling()