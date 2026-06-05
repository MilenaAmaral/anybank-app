document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LÓGICA DE OCULTAR/MOSTRAR SALDO E TRANSAÇÃO ===
    const eyeBtn = document.getElementById('eye-btn');
    const balanceAmount = document.getElementById('balance-amount');
    
    // Variáveis de controle do saldo numérico
    let originalBalance = balanceAmount ? balanceAmount.textContent : "R$ 3.842,50";
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

    // === 2. LÓGICA DE SOMAR NOVA TRANSAÇÃO ===
    const btnAddTransaction = document.getElementById('btn-add-transaction');
    const inputAmount = document.querySelector('.input-amount') || document.querySelector('input[type="number"]') || document.getElementById('transaction-value'); 
    // Nota: Certifique-se de que seu input de valor tenha a classe '.input-amount' ou adicione o id correspondente

    if (btnAddTransaction && balanceAmount && inputAmount) {
        btnAddTransaction.addEventListener('click', () => {
            const inputValue = parseFloat(inputAmount.value);

            // Validação simples para não adicionar campos vazios ou zerados
            if (isNaN(inputValue) || inputValue <= 0) {
                alert("Por favor, digite um valor válido para a operação.");
                return;
            }

            // 1. Extrai o valor numérico do saldo atual (Remove "R$", pontos de milhar e troca a vírgula por ponto)
            let cleanBalance = originalBalance.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
            let currentBalanceNumber = parseFloat(cleanBalance);

            // 2. Realiza a soma do valor digitado
            let newBalanceNumber = currentBalanceNumber + inputValue;

            // 3. Formata novamente o número para o padrão de moeda Real (R$)
            originalBalance = newBalanceNumber.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // 4. Atualiza a tela se o saldo estiver visível, senão atualiza apenas o valor guardado por trás
            if (isVisible) {
                balanceAmount.textContent = originalBalance;
            }

            // 5. Limpa o campo de input após o sucesso
            inputAmount.value = "";
            
            // Opcional: Feedback visual de sucesso
            alert(`Sucesso! R$ ${inputValue.toFixed(2).replace('.', ',')} adicionados ao saldo.`);
        });
    }

    // === 3. LÓGICA DO MENU HAMBÚRGUER ===
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