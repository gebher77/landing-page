document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('back-to-top');
    const sectionSelector = document.getElementById('section-selector');
    const sections = document.querySelectorAll('section'); // Seleciona todas as seções

    // Mostrar/ocultar o botão baseado na rolagem
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) { // Mostrar o botão após rolar 300px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
            sectionSelector.style.display = 'none'; // Oculta o menu ao rolar para cima
        }
    });

    // Mostrar o menu de seleção ao passar o mouse sobre o botão
    backToTopButton.addEventListener('mouseover', () => {
        sectionSelector.style.display = 'block'; // Exibe o menu ao passar o mouse
    });

    // Oculta o menu ao sair do mouse
    backToTopButton.addEventListener('mouseout', () => {
        sectionSelector.style.display = 'none'; // Oculta o menu ao sair do mouse
    });

    // Oculta o menu ao passar o mouse sobre o menu também
    sectionSelector.addEventListener('mouseover', () => {
        sectionSelector.style.display = 'block'; // Mantém o menu visível ao passar o mouse
    });

    // Oculta o menu ao sair do mouse
    sectionSelector.addEventListener('mouseout', () => {
        sectionSelector.style.display = 'none'; // Oculta o menu ao sair do mouse
    });

    // Rolagem suave para a seção selecionada
    sectionSelector.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault(); // Evita o comportamento padrão do link
            const targetId = e.target.getAttribute('href').substring(1); // Pega o ID da seção
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Rolagem suave
                });
                sectionSelector.style.display = 'none'; // Oculta o menu após a seleção
            }
        }
    });

    // Variável para controlar a direção da rolagem
    let lastScrollY = window.scrollY;

    // Função de callback do Intersection Observer
    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            const sectionLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if(!sectionLink){
                return
            }
            const sectionListItem = sectionLink.parentElement; // O item <li> correspondente
         

            if (entry.isIntersecting) {
                sectionListItem.style.display = 'block'; // Exibe o item da lista quando a seção estiver visível
            } else if (!entry.isIntersecting && window.scrollY < lastScrollY) {
                // Se a seção não estiver visível e o usuário está rolando para cima
                sectionListItem.style.display = 'none'; // Esconde o item da lista
            }
        });

        // Atualiza a posição da rolagem
        lastScrollY = window.scrollY;
    };

    // Configura o Intersection Observer
    const observerOptions = {
        threshold: 0.5 // Define que 50% da seção precisa estar visível
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observa todas as seções
    sections.forEach(section => observer.observe(section));

    // Exibe todos os links de seção no menu (inicialmente escondidos)
    const sectionLinks = document.querySelectorAll('#section-selector ul li');
    sectionLinks.forEach(link => {
        link.style.display = 'none'; // Inicialmente esconde todos os itens da lista
    });
});
