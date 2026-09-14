# Task7

SPA социальной сети: посты, профили пользователей и личные чаты в реальном времени. Стек: **React 19**, **TypeScript**, **Vite**, **TanStack Router**, **TanStack Query**, **Tailwind CSS**, **shadcn/ui**. Авторизация через **Firebase Auth**, данные — через REST API и WebSocket.

## Функциональность

- **Авторизация** — вход по email/паролю и через Google (Firebase). Приватные маршруты закрыты `AuthGuard`.
- **Посты** — лента с бесконечной подгрузкой, создание поста, карточка поста, лайки, удаление своего поста.
- **Пользователи** — список людей, профиль, подписка/отписка, редактирование своего профиля и аватара, переход в личный чат.
- **Чаты** — список диалогов, переписка, отправка сообщений, живые обновления по WebSocket.
- **Интерфейс** — боковая навигация, светлая/тёмная тема, адаптивная вёрстка.

Страницы: `/sign-in`, `/` и `/posts`, `/posts/:postId`, `/users`, `/users/:userId`, `/users/:userId/edit`, `/chats`, `/chats/:chatId`.

## Зависимости

Требуется **Node.js 20.19+** или **22.12+** (ограничение Vite 8).

Установка: `npm install`.

### Runtime


| Пакет                                                                            | Назначение                                      |
| -------------------------------------------------------------------------------- | ----------------------------------------------- |
| `react`, `react-dom`                                                             | UI                                              |
| `@tanstack/react-router`                                                         | маршрутизация                                   |
| `@tanstack/react-query`                                                          | серверное состояние, REST                       |
| `openapi-fetch`, `openapi-react-query`                                           | типизированный клиент OpenAPI                   |
| `firebase`                                                                       | Auth (email/пароль, Google)                     |
| `react-use-websocket`                                                            | чат в реальном времени                          |
| `react-hook-form`, `@hookform/resolvers`                                         | формы                                           |
| `zod`                                                                            | валидация форм и env (транзитивная зависимость) |
| `tailwindcss`, `@tailwindcss/vite`, `tw-animate-css`                             | стили                                           |
| `@base-ui/react`, `shadcn`, `class-variance-authority`, `clsx`, `tailwind-merge` | UI-компоненты (shadcn)                          |
| `lucide-react`, `@hugeicons/react`, `@hugeicons/core-free-icons`                 | иконки                                          |
| `@fontsource-variable/figtree`                                                   | шрифт                                           |
| `date-fns`                                                                       | даты                                            |
| `cn`                                                                             | утилиты className                               |


### Dev


| Пакет                                                   | Назначение                              |
| ------------------------------------------------------- | --------------------------------------- |
| `vite`, `@vitejs/plugin-react`                          | сборка и HMR                            |
| `typescript`                                            | типы                                    |
| `eslint`, `prettier` и плагины                          | линт и формат                           |
| `husky`, `lint-staged`, `@commitlint/*`                 | git-хуки                                |
| `@tanstack/router-plugin`                               | генерация дерева маршрутов              |
| `openapi-typescript`                                    | генерация типов API (`npm run typegen`) |
| `babel-plugin-react-compiler`, `@rolldown/plugin-babel` | React Compiler                          |


Полные версии — в `package.json`.

## Запуск

1. Клонируйте репозиторий и установите зависимости:

```bash
git clone <url-репозитория>
cd task7
npm install
```

1. Создайте `.env` из примера и заполните переменные:

```bash
cp .env.example .env
```


| Переменная                          | Описание                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API key                                                          |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase Auth domain                                                      |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project id                                                       |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket                                                   |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id                                              |
| `VITE_FIREBASE_APP_ID`              | Firebase app id                                                           |
| `VITE_API_URL`                      | базовый URL REST API, со схемой (`https://…` или `http://localhost:3000`) |
| `VITE_WS_URL`                       | URL WebSocket (`wss://…/ws` или `ws://localhost:3000/ws`)                 |


Без валидного `.env` приложение не стартует: переменные проверяются в `src/env.ts`.

1. Запустите dev-сервер:

```bash
npm run dev
```

Откройте адрес, который выведет Vite (обычно `http://localhost:5173`). Неавторизованный пользователь попадает на `/sign-in`.

## Вход

Регистрации в приложении нет. На `/sign-in` доступны два способа.

**Google**

1. Нажмите **Login with Google**.
2. Выберите аккаунт в окне Firebase.
3. После успешного входа откроется лента (`/`).

**Существующие креды (email / password)**

1. Введите email и пароль пользователя, который уже есть в Firebase Auth этого проекта, например, email: `yanina.sviridova24+1@gmail.com` пароль: `123456`
2. Нажмите **Login**.
3. Новый аккаунт через форму создать нельзя — только уже существующие креды.

