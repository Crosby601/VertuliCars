# 🚗 VERTULI  
### Interaktywna aplikacja do filtrowania ofert samochodów

![Filtry VERTULI](./screenshots/filter-panel.png)

**VERTULI** to nowoczesna aplikacja webowa zbudowana w **React 18** z wykorzystaniem **Material UI 5**, umożliwiająca wygodne przeglądanie, filtrowanie oraz sortowanie ofert samochodów.

Projekt demonstruje podejście **funkcyjne do przetwarzania danych**, optymalizację renderowania przy użyciu **React Hooks** oraz czytelny podział logiki aplikacji.

---

# ✨ Funkcjonalności

### 🔎 Wyszukiwanie
- wyszukiwanie tekstowe po **marce lub modelu samochodu**

### 🎛️ Zaawansowane filtry
- **Marka samochodu**
- **Typ paliwa**
  - Benzyna
  - Diesel
  - Elektryk
  - Hybryda
- **Zakres ceny**
- **Zakres rocznika**
- **Minimalna moc silnika (KM)**
- **Tylko dostępne od ręki** (checkbox)

### 📊 Sortowanie wyników
Możliwość sortowania według:

- ceny
- mocy
- rocznika
- nazwy

z opcją:

- rosnąco **ASC**
- malejąco **DESC**

### 📈 Statystyki w czasie rzeczywistym

Panel statystyk pokazuje:

- liczbę znalezionych samochodów
- średnią cenę
- łączną moc silników
- najdroższy samochód
- najmocniejszy samochód
- podział aut według typu paliwa

---

# 🖥️ Podgląd aplikacji

![Filtry VERTULI](./screenshots/filter-panel.png)

---

# 🛠️ Technologie

Projekt wykorzystuje nowoczesny stack frontendowy:

- **React 18**
- **Material UI 5**
- **JavaScript (ES6+)**
- **Programowanie funkcyjne**
- **React Hooks**
  - `useState`
  - `useMemo`
  - `useEffect`

Motyw aplikacji oparty jest na **ciemnym schemacie kolorów z fioletowymi akcentami**.

---

# 🧠 Architektura i podejście programistyczne

Aplikacja została zaprojektowana zgodnie z dobrymi praktykami:

### Funkcje czyste
Logika filtrowania i sortowania opiera się na **czystych funkcjach**, które:

- nie modyfikują danych wejściowych
- nie posiadają efektów ubocznych
- zwracają nową strukturę danych

### Pipeline przetwarzania danych

Dane są przetwarzane przy użyciu metod:

- `filter`
- `map`
- `reduce`

co tworzy **czytelny pipeline transformacji danych**.

### Optymalizacja renderowania

Hook `useMemo` zapobiega zbędnym przeliczeniom podczas renderowania.

---

# 📁 Struktura projektu

```
src/
├── data/
│   └── cars.js              # baza danych samochodów
│
├── utils/
│   └── filters.js           # funkcje filtrowania i sortowania
│
├── components/
│   ├── Header.jsx           # nagłówek aplikacji
│   ├── FilterPanel.jsx      # panel filtrów
│   ├── CarCard.jsx          # karta samochodu
│   └── StatsBar.jsx         # panel statystyk
│
├── theme/
│   └── theme.js             # motyw Material UI
│
├── App.jsx                  # główna logika aplikacji
└── index.js                 # punkt startowy
```

---

# 🚀 Uruchomienie projektu lokalnie

## Wymagania

- **Node.js v16+ (LTS)**
- **npm**

---

## 1️⃣ Klonowanie repozytorium

```bash
git clone https://github.com/Crosby601/VertuliCars.git
cd VertuliCars
```

---

## 2️⃣ Instalacja zależności

```bash
npm install
```

---

## 3️⃣ Uruchomienie aplikacji

```bash
npm start
```

---

## 4️⃣ Otwórz aplikację

```
http://localhost:3000
```

---

# 🎨 UI i design

Aplikacja wykorzystuje **Material UI 5** z customowym motywem:

- **fioletowe akcenty**
- responsywny layout
- karty prezentujące samochody
- panel filtrów z sliderami i selectami

---

# 📌 Możliwe rozszerzenia

Projekt można łatwo rozbudować o:

- integrację z **API ogłoszeń samochodowych**
- **paginację wyników**
- zapis filtrów w **URL**
- **porównywarkę samochodów**
- **backend + baza danych**
- deploy na **Vercel / Netlify**

---

# 👤 Autor

GitHub  
https://github.com/Crosby601

Repozytorium projektu  
https://github.com/Crosby601/VertuliCars

Email  
crosby@ghostcartel.pl

---

⭐ Jeśli projekt Ci się podoba — zostaw gwiazdkę na GitHubie.