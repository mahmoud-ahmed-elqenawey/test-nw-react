const { Client, LocalAuth } = require('whatsapp-web.js');

class Manager_Whatsapp {
    constructor(props) {
        // this.events=new MyEmitter();
        this.client = new Client();
        this.start();
    }

    listen_to_qr() {
        this.client.on('qr', (qr) => {
            console.log(qr);
            // this.events.emit('qr',qr)
        });
    }

    listen_to_ready() {
        this.client.on('ready', () => {
            // this.events.emit('ready')
        });
    }

    send_text_message(phone_number, text) {
        return new Promise(async (res, rej) => {
            try {
                var number_object = await this.client.getNumberId(phone_number);
                if (!number_object) {
                    res({ err: true, sucssess: false });
                }
                this.client.sendMessage(number_object._serialized, text);
                res({ err: false, sucssess: true });
            } catch (err) {
                res({ err, sucssess: false });
            }
            //console.log(number_id)
        });
    }

    async start() {
        this.listen_to_qr();
        this.listen_to_ready();
        this.client.initialize();
    }

    delay(time) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, time);
        });
    }
}

module.exports = new Manager_Whatsapp;
