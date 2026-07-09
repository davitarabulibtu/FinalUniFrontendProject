async function loadFeaturedBands() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  try {
    const res = await fetch("https://raw.githubusercontent.com/AmikoDavlasheridze/Finals-data/refs/heads/main/data.json");
    const data = await res.json();

    data.bands.slice(0, 4).forEach((band) => {
      const link = document.createElement("a");
      link.className = "band-card";
      link.href = `band-details.html?id=${band.id}`;

      const media = document.createElement("div");
      media.className = "card-media";

      const img = document.createElement("img");
      img.src = band.bandImage;
      img.alt = band.bandName;
      media.appendChild(img);

      const body = document.createElement("div");
      body.className = "card-body";

      const eyebrow = document.createElement("span");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = band.genre;

      const h3 = document.createElement("h3");
      h3.textContent = band.bandName;

      body.appendChild(eyebrow);
      body.appendChild(h3);

      link.appendChild(media);
      link.appendChild(body);
      grid.appendChild(link);
    });
  } catch (err) {
    const errorMsg = document.createElement("p");
    errorMsg.className = "stock-out";
    errorMsg.textContent = "Couldn't load bands right now.";
    grid.appendChild(errorMsg);
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadFeaturedBands);