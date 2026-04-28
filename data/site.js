export const bookingConfig = {
  businessName: "Deák Niki Fodrász",
  slotIntervalMinutes: 30,
  daysAhead: 14,
  primaryColorClass: "bg-ink",
  primaryHoverClass: "hover:bg-clay",
  primaryTextClass: "text-clay",
  primaryBorderClass: "border-clay",
  primaryRingClass: "focus-visible:outline-clay",
  openingHours: {
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "10:00", end: "18:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "18:00" },
    saturday: { start: "08:00", end: "13:00" }
  },
  services: [
    { id: "noi", name: "Női hajvágás", durationMinutes: 60, price: "6 000 Ft-tól" },
    { id: "ferfi", name: "Férfi hajvágás", durationMinutes: 30, price: "4 000 Ft-tól" },
    { id: "gyerek", name: "Gyermek hajvágás", durationMinutes: 30, price: "3 500 Ft-tól" },
    { id: "festes", name: "Hajfestés", durationMinutes: 120, price: "14 000 Ft-tól" },
    { id: "melir", name: "Melír", durationMinutes: 120, price: "16 000 Ft-tól" }
  ]
};

export const services = [
  {
    id: "noi",
    name: "Női hajvágás",
    text: "Friss forma, amit otthon is könnyű viselni. Megnézzük, mi áll jól, aztán szépen megcsináljuk.",
    price: "6 000 Ft-tól"
  },
  {
    id: "ferfi",
    name: "Férfi hajvágás",
    text: "Tiszta vágás, rendezett kontúr, felesleges körök nélkül.",
    price: "4 000 Ft-tól"
  },
  {
    id: "gyerek",
    name: "Gyermek hajvágás",
    text: "Nyugis tempóban, türelemmel. Akkor jó, ha a kicsi sem feszeng közben.",
    price: "3 500 Ft-tól"
  },
  {
    id: "festes",
    name: "Hajfestés",
    text: "Lenövés, árnyalatfrissítés vagy teljes váltás. Átbeszéljük, mennyit bír a hajad.",
    price: "14 000 Ft-tól"
  },
  {
    id: "melir",
    name: "Melír",
    text: "Finom fények vagy látványosabb szőke hatás. Nem kapkodós munka.",
    price: "16 000 Ft-tól"
  }
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85",
    alt: "Fodrász munka közben világos szalonban"
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=85",
    alt: "Frissen szárított női haj"
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85",
    alt: "Fodrász szalon részlet"
  },
  {
    src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85",
    alt: "Hajfestés természetes árnyalatokkal"
  },
  {
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
    alt: "Puha hullámos haj közelről"
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85",
    alt: "Rendezett szőke haj inspiráció"
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85",
    alt: "Férfi hajvágás szalonban"
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
    alt: "Smink és haj előkészítés hangulat"
  },
  {
    src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1200&q=85",
    alt: "Fodrász eszközök letisztult környezetben"
  }
];

export const contact = {
  city: "Tatabánya",
  address: "Tatabánya",
  phone: "+36 30 000 0000",
  facebookUrl: "https://www.facebook.com/",
  instagramUrl: "https://www.instagram.com/",
  mapsEmbedUrl: "https://www.google.com/maps?q=Tatab%C3%A1nya&output=embed"
};
