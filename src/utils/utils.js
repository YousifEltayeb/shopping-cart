const changeQuantity = (clickedButton) => {
  const inputFieldElm = clickedButton.parentNode.querySelector("input");
  if (clickedButton.textContent === "+") {
    inputFieldElm.value = ++inputFieldElm.value;
  } else if (clickedButton.textContent === "-" && inputFieldElm.value > 0) {
    inputFieldElm.value = --inputFieldElm.value;
  }
};
const getUpdatedProducts = (products, targetElm, filmID) => {
  const inputFieldElmValue = targetElm.parentNode.querySelector("input").value;
  const filmIndex = products.findIndex((product) => product.id === filmID);
  if (inputFieldElmValue <= 0) {
    alert("Quantity cannot be less than 1");
    throw new Error("Quantity cannot be 0");
  }

  const newProducts = [...products];
  newProducts[filmIndex].inCart = true;
  newProducts[filmIndex].quantity = Number(inputFieldElmValue);
  return newProducts;
};
export { changeQuantity, getUpdatedProducts };
