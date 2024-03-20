function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

async function fetchLanguageData(lang) {
    const response = await fetch(`language/${lang}.json`);
    return response.json();
}


async function changeLanguage(lang) {
    setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    // toggleArabicStylesheet(lang); // Toggle Arabic stylesheet
}

function toggleArabicStylesheet(lang) {
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');

    if (link) {
        head.removeChild(link); // Remove the old stylesheet link
    } else if (lang === 'ar') {
        const newLink = document.createElement('link');
        newLink.id = 'styles-link';
        newLink.rel = 'stylesheet';
        newLink.href = './assets/css/style-ar.css'; // Path to Arabic stylesheet
        head.appendChild(newLink);
    }
}



window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage =  localStorage.getItem('language') ||'en';
    if(localStorage.getItem('language')) {
        document.getElementById('language').selectedIndex = ['en','fr','ar'].indexOf(localStorage.getItem('language'))
    }
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    // toggleArabicStylesheet(userPreferredLanguage);
    document.getElementById("language").addEventListener('change' , async function() {
    console.log(this.selectedIndex);
     await changeLanguage(this.value);


}
)

});