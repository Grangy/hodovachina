export interface CityData {
  slug: string;
  name: string;
  nameGenitive: string; // в родительном падеже (для "из Ростова")
  phone: string;
  whatsapp: string;
  telegram: string;
  telegramLink: string;
  instagram: string;
  title: string;
  description: string;
}

export const cities: Record<string, CityData> = {
  donetsk: {
    slug: 'donetsk',
    name: 'Донецк',
    nameGenitive: 'Донецка',
    phone: '+7 (863) 123-45-67',
    whatsapp: '+79991234567',
    telegram: '@hodovachina_donetsk',
    telegramLink: 'https://t.me/hodovachina_donetsk',
    instagram: 'hodovachina_donetsk',
    title: 'Оптовые поставки товаров из Китая в Донецк под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Донецк. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  rostov: {
    slug: 'rostov',
    name: 'Ростов-на-Дону',
    nameGenitive: 'Ростова-на-Дону',
    phone: '+7 (863) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_rostov',
    telegramLink: 'https://t.me/hodovachina_rostov',
    instagram: 'hodovachina_rostov',
    title: 'Оптовые поставки товаров из Китая в Ростов-на-Дону под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Ростов-на-Дону. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  krasnodar: {
    slug: 'krasnodar',
    name: 'Краснодар',
    nameGenitive: 'Краснодара',
    phone: '+7 (861) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_krasnodar',
    telegramLink: 'https://t.me/hodovachina_krasnodar',
    instagram: 'hodovachina_krasnodar',
    title: 'Оптовые поставки товаров из Китая в Краснодар под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Краснодар. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  sochi: {
    slug: 'sochi',
    name: 'Сочи',
    nameGenitive: 'Сочи',
    phone: '+7 (862) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_sochi',
    telegramLink: 'https://t.me/hodovachina_sochi',
    instagram: 'hodovachina_sochi',
    title: 'Оптовые поставки товаров из Китая в Сочи под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Сочи. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  volgograd: {
    slug: 'volgograd',
    name: 'Волгоград',
    nameGenitive: 'Волгограда',
    phone: '+7 (844) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_volgograd',
    telegramLink: 'https://t.me/hodovachina_volgograd',
    instagram: 'hodovachina_volgograd',
    title: 'Оптовые поставки товаров из Китая в Волгоград под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Волгоград. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  stavropol: {
    slug: 'stavropol',
    name: 'Ставрополь',
    nameGenitive: 'Ставрополя',
    phone: '+7 (865) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_stavropol',
    telegramLink: 'https://t.me/hodovachina_stavropol',
    instagram: 'hodovachina_stavropol',
    title: 'Оптовые поставки товаров из Китая в Ставрополь под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Ставрополь. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  novorossiysk: {
    slug: 'novorossiysk',
    name: 'Новороссийск',
    nameGenitive: 'Новороссийска',
    phone: '+7 (861) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_novorossiysk',
    telegramLink: 'https://t.me/hodovachina_novorossiysk',
    instagram: 'hodovachina_novorossiysk',
    title: 'Оптовые поставки товаров из Китая в Новороссийск под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Новороссийск. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  taganrog: {
    slug: 'taganrog',
    name: 'Таганрог',
    nameGenitive: 'Таганрога',
    phone: '+7 (863) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_taganrog',
    telegramLink: 'https://t.me/hodovachina_taganrog',
    instagram: 'hodovachina_taganrog',
    title: 'Оптовые поставки товаров из Китая в Таганрог под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Таганрог. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
  astrakhan: {
    slug: 'astrakhan',
    name: 'Астрахань',
    nameGenitive: 'Астрахани',
    phone: '+7 (851) 234-56-78',
    whatsapp: '+79992345678',
    telegram: '@hodovachina_astrakhan',
    telegramLink: 'https://t.me/hodovachina_astrakhan',
    instagram: 'hodovachina_astrakhan',
    title: 'Оптовые поставки товаров из Китая в Астрахань под ключ | Доставка',
    description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая в Астрахань. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка.',
  },
};

export const defaultCity: CityData = {
  slug: '',
  name: 'России',
  nameGenitive: 'России',
  phone: '+7 (999) 123-45-67',
  whatsapp: '+79288440555',
  telegram: '@hodovachina',
  telegramLink: 'https://t.me/hodovachina',
  instagram: 'hodovachina',
  title: 'Оптовые поставки товаров из Китая под ключ | Доставка по России',
  description: 'Выкуп, производство, брендирование, логистика и растаможка товаров из Китая. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка по всей России.',
};

export function getCityBySlug(slug: string): CityData | null {
  return cities[slug] || null;
}

export function getAllCitySlugs(): string[] {
  return Object.keys(cities);
}
