module.exports = {

button1:{
  reply_markup:
           {
             inline_keyboard:[
  [
    { text : "🍕Pitsa",callback_data:"/pizza" },
    { text : "🧃Ichimliklar",callback_data:"/ichimliklar" }
  ],
  [
    { text : "🧁Desert",callback_data:"/desert"},
    { text : "🥗Salatlar",callback_data:"/salatlar"}
  ],
  // [
  //   { text : "🧺Savatga qo'shish"}
  // ]
]}},
button2:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "Kombo",callback_data:"Kombo" },
        { text : "Margarita",callback_data:"Margarita" }
      ],
      [
        { text : "Pepperoni",callback_data:"Pepperoni" },
        { text : "Qoziqorinli",callback_data:"Qoziqorinli" }
      ],
      [
        { text : "Ananasli",callback_data:"Ananasli" },
        { text : "Qazili",callback_data:"Qazili" }
      ],
      [
        { text : "◀️Orqaga", callback_data:"<pitsadan_orqaga"}
      ]
    ]
  }
},
button3:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "🥤Coca-Cola" ,callback_data : "Cola" },
        // { text : "🥤Pepsi" , callback_data : "pepsi"}
      ],
      [
        { text : "🧊Mineral Suv" ,callback_data : "Suv" },
        { text : "🧃Sok" , callback_data : "Sok"}
      ],
      [
        { text : "◀️Orqaga", callback_data:"<ichimliklardan_orqaga"}
      ]
    ]
  }
},
button4:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "Black Cherry",callback_data:"Black Cherry" },
        { text : "CheezeCake",callback_data:"CheezeCake" }
      ],
      [
        { text : "◀️Orqaga", callback_data:"<desertdan_orqaga"}
      ]
    ]
  }
},
button5:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "Olivie",callback_data : "Olivie" },
        { text : "Sezar",callback_data : "Sezar" }
      ],
      [
        { text : "Mujskoy Kapriz",callback_data : "Mujskoy Kapriz" }
      ],
      [
        { text : "◀️Orqaga", callback_data:"<salatdan_orqaga"}
      ]
    ]
  }
},
button6:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : 1, callback_data:"pitsa_1" },
        { text : 2, callback_data:"pitsa_2" },
        { text : 3, callback_data:"pitsa_3" }
      ],
      [
        { text : 4, callback_data:"pitsa_4" },
        { text : 5, callback_data:"pitsa_5" },
        { text : 6, callback_data:"pitsa_6" },
      ],
      [
        { text : 7, callback_data:"pitsa_7" },
        { text : 8, callback_data:"pitsa_8" },
        { text : 9, callback_data:"pitsa_9" }
      ],
      [
        { text : "➖",callback_data:'pitsa_-'}
      ],
      [
         { text : 0 , callback_data:"pitsa_0"},
         { text : 'Tasdiqlash', callback_data:"pitsani_tasdiqlash" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "pitsa_turidan_orqaga"}
      ]
    ]
  }
},
button7:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "0.5L🥤 Cola" , callback_data :'0.5L Cola' },
        { text : "1L🥤 Cola ", callback_data : '1L Cola' },
      ],
      [
        { text : "1.5L🥤 Cola",callback_data : '1.5L Cola' },
        { text : "0.5L🥤 Razliv",callback_data:'Razliv'}
      ],
      [
        { text : "🔙Orqaga",callback_data : "ichimlik_turidan_orqaga"}
      ]
    ]
  }
},
button8:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "🧊0.5L Mineral",callback_data : '0.5L Mineral' },
        { text : "🧊1.5L Mineral",callback_data : '1.5L Mineral'}
      ],
      [
        { text : "🔙Orqaga",callback_data : "ichimlik_turidan_orqaga"}
      ]
    ]
  }
},
button9:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "Olmali Sok", callback_data : "Olmali Sok" },
        { text : "Olchali Sok", callback_data : "Olchali Sok" }
      ],
      [
        { text : "Shaftolili Sok", callback_data : "Shaftolili Sok" },
        { text : "Pomidorli Sok", callback_data : "Pomidorli Sok" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "ichimlik_turidan_orqaga"}
      ]
    ]
  }
},
button10:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "☕️3v1 Kofe", callback_data:'3v1 Kofe' },
        { text : '☕️Qora Kofe',callback_data:"Qora Kofe" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "ichimlik_turidan_orqaga"}
      ]
    ]
  }
},
button11:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "🫖Qora choy",callback_data : 'Qora choy' },
        { text : "🫖Ko'k choy",callback_data : "Kok choy" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "ichimlik_turidan_orqaga"}
      ]
    ]
  }
},
button12:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "🔙Orqaga",callback_data : "choy_turidan_orqaga"}
      ]
    ]
  }
},
button13:{
  reply_markup:
           {
             inline_keyboard:[
  [
    { text : "🍕Pitsa",callback_data:"/pizza" },
    { text : "🧃Ichimliklar",callback_data:"/ichimliklar" }
  ],
  [
    { text : "🧁Desert",callback_data:"/desert"},
    { text : "🥗Salatlar",callback_data:"/salatlar"}
  ],
  [
    { text : "🧺Savatdagilarni tasdiqlash", callback_data:"buyurtmani_tasdiqlash" }
  ],
  [
    { text : "🧺Savatdagilarni bekor qilish", callback_data : "buyurtmani_bekorqilish"}
  ]
]}},
button14:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : 1, callback_data:"sok_1" },
        { text : 2, callback_data:"sok_2" },
        { text : 3, callback_data:"sok_3" }
      ],
      [
        { text : 4, callback_data:"sok_4" },
        { text : 5, callback_data:"sok_5" },
        { text : 6, callback_data:"sok_6" },
      ],
      [
        { text : 7, callback_data:"sok_7" },
        { text : 8, callback_data:"sok_8" },
        { text : 9, callback_data:"sok_9" }
      ],
      [
        { text : "➖",callback_data:'sok_-'}
      ],
      [
         { text : 0 , callback_data:"sok_0"},
         { text : 'Tasdiqlash', callback_data:"sokni_tasdiqlash" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "sok_turidan_orqaga"}
      ]
    ]
  }
},
button15:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : 1, callback_data:"cola_1" },
        { text : 2, callback_data:"cola_2" },
        { text : 3, callback_data:"cola_3" }
      ],
      [
        { text : 4, callback_data:"cola_4" },
        { text : 5, callback_data:"cola_5" },
        { text : 6, callback_data:"cola_6" },
      ],
      [
        { text : 7, callback_data:"cola_7" },
        { text : 8, callback_data:"cola_8" },
        { text : 9, callback_data:"cola_9" }
      ],
      [
        { text : "➖",callback_data:'cola_-'}
      ],
      [
         { text : 0 , callback_data:"cola_0"},
         { text : 'Tasdiqlash', callback_data:"colani_tasdiqlash" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "cola_turidan_orqaga"}
      ]
    ]
  }
},
button16:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : 1, callback_data:"suv_1" },
        { text : 2, callback_data:"suv_2" },
        { text : 3, callback_data:"suv_3" }
      ],
      [
        { text : 4, callback_data:"suv_4" },
        { text : 5, callback_data:"suv_5" },
        { text : 6, callback_data:"suv_6" },
      ],
      [
        { text : 7, callback_data:"suv_7" },
        { text : 8, callback_data:"suv_8" },
        { text : 9, callback_data:"suv_9" }
      ],
      [
        { text : "➖",callback_data:'suv_-'}
      ],
      [
         { text : 0 , callback_data:"suv_0"},
         { text : 'Tasdiqlash', callback_data:"suv_tasdiqlash" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "suv_turidan_orqaga"}
      ]
    ]
  }
},
button17:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : "✅Buyurtma amalga oshirish",callback_data:"buyurtma amalga oshirish"},
        { text : "❌Bekor qilish",callback_data:"buyurtmani bekor qilish"}
      ]
    ]
  }
},
button18:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : 1, callback_data:"desert_1" },
        { text : 2, callback_data:"desert_2" },
        { text : 3, callback_data:"desert_3" }
      ],
      [
        { text : 4, callback_data:"desert_4" },
        { text : 5, callback_data:"desert_5" },
        { text : 6, callback_data:"desert_6" },
      ],
      [
        { text : 7, callback_data:"desert_7" },
        { text : 8, callback_data:"desert_8" },
        { text : 9, callback_data:"desert_9" }
      ],
      [
        { text : "➖",callback_data:'desert_-'}
      ],
      [
         { text : 0 , callback_data:"desert_0"},
         { text : 'Tasdiqlash', callback_data:"desert_tasdiqlash" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "desert__turidan_orqaga"}
      ]
    ]
  }
},
button19:{
  reply_markup:{
    inline_keyboard:[
      [
        { text : 1, callback_data:"salat_1" },
        { text : 2, callback_data:"salat_2" },
        { text : 3, callback_data:"salat_3" }
      ],
      [
        { text : 4, callback_data:"salat_4" },
        { text : 5, callback_data:"salat_5" },
        { text : 6, callback_data:"salat_6" },
      ],
      [
        { text : 7, callback_data:"salat_7" },
        { text : 8, callback_data:"salat_8" },
        { text : 9, callback_data:"salat_9" }
      ],
      [
        { text : "➖",callback_data:'salat_-'}
      ],
      [
         { text : 0 , callback_data:"salat_0"},
         { text : 'Tasdiqlash', callback_data:"salat_tasdiqlash" }
      ],
      [
        { text : "🔙Orqaga",callback_data : "salat__turidan_orqaga"}
      ]
    ]
  }
},
button20:{
    reply_markup:{
      inline_keyboard:[
        [
          { text : "🔙Orqaga",callback_data:"nazad"}
        ]
      ]
    }
}
}
