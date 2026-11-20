/* small bits of state: theme and sound */

const THEMES = ["night", "day"];

const state = {
  theme: store.get("mk-theme", "day"),
  sound: store.get("mk-sound", "0") === "1",
  petals: true,
  busy: false
};

if (!THEMES.includes(state.theme)) state.theme = "day";
