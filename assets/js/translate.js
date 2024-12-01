let originalTexts = new Map(); // Armazena os textos originais usando Map
let translatedTextsCache = new Map(); // Cache para armazenar traduções
const exceptions = ["TechNova Solutions"]; // Lista de textos que não devem ser traduzidos

async function translateHTML(lang) {
    const textsToTranslate = [];
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, title, footer nav:first-of-type a, button, input[placeholder], main a, ul li a');
    const image = document.getElementById('tec_emerges');

    elements.forEach(element => {
        if (!originalTexts.has(element)) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                originalTexts.set(element, element.getAttribute('placeholder'));
            } else {
                originalTexts.set(element, element.innerText);
            }
        }

        if (exceptions.includes(originalTexts.get(element))) {
            return;
        }

        textsToTranslate.push({
            text: originalTexts.get(element),
            element: element
        });
    });

    if (lang === 'PT-BR') {
        textsToTranslate.forEach(item => {
            if (item.element.tagName === 'INPUT' && item.element.hasAttribute('placeholder')) {
                item.element.setAttribute('placeholder', originalTexts.get(item.element));
            } else {
                item.element.innerHTML = originalTexts.get(item.element);
            }
        });

        if (image) {
            image.src = image.getAttribute('data-pt');
        } else {
            return;
        }

    } else {
        const textsToFetch = textsToTranslate.filter(item => !translatedTextsCache.has(item.text));
        const translatedTexts = await translateBatch(textsToFetch, lang);

        translatedTexts.forEach((translatedText, index) => {
            const originalText = textsToFetch[index].text;
            translatedTextsCache.set(originalText, translatedText);
        });

        textsToTranslate.forEach(item => {
            const translatedText = translatedTextsCache.get(item.text);
            if (item.element.tagName === 'INPUT' && item.element.hasAttribute('placeholder')) {
                item.element.setAttribute('placeholder', translatedText);
            } else {
                item.element.innerHTML = translatedText;
            }
        });

        if (image) {
            image.src = image.getAttribute('data-en');
        } else {
            return;
        }
    }
}

async function translateBatch(texts, targetLanguage) {
    const apiKey = "YOUR API KEY";
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

function sanitizeText(text) {
    return text;
}

document.getElementById('select-language').addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    localStorage.setItem('selectedLanguage', selectedLang);
    translateHTML(selectedLang);
});

window.onload = () => {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
        document.getElementById('select-language').value = storedLang;
        translateHTML(storedLang);
    }

    setInterval(() => {
        const currentLang = localStorage.getItem('selectedLanguage');
        if (currentLang) {
            translateHTML(currentLang);
        }
    }, 1000);
};