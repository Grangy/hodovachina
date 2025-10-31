# Инструкции по настройке сайта

## Что нужно настроить перед запуском

### 1. Контакты
В файле `app/page.tsx` замените следующие ссылки на ваши реальные контакты:

- **WhatsApp** (строки ~130, ~436): `https://wa.me/79999999999` → ваш номер (формат: +79999999999)
- **Telegram** (строка ~445): `https://t.me/username` → ваш Telegram
- **Instagram** (строка ~454): `https://instagram.com/username` → ваш Instagram

### 2. Интеграция формы заявки
В функции `handleSubmit` (строка ~14) настройте отправку данных:

**Вариант 1: Telegram Bot API**
```typescript
const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
const message = `Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nWhatsApp: ${formData.whatsapp}\nКомментарий: ${formData.comment}`;

await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`);
```

**Вариант 2: Email (Resend API)**
```bash
npm install resend
```
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'your-email@example.com',
  subject: 'Новая заявка с сайта',
  html: `<p>Имя: ${formData.name}<br>Телефон: ${formData.phone}<br>...</p>`
});
```

**Вариант 3: API Route (Next.js)**
Создайте файл `app/api/contact/route.ts`:
```typescript
export async function POST(request: Request) {
  const data = await request.json();
  // Отправка в Telegram/Email
  return Response.json({ success: true });
}
```

### 3. Запуск проекта

```bash
npm run dev
```

Сайт будет доступен по адресу: http://localhost:3000

### 4. Сборка для продакшена

```bash
npm run build
npm start
```

## Особенности дизайна

- ✅ Полностью адаптивный дизайн (приоритет на мобильные устройства)
- ✅ Плавные анимации при скролле (Framer Motion)
- ✅ Цветовая схема: красный акцент (#dc2626), тёмно-серый фон (#2d2d2d)
- ✅ Шрифты: Inter (текст), Manrope (заголовки)
- ✅ Все секции согласно ТЗ реализованы

## Дополнительные улучшения (по желанию)

1. Добавить реальные фото/видео для Hero секции
2. Добавить реальные отзывы и кейсы
3. Настроить SEO метатеги в `app/layout.tsx`
4. Добавить аналитику (Google Analytics, Yandex Metrika)
5. Настроить домен и SSL сертификат

