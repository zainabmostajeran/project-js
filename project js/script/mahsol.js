import { getSneakersItem } from "../apis/services/sneaker.service";
import { errorHandler } from "../libs/errorhandler";

//get item
async function SneakersItem () {
    try {
      const response = await getSneakersItem(id);
      console.log(response);
    } catch (error) {
      errorHandler(error)
      console.log(error);
    }
  }
  SneakersItem();
  //generateRow
//   function generateRowItem() {
    
//   }
  