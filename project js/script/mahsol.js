import { getSneakersItem } from "../apis/services/sneaker.service";
import { errorHandler } from "../libs/errorhandler";
 const itemInfo=document.getElementById("itemInfo");
//get item
 export async function SneakersItem (id) {
    try {
      const response = await getSneakersItem(id);
      console.log(response);
    //   generateRowSneakerInfo(sneaker,index)
    } catch (error) {
      errorHandler(error)
      console.log(error);
    }
  }
  SneakersItem(8);

//  const catchElement= document.getElementById("catch");
//  catchElement.addEventListener("click", (event) => {
//   const action =event.target.getAttribute("data-action");
//   const quantityElement=document.getElementById("quantity")
//  const quantity = parseInt(quantityElement.innerText);
//  const totalPrice = document.getElementById("totalPrice");
//   if (action === "increase") {
//     quantity++;
//   } else if (action === "decrease" && quantity > 0) {
//     quantity--;
//   }
//   totalPrice=quantity;
// })

