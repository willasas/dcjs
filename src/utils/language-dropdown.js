window.addEventListener('DOMContentLoaded', () => {
	// Define the language strings
	window.langs = {
		"en": "English",
		"zh_CN": "简体中文",
    "zh_Hant": "繁体中文",
		"ja_JP": "日本語",
		"ko_KR": "한국어",
		"de_DE": "Deutsch",
		"es_lamr": "Español",
    "es_ES": "Español (Spain)",
    "es_MX": "Español (LA)",
		"fr_FR": "Français",
		"it_IT": "Italiano",
		"pt_BR": "Português",
    "ar": "العربية",
    "pl": "Polski",
    "ru": "Русский",
    "th": "ไทย",
    "tr": "Türkçe",
	}
	
	// Define the default language display order
	var order = [
		'en',
		'zh-CN',
    'zh_Hant',
		'ja_JP',
		'ko_KR',
		'de_DE',
		'es_lamr',
    'es_ES',
    'es_MX',
		'fr_FR',
		'it_IT',
		'pt_BR',
    'ar',
    'pl',
    'ru',
    'th',
    'tr',
	];
	
  let len = Object.values(langs).length;
  let k = Object.keys(langs);
  let v = Object.values(langs);

	// Cache values from the page
	var pagelang = document.querySelector('html').getAttribute('lang');
	if(pagelang === null) {
		var pagelang = document.getElementsByTagName('html')[0].getAttribute('lang') || document.documentElement.lang;
    console.log(pagelang);
	}
	
  // Object.keys(langs)  Object.values(langs) Object.values(langs).length

  let languageDrop = document.createElement('section');
  languageDrop.setAttribute("class", 'language-drop');
  languageDrop.setAttribute("id", 'language-drop');
  let languageDropSelect = document.createElement('select');
  languageDropSelect.setAttribute("class", 'language-drop-down');
  languageDropSelect.setAttribute("id", 'language-drop-down');
  languageDropSelect.setAttribute("data-lang", k[0]);
  languageDrop.appendChild(languageDropSelect);

  for(let i = 0; i < len; i++){
    let languageDropOption = document.createElement('option');
    languageDropOption.setAttribute("value", k[i]);
    languageDropOption.setAttribute("data-index", i);
    languageDropOption.innerText = v[i];
    languageDropSelect.append(languageDropOption);
    document.getElementsByTagName('html')[0].setAttribute('lang', k[0]) || document.documentElement.setAttribute('lang', k[0]);
  }
  document.body.appendChild(languageDrop);
	
	// If required data exists on page...
	
	if(order.includes(pagelang) && languageDrop.getAttribute('data-lang') !== 'complete') {
		
		// Bubble up the current language
		
		if(order.includes(pagelang)) {
			order.splice(order.indexOf(pagelang), 1);
			order.unshift(pagelang);

      console.log(order.splice(order.indexOf(pagelang), 1));
      console.log(order.unshift(pagelang));
		}
		
		// Loop through languages in order
		
		Object.entries(order).forEach(([index, lang]) => {
			
			// Locate language tag
			
			alternate = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
			
			// If language exists on page...
			
			if(alternate !== null) {
				
				// Create a new item for language
        

				// var node = document.createElement('option');
				// var href = alternate.getAttribute('href');
				// var text = document.createTextNode(langs[lang]);
				
				// node.appendChild(text);
				// node.value = href;
				// languageDropSelect.appendChild(node);
				
				// If language matches current language...
				
				if(lang == pagelang) {
					
					// Set the menu to the current language
					
					languageDropSelect.value = href;
					
				}
			}
		});
		
		// Add redirect based on language selection
		// languageDropSelect.addEventListener('change', function() {
		// 	// window.location = this.value;
    //   document.getElementsByTagName('html')[0].setAttribute('lang', k[index]) || document.documentElement.setAttribute('lang', k[index]);
		// })

    let flsLen = languageDropSelect.children.length;
    console.log(flsLen);
    for (let i = 0; i < flsLen; i++) {
      (function (index) {
        console.log(index);
        languageDropSelect.children[i].onclick = function () {
          alert(i);
          // 设置html中lang的值
          document.documentElement.setAttribute('lang', k[i]);
        }
      })(i);
    }
		
		// Swap visible language selector
		languageDrop.setAttribute('data-lang', 'complete');
	}
});