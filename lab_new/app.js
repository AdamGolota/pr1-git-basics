const API_URL = 'https://jsonplaceholder.typicode.com/users';

const btnGetUsers = document.getElementById('btn-get-users');
const loader      = document.getElementById('loader');
const errorBox    = document.getElementById('error');
const userList    = document.getElementById('user-list');

btnGetUsers.addEventListener('click', fetchUsers);

async function fetchUsers() {
  // Reset previous state
  userList.innerHTML = '';
  errorBox.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    users.forEach((user) => {
      const card = createUserCard(user);
      userList.append(card);
    });
  } catch (err) {
    errorBox.classList.remove('hidden');
    console.error('Failed to load users:', err);
  } finally {
    loader.classList.add('hidden');
  }
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.classList.add('user-card');

  // Name
  const name = document.createElement('p');
  name.classList.add('user-name');
  name.textContent = user.name;

  // Email
  const emailRow = createRow('✉️', user.email);

  // Phone
  const phoneRow = createRow('📞', user.phone);

  // Company
  const company = document.createElement('p');
  company.classList.add('user-company');
  company.textContent = `🏢 ${user.company.name}`;

  card.append(name, emailRow, phoneRow, company);
  return card;
}

function createRow(icon, text) {
  const row = document.createElement('div');
  row.classList.add('user-row');

  const iconSpan = document.createElement('span');
  iconSpan.classList.add('icon');
  iconSpan.textContent = icon;

  const textSpan = document.createElement('span');
  textSpan.textContent = text;

  row.append(iconSpan, textSpan);
  return row;
}
