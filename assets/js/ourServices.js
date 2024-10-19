const ourServices = document.querySelector('.our_services');
const ourServicesCards = document.querySelector('.our_services_cards');
const servicesButtonSeeMore = document.querySelector('#services-button-see_more');
const servicesButtonSeeLess = document.querySelector('#services-button-see_less');

servicesButtonSeeMore.addEventListener('click', () => {
    ourServices.setAttribute('hidden', true);
    ourServicesCards.removeAttribute('hidden');
});

servicesButtonSeeLess.addEventListener('click', () => {
    ourServicesCards.setAttribute('hidden', true);
    ourServices.removeAttribute('hidden');
});

