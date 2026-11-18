/**
 * CineVerse - Movie Ticket Booking Application
 * Pure Vanilla JavaScript (Client-side, No backend required)
 */

// Movie Catalog Dataset
const MOVIES_DATA = [
  {
    id: "cine-01",
    title: "CyberPulse: Nexus 2099",
    tagline: "The boundary between human and code is fading.",
    genre: ["Sci-Fi", "Action"],
    rating: "4.9",
    votes: "14.8k",
    duration: "2h 28m",
    ageRating: "PG-13",
    format: "IMAX Laser 3D",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
    synopsis: "In a neon-drenched metropolis controlled by synthetic neural networks, a renegade data courier unearths a decrypted memory core that holds the key to rebooting human autonomy.",
    showtimes: ["01:30 PM", "04:45 PM", "07:15 PM", "10:00 PM"],
    basePrice: 14.50,
    vipPrice: 18.00
  },
  {
    id: "cine-02",
    title: "Chronicles of Aethelgard",
    tagline: "When ancient stars align, kings must fall.",
    genre: ["Fantasy", "Action"],
    rating: "4.8",
    votes: "22.1k",
    duration: "2h 45m",
    ageRating: "PG-13",
    format: "Dolby Cinema",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    synopsis: "The mythical realm of Aethelgard teeters on annihilation as the celestial rift widens. An exiled guardian and an alchemist embark on a perilous voyage to kindle the sacred hearth.",
    showtimes: ["12:15 PM", "03:30 PM", "06:45 PM", "09:45 PM"],
    basePrice: 13.00,
    vipPrice: 17.50
  },
  {
    id: "cine-03",
    title: "Neon Velocity: Midnight Run",
    tagline: "Speed is the only currency that matters.",
    genre: ["Action", "Thriller"],
    rating: "4.7",
    votes: "9.4k",
    duration: "1h 54m",
    ageRating: "R-17",
    format: "4DX Dynamic",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=700&q=80",
    banner: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
    synopsis: "An underground hyper-car racer gets framed for a heist he didn't commit and must outrun tactical syndicates through Tokyo's illuminated expressways.",
    showtimes: ["02:00 PM", "05:15 PM", "08:30 PM", "11:15 PM"],
    basePrice: 15.00,
    vipPrice: 19.00
  },
  {
    id: "cine-04",
    title: "Cosmic Odyssey: Event Horizon",
    tagline: "Into the deepest darkness beyond our galaxy.",
    genre: ["Sci-Fi", "Thriller"],
    rating: "4.9",
    votes: "31.5k",
    duration: "2h 52m",
    ageRating: "PG-13",
    format: "IMAX Laser 3D",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
    banner: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
    synopsis: "A crew of astrophysicists voyages through a newly stabilized wormhole orbiting Neptune, seeking the answers to an anomalous transmission that predates the Big Bang.",
    showtimes: ["01:00 PM", "04:30 PM", "08:00 PM", "11:00 PM"],
    basePrice: 16.00,
    vipPrice: 20.00
  },
  {
    id: "cine-05",
    title: "Spirited Whispers: Forest Spirit",
    tagline: "Magic awakens where mortals fear to tread.",
    genre: ["Animation", "Fantasy"],
    rating: "4.9",
    votes: "18.3k",
    duration: "1h 48m",
    ageRating: "All Ages",
    format: "Dolby Atmos",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    synopsis: "In a quiet mountain village, an apprentice clockmaker discovers a clockwork dragon that safeguards the memory of an ancient enchanted forest.",
    showtimes: ["11:00 AM", "01:45 PM", "04:15 PM", "07:00 PM"],
    basePrice: 12.00,
    vipPrice: 16.00
  },
  {
    id: "cine-06",
    title: "Shadow Protocol: Blackout",
    tagline: "The world went dark. Trust no one.",
    genre: ["Thriller", "Action"],
    rating: "4.6",
    votes: "11.2k",
    duration: "2h 10m",
    ageRating: "R-17",
    format: "Digital 4K",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
    synopsis: "When a global grid failure plunges North America into pitch black, an elite intelligence unit discovers the blackout was only step one of a global takeover.",
    showtimes: ["02:30 PM", "05:45 PM", "08:45 PM", "11:30 PM"],
    basePrice: 13.50,
    vipPrice: 17.50
  }
];

// Current Booking State
let state = {
  currentFilter: "all",
  searchQuery: "",
  selectedMovie: null,
  selectedDate: null,
  selectedTime: null,
  selectedSeats: [], // Array of seat IDs e.g. ["D4", "D5"]
  selectedConcessions: [], // Array of { id, name, price }
  savedBookings: JSON.parse(localStorage.getItem("cineverse_bookings") || "[]")
};

// Reserved seats cache per movie ID to simulate realistic occupied seats
const OCCUPIED_SEATS_MAP = {
  "cine-01": ["A3", "A4", "B2", "B6", "C4", "C5", "D1", "E4", "F5"],
  "cine-02": ["A2", "B3", "B4", "C1", "C2", "D6", "E2", "E3", "F4"],
  "cine-03": ["A5", "A6", "B1", "C3", "D4", "D5", "F2", "F3"],
  "cine-04": ["A1", "A2", "B5", "B6", "C3", "C4", "D7", "E5", "E6", "F1"],
  "cine-05": ["A4", "B2", "C5", "D2", "D3", "E1", "E2", "F6"],
  "cine-06": ["A3", "B4", "C2", "C6", "D5", "E3", "F4"]
};

// DOM References
const moviesGrid = document.getElementById("moviesGrid");
const noResultsNotice = document.getElementById("noResultsNotice");
const searchInput = document.getElementById("searchInput");
const genreFilters = document.getElementById("genreFilters");
const bookingModal = document.getElementById("bookingModal");
const closeBookingModal = document.getElementById("closeBookingModal");
const ticketModal = document.getElementById("ticketModal");
const closeTicketModal = document.getElementById("closeTicketModal");
const historyModal = document.getElementById("historyModal");
const openBookingsBtn = document.getElementById("openBookingsBtn");
const closeHistoryModal = document.getElementById("closeHistoryModal");
const bookingCountBadge = document.getElementById("bookingCountBadge");

// Modal Dynamic Targets
const modalMovieThumb = document.getElementById("modalMovieThumb");
const modalMovieTitle = document.getElementById("modalMovieTitle");
const modalMovieMeta = document.getElementById("modalMovieMeta");
const dateSelector = document.getElementById("dateSelector");
const showtimeSelector = document.getElementById("showtimeSelector");
const seatMap = document.getElementById("seatMap");
const selectedSeatsSummary = document.getElementById("selectedSeatsSummary");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");
const confirmBookingBtn = document.getElementById("confirmBookingBtn");

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderMovies();
  setupEventListeners();
  updateBookingBadge();
  setupHero();
});

// Setup Featured Hero section with the first movie
function setupHero() {
  const heroMovie = MOVIES_DATA[0];
  const heroBookBtn = document.getElementById("heroBookBtn");
  if (heroBookBtn) {
    heroBookBtn.addEventListener("click", () => openBooking(heroMovie.id));
  }
}

// Render Movies Catalog Grid
function renderMovies() {
  moviesGrid.innerHTML = "";
  
  const filtered = MOVIES_DATA.filter(movie => {
    const matchesFilter = state.currentFilter === "all" || movie.genre.includes(state.currentFilter);
    const matchesSearch = !state.searchQuery || 
      movie.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
      movie.synopsis.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    noResultsNotice.classList.remove("hidden");
  } else {
    noResultsNotice.classList.add("hidden");
  }

  filtered.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card group bg-[#0e1424] rounded-2xl border border-white/10 hover:border-cyan-500/50 shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5";
    
    card.innerHTML = `
      <div class="relative overflow-hidden aspect-[16/10] bg-slate-900">
        <img 
          src="${movie.poster}" 
          alt="${movie.title}" 
          class="movie-poster w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-black/30"></div>
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-cyan-300">
          ${movie.format}
        </span>
        <div class="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-bold">
          <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
          <span>${movie.rating}</span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div class="flex flex-wrap gap-1.5 mb-2">
            ${movie.genre.map(g => `<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300">${g}</span>`).join("")}
          </div>
          <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">${movie.title}</h3>
          <p class="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">${movie.synopsis}</p>
        </div>

        <div class="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span class="text-[10px] uppercase font-mono text-slate-500 block">From</span>
            <span class="text-base font-extrabold text-white font-mono">$${movie.basePrice.toFixed(2)}</span>
          </div>
          <button 
            onclick="openBooking('${movie.id}')"
            class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
            <span>Select Seats</span>
          </button>
        </div>
      </div>
    `;

    moviesGrid.appendChild(card);
  });

  // Re-initialize Lucide Icons on dynamic DOM nodes
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Open Booking Modal for a specific movie
window.openBooking = function(movieId) {
  const movie = MOVIES_DATA.find(m => m.id === movieId);
  if (!movie) return;

  state.selectedMovie = movie;
  state.selectedSeats = [];
  state.selectedConcessions = [];

  // Update modal header
  modalMovieThumb.src = movie.poster;
  modalMovieTitle.textContent = movie.title;
  modalMovieMeta.textContent = `${movie.duration} • ${movie.ageRating} • ${movie.format}`;

  // Populate Dates (Today + next 4 days)
  renderDates();

  // Populate Showtimes
  renderShowtimes(movie.showtimes);

  // Render Seating Map
  renderSeatMap(movie);

  // Reset Concessions checkboxes
  document.querySelectorAll(".concession-check").forEach(chk => chk.checked = false);

  updatePriceAndSummary();

  bookingModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) window.lucide.createIcons();
};

// Render Dates
function renderDates() {
  dateSelector.innerHTML = "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const isToday = i === 0;
    const dayLabel = isToday ? "Today" : days[d.getDay()];
    const dateFormatted = `${months[d.getMonth()]} ${d.getDate()}`;
    const valueStr = `${dayLabel}, ${dateFormatted}`;

    if (i === 0) state.selectedDate = valueStr;

    const btn = document.createElement("button");
    btn.className = `date-btn px-4 py-2.5 rounded-xl border text-center transition-all ${
      i === 0 ? "tab-selected border-cyan-400" : "bg-[#121828] border-white/10 text-slate-300 hover:border-white/30"
    }`;
    btn.innerHTML = `
      <span class="block text-[10px] uppercase font-mono tracking-wider">${dayLabel}</span>
      <span class="block text-sm font-bold">${dateFormatted}</span>
    `;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".date-btn").forEach(b => {
        b.className = "date-btn px-4 py-2.5 rounded-xl border text-center transition-all bg-[#121828] border-white/10 text-slate-300 hover:border-white/30";
      });
      btn.className = "date-btn px-4 py-2.5 rounded-xl border text-center transition-all tab-selected border-cyan-400";
      state.selectedDate = valueStr;
    });

    dateSelector.appendChild(btn);
  }
}

// Render Showtimes
function renderShowtimes(showtimes) {
  showtimeSelector.innerHTML = "";
  state.selectedTime = showtimes[0];

  showtimes.forEach((time, idx) => {
    const btn = document.createElement("button");
    btn.className = `time-btn px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
      idx === 0 ? "tab-selected border-cyan-400" : "bg-[#121828] border-white/10 text-slate-300 hover:border-white/30"
    }`;
    btn.textContent = time;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".time-btn").forEach(b => {
        b.className = "time-btn px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all bg-[#121828] border-white/10 text-slate-300 hover:border-white/30";
      });
      btn.className = "time-btn px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all tab-selected border-cyan-400";
      state.selectedTime = time;
    });

    showtimeSelector.appendChild(btn);
  });
}

// Render Interactive Seat Map
function renderSeatMap(movie) {
  seatMap.innerHTML = "";
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 8;
  const occupied = OCCUPIED_SEATS_MAP[movie.id] || [];

  rows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "flex items-center justify-center gap-1.5 sm:gap-2";

    // Row Label
    const labelLeft = document.createElement("span");
    labelLeft.className = "w-4 text-center text-xs font-mono font-bold text-slate-500";
    labelLeft.textContent = row;
    rowDiv.appendChild(labelLeft);

    for (let num = 1; num <= seatsPerRow; num++) {
      const seatId = `${row}${num}`;
      const isVip = row === "E" || row === "F";
      const isOccupied = occupied.includes(seatId);

      // Add a center aisle gap
      if (num === 5) {
        const gap = document.createElement("div");
        gap.className = "w-3 sm:w-6";
        rowDiv.appendChild(gap);
      }

      const seat = document.createElement("button");
      seat.setAttribute("data-seat-id", seatId);
      seat.setAttribute("data-is-vip", isVip ? "true" : "false");
      seat.textContent = num;

      if (isOccupied) {
        seat.className = "seat seat-reserved";
        seat.disabled = true;
      } else {
        seat.className = `seat seat-available ${isVip ? "seat-vip" : ""}`;
        seat.addEventListener("click", () => toggleSeat(seatId, isVip, seat));
      }

      rowDiv.appendChild(seat);
    }

    // Row Label right
    const labelRight = document.createElement("span");
    labelRight.className = "w-4 text-center text-xs font-mono font-bold text-slate-500";
    labelRight.textContent = row;
    rowDiv.appendChild(labelRight);

    seatMap.appendChild(rowDiv);
  });
}

// Toggle Seat Selection
function toggleSeat(seatId, isVip, seatElem) {
  const index = state.selectedSeats.findIndex(s => s.id === seatId);

  if (index > -1) {
    // Deselect
    state.selectedSeats.splice(index, 1);
    seatElem.classList.remove("seat-selected");
    seatElem.classList.add("seat-available");
    if (isVip) seatElem.classList.add("seat-vip");
  } else {
    // Select
    const price = isVip ? state.selectedMovie.vipPrice : state.selectedMovie.basePrice;
    state.selectedSeats.push({ id: seatId, isVip, price });
    seatElem.classList.add("seat-selected");
    seatElem.classList.remove("seat-available");
  }

  updatePriceAndSummary();
}

// Update Totals and Checkout Button
function updatePriceAndSummary() {
  const seatsCost = state.selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const concessionsCost = state.selectedConcessions.reduce((acc, c) => acc + c.price, 0);
  const total = seatsCost + concessionsCost;

  totalPriceDisplay.textContent = `$${total.toFixed(2)}`;

  if (state.selectedSeats.length > 0) {
    selectedSeatsSummary.textContent = state.selectedSeats.map(s => s.id).join(", ");
    confirmBookingBtn.disabled = false;
  } else {
    selectedSeatsSummary.textContent = "None";
    confirmBookingBtn.disabled = true;
  }
}

// Concessions Checkboxes Handler
document.querySelectorAll(".concession-item").forEach(item => {
  const chk = item.querySelector(".concession-check");
  const id = item.dataset.id;
  const price = parseFloat(item.dataset.price);

  item.addEventListener("click", (e) => {
    if (e.target !== chk) {
      chk.checked = !chk.checked;
    }
    
    if (chk.checked) {
      if (!state.selectedConcessions.some(c => c.id === id)) {
        state.selectedConcessions.push({ id, price });
      }
    } else {
      state.selectedConcessions = state.selectedConcessions.filter(c => c.id !== id);
    }
    updatePriceAndSummary();
  });
});

// Confirm Booking Checkout
confirmBookingBtn.addEventListener("click", () => {
  if (state.selectedSeats.length === 0 || !state.selectedMovie) return;

  const seatsCost = state.selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const concessionsCost = state.selectedConcessions.reduce((acc, c) => acc + c.price, 0);
  const total = seatsCost + concessionsCost;
  const refCode = "CV-" + Math.floor(10000 + Math.random() * 90000);

  const bookingRecord = {
    id: refCode,
    movieTitle: state.selectedMovie.title,
    format: state.selectedMovie.format,
    date: state.selectedDate,
    time: state.selectedTime,
    seats: state.selectedSeats.map(s => s.id),
    total: total.toFixed(2),
    timestamp: new Date().toISOString()
  };

  // Save to localStorage
  state.savedBookings.unshift(bookingRecord);
  localStorage.setItem("cineverse_bookings", JSON.stringify(state.savedBookings));
  updateBookingBadge();

  // Close booking modal
  bookingModal.classList.add("hidden");

  // Populate Ticket Pass Modal
  document.getElementById("ticketMovieTitle").textContent = bookingRecord.movieTitle;
  document.getElementById("ticketFormat").textContent = `${bookingRecord.format} • Auditorium 04`;
  document.getElementById("ticketDate").textContent = bookingRecord.date;
  document.getElementById("ticketTime").textContent = bookingRecord.time;
  document.getElementById("ticketSeats").textContent = bookingRecord.seats.join(", ");
  document.getElementById("ticketRef").textContent = bookingRecord.id;
  document.getElementById("ticketTotal").textContent = `$${bookingRecord.total}`;

  ticketModal.classList.remove("hidden");

  // Celebrate with Confetti!
  if (window.confetti) {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
});

// Update Badge Counter for Bookings
function updateBookingBadge() {
  const count = state.savedBookings.length;
  if (count > 0) {
    bookingCountBadge.textContent = count;
    bookingCountBadge.classList.remove("hidden");
  } else {
    bookingCountBadge.classList.add("hidden");
  }
}

// Render "My Bookings" List Modal
function renderBookingList() {
  const bookingList = document.getElementById("bookingList");
  const emptyBookingState = document.getElementById("emptyBookingState");

  bookingList.innerHTML = "";

  if (state.savedBookings.length === 0) {
    emptyBookingState.classList.remove("hidden");
    return;
  }

  emptyBookingState.classList.add("hidden");

  state.savedBookings.forEach((b, idx) => {
    const item = document.createElement("div");
    item.className = "p-4 rounded-2xl bg-[#121828] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3";
    item.innerHTML = `
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold text-rose-400">${b.id}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">${b.format}</span>
        </div>
        <h4 class="text-white font-bold text-sm mt-1">${b.movieTitle}</h4>
        <p class="text-xs text-slate-400 font-mono mt-0.5">${b.date} • ${b.time} | Seats: <span class="text-cyan-400 font-bold">${b.seats.join(", ")}</span></p>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-emerald-400 font-mono font-bold text-sm">$${b.total}</span>
        <button onclick="cancelBooking(${idx})" class="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors text-xs" title="Cancel booking">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    bookingList.appendChild(item);
  });

  if (window.lucide) window.lucide.createIcons();
}

// Cancel Booking
window.cancelBooking = function(index) {
  state.savedBookings.splice(index, 1);
  localStorage.setItem("cineverse_bookings", JSON.stringify(state.savedBookings));
  updateBookingBadge();
  renderBookingList();
};

// Event Listeners setup
function setupEventListeners() {
  // Live search input
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    renderMovies();
  });

  // Genre filter tabs
  genreFilters.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      genreFilters.querySelectorAll(".filter-pill").forEach(p => {
        p.className = "filter-pill px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#121829] hover:bg-slate-800 text-slate-300 border border-white/10 transition-all";
      });
      pill.className = "filter-pill active px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-lg transition-all";
      state.currentFilter = pill.dataset.filter;
      renderMovies();
    });
  });

  // Modal close buttons
  closeBookingModal.addEventListener("click", () => {
    bookingModal.classList.add("hidden");
    document.body.style.overflow = "";
  });

  closeTicketModal.addEventListener("click", () => {
    ticketModal.classList.add("hidden");
    document.body.style.overflow = "";
  });

  document.getElementById("finishBookingBtn").addEventListener("click", () => {
    ticketModal.classList.add("hidden");
    document.body.style.overflow = "";
  });

  openBookingsBtn.addEventListener("click", () => {
    renderBookingList();
    historyModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  closeHistoryModal.addEventListener("click", () => {
    historyModal.classList.add("hidden");
    document.body.style.overflow = "";
  });

  // Close modals on escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      bookingModal.classList.add("hidden");
      ticketModal.classList.add("hidden");
      historyModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });
}
