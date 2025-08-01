# Дорожня Карта Розробки (Roadmap) - Oknedib CRM

Цей документ визначає етапи розробки CRM-системи, пріоритети та ключовий функціонал для кожної стадії. Мета - рухатись ітеративно, починаючи з Мінімально Життєздатного Продукту (MVP).

---

## Етап 1: MVP (Minimum Viable Product) - "Фундамент та Ядро"

**Мета:** Створити функціональне ядро системи, яке дозволить керувати користувачами та проєктами. Це база, на якій буде будуватись весь інший функціонал.

**Ключові Модулі:**

1.  **✅ Налаштування Проєкту та Архітектури (Завершено)**
    *   Створено структуру директорій для `backend` та `frontend`.
    *   Ініціалізовано проєкти та встановлено базові залежності.
    *   Зафіксовано архітектурні принципи в `ARCHITECTURE.md`.

2.  **🗄️ База Даних і Схеми**
    *   **Сутності:** `User`, `Project`, `Task`.
    *   **Технології:** PostgreSQL, TypeORM.
    *   **Результат:** Створено міграції для базових таблиць та їх зв'язків.

3.  **🔑 Система Автентифікації**
    *   **Функціонал:** Реєстрація, логін, вихід, оновлення токенів (JWT).
    *   **Безпека:** Хешування паролів (bcrypt), захист ендпоінтів (Guards).
    *   **Ролі:** Базова реалізація ролей (`ADMIN`, `MANAGER`, `SPECIALIST`).
    *   **Результат:** Користувачі можуть безпечно заходити в систему, їх сесія підтримується, а ролі визначають базовий рівень доступу.

4.  **🏗️ Базовий CRUD для Проєктів**
    *   **Функціонал:** Створення, читання (список та деталі), оновлення та видалення (soft delete) проєктів.
    *   **Backend:** Створено API ендпоінти (`/projects`).
    *   **Frontend:** Створено сторінки для списку проєктів та створення/редагування проєкту.
    *   **Результат:** Менеджери можуть створювати проєкти та керувати їх базовими параметрами.

5.  **👥 Базове Управління Персоналом**
    *   **Функціонал:** Можливість призначати менеджера та спеціалістів на проєкт.
    *   **Результат:** Реалізовано зв'язки ManyToOne та ManyToMany між `Project` та `User`.

---

## Етап 2: Розширення Функціоналу

**Мета:** Додати інструменти для детального фінансового та контентного обліку.

**Ключові Модулі:**

1.  **💰 Система Оплат та Нагадувань**
    *   Трекінг двоетапних оплат по проєктах.
    *   Автоматичні нагадування про терміни оплати.

2.  **📝 Контент План (v1)**
    *   Можливість створювати контент-план для проєкту на місяць.
    *   Трекінг статусу виконання елементів плану (пост, сторіс).
    *   Завантаження файлів (документів) до плану.

3.  **📈 Деталізація Проєктів**
    *   Облік бюджету (загальний, на таргетинг).
    *   Облік годин (зйомки).
    *   Система коментарів до проєктів та завдань.

---

## Етап 3: Аналітика та Інтеграції

**Мета:** Надати інструменти для аналізу даних та інтегрувати систему з зовнішніми сервісами.

**Ключові Модулі:**

1.  **📊 Аналітичні Дашборди (v1)**
    *   Візуалізація ключових метрик: кількість проєктів, фінансові показники, виконання контент-планів.

2.  **📄 Система Звітності (v1)**
    *   Генерація базових звітів по проєктах та фінансах.
    *   Експорт в Excel/PDF.

3.  **📅 Google Calendar Integration**
    *   Двостороння синхронізація зйомок та зустрічей з календарем.

---

## Подальші Етапи (Backlog)

Ці задачі з оригінального `notion-plan` будуть пріоритезовані після завершення перших трьох етапів:

*   Розширене управління спеціалістами (WorkLog, Schedule).
*   Кастомізація дашбордів та звітів.
*   Система бекапів.
*   Push-сповіщення в реальному часі.
*   Двофакторна автентифікація.
