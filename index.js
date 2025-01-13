const qrcode = require ('qrcode-terminal');
const { Client, LocalAuth, List, Buttons, MessageTypes, MessageMedia} = require ('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
const fs = require ('fs');
const cron = require ('node-cron');
const horarios = [11, 15, 18, 21, 23];
const feriados = [
    '01-18', //Paixão de Cristo
    '04-21', // Tiradentes
    '05-01', // Dia do Trabalho
    '09-07', // Independência do Brasil
    '10-12', // Nossa Senhora Aparecida
    '11-02', // Finados
    '11-15' // Proclamação da República
];

const anonovo = '01-01';
const Natal = '12-25';
const Carnaval = [ '03-01', '03-02', '03-03', '03-04', '03-05'];
const Pascoa = '04-20';

const internos = [
    '5521964172978@c.us',
    '5521965031564@c.us',
    '5521970154471@c.us',
    '5521971486143@c.us',
    '5521974993413@c.us',
    '5521978970237@c.us',
    '5521981140201@c.us',
    '5521986958759@c.us',
    '5521987956190@c.us',
    '5521989297627@c.us',
    '5521994474663@c.us',
    '5521996987241@c.us',
    '555174002508@c.us',
    '555174007501@c.us',
    '555180472374@c.us',
    '555180587355@c.us',
    '555186044153@c.us',
    '555196395635@c.us',
    '555197143001@c.us',
    '555199749379@c.us',
    '555199888186@c.us',
    '555496688814@c.us',
    '555496750286@c.us',
    '555497143333@c.us',
    '555499465484@c.us',
    '555499487420@c.us',
    '555499819019@c.us',
    '5551998718843@c.us',
    '5521998016036@c.us',
    '120363352156460722@g.us',
    '5521995293009-1591574958@g.us',
    '5521995365441-1587173568@g.us',
    '120363039621149962@g.us', 
    '5521992884522-1634652354@g.us',
    '120363045569895184@g.us',
    '120363143030407637@g.us',
    '120363029538805156@g.us',
    '120363049713481319@g.us',
    '@g.us'
];

const grupos = [
    '120363039621149962@g.us', 
    '5521992884522-1634652354@g.us',
    '120363045569895184@g.us',
    '120363143030407637@g.us',
    '120363029538805156@g.us',
    '5521995293009-1591574958@g.us',
    '5521995365441-1587173568@g.us',
    '120363049713481319@g.us' ];

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.initialize();
client.on('ready', async () => {
    console.log('E lá vamos nós!!!');
    console.log("Agora o bot está ouvindo as mensagens!");
    await main();
});
let isMainInitialized = false;

async function main() {
    if (isMainInitialized) {
        console.log('O fluxo principal já foi iniciado. Ignorando...');
        return;
    }
    isMainInitialized = true;
    try {
        console.log('Iniciando o fluxo principal...');
        handleUserMessage();
        anunciosprogramados();
    }catch (error) {
        console.error('Erro ao iniciar o fluxo principal:', error);
    }
};


// Funções auxiliares para mensagens personalizadas
function saudacao() {
    const data = new Date();
    const hora = data.getHours();
    let str = '';
    if (hora >= 8 && hora < 15) {
        str = '*Bom Diaa! 🌞*';
    } else if (hora >= 15 && hora < 21) {
        str = '*Boa Tarde! 🌄*';
    } else {
        str = '*Boa Noite! 🌙*';
    }
    return str;
};

function feriado() {
    const hoje = new Date();
    const dataAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return feriados.includes(dataAtual);
};

function natal() {
    const hoje = new Date();
    const dataAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return Natal === dataAtual;
};

function reveilon() {
    const hoje = new Date();
    const dataAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return anonovo === dataAtual;
};

function carnaval() {
    const hoje = new Date();
    const dataAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return Carnaval.includes(dataAtual);
};

function pascoa() {
    const hoje = new Date();
    const dataAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return Pascoa === dataAtual;
};

function atendente() {
    const hoje = new Date();
    const hora = hoje.getHours();
    const dia = hoje.getDay();
    let str = '';
    if (dia <= 5 && dia >= 1 && hora >= 11 && hora < 22) {
        str = '😃 Aguarde um momento que logo será atendido.';
    } else if (dia === 6 && hora >= 11 && hora < 17) {
        str = '😃 Aguarde um momento que logo será atendido.';
    } else if (dia === 6 && hora >= 17) {
        str = '🏖️ *Aproveite o fim de semana!*\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (dia === 0) {
        str = '🏖️ *Aproveite o fim de semana!*\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (feriado()) {
        str = '🏖️ *Aproveite o feriado!*\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (reveilon()) {
        str = '🥂 *FELIZ ANO NOVO!* 🍾\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (natal()) {
        str = '🎅 *FELIZ NATAL!* 🎄\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (carnaval()) {
        str = '🎭 *FELIZ CARNAVAL!* 🎉\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else if (pascoa()) {
        str = '🍫 *FELIZ PÁSCOA!* 🐇\n\n😃 Entraremos em contato assim que possível.\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    } else {
        str = 'Humm... \n😌 Já estamos fora do horário de atendimento.\n\n😃 Mas não se preocupe, retornaremos assim que possível!\n\n🕗 _Nosso horário é de segunda a sexta de 09:00hs às 19:00hs e sábado de 09:00hs às 14:00hs._\n\n*Atendimento presencial mediante agendamento.*';
    }
    return str;
};


const delay = ms => new Promise(res => setTimeout(res, ms));
async function fimAtendimento(chat) {
    await chat.sendMessage('😊 Nosso atendimento está finalizado!');
}
   
const state = {};


async function handleUserMessage() {
    
    client.on('message', async (msg) => {   
        if (msg.isGroup || 
            internos.some(id => id === '@g.us' ? msg.from.endsWith('@g.us'): id === msg.from)) {
            return;
        }

        
    const from = msg.from;
    const mensagem = msg.body || msg.from.endsWith('@c.us');   
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname;
    const MAX_ATTEMPTS = 3;
    if (!state[from]) state[from] = { step: 0, attempts: 0 };
    const userState = state[from];
        
        const saudacoes = ['oi', 'bom dia', 'boa tarde', 'olá', 'Olá', 'Oi', 'Boa noite', 'Bom Dia', 'Bom dia', 'Boa Tarde', 'Boa tarde', 'Boa Noite', 'boa noite'];
        const catalogo = MessageMedia.fromFilePath('./catalogo_de_cores_casa_perfeita.pdf');
        if (userState.step === 0) {
            if (saudacoes.some(palavra => msg.body.includes(palavra))) {
                state.step = "mainMenu";
                const logo = MessageMedia.fromFilePath('./logo.jpg');
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, logo, { caption: `🙋‍♂️ *Olá, ${name}!* ${saudacao()}\n\nSou o Rodrigo, assistente virtual da *Casa Perfeita Planejados.*\n_Como posso ajudar?_\n\nDigite o *NÚMERO* de uma das opções abaixo:\n1️⃣ - Realizar projeto\n2️⃣ - Catálogo\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos\n6️⃣ - Estou em atendimento` });
                state[from] = {step: 1};
                return;
        }
    } else if (userState.step === 1) {
        switch (mensagem) {
            case "1":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '😃 *Maravilha!*\n\n➡️ É sua primeira experiência em compra de planejados?\n\n#️⃣ - *SIM*\n0️⃣ - *NÃO*');
                state[from] = {step:2};
                return;
            case "2":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '😃 *Excelente escolha!*\n\nVocê vai se encantar com nossos catálogos incríveis!\n\n_Irei encaminhar para você._');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Este aqui é o nosso catálogo de cores e acabamentos para você se encantar com nossas novidades. 👇');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, catalogo);
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Vou encaminhar o link do nosso instagram.\nLá você também encontra ótimas idéias para o seu projeto além de acompanhar o nosso incrível trabalho.\n\nBasta acessar o link abaixo. 👇\n\nhttps://www.instagram.com/casaperfeitaplanejados?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '👋 *Até logo!*');
                delete state[from];
                break;
            case "3":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '😉 Entendi, você precisa de assistência técnica.\n\nPara isso irei pedir algumas informações que irão agilizar o seu atendimento. Ok?');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Enquanto aguarda o atendente vou precisar:\n\n➡️ - *Nome completo, CPF ou número de contrato*\n➡️ - *Também preciso que nos envie um áudio relatando o problema com fotos ou um vídeo*');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, atendente());
                state [from] = {step:8};
                return;
            case "4":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '😃 *Que bom ter você como nosso cliente!*\n_Seu sonho está cada vez mais perto de ser realizado!_');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Enquanto aguarda o seu atendimento irei precisar que informe:\n\n➡️ - *Nome completo, CPF ou número de contrato*');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, atendente());
                state [from] = {step:8};
                return;
            case "5":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '😉 *Certo, vamos falar sobre outros assuntos*\n\nVou te encaminhar para um de nossos atendentes e enquanto isso, fique a vontade para descrever o que precisa.');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, atendente());
                state [from] = {step:8};
                return;
            case "6":
                await delay(3000);
                await chat.sendStateTyping();
                await delay(3000);
                await client.sendMessage(msg.from, atendente());
                state [from] = {step:8};
                return;

                default:
                    if (userState.attempts === undefined) userState.attempts = 0;
                    userState.attempts++;
                    const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                    if (userState.attempts >= MAX_ATTEMPTS) {
                        await client.sendMessage(
                            msg.from,
                            '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                        );
                        state[from] = { step: 0, attempts: 0 };
                        delete state[from]; 
                    } else {
                        await client.sendMessage(
                            msg.from,
                            `❌ *Opção inválida!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                        );
                    }
                    return;                
        }
    }



    else if(userState.step === 2) {
            switch (mensagem) {
                case "#":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);    
                await client.sendMessage(msg.from, '😃 *Tudo bem, iremos te ajudar*\n\nSe puder preencher o nosso formulário de *briefing abaixo* vai nos ajudar muito a entender melhor sua necessidade. 👇\n\nhttps://casaperfeitaplanejados.com.br/?page_id=639');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '➡️ É muito *importante* preencher todos os campos do formulário para nossa equipe conseguir desenvolver um projeto perfeito para você. 😃');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Gostaria de preencher agora ou prefere dar continuidade para preencher em outro momento?\n\n#️⃣ - *PREENCHER AGORA*\n0️⃣ - *PREENCHER DEPOIS*');
                state[from] = {step: 3};
                break;

             case "0":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);    
                await client.sendMessage(msg.from, '😃 *Perfeito!*\n\nSe puder preencher o nosso formulário de *briefing abaixo* vai nos ajudar muito a entender melhor sua necessidade. 👇\n\nhttps://casaperfeitaplanejados.com.br/?page_id=639');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '➡️ É muito *importante* preencher todos os campos do formulário para nossa equipe conseguir desenvolver um projeto perfeito para você.');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Gostaria de preencher agora ou prefere dar continuidade para preencher em outro momento?\n\n#️⃣ - *PREENCHER AGORA*\n0️⃣ - *PREENCHER DEPOIS*');
                state[from] = {step: 3};
                break;
                
                default:
                    if (userState.attempts === undefined) userState.attempts = 0;
                    userState.attempts++;
                    const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                    if (userState.attempts >= MAX_ATTEMPTS) {
                        await client.sendMessage(
                            msg.from,
                            '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                        );
                        state[from] = { step: 0, attempts: 0 };
                        delete state[from]; 
                    } else {
                        await client.sendMessage(
                            msg.from,
                            `❌ *Opção inválida!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                        );
                    }
                    return;

                
            }       
            
        }else if(userState.step === 3) {
            switch (mensagem) {
                case "#":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);    
                await client.sendMessage(msg.from, '😃 *Maravilha*\n\nVou aguardar o preenchimento do formulário para continuar com o seu atendimento.');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, '👋 *Até logo!*');
                state[from] = {step: 4};
                break;

             case "0":
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);    
                await client.sendMessage(msg.from, '😉 *Sem problemas!*\n\nVamos dar continuidade com o seu atendimento.');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Você possui a planta ou imagens do ambiente?\n\nIsso irá nos ajudar bastante na construção do seu projeto. 😉\n\n8️⃣ - SIM\n9️⃣ - NÃO');
                state[from] = {step: 5};
                return;
                
                default:
                    if (userState.attempts === undefined) userState.attempts = 0;
                    userState.attempts++;
                    const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                    if (userState.attempts >= MAX_ATTEMPTS) {
                        await client.sendMessage(
                            msg.from,
                            '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                        );
                        state[from] = { step: 0, attempts: 0 };
                        delete state[from]; 
                    } else {
                        await client.sendMessage(
                            msg.from,
                            `❌ *Opção inválida!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                        );
                    }
                    return;

                
            }       
            
        }
        
        else if (userState.step === 4) {
            const formRegex = ['Venho através do site', 'Disponibilidade de investimento', 'Olá, tudo bem?'];
            if (formRegex.some((word) => msg.body.includes(word))) {
                const audio = MessageMedia.fromFilePath('./audio_carol.mp3');
                await delay (3000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, `*😃 Maravilha, ${name}!*\n\nAgora que preencheu nosso formulário, irei encaminhar um áudio para te explicar como funciona o nosso trabalho.`);
                await delay (3000);
                await chat.sendStateRecording();
                await delay (10000);
                await client.sendMessage(msg.from, audio, {sendAudioAsVoice: true});
                await delay (90000);
                await chat.sendStateTyping();
                await delay (3000);
                await client.sendMessage(msg.from, 'Você possui a planta ou imagens do ambiente?\n\nIsso irá nos ajudar bastante na construção do seu projeto. 😉\n\n8️⃣ - SIM\n9️⃣ - NÃO');
                state[from] = {step: 5};
                return;
           
            
             } else{
                if (userState.attempts === undefined) userState.attempts = 0;
                userState.attempts++;
                const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                if (userState.attempts >= MAX_ATTEMPTS) {
                    await client.sendMessage(
                        msg.from,
                        '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                    );
                    state[from] = { step: 0, attempts: 0 };
                    delete state[from]; 
                } else {
                    await client.sendMessage(
                        msg.from,
                        `❌ *Formulário Inválido!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                    );
                }
        return;                
                
            }
            
        } else if (userState.step === 5) {
            switch (mensagem) {
                case "8":
                    await delay (3000);
                    await chat.sendStateTyping();
                    await delay (3000);
                    await client.sendMessage(msg.from, '😃 *Perfeito!*\n\nVou aguardar o envio dos arquivos que possuir.');
                    state[from] = {step: 6};
                    return;
                case "9":
                    await delay (3000);
                    await chat.sendStateTyping();
                    await delay (3000);
                    await client.sendMessage(msg.from, '😉 *Tudo bem!*\n\nVamos seguir com seu atendimento.\nTenho certeza que nossos especialistas irão encontrar a melhor maneira de construir um projeto perfeito para você!');
                    await delay (3000);
                    await chat.sendStateTyping();
                    await delay (3000);
                    await client.sendMessage(msg.from, atendente());
                    state [from] = {step:8};
                    return;
                
                    default:
                        if (userState.attempts === undefined) userState.attempts = 0;
                        userState.attempts++;
                        const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                        if (userState.attempts >= MAX_ATTEMPTS) {
                            await client.sendMessage(
                                msg.from,
                                '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                            );
                            state[from] = { step: 0, attempts: 0 };
                            delete state[from]; 
                        } else {
                            await client.sendMessage(
                                msg.from,
                                `❌ *Opção inválida!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                            );
                        }
                            return;
            }

            
            
            } else if (userState.step === 6) {

                if (msg.hasMedia && (msg.type === 'image' || msg.type === 'document' || msg.type === 'video') && msg.from.endsWith('@c.us')) {
                    await delay (3000);
                    await chat.sendStateTyping();
                    await delay (3000);
                    await client.sendMessage(msg.from, '😃 *Excelente!*\n\nAlém deste arquivo, você possui outro?\n\n8️⃣ - SIM\n9️⃣ - NÃO');
                    state[from] = {step: 7};
                    return;                   
                    
                    
             } else {
                if (userState.attempts === undefined) userState.attempts = 0;
                userState.attempts++;
                const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                if (userState.attempts >= MAX_ATTEMPTS) {
                    await client.sendMessage(
                        msg.from,
                        '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                    );
                    state[from] = { step: 0, attempts: 0 }; 
                    delete state[from];
                } else {
                    await client.sendMessage(
                        msg.from,
                        `❌ *Este não é um arquivo válido!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                    );
                }
            return;
                    
                    
                }

            }else if (userState.step === 7) {
                switch (mensagem) {
                    case "8":
                        await delay (3000);
                        await chat.sendStateTyping();
                        await delay (3000);
                        await client.sendMessage(msg.from, '😃 *Perfeito!*\n\nEstou aguardando o envio.');
                        state[from] = {step: 6};
                        return;
                    case "9":
                        await delay (3000);
                        await chat.sendStateTyping();
                        await delay (3000);
                        await client.sendMessage(msg.from, '😉 *Tudo bem!*\n\nVamos seguir com seu atendimento.');
                        await delay (3000);
                        await chat.sendStateTyping();
                        await delay (3000);
                        await client.sendMessage(msg.from, atendente());
                        state [from] = {step:8};
                        return;
                    
                        default:
                            if (userState.attempts === undefined) userState.attempts = 0;
                            userState.attempts++;
                            const tentativasRestantes = MAX_ATTEMPTS - userState.attempts;
                            if (userState.attempts >= MAX_ATTEMPTS) {
                                await client.sendMessage(
                                    msg.from,
                                    '❌ *Número de tentativas excedido!*\nAtendimento finalizado!\n\nDigite *Oi* para iniciar.'
                                );
                                state[from] = { step: 0, attempts: 0 };
                                delete state[from]; 
                            } else {
                                await client.sendMessage(
                                    msg.from,
                                    `❌ *Opção inválida!*\nVocê tem mais ${tentativasRestantes} tentativa(s).`
                                );
                            }
                                    return;
                }
            }else if (userState.step === 8){
                if (saudacoes.some(ignorar => msg.body.includes(ignorar))){
                    await delay(1800000);
                    delete state[from];
                    return;
               
                }else if(!saudacoes.some(ignorando => msg.body.includes(ignorando))){
                    await delay(1800000);
                    delete state[from];
                    return;

                }
            }
            
        } 
        
        
        

        )};
    let condicaoanuncios = false;

    function anunciosprogramados () {
        if (condicaoanuncios) {
            console.log ('Tarefa de anúncios já agendadas');
            return;
        }

     condicaoanuncios = true;
     
     let mensagensEnviadas = new Set();
     cron.schedule('0 * * * *', async () => {
        const agora = new Date();
        const horaAtual = agora.getHours();
        const diaAtual = agora.getDay();

        if (diaAtual >= 1 && diaAtual <= 6 && horarios.includes(horaAtual)) {
            
            const chaveEnvio = `${diaAtual}-${horaAtual}`;
            if (mensagensEnviadas.has(chaveEnvio)){
                return;
            }

            mensagensEnviadas.add(chaveEnvio);

            const imagens = [
                './diaum.jpeg',
                './diadois.jpg',
                './diatres.jpg',
                './diaquatro.jpg',
                'diacinco.jpg',
                'diaseis.jpeg'
            ];

            const caminhoImagem = imagens[diaAtual - 1];

            if (!fs.existsSync(caminhoImagem)) {
                console.log(`Arquivo de imagem não encontrado ${caminhoImagem}`);
                return;
            }
            const anuncio = MessageMedia.fromFilePath(caminhoImagem);
            const mensagem = 'Saiba mais clicando no link abaixo 👇\nhttps://wa.me/message/O7YMVIYJHYIBG1';

            for (const grupo of grupos) {
                try{
                await client.sendMessage(grupo, anuncio, {caption: mensagem});
                console.log(`Mensagem enviada para o grupo, ${grupo}`);
                }catch (error) {
                    console.log(`Erro ao enviar mensagem para o grupo, ${grupo}`, error);
                }
            }


        }


     });
    }
    
    main();
