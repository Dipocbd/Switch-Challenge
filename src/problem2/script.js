const form = document.getElementById("form");
const ethAddress = document.getElementById("input-address");
const ethAmount = document.getElementById("input-amount");
const otp = document.getElementById("input-otp");
const showModal = document.getElementById("show-modal");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  // trim to remove the whitespaces
  const ethAddressValue = ethAddress.value.trim();
  const ethAmountValue = ethAmount.value.trim();
  const otpValue = otp.value.trim();

  if (ethAddressValue === "") {
    setErrorFor(ethAddress, "Address is required");
  } else if (!isEthAddress(ethAddressValue)) {
    setErrorFor(ethAddress, "Not a valid Address");
  } else {
    setSuccessFor(ethAddress);
  }

  if (ethAmountValue === "") {
    setErrorFor(ethAmount, "Amount is required");
  } else {
    setSuccessFor(ethAmount);
  }

  if (otpValue === "") {
    setErrorFor(otp, "OTP is required");
  } else if (otpValue.length < 6 || otpValue.length > 6) {
    setErrorFor(otp, "OTP should be 6 numbers");
  } else {
    setSuccessFor(otp);
  }

  if(ethAddressValue && ethAmountValue && otpValue){
    toggleModal()
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEthAddress(ethAddress) {
  return (
    /^(0x)?[0-9a-f]{40}$/.test(ethAddress) ||
    /^(0x)?[0-9A-F]{40}$/.test(ethAddress)
  );
}

// MODAL
const toggleModal = () => {
  document.querySelector(".modal").classList.toggle("modal--hidden");
  document.querySelector(".overlay").classList.toggle("overlay--hidden");
};

// showModal.addEventListener("click", toggleModal);

document.querySelector(".overlay").addEventListener("click", toggleModal);

document
  .querySelector(".modal__close-bar span")
  .addEventListener("click", toggleModal);
