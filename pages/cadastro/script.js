document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.querySelector('.cadastro-form');
    const inputName = document.getElementById('reg-name');
    const inputEmail = document.getElementById('reg-email');
    const inputPassword = document.getElementById('reg-password');
    const checkboxPrivacy = document.getElementById('privacy-policy');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            // Evita que a página recarregue e limpe os dados antes da validação
            e.preventDefault();

            // 1. Validação de Caracteres: Nome Completo (Pelo menos nome e sobrenome)
            const nomeDigitado = inputName.value.trim();
            if (nomeDigitado.split(' ').length < 2) {
                alert('Por favor, digite seu nome completo (Nome e Sobrenome).');
                inputName.focus();
                return;
            }

            // 2. Validação de Caracteres: E-mail válido usando Regex simples
            const emailDigitado = inputEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailDigitado)) {
                alert('Por favor, insira um e-mail válido.');
                inputEmail.focus();
                return;
            }

            // 3. Validação de Caracteres: Segurança da Senha (Mínimo 6 caracteres)
            const senhaDigitada = inputPassword.value;
            if (senhaDigitada.length < 6) {
                alert('A senha deve conter no mínimo 6 caracteres para sua segurança.');
                inputPassword.focus();
                return;
            }

            // 4. Validação de Clique: Aceite dos Termos de Privacidade
            if (!checkboxPrivacy.checked) {
                alert('Você precisa ler e aceitar a Política de Privacidade para abrir a conta.');
                return;
            }

            // 1. Simula o salvamento dos dados no navegador (LocalStorage)
            localStorage.setItem('usuarioNome', nomeDigitado);
            localStorage.setItem('usuarioEmail', emailDigitado);

            // 2. Feedback visual de sucesso para o cliente
            alert(`Parabéns, ${nomeDigitado}! Sua conta no AnyBank foi aberta com sucesso. 🎉`);

            // 3. Redireciona de forma inteligente para a Dashboard que você já codificou
            window.location.href = '../dashboard/index.html';
        });
    }
});