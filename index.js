const fs = require('fs');
const { Client } = require('whatsapp-web.js');

// Crea una instancia del cliente de WhatsApp
const client = new Client();

// Cuando el cliente está listo, carga los plugins
client.on('ready', () => {
    console.log('El cliente está listo!');

    // Lee los archivos de la carpeta "plugins"
    fs.readdir('./plugins', (err, files) => {
        if (err) return console.error(err);

        files.forEach(file => {
            // Solo carga archivos .js
            if (!file.endsWith('.js')) return;

            // Requiere el archivo del plugin
            const plugin = require(`./plugins/${file}`);

            // Registra el comando del plugin
            client.on('message', msg => {
                if (msg.body.startsWith(plugin.command)) {
                    plugin.action(client, msg);
                }
            });
        });
    });
});

// Genera un código QR para conectar el bot a WhatsApp
client.on('qr', qr => {
    console.log('Por favor escanea este código QR para conectar el bot a WhatsApp:');
    console.log(qr);
});

// Inicia el cliente
client.initialize();
