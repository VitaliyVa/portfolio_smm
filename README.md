# Портфоліо-лендинг

Лендинг у чорно-білій гамі з scroll-driven відео (спіраль на фоні), секції: про людину, навички, сайти, кейси, відгуки, форма заявки.

## Стек

- Next.js 15 (App Router)
- TypeScript, Tailwind CSS
- [scrolly-video](https://github.com/dkaoster/scrolly-video) — покадрова анімація відео при скролі (відео на паузі, кадр залежить від позиції скролу)
- GSAP + ScrollTrigger (анімації секцій)
- Lucide React (іконки)

## Запуск

```bash
npm install
npm run dev
```

Відкрити [http://localhost:3000/portfolio_smm](http://localhost:3000/portfolio_smm) (basePath для GitHub Pages).

## Деплой на GitHub Pages

### Автоматичне увімкнення (рекомендовано)

1. **Створи PAT**: [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Classic token з scope **repo** (або fine-grained з **Contents** + **Pages** read/write)
2. **Додай secret**: Репо → **Settings → Secrets and variables → Actions** → New repository secret  
   - Name: `PAGES_DEPLOY_TOKEN`  
   - Value: твій PAT
3. **Push** у `main` — workflow увімкне Pages і задеплоїть
4. Сайт: **https://vitaliyva.github.io/portfolio_smm/**

### Якщо не працює — ручне увімкнення

Відкрий **https://github.com/VitaliyVa/portfolio_smm/settings/pages** і подивись, чи є опції Source / Build and deployment. Якщо ні — перевір **Settings** (бокова панель) → **Pages** в секції "Code and automation".

> Для локальної перевірки: `npm run build` → файли в `out/`

## Структура

- **Фон** — відео спіралі (scrolly-video): завжди зафіксоване, покадрово анімується при скролі сторінки
- **Hero** — перший екран з заголовком і CTA
- **Про мене** — текст + аватар
- **Навички** — картки (сайти, SMM, дизайн, реклама, контент, консультації)
- **Сайти** — сітка з зображеннями з `public/assets/sites/`
- **Кейси** — сітка з `public/assets/cases/`
- **Відгуки** — цитати клієнтів
- **Контакт** — форма (ім’я, email, повідомлення)

Асети (відео та фото) скопійовані в `public/assets/`. Відео: `public/assets/spiral.webm`.
# portfolio_smm
