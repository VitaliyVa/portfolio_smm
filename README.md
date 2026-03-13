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

1. В репо **Settings → Pages → Build and deployment**: Source = **GitHub Actions**
2. Push у `main` — workflow автоматично зібере й задеплоїть
3. Сайт буде на: **https://vitaliyva.github.io/portfolio_smm/**

> Для локальної перевірки збірки: `npm run build` → файли в `out/`

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
