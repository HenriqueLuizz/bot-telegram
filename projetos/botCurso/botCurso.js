const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf(env.token)


const tecladoOpcoes = Markup.keyboard([
    ['O que são bots?', 'O que verei no curso?'],
    ['Posso mesmo automatizar tarefas?'],
    ['Como comprar o curso?']
]).resize().extra()

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')
], {columns: 2}))

const localizacao = Markup.keyboard([
    Markup.locationRequestButton('Clique aqui para enviar a sua localização')
]).resize().oneTime().extra()

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do Curso`)
    // await ctx.replyWithPhoto('http://files.cod3r.curso')
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes)
})

bot.hears('O que são bots?', ctx => {
    ctx.replyWithMarkdown('Bots... são... \n_Algo mais?_', tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx => {
    await ctx.replyWithMarkdown('No *curso* ... tem *3 projetos:*')
    await ctx.reply('1. Um bot que vai gerenciar a sua lista de compras')
    await ctx.reply('2. Um bot que vai te permitir cadastrar seus eventos')
    await ctx.reply('3. E você verá como eu fui feito')
    await ctx.replyWithMarkdown('\n\n_Algo mais?_', tecladoOpcoes)
})

bot.hears('Posso mesmo automatizar tarefas?', async ctx => {
    await ctx.replyWithMarkdown('Claro que sim... \nquer saber mais?',botoes)

})
bot.hears('Como comprar o curso?', ctx => {
    ctx.replyWithMarkdown('Acessa o link e procura no internet... \nquer saber mais?',tecladoOpcoes)
})

bot.action('n', ctx => {
    ctx.reply('Ok...', tecladoOpcoes)
})

bot.action('s', async ctx => {
    await ctx.reply('Legal... me mande a sua localizaçao ou me mande alguma mensagem', localizacao)
})

bot.hears(/mensagem qualquer/ig, async ctx => {
    await ctx.reply('Boa...', tecladoOpcoes)
})

bot.on('text', async ctx => {
    let msg = ctx.message.text
    msg = msg.split('').reverse().join('')
    await ctx.reply(`A sua mensagem, ao contrario é: ${msg}`)
    await ctx.reply(`Eu sei ler as mensagem...`, tecladoOpcoes)
})

bot.on('location', async ctx => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather'
        const { latitude: lat, longitude: lon} = ctx.message.location
        const res = await axios.get(`${url}?lat=${lat}&lon=${lon}&appid=6799894af2851f762bfc285660d26c29&units=metric`)
        await ctx.reply(`Hum... Você está em ${res.data.name}`)
        await ctx.reply(`a temperatura ai está em ${res.data.main.temp}˚C`)
    } catch (error) {
        await ctx.reply('Tive problema em buscar a sua localizaçao na outra api...', tecladoOpcoes)
        
    }
})

bot.startPolling()
