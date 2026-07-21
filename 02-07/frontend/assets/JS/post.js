// Seleciona todos os botões do menu
const buttons = document.querySelectorAll(".menu-btn");

// Seleciona todas as abas (sections)
const sections = document.querySelectorAll(".post-card");

// Adiciona o evento de clique em cada botão
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove a classe active de todos os botões
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Remove a classe active de todas as seções
        sections.forEach((section) => {
            section.classList.remove("active");
        });

        // Ativa o botão clicado
        button.classList.add("active");

        // Pega o valor do data-target
        const target = button.dataset.target;

        // Mostra a seção correspondente
        const section = document.getElementById(`tab-${target}`);

        if (section) {
            section.classList.add("active");
        }

    });

});