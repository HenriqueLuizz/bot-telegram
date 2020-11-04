const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)
const idsValid = env.ids

const gerarBotoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        { columns: 3 }
    )
)

bot.use(session())

const verificarUsuario = (ctx, next) => {
    const mesmoIDMsg = ctx.update.message && idsValid.includes(ctx.update.message.from.id)
    const mesmoIdCallback = ctx.update.callback_query && idsValid.includes(ctx.update.callback_query.from.id)

    mesmoIDMsg || mesmoIdCallback ? next() : ctx.reply('Desculpa, não posso falar com você!')
}

const processando = ({ reply }, next) => reply(`processado...`).then(() => next())

bot.start(verificarUsuario, async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply(`Escreva os itens que você deseja adicionar...`)
    ctx.session.lista = []
})

bot.on('text', verificarUsuario, processando, ctx => {
    let msg = ctx.update.message.text
    ctx.session.lista ? ctx.session.lista.push(msg) : ctx.session.lista = [ msg ]
    ctx.reply(`${msg} adicionado!`, gerarBotoes(ctx.session.lista))
})

bot.action(/delete (.+)/, verificarUsuario, ctx => {
    if (ctx.session.lista) {
        ctx.session.lista = ctx.session.lista.filter(
            item => item != ctx.match[1])
        ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes(ctx.session.lista))
    }
})

bot.startPolling()