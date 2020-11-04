const env = require('../.env')
const Telegraf = require('telegraf')
const axios = require('axios')
const bot = new Telegraf(env.token)

bot.on('voice', async ctx => {
    const id = ctx.update.message.voice.file_id
    const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithVoice({ url: `${env.apiFile}/${res.data.result.file_path}` })
})

bot.on('photo', async ctx => {
    const id = ctx.update.message.photo[0].file_id
    const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
    ctx.replyWithPhoto({ url: `${env.apiFile}/${res.data.result.file_path}` })
})

bot.startPolling()