const API_URL = 'https://jsonplaceholder.typicode.com/users';
const FAVORITES_KEY = 'favoriteUsers';

// --- State ---
let allUsers = [];
let currentSearch = '';
let currentCity = '';
let currentSort = '';

// --- DOM refs ---
const btnGetUsers = document.getElementById('btn-get-users');
const searchInput = document.getElementById('search-input');
const cityFilter = document.getElementById('city-filter');
const sortSelect = document.getElementById('sort-select');
const statusMessage = document.getElementById('status-message');
const usersGrid = document.getElementById('users-grid');

// --- localStorage helpers ---
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites(favorites);
  return favorites.includes(id);
}

// --- Fetch ---
async function loadUsers() {
  showStatus('Loading...', '');
  usersGrid.innerHTML = '';
  disableControls(true);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    allUsers = await response.json();
    hideStatus();
    populateCityFilter(allUsers);
    enableControls();
    renderUsers(getFilteredAndSorted());
  } catch (err) {
    showStatus('Failed to load users.', 'error');
  }
}

// --- Filter & sort pipeline ---
function searchUsers(users, query) {
  if (!query) return users;
  const q = query.toLowerCase();
  return users.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.username.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q) ||
    u.company.name.toLowerCase().includes(q) ||
    u.address.city.toLowerCase().includes(q)
  );
}

function filterByCity(users, city) {
  if (!city) return users;
  return users.filter(u => u.address.city === city);
}

function sortUsers(users, sortType) {
  const sorted = [...users];
  switch (sortType) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'username':
      sorted.sort((a, b) => a.username.localeCompare(b.username));
      break;
    case 'city':
      sorted.sort((a, b) => a.address.city.localeCompare(b.address.city));
      break;
    case 'company':
      sorted.sort((a, b) => a.company.name.localeCompare(b.company.name));
      break;
  }
  return sorted;
}

function getFilteredAndSorted() {
  let result = allUsers;
  result = filterByCity(result, currentCity);
  result = searchUsers(result, currentSearch);
  result = sortUsers(result, currentSort);
  return result;
}

// --- Render ---
function renderUsers(users) {
  usersGrid.innerHTML = '';

  if (users.length === 0) {
    showStatus('No users found.', 'empty');
    return;
  }

  hideStatus();

  users.forEach(user => {
    const card = createUserCard(user);
    usersGrid.append(card);
  });
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  if (isFavorite(user.id)) card.classList.add('favorited');

  const header = document.createElement('div');
  header.className = 'card-header';

  const nameBlock = document.createElement('div');

  const nameEl = document.createElement('div');
  nameEl.className = 'card-name';
  nameEl.textContent = user.name;

  const usernameEl = document.createElement('div');
  usernameEl.className = 'card-username';
  usernameEl.textContent = `@${user.username}`;

  nameBlock.append(nameEl, usernameEl);

  const favBtn = document.createElement('button');
  favBtn.className = 'btn-favorite' + (isFavorite(user.id) ? ' active' : '');
  favBtn.title = isFavorite(user.id) ? 'Remove from favorites' : 'Add to favorites';
  favBtn.textContent = '★';

  favBtn.addEventListener('click', () => {
    const nowFav = toggleFavorite(user.id);
    favBtn.classList.toggle('active', nowFav);
    favBtn.title = nowFav ? 'Remove from favorites' : 'Add to favorites';
    card.classList.toggle('favorited', nowFav);
  });

  header.append(nameBlock, favBtn);

  const fields = [
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone },
    { label: 'City', value: user.address.city },
    { label: 'Company', value: user.company.name },
    { label: 'Website', value: user.website },
  ];

  card.append(header);

  fields.forEach(({ label, value }) => {
    const row = document.createElement('div');
    row.className = 'card-field';

    const labelEl = document.createElement('span');
    labelEl.className = 'card-label';
    labelEl.textContent = label + ':';

    const valueEl = document.createElement('span');
    valueEl.textContent = value;

    row.append(labelEl, valueEl);
    card.append(row);
  });

  return card;
}

// --- City filter population ---
function populateCityFilter(users) {
  const cities = [...new Set(users.map(u => u.address.city))].sort();
  cityFilter.innerHTML = '<option value="">All cities</option>';
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.append(option);
  });
}

// --- UI helpers ---
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = 'status';
  if (type) statusMessage.classList.add(type);
  statusMessage.classList.remove('hidden');
}

function hideStatus() {
  statusMessage.classList.add('hidden');
}

function disableControls(disabled) {
  searchInput.disabled = disabled;
  cityFilter.disabled = disabled;
  sortSelect.disabled = disabled;
}

function enableControls() {
  disableControls(false);
}

// --- Event listeners ---
btnGetUsers.addEventListener('click', () => {
  currentSearch = '';
  currentCity = '';
  currentSort = '';
  searchInput.value = '';
  cityFilter.value = '';
  sortSelect.value = '';
  loadUsers();
});

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value.trim();
  renderUsers(getFilteredAndSorted());
});

cityFilter.addEventListener('change', (e) => {
  currentCity = e.target.value;
  renderUsers(getFilteredAndSorted());
});

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderUsers(getFilteredAndSorted());
});
