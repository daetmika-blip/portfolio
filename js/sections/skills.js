/* skill bars (the list is in js/content.js) */

function renderSkills() {
  $("#skill-list").innerHTML = SKILLS.map((s, i) =>
    '<div class="reveal" data-r="up" style="--i:' + (i % 4) + '"><div class="skill" style="--i:' + i + '">' +
    '<div class="skill-head"><span class="skill-name">' + esc(s.name) + '</span><span class="skill-lv">' + (s.lvl < 40 ? "LEARNING" : s.lvl < 65 ? "COMFORTABLE" : "STRONG") + "</span></div>" +
    '<div class="skill-bar"><div class="skill-fill" style="--lvl:' + Number(s.lvl) + "%;--c:var(--" + esc(s.color) + ')"></div></div>' +
    '<p class="skill-note">' + esc(s.note) + "</p></div></div>").join("");
}
