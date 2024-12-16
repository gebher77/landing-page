document.addEventListener("DOMContentLoaded", function () {
  const breadcrumbContainer = document.getElementById('breadcrumb');
  if (!breadcrumbContainer) return;

  const pathMap = {
    'index.html': 'Início',
    'privacy-services.html': 'Termos de serviço e políticas de privacidade',
    'aboutUs.html': 'Sobre nós',
    'contact.html': 'Contato',
    'work_with_us.html': 'Trabalhe conosco'
  };

  const currentPath = window.location.pathname.split('/').pop();
  const breadcrumbItems = [];

  const referrerPath = document.referrer 
    ? new URL(document.referrer).pathname.split('/').pop() 
    : null;

  // Adiciona o primeiro item (referrer) se existir
  if (referrerPath && pathMap[referrerPath]) {
    breadcrumbItems.push(`<a href="${document.referrer}">${pathMap[referrerPath]}</a>`);
  }

  // Adiciona o segundo item (breadcrumb atual)
  if (pathMap[currentPath]) {
    breadcrumbItems.push(
      breadcrumbItems.length === 1 // Verifica se já existe um item
        ? `<a href="#">${pathMap[currentPath]}</a>` // Aplica estilo ao segundo item
        : pathMap[currentPath] // Caso contrário, adiciona sem estilização
    );
  }

  function renderBreadcrumb() {
    breadcrumbContainer.innerHTML = breadcrumbItems.join(' <img src="./assets/imgs/seta.svg" alt="Seta de navegação"> ');
  }

  // Função para atualizar o texto do breadcrumb
  function updateBreadcrumbText() {
    if (window.innerWidth < 450) {
      pathMap['privacy-services.html'] = 'Termos de serviço e ...';
    } else {
      pathMap['privacy-services.html'] = 'Termos de serviço e políticas de privacidade';
    }

    // Atualiza o breadcrumb atual
    if (breadcrumbItems.length === 2) {
      breadcrumbItems[1] = `<a href="#">${pathMap[currentPath]}</a>`;
    } else {
      breadcrumbItems[breadcrumbItems.length - 1] = pathMap[currentPath];
    }
    renderBreadcrumb();
  }

  // Adiciona o evento de resize
  window.addEventListener('resize', updateBreadcrumbText);

  // Chama a função para definir o texto inicial
  updateBreadcrumbText();
  renderBreadcrumb();
});