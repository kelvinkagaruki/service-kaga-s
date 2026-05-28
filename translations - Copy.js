const translations = {
  en: {
    'brand-title': "Kaga's Market",
    'brand-subtitle': 'Marketplace + Delivery Platform',
    'nav-products': 'Products',
    'nav-services': 'Services',
    'nav-cart': 'Cart',
    'header-account': '👤 Account',
    'menu-profile': 'My Profile',
    'menu-orders': 'Order History',
    'menu-settings': 'Settings',
    'menu-logout': 'Logout',
    'delivery-title': 'Delivery & Checkout',
    'delivery-desc': 'Enter address and delivery details to complete your order.',
    'form-fullname': 'Full name',
    'form-phone': 'Phone',
    'form-address': 'Address',
    'form-city': 'City',
    'form-delivery-opt': 'Delivery option',
    'delivery-standard': 'Standard delivery',
    'delivery-express': 'Express delivery',
    'form-notes': 'Delivery notes',
    'order-total': 'Order total',
    'btn-back': 'Back',
    'btn-cancel': 'Cancel',
    'btn-save': 'Save Changes',
    'btn-place': 'Place Order',
    'profile-title': 'My Profile',
    'profile-account': 'Account Information',
    'profile-username': 'Username',
    'profile-email': 'Email',
    'profile-phone': 'Phone',
    'profile-location': 'Location',
    'orders-title': 'Order History',
    'orders-desc': 'View all your completed orders',
    'settings-title': 'Settings',
    'settings-desc': 'Customize your experience',
    'settings-profile': 'Profile Settings',
    'settings-username': 'Username',
    'settings-phone': 'Phone Number',
    'settings-location': 'Location',
    'settings-display': 'Display Settings',
    'settings-font-size': 'Font Size',
    'settings-color-scheme': 'Color Scheme',
    'settings-language': 'Language',
    'upload-image-title': 'Upload Product Image',
    'upload-image-desc': 'Businesses can attach a photo to any product listing.',
    'upload-select-product': 'Choose product',
    'upload-select-file': 'Select image',
    'upload-preview-title': 'Preview',
    'upload-submit': 'Upload Image',
    'size-small': 'Small',
    'size-medium': 'Medium',
    'size-large': 'Large',
    'theme-light': 'Light',
    'theme-dark': 'Dark',
    'footer-text': 'Built for businesses and customers to connect with delivery-ready products and services.',
  },
  sw: {
    'brand-title': "Kaga's Market",
    'brand-subtitle': 'Soko + Jukwaa la Utoaji',
    'nav-products': 'Bidhaa',
    'nav-services': 'Huduma',
    'nav-cart': 'Karamu',
    'header-account': '👤 Akaunti',
    'menu-profile': 'Wasifu Yangu',
    'menu-orders': 'Historia ya Amri',
    'menu-settings': 'Mipango',
    'menu-logout': 'Toka Nje',
    'delivery-title': 'Utoaji & Suluhisha',
    'delivery-desc': 'Ingiza anwani na maelezo ya utoaji ili kumaliza agizo lako.',
    'form-fullname': 'Jina kamili',
    'form-phone': 'Simu',
    'form-address': 'Anwani',
    'form-city': 'Jiji',
    'form-delivery-opt': 'Chaguo la utoaji',
    'delivery-standard': 'Utoaji wa kawaida',
    'delivery-express': 'Utoaji wa haraka',
    'form-notes': 'Vidokezo vya utoaji',
    'order-total': 'Jumla ya agizo',
    'btn-back': 'Rudi',
    'btn-cancel': 'Ghairi',
    'btn-save': 'Hifadhi Mabadiliko',
    'btn-place': 'Weka Agizo',
    'profile-title': 'Wasifu Yangu',
    'profile-account': 'Taarifa za Akaunti',
    'profile-username': 'Jina la Mtumiaji',
    'profile-email': 'Barua Pepe',
    'profile-phone': 'Simu',
    'profile-location': 'Mahali',
    'orders-title': 'Historia ya Amri',
    'orders-desc': 'Tazama amri zako zote zilizokamilishwa',
    'settings-title': 'Mipango',
    'settings-desc': 'KamaTA uzoefu wako',
    'settings-profile': 'Mipango ya Wasifu',
    'settings-username': 'Jina la Mtumiaji',
    'settings-phone': 'Nambari ya Simu',
    'settings-location': 'Mahali',
    'settings-display': 'Mipango ya Onyesho',
    'settings-font-size': 'Ukubwa wa Fonti',
    'settings-color-scheme': 'Mpango wa Rangi',
    'settings-language': 'Lugha',
    'upload-image-title': 'Pakia Picha ya Bidhaa',
    'upload-image-desc': 'Biashara zinaweza kuambatanisha picha kwa orodha yoyote ya bidhaa.',
    'upload-select-product': 'Chagua bidhaa',
    'upload-select-file': 'Chagua picha',
    'upload-preview-title': 'Mwonekano Kabla ya Kupakia',
    'upload-submit': 'Pakia Picha',
    'size-small': 'Ndogo',
    'size-medium': 'Kati',
    'size-large': 'Kubwa',
    'theme-light': 'Nuru',
    'theme-dark': 'Giza',
    'footer-text': 'Imejengwa kwa biashara na wateja kuunganisha na bidhaa na huduma zinazoundiana.',
  },
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updatePageTranslations();
}

function updatePageTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      const isOption = el.tagName === 'OPTION';
      if (isOption) {
        el.textContent = translations[currentLanguage][key];
      } else if (el.tagName === 'LABEL' || el.tagName === 'SPAN') {
        const existingInput = el.querySelector('input, select, textarea');
        if (existingInput) {
          const beforeEl = el.innerHTML.match(/^(.*?)<(input|select|textarea)/s);
          if (beforeEl) {
            el.innerHTML = translations[currentLanguage][key] + el.innerHTML.substring(beforeEl[1].length);
          }
        } else {
          el.textContent = translations[currentLanguage][key];
        }
      } else {
        el.textContent = translations[currentLanguage][key];
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', updatePageTranslations);
