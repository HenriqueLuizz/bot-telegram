const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoTasks = Markup.keyboard([
    ['Iniciar Instâncias', 'Parar Instâncias', 'Reiniciar Instancias'],
    ['Habilitar Serviços', 'Desabilitar Serviços', 'Status Serviços'],
    ['Status Servidor Primario', 'Agendar Rotina']
]).resize().extra()

const mostrarTeclado = Markup.keyboard(['Sim', 'Não']).resize().oneTime().extra()

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`)
    await ctx.reply(`Deseja que eu te mostre o teclado de opções?`, mostrarTeclado)
})

bot.hears(['Sim', 'Não'], async ctx => {
    ctx.match == 'Sim' ? await ctx.reply(`Aqui está o teclado`, tecladoTasks) : await ctx.reply(`Ok!`)
})

bot.hears('Iniciar Instâncias', ctx => ctx.reply('Vou iniciar as instâncias agora!'))
bot.hears('Parar Instâncias', ctx => ctx.reply('Vou parar as instâncias agora!'))
bot.hears('Reinicar Instâncias', ctx => ctx.reply('Vou reiniciar as instâncias agora!'))
bot.hears('Habilitar Serviços', ctx => ctx.reply('Vou habilitar os serviços agora!'))
bot.hears('Desabilitar Serviços', ctx => ctx.reply('Vou desabilitar os serviços agora!'))

bot.on('text', ctx => ctx.reply('Desculpa, ainda estou escrevendo essa rotina... \nAssim que estiver disponível você será o primeiro a ser avisado.\n\nExibir as opções?', mostrarTeclado))

bot.startPolling()