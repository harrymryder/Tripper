import "bootstrap";

// Do not command out the lines below, it's for typed.js in banner
import { loadDynamicBannerText } from '../components/banner';
loadDynamicBannerText();

import '../components/select2';


const more = Array.from(document.querySelectorAll(".card-btn"));
more.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains("read-more-btn")) {
      event.currentTarget.classList.add('read-less-btn')
      event.currentTarget.classList.remove('read-more-btn')
      document.querySelectorAll('.card-description').forEach((card) => {
        card.style.display = "none";
      })
      document.querySelectorAll('.card-box').forEach((card) => {
        card.style.height = "180px";
      })
      let cardHeight = event.currentTarget.parentNode;
      let cardDescription = event.currentTarget.parentNode.childNodes[5];
      cardDescription.style.display = "block";
      cardHeight.style.height = "380px ";
    }else{
      event.currentTarget.classList.remove('read-less-btn')
      event.currentTarget.classList.add('read-more-btn')
      document.querySelectorAll('.card-description').forEach((card) => {
        card.style.display = "none";
      })
      let cardHeight = event.currentTarget.parentNode;
      let cardDescription = event.currentTarget.parentNode.childNodes[5];
      cardDescription.style.display = "none";
      cardHeight.style.height = "180px ";
    }
  })
})
// event.currentTarget.classList.toggle("card-btn");

//     const more = Array.from(document.querySelectorAll(".card-btn"));
//     more.forEach((btn) => {
//       btn.addEventListener('click', (event) => {
//         if (event.currentTarget.classList.contains("read-more-btn")) {
//           event.currentTarget.classList.add('read-less-btn')
//           event.currentTarget.classList.remove('read-more-btn')
//           document.querySelectorAll('.card-description').forEach((card) => {
//             card.style.display = "none";
//           })
//           document.querySelectorAll('.card-box').forEach((card) => {
//             card.style.height = "180px";
//           })
//           let cardHeight = event.currentTarget.parentNode;
//           let cardDescription = event.currentTarget.parentNode.childNodes[5];
//           cardDescription.style.display = "block";
//           cardHeight.style.height = "380px ";
//         }else{
//           event.currentTarget.classList.remove('read-less-btn')
//           event.currentTarget.classList.add('read-more-btn')
//           document.querySelectorAll('.card-description').forEach((card) => {
//             card.style.display = "none";
//           })
//           let cardHeight = event.currentTarget.parentNode;
//           let cardDescription = event.currentTarget.parentNode.childNodes[5];
//           cardDescription.style.display = "none";
//           cardHeight.style.height = "180px ";
//         }
//       })
//     })
    // event.currentTarget.classList.toggle("card-btn");


// console.log(event.currentTarget)





