export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  // --- Category: Plushies (6 items) ---
  {
    id: 1,
    name: "Speaking Gwinglish Adar Llwch Gwin Plush",
    description: "Fluffy and mysterious creature from the woods with arcane aura. Official Reverse: 1999 plush companion.",
    price: 22.99,
    category: "Plushies",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/e6f5c8d85e892e9dc29df13cf027bb69.jpg?v=1786612616"
  },
  {
    id: 2,
    name: "I’m All Ears Bkornblume Plushie",
    description: "Cute and soft Bkornblume plush toy with her signature radio headgear and attentive listening ears.",
    price: 41.99,
    category: "Plushies",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/b704a1e1bf1558fc325c856d3c8b55bd.jpg?v=1789897655"
  },
  {
    id: 3,
    name: "Voices Adrift Everecho Plush Hand Puppet Set",
    description: "Artistic plush puppet pair crafted with premium velvety materials, capturing forgotten melodies across eras.",
    price: 46.99,
    category: "Plushies",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/2c00bdc5d12cbf1d3f006802d256502f.jpg?v=1789897526"
  },
  {
    id: 4,
    name: "A Gift of Nourishment 37 Holiday Garment Plush",
    description: "Adorable plush of arithmetician 37 dressed in her cozy holiday garment with embroidered geometric patterns.",
    price: 39.99,
    category: "Plushies",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/37_d857e6c2-4611-4f41-ac8c-d7a2772319d9.jpg?v=1786612446"
  },
  {
    id: 5,
    name: "Regulus Captain Chibi Plush Doll",
    description: "Pirate captain Regulus rocking her vintage vinyl records and cool sunglasses in plush format.",
    price: 34.99,
    category: "Plushies",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/b704a1e1bf1558fc325c856d3c8b55bd.jpg?v=1789897655"
  },
  {
    id: 6,
    name: "Tooth Fairy Bedtime Story Sleeping Plush",
    description: "Comfortable and calming sleeping companion inspired by the gentle Tooth Fairy and her soothing nursery rhymes.",
    price: 38.99,
    category: "Plushies",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/e6f5c8d85e892e9dc29df13cf027bb69.jpg?v=1786612616"
  },

  // --- Category: Badges (6 items) ---
  {
    id: 7,
    name: "Finale in Silver Lorentz Butterfly Garment Badge",
    description: "Exquisite tinplate badge featuring shimmering Lorentz Butterfly accents and classic metallic shine.",
    price: 7.99,
    category: "Badges",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/309485a693331f8107ebac421fe2d93f.jpg?v=1789891402"
  },
  {
    id: 8,
    name: "A Haven Restored Character Badge Set",
    description: "Collection of collector-grade metallic badges featuring key arcanists from the Foundation's archive.",
    price: 12.99,
    category: "Badges",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/150660359b29a5312a76dca60ce8b391.jpg?v=1789891905"
  },
  {
    id: 9,
    name: "The Correlated Character Badges Box",
    description: "Full deluxe badge commemorative pack detailing mathematical precision and timeless portraits.",
    price: 41.99,
    category: "Badges",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/75d61fca9d1e22552e187d09ec0649cd.jpg?v=1786606002"
  },
  {
    id: 10,
    name: "Life and Loss Character Garment Badges",
    description: "Reflective vintage finish tinplate button badge celebrating dramatic turning points of the era.",
    price: 7.99,
    category: "Badges",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/2165c0c624b743efe41f632a19756bf7.jpg?v=1786608991"
  },
  {
    id: 11,
    name: "Renewed Life Silverwing Eagle ID Badge Holder",
    description: "Elegant metal and leatherette identification badge holder embossed with the Silverwing emblem.",
    price: 23.99,
    category: "Badges",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/ed37d5406e082cafac5107dcaa29a3ac.jpg?v=1786614979"
  },
  {
    id: 12,
    name: "Polymerized Dreams Character Badge",
    description: "Collaboration special edition badge crafted with holographic foil and retro-futuristic aesthetic.",
    price: 14.99,
    category: "Badges",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/S02_d1beea21-43fc-46d7-8192-bf9c9f9fc6ed.jpg?v=1785999518"
  },

  // --- Category: Standees (6 items) ---
  {
    id: 13,
    name: "Antarctic Overlook Double-Shiny Acrylic Shikishi Board",
    description: "High-transparency acrylic display art board showcasing the dramatic icy winds of the Southern Pole expedition.",
    price: 14.99,
    category: "Standees",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/KV.jpg?v=1757386460"
  },
  {
    id: 14,
    name: "Returning Nevermore Igor Quicksand Acrylic Standee",
    description: "Multi-layered dynamic acrylic stand with swirling glitter liquid simulating mysterious time quicksands.",
    price: 35.99,
    category: "Standees",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/e2d340ead164f20c9d8f5f0f5d50633d.jpg?v=1789896856"
  },
  {
    id: 15,
    name: "Shadows in the Lake Series Acrylic Standees",
    description: "Scenic desktop acrylic figurine stand with interchangeable backdrop pieces and intricate forest ripples.",
    price: 29.99,
    category: "Standees",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/3425a9c7ef89af0dfca2f1ea086d11fc_f3da7f60-35e3-4929-a25c-686cf8a2d993.jpg?v=1789892470"
  },
  {
    id: 16,
    name: "Finale in Silver Lorentz Butterfly Garment Standee",
    description: "Graceful theatrical acrylic display featuring silver-plated filigree and delicate butterfly wings.",
    price: 18.99,
    category: "Standees",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/e2d340ead164f20c9d8f5f0f5d50633d.jpg?v=1789896856"
  },
  {
    id: 17,
    name: "Pre-Storm Protocol Silver Foil Shikishi Board",
    description: "Collector's art shikishi board treated with cold-stamped silver foil capturing the stillness before the Storm.",
    price: 8.99,
    category: "Standees",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/3a9925565eda818355b09845f6cabd3a.jpg?v=1782809269"
  },
  {
    id: 18,
    name: "Wander My Way Acrylic Shikishi Board",
    description: "Vibrant and poetic artboard depicting travels across 20th century European streets and rain showers.",
    price: 14.99,
    category: "Standees",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/a4a0c4849b49082376d9afdb0dc9ac8c.jpg?v=1776308392"
  },

  // --- Category: Accessories (6 items) ---
  {
    id: 19,
    name: "Tuning Chibi Vertin Cable Holder",
    description: "Charming desktop cord organizer sculpted as Timekeeper Vertin tuning her vintage acoustic instrument.",
    price: 20.99,
    category: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/Q_2da06dbc-ad74-4302-abc8-e3f129f8e9ea.jpg?v=1786613509"
  },
  {
    id: 20,
    name: "The Temporal Scale Wooden Block Puzzle",
    description: "Intellectual mechanical puzzle crafted from sustainable timber, challenging arcanists to align the scales of time.",
    price: 35.99,
    category: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/8bc8f7346f884e9a5b80f7ddbd5ca7c9.jpg?v=1789897320"
  },
  {
    id: 21,
    name: "Verses to Heaven Hissabeth Holiday Garment Pack",
    description: "Commemorative holiday stationary set and festive fabric accessories packed in vintage sealing wax envelope.",
    price: 12.99,
    category: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/60bf5af988bd23ab357ce4ad30b86560.jpg?v=1789897110"
  },
  {
    id: 22,
    name: "Golden Fleece Vintage Pocket Watch Keyring",
    description: "Antique brass pocket watch replica with delicate Roman numerals and ticking pendulum motif.",
    price: 16.99,
    category: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/ed37d5406e082cafac5107dcaa29a3ac.jpg?v=1786614979"
  },
  {
    id: 23,
    name: "Timekeeper's Suitcase Replica Leather Luggage Tag",
    description: "Genuine embossed brown leather tag inspired by Vertin's miraculous traveling suitcase.",
    price: 15.99,
    category: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/8bc8f7346f884e9a5b80f7ddbd5ca7c9.jpg?v=1789897320"
  },
  {
    id: 24,
    name: "Spinning Compass Rotating Metal Keychain",
    description: "Heavyweight brass rotating compass keychain calibrated to guide lost souls through the eras.",
    price: 18.99,
    category: "Accessories",
    image: "https://cdn.shopify.com/s/files/1/0893/3877/3822/files/Q_2da06dbc-ad74-4302-abc8-e3f129f8e9ea.jpg?v=1786613509"
  }
];
