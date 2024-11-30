// Seleciona o elemento do menu hamburguer
const hamMenu = document.querySelector('.ham-menu');

// Seleciona o menu que será exibido fora da tela
const offScreenMenu = document.querySelector('.off-screen-menu');

// Seleciona a imagem do ícone do menu hamburguer
const hamImage = document.querySelector('#ham-image');

// Adiciona um ouvinte de evento para o clique no menu hamburguer
hamMenu.addEventListener('click', () => {
    // Altera a imagem do ícone entre 'menu.svg' e 'close.svg' dependendo do estado atual
    hamImage.src = hamImage.src.includes('menu.svg') 
        ? './assets/imgs/close.svg'  // Muda para o ícone de "fechar" se atualmente for "menu"
        : './assets/imgs/menu.svg'; // Muda para o ícone de "menu" se atualmente for "fechar"

    // Adiciona ou remove a classe 'active' no menu fora da tela
    offScreenMenu.classList.toggle('active');
});

// Define uma função para lidar com a mudança de tamanho da janela
const handleResize = () => {
    // Se a largura da janela for maior ou igual a 835px
    if (window.innerWidth >= 835) {
        // Remove a classe 'active' do menu fora da tela
        offScreenMenu.classList.remove('active');
        
        // Garante que o ícone do menu hamburguer seja o padrão ('menu.svg')
        hamImage.src = './assets/imgs/menu.svg';
    }
};

// Executa a função handleResize inicialmente para garantir que o menu esteja configurado corretamente
handleResize();

// Adiciona um ouvinte de evento para detectar redimensionamentos da janela
window.addEventListener('resize', handleResize);
