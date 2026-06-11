document.addEventListener('DOMContentLoaded', () => {
    
    // === 0. LÓGICA DO NOME DINÂMICO (INTEGRADO COM O NOVO CADASTRO) ===
    const userGreeting = document.getElementById('user-greeting');
    const dadosUsuario = localStorage.getItem('usuarioLogado');

    if (userGreeting && dadosUsuario) {
        // Converte a string do LocalStorage de volta para objeto
        const usuario = JSON.parse(dadosUsuario);
        
        // Pega apenas o primeiro nome
        const firstName = usuario.nome.split(' ')[0];
        userGreeting.textContent = firstName;
    } else if (userGreeting) {
        // Caso não encontre ninguém logado (segurança), define um nome padrão ou redireciona
        userGreeting.textContent = "Cliente";
    }

    // === 1. LÓGICA DE OCULTAR/MOSTRAR SALDO ===
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

    // === 2. LÓGICA DE SOMAR NOVA TRANSAÇÃO ===
    const btnAddTransaction = document.getElementById('btn-add-transaction');
    const inputAmount = document.querySelector('.input-amount') || document.querySelector('input[type="number"]') || document.getElementById('transaction-value'); 

    if (btnAddTransaction && balanceAmount && inputAmount) {
        btnAddTransaction.addEventListener('click', () => {
            const inputValue = parseFloat(inputAmount.value);

            // Validação de caracteres e campos vazios
            if (isNaN(inputValue) || inputValue <= 0) {
                alert("Por favor, digite um valor válido para a operação.");
                inputAmount.focus();
                return;
            }

            // 1. Extrai o valor numérico do saldo atual tirando formatações de moeda
            let cleanBalance = originalBalance.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
            let currentBalanceNumber = parseFloat(cleanBalance);

            // 2. Realiza a soma do valor digitado
            let newBalanceNumber = currentBalanceNumber + inputValue;

            // 3. Atualiza a variável com o novo formato de moeda corrente
            originalBalance = newBalanceNumber.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // 4. Se o saldo estiver visível, atualiza na tela imediatamente. Se estiver oculto, mantém oculto.
            if (isVisible) {
                balanceAmount.textContent = originalBalance;
            }

            // 5. Limpa o campo de input
            inputAmount.value = "";
            
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