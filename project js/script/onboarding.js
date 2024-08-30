const swiperEl = document.querySelector("swiper-container");
const params = {
  injectStyles: [
    `
  .swiper-pagination-bullet {
    width:20px;
    height:2px;
    margin-top:20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }
  .swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
  }
  `,
  ],
  pagination: {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
};
Object.assign(swiperEl, params);
swiperEl.initialize();

document.addEventListener("DOMContentLoaded", function () {
  const swiper = document.querySelector(".mySwiper").swiper;

  // Generate pagination buttons
  const slides = document.querySelectorAll(".mySwiper swiper-slide");
  const nextButton = document.getElementById("nextSlide");
  const paginationContainer = document.querySelector(".custom-pagination");
  // paginationContainer.classList.add("flex", "gap-2", "justify-center", "mt-6");
  paginationContainer.style.display = "flex";
  paginationContainer.style.justifyContent = "center";
  paginationContainer.style.gap = "8px";
  paginationContainer.style.marginTop = "14px";

  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.classList.add("pagination-button");
    button.style.border = "1px solid #212529";
    button.style.backgroundColor = "white";
    button.style.Color = "#212529";
    button.style.padding = "2px 20px";
    button.style.curser = "pointer";
    button.style.borderRadius = "4px";
    // button.textContent = index + 1;

    button.addEventListener("click", () => {
      swiper.slideTo(index);
    });
    paginationContainer.appendChild(button);
  });

  // Function to update the active pagination button
  function updateActivePagination() {
    const activeIndex = swiper.realIndex;
    const buttons = document.querySelectorAll(".pagination-button");

    buttons.forEach((button, index) => {
      if (index === activeIndex) {
        button.classList.add("active");
        button.style.backgroundColor = "#212529";
      } else {
        button.classList.remove("active");
        button.style.backgroundColor = "";
      }
    });
    if (activeIndex === slides.length - 1) {
      nextButton.innerText = "Get started";
    } else nextButton.innerText = "Next";
  }

  swiper.on("slideChange", updateActivePagination);
  updateActivePagination();
  
  nextButton.addEventListener("click", () => {
    if (swiper.realIndex === slides.length - 1) {
      window.location.href = "/signup";
    } else {
      swiper.slideNext();
    }
  });
});
