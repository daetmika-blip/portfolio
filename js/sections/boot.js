/* welcome screen, then the enter button. only plays once per visit */

async function runBoot() {
  const loader = $("#loader");

  const finish = async () => {
    Sfx.whoosh();
    await Wipe.in();
    loader.remove();
    document.body.classList.remove("loading");
    document.body.classList.add("ready");
    NavUI.moveInd();
    await wait(80);
    await Wipe.out();
    scramble($("#hero-name"), CONFIG.name, 900);
    startTyping();
  };

  // Already pressed start in this browser session (or reduced motion): skip the show.
  if (reduce || store.sget("mk-booted")) {
    $("#boot-log").textContent = "> WELCOME BACK";
    $("#load-fill").style.width = "100%"; $("#load-pct").textContent = "100%";
    await wait(reduce ? 0 : 350);
    store.sset("mk-booted", "1");
    await finish();
    return;
  }

  const lines = ["> OPENING THE DATASET ..... OK", "> SWEEPING UP THE DATA ... OK", "> GROWING THE CHARTS ..... OK", "> PORTFOLIO READY ........ OK"];
  const log = $("#boot-log"), fill = $("#load-fill"), pct = $("#load-pct");
  let shown = "";
  for (let i = 0; i < lines.length; i++) {
    shown += lines[i] + "\n"; log.textContent = shown;
    const to = Math.round((i + 1) / lines.length * 100);
    fill.style.width = to + "%"; pct.textContent = to + "%";
    await wait(380);
  }

  // ENTER button (everyone). Admin access is the ADMIN button in the corner of the page.
  const btn = $("#start-btn");
  btn.hidden = false;
  btn.focus();

  await new Promise(res => {
    btn.addEventListener("click", res, { once: true });
    window.addEventListener("keydown", function h(e) {
      if (e.key === "Enter" || e.key === " ") { window.removeEventListener("keydown", h); res(); }
    });
  });

  store.sset("mk-booted", "1");
  Sfx.coin();
  await finish();
}
