async function loadBandBio() {
  const params = new URLSearchParams(window.location.search);
  const bandId = params.get("id");
  const wrapper = document.getElementById("bandBioWrapper");

  if (!bandId) {
    const emptyState = document.createElement("div");
    emptyState.className = "section";
    const p = document.createElement("p");
    p.style.color = "var(--danger)";
    p.textContent = "No band selected. ";
    const link = document.createElement("a");
    link.href = "shop.html";
    link.textContent = "Go back to shop.";
    p.appendChild(link);
    emptyState.appendChild(p);
    wrapper.appendChild(emptyState);
    return;
  }

  try {
    const res = await fetch("https://raw.githubusercontent.com/AmikoDavlasheridze/Finals-data/refs/heads/main/data.json");
    const data = await res.json();
    const band = data.bands.find(b => b.id === bandId);

    if (!band) {
      const emptyState = document.createElement("div");
      emptyState.className = "section";
      const p = document.createElement("p");
      p.style.color = "var(--danger)";
      p.textContent = "Band not found. ";
      const link = document.createElement("a");
      link.href = "shop.html";
      link.textContent = "Go back to shop.";
      p.appendChild(link);
      emptyState.appendChild(p);
      wrapper.appendChild(emptyState);
      return;
    }

    document.title = `${band.bandName} — RiffRecords`;

    document.getElementById("bandImage").src = band.bandImage;
    document.getElementById("bandImage").alt = band.bandName;
    document.getElementById("bandGenre").textContent = band.genre;
    document.getElementById("bandName").textContent = band.bandName;
    document.getElementById("bandBio").textContent = band.bio;
    document.getElementById("bandHistory").textContent = band.history;

    const tracksList = document.getElementById("famousTracksList");
    band.famousTracks.forEach(track => {
      const li = document.createElement("li");
      li.className = "track-title";
      li.textContent = track;
      tracksList.appendChild(li);
    });

    const albumsList = document.getElementById("discographyList");
    band.vinyls.forEach(album => {
      const li = document.createElement("li");
      const title = document.createElement("span");
      title.className = "track-title";
      title.textContent = `${album.albumTitle}`;
      const year = document.createElement("span");
      year.className = "track-year";
      year.textContent = `${album.releaseYear}`;
      li.appendChild(title);
      li.appendChild(year);
      albumsList.appendChild(li);
    });

    const achievementsList = document.getElementById("achievementsList");
    band.achievements.forEach(achievement => {
      const li = document.createElement("li");
      li.className = "track-title";
      li.textContent = achievement;
      achievementsList.appendChild(li);
    });

  } catch (err) {
    const emptyState = document.createElement("div");
    emptyState.className = "section";
    const p = document.createElement("p");
    p.style.color = "var(--danger)";
    p.textContent = "Couldn't load band data.";
    emptyState.appendChild(p);
    wrapper.appendChild(emptyState);
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadBandBio);