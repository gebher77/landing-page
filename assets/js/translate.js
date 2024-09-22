// Substitua pela sua chave de API do Google Cloud Translate.
const API_KEY = "SUA CHAVE API";


async function translateText(text, targetLanguage) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  const data = {
    q: text,
    target: targetLanguage,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.data && result.data.translations) {
      return result.data.translations[0].translatedText;
    } else {
      console.error("Erro na resposta de tradução:", result);
      return text; // Retorna o texto original se houver erro
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return text; // Retorna o texto original se houver erro
  }
}


function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}


async function translateHTMLContent(targetLanguage) {
  const elementsToTranslate = document.querySelectorAll(
    'h1, h2, h3, p, span, a, label, input[type="submit"], button, input[placeholder], textarea[placeholder]'
  );

  for (let element of elementsToTranslate) {
    const originalText =
      element.innerText || element.placeholder || element.value;
    if (originalText && originalText.trim()) {

      const translatedText = await translateText(originalText, targetLanguage);
      const decodedText = decodeHTMLEntities(translatedText);
      if (decodedText) {
        if (
          element.tagName.toLowerCase() === "input" &&
          element.type === "submit"
        ) {
          element.value = decodedText;
        } else if (element.tagName.toLowerCase() === "button") {
          element.innerText = decodedText;
        } else if (element.placeholder) {
          element.placeholder = decodedText;
        } else {
          element.innerText = decodedText;
        }
      }
    }
  }
}


function updateImages(targetLanguage) {
  const images = document.querySelectorAll("img[data-en]");
  images.forEach((img) => {
    const imageSrc =
      targetLanguage === "en"
        ? img.getAttribute("data-en")
        : img.getAttribute("data-pt");
    img.src = imageSrc;
  });
}


function handleLanguageChange(event) {
  const selectedLanguage = event.target.value;
  let targetLanguage = selectedLanguage === "EN" ? "en" : "pt";
  translateHTMLContent(targetLanguage);
  updateImages(targetLanguage);
}


document
  .getElementById("select-language")
  .addEventListener("change", handleLanguageChange);
