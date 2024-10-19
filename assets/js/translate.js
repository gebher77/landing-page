let originalTexts = new Map(); // Armazena os textos originais usando Map
const exceptions = ["TechNova Solutions"]; // Lista de textos que não devem ser traduzidos

// Função para traduzir o HTML com base na linguagem selecionada
async function translateHTML(lang) {
    const textsToTranslate = [];
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, title, footer nav:first-of-type a, button, input[placeholder], main a');
    const image = document.getElementById('tec_emerges'); // Seleciona a imagem para troca

    elements.forEach(element => {
        // Armazena o texto original se ainda não tiver sido armazenado
        if (!originalTexts.has(element)) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                originalTexts.set(element, element.getAttribute('placeholder')); // Armazena o placeholder
            } else {
                originalTexts.set(element, element.innerText); // Armazena o texto original
            }
        }

        // Verifica se o texto atual está na lista de exceções
        if (exceptions.includes(originalTexts.get(element))) {
            return; // Não traduzir esse texto
        }

        // Adiciona o texto para tradução se não for uma exceção
        textsToTranslate.push({
            text: originalTexts.get(element),
            element: element
        });
    });

    if (lang === 'PT-BR') {
        // Se a linguagem selecionada for português, restaura os textos originais
        textsToTranslate.forEach(item => {
            if (item.element.tagName === 'INPUT' && item.element.hasAttribute('placeholder')) {
                item.element.setAttribute('placeholder', originalTexts.get(item.element)); // Restaura o placeholder
            } else {
                item.element.innerHTML = originalTexts.get(item.element); // Usa o texto original
            }
        });

        // Restaura a imagem para a versão em português
        image.src = image.getAttribute('data-pt'); // Troca para a versão em português
    } else {
        // Se a linguagem selecionada não for português, faz a tradução
        const translatedTexts = await translateBatch(textsToTranslate, lang);
        translatedTexts.forEach((translatedText, index) => {
            if (textsToTranslate[index].element.tagName === 'INPUT' && textsToTranslate[index].element.hasAttribute('placeholder')) {
                textsToTranslate[index].element.setAttribute('placeholder', translatedText); // Atualiza o placeholder
            } else {
                textsToTranslate[index].element.innerHTML = translatedText; // Atualiza apenas os textos
            }
        });

        // Troca a imagem para a versão em inglês
        image.src = image.getAttribute('data-en'); // Troca para a versão em inglês
    }
}

// Função para traduzir um lote de textos
async function translateBatch(texts, targetLanguage) {
    const apiKey = "AIzaSyD0l2Bs24hsL4MXZtmwwVjRUAyb8qnLjgc"; // Substitua com sua chave API
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const body = {
        q: texts.map(t => t.text),
        target: targetLanguage
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    
    if (!response.ok) {
        const data = await response.json();
        console.error('Erro na tradução:', data.error);
        return [];
    }

    const data = await response.json();
    return data.data.translations.map(t => t.translatedText);
}

// Função para sanitizar o texto (opcional)
function sanitizeText(text) {
    return text; // Retorna o texto sem alterações
}

// Evento para mudar a linguagem
document.getElementById('select-language').addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    localStorage.setItem('selectedLanguage', selectedLang); // Armazena a linguagem no localStorage
    translateHTML(selectedLang);
});

// Ao carregar a página, verifica se há uma linguagem armazenada
window.onload = () => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
        document.getElementById('select-language').value = storedLang; // Define a seleção do idioma
        translateHTML(storedLang); // Traduz o conteúdo com a linguagem armazenada
    }
};
