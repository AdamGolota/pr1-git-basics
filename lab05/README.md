# Практична робота №5 — Основи CSS

**Дисципліна:** Створення Web-сайтів (Front-end)  
**Студент:** Адам Голота, група 232/1  
**Дата:** 2026

## Що стилізовано

| Елемент | Що зроблено |
|---------|-------------|
| Глобальні стилі | `box-sizing: border-box`, кольорова палітра через CSS-змінні (`--color-*`), типографіка, `line-height` |
| `.container` | Центрування контенту, `max-width: 1100px` |
| Шапка і навігація | Sticky header, **Flexbox #1** (`header-inner`), горизонтальне меню `.nav-list`, hover/active-стани, акцентний колір для активного пункту |
| `.card` | Картки з тінню, заокругленнями, hover-анімацією (`transform + box-shadow`) |
| Списки `<ul>` / `<ol>` | Відступи, міжрядкові інтервали, псевдоклас `:first-child` / `:last-child` |
| `<figure>` / `<img>` | Адаптивна ширина, рамка, тінь, hover-масштабування |
| `<table>` | Чергування рядків `:nth-child(even)`, hover-підсвітка, адаптивна прокрутка |
| Сторінка "Про мене" | **Flexbox #2** (`.media-grid`) — відео і аудіо в картках поруч |
| `<video>` / `<audio>` | `width: 100%`, `max-width`, `border-radius` |
| Форма | Стилі для `input`, `select`, `textarea`, `fieldset/legend`; `:focus` з тінню; `:valid`/`:invalid` візуальний зворотний зв'язок; `:checked` для radio/checkbox |
| Кнопки | `.btn`, `.btn-primary`, `.btn-accent`; hover + `transform`; transition |
| Підвал | Той самий темний фон, `::before` з градієнтною лінією |
| Адаптивність | 3 media queries: `≤900px`, `≤768px`, `≤480px` — вертикальна навігація, стек медіа, прокрутка таблиці |

### CSS-вимоги виконання (чеклист)

- [x] Зовнішні CSS-файли підключені до всіх 4 сторінок
- [x] Більше 10 різних CSS-властивостей
- [x] Більше 5 класів для оформлення (`.container`, `.card`, `.nav-list`, `.media-grid`, `.media-card`, `.form-group`, `.btn`, `.site-header`, `.site-footer`)
- [x] 2 приклади Flexbox (`.header-inner` + `.nav-list`, `.media-grid`)
- [x] Оформлено навігацію, таблицю, зображення, відео, аудіо та форму
- [x] 3+ media queries
- [x] CSS прокоментовано в 14 блоках
- [x] Бонус: `transition`, псевдоелементи `::before`/`::after`, `:nth-child`, `:first-child`, `:last-child`, `:checked`, `:valid`/`:invalid`

## Як запустити

### Варіант 1 — відкрити файл
```bash
open lab05/index.html   # macOS
```

### Варіант 2 — локальний сервер (рекомендовано)
```bash
cd lab05
python3 -m http.server 8080
# → http://localhost:8080
```

### Варіант 3 — VS Code Live Server
Правою кнопкою по `index.html` → *Open with Live Server*.

## Структура файлів

```
lab05/
├─ index.html
├─ app.js
├─ styles/
│  ├─ style.css        ← основні стилі (~320 рядків)
│  └─ responsive.css   ← адаптивні стилі (3 breakpoints)
├─ pages/
│  ├─ about.html
│  ├─ contact.html
│  └─ submit.html
└─ assets/
   ├─ img/
   └─ media/
```
