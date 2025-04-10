// script.js untuk semua halaman (index, events, register, summary)

// ================= INDEX =================
// Smooth scroll ke section event (jika ada)
document.addEventListener("DOMContentLoaded", () => {
  const lihatEventBtn = document.getElementById("lihat-event-btn");
  if (lihatEventBtn) {
    lihatEventBtn.addEventListener("click", () => {
      window.location.href = "events.html";
    });
  }
});

// ================= EVENTS =================
const events = [
  {
    title: "Ocean Discovery Dive",
    image: "",
    description: "Snorkeling & diving bareng instruktur profesional! Kenalan sama biota laut dan dokumentasikan spesies unik.",
    details: `
      <h5>Ocean Discovery Dive</h5>
      <p>Sesi penyelaman/snorkeling dipandu oleh instruktur profesional:</p>
      <ul>
        <li>Kenalan dengan terumbu karang dan biota laut</li>
        <li>Pengamatan langsung tentang kondisi laut</li>
        <li>Tantangan: “Cari dan dokumentasikan spesies laut tertentu!”</li>
      </ul>
    `
  },
  {
    title: "Beach Clean Up Race",
    image: "images/cleanup.jpg",
    description: "Lomba bersih-bersih pantai sambil cari ‘harta karun’ berupa sampah yang bernilai poin.",
    details: `
      <h5>Beach Clean Up Race</h5>
      <p>Lomba bersih-bersih pantai sambil mencari “harta karun” (sampah tertentu bernilai tinggi).</p>
    `
  },
  {
    title: "Workshop 'Laut Butuh Kamu'",
    image: "images/workshop.jpg",
    description: "Belajar soal konservasi laut, ecobrick, dan dampak sampah plastik. Edukatif dan interaktif!",
    details: `
      <h5>Workshop \"Laut Butuh Kamu\"</h5>
      <ul>
        <li>Edukasi dampak sampah plastik</li>
        <li>Belajar buat ecobrick atau produk daur ulang dari sampah laut</li>
      </ul>
    `
  },
  {
    title: "Underwater Photo Challenge",
    image: "images/photo-challenge.jpg",
    description: "Lomba foto bawah laut terbaik, hasilnya dipamerkan! Kamera bisa pinjam ke panitia.",
    details: `
      <h5>Underwater Photo Challenge</h5>
      <p>Lomba foto bawah laut dengan kamera waterproof. Foto terbaik dipamerkan di akhir acara!</p>
    `
  },
  {
    title: "Campfire & Storytelling",
    image: "images/campfire.jpg",
    description: "Malam penuh cerita misteri laut dan musik akustik di sekitar api unggun.",
    details: `
      <h5>Campfire & Storytelling</h5>
      <p>Kumpul bareng sambil berbagi kisah diving, cerita misteri laut, dan live acoustic music 🌌🔥🎶</p>
    `
  }
];

if (document.getElementById("event-list")) {
  const eventList = document.getElementById("event-list");
  const modalLabel = document.getElementById("eventModalLabel");
  const modalBody = document.getElementById("eventModalBody");

  events.forEach((event, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${event.image}" class="card-img-top" alt="${event.title}" />
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text">${event.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#eventModal" onclick="showEventDetail(${index})">Lihat Detail</button>
          <a href="register.html" class="btn btn-sm btn-primary">Daftar</a>
        </div>
      </div>
    `;
    eventList.appendChild(col);
  });

  window.showEventDetail = function (index) {
    modalLabel.textContent = events[index].title;
    modalBody.innerHTML = events[index].details;
  };
}

// ================= REGISTER =================
if (document.getElementById("register-form")) {
  const form = document.getElementById("register-form");
  const pricePerTicket = 75000;

  const ticketInput = document.getElementById("jumlahTiket");
  const totalHarga = document.getElementById("totalHarga");

  ticketInput.addEventListener("input", () => {
    const total = ticketInput.value * pricePerTicket;
    totalHarga.textContent = isNaN(total) ? "-" : `Rp ${total.toLocaleString()}`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = form.nama.value.trim();
    const email = form.email.value.trim();
    const event = form.event.value;
    const jumlah = parseInt(form.jumlahTiket.value);

    if (!nama || !email || !event || !jumlah) {
      alert("Semua field wajib diisi!");
      return;
    }

    const data = {
      nama,
      email,
      event,
      jumlah,
      total: jumlah * pricePerTicket
    };

    localStorage.setItem("dataPendaftaran", JSON.stringify(data));
    window.location.href = "summary.html";
  });
}

// ================= SUMMARY =================
if (document.getElementById("summary")) {
  const data = JSON.parse(localStorage.getItem("dataPendaftaran"));
  const summary = document.getElementById("summary");

  if (data) {
    summary.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item"><strong>Nama:</strong> ${data.nama}</li>
        <li class="list-group-item"><strong>Email:</strong> ${data.email}</li>
        <li class="list-group-item"><strong>Event:</strong> ${data.event}</li>
        <li class="list-group-item"><strong>Jumlah Tiket:</strong> ${data.jumlah}</li>
        <li class="list-group-item"><strong>Total Harga:</strong> Rp ${data.total.toLocaleString()}</li>
      </ul>
    `;
  } else {
    summary.innerHTML = `<p class="text-danger">Tidak ada data pendaftaran ditemukan.</p>`;
  }

  const hapusBtn = document.getElementById("hapusData");
  hapusBtn.addEventListener("click", () => {
    localStorage.removeItem("dataPendaftaran");
    window.location.reload();
  });
}
