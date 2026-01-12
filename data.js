// data.js
// Plain JS data (no imports/exports). app.js reads these from window.

window.VOID_DATA = {
  STATUS_MESSAGES: ["Power: On!", "Game: Detected!", "Controllers: Found!", "Players: Ready!"],
  HUD_STATS: [
    { label: "NOSTALGIA", value: "99%" },
    { label: "LATENCY", value: "0ms" },
    { label: "HARDWARE", value: "ANALOG" }
  ],

  // If your original constants.ts had different items, paste them here.
  // These are safe placeholders to keep the layout working immediately:
  CONSOLES: [
    { id: "nes", name: "Nintendo Entertainment System", manufacturer: "Nintendo", image: "https://images.unsplash.com/photo-1703868671298-b1d776d486f7?auto=format&fit=crop&q=80&w=1200" },
    { id: "snes", name: "Super Nintendo", manufacturer: "Nintendo", image: "https://images.unsplash.com/photo-1531594835867-65b60cc9e4ff?auto=format&fit=crop&q=80&w=1200" },
    { id: "genesis", name: "Sega Genesis", manufacturer: "SEGA", image: "https://images.unsplash.com/photo-1627421383054-488d9c9828f5?auto=format&fit=crop&q=80&w=1200" },
    { id: "n64", name: "Nintendo 64", manufacturer: "Nintendo", image: "https://images.unsplash.com/photo-1623762736174-77dccc1e571f?auto=format&fit=crop&q=80&w=1200" }
  ],

  PREVIEW_GAMES: [
    { title: "Super Mario Bros.", console: "NES", year: "1985", genre: "Platformer", players: "1–2", image: "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png" },
    { title: "Mario Kart 64", console: "N64", year: "1996", genre: "Racing", players: "1–4", image: "https://e.snmc.io/lk/l/x/265ca0d1c79d17cb517ebee7c1618db8/8030147" },
    { title: "Sonic the Hedgehog", console: "GENESIS", year: "1991", genre: "Platformer", players: "1", image: "https://upload.wikimedia.org/wikipedia/en/b/ba/Sonic_the_Hedgehog_1_Genesis_box_art.jpg" },
    { title: "Street Fighter II", console: "SNES", year: "1992", genre: "Fighting", players: "1–2", image: "https://i.ebayimg.com/images/g/UN0AAOSw7NpdcTan/s-l1600.webp" }
  ]
};
