import {
  ArrowLeft,
  CalendarCheck,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { BookingHistoryCard } from '@/entities/booking';
import { ProductCard, ProductCardSkeleton } from '@/entities/product';
import {
  Button,
  PriceBreakdownRow,
  StatusBadge,
  WarningAlert,
} from '@/shared/ui';
import { RentalNavigation } from '@/widgets/navigation';
import { CartDemo, FormDemo, SelectionDemo, StateDemo } from './demo-controls';
import styles from './ui-kit-page.module.css';

const imageSrc = '/images/rental-equipment.png';
const navigation = {
  homeHref: '#top',
  links: [
    { href: '#catalog', label: 'Каталог', current: true },
    { href: '#dates', label: 'Как получить' },
    { href: '#booking', label: 'История' },
  ],
  dates: { href: '#dates', label: '14–17 сен' },
  cartHref: '#cart',
  cartCount: 2,
  searchHref: '#catalog',
};

const swatches = [
  ['Pine', '#254838', 'pine'],
  ['Charcoal', '#20251F', 'charcoal'],
  ['Amber', '#D8732D', 'amber'],
  ['Sand', '#E8DDC9', 'sand'],
  ['Canvas', '#F5F1E8', 'canvas'],
  ['Surface', '#FFFDF8', 'surface'],
] as const;

export function UiKitPage() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.header}>
        <h1>Северный прокат</h1>
        <p>UI-кит витрины бронирования</p>
      </header>

      <section className={styles.section} aria-labelledby="palette">
        <h2 id="palette">Палитра</h2>
        <ul className={styles.swatches}>
          {swatches.map(([name, hex, color]) => (
            <li key={name} className={styles.swatch}>
              <span
                className={styles.color}
                style={{ backgroundColor: `var(--design-${color})` }}
              />
              <strong>{name}</strong>
              <code>{hex}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="actions">
        <h2 id="actions">Кнопки и поля</h2>
        <div className={styles.buttons}>
          <Button asChild>
            <a href="#dates">
              <CalendarCheck aria-hidden /> Проверить даты
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="#cart">
              <ShoppingBag aria-hidden /> В корзину
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#dates">
              <SlidersHorizontal aria-hidden /> Фильтры
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#top">
              <ArrowLeft aria-hidden /> Назад
            </a>
          </Button>
          <Button variant="destructive">
            <Trash2 aria-hidden /> Удалить
          </Button>
        </div>
        <FormDemo />
      </section>

      <section
        id="catalog"
        className={styles.section}
        aria-labelledby="commerce"
      >
        <h2 id="commerce">Прокат и бронирование</h2>
        <div className={styles.commerce}>
          <ProductCard
            name="Рюкзак Север 45"
            category="Треккинг · 45 л"
            details="1.4 кг · спинка AirFlow · чехол от дождя"
            imageSrc={imageSrc}
            imageAlt="Туристическое снаряжение проката"
            rate="690 ₽ / день"
            deposit="залог 3 000 ₽"
            href="#cart"
            availability="Доступно"
          />
          <WarningAlert title="Даты были скорректированы">
            Выбрана ближайшая доступная дата: 14 сентября.
          </WarningAlert>
          <StatusBadge>Подтверждено</StatusBadge>
        </div>
        <div className={styles.transactions}>
          <div id="cart">
            <CartDemo imageSrc={imageSrc} />
          </div>
          <dl>
            <PriceBreakdownRow label="Аренда · 3 дня" value="4 140 ₽" />
          </dl>
          <div id="booking">
            <BookingHistoryCard
              number="NR-4821"
              status="Подтверждено"
              details="14–17 сентября · 3 позиции"
              total="11 440 ₽"
              href="#cart"
            />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="navigation">
        <h2 id="navigation">Навигация и состояния</h2>
        <RentalNavigation {...navigation} />
        <div className={styles.navigationExamples}>
          <figure>
            <ProductCardSkeleton />
            <figcaption>Загрузка карточки товара</figcaption>
          </figure>
          <RentalNavigation {...navigation} compact />
        </div>
        <div className={styles.stateExamples}>
          <SelectionDemo />
          <StateDemo />
        </div>
      </section>
    </main>
  );
}
