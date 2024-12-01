// import { translateHTML } from './contact_form.js'; 

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');

  const originalH2s = [
    "Contas de Usuário",
    "Pagamentos e Reembolsos",
    "Restrições de Uso",
    "Modificações dos Termos de Serviço",
    "Limitação de Responsabilidade",
  ];

  const originalParagraphs = [
    "Os usuários concordam em usar os serviços da TechNova Solutions de maneira legal e ética. Qualquer comportamento que comprometa a integridade, segurança ou disponibilidade dos serviços será considerado uma violação dos Termos de Serviço. A TechNova Solutions reserva-se o direito de suspender ou encerrar o acesso aos serviços para qualquer usuário que viole esses termos.Os usuários devem garantir que todas as informações fornecidas durante o uso dos serviços sejam precisas e atualizadas. A TechNova Solutions não se responsabiliza por quaisquer danos ou perdas resultantes de informações incorretas ou desatualizadas fornecidas pelos usuários.",
    "Cada usuário é responsável por manter a segurança de sua conta e senha. A TechNova Solutions não se responsabiliza por qualquer perda ou dano decorrente do uso não autorizado da conta do usuário. Os usuários devem notificar imediatamente a TechNova Solutions sobre qualquer uso não autorizado de suas contas ou qualquer outra violação de segurança. A TechNova Solutions reserva-se o direito de encerrar contas inativas ou que violem os Termos de Serviço. Os usuários concordam em não usar suas contas para atividades ilícitas ou prejudiciais, incluindo a distribuição de malware ou a realização de ataques cibernéticos.",
    "Todos os pagamentos pelos serviços prestados devem ser feitos de acordo com os termos acordados no momento da contratação. A TechNova Solutions pode suspender ou encerrar o acesso aos serviços em caso de falta de pagamento. Os usuários são responsáveis por todas as taxas e encargos associados ao uso dos serviços. Os pedidos de reembolso serão analisados caso a caso, de acordo com a política de reembolso da TechNova Solutions. Os reembolsos podem estar sujeitos a certas condições e podem não estar disponíveis para todos os serviços.",
    "Os usuários concordam em não utilizar os serviços da TechNova Solutions para qualquer atividade ilegal ou não autorizada. Isso inclui, mas não se limita a, violação de direitos de propriedade intelectual, distribuição de conteúdo ofensivo ou difamatório, e tentativa de acessar sistemas não autorizados. Qualquer uso dos serviços que prejudique o funcionamento dos sistemas da TechNova Solutions ou que interfira com o uso dos serviços por outros usuários será considerado uma violação destes termos.",
    "A TechNova Solutions reserva-se o direito de modificar estes Termos de Serviço a qualquer momento. Quaisquer alterações serão publicadas no site da TechNova Solutions e os usuários serão notificados por e-mail ou através do serviço. O uso contínuo dos serviços após a publicação das alterações constitui a aceitação dos novos termos. Se qualquer alteração for considerada inaceitável, os usuários podem encerrar seu uso dos serviços. A TechNova Solutions recomenda que os usuários revisem os Termos de Serviço periodicamente para se manterem informados sobre quaisquer mudanças.",
    "A TechNova Solutions não será responsável por qualquer dano indireto, incidental ou consequencial resultante do uso ou incapacidade de uso dos serviços. Isso inclui, mas não se limita a, perda de lucros, interrupção de negócios ou perda de informações. A responsabilidade total da TechNova Solutions por qualquer reclamação relacionada aos serviços será limitada ao valor pago pelo usuário pelos serviços nos últimos seis meses. Esta limitação aplica-se a todas as reclamações, independentemente de serem baseadas em contrato, responsabilidade civil ou qualquer outra teoria legal."
  ];

  const privacyH2s = [
    "Uso de Informações",
    "Armazenamento de Dados",
    "Direitos dos Usuários",
    "Alterações na Política de Privacidade",
    "Contato",
  ];

  const privacyParagraphs = [
    "Na TechNova Solutions, levamos a sua privacidade a sério. Coletamos informações pessoais que você nos fornece voluntariamente ao usar nossos serviços. Isso inclui, mas não se limita a, nome, endereço de e-mail, número de telefone e informações de pagamento. Também podemos coletar informações automaticamente através de cookies e outras tecnologias de rastreamento.Usamos essas informações para fornecer e melhorar nossos serviços, responder às suas solicitações e comunicações, e enviar atualizações sobre nossos serviços. Garantimos que todas as informações coletadas sejam tratadas com a máxima confidencialidade e segurança.",
    "As informações coletadas são usadas para personalizar a sua experiência com nossos serviços. Isso inclui a adaptação do conteúdo e das ofertas com base nas suas preferências e histórico de uso. Também utilizamos as informações para melhorar a funcionalidade e a segurança dos nossos serviços.A TechNova Solutions pode compartilhar suas informações com terceiros apenas quando necessário para a prestação dos serviços, cumprimento de obrigações legais ou quando você der o seu consentimento explícito. Garantimos que esses terceiros aderem a padrões rigorosos de privacidade e segurança.",
    "As informações pessoais dos usuários são armazenadas em servidores seguros e protegidos contra acesso não autorizado, uso indevido ou divulgação. Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados.Mantemos suas informações apenas pelo tempo necessário para cumprir os propósitos para os quais foram coletadas ou conforme exigido por lei. Após esse período, as informações são excluídas ou anonimizadas de forma segura.",
    "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais armazenadas pela TechNova Solutions. Além disso, você pode solicitar a restrição do processamento de suas informações pessoais ou objetar ao seu processamento em determinadas circunstâncias.Para exercer esses direitos, entre em contato conosco através dos meios fornecidos nesta política. Faremos todos os esforços razoáveis para atender às suas solicitações de forma oportuna e eficiente.",
    "A TechNova Solutions reserva-se o direito de alterar esta Política de Privacidade a qualquer momento. Quaisquer alterações serão publicadas em nosso site e notificaremos você por e-mail ou através dos nossos serviços.Recomendamos que você reveja esta política periodicamente para se manter informado sobre como protegemos suas informações. O uso continuado dos nossos serviços após a publicação das alterações constitui a sua aceitação dos novos termos.",
    "Se você tiver quaisquer perguntas ou preocupações sobre esta Política de Privacidade ou sobre o tratamento das suas informações pessoais, entre em contato conosco. Estamos comprometidos em resolver quaisquer questões e garantir que sua privacidade seja protegida.Você pode nos contatar através do nosso endereço de e-mail fornecido no site ou por correio para o endereço físico da TechNova Solutions. Agradecemos a sua confiança e estamos dedicados a proteger a sua privacidade de forma eficaz e transparente."
  ];

  if (section === 'privacy') {
    showPrivacyPolicy();
  }

  termsButton.addEventListener("click", function () {
    showTermsOfService();
  });

  privacyButton.addEventListener("click", function () {
    showPrivacyPolicy();
  });

  function showTermsOfService() {
    document.querySelector("h1").innerHTML = "Uso Aceitável";

    const h2List = document.querySelectorAll("h2");
    h2List.forEach((e, i) => {
      h2List[i].innerHTML = originalH2s[i];
    });

    const pList = document.querySelectorAll(".paragraphs-servicesAndPrivacy p");
    pList.forEach((e, i) => {
      pList[i].innerHTML = originalParagraphs[i];
    });

    termsButton.classList.add("active");
    privacyButton.classList.remove("active");

    termsH1.classList.add("buttonBar");
    privacyH1.classList.remove("buttonBar");

    termsImg.src = termsImg.getAttribute("data-active");
    privacyImg.src = privacyImg.getAttribute("data-normal");
  }

  function showPrivacyPolicy() {
    document.querySelector("h1").innerHTML = "Políticas de Privacidade";

    const h2List = document.querySelectorAll("h2");
    h2List.forEach((e, i) => {
      h2List[i].innerHTML = privacyH2s[i];
    });

    const pList = document.querySelectorAll(".paragraphs-servicesAndPrivacy p");
    pList.forEach((e, i) => {
      pList[i].innerHTML = privacyParagraphs[i];
    });

    privacyButton.classList.add("active");
    termsButton.classList.remove("active");

    privacyH1.classList.add("buttonBar");
    termsH1.classList.remove("buttonBar");

    privacyImg.src = privacyImg.getAttribute("data-active");
    termsImg.src = termsImg.getAttribute("data-normal");
  }
});