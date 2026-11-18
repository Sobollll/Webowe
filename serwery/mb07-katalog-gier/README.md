# Serwer katalogu gier planszowych (MB7)

Aplikacja serwerowa w środowisku Node.js z wykorzystaniem frameworka Express.js, rozszerzona o własne i wbudowane middleware (logowanie żądań, obsługa plików statycznych, parsowanie treści w formatach JSON i formularzy), modułowy router dla zasobów, dedykowaną obsługę nieznanych tras (404) oraz centralny mechanizm obsługi błędów (500).

## Informacje o środowisku

- **System operacyjny:** macOS / Linux / Windows
- **Edytor kodu:** WebStorm / VS Code
- **Środowisko:** Node.js (wersja >= 18)
- **Framework:** Express.js 5
- **Narzędzia:** npm, nodemon

## Uruchomienie

Aby zainstalować zależności i uruchomić serwer:

```bash
npm install
npm run dev
```

Serwer uruchomi się pod adresem:
`http://localhost:3000`

> Uruchomienie w trybie standardowym (produkcyjnym): `npm start`.

## Struktura projektu

```
serwery/mb07-katalog-gier/
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── serwer.js          # middleware, podłączenie tras, obsługa błędów, uruchomienie
├── dane.js            # katalog gier (bez zmian)
├── zapytania.http     # zapytania testowe HTTP dla endpointu /echo
├── trasy/
│   └── gry.js         # router dla tras /gry i /gry/:id
└── public/
    ├── index.html     # strona powitalna
    └── styl.css       # wygląd strony
```

| Plik / Katalog | Opis |
|---|---|
| `serwer.js` | Główny plik serwera Express: rejestracja middleware, trasy `/szukaj`, `/statystyki`, `/echo`, `/blad`, obsługa błędu 404 i obsługa błędów 500 |
| `dane.js` | Moduł z wbudowaną bazą danych katalogu gier |
| `trasy/gry.js` | Moduł routera Express (`Router()`) obsługujący trasy `/gry` oraz `/gry/:id` |
| `public/` | Katalog plików statycznych udostępnianych przez serwer |
| `public/index.html` | Strona powitalna serwowana pod adresem `/` oraz `/index.html` |
| `public/styl.css` | Arkusz stylów CSS definiujący wygląd strony startowej |
| `zapytania.http` | Plik z testowymi zapytaniami REST Client (testowanie żądań POST do `/echo`) |
| `package.json` | Konfiguracja projektu npm, zdefiniowane skrypty i zależności |
| `package-lock.json` | Dokładne wersje zainstalowanych pakietów npm |
| `.gitignore` | Lista plików i katalogów ignorowanych przez Git (np. `node_modules`) |
| `README.md` | Dokumentacja techniczna projektu |

## Trasy

| Metoda | Adres | Opis | Odpowiedź |
|---|---|---|---|
| GET | `/` | Strona powitalna serwowana automatycznie z katalogu `public/index.html` | HTML |
| GET | `/styl.css` | Arkusz stylów CSS serwowany ze statyki | CSS (`text/css`) |
| GET | `/gry` | Pełna lista wszystkich gier w katalogu (zwracana z modułu `trasy/gry.js`) | JSON |
| GET | `/gry/:id` | Szczegółowe dane pojedynczej gry o podanym identyfikatorze; zwraca 404 przy braku gry | JSON |
| GET | `/szukaj` | Wyszukiwanie gier według opcjonalnych parametrów zapytania (`wydawca`, `max`, `gracze`). Brak parametrów zwraca całą listę | JSON |
| GET | `/statystyki` | Podsumowanie statystyczne: liczba gier, średnia cena, nazwa najdroższej gry oraz godzina wygenerowania odpowiedzi (`wygenerowano`) | JSON |
| POST | `/echo` | Odsyła odebraną treść żądania; służy do weryfikacji działania middleware czytającego dane | JSON |
| GET | `/blad` | Trasa testowa celowo zgłaszająca wyjątek (`throw new Error`); służy do testowania middleware błędów | JSON (status 500) |

## Middleware

W aplikacji zarejestrowano następujące middleware:

| Middleware | Działanie |
|---|---|
| `logger` | loguje żądania, dodaje `req.czasZadania` |
| `express.json` | czyta treść żądania w formacie JSON |
| `express.urlencoded` | czyta treść żądania zakodowaną w formacie formularza WWW |
| `express.static` | wysyła pliki z katalogu `public` |

## Obsługa błędów

W serwerze zaimplementowano dwupoziomowy mechanizm obsługi nieznanych tras oraz błędów aplikacji:

### 1. Obsługa nieistniejących zasobów (kod HTTP 404)
Serwer rozróżnia typ żądanego zasobu i dostosowuje formę odpowiedzi:
- **Trasy danych (`/gry`, `/szukaj`, `/statystyki`):**
  - Jeśli podano nieistniejące ID konkretnej gry (np. `/gry/999`), router `trasy/gry.js` zwraca kod `404` z komunikatem:
    ```json
    { "blad": "Nie ma gry o takim numerze" }
    ```
  - Jeśli podano nieznaną podścieżkę danych (np. `/gry/1/a/b`), końcowy handler 404 w `serwer.js` zwraca kod `404` z komunikatem:
    ```json
    { "blad": "Nie ma takiej trasy" }
    ```
- **Pozostałe adresy (np. `/nie-ma`):**
  - Końcowy handler 404 zwraca sformatowaną odpowiedź HTML z kodem `404`:
    ```html
    <h1>404 — nie ma takiej strony</h1>
    ```

### 2. Centralna obsługa błędów serwera (kod HTTP 500)
- Nieobsłużone wyjątki rzucone podczas przetwarzania tras (np. w trasie testowej `GET /blad`) są przechwytywane przez dedykowane 4-argumentowe middleware `app.use((err, req, res, next) => { ... })`.
- Pełna informacja diagnostyczna trafia do konsoli serwera (`console.error("Błąd:", err.message)`).
- Użytkownik / klient API nie otrzymuje wrażliwego stosu wywołań (stack trace), lecz ustandaryzowaną odpowiedź JSON o statusie `500`:
  ```json
  { "blad": "Błąd serwera" }
  ```

## Autor

Przemysław Sobański, klasa 4pT
