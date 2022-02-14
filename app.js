const TOKEN = require('./config/env').token
const pg = require('./util/pg')
const telegram_bot = require("node-telegram-bot-api")
const bot = new telegram_bot(TOKEN,{
  polling:true
})

const controllers = require('./controllers/services')
const controller_service = require('./controllers/type_services')
bot.on('callback_query', async message=>{

     controller_service.buyurtma_berish(message,bot)

})
bot.on('contact',message=>{
  controller_service.buyurtma_berish(message,bot)
})
bot.on('location',message =>{
  controller_service.buyurtma_berish(message,bot)

})
bot.on('text',async (message)=>{

     controllers.services(message,bot)
     controller_service.buyurtma_berish(message,bot)

})
