import Typed from 'typed.js';

function loadDynamicBannerText() {
  new Typed('#banner-typed-text', {
    strings: ["Map your journey", "Update your route", "Share your trip"],
    typeSpeed: 50,
    loop: true
  });
}

export { loadDynamicBannerText };
