const funcionarios = [];

// Função para abrir o modal e limpar os campos
function openModal() {
    document.getElementById('form-modal').reset(); // Limpa o formulário
    const modal = new bootstrap.Modal(document.getElementById('funcionarioModal')); // Instancia o modal
    modal.show(); // Mostra o modal
}

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se tem 11 dígitos ou se todos são iguais
    }

    // Cálculo dos dígitos verificadores
    let soma = 0;
    let resto;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    // Segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true; // CPF válido
}

// Função para salvar os dados
document.getElementById('form-modal').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nome = document.getElementById('m-sNome').value;
    const funcao = document.getElementById('m-funcao').value;
    const salario = document.getElementById('m-salario').value;
    const email = document.getElementById('m-email').value;
    const cpf = document.getElementById('m-cpf').value;
    const contato = document.getElementById('m-contato').value;
    const conta = document.getElementById('m-conta').value;
    const dataNascimento = document.getElementById('m-dataNascimento').value;
    const dataAdmissao = document.getElementById('m-dataAdmissao').value;

    // Valida o CPF
    if (!validarCPF(cpf)) {
        alert('CPF inválido! Por favor, insira um CPF válido.');
        return; // Interrompe o processo caso o CPF seja inválido
    }

    // Adiciona o novo funcionário ao array
    funcionarios.push({
        nome,
        funcao,
        salario,
        email,
        cpf,
        contato,
        conta,
        dataNascimento,
        dataAdmissao,
    });

    atualizarTabela(); // Atualiza a tabela
    const modal = bootstrap.Modal.getInstance(document.getElementById('funcionarioModal'));
    modal.hide(); // Fecha o modal
});

// Função para atualizar a tabela
function atualizarTabela() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = ''; // Limpa a tabela

    funcionarios.forEach((funcionario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.funcao}</td>
            <td>${funcionario.salario}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.contato}</td>
            <td>${funcionario.conta}</td>
            <td>${funcionario.dataNascimento}</td>
            <td>${funcionario.dataAdmissao}</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm" onclick="editarFuncionario(${index})">Editar</button>
            </td>
            <td class="text-center">
                <button class="btn btn-danger btn-sm" onclick="excluirFuncionario(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para excluir um funcionário
function excluirFuncionario(index) {
    funcionarios.splice(index, 1); // Remove o funcionário do array
    atualizarTabela(); // Atualiza a tabela
}

// Função para editar um funcionário
function editarFuncionario(index) {
    const funcionario = funcionarios[index];

    document.getElementById('m-sNome').value = funcionario.nome;
    document.getElementById('m-funcao').value = funcionario.funcao;
    document.getElementById('m-salario').value = funcionario.salario;
    document.getElementById('m-email').value = funcionario.email;
    document.getElementById('m-cpf').value = funcionario.cpf;
    document.getElementById('m-contato').value = funcionario.contato;
    document.getElementById('m-conta').value = funcionario.conta;
    document.getElementById('m-dataNascimento').value = funcionario.dataNascimento;
    document.getElementById('m-dataAdmissao').value = funcionario.dataAdmissao;

    const modal = new bootstrap.Modal(document.getElementById('funcionarioModal'));
    modal.show();

    // Atualiza o botão Salvar
    document.getElementById('btnSalvar').onclick = function () {
        funcionario.nome = document.getElementById('m-sNome').value;
        funcionario.funcao = document.getElementById('m-funcao').value;
        funcionario.salario = document.getElementById('m-salario').value;
        funcionario.email = document.getElementById('m-email').value;
        funcionario.cpf = document.getElementById('m-cpf').value;
        funcionario.contato = document.getElementById('m-contato').value;
        funcionario.conta = document.getElementById('m-conta').value;
        funcionario.dataNascimento = document.getElementById('m-dataNascimento').value;
        funcionario.dataAdmissao = document.getElementById('m-dataAdmissao').value;

        atualizarTabela();
        modal.hide();
    };
}
