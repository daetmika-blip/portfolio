/* starts everything. read this one first */

function startSite() {
  // 1. look + sound settings remembered from last visit
  document.documentElement.setAttribute("data-theme", state.theme);
  setThemeLabel();
  setSound(state.sound, false);

  // 2. page transitions
  Wipe.build();
  window.addEventListener("resize", () => { clearTimeout(Wipe.rt); Wipe.rt = setTimeout(() => Wipe.build(), 300); });

  // 3. write the text into each section
  $("#year").textContent = new Date().getFullYear();
  renderHero();
  renderAbout();
  renderSkills();
  Projects.init();

  // 4. visuals and behavior
  FX.init();
  Cursor.init();
  NavUI.init();
  initReveal();
  initPalette();
  initContact();
  initGlobalFeel();
  AdminAccess.init();

  // 5. start screen, then fetch the live data from the backend
  runBoot();
  Projects.load();
  Cv.prefetch();
}

startSite();
