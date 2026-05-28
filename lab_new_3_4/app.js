const BASE_URL = 'https://dummyjson.com/users';

// --- DOM refs ---
const btnGetUsers      = document.getElementById('btn-get-users');
const btnSearch        = document.getElementById('btn-search');
const searchInput      = document.getElementById('search-input');
const createForm       = document.getElementById('create-form');
const usersList        = document.getElementById('users-list');
const loadingEl        = document.getElementById('loading');
const errorBlock       = document.getElementById('error-block');
const notification     = document.getElementById('notification');
const modalOverlay     = document.getElementById('modal-overlay');
const editForm         = document.getElementById('edit-form');
const btnModalCancel   = document.getElementById('btn-modal-cancel');

// --- UI helpers ---
function showLoading()  { loadingEl.classList.remove('hidden'); }
function hideLoading()  { loadingEl.classList.add('hidden'); }

function showError(msg) {
  errorBlock.textContent = msg;
  errorBlock.classList.remove('hidden');
}
function hideError()    { errorBlock.classList.add('hidden'); }

let notifTimer = null;
function showNotification(msg) {
  notification.textContent = msg;
  notification.classList.remove('hidden');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => notification.classList.add('hidden'), 3500);
}

// --- Fetch wrapper ---
async function request(url, options = {}) {
  hideError();
  showLoading();
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
    return await res.json();
  } catch (err) {
    showError(err.message || 'Request failed.');
    throw err;
  } finally {
    hideLoading();
  }
}

// --- GET: fetch users ---
async function getUsers() {
  const data = await request(`${BASE_URL}?limit=10`);
  renderUsers(data.users);
}

// --- GET: search users ---
async function searchUsers() {
  const query = searchInput.value.trim();
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}`;
  const data = await request(url);
  renderUsers(data.users);
}

// --- POST: create user ---
async function createUser(userData) {
  const data = await request(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  showNotification('User created successfully.');
  // Prepend the new card (API returns the created object)
  prependUserCard(data);
}

// --- PATCH: update user ---
async function updateUser(id, userData) {
  const data = await request(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  showNotification('User updated successfully.');
  // Reflect changes in the existing card
  updateUserCard(data);
}

// --- DELETE: remove user ---
async function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  await request(`${BASE_URL}/${id}`, { method: 'DELETE' });
  showNotification('User deleted successfully.');
  removeUserCard(id);
}

// --- Render helpers ---
function renderUsers(users) {
  usersList.innerHTML = '';
  if (!users || users.length === 0) {
    usersList.innerHTML = '<p class="empty-state">No users found.</p>';
    return;
  }
  users.forEach(user => usersList.append(createUserCard(user)));
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.dataset.id = user.id;

  const fields = [
    { label: 'Email',  value: user.email },
    { label: 'Phone',  value: user.phone },
    { label: 'Age',    value: user.age },
  ];

  const nameEl = document.createElement('div');
  nameEl.className = 'user-card-name';
  nameEl.textContent = `${user.firstName} ${user.lastName}`;

  card.append(nameEl);

  fields.forEach(({ label, value }) => {
    const row = document.createElement('div');
    row.className = 'user-card-field';

    const labelEl = document.createElement('span');
    labelEl.className = 'user-card-label';
    labelEl.textContent = label + ':';

    const valueEl = document.createElement('span');
    valueEl.textContent = value ?? '—';

    row.append(labelEl, valueEl);
    card.append(row);
  });

  const actions = document.createElement('div');
  actions.className = 'user-card-actions';

  const btnEdit = document.createElement('button');
  btnEdit.className = 'btn-edit';
  btnEdit.textContent = 'Edit';
  btnEdit.addEventListener('click', () => openEditModal(user));

  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn-delete';
  btnDelete.textContent = 'Delete';
  btnDelete.addEventListener('click', () => deleteUser(user.id));

  actions.append(btnEdit, btnDelete);
  card.append(actions);

  return card;
}

function prependUserCard(user) {
  const card = createUserCard(user);
  usersList.prepend(card);
}

function updateUserCard(user) {
  const card = usersList.querySelector(`.user-card[data-id="${user.id}"]`);
  if (!card) return;
  const newCard = createUserCard(user);
  card.replaceWith(newCard);
}

function removeUserCard(id) {
  const card = usersList.querySelector(`.user-card[data-id="${id}"]`);
  if (card) card.remove();
}

// --- Edit modal ---
function openEditModal(user) {
  document.getElementById('edit-id').value         = user.id;
  document.getElementById('edit-firstName').value  = user.firstName;
  document.getElementById('edit-lastName').value   = user.lastName;
  document.getElementById('edit-age').value        = user.age;
  document.getElementById('edit-email').value      = user.email;
  modalOverlay.classList.remove('hidden');
}

function closeEditModal() {
  modalOverlay.classList.add('hidden');
  editForm.reset();
}

// --- Event listeners ---
btnGetUsers.addEventListener('click', getUsers);

btnSearch.addEventListener('click', searchUsers);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchUsers();
});

createForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userData = {
    firstName: document.getElementById('f-firstName').value.trim(),
    lastName:  document.getElementById('f-lastName').value.trim(),
    age:       Number(document.getElementById('f-age').value),
    email:     document.getElementById('f-email').value.trim(),
  };
  await createUser(userData);
  createForm.reset();
});

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = Number(document.getElementById('edit-id').value);
  const userData = {
    firstName: document.getElementById('edit-firstName').value.trim(),
    lastName:  document.getElementById('edit-lastName').value.trim(),
    age:       Number(document.getElementById('edit-age').value),
    email:     document.getElementById('edit-email').value.trim(),
  };
  await updateUser(id, userData);
  closeEditModal();
});

btnModalCancel.addEventListener('click', closeEditModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeEditModal();
});
