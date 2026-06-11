document.addEventListener('DOMContentLoaded', () => {
    
    // === 0. LOGICA DE USUÁRIO E SAUDAÇÃO DINÂMICA ===
    const userGreetingTitle = document.getElementById('user-greeting-title');
    const headerUserName = document.getElementById('header-user-name');
    const dadosUsuario = localStorage.getItem('usuarioLogado');

    if (dadosUsuario) {
        const usuario = JSON.parse(dadosUsuario);
        const firstName = usuario.nome.split(' ')[0];
        
        // Atualiza os dois pontos do HTML com o nome real do usuário
        if (userGreetingTitle) userGreetingTitle.textContent = `Olá, ${firstName}! :)`;
        if (headerUserName) headerUserName.textContent = usuario.nome;
    }

    // === 1. BASE DE DADOS DO EXTRATO (TRANSAÇÕES INICIAIS) ===
    const statementList = document.getElementById('statement-list');
    
    // Lista inicial simulando dados que viriam do histórico
    let transacoes = [
        { tipo: 'Compra', desc: 'Mercado Livre *Compra', valor: -124.90, data: '04/06/2026' },
        { tipo: 'Refeição', desc: 'iFood *Refeição', valor: -68.50, data: '03/06/2026' },
        { tipo: 'Depósito', desc: 'AnyBank - Saldo Inicial / Salário', valor: 4200.00, data: '01/06/2026' },
        { tipo: 'Combustível', desc: 'Posto Petrobras *Combustível', valor: -164.10, data: '28/05/2026' }
    ];

    // Função interna para renderizar a lista de extrato na tela
    function renderizarExtrato() {
        if (!statementList) return;
        statementList.innerHTML = ''; // Limpa a lista antiga

        transacoes.forEach(transacao => {
            const li = document.createElement('li');
            li.classList.add('statement-item');

            // Verifica se o valor é positivo ou negativo para aplicar a cor verde se for depósito
            const estiloCor = transacao.valor > 0 ? 'style="color: #2E7D32;"' : '';
            const sinal = transacao.valor > 0 ? '+ ' : '- ';
            
            // Formata o número puro para moeda Real (BRL)
            const valorFormatado = Math.abs(transacao.valor).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            li.innerHTML = `
                <div class="statement-info">
                    <div class="statement-text-group">
                        <span class="statement-value text-md" ${estiloCor}>${sinal}${valorFormatado}</span>
                        <p class="statement-desc text-xs">${transacao.desc}</p>
                    </div>
                    <span class="statement-date text-s">${transacao.data}</span>
                </div>
            `;
            statementList.appendChild(li);
        });
    }

    // Renderiza as transações iniciais assim que a página carrega
    renderizarExtrato();


    // === 2. LÓGICA DE OCULTAR/MOSTRAR SALDO ===
    const eyeBtn = document.getElementById('eye-btn');
    const balanceAmount = document.getElementById('balance-amount');
    
    let originalBalance = balanceAmount ? balanceAmount.textContent.trim() : "R$ 3.842,50";
    const hiddenBalance = "R$ ••••••";
    let isVisible = true;

    if (eyeBtn && balanceAmount) {
        eyeBtn.addEventListener('click', () => {
            if (isVisible) {
                balanceAmount.textContent = hiddenBalance;
                eyeBtn.textContent = "🙈"; 
                isVisible = false;
            } else {
                balanceAmount.textContent = originalBalance;
                eyeBtn.textContent = "👁️"; 
                isVisible = true;
            }
        });
    }


    // === 3. LÓGICA DE CALCULAR E ADICIONAR NOVA TRANSAÇÃO ===
    const transactionForm = document.getElementById('transaction-form');
    const selectType = document.getElementById('transaction-type');
    const inputAmount = document.getElementById('transaction-value');

    if (transactionForm && balanceAmount && inputAmount && selectType) {
        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita o reload da página nativo do form submit

            const inputValue = parseFloat(inputAmount.value);
            const tipoOperacao = selectType.value;

            if (isNaN(inputValue) || inputValue <= 0) {
                alert("Por favor, digite um valor válido para a operação.");
                return;
            }

            // 1. Converte o saldo da tela em número real para o cálculo matemático
            let cleanBalance = originalBalance.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
            let currentBalanceNumber = parseFloat(cleanBalance);

            // 2. Define o valor final da transação baseando-se no tipo de operação comercial (saída de dinheiro)
            // Como é um internet banking de pagamentos, as operações da lista subtraem do saldo.
            let valorTransacao = -inputValue; 
            let descricaoExtrato = `${tipoOperacao} efetuado`;

            // Validação crucial: impede o usuário de gastar o que não tem
            if (currentBalanceNumber - inputValue < 0) {
                alert("Saldo insuficiente para realizar esta operação de débito.");
                return;
            }

            // 3. Executa a matemática do saldo
            let newBalanceNumber = currentBalanceNumber + valorTransacao;

            // 4. Salva o novo saldo formatado de volta na variável de controle
            originalBalance = newBalanceNumber.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // 5. Se o olhinho estiver aberto, renderiza o valor atualizado na hora
            if (isVisible) {
                balanceAmount.textContent = originalBalance;
            }

            // 6. Cria a data atual formatada dinamicamente (DD/MM/AAAA)
            const hoje = new Date();
            const dataFormatada = hoje.toLocaleDateString('pt-BR');

            // 7. Insere a nova transação bem no início do Array (topo do extrato)
            transacoes.unshift({
                tipo: tipoOperacao,
                desc: descricaoExtrato,
                valor: valorTransacao,
                data: dataFormatada
            });

            // Re-renderiza o extrato completo com o novo item animado no topo
            renderizarExtrato();

            // 8. Reseta o formulário limpando os campos
            transactionForm.reset();
            
            alert(`Sucesso! Operação de ${tipoOperacao} no valor de R$ ${inputValue.toFixed(2).replace('.', ',')} realizada.`);
        });
    }


    // === 4. LÓGICA DO MENU HAMBÚRGUER (MOBILE) ===
    const menuHamburger = document.getElementById('menu-hamburger');
    const sidebar = document.querySelector('.sidebar');

    if (menuHamburger && sidebar) {
        menuHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active-mobile');
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && e.target !== menuHamburger) {
                sidebar.classList.remove('active-mobile');
            }
        });
    }
});