const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Some APIs return:
 * [ ...products ]
 *
 * Others return:
 * { data: [ ...products ] }
 *
 * This helper supports both.
 */
function extractArray(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.products)) {
    return response.products;
  }

  if (Array.isArray(response?.categories)) {
    return response.categories;
  }

  return [];
}

/**
 * Convert Bengali digits to English digits.
 */
export function bengaliToEnglish(value = "") {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  return String(value)
    .split("")
    .map((char) => {
      const index = bengaliDigits.indexOf(char);

      return index === -1
        ? char
        : englishDigits[index];
    })
    .join("");
}

/**
 * Convert English digits to Bengali digits.
 */
export function englishToBengali(value = "") {
  const englishDigits = "0123456789";
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(value)
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);

      return index === -1
        ? char
        : bengaliDigits[index];
    })
    .join("");
}

/**
 * Get numeric value from price.
 *
 * Examples:
 * "১৪৮ টাকা" -> 148
 * "1,850" -> 1850
 * 148 -> 148
 */
export function getNumericPrice(value) {
  if (typeof value === "number") {
    return value;
  }

  const converted = bengaliToEnglish(value);

  const cleaned = converted.replace(
    /[^0-9.-]/g,
    ""
  );

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : 0;
}

/**
 * Format price using Bengali digits.
 */
export function formatPrice(value) {
  const number = getNumericPrice(value);

  return new Intl.NumberFormat("bn-BD").format(
    number
  );
}

/**
 * Normalize one product.
 */


export function normalizeProduct(product = {}) {
  const id = product.id ?? product._id ?? "";
  const slug = product.slug ?? String(id);

  const changeData =
    typeof product.change === "object" && product.change !== null
      ? product.change
      : {};

  const rawChange =
    typeof product.change === "object" && product.change !== null
      ? changeData.pct ?? 0
      : product.change ?? 0;

  const category =
    product.categoryNameBn ??
    product.category_name_bn ??
    product.categoryName ??
    product.category ??
    "";

  return {
    ...product,

    id,
    slug: String(slug),

    name:
      product.nameBn ??
      product.name_bn ??
      product.name ??
      product.title ??
      "অজানা পণ্য",

    description:
      product.description ??
      product.details ??
      product.summary ??
      "",

    category,

    categorySlug:
      product.category ??
      product.categorySlug ??
      product.category_slug ??
      "",

    price: Number(
      product.today ??
      product.price ??
      product.currentPrice ??
      product.current_price ??
      0
    ),

    yesterday: Number(product.yesterday ?? 0),
    lastWeek: Number(product.lastWeek ?? 0),
    lastMonth: Number(product.lastMonth ?? 0),

    change: Number(rawChange),

    changeDirection:
      changeData.dir ??
      (Number(rawChange) > 0
        ? "up"
        : Number(rawChange) < 0
          ? "down"
          : "flat"),

    unit: product.unit ?? "kg",

    emoji:
      product.image ??
      product.categoryIcon ??
      product.emoji ??
      "🛒",

    markets: Array.isArray(product.markets)
      ? product.markets
      : [],

    raw: product,
  };
}



/**
 * Get all products.
 */
export async function getProducts() {
  const response = await request("/products");

  return extractArray(response).map(
    normalizeProduct
  );
}

/**
 * Get one product.
 */
export async function getProduct(slug) {
  const response = await request(
    `/products/${encodeURIComponent(slug)}`
  );

  if (response?.data) {
    return normalizeProduct(response.data);
  }

  return normalizeProduct(response);
}

/**
 * Get all categories.
 */
export async function getCategories() {
  const response = await request("/categories");

  return extractArray(response);
}

/**
 * Get products by category.
 */
export async function getProductsByCategory(
  category
) {
  const response = await request(
    `/products?category=${encodeURIComponent(
      category
    )}`
  );

  return extractArray(response).map(
    normalizeProduct
  );
}