const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "scan", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
 *Tap the link below to get your session ID (pair code) from KAREEM💔-TECH🌍:*

🔗 https://kareemxmd.github.io/KAREEM-XMD-TECH/

 *STEPS TO GET SESSION*:
 1️⃣ Open the link  
 2️⃣ Enter your WhatsApp number with country code (e.g., 255...) and tap submit  
 3️⃣ You will get a code on WhatsApp, open it  
 4️⃣ Enter the code into the website  
 5️⃣ Wait until you receive your long SESSION ID on WhatsApp  
 6️⃣ Copy and send it to your deployer  

✅ *Enjoy using KAREEM💔-TECH🌍 bot!*
 `;

    let menuMsg = `
> Made by: © KAREEM💔-TECH🌍
`;

    const lien = "https://files.catbox.moe/cfd5e0.jpg"; // picha yako

    const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "KAREEM💔-TECH🌍",
            serverMessageId: 1
        }
    };

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                gifPlayback: true,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵 Video error: " + e);
            repondre("🥵 Video error: " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            console.log("🥵 Image error: " + e);
            repondre("🥵 Image error: " + e);
        }
    } else {
        try {
            await zk.sendMessage(dest, {
                text: infoMsg + menuMsg,
                contextInfo
            }, { quoted: ms });
        } catch (e) {
            repondre(infoMsg + menuMsg);
        }
    }
});
