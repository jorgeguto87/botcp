# botcp
Chatbot de atendimento para empresas de móveis planejados em Whatsapp-web.js

Este CHATBOT foi construído em nodejs para uso em uma empresa de móveis planejados, código simples e leve com envio de áudios, documentos pdf e reações a palavras chave. 

Possui comando Bom dia, Boa tarde e Boa noite além de chamar o atendente humano a partir do horário de atendimento. Se estiver fora do horário de atendimento ele não deixa o cliente aguardando e se for final de semana já envia uma mensagem personalizada para isso.

Sua construção foi feita em Node.js e possui configurações de hora para UTC central, Ou seja o horário de atendimento está 3hs adiantado no corpo do index.js para conciliar com ho TIMESTAMP do servidor virtual da AWS ou GCLOUD.
