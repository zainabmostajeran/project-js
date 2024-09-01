import {
  getSneakers,
  getSneakersBrand,
} from "../apis/services/sneaker.service";
import { getUserInfo } from "../apis/services/user.service";
import { errorHandler } from "../libs/errorhandler";
import { removeSessionToken } from "../libs/session-manager";
import { SneakersItem } from "./mahsol";
const listSnekears = document.getElementById("listSnekears");
const btnBrand = document.getElementById("btnBrand");
const searchInput = document.getElementById("search-input");
const paginationElement = document.getElementById("pagination");

let currentPage = 1;
let itemsPerPage = 10;
let currentSearch = "";
let selectedBrands = [];

let showUser = document.getElementById("show-user");
export async function fetchUserInfo() {
  try {
    const response = await getUserInfo();
    showUser.innerText = response.username;
    console.log(response);
  } catch (error) {
    errorHandler(error);
  }
}
fetchUserInfo();
// get sneaker
async function fetchSneakerInfo() {
  try {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: currentSearch,
      brands: selectedBrands,
    };
    const response = await getSneakers(params);
    renderSneakers(response.data);
    setupPagination(response.totalPages);
    console.log(response);
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}
fetchSneakerInfo();
//render
function renderSneakers(sneakers) {
  let render = sneakers.map((el, index) => generateRowSneakerInfo(el, index));
  listSnekears.innerHTML = render.join("");
}
// generate sneakersInfo
function generateRowSneakerInfo(sneaker, index) {
  return `
  <div class="card flex flex-col gap-2 items-center justify-start" data-index="${index}" data-id="${sneaker.id}">
    <a href="http://localhost:5173/mahsol/${sneaker.id}" class="rounded-2xl w-40 h-40  overflow-hidden product-link">
    <img  src="${sneaker.imageURL}" alt="sneakerImage"> 
    </a>
    <div class="flex flex-col gap-2  px-2 items-start justify-center">
   <p class="font-bold max-w-40 text-nowrap overflow-hidden text-lg">${sneaker.name}...</p>
   <p class="font-semibold text-base">$ ${sneaker.price}.00</p>
   </div>
   </div>`;
}
listSnekears.addEventListener("click",function (event){
  const target=event.target.closest(".product-link");
  if(target){
    const card=target.closest(".card");
    const productId=card.getAttribute("data-id");
    localStorage.setItem("selectedProductId",productId);
    window.location.href="/mahsol";
  }
})

// get brand
async function fetchBrands() {
  try {
    const response = await getSneakersBrand();
    console.log(response);
    let renderBrand = response.map((el, index) => {
      return generateBrand(el, index);
    });
    btnBrand.innerHTML =
      `<button class="filter border border-black rounded-full px-7 text-white bg-gray-800 py-1 font-semibold text-base" data-filter="All">All</button>` +
      renderBrand.join("");
    handleBrandFilter();
  } catch (error) {
    errorHandler(error);
    console.log(error);
  }
}
fetchBrands();
// generateBrand
function generateBrand(brand, index) {
  return `<button
  class="filter border border-5 border-black text-nowrap max-w-72 h-14 rounded-full px-5 py-1 font-bold text-base " data-index="${index}"
  data-filter="${brand}">${brand}
  </button>`;
}
// filter
function handleBrandFilter() {
  btnBrand.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    if (filter) {
      const brandButtons = btnBrand.querySelectorAll(".filter");
      brandButtons.forEach((button) => {
        button.classList.remove("text-white", "bg-gray-800");
      });
      event.target.classList.add("text-white", "bg-gray-800");
      selectedBrands = filter === "All" ? [] : [filter];
      currentPage = 1;
      fetchSneakerInfo();
    }
  });
}
// pagination
function setupPagination(totalPages) {
  paginationElement.innerHTML = "";
  Array.from({ length: totalPages }, (_, i) => i + 1).forEach((pageNumber) => {
    const span = document.createElement("span");
    span.classList.add("bgStyle","border", "border-gray-400", "px-3", "py-1");
    span.innerText = pageNumber;
    if(pageNumber===currentPage){
      span.classList.add("bg-red-800","text-white")
    }
    span.addEventListener("click", function(){
      changePage(pageNumber);
      const bgStyle=document.querySelectorAll(".bgStyle")
      bgStyle.forEach((bgStyleItem)=>
        bgStyleItem.classList.remove("bg-red-800","text-white"))
      span.classList.add("bg-red-800","text-white");
    });
    paginationElement.appendChild(span);
  });
}
function changePage(page) {
  currentPage = page;
  fetchSneakerInfo();
}
//search
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  fetchSneakerInfo();
});
//say hello
let sayHello = document.getElementById("sayHello");
const greeting = ["Good Morning", "Good Afternoon", "Good Evening"];
const currentHours = new Date().getHours();
let index =
  currentHours >= 5 && currentHours < 12
    ? 0
    : currentHours >= 12 && currentHours < 18
    ? 1
    : 2;
sayHello.innerText = greeting[index];
// log out
document.getElementById("logout-btn").addEventListener("click", () => {
  removeSessionToken();
  window.location.href = "/";
});
