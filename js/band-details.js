async function loadBandDetails() {
  const params = new URLSearchParams(window.location.search);
  const bandId = params.get("id");

  const wrapper = document.getElementById("bandDetailsWrapper");
  if (!bandId) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const h2 = document.createElement("h2");
    h2.textContent = "No band selected";

    const p = document.createElement("p");
    const link = document.createElement("a");
    link.href = "shop.html";
    link.style.color = "var(--color-accent)";
    link.textContent = "Shop";
    p.textContent = "Go back to the ";
    p.appendChild(link);
    p.appendChild(document.createTextNode(" and pick one."));

    emptyState.appendChild(h2);
    emptyState.appendChild(p);
    wrapper.appendChild(emptyState);
    return;
  }

  try {
    const res = await fetch("https://raw.githubusercontent.com/AmikoDavlasheridze/Finals-data/refs/heads/main/data.json");
    const data = await res.json();
    const band = data.bands.find((b) => b.id === bandId);

    if (!band) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";

      const h2 = document.createElement("h2");
      h2.textContent = "Band not found";

      const p = document.createElement("p");
      p.textContent = `"${bandId}" doesn't match anything in the catalog.`;

      emptyState.appendChild(h2);
      emptyState.appendChild(p);
      wrapper.appendChild(emptyState);
      return;
    }

    document.title = `${band.bandName} — RiffRecords`;

    document.getElementById("bandGenre").textContent = band.genre;
    document.getElementById("bandName").textContent = band.bandName;
    document.getElementById("bandBio").textContent = band.bio;
    document.getElementById("bandImage").src = band.bandImage;
    document.getElementById("bandImage").alt = band.bandName;

    const grid = document.getElementById("vinylGrid");

    band.vinyls.forEach((v) => {
      const card = document.createElement("div");
      card.className = "vinyl-card";

      const media = document.createElement("div");
      media.className = "card-media";

      const img = document.createElement("img");
      img.src = v.image;
      img.alt = v.albumTitle;
      media.appendChild(img);

      const body = document.createElement("div");
      body.className = "card-body";

      const eyebrow = document.createElement("span");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = v.releaseYear;

      const h3 = document.createElement("h3");
      h3.textContent = v.albumTitle;

      const priceSpan = document.createElement("span");
      priceSpan.className = "price";
      priceSpan.textContent = `$${v.price.toFixed(2)}`;

      const stock = document.createElement("span");
      stock.className = "stock-out";
      if (v.stock === 0) {
        stock.textContent = "Out of stock";
      } else {
        stock.style.color = "var(--color-muted)";
        stock.textContent = `${v.stock} in stock`;
      }

      body.appendChild(eyebrow);
      body.appendChild(h3);
      body.appendChild(priceSpan);
      body.appendChild(stock);

      const actions = document.createElement("div");
      actions.className = "card-actions";

      const btn = document.createElement("button");
      btn.className = "btn btn-primary btn-block add-to-cart";
      btn.dataset.id = v.productId;
      btn.dataset.title = v.albumTitle;
      btn.dataset.price = v.price;
      btn.dataset.image = v.image;
      if (v.stock === 0) {
        btn.disabled = true;
        btn.textContent = "Out of Stock";
      } else {
        btn.textContent = "Add to Cart";
      }

      actions.appendChild(btn);

      card.appendChild(media);
      card.appendChild(body);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  } catch (err) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const h2 = document.createElement("h2");
    h2.textContent = "Something went wrong";

    const p = document.createElement("p");
    p.textContent = "Couldn't load the catalog.";

    emptyState.appendChild(h2);
    emptyState.appendChild(p);
    wrapper.appendChild(emptyState);
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadBandDetails);