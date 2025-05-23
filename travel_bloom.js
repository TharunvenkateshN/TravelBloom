document.getElementById('searchBtn').addEventListener('click', searchRecommendations);
document.getElementById('resetBtn').addEventListener('click', clearResults);

async function searchRecommendations() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('results');

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch('travel_bloom_api.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    let filteredResults = data.filter(item => {
      const searchContent = `${item.name} ${item.description} ${item.category}`.toLowerCase();
      return searchContent.includes(query);
    });

    displayResults(filteredResults);
  } catch (error) {
    resultsContainer.innerHTML = "<p>Error loading recommendations.</p>";
    console.error("Fetch error:", error);
  }
}


function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No recommendations found.</p>";
    return;
  }

  results.forEach(place => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}" />
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

function clearResults() {
  document.getElementById('searchInput').value = "";
  document.getElementById('results').innerHTML = "";
}
