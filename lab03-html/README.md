# Практична робота №3 — Основи HTML

**Дисципліна:** Створення Web-сайтів (Front-end)  
**Студент:** Адам Голота, група 232/1  
**Дата:** 2026

## Що реалізовано

### index.html — Головна сторінка
- Коректний HTML5-каркас (`<!DOCTYPE html>`, `<html lang="uk">`, мета-теги)
- Семантичні блоки: `<header>`, `<nav>`, `<main>`, `<footer>`
- Навігація на всі 3 сторінки
- Заголовки `<h1>`, `<h2>`, абзаци `<p>`
- Виділення тексту: `<strong>`, `<em>`
- Маркований список `<ul>` та нумерований `<ol>`
- Зображення `<img>` у `<figure>` + `<figcaption>`
- Таблиця `<table>` з `<caption>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- Кнопка з JS-інтерактивністю (бонусне завдання)

### pages/about.html — Про мене
- Короткий текст про автора
- `<video controls>` з двома `<source>` (MP4 + WebM) та fallback-текстом
- `<audio controls>` з двома `<source>` (OGG + MP3) та fallback-текстом
- Посилання на публічні медіа-ресурси (CC-ліцензія)

### pages/contact.html — Контакти
- Форма `<form method="get">` з повним набором полів:
  - `text` (ім'я, `required`, `minlength`)
  - `email` (email, `required`)
  - `tel` (телефон, `pattern`)
  - `select` (тема звернення)
  - `radio` (зручний спосіб зв'язку)
  - `textarea` (повідомлення, `minlength`/`maxlength`)
  - `checkbox` (згода, `required`)
- Кнопка `<button type="submit">`
- Кожне поле прив'язано до `<label>` через `for`/`id`

### app.js — Бонус (JavaScript)
- Кнопка на головній сторінці змінює текст на 1 секунду після кліку

## Як запустити

### Варіант 1 — просто відкрити файл
```bash
open lab03-html/index.html   # macOS
# або двічі клацнути index.html у файловому менеджері
```

### Варіант 2 — локальний сервер (рекомендовано)
```bash
cd lab03-html
python3 -m http.server 8080
# Відкрити http://localhost:8080 у браузері
```

### Варіант 3 — VS Code Live Server
Встановити розширення **Live Server**, клацнути правою кнопкою по `index.html` → *Open with Live Server*.

## Структура файлів

```
lab03-html/
├─ index.html          ← головна сторінка
├─ app.js              ← бонус: JS-інтерактивність
├─ pages/
│  ├─ about.html       ← сторінка «Про мене» (медіа)
│  ├─ contact.html     ← сторінка «Контакти» (форма)
│  └─ submit.html      ← сторінка підтвердження форми
├─ assets/
│  ├─ img/             ← папка для локальних зображень
│  └─ media/           ← папка для локальних відео/аудіо
└─ README.md
```
