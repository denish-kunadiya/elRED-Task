import { toast } from "react-toastify";

export const getGrossPrice = (colorDescription, packingDescription, items) => {
  const matchedItem = items.find(
    (item) =>
      item.colorDescription === colorDescription &&
      item.packingDescription === packingDescription
  );
  if (matchedItem) {
    return matchedItem.grossPrice;
  } else {
    toast.error("Please select another color or packaging combination");
  }
};
