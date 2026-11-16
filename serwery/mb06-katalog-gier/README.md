# Serwer katalogu gier planszowych (MB6)

Aplikacja serwerowa w środowisku Node.js z wykorzystaniem frameworka Express.js, udostępniająca katalog gier planszowych w postaci interfejsu WWW (HTML) oraz endpointów API (JSON), wraz z możliwością filtrowania wyników i wyliczania podstawowych statystyk.

## Informacje o środowisku

- **System operacyjny:** macOS / Linux / Windows
- **Edytor kodu:** WebStorm / VS Code
- **Środowisko:** Node.js (wersja >= 18)
- **Framework:** Express.js 5
- **Narzędzia:** npm, nodemon

## Uruchomienie

Aby uruchomić projekt na nowym stanowisku:

```bash
npm install
npm run dev
```

Serwer uruchomi się w trybie nasłuchiwania pod adresem:
`http://localhost:3000`

> Do uruchomienia produkcyjnego bez automatycznego restartowania: `npm start`.

## Struktura projektu

| Plik | Opis |
|---|---|
| `serwer.js` | Główny plik serwera Express, definicje tras HTTP, obsługa żądań i nasłuchiwanie |
| `dane.js` | Plik źródłowy danych (baza wbudowana w aplikację zawierająca tablicę gier) |
| `package.json` | Konfiguracja projektu npm, metadane, zależności i zdefiniowane skrypty |
| `package-lock.json` | Zablokowane dokładne wersje zainstalowanych pakietów npm |
| `.gitignore` | Konfiguracja ignorowanych plików przez Git (m.in. katalog `node_modules`) |
| `README.md` | Dokumentacja techniczna projektu |

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm run dev` | Uruchomienie serwera w trybie deweloperskim z `nodemon` (automatyczny restart po zmianie plików) |
| `npm start` | Uruchomienie serwera w trybie standardowym (`node serwer.js`) |

## Trasy

| Metoda | Adres | Opis | Odpowiedź |
|---|---|---|---|
| GET | `/` | Strona powitalna zawierająca listę dostępnych tras w HTML | HTML |
| GET | `/gry` | Pełna lista wszystkich gier w katalogu | JSON |
| GET | `/gry/:id` | Szczegółowe dane pojedynczej gry o podanym identyfikatorze; zwraca kod błędu 404, gdy gra nie istnieje | JSON |
| GET | `/szukaj` | Wyszukiwanie gier według opcjonalnych parametrów zapytania (`wydawca`, `max`, `gracze`). Brak parametrów zwraca całą listę | JSON |
| GET | `/statystyki` | Podsumowanie statystyczne: liczba gier, średnia cena zaokrąglona do dwóch miejsc po przecinku oraz nazwa najdroższej gry | JSON |

## Przykład

### 1. Pobranie konkretnej gry
Zapytanie: `GET http://localhost:3000/gry/1`
Odpowiedź (status `200 OK`):
```json
{
  "id": 1,
  "nazwa": "Osadnicy z Catanu",
  "wydawca": "Galakta",
  "cena": 169,
  "gracze": 4
}
```

### 2. Zapytanie o nieistniejącą grę
Zapytanie: `GET http://localhost:3000/gry/999`
Odpowiedź (status `404 Not Found`):
```json
{
  "blad": "Nie ma gry o takim numerze"
}
```

### 3. Wyszukiwanie z filtrami
Zapytanie: `GET http://localhost:3000/szukaj?wydawca=rebel&max=150&gracze=4`
Odpowiedź (status `200 OK`):
```json
[
  {
    "id": 3,
    "nazwa": "Splendor",
    "wydawca": "Rebel",
    "cena": 149,
    "gracze": 4
  },
  {
    "id": 4,
    "nazwa": "Jungle Speed",
    "wydawca": "Rebel",
    "cena": 65,
    "gracze": 8
  }
]
```

### 4. Statystyki katalogu
Zapytanie: `GET http://localhost:3000/statystyki`
Odpowiedź (status `200 OK`):
```json
{
  "liczbaGier": 7,
  "sredniaCena": 148.43,
  "najdrozsza": "Terraformacja Marsa"
}
```

## Autor

Przemysław Sobański, klasa 4pT
