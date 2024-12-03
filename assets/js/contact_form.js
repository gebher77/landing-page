document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o redirecionamento

    // Mostrar o popup
    document.getElementById('popup').style.display = 'block';
    document.body.classList.add('popup-active');

    // Esconder o popup após alguns segundos
    setTimeout(function() {
        hidePopup();
    }, 3000); // Esconde após 3 segundos

    // Limpar os campos do formulário
    document.getElementById('contactForm').reset();
});

// Função para esconder o popup
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
    document.body.classList.remove('popup-active');
}

// Fechar o popup ao clicar fora dele
document.addEventListener('click', function(event) {
    var popup = document.getElementById('popup');
    if (popup.style.display === 'block' && !popup.contains(event.target)) {
        hidePopup();
    }
});