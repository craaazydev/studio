"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./print-shop.module.css";

const sizes = [
  { name: "Small", dimensions: "8 × 10 in", price: 38 },
  { name: "Medium", dimensions: "12 × 16 in", price: 64 },
  { name: "Large", dimensions: "18 × 24 in", price: 98 },
];

const products = [
  {
    id: "stillwater",
    name: "Stillwater",
    category: "Coast",
    detail: "West coast, California",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1100&q=85",
    position: "center",
    edition: "01",
  },
  {
    id: "golden-hour",
    name: "The Long Way Home",
    category: "Landscape",
    detail: "Dolomites, Italy",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85",
    position: "center",
    edition: "02",
  },
  {
    id: "soft-light",
    name: "Soft Light No. 02",
    category: "Still life",
    detail: "A study in afternoon light",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1100&q=85",
    position: "center",
    edition: "03",
  },
  {
    id: "open-road",
    name: "Somewhere, Slowly",
    category: "Landscape",
    detail: "Iceland, on film",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=85",
    position: "center",
    edition: "04",
  },
  {
    id: "blue-morning",
    name: "Blue Morning",
    category: "Coast",
    detail: "North shore, Oahu",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=85",
    position: "center",
    edition: "05",
  },
  {
    id: "quiet-bloom",
    name: "A Quiet Bloom",
    category: "Still life",
    detail: "Collected at home",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1100&q=85",
    position: "center",
    edition: "06",
  },
];

const categories = ["All prints", "Landscape", "Coast", "Still life"];

type CartItem = {
  productId: string;
  size: (typeof sizes)[number];
  quantity: number;
};

export default function PrintShop() {
  const [category, setCategory] = useState("All prints");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    Object.fromEntries(products.map((product) => [product.id, sizes[0].name])),
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const visibleProducts =
    category === "All prints"
      ? products
      : products.filter((product) => product.category === category);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.size.price * item.quantity,
    0,
  );

  function addToCart(productId: string) {
    const sizeName = selectedSizes[productId];
    const size = sizes.find((option) => option.name === sizeName);
    if (!size) {
      throw new Error(`Unknown print size: ${sizeName}`);
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === productId && item.size.name === size.name,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentCart, { productId, size, quantity: 1 }];
    });
    setCartMessage("Print added to your bag.");
  }

  function updateQuantity(productId: string, sizeName: string, change: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId && item.size.name === sizeName
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function checkout() {
    const order = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        if (!product) {
          throw new Error(`Unknown print in cart: ${item.productId}`);
        }
        return `${item.quantity} × ${product.name} — ${item.size.name} (${item.size.dimensions}), $${item.size.price * item.quantity}`;
      })
      .join("\n");
    const subject = encodeURIComponent("Photo print order");
    const body = encodeURIComponent(
      `Hi Maya,\n\nI'd like to order:\n${order}\n\nSubtotal: $${subtotal}\n\nMy shipping address is:\n`,
    );
    window.location.href = `mailto:hello@mayabennett.co?subject=${subject}&body=${body}`;
  }

  return (
    <main className={styles.shop}>
      <div className={styles.announcement}>
        <span>MADE TO LAST, MADE TO ORDER</span>
        <span>COMPLIMENTARY SHIPPING ON ORDERS OVER $125</span>
      </div>

      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Ryan Faisal home">
          Ryan Faisal<span>.</span>
        </Link>
        <nav className={styles.nav} aria-label="Shop navigation">
          <a href="#prints">The collection</a>
          <a href="#about-prints">A little about the prints</a>
        </nav>
        <button
          className={styles.bagButton}
          onClick={() => setCartOpen(true)}
          type="button"
          aria-label={`Open shopping bag, ${cartCount} items`}
        >
          BAG <span>{cartCount.toString().padStart(2, "0")}</span>
        </button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>PHOTOGRAPHS TO LIVE WITH</p>
          <h1>
            A little more
            <br />
            <em>feeling,</em> for your walls.
          </h1>
          <p className={styles.heroDescription}>
            Quiet moments, faraway places, and the kind of light you wish you
            could keep. Printed with care, just for you.
          </p>
          <a className={styles.heroLink} href="#prints">
            FIND YOURS <span aria-hidden="true">↓</span>
          </a>
          <span className={styles.heroEdition}>THE PRINT SHOP · VOL. 01</span>
        </div>
        <div
          className={styles.heroArtwork}
          role="img"
          aria-label="Sunlight falling across a peaceful mountain lake"
        >
          <span className={styles.artworkNote}>Somewhere, unhurried.</span>
          <span className={styles.artworkIndex}>45° 50&apos; N — 6° 52&apos; E</span>
        </div>
      </section>

      <section className={styles.collection} id="prints">
        <div className={styles.collectionHeading}>
          <div>
            <p className={styles.eyebrow}>THE PRINT EDITION</p>
            <h2>Little windows <em>to elsewhere.</em></h2>
          </div>
          <p className={styles.collectionIntro}>
            Each photograph begins with a feeling. I hope one finds its way
            home with you.
          </p>
        </div>

        <div className={styles.toolbar}>
          <span className={styles.printCount}>
            {String(visibleProducts.length).padStart(2, "0")} PHOTOGRAPHS
          </span>
          <div className={styles.filters} aria-label="Filter prints">
            {categories.map((item) => (
              <button
                className={category === item ? styles.activeFilter : ""}
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productGrid}>
          {visibleProducts.map((product) => {
            const selectedSize =
              sizes.find((size) => size.name === selectedSizes[product.id]) ??
              sizes[0];

            return (
              <article className={styles.product} key={product.id}>
                <div className={styles.imageFrame}>
                  <div
                    className={styles.productImage}
                    style={{
                      backgroundImage: `url("${product.image}")`,
                      backgroundPosition: product.position,
                    }}
                    role="img"
                    aria-label={`${product.name}, a fine art photograph`}
                  />
                  <span className={styles.edition}>NO. {product.edition}</span>
                  <span className={styles.categoryTag}>{product.category}</span>
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productTitle}>
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.detail}</p>
                    </div>
                    <span className={styles.price}>${selectedSize.price}</span>
                  </div>
                  <div className={styles.buyRow}>
                    <label className={styles.sizeSelect}>
                      <span className={styles.visuallyHidden}>Print size</span>
                      <select
                        aria-label={`Choose a size for ${product.name}`}
                        value={selectedSizes[product.id]}
                        onChange={(event) =>
                          setSelectedSizes((current) => ({
                            ...current,
                            [product.id]: event.target.value,
                          }))
                        }
                      >
                        {sizes.map((size) => (
                          <option key={size.name} value={size.name}>
                            {size.name} · {size.dimensions}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className={styles.addButton}
                      onClick={() => addToCart(product.id)}
                      type="button"
                    >
                      ADD TO BAG <span aria-hidden="true">+</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.cartMessage} aria-live="polite">
          {cartMessage}
        </p>
      </section>

      <section className={styles.promise} id="about-prints">
        <div className={styles.promiseImage} role="img" aria-label="An art print displayed in a calm, sunlit home" />
        <div className={styles.promiseCopy}>
          <p className={styles.eyebrow}>A GOOD THING, MADE WELL</p>
          <h2>
            For the places
            <br />
            <em>you call home.</em>
          </h2>
          <p>
            Printed just for you on beautifully textured, archival paper. Each
            print is made to order, carefully checked, and packed by hand so it
            arrives ready for a favorite wall.
          </p>
          <div className={styles.promiseDetails}>
            <span>01 <b>ARCHIVAL, ACID-FREE PAPER</b></span>
            <span>02 <b>PRINTED TO ORDER, WITH CARE</b></span>
            <span>03 <b>SHIPS PLASTIC-FREE WORLDWIDE</b></span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.wordmark} href="/">
          Ryan Faisal<span>.</span>
        </Link>
        <span>MADE SLOWLY, WITH LOVE. © 2025 RYAN FAISAL</span>
        <a href="mailto:artbyrayz@gmail.com">QUESTIONS? GET IN TOUCH ↗</a>
      </footer>

      {cartOpen && (
        <div className={styles.cartLayer}>
          <button
            className={styles.backdrop}
            type="button"
            aria-label="Close shopping bag"
            onClick={() => setCartOpen(false)}
          />
          <aside
            className={styles.cartPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className={styles.cartHeader}>
              <div>
                <p className={styles.eyebrow}>YOUR LITTLE COLLECTION</p>
                <h2 id="cart-title">Your bag ({cartCount})</h2>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setCartOpen(false)}
                type="button"
                aria-label="Close shopping bag"
              >
                ×
              </button>
            </div>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Nothing in here just yet.</p>
                <button
                  className={styles.continueButton}
                  onClick={() => setCartOpen(false)}
                  type="button"
                >
                  FIND A PRINT <span aria-hidden="true">↗</span>
                </button>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((item) => {
                    const product = products.find(
                      (entry) => entry.id === item.productId,
                    );
                    if (!product) {
                      throw new Error(`Unknown print in cart: ${item.productId}`);
                    }

                    return (
                      <div
                        className={styles.cartItem}
                        key={`${item.productId}-${item.size.name}`}
                      >
                        <div
                          className={styles.cartThumbnail}
                          style={{ backgroundImage: `url("${product.image}")` }}
                          role="img"
                          aria-label={product.name}
                        />
                        <div className={styles.cartItemInfo}>
                          <h3>{product.name}</h3>
                          <p>
                            {item.size.name} · {item.size.dimensions}
                          </p>
                          <div className={styles.quantityControl}>
                            <button
                              type="button"
                              aria-label={`Remove one ${product.name}`}
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  item.size.name,
                                  -1,
                                )
                              }
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              aria-label={`Add one ${product.name}`}
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  item.size.name,
                                  1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <span className={styles.itemTotal}>
                          ${item.size.price * item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.cartSummary}>
                  <div>
                    <span>Subtotal</span>
                    <strong>${subtotal}</strong>
                  </div>
                  <p>Shipping is calculated when your order is confirmed.</p>
                  <button
                    className={styles.checkoutButton}
                    onClick={checkout}
                    type="button"
                  >
                    ORDER BY EMAIL <span aria-hidden="true">↗</span>
                  </button>
                  <span className={styles.checkoutNote}>
                    We&apos;ll confirm shipping and payment details by email.
                  </span>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
