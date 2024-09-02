import { getSneakersItem } from "../apis/services/sneaker.service";
import { errorHandler } from "../libs/errorhandler";
const itemInfo = document.getElementById("itemInfo");

//get item
export async function SneakersItem(id) {
  try {
    const response = await getSneakersItem(id);
    console.log(response);
    document.querySelector(".container img").src = response.imageURL;

    document.querySelector(".font-bold.text-xl").innerText = response.category;

    document.querySelector("#totalPrice").innerText = `$${response.price}.00`;

    document.querySelector(
      ".bg-gray-300.p-1.rounded-lg.text-sm"
    ).innerText = `5.371 sold`;

    document.querySelector(".w-4.h-4").src = "img/star-outline.svg";
    document.querySelector(
      ".flex.items-center.gap-1 p"
    ).innerText = `4.3 (5.389 reviews)`;

    const colors = response.colors.split("|");
    const colorContainer = document.querySelector(
      ".flex.items-start.w-44.overflow-x-auto"
    );
    colorContainer.innerHTML = colors
      .map((color) => {
        return `<button
          class="rounded-full border border-gray-600 p-4"
          style="background-color: ${color};"
        ></button>`;
      })
      .join("");

    const sizes = response.sizes.split("|");
    const sizeContainer = document.querySelector(".flex.gap-2.items-start");
    sizeContainer.innerHTML = sizes
      .map((size) => {
        return ` <button class="rounded-full border border-gray-600 px-2 py-1">${size}</button>`;
      })
      .join("");
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}

const selectedProductId = localStorage.getItem("selectedProductId");
if (selectedProductId) {
  SneakersItem(selectedProductId);
}

// let catchElement = document.getElementById("catch");
// catchElement.addEventListener("click", (event) => {
//   let action = event.target.getAttribute("data-action");
//   let total= event.target.closest(".total")
//   if(action && total){
//     let quantityElement = document.getElementById("quantity");
//     let quantity = parseInt(quantityElement.innerText);
//     if (action === "increase") {
//       quantity++;
//     } else if (action === "decrease" && quantity > 0) {
//       quantity--;
//     }
//   }
// });

//  const action =document.getAttribute("data-action");
// const quantityElement=document.getElementById("quantity");
// const quantity = parseInt(quantityElement.innerText);
