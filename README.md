Aplikacja pozwala na zapisywanie
- łącznej sumy posiadanych oszczędności
- wpłacania dodatkowych kwot na poszczególne sektory oszczędności takie jak
    - ETF
    - konto oszczędnościowe
    - obligacje
- sprawdzenie kursu USD oraz EUR
- zapisanie w tablicy stanu oszczędności łącznie, kursu USD, kursu EUR oraz dnia i godziny kiedy taki zapis został zrobiony. Pozwala to na śledzenie czy danego dnia warto było sprzedać wszystkie oszczędności i przyszłościowo je reinwestować.

Główne funkcje działające z użyciem supabase to:
- identyfikacja czy uzytkownik z podanym mail znajduje się w bazie, jeśli tak przkierowany jest z ekranu rejestracji na ekran logowania. Następnie po poprawnej autoryzacji wczytują sie dane tylko tego użytkownika z bazy danych.
- jeśli użytkownika nie ma w bazie, może się on zarejestrować

Aplikacja jest responsywna względem ekranów mobilnych.

W przyszłości planowane jest dorobienie wykresu, który pokazuje kurs EUR, USD od początku rejestracji danego użytkownika.