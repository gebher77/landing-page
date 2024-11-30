// Cria uma instância do IntersectionObserver, que será usada para observar mudanças na visibilidade dos elementos
const observer = new IntersectionObserver((entries) => {
    // A função de callback é executada sempre que um elemento observado entra ou sai da área visível
    entries.forEach((entry) => {
        // Verifica se o elemento está visível na viewport
        if (entry.isIntersecting) {
            // Adiciona ou remove a classe 'show' no elemento observado, dependendo do estado de visibilidade
            entry.target.classList.toggle('show', entry.isIntersecting);
        }
    });
});

// Seleciona todos os elementos com a classe 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');

// Para cada elemento com a classe 'hidden', adiciona o observador
hiddenElements.forEach((el) => observer.observe(el));
