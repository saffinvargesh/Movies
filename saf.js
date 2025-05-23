const moviesList = [
  {movieName: "SELECT", price: 0},
  { movieName: "SILVER", price: 250 },
  { movieName: "GOLD", price:300 },
  { movieName: "DIAMOND", price: 450 },
  { movieName: "PLATINUM", price: 550 },

];

const selectMovieEl = document.getElementById("selectMovie");

const allSeatCont = document.querySelectorAll("#seatCont .seat");

const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");

const moviePriceEl = document.getElementById("moviePrice");

const cancelBtnEL = document.getElementById("cancelBtn");

const proceedBtnEl = document.getElementById("proceedBtn");

moviesList.forEach((movie) => {
  const optionEl = document.createElement("option");
  optionEl.innerHTML = `${movie.movieName} ₹${movie.price}`;
  selectMovieEl.appendChild(optionEl);
});



selectMovieEl.addEventListener("input", (e) => {
  let movieName = e.target.value.split("");
  let dollarIndex = movieName.indexOf("₹");
  let movie = movieName.splice(0, dollarIndex - 1).join("");
  currentMovieName = movie;
  moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));

  updatMovieName(movie, moviePrice);
  updatePrice(moviePrice, takenSeats.length);
});

let initialSeatValue = 0;
allSeatCont.forEach((seat) => {
  const attr = document.createAttribute("data-seatid");
  attr.value = ++initialSeatValue;
  seat.setAttributeNode(attr);
});

const seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");

let takenSeats = [];

seatContEl.forEach((seat) => {
  seat.addEventListener("click", (e) => {
    let isSelected = seat.classList.contains("selected");

    let seatId = JSON.parse(seat.dataset.seatid);

    if (!isSelected) {
      seat.classList.add("selected");
      takenSeats.push(seatId);
      takenSeats = [...new Set(takenSeats)];
    } else if (isSelected) {
      seat.classList.remove("selected");

      takenSeats = takenSeats.filter((seat) => {
        if (seat !== seatId) {
          return seat;
        }
      });
    }
    updateSeats();
    updatePrice(moviePrice, takenSeats.length);
  });
});

function updateSeats() {
  selectedSeatsHolderEl.innerHTML = ``;

  takenSeats.forEach((seat) => {
    const seatHolder = document.createElement("div");
    seatHolder.classList.add("selectedSeat");
    selectedSeatsHolderEl.appendChild(seatHolder);

    seatHolder.innerHTML = seat;
  });

  if (!takenSeats.length) {
    const spanEl = document.createElement("span");
    spanEl.classList.add("noSelected");
    spanEl.innerHTML = `NO SEAT SELECTED`;
    selectedSeatsHolderEl.appendChild(spanEl);
  }

  seatCount();
}

function seatCount() {
  const numberOfSeatEl = document.getElementById("numberOfSeat");
  numberOfSeatEl.innerHTML = takenSeats.length;
}

function updatMovieName(movieName, price) {
  const movieNameEl = document.getElementById("movieName");
  const moviePriceEl = document.getElementById("moviePrice");
  movieNameEl.innerHTML = movieName;
  moviePriceEl.innerHTML = `₹ ${price}`;
}

function updatePrice(price, seats) {
  const totalPriceEl = document.getElementById("totalPrice");
  let total = seats * price;
  totalPriceEl.innerHTML = `₹ ${total}`;
}

cancelBtn.addEventListener("click", (e) => {
  cancelSeats();
});

function cancelSeats() {
  takenSeats = [];66
  seatContEl.forEach((seat) => {
    seat.classList.remove("selected");
  });
  updatePrice(0, 0);
  updateSeats();
}

function successModal(movieNameIn, totalPrice, successTrue) {
  const bodyEl = document.querySelector("body");

  const sectionEl = document.getElementById("section");

  const overlay = document.createElement("div");

  overlay.classList.add("overlay");

  sectionEl.appendChild(overlay);

  const successModal = document.createElement("div");
  successModal.classList.add("successModal");
  const modalTop = document.createElement("div");
  modalTop.classList.add("modalTop");
  const popImg = document.createElement("img");

  modalTop.appendChild(popImg);

  successModal.appendChild(modalTop);

  // Modal Center

  



}

proceedBtnEl.addEventListener("click", (e) => {
  if (takenSeats.length) {
    const bodyEl = document.querySelector("body");
    bodyEl.classList.add("modal-active");
    successModal(currentMovieName, moviePrice * takenSeats.length);
  } else {
    alert("Oops no seat Selected");
  }
});
