async function loadContributors() {
  try {
    // Fetch the list of all files in the contributors directory
    const response = await fetch(
      "https://api.github.com/repos/YOUR_USERNAME/REPO_NAME/contents/contributors"
    );
    const files = await response.json();

    const contributorsGrid = document.getElementById("contributors-grid");

    // Process each contributor file
    for (const file of files) {
      if (file.name.endsWith(".json")) {
        const contributorData = await fetch(file.download_url);
        const contributor = await contributorData.json();

        const card = createContributorCard(contributor);
        contributorsGrid.appendChild(card);
      }
    }
  } catch (error) {
    console.error("Error loading contributors:", error);
  }
}

function createContributorCard(contributor) {
  const card = document.createElement("div");
  card.className = "contributor-card";

  card.innerHTML = `
        <h2>${contributor.name}</h2>
        <p class="year">${contributor.year}</p>
        <p class="about">${contributor.about}</p>
        <div class="skills">
            ${contributor.skills
              .map((skill) => `<span class="skill-tag">${skill}</span>`)
              .join("")}
        </div>
        <p class="team">Team: ${contributor.team}</p>
        <p class="rating">Rating: ${"⭐".repeat(contributor.rating)}</p>
    `;

  return card;
}

loadContributors();
