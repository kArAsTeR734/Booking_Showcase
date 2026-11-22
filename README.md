# Booking_Showcase

`npm run dev` запускает приложение.

`npm run storybook` запускает Storybook на порту 6006. `npm run build-storybook`
собирает статическую версию в `storybook-static/`.

`npm run check` запускает линтеры, проверку форматирования, тесты и сборку.

## Структура UI

В каждом сегменте `ui` у компонента своя папка в kebab-case. Храни рядом файл компонента, его стили, stories и тесты.
Пример структуры — `src/entities/booking/ui/booking-history-card/`.
