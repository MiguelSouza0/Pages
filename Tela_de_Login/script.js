const form = document.getElementById('loginForm'); 
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('password');
const botaoEntrar = form.querySelector('button[type="submit"]');
const divMensagem = document.getElementById('message');

let emailTimeout;

const validarInputs = () => {
    const email = inputEmail.value.trim();
    const password = inputSenha.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emailValido = regexEmail.test(email);
    const senhaValida = password.length >= 6;

    botaoEntrar.disabled = !(emailValido && senhaValida);
    return { emailValido, senhaValida };
};

const exibirMensagem = (msg, type) => {
    divMensagem.textContent = msg;
    divMensagem.className = type;
    divMensagem.style.display = msg ? 'block' : 'none';
};

const tratarMudancaEmail = () => {
    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(() => {
        const { emailValido } = validarInputs();
        exibirMensagem(emailValido ? "" : "Por favor, insira um email válido.", "error");
    }, 1000);
};

const tratarMudancaSenha = () => {
    const { senhaValida } = validarInputs();
    exibirMensagem(senhaValida ? "" : "A senha deve ter pelo menos 6 caracteres.", "error");
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { emailValido, senhaValida } = validarInputs();
    if (!emailValido) return exibirMensagem("Por favor, insira um email válido.", "error");
    if (!senhaValida) return exibirMensagem("A senha deve ter pelo menos 6 caracteres.", "error");

    exibirMensagem("Enviando dados...", "success");
    setTimeout(() => exibirMensagem("Login efetuado com sucesso!", "success"), 1000);
});

inputEmail.addEventListener('input', tratarMudancaEmail);
inputSenha.addEventListener('input', tratarMudancaSenha);
