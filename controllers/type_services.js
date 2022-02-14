const buttons = require('../config/buttons')
let msg_id = null
const read = require('../config/read_data')
const write = require('../config/write_data')
const fs = require('fs')
const path = require('path')
const pg = require('../util/pg')
module.exports = class controller {

  static async buyurtma_berish(message,bot){

      try {
        let tanlaganlar = {}
          if(['<pitsadan_orqaga','<ichimliklardan_orqaga','<desertdan_orqaga','<salatdan_orqaga'].includes(message.data)){
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await  bot.sendMessage(message.message.chat.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)

          }
          if(['/pizza','/ichimliklar','/desert','/salatlar'].includes(message.data)){
            if(message.message.message_id-1 && message.message.message_id ){
               // await bot.deleteMessage(message.from.id,message.message.message_id-1)
               await bot.deleteMessage(message.from.id,message.message.message_id)
            }
            switch (message.data) {
              case '/pizza':
                await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','pizza.jpg'))
                await bot.sendMessage(message.from.id,"🍕Pitsa bo'limi",buttons.button2)
                break;
              case '/ichimliklar':
                  await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','ichimliklar.jpg'))
                  await bot.sendMessage(message.from.id,"🥤Ichimliklar bo'limi",buttons.button3)
                  break;
              case '/desert':
                  await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','desert.jpg'))
                  await bot.sendMessage(message.from.id,"🧁Desert bo'limi",buttons.button4)
                  break;
              case '/salatlar':
                  await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','salat.jpg'))
                  await bot.sendMessage(message.from.id,"🥗Salatlar bo'limi",buttons.button5)
                  break;
            }


          }
           if(['Kombo','Margarita','Pepperoni',"Qoziqorinli","Ananasli","Qazili"].includes(message.data)){
               let buyurtma = {
                 user_id:message.from.id,
                 mahsulot_nomi:message.data,
                 mahsulot_turi:'pitsa',
                 soni:0
               }
               // let o = await pg(true,`delete from korzinka where mahsulot_nomi='kombo'`)
               let korzinka = await pg(false,'select * from korzinka where user_id=$1',message.from.id)



               let b = korzinka.find(f => f.user_id==buyurtma.user_id && f.mahsulot_turi==buyurtma.mahsulot_turi && f.holat=='tasdiqlangan')
               if(!b){
                 let buyurtma_qilish = await pg(true,'insert into korzinka(user_id,mahsulot_nomi,mahsulot_turi,soni,holati) values($1,$2,$3,$4,$5)',buyurtma.user_id,message.data,buyurtma.mahsulot_turi,buyurtma.soni,'tasdiqlanmagan')
               }



               await bot.deleteMessage(message.from.id,message.message.message_id-1)
               await bot.deleteMessage(message.from.id,message.message.message_id)
               await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','pizza.jpg'))
               await bot.sendMessage(message.from.id,`Siz tanlagan pitsa turi :${buyurtma.mahsulot_nomi}\tSoni:${0}`)
               await bot.sendMessage(message.from.id,`Nechta buyurtirmoqchi ekaningizni tanlang: `,buttons.button6)



          }
          if(['pitsa_0','pitsa_1',"pitsa_2","pitsa_3","pitsa_4","pitsa_5","pitsa_6","pitsa_7","pitsa_8","pitsa_9"].includes(message.data)){
            let buyurtma = await pg(false,`select * from korzinka where user_id = $1 `,message.from.id)
            console.log(buyurtma);
            buyurtma = buyurtma.find(f => f.mahsulot_turi=='pitsa' && f.holati=='tasdiqlanmagan')
            let son = (buyurtma.soni || "").toString() +  message.data.split('_')[1].toString()
            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='pitsa' and holati='tasdiqlanmagan' returning *`,son,message.from.id)
            console.log(update);
            await  bot.editMessageText(`Siz tanlagan pitsa turi :${update.mahsulot_nomi}\tSoni:${son}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


          }
          if(message.data == 'pitsa_-'){

            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='pitsa' returning *`,0,message.from.id)
            await  bot.editMessageText(`Siz tanlagan pitsa turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


          }
          if(['pitsani_tasdiqlash','sokni_tasdiqlash','colani_tasdiqlash','suv_tasdiqlash','desert_tasdiqlash','salat_tasdiqlash'].includes(message.data)){
            switch (message.data) {
              case 'pitsani_tasdiqlash':
                    await pg(true,`update korzinka set holati=$1 where user_id=$2 and mahsulot_turi='pitsa' and holati='tasdiqlanmagan' returning *`,'tasdiqlangan',message.from.id)
                    break;
              case 'sokni_tasdiqlash':
                    await pg(true,`update korzinka set holati=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,'tasdiqlangan',message.from.id)
                    break;
              case 'colani_tasdiqlash':
                    await pg(true,`update korzinka set holati=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,'tasdiqlangan',message.from.id)
                    break;
              case 'suv_tasdiqlash':
                    await pg(true,`update korzinka set holati=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,'tasdiqlangan',message.from.id)
                    break;
              case 'desert_tasdiqlash':
                    await pg(true,`update korzinka set holati=$1 where user_id=$2 and mahsulot_turi='desert' and holati='tasdiqlanmagan' returning *`,'tasdiqlangan',message.from.id)
                    break;
              case 'salat_tasdiqlash':
                    await pg(true,`update korzinka set holati=$1 where user_id=$2 and mahsulot_turi='salat' and holati='tasdiqlanmagan' returning *`,'tasdiqlangan',message.from.id)
                    break;
            }
            await bot.deleteMessage(message.from.id,message.message.message_id-2)
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            bot.sendMessage(message.from.id,"Yana nimadir buyurtirishni xohlaysizmi?\nAgar boshqa buyurtma bo'lmasa savatdagilarni tasdiqlab buyurtmani kuting\n😊Yoqimli ishtaha",buttons.button13)

          }
          if(message.data == 'buyurtmani_tasdiqlash'){
            await bot.deleteMessage(message.from.id,message.message.message_id)
            let sonlar = {
              0:'0️⃣',1:'1️⃣',2:'2️⃣',3:'3️⃣',4:'4️⃣',5:'5️⃣',6:'6️⃣',7:'7️⃣',8:'8️⃣',9:'9️⃣',10:'🔟'
            }
            let buyurtma = await pg(false,'select * from korzinka where user_id = $1',message.from.id)
            let mahsulotlar = await pg(false,'select * from mahsulotlar')
            let mahsulot_id = []

            let order = ``
            let counter = 1
            let umumiy_summa = 0
            for(let i of buyurtma){
                 // console.log(i);
               if(i.soni!==0 && i.soni!=='0'){
                 order += "\t\t\n\n"+sonlar[counter] + i.mahsulot_nomi + '\n' + "Narxi : "+i.soni*mahsulotlar.find(f => f.mahsulot_nomi==i.mahsulot_nomi).mahsulot_narxi + " so'm" +`\nSoni : ${i.soni}`
                 umumiy_summa += +mahsulotlar.find(f => f.mahsulot_nomi==i.mahsulot_nomi).mahsulot_narxi * i.soni
                 counter++
               }
            }
            if(order!==""){
              bot.sendMessage(message.from.id,order + "\n\n"+"Umumiy Narxi : "+umumiy_summa+" so'm",buttons.button17,{parse_mode:"Markdown"})
            }else{
              bot.sendMessage(message.from.id,"Savat Bo'sh",buttons.button20)
            }
            // await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/pizza.jpg')
 /////////////buyurtma tasdiqlash
          }
          if(message.data=='nazad'){
            await pg(true,'delete from korzinka where user_id=$1',message.from.id)

            await bot.deleteMessage(message.from.id,message.message.message_id)
            await  bot.sendMessage(message.from.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)

          }
          if(message.data=='buyurtmani bekor qilish'){
            await pg(true,'delete from korzinka where user_id=$1',message.from.id)
            await  bot.sendMessage(message.from.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)

          }
          if(['Cola','Suv','Sok','Choy','Kofe'].includes(message.data)){
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)

            switch(message.data){
              case 'Cola':
                await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','cola.jpg'))
                await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button7)
                break;
              case 'Pepsi':
                await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','cola.jpg'))
                await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button7)
                break;
              case 'Suv':
                  await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','suv.jpg'))
                  await bot.sendMessage(message.from.id,`💧Bo'lim ${message.data} `,buttons.button8)
                  break;
              case 'Sok':
                  await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','sok.jpg'))
                  await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button9)
                  break;
              case 'Kofe':
                  await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','kofe.jpg'))
                  await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button10)
                  break;
              case 'Choy':
                  await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/choy.jpg')
                  await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button11)
                  break;
            }

          }
          if(['0.5L Mineral','1.5L Mineral'].includes(message.data)){
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)

            let buyurtma = {
              user_id:message.from.id,
              mahsulot_nomi:message.data,
              mahsulot_turi:'ichimlik',
              soni:0
            }
            let korzinka = await pg(false,`select * from korzinka where user_id=$1 and holati='tasdiqlanmagan'`,message.from.id)
            let b = korzinka.find(f => f.user_id==buyurtma.user_id && f.mahsulot_nomi==buyurtma.mahsulot_nomi)
            if(!b){
              let buyurtma_qilish = await pg(true,'insert into korzinka(user_id,mahsulot_nomi,mahsulot_turi,soni,holati) values($1,$2,$3,$4,$5)',buyurtma.user_id,message.data,buyurtma.mahsulot_turi,buyurtma.soni,'tasdiqlanmagan')
            }

            await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/suv.jpg')
            await bot.sendMessage(message.from.id,`Siz tanlagan suv turi :${buyurtma.mahsulot_nomi}\tSoni:${0}`)
            await bot.sendMessage(message.from.id,`Nechta buyurtirmoqchi ekaningizni tanlang: `,buttons.button16)


          }
          if(message.data=='suv_-'){

            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,0,message.from.id)
            await  bot.editMessageText(`Siz tanlagan suv turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})

          }
          if(message.data=='suv_turidan_orqaga'){
            await pg(true,`delete from korzinka where user_id=$1 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan'`,message.from.id)
            await bot.deleteMessage(message.from.id,message.message.message_id-2)

            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/suv.jpg')
            await bot.sendMessage(message.from.id,"💧Suv bo'limi",buttons.button8)
          }
          if(['suv_1','suv_2','suv_3',"suv_4","suv_5","suv_6","suv_7","suv_8","suv_9",'suv_0'].includes(message.data)){

            let buyurtma = await pg(false,`select * from korzinka where user_id = $1 and mahsulot_turi='ichimlik' `,message.from.id)
            buyurtma = buyurtma.find(f => f.mahsulot_turi=='ichimlik' && f.holati=='tasdiqlanmagan')
            let son = (buyurtma.soni || "").toString() +  message.data.split('_')[1].toString()
            if(son!==0 && son!=='0'){
              let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,son,message.from.id)
              await  bot.editMessageText(`Siz tanlagan suv turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})



            }

          }


          if(['0.5L Cola','1L Cola','1.5L Cola','Razliv'].includes(message.data)){
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)

            let buyurtma = {
              user_id:message.from.id,
              mahsulot_nomi:message.data,
              mahsulot_turi:'ichimlik',
              soni:0
            }
            // let o = await pg(true,`delete from korzinka where mahsulot_nomi='kombo'`)
            let korzinka = await pg(false,`select * from korzinka where user_id=$1 and holati='tasdiqlanmagan'`,message.from.id)
            let b = korzinka.find(f => f.user_id==buyurtma.user_id && f.mahsulot_nomi==buyurtma.mahsulot_nomi)
            if(!b){
              let buyurtma_qilish = await pg(true,'insert into korzinka(user_id,mahsulot_nomi,mahsulot_turi,soni,holati) values($1,$2,$3,$4,$5)',buyurtma.user_id,message.data,buyurtma.mahsulot_turi,buyurtma.soni,'tasdiqlanmagan')
            }

            await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/cola.jpg')
            await bot.sendMessage(message.from.id,`Siz tanlagan cola turi :${buyurtma.mahsulot_nomi}\tSoni:${0}`)
            await bot.sendMessage(message.from.id,`Nechta buyurtirmoqchi ekaningizni tanlang: `,buttons.button15)

          }
          if(['cola_1','cola_2','cola_3',"cola_4","cola_5","cola_6","cola_7","cola_8","cola_9",'cola_0'].includes(message.data)){

            let buyurtma = await pg(false,`select * from korzinka where user_id = $1 and mahsulot_turi='ichimlik' `,message.from.id)
            buyurtma = buyurtma.find(f => f.mahsulot_turi=='ichimlik' && f.holati=='tasdiqlanmagan')
            let son = (buyurtma.soni || "").toString() +  message.data.split('_')[1].toString()
            if(son!==0 && son!=='0'){
              let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,son,message.from.id)
              await  bot.editMessageText(`Siz tanlagan cola turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


            }

          }
          if(message.data=='cola_-'){

            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,0,message.from.id)
            await  bot.editMessageText(`Siz tanlagan cola turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})

          }
         if(message.data=='cola_turidan_orqaga'){
           await pg(true,`delete from korzinka where user_id=$1 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan'`,message.from.id)
           await bot.deleteMessage(message.from.id,message.message.message_id-2)

           await bot.deleteMessage(message.from.id,message.message.message_id-1)
           await bot.deleteMessage(message.from.id,message.message.message_id)
           await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/cola.jpg')
           await bot.sendMessage(message.from.id,"🥤Ichimliklar bo'limi",buttons.button7)
         }
          if(['Qorachoy',"Ko'kchoy"].includes(message.data)){

            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)

            await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/choy.jpg')
            await bot.sendMessage(message.from.id,`Siz tanlagan choy turi : ${message.data}\nNechta buyurtiqmoqchi ekaningizni yozing: `,buttons.button12)
            tanlaganlar.choy = 1

          }
          if(message.data=='choy_turidan_orqaga'){
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/choy.jpg')
            await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button11)

          }
         if(message.data == 'kofe_turidan_orqaga'){
           await bot.deleteMessage(message.from.id,message.message.message_id-1)
           await bot.deleteMessage(message.from.id,message.message.message_id)
           await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/kofe.jpg')
           await bot.sendMessage(message.from.id,`Bo'lim ${message.data} `,buttons.button11)
         }
         if(['Olmali Sok','Olchali Sok','Shaftolili Sok','Pomidorli Sok'].includes(message.data)){
           let buyurtma = {
             user_id:message.from.id,
             mahsulot_nomi:message.data,
             mahsulot_turi:'ichimlik',
             soni:0
           }
           // let o = await pg(true,`delete from korzinka where mahsulot_nomi='kombo'`)
           let korzinka = await pg(false,`select * from korzinka where user_id=$1 and holati='tasdiqlanmagan'`,message.from.id)



           let b = korzinka.find(f => f.user_id==buyurtma.user_id && f.mahsulot_nomi==buyurtma.mahsulot_nomi)
           if(!b){
             let buyurtma_qilish = await pg(true,'insert into korzinka(user_id,mahsulot_nomi,mahsulot_turi,soni,holati) values($1,$2,$3,$4,$5)',buyurtma.user_id,message.data,buyurtma.mahsulot_turi,buyurtma.soni,'tasdiqlanmagan')
           }


              await bot.deleteMessage(message.from.id,message.message.message_id-1)
              await bot.deleteMessage(message.from.id,message.message.message_id)
              await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','sok.jpg'))
              await bot.sendMessage(message.from.id,`Siz tanlagan sok turi :${buyurtma.mahsulot_nomi}\tSoni:${0}`)
              await bot.sendMessage(message.from.id,`Nechta buyurtirmoqchi ekaningizni tanlang: `,buttons.button14)

         }
         if(['sok_0','sok_1',"sok_2","sok_3","sok_4","sok_5","sok_6","sok_7","sok_8","sok_9"].includes(message.data)){


           let buyurtma = await pg(false,`select * from korzinka where user_id = $1 and mahsulot_turi='ichimlik' `,message.from.id)
           buyurtma = buyurtma.find(f => f.mahsulot_turi=='ichimlik' && f.holati=='tasdiqlanmagan')
           let son = (buyurtma.soni || "").toString() +  message.data.split('_')[1].toString()
           let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan' returning *`,son,message.from.id)
           await  bot.editMessageText(`Siz tanlagan sok turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})



         }
         if(message.data=='sok_-'){

           let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='ichimlik' returning *`,0,message.from.id)
           await  bot.editMessageText(`Siz tanlagan pitsa turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


         }

          if(message.data == 'sok_turidan_orqaga'){
               await pg(true,`delete from korzinka where user_id=$1 and mahsulot_turi='ichimlik' and holati='tasdiqlanmagan'`,message.from.id)
               await bot.deleteMessage(message.from.id,message.message.message_id-2)

               await bot.deleteMessage(message.from.id,message.message.message_id-1)
               await bot.deleteMessage(message.from.id,message.message.message_id)
               await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','ichimliklar.jpg'))
               await bot.sendMessage(message.from.id,"🧃Soklar bo'limi",buttons.button9)

          }

          if(['pitsa_turidan_orqaga','ichimlik_turidan_orqaga','desert_turidan_orqaga','salat_turidan_orqaga'].includes(message.data)){
            // await bot.deleteMessage(message.from.id,message.message.message_id-2)
            // await bot.deleteMessage(message.from.id,message.message.message_id-1)
            // await bot.deleteMessage(message.from.id,message.message.message_id)
            switch(message.data){
              case 'pitsa_turidan_orqaga':

              await pg(true,`delete from korzinka where user_id=$1 and mahsulot_turi='pitsa' and holati='tasdiqlanmagan' returning *`,message.from.id)
              await bot.deleteMessage(message.from.id,message.message.message_id-2)
              await bot.deleteMessage(message.from.id,message.message.message_id-1)
              await bot.deleteMessage(message.from.id,message.message.message_id)
                 await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','ichimliklar.jpg'))
                 await bot.sendMessage(message.from.id,"🍕Pitsa bo'limi",buttons.button2)
                 break;
              case 'ichimlik_turidan_orqaga':
              // await bot.deleteMessage(message.from.id,message.message.message_id-2)

              await bot.deleteMessage(message.from.id,message.message.message_id-1)
              await bot.deleteMessage(message.from.id,message.message.message_id)
                 await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','ichimliklar.jpg'))
                 await bot.sendMessage(message.from.id,"🥤Ichimliklar bo'limi",buttons.button3)
                break;
              case 'desert_turidan_orqaga':
              await bot.deleteMessage(message.from.id,message.message.message_id-1)
              await bot.deleteMessage(message.from.id,message.message.message_id)
                await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','desert.jpg'))
                await bot.sendMessage(message.from.id,"🧁Desert bo'limi",buttons.button4)
                break;
              case 'salat_turidan_orqaga':
              await bot.deleteMessage(message.from.id,message.message.message_id-1)
              await bot.deleteMessage(message.from.id,message.message.message_id)
                await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','salat.jpg'))
                await bot.sendMessage(message.from.id,"🥗Salatlar bo'limi",buttons.button5)
                break;
            }
          }
          if(['Black Cherry','CheezeCake'].includes(message.data)){
            let buyurtma = {
              user_id:message.from.id,
              mahsulot_nomi:message.data,
              mahsulot_turi:'desert',
              soni:0
            }
            let korzinka = await pg(false,`select * from korzinka where user_id=$1 and holati='tasdiqlanmagan'`,message.from.id)



            let b = korzinka.find(f => f.user_id==buyurtma.user_id && f.mahsulot_nomi==buyurtma.mahsulot_nomi)
            if(!b){
              let buyurtma_qilish = await pg(true,'insert into korzinka(user_id,mahsulot_nomi,mahsulot_turi,soni,holati) values($1,$2,$3,$4,$5)',buyurtma.user_id,message.data,buyurtma.mahsulot_turi,buyurtma.soni,'tasdiqlanmagan')
            }
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','desert.jpg'))
            await bot.sendMessage(message.from.id,`Siz tanlagan pishiriq turi :${buyurtma.mahsulot_nomi}\tSoni:${0}`)
            await bot.sendMessage(message.from.id,`Nechta buyurtirmoqchi ekaningizni tanlang: `,buttons.button18)

          }
          if(['desert_0','desert_1',"desert_2","desert_3","desert_4","desert_5","desert_6","desert_7","desert_8","desert_9"].includes(message.data)){


            let buyurtma = await pg(false,`select * from korzinka where user_id = $1 and mahsulot_turi='desert' `,message.from.id)
            buyurtma = buyurtma.find(f => f.mahsulot_turi=='desert' && f.holati=='tasdiqlanmagan')
            let son = (buyurtma.soni || "").toString() +  message.data.split('_')[1].toString()
            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='desert' and holati='tasdiqlanmagan' returning *`,son,message.from.id)
            await  bot.editMessageText(`Siz tanlagan pishiriq turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


          }
          if(message.data == 'desert__turidan_orqaga'){
            await pg(true,`delete from korzinka where user_id=$1 and mahsulot_turi='desert' and holati='tasdiqlanmagan'`,message.from.id)
            await bot.deleteMessage(message.from.id,message.message.message_id-2)

            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','desert.jpg'))
            await bot.sendMessage(message.from.id,"🧁Desert bo'limi",buttons.button4)
          }
          if(message.data=='desert_-'){

            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='desert'and holati='tasdiqlanmagan' returning *`,0,message.from.id)
            await  bot.editMessageText(`Siz tanlagan pishiriq turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


          }

          if(['Olivie',"Sezar",'Mujskoy Kapriz'].includes(message.data)){
            let buyurtma = {
              user_id:message.from.id,
              mahsulot_nomi:message.data,
              mahsulot_turi:'salat',
              soni:0
            }
            let korzinka = await pg(false,`select * from korzinka where user_id=$1 and holati='tasdiqlanmagan'`,message.from.id)



            let b = korzinka.find(f => f.user_id==buyurtma.user_id && f.mahsulot_nomi==buyurtma.mahsulot_nomi)
            if(!b){
              let buyurtma_qilish = await pg(true,'insert into korzinka(user_id,mahsulot_nomi,mahsulot_turi,soni,holati) values($1,$2,$3,$4,$5)',buyurtma.user_id,message.data,buyurtma.mahsulot_turi,buyurtma.soni,'tasdiqlanmagan')
            }
            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','salat.jpg'))
            await bot.sendMessage(message.from.id,`Siz tanlagan salat turi :${buyurtma.mahsulot_nomi}\tSoni:${0}`)
            await bot.sendMessage(message.from.id,`Nechta buyurtirmoqchi ekaningizni tanlang: `,buttons.button19)

          }
          if(['salat_0','salat_1',"salat_2","salat_3","salat_4","salat_5","salat_6","salat_7","salat_8","salat_9"].includes(message.data)){


            let buyurtma = await pg(false,`select * from korzinka where user_id = $1 and mahsulot_turi='salat' `,message.from.id)
            buyurtma = buyurtma.find(f => f.mahsulot_turi=='salat' && f.holati=='tasdiqlanmagan')
            let son = (buyurtma.soni || "").toString() +  message.data.split('_')[1].toString()
            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='salat' and holati='tasdiqlanmagan' returning *`,son,message.from.id)
            await  bot.editMessageText(`Siz tanlagan salat turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


          }
          if(message.data=='salat_-'){

            let update = await pg(true,`update korzinka set soni=$1 where user_id=$2 and mahsulot_turi='salat'and holati='tasdiqlanmagan' returning *`,0,message.from.id)
            await  bot.editMessageText(`Siz tanlagan salat turi :${update.mahsulot_nomi}\tSoni:${update.soni}`, {chat_id: message.message.chat.id, message_id: message.message.message_id-1})


          }
          if(message.data == 'salat__turidan_orqaga'){
            await pg(true,`delete from korzinka where user_id=$1 and mahsulot_turi='salat' and holati='tasdiqlanmagan'`,message.from.id)
            await bot.deleteMessage(message.from.id,message.message.message_id-2)

            await bot.deleteMessage(message.from.id,message.message.message_id-1)
            await bot.deleteMessage(message.from.id,message.message.message_id)
            await bot.sendPhoto(message.from.id,path.join(process.cwd(),'pictures','salat.jpg'))
            await bot.sendMessage(message.from.id,"🥗Salat bo'limi",buttons.button5)
          }
          if(message.data == 'buyurtma amalga oshirish'){
            await bot.deleteMessage(message.from.id,message.message.message_id)
            let buyurtma = await pg(false,'select * from korzinka where user_id=$1',message.from.id)
            await pg(true,`update korzinka set holati='qabulda' where user_id=$1 and holati='tasdiqlangan'`,message.from.id)
            bot.sendMessage(message.from.id,`Iltimos ismingizni yozing:`,{parse_mode:"Markdown"})
          }
          if(message.contact){
            await pg(true,`update zakas set user_phone_number=$1 where user_id=$2`,message.contact.phone_number,message.from.id)

            bot.sendMessage(message.from.id,"Joylashuvingizni jo'nating",{
              reply_markup:{
                resize_keyboard:true,
                keyboard:[
                  [
                    { text : "Lokatsiya",request_location:true}
                  ]
                ]
              }
            })
          }
          if(message.data=='buyurtmani_bekorqilish'){

             bot.deleteMessage(message.from.id,message.message.message_id)
            // await bot.deleteMessage(message.from.id,message.message.message_id-1)
            // await bot.deleteMessage(message.from.id,message.message.message_id-2)

            await  bot.sendMessage(message.from.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)

            await pg(true,'delete from korzinka where user_id=$1',message.from.id),
            await pg(true,'delete from zakaz where user_id=$1',message.from.id)

          }
          if(message.data=='buyurtmani bekor qilish'){
            bot.deleteMessage(message.from.id,message.message.message_id)
           await bot.deleteMessage(message.from.id,message.message.message_id-1)
           // await bot.deleteMessage(message.from.id,message.message.message_id-2)

           await  bot.sendMessage(message.from.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)

           await pg(true,'delete from korzinka where user_id=$1',message.from.id),
           await pg(true,'delete from zakaz where user_id=$1',message.from.id)
          }
          if(message.location){

            await pg(true,`update zakas set user_longtitude=$1,user_latitude=$2 where user_id=$3`,message.location.longitude,message.location.latitude,message.from.id)
            let buyurtma = await pg(false,'select * from korzinka where user_id = $1',message.from.id)
            bot.sendMessage(message.from.id,"Buyurtmani kuting",{
              reply_markup:{
                remove_keyboard:true
              }
            })
            let mahsulotlar = await pg(false,'select * from mahsulotlar')
            let zakaz = (await pg(false,'select * from zakas where user_id=$1',message.from.id));
            let ism = zakaz[0].username
            let raqam = zakaz[0].user_phone_number
            let korzinka = await pg(false,`select * from korzinka where user_id=$1`,message.from.id)
            let soni = 0

            let longitude = zakaz[0].user_longtitude
            let latitude = zakaz[0].user_latitude
            let vaqt = new Date()
            let summa = 0
            let result = ``
            for(let i of zakaz){
              let order = korzinka.filter(f => f.user_id==i.user_id)
               for(let i of order){
                     result += "Mahsulot Soni :\t" + i.soni+"\t" + `Mahsulot Nomi : ${i.mahsulot_nomi}\t|`
                     summa += (+mahsulotlar.find(k => k.mahsulot_nomi==i.mahsulot_nomi).mahsulot_narxi)*i.soni
               }

            }
            // console.log("Buyurtmachi : "+ism + "\n"+ "Telefon raqami:\t"+raqam+"\n"+ result +"\nUmumiy Summa:\t"+ summa);
            bot.sendMessage(2023671991,"Buyurtmachi : "+ism + "\n"+ "Telefon raqami:\t"+raqam+"\n"+ result +"\nUmumiy Summa:\t"+ summa+"\tso'm\n"+"Vaqt:\t"+vaqt,{parse_mode:"Markdown"})
            await  bot.sendLocation(2023671991,latitude,longitude)
            await pg(true,'delete from korzinka where user_id=$1',message.from.id)
            await pg(true,'delete from zakas where user_id=$1',message.from.id)

            await  bot.sendMessage(message.from.id,`${message.from.first_name}, keling birga buyurtma qilamiz `,buttons.button1)
          }
          if(!/[0-9]/.test(message.text) && !message.contact &&  message.text && message.text!=='/start'){
            let ism = await pg(false,'select * from users')
            let korzinka = await pg(false,`select * from korzinka where user_id=$1 and holati='tasdiqlangan'`,message.from.id)
            await pg(true,`insert into zakas(user_id,username) values($1,$2)`,message.from.id,message.text)
            bot.sendMessage(message.from.id,"Telefon raqamingizni yuboring",{
              reply_markup:{
                remove_keyboard:false,
                resize_keyboard:true,
                keyboard:[
                  [{ text:"my number",request_contact:true}]
                ]
              }
            })
          }

      } catch (e) {
         console.log(e.message);
      }
  }
}
// let sonlar = {
//   0:'0️⃣',1:'1️⃣',2:'2️⃣',3:'3️⃣',4:'4️⃣',5:'5️⃣',6:'6️⃣',7:'7️⃣',8:'8️⃣',9:'9️⃣',10:'🔟'
// }
// let buyurtma = await pg(false,'select * from korzinka where user_id = $1',message.from.id)
// let mahsulotlar = await pg(false,'select * from mahsulotlar')
// let mahsulot_id = []
//
// let order = ``
// let counter = 1
// let umumiy_summa = 0
// for(let i of buyurtma){
//      // console.log(i);
//    order += "\t\t\n\n"+sonlar[counter] + i.mahsulot_nomi + '\n' + "Narxi : "+i.soni*mahsulotlar.find(f => f.mahsulot_nomi==i.mahsulot_nomi).mahsulot_narxi + " so'm" +`\nSoni : ${i.soni}`
//    umumiy_summa += +mahsulotlar.find(f => f.mahsulot_nomi==i.mahsulot_nomi).mahsulot_narxi * i.soni
//    counter++
// }
// bot.sendMessage(message.from.id,order + "\n\n"+"Umumiy Narxi : "+umumiy_summa+" so'm",buttons.button17,{parse_mode:"Markdown"})
// await bot.sendPhoto(message.from.id,'/home/kamron/Pictures/pizza.jpg')
/////////////buyurtma tasdiqlash
