// Create the new section
const newSection = document.createElement("section");
newSection.setAttribute("class", "slider-container");
newSection.setAttribute("id", "slider-container");
document.body.appendChild(newSection);

// Create buttons to control the carousel
const nextBtn = document.createElement("button");
nextBtn.setAttribute("class", "slider-next");
nextBtn.setAttribute("id", "slider-next");
const nextBtnSVG = `
<svg class="icon" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path fill="#000000" d="M273.61724 221.002416 273.61724 221.002416c-8.848529-8.861832-15.504112-18.832927-19.917632-29.913287-4.437056-11.067057-6.655584-22.471804-6.655584-34.175357 0-11.715833 2.218528-23.269983 6.655584-34.662451s11.06808-21.511943 19.917632-30.374798c17.749246-17.723663 38.937824-26.585495 63.641459-26.585495 24.653493 0 45.892213 8.861832 63.591317 26.585495l352.232227 355.086228c8.874111 7.603165 15.205307 17.249873 18.995633 28.966729 3.813862 11.704576 5.384637 23.8942 4.735861 36.544311-0.597611 12.663414-3.464915 25.152866-8.525164 37.491892-5.060249 12.364609-12.014638 22.959921-20.889773 31.80845L400.850016 931.163615c-17.723663 18.371416-38.937824 27.545356-63.591317 27.545356-24.704658 0-45.893236-9.17394-63.641459-27.545356-8.848529-8.849552-15.504112-18.821671-19.917632-29.888727-4.437056-11.06808-6.655584-22.48613-6.655584-34.17638 0-11.715833 2.218528-23.282263 6.655584-34.649148 4.41352-11.392468 11.06808-21.537526 19.917632-30.41266l286.74677-290.511513L273.61724 221.002416 273.61724 221.002416zM273.61724 221.002416"  />
</svg>
`;
nextBtn.innerHTML = nextBtnSVG;

const prevBtn = document.createElement("button");
prevBtn.setAttribute("class", "slider-prev");
prevBtn.setAttribute("id", "slider-prev");
const prevBtnSVG = `
<svg class="icon" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path fill="#000000" d="M750.381737 221.002416 463.634967 511.525186l286.74677 290.511513c8.848529 8.875135 15.504112 19.020192 19.917632 30.41266 4.437056 11.366885 6.655584 22.933315 6.655584 34.649148 0 11.691273-2.218528 23.108301-6.655584 34.17638-4.41352 11.067057-11.06808 21.039175-19.917632 29.888727-17.749246 18.371416-38.937824 27.545356-63.641459 27.545356-24.653493 0-45.86663-9.17394-63.591317-27.545356L276.6012 581.77311c-8.875135-8.848529-15.829524-19.443841-20.889773-31.80845-5.060249-12.339026-7.927553-24.828478-8.525164-37.491892-0.648776-12.650111 0.921999-24.839735 4.735861-36.544311 3.789303-11.715833 10.121522-21.363564 18.995633-28.966729L623.148961 91.8755c17.699104-17.723663 38.937824-26.585495 63.591317-26.585495 24.704658 0 45.893236 8.861832 63.641459 26.585495 8.848529 8.861832 15.480576 18.98233 19.917632 30.374798s6.655584 22.946618 6.655584 34.662451c0 11.704576-2.218528 23.108301-6.655584 34.175357C765.885849 202.169489 759.230266 212.140585 750.381737 221.002416L750.381737 221.002416 750.381737 221.002416zM750.381737 221.002416"  />
</svg>
`;
prevBtn.innerHTML = prevBtnSVG;
newSection.append(prevBtn, nextBtn);

// Create slides for carousel
const titles = [
  {
    title: `Minimalism and Clean Design in 2012`,
    author: "Tony Soprano"
  },
  {
    title: `What is Responsive and how Media Queries help?`,
    author: "Pam Anderson"
  },
  {
    title: `Background patterns - an in depth look`,
    author: "David Beckham"
  },
  {
    title: `How to add some flair to your Flat designs`,
    author: "Kim Jenner"
  },
  {
    title: `Reasons why CSS3 is awesome`,
    author: "David Beckham"
  }
];

const carousel = document.createElement("div");
carousel.setAttribute("class", "slider-carousel");
const carouselInner = document.createElement("div");
carouselInner.setAttribute("class", "slider-carousel-inner");
// Slide container
for (let i = 0; i < titles.length; i++) {
  const slide = document.createElement("div");
  slide.setAttribute("class", "slide");
  // Slide title
  const title = document.createElement("h1");
  title.setAttribute("class", "title");
  title.innerText = titles[i].title;
  // Slide author
  const author = document.createElement("p");
  author.setAttribute("class", "title-desc");
  author.innerText = `By ${titles[i].author}`;
  // Slide buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "button-container");
  const button_1 = document.createElement("button");
  button_1.setAttribute("class", "btn-read-more");
  button_1.innerText = "Read More";
  const button_2 = document.createElement("button");
  button_2.innerText = "Read Later";
  button_2.setAttribute("class", "btn-read-later");
  buttonContainer.append(button_1, button_2);

  // Take the first letter in a title and make it a background element
  const firstLetter = document.createElement("span");
  firstLetter.setAttribute("class", "title-letter");
  firstLetter.innerText = titles[i].title.charAt(0);

  slide.appendChild(title);
  slide.appendChild(author);
  slide.appendChild(buttonContainer);
  slide.appendChild(firstLetter);
  carouselInner.appendChild(slide);
}
carousel.appendChild(carouselInner);
newSection.appendChild(carousel);

// Create buttons to control the carousel
let slides = document.querySelectorAll(".slide");
let counter = 0;
let size = 20;
let carouselContainer = document.querySelector(".slider-carousel-inner");

nextBtn.addEventListener("click", () => {
  carouselContainer.style.transition =
    "transform 1s cubic-bezier(.60, -0.25, .40 , 1.05)";
  if (counter >= slides.length - 1) return;
  counter >= slides.length - 2
    ? nextBtn.classList.add("inactive")
    : prevBtn.classList.remove("inactive");
  counter++;
  carouselContainer.style.transform = `translateX(${-size * counter}%)`;
});

prevBtn.addEventListener("click", () => {
  carouselContainer.style.transition =
    "transform 1s cubic-bezier(.60, -0.25, .40 , 1.05)";
  if (counter < 1) return;
  counter <= 1
    ? prevBtn.classList.add("inactive")
    : nextBtn.classList.remove("inactive");
  counter--;
  carouselContainer.style.transform = `translateX(${-size * counter}%)`;
});
prevBtn.classList.add("inactive");

// Create pagination to control the carousel
const paginationCtrl = document.createElement('div');
paginationCtrl.setAttribute('class', 'slider-pagin-ctrl');
paginationCtrl.setAttribute('id', 'slider-pagin-ctrl');
newSection.append(paginationCtrl);

for (let i = 0; i < slides.length; i++) {
  const point = document.createElement("span");
  point.setAttribute("class", "slider-point");
  point.innerText = '';
  paginationCtrl.appendChild(point);
}

// Add new title at top of page-content
// const content = document.querySelector(".page-content");
// const h3 = document.createElement("h3");
// h3.innerText =
//   "Parallax Heroes, The Rise of Web Fonts, and The Flat Design Era";
// content.prepend(h3);

// Add small header on top of title
// const subHeader = document.createElement("h4");
// subHeader.innerText = "Latest Stories";
// h3.before(subHeader);

// Add buttons under each lead paragraph
// const leadParagraph = document.querySelectorAll("h3 + p");
// leadParagraph.forEach((p) => {
//   const buttonContainer = document.createElement("div");
//   buttonContainer.setAttribute("class", "button-container");
//   const button_1 = document.createElement("button");
//   button_1.innerText = "Read More";
//   const button_2 = document.createElement("button");
//   button_2.innerText = "Read Later";
//   buttonContainer.append(button_1, button_2);
//   p.setAttribute("class", "lead-text");
//   p.after(buttonContainer);
// });

// Color picker
// const colors = ["#c62641", "#039be5", "#f57c00", "#81439c"];
// let root = document.querySelector(":root");

// const colorPallete = document.createElement("div");
// colorPallete.setAttribute("class", "color-pallete");
// colors.forEach((color, i) => {
//   const dot = document.createElement("div");
//   dot.style.backgroundColor = color;

//   dot.addEventListener("click", () => {
//     root.style.setProperty("--primary", color);
//     selectedColor(i);
//   });

//   colorPallete.appendChild(dot);
// });
// newSection.appendChild(colorPallete);

// FUNCTIONS
// const selectedColor = (sel) => {
//   const dots = document.querySelectorAll(".color-pallete div");
//   dots.forEach((c, i) =>
//     i === sel
//       ? dots[sel].classList.add("active")
//       : dots[i].classList.remove("active")
//   );
// };

// const wrap = (toWrap, wrapper) => {
//   wrapper = wrapper || document.createElement("div");
//   wrapper.setAttribute("class", "page-wrapper");
//   toWrap.parentNode.appendChild(wrapper);
//   return wrapper.appendChild(toWrap);
// };

// wrap(content);
// selectedColor(0);