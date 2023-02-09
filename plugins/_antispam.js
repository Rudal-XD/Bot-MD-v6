export async function all(m) {
    if (!m.message)
        return
    this.spam = this.spam ? this.spam : {}
    if (m.sender in this.spam) {
        this.spam[m.sender].count++
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
            if (this.spam[m.sender].count > 5) {
                //global.db.data.users[m.sender].banned = true
                m.reply('*⌦ kamu terdeteksi spam\n*Beri jeda 5 detik* !*')
            }
            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
        }
    }
    else
        this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
}



const { WAMessageStubType } = (await import('@adiwajshing/baileys')).default
import { format } from 'util';

let imgr = flaaa.getRandom()

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

export async function all(m) {
	if (m.fromMe && m.isBaileys) return !0
	let text;
	let setting = global.db.data.settings[this.user.jid]
	if(!setting.anticall) return 
	
	if (m.messageStubType === (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO)) {
		await conn.sendButton(m.chat, `👋 Kamu di Blockir karena menelepon *Bot*\n`,wm + '\n\n' + botdate, `${imgr + 'Anti Call'}`, [['OK','ok']], null)
		await delay(1000)
		await this.updateBlockStatus(m.chat, "block")
	}
}
