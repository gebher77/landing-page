// Seleciona o contêiner da seção de "Nossos Serviços"
const ourServices = document.querySelector('.our_services');

// Seleciona o contêiner dos cartões de serviços (detalhamento)
const ourServicesCards = document.querySelector('.our_services_cards');

// Seleciona o botão "Ver Mais" para expandir a seção de serviços
const servicesButtonSeeMore = document.querySelector('#services-button-see_more');

// Seleciona o botão "Ver Menos" para recolher a seção de serviços
const servicesButtonSeeLess = document.querySelector('#services-button-see_less');

// Adiciona um ouvinte de evento para o botão "Ver Mais"
servicesButtonSeeMore.addEventListener('click', () => {
    // Oculta a seção principal de serviços
    ourServices.setAttribute('hidden', true);

    // Exibe os cartões detalhados de serviços
    ourServicesCards.removeAttribute('hidden');
});

// Adiciona um ouvinte de evento para o botão "Ver Menos"
servicesButtonSeeLess.addEventListener('click', () => {
    // Oculta os cartões detalhados de serviços
    ourServicesCards.setAttribute('hidden', true);

    // Exibe a seção principal de serviços
    ourServices.removeAttribute('hidden');
});
