document.addEventListener("DOMContentLoaded", () => {
	const searchInput = document.getElementById("searchInput");
	const searchButton = document.getElementById("searchButton");
	const searchHistory = document.getElementById("searchHistory");
	const clearHistoryButton = document.getElementById("clearHistoryButton");

	let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

	function updateHistory() {
		searchHistory.innerHTML = "";
		history.forEach((term) => {
			const li = document.createElement("li");
			li.textContent = term;
			searchHistory.appendChild(li);
		});
	}

	function addToHistory(term) {
		history.unshift(term);
		if (history.length > 5) {
			history.pop();
		}
		localStorage.setItem("searchHistory", JSON.stringify(history));
		updateHistory();
	}

	searchButton.addEventListener("click", () => {
		const searchTerm = searchInput.value.trim();
		if (searchTerm) {
			addToHistory(searchTerm);
			console.log("Searching for:", searchTerm);
			searchInput.value = "";
		}
	});

	clearHistoryButton.addEventListener("click", () => {
		history = [];
		localStorage.setItem("searchHistory", JSON.stringify(history));
		updateHistory();
	});

	updateHistory();
});
