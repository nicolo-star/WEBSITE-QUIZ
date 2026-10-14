# Pop Quiz (static version)

A multi-page quiz website built with plain HTML, CSS and JavaScript. No server and no database: data is saved in the browser (localStorage), so it can be hosted for free on GitHub Pages.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home: hero, featured quizzes, stats |
| `quizzes.html` | Browse, search and filter by category |
| `play.html?id=…` | Play a quiz, get a grade and review |
| `create.html` | **Create** a quiz, or **edit** one (`?id=…`) including its questions |
| `manage.html` | **Read / Update / Delete** table: play, edit, duplicate, export, delete, import, reset |
| `history.html` | Game history, averages, best score per quiz, player name |
| `about.html` | About page and FAQ |

## CRUD summary
- Create: `create.html`
- Read: `quizzes.html`, `manage.html`, `history.html`
- Update: edit quizzes and individual questions in `create.html`; change player name in `history.html`
- Delete: quizzes and history entries
- Extras: duplicate, import/export JSON, search and filters, reset all data

## Folders
- `css/style.css`: all styling (light and dark mode)
- `js/seed.js`: built-in quizzes (add more objects to the `SEED` array)
- `js/store.js`: the data layer, every save/load goes through `Store`
- `js/app.js`: shared navigation, footer and helpers

## Run locally
Just open `index.html` in a browser. Or run a small server: `python3 -m http.server` and visit http://localhost:8000.

## Publish on GitHub Pages
1. Upload all files (with `index.html` at the top level) to a GitHub repository.
2. Repository **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, choose **main** and **/ (root)**, then Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## Note
Quizzes are stored per browser. To move or share quizzes, use Export and Import JSON on the My quizzes page.
