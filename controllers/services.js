const buttons = require('../config/buttons')
const pg = require('../util/pg')
module.exports = class controller {
  static async services(message,bot){
    try {
      if(message.text=='clean_korzinka'){
        let k = await pg(false,'truncate table korzinka')

        console.log('tozalandi',);
      }else if(message.text=='korzinka'){
        let kor = await pg(false,'select * from korzinka')
      }
      if(message.text=='/start' && message.from.id!==2023671991){
        let k = await pg(false,'truncate table korzinka')

        // await pg(true,`update mahsulotlar set mahsulot_nomi='Shaftolili Sok' where id=35`)

         let users = await pg(false,'select * from users')


         let user = users.find(f => f.id==message.from.id)
         if(!user){
           let u = await pg(true,'insert into users(id,username,name) values($1,$2,$3) returning *',message.from.id,message.from.username,message.from.first_name)
           if(!u) throw new Error(u)
         }
         await  bot.sendPhoto(message.chat.id,'/home/kamron/Pictures/oqtepalavash.jpg',{caption:"Yetkazib berish bo'limi Toshkent shaxrida soat 10:00 dan 3:00 gacha ishlaydi."})
         await  bot.sendMessage(message.from.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)

      }
    } catch (e) {
      bot.sendMessage(2023671991,e.message)
    }
  }
}
