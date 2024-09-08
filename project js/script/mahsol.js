import { getSneakersItem } from "../apis/services/sneaker.service";
import { errorHandler } from "../libs/errorhandler";

let quantity = 0;
let price = 0;

function getQueryParameter(name){
    const urlParams=new  URLSearchParams(window.location.search);
    console.log(window.location);
    console.log(window.location.search);
    console.log(urlParams);
    console.log(urlParams.get(name));
    return urlParams.get(name);
}
const selectedProductId=getQueryParameter("id");
if(selectedProductId) SneakersItem(selectedProductId)
//get item
export async function SneakersItem(id) {
  try {
    const response = await getSneakersItem(id);
    console.log(response);
    document.querySelector(".container img").src = response.imageURL;
    document.querySelector(".font-bold.text-xl").innerText = response.category;
    document.querySelector(
      ".bg-gray-300.p-2.rounded-lg.text-sm"
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
    //set quantity
    price = response.price;
    document
      .querySelector('[data-action="increase"]')
      .addEventListener("click", () => updateQuantity(1));
    document
      .querySelector('[data-action="decrease"]')
      .addEventListener("click", () => updateQuantity(-1));
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}
function updateQuantity(change) {
  quantity = Math.max(0, quantity + change);
  document.querySelector("#quantity").innerText = quantity;
  document.querySelector("#totalPrice").innerText = `$${price * quantity}.00`;
}

// const selectedProductId = localStorage.getItem("selectedProductId");
// if (selectedProductId) {
//   SneakersItem(selectedProductId);
// }
