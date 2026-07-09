async function loadShop() {
  const grid = document.getElementById("bandGrid");
  if (!grid) return;

  try {
    const res = await fetch("https://raw.githubusercontent.com/AmikoDavlasheridze/Finals-data/refs/heads/main/data.json");
    const data = await res.json();

    data.bands.forEach((band) => {
      const card = document.createElement("div");
      card.className = "band-card";

      const link = document.createElement("a");
      link.href = `band-details.html?id=${band.id}`;

      const media = document.createElement("div");
      media.className = "card-media";

      const img = document.createElement("img");
      img.src = band.bandImage;
      img.alt = band.bandName;
      media.appendChild(img);

      link.appendChild(media);

      const body = document.createElement("div");
      body.className = "card-body";

      const eyebrow = document.createElement("span");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = band.genre;

      const h3 = document.createElement("h3");
      const h3Link = document.createElement("a");
      h3Link.href = `band-details.html?id=${band.id}`;
      h3Link.textContent = band.bandName;
      h3.appendChild(h3Link);

      const price = document.createElement("span");
      price.className = "price";
      price.textContent = `From $${Math.min(...band.vinyls.map(v => v.price)).toFixed(2)}`;

      body.appendChild(eyebrow);
      body.appendChild(h3);
      body.appendChild(price);

      const actions = document.createElement("div");
      actions.className = "card-actions";

      const viewBtn = document.createElement("a");
      viewBtn.className = "btn btn-outline";
      viewBtn.href = `band-details.html?id=${band.id}`;
      viewBtn.style.flex = "1";
      viewBtn.textContent = "View Vinyls";

      const bioBtn = document.createElement("a");
      bioBtn.className = "btn btn-primary";
      bioBtn.href = `band-bio.html?id=${band.id}`;
      bioBtn.textContent = "Learn More";

      actions.appendChild(viewBtn);
      actions.appendChild(bioBtn);

      card.appendChild(link);
      card.appendChild(body);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  } catch (err) {
    const errorMsg = document.createElement("p");
    errorMsg.className = "stock-out";
    errorMsg.textContent = "Couldn't load the catalog. Check that data.json is reachable.";
    grid.appendChild(errorMsg);
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadShop);