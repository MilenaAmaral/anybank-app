document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.querySelector('.cadastro-form');
    const inputName = document.getElementById('reg-name');
    const inputEmail = document.getElementById('reg-email');
    const inputPassword = document.getElementById('reg-password');
    const checkboxPrivacy = document.getElementById('privacy-policy');

    if (!cadastroForm) return; // Cláusula de guarda: para se o formulário não existir

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Coleta e limpa os valores dos inputs
        const nomeDigitado = inputName.value.trim();
        const emailDigitado = inputEmail.value.trim();
        const senhaDigitada = inputPassword.value;

        // 2. Executa as validações organizadas
        if (!validarNome(nomeDigitado)) {
            mostrarErro(inputName, 'Por favor, digite seu nome completo (Nome e Sobrenome).');
            return;
        }

        if (!validarEmail(emailDigitado)) {
            mostrarErro(inputEmail, 'Por favor, insira um e-mail válido.');
            return;
        }

        if (senhaDigitada.length < 6) {
            mostrarErro(inputPassword, 'A senha deve conter no mínimo 6 caracteres para sua segurança.');
            return;
        }

        if (!checkboxPrivacy.checked) {
            alert('Você precisa ler e aceitar a Política de Privacidade para abrir a conta.');
            return;
        }

        // 3. Salva os dados simulando um Banco de Dados Real (JSON no LocalStorage)
        const novoUsuario = {
            nome: nomeDigitado,
            email: emailDigitado
        };
        
        // Transformamos o objeto em String para salvar com segurança
        localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));

        // 4. Feedback e Redirecionamento Inteligente
        alert(`Parabéns, ${nomeDigitado}! Sua conta no AnyBank foi aberta com sucesso. 🎉`);
        window.location.href = '../dashboard/index.html';
    });
});

/* ==========================================================================
   FUNÇÕES AUXILIARES DE VALIDAÇÃO (CLEAN CODE)
   ========================================================================== */

// Valida se há pelo menos duas palavras no nome
function validarNome(nome) {
    const partesNome = nome.split(' ').filter(part => part.length > 0);
    return partesNome.length >= 2;
}

// Valida o formato do e-mail com regex
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gerencia o foco e o feedback de erro do usuário
function mostrarErro(elementoInput, mensagem) {
    alert(mensagem); // Mantive o alert aqui temporariamente para não quebrar seu fluxo, mas o input já ganha o foco automático abaixo
    elementoInput.focus();
}