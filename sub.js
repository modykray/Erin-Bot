import { SubBots } from "meowsab";

async function sub(client) {

  global.subBots = new SubBots(client.commandSystem)
  
  // تصحيح الخطأ الإملائي لو كانت المكتبة تدعمها بالشكل الصحيح pairCode
  SubBots.pairCode("ABCD1234") // Pairing
 
  const { config } = client;

  await global.subBots.setConfig({
    commandsPath: config.commandsPath || './plugins',
    owners: config.owners,
    prefix: config.prefix,
    info: config.info,
    printQR: false
  });

  global.subBots.on('error', (uid, error) => {
    console.error(`❌ ⚔️ [𝖤𝖱𝖨𝖭 - SubBot ${uid}] Error:`, error?.message || error);
  });

  const loadedCount = await global.subBots.load();
  console.log(`⛓️‍💥 Loaded ${loadedCount} saved sub-bots successfully!`);

  global.subBots.on('ready', async (uid, sock) => {
    console.log(`🕊️⁩ ✅ [𝖤𝖱𝖨𝖭 - SubBot ${uid}] Connected and Ready!`);
  });

  global.subBots.on('pair', (uid, code) => {
    console.log(`🔐 ⚔️ [𝖤𝖱𝖨𝖭 - SubBot ${uid}] Pairing code: ${code}`);
  });

  global.subBots.on('message', async (uid, msg) => {
    if (msg.key.id.includes("3EB0")) return;

    const body = getMessageText(msg);
    const bot = global.subBots.get(uid);
    const sock = bot?.sock;

    if (!sock || !body) return;

    try {
      // تفاعل البوت الفرعي مع كلمة "تست"
      if (body === "تست") {
        await sock.sendMessage(msg.key.remoteJid, {
          react: { text: "⚔️", key: msg.key } // تعديل التفاعل لرمز السيف ليناسب إيرين
        });
      }

    } catch (error) {
      console.error(`❌ [𝖤𝖱𝖨𝖭 - SubBot ${uid}] Send error:`, error?.message || error);
    }
  });

  global.subBots.on('close', (uid) => {
    console.log(`🔌 𝖤𝖱𝖨𝖭 - SubBot ${uid} Disconnected`);
  });

  global.subBots.on('badSession', (uid) => {
    console.log(`⚠️ [𝖤𝖱𝖨𝖭 - SubBot ${uid}] Bad session, removed from system`);
  });

  return global.subBots;
}

function getMessageText(msg) {
  if (!msg.message) return null;
  if (msg.message.conversation) return msg.message.conversation;
  if (msg.message.extendedTextMessage?.text) return msg.message.extendedTextMessage.text;
  if (msg.message.imageMessage?.caption) return msg.message.imageMessage.caption;
  if (msg.message.videoMessage?.caption) return msg.message.videoMessage.caption;
  return msg.body || null;
}

export default sub;
