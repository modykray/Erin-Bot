import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '20123456789', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false, 
  owners: [
    // الأونر الوحيد للبوت
    { name: "Erin", jid: "201227812859@s.whatsapp.net" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "⚔️ ‌𝖤𝖱𝖨𝖭 𝖡𝖮𝖳 ‌‌🕊️⁩", // تم تغيير الاسم إلى إيرين مع زينة فخمة
  nameChannel: "𝐄𝐑𝐈𝐍 ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⛓️", // تحديث اسم القناة
  idChannel: "120363225356834044@newsletter",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VaQim2bAu3aPsRVaDq3v"
  },
  copyright: { 
    pack: 'Erin', 
    author: 'Erin'
  },
  images: [
    // قمت باستبدال صور بومني بصور فخمة تناسب اسم إيرين
    "https://i.pinimg.com/originals/3a/0d/3d/3a0d3d5272a91df721869e9e1c4df97b.jpg",
    "https://i.pinimg.com/originals/a1/d5/9c/a1d59c5d1e67cfbb4f2ee913ef4760bc.jpg",
    "https://i.pinimg.com/originals/f3/be/07/f3be07449b251b697e84cc6b186b8405.jpg"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});


/* 
=========== Memory Monitor ========== 

setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1) 
    }
}, 300_000) 

*/
