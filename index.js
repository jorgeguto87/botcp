const qrcode = require ('qrcode-terminal');
const { Client, LocalAuth, MessageMedia, MessageTypes, List, Buttons } = require ('whatsapp-web.js');
const client = new Client ({
    authStrategy: new LocalAuth()
});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Conectado com sucesso!');
});

client.initialize();


function saudacao() {
    const data = new Date();
    let hora = data.getHours();
    let str = '';
    if (hora >= 8 && hora < 15) {
        str = 'Bom dia ';
    } else if (hora >= 15 && hora < 21) {
        str = 'Boa tarde ';
    } else {
        str = 'Boa noite ';
    }
    return str;
};
function atendente() {
    const data = new Date();
    let hora = data.getHours();
    let dia = data.getDay();
    let strdois = '';
    if (dia === 6 && hora >= 12 && hora < 17) {
        strdois = '😃 Aguarde um momento que logo será atendido.';
    }
    else if (dia < 6 && dia > 0 && hora >= 12 && hora < 22) {
        strdois = '😃 Aguarde um momento que logo será atendido.';
    } else {
        strdois = 'Humm... \n😌 Já estamos fora do horário de atendimento.\n\n😃 Mas não se preocupe, retornaremos assim que possível!\n\n🕘 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
        }
    return strdois;
};

const hash = "#";
const zero = "0";
function domingo() {
    const data = new Date();
    let dia = data.getDay();
    let hora = data.getHours();
    let strtres = '';
    if (dia === 0) {
        strtres = '🏖️ *Aproveite o fim de semana!*\n\n😃 Entraremos em contato assim que possível.\n\n🕘 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (dia === 6 && hora >= 17) {
        strtres = '🏖️ *Aproveite o fim de semana!*\n\n😃 Entraremos em contato assim que possível.\n\n🕘 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    }
    
    else {
        strtres = atendente();
        }
    return strtres;
    };
    
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
client.on('message', async (msg) => {
    
    if (msg.body.match (/(Oi|Bom Dia|Boa tarde)/i) && msg.from.endsWith('@c.us'))  {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        const name = contact.pushname;                            
              
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, saudacao() + name.split(" ")[0] + '!\n🙋‍♂️ Sou o *Rodrigo,* assistente virtual da *Casa Perfeita Planejados!*\n_Como posso ajudar?_\n\nPor favor digite o *NÚMERO* de uma das opções abaixo. 👇\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogo\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos');


    

    };
    if (msg.body.match (/Olá! Gostaria de mais informações/i) && msg.from.endsWith ('@c.us'))  {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        const name = contact.pushname;                            
              
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, saudacao() + name.split(" ")[0] + '!\n🙋‍♂️ Sou o *Rodrigo,* assistente virtual da *Casa Perfeita Planejados!*\n_Como posso ajudar?_\n\nPor favor digite o *NÚMERO* de uma das opções abaixo. 👇\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogo\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos');


    

    }
           else if (msg.body === "1") { 
                const chat = await msg.getChat();
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😃 *Maravilha!*\n\n➡️ É sua primeira experiência em compra de planejados?\n\n#️⃣ - *SIM*\n0️⃣ - *NÃO*');
                
                }  else if (msg.body === hash) {
                    const chat = await msg.getChat();
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, '😃 *Tudo bem, iremos te ajudar*\n\nVou pedir que preencha o nosso formulário de *briefing abaixo* para entender melhor o seu projeto. 👇\n\nhttps://casaperfeitaplanejados.com.br/?page_id=639');
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, '➡️ É muito *importante* preencher todos os campos do formulário para nossa equipe conseguir desenvolver um projeto perfeito para você.');
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay (3000);
                    await client.sendMessage(msg.from, '👋 *Até logo!*');
                    
                }; if (msg.body.match (/Venho através do site, /i)) {
                    const chat = await msg.getChat();
                    const contact = await msg.getContact();
                    const name = contact.pushname;
                    const audio = MessageMedia.fromFilePath('./audio_carol.mp3');
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, '😃 Maravilha ' + name.split(' ')[0] + '!\n\nAgora que preencheu nosso formulário, irei encaminhar um áudio para te explicar como funciona o nosso trabalho.');
                    await delay (3000);
                    await chat.sendStateRecording();
                    await delay (5000);
                    await client.sendMessage(msg.from, audio, {sendAudioAsVoice:true});
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, 'Você possui a planta ou imagens do ambiente?\n\nCaso possua, irei aguardar um pouquinho, para que procure e envie para nós. 😉\n\n8️⃣ - SIM\n9️⃣ - NÃO');
                
                }; if (msg.body === zero) {
                    const chat = await msg.getChat();
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, '😃 *Perfeito!*\n\nVou pedir que preencha o nosso formulário de *briefing abaixo* para entender melhor o seu projeto. 👇\n\nhttps://casaperfeitaplanejados.com.br/?page_id=639');
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, '➡️ É muito *importante* preencher todos os campos do formulário para nossa equipe conseguir desenvolver um projeto perfeito para você.');
                    await delay(3000);
                    await chat.sendStateTyping();
                    await delay (3000);
                    await client.sendMessage(msg.from, '👋 *Até logo!*');

               

            } else if (msg.body === "8") {
                    const chat = await msg.getChat();
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😉 *Perfeito!*\n\nVou aguardar um minuto para que envie os arquivos.');
                await delay(60000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😃 *Excelente!*\n\nAgora vou chamar o *atendente* para dar continuidade nesta conversa');
                await delay(3000);
                await chat.sendStateTyping();
                await client.sendMessage(msg.from, 'Vou encaminhar o link do nosso instagram abaixo enquanto aguarda o seu atendimento. 👇\n\nhttps://www.instagram.com/casaperfeitaplanejados?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, domingo());
            
            }else if (msg.body === "9") {
                const chat = await msg.getChat();
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😉 Não tem problema, vou direcionar você para um de nossos atendentes.');
                await delay(3000);
                await chat.sendStateTyping();
                await client.sendMessage(msg.from, 'Vou encaminhar o link do nosso instagram abaixo enquanto aguarda o seu atendimento. 👇\n\nhttps://www.instagram.com/casaperfeitaplanejados?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, domingo());          
            
            
            
            
            }else if (msg.body === "2") {
                const chat = await msg.getChat();
                const catalogo = MessageMedia.fromFilePath('./catalogo_de_cores_casa_perfeita.pdf')
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😃 *Excelente escolha!*\n\nVocê vai se encantar com nossos catálogos incríveis!\n\n_Irei encaminhar para você._');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, 'Este aqui é o nosso catálogo de cores e acabamentos para você se encantar com nossas novidades. 👇');
                await delay(3000);
                await client.sendMessage(msg.from, catalogo, {sendMediaAsDocument: true});
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, 'Vou encaminhar o link do nosso instagram.\nLá você também encontra ótimas idéias para o seu projeto além de acompanhar o nosso incrível trabalho.\n\nBasta acessar o link abaixo. 👇\n\nhttps://www.instagram.com/casaperfeitaplanejados?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, 'Se quiser retornar ao menu principal, é só digitar a palavra *Oi* para reiniciar seu atendimento.\n\n👋 *Até logo!*');

            } else if (msg.body === "3") {
                const chat = await msg.getChat();
                
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😉 Entendi, você precisa de assistência técnica.\n\nPara isso irei pedir algumas informações que irão agilizar o seu atendimento. Ok?');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, 'Informe o seu nome completo ou número do contrato por favor:');
                await delay(30000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, 'Vou pedir para que nos envie um áudio relatando o problema, se puder encaminhar um vídeo ou fotos também irá ajudar.');
                await delay(60000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, domingo());




            } else if (msg.body === "4") {
                const chat = await msg.getChat();
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, '😃 *Que bom ter você como nosso cliente!*\n_Seu sonho está cada vez mais perto de ser realizado!_\n\nInforme o número do seu contrato ou nome completo por favor?');
                await delay(30000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, 'Vou encaminhar seu atendimento para um de nossos atendentes para dar seguimento em sua solicitação.');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, domingo());
                                   

                        
                    } else if(msg.body === "5") {
                        const chat = await msg.getChat();
                        await delay(3000);
                        await chat.sendStateTyping();
                        await delay(3000);
                        await client.sendMessage(msg.from, '😉 *Certo, vamos falar sobre outros assuntos*\n\nVou te encaminhar para um de nossos atendentes e enquanto isso, fique a vontade para descrever o que precisa.');
                        await delay(3000);
                        await chat.sendStateTyping();
                        await delay(3000);
                        await client.sendMessage(msg.from, domingo());
                    } 
                    else if (msg.body === "Cozinha") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Quarto") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Quartos") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Banheiro") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Banheiros") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Lavanderia") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Escritório") {
                        msg.react('👍');
                    }
                    else if (msg.body === "Sala") {
                        msg.react('👍');
                    }

                });
                
                
                

             

            

        
    

