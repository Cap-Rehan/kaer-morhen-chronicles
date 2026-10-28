/* THE WITCHER — THE CHRONICLES BEFORE THE WILD HUNT
 * Rendering and interaction. Story content lives in data.js. */
(function () {
  "use strict";

  const D = window.CHRONICLE;
  const root = document.getElementById("chronicle-root");
  if (!D || !root) return;

  /* ─────────────── helpers ─────────────── */
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fold = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const KIND = {
    main: "Main story",
    choice: "Player choice",
    optional: "Optional",
    shared: "Both routes",
    iorveth: "Iorveth route",
    roche: "Roche route",
    ending: "Ending"
  };
  const GAME = { w1: "The Witcher", w2: "The Witcher 2" };
  const AFFIL = {
    witchers: "School of the Wolf", vipers: "School of the Viper", temeria: "Temeria", mages: "Mages",
    scoiatael: "Scoia'tael", lodge: "Lodge of Sorceresses", order: "Order of the Flaming Rose",
    salamandra: "Salamandra", kaedwen: "Kaedwen", aedirn: "Aedirn", nilfgaard: "Nilfgaard", friends: "Geralt's friends"
  };

  const charById = Object.fromEntries(D.characters.map((c) => [c.id, c]));
  const personName = (id) => (charById[id] ? charById[id].name : D.minorPeople[id] || id);

  /* ─────────────── illustrations ─────────────── */

  // Rolling hills from a seed, so each vignette is different but stable.
  function hills(seed, base, amp, cls) {
    let s = seed;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    let d = `M0 ${base}`;
    for (let x = 0; x <= 600; x += 60) d += ` Q${x + 30} ${base - amp * rnd()} ${x + 60} ${base - amp * 0.4 * rnd()}`;
    return `<path class="${cls}" d="${d} V200 H0Z"/>`;
  }
  const pine = (x, y, h) => `M${x} ${y} L${x - h * 0.28} ${y} L${x - 2} ${y - h * 0.5} L${x - h * 0.2} ${y - h * 0.5} L${x} ${y - h} L${x + h * 0.2} ${y - h * 0.5} L${x + 2} ${y - h * 0.5} L${x + h * 0.28} ${y} Z`;
  const tower = (x, y, w, h, roof) =>
    roof ? `M${x} ${y} V${y - h} L${x + w / 2} ${y - h - w * 1.1} L${x + w} ${y - h} V${y} Z`
         : `M${x} ${y} V${y - h} h${w * 0.25} v-5 h${w * 0.2} v5 h${w * 0.1} v-5 h${w * 0.2} v5 h${w * 0.25} V${y} Z`;
  const house = (x, y, w, h) => `M${x} ${y} V${y - h} L${x + w / 2} ${y - h - w * 0.55} L${x + w} ${y - h} V${y} Z`;

  const SILHOUETTES = {
    fortress: () => [tower(250, 112, 26, 50), tower(282, 112, 40, 34), tower(328, 112, 22, 62, true), tower(356, 112, 30, 28)].join(" ") + " M240 116 L370 116 L400 140 H210 Z",
    village: () => [house(130, 122, 34, 18), house(170, 124, 26, 14), house(330, 122, 30, 16), house(366, 124, 40, 18), tower(250, 124, 18, 40, true), pine(470, 128, 46), pine(500, 130, 34), pine(90, 128, 40)].join(" "),
    city: () => {
      let d = "M60 124 H540 V140 H60 Z";
      [80, 140, 210, 300, 380, 450, 510].forEach((x, i) => (d += " " + tower(x, 124, 20 + (i % 3) * 6, 34 + ((i * 13) % 30), i % 2 === 0)));
      return d + " " + tower(285, 124, 30, 70, true);
    },
    palace: () => [tower(200, 124, 30, 44, true), tower(240, 124, 120, 30), tower(270, 94, 60, 26), tower(290, 70, 20, 30, true), tower(370, 124, 30, 44, true)].join(" ") + " M190 124 H410 V140 H190Z",
    lake: () => "M0 112 H600 V140 H0 Z " + [pine(60, 112, 44), pine(84, 112, 30), pine(540, 112, 50), pine(566, 112, 36), house(470, 112, 26, 12)].join(" "),
    fire: () => SILHOUETTES.city(),
    frost: () => "M120 130 L170 60 L190 130 Z M180 130 L240 30 L270 130 Z M260 130 L300 70 L330 130 Z M330 130 L380 46 L420 130 Z M410 130 L450 84 L480 130 Z",
    siege: () => [tower(330, 120, 26, 54, true), tower(360, 120, 60, 32), tower(424, 120, 24, 46)].join(" ") + " M320 120 H460 V140 H320Z M150 124 L170 70 L196 70 L206 124 Z M176 70 V52 L200 60 L176 66",
    forest: () => [40, 80, 110, 150, 200, 240, 300, 350, 390, 440, 480, 530, 570].map((x, i) => pine(x, 134, 40 + ((i * 17) % 34))).join(" "),
    mountain: () => "M180 130 L300 30 L420 130 Z " + [house(260, 128, 24, 14), house(290, 126, 30, 18), house(326, 128, 22, 12)].join(" "),
    camp: () => [0, 1, 2, 3, 4].map((i) => `M${120 + i * 80} 128 L${150 + i * 80} ${88 - (i % 2) * 10} L${180 + i * 80} 128 Z M${150 + i * 80} ${88 - (i % 2) * 10} V${68 - (i % 2) * 10} L${168 + i * 80} ${74 - (i % 2) * 10} L${150 + i * 80} ${80 - (i % 2) * 10}`).join(" "),
    ruins: () => "M170 128 V70 h14 V128Z M210 128 V84 h14 V128Z M250 128 V60 h14 V128 Z M170 70 Q217 26 264 60 L264 70 Q217 40 184 76 Z M330 128 V96 h14 V128Z M370 128 V74 h14 V112 h-8 V128Z M410 128 V88 h14 V128Z M160 128 H440 V136 H160Z",
    viper: () => "M200 120 C 200 70, 300 70, 300 100 C 300 125, 240 125, 240 102 C 240 88, 270 86, 272 100",
    road: () => "M270 140 L296 96 L304 96 L330 140 Z " + [pine(120, 130, 40), pine(150, 132, 30), pine(460, 130, 44), pine(492, 132, 32)].join(" "),
    tower: () => tower(282, 132, 36, 92, true) + " M276 132 H330 V140 H276Z " + [pine(160, 134, 30), pine(186, 136, 22), pine(430, 134, 34), pine(460, 136, 24)].join(" "),
    dragon: () => "M300 10 C 284 2 256 -18 196 -30 C 228 -10 238 0 246 10 C 214 6 186 10 150 22 C 196 24 228 26 258 30 C 268 38 284 42 300 40 C 316 42 332 38 342 30 C 372 26 404 24 450 22 C 414 10 386 6 354 10 C 362 0 372 -10 404 -30 C 344 -18 316 2 300 10 Z M296 10 L300 -6 L304 10 Z M296 38 Q 300 62 334 70 Q 306 58 304 38 Z " + SILHOUETTES.ruins(),
    hunt: () => "M240 140 V96 L222 52 L250 84 L262 36 L276 80 L300 14 L324 80 L338 36 L350 84 L378 52 L360 96 V140 Z M272 104 H328 V112 H272 Z",
    army: () => {
      let d = "M0 128 H600 V140 H0 Z";
      for (let x = 6; x < 600; x += 13) d += ` M${x} 128 V${74 + ((x * 7) % 18)} h2 V128 Z M${x - 4} 132 a5 6 0 0 1 10 0 Z`;
      for (let x = 30; x < 600; x += 84) d += ` M${x} ${60 + (x % 10)} h22 l-7 8 l7 8 h-22 Z M${x} ${60 + (x % 10)} V128 h-2 V${60 + (x % 10)} Z`;
      return d;
    }
  };

  // `spec` is "silhouette palette", e.g. "fortress fire"; the palette defaults to the silhouette name.
  let artUid = 0;
  function chapterArt(spec) {
    const [type, pal = type] = spec.split(" ");
    const id = "sky" + ++artUid;
    const seed = [...spec].reduce((a, c) => a + c.charCodeAt(0), 0);
    const sil = (SILHOUETTES[type] || SILHOUETTES.forest)();
    const stroke = type === "viper" ? ' fill="none" stroke-width="5" stroke-linecap="round"' : "";
    const mx = 380 + (seed % 160), my = 34 + (seed % 26);
    let stars = "", r = seed;
    for (let i = 0; i < 36; i++) { r = (r * 9301 + 49297) % 233280; stars += `<circle cx="${(r % 600)}" cy="${(r * 7) % 110}" r="${0.4 + (i % 3) * 0.35}"/>`; }
    return `<svg class="art art--${pal}" viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="art__s1"/><stop offset="1" class="art__s2"/></linearGradient>
        <radialGradient id="${id}g" cx="${mx / 600}" cy="${(my + 70) / 200}" r="0.55"><stop offset="0" class="art__g1"/><stop offset="1" class="art__g2"/></radialGradient>
      </defs>
      <rect width="600" height="200" fill="url(#${id})"/>
      <rect width="600" height="200" fill="url(#${id}g)"/>
      <g class="art__stars">${stars}</g>
      <circle class="art__moon" cx="${mx}" cy="${my}" r="16"/>
      <g class="art__layer" data-depth="0.25">${hills(seed, 150, 64, "art__far")}</g>
      <g class="art__layer" data-depth="0.55">${hills(seed * 7, 172, 36, "art__mid")}</g>
      <g class="art__layer" data-depth="1"><path class="art__sil" d="${sil}" transform="translate(0 60)"${stroke}/><rect class="art__ground" y="196" width="600" height="4"/></g>
    </svg>`;
  }

  // Drifting embers or snow over an illustration.
  function particles(kind, n = 16) {
    let out = "";
    for (let i = 0; i < n; i++) {
      const x = (i * 61) % 100, d = 6 + ((i * 37) % 70) / 10, delay = -((i * 53) % 90) / 10, sz = 2 + (i % 3);
      out += `<i style="left:${x}%;width:${sz}px;height:${sz}px;animation-duration:${d}s;animation-delay:${delay}s"></i>`;
    }
    return `<div class="fx fx--${kind}" aria-hidden="true">${out}</div>`;
  }
  const FX = { fire: "embers", siege: "embers", dragon: "embers", army: "embers", frost: "snow", hunt: "snow" };
  const artBlock = (spec) => {
    const pal = spec.split(" ")[1] || spec;
    return chapterArt(spec) + (FX[pal] ? particles(FX[pal]) : "");
  };

  // Heraldic crest with initials, coloured by allegiance.
  const CREST_COLOR = {
    witchers: "#b89a62", vipers: "#6f9c8a", temeria: "#7c90ab", scoiatael: "#7f9a6a", lodge: "#a07896", mages: "#a07896",
    order: "#b0544c", salamandra: "#c27c3f", kaedwen: "#9aa0a8", aedirn: "#c2a352", nilfgaard: "#d6b44e", friends: "#cdb88e"
  };
  function crest(id) {
    const c = charById[id];
    const name = personName(id);
    const words = name.replace(/^(King|Princess|Emperor|The)\s+/, "").split(/\s+/).filter((w) => !/^(of|de|la)$/i.test(w));
    const initials = (words[0][0] + (words[1] ? words[1][0] : "")).toUpperCase();
    const color = c ? CREST_COLOR[c.affiliation[0]] || "#999a8e" : "#6f7067";
    return `<svg class="crest" viewBox="0 0 48 48" style="--c:${color}" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22.5" class="crest__bg"/><path d="M24 5 L43 24 L24 43 L5 24 Z" class="crest__mark"/>
      <circle cx="24" cy="24" r="22.5" class="crest__ring"/><text x="24" y="29.5" text-anchor="middle">${esc(initials)}</text></svg>`;
  }

  // Simple geometric heraldry for factions.
  const SEAL_GLYPH = {
    wolf: '<use href="#medallion-small" x="18" y="22" width="44" height="44"/>',
    rose: '<g transform="translate(40 44)"><circle r="7"/><circle cx="0" cy="-12" r="7"/><circle cx="11" cy="-4" r="7"/><circle cx="7" cy="10" r="7"/><circle cx="-7" cy="10" r="7"/><circle cx="-11" cy="-4" r="7"/></g>',
    squirrel: '<path d="M30 62 C22 50 26 34 40 30 C34 22 44 16 50 24 C58 34 52 46 46 50 C52 54 52 62 46 64 Z" />',
    lily: '<path d="M40 22 C34 32 34 44 40 52 C46 44 46 32 40 22 Z M40 52 C30 46 22 50 24 58 C30 54 34 54 38 56 Z M40 52 C50 46 58 50 56 58 C50 54 46 54 42 56 Z M30 58 H50 V62 H30Z M38 62 H42 V68 H38Z"/>',
    unicorn: '<path d="M26 64 L34 38 L28 30 L40 34 L56 16 L48 36 L54 44 L46 50 L48 64 Z"/>',
    tower: '<path d="M30 66 V30 h4 v-6 h4 v6 h4 v-6 h4 v6 h4 V66 Z" />',
    eye: '<path d="M20 44 Q40 24 60 44 Q40 64 20 44 Z" fill="none" stroke-width="3"/><circle cx="40" cy="44" r="7"/>',
    sun: '<g transform="translate(40 44)"><circle r="9"/>' + Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30})" d="M-2.5 -13 L0 -22 L2.5 -13 Z"/>`).join("") + "</g>",
    salamander: '<path d="M26 60 C34 60 30 46 40 44 C50 42 46 30 56 28" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="57" cy="27" r="4"/>'
  };
  const seal = (type) =>
    `<svg class="seal" viewBox="0 0 80 88" aria-hidden="true" focusable="false">
      <path class="seal__shield" d="M6 6 H74 V44 C74 66 58 78 40 84 C22 78 6 66 6 44 Z"/>
      <path class="seal__inner" d="M12 12 H68 V44 C68 62 55 72 40 77 C25 72 12 62 12 44 Z"/>
      <g class="seal__glyph">${SEAL_GLYPH[type] || ""}</g>
    </svg>`;

  /* ─────────────── figures ─────────────── */

  function ledger(title, rows, caption) {
    return `<figure class="ledger">
      <figcaption class="ledger__title">${esc(title)}</figcaption>
      <ul class="ledger__rows">
        ${rows.map(([a, rel, b, kind]) => `<li class="ledger__row ledger__row--${kind || "plain"}">
            <span class="pill">${esc(a)}</span>
            <span class="ledger__rel"><span class="ledger__line" aria-hidden="true"></span><em>${esc(rel)}</em><span class="ledger__line" aria-hidden="true"></span></span>
            <span class="pill">${esc(b)}</span></li>`).join("")}
      </ul>
      ${caption ? `<p class="ledger__caption">${esc(caption)}</p>` : ""}
    </figure>`;
  }

  const FIGURES = {
    "w1-factions": () =>
      ledger("The powers of Vizima", [
        ["Order of the Flaming Rose", "open war", "Scoia'tael", "danger"],
        ["Humans of Vizima", "fear and resentment", "Elves & dwarves", "plain"],
        ["Salamandra", "robbed", "Kaer Morhen", "danger"],
        ["Jacques de Aldersberg", "secretly commands", "Salamandra", "hidden"],
        ["Geralt", "caught between", "all of them", "plain"]
      ], "The dotted line is unknown to Geralt until Chapter V."),
    "w2-conspiracy": () =>
      ledger("Who wanted the kings dead", [
        ["Emperor Emhyr", "true employer of", "Letho & the Vipers", "danger"],
        ["The Lodge (via Síle)", "believed it was using", "Letho", "hidden"],
        ["Letho", "murdered", "Demavend of Aedirn", "plain"],
        ["Letho", "murdered", "Foltest of Temeria", "plain"],
        ["Philippa Eilhart", "controlled by magic", "Saskia the dragon", "hidden"],
        ["Exposure of the Lodge", "turns the North against", "Mages", "danger"]
      ], "Every thread ends by weakening the North, which is what Nilfgaard wanted."),
    "w2-outcomes": () =>
      `<div class="outcomes" role="region" aria-label="Witcher 2 decisions and their consequences" tabindex="0">
        <table>
          <thead><tr><th scope="col">Decision</th><th scope="col">Route</th><th scope="col">What changes</th></tr></thead>
          <tbody>${D.outcomes.map((o) => `<tr>
            <th scope="row">${esc(o.decision)}</th>
            <td data-label="Route"><span class="badge badge--${o.route === "Both" ? "shared" : o.route.toLowerCase()}">${esc(o.route === "Both" ? "Both routes" : o.route + " route")}</span></td>
            <td data-label="What changes">${esc(o.affects)}</td></tr>`).join("")}</tbody>
        </table>
      </div>`
  };

  function mapFigure() {
    const regions = D.regions.map((r) => `<text class="map__region${r.danger ? " map__region--danger" : ""}" x="${r.x}" y="${r.y}">${esc(r.name)}</text>`).join("");
    const places = D.places.map((p) => {
      const pos = p.label || "right";
      const lx = pos === "left" ? p.x - 12 : pos === "right" ? p.x + 12 : p.x;
      const ly = pos === "above" ? p.y - 14 : pos === "below" ? p.y + 26 : p.y + 6;
      const anchor = pos === "left" ? "end" : pos === "right" ? "start" : "middle";
      return `<a href="${p.href}" class="map__place map__place--${p.game}" aria-label="${esc(p.name)}, ${esc(p.note)}. Go to ${p.game === "w1" ? "The Witcher" : "The Witcher 2"} chapter">
        <circle cx="${p.x}" cy="${p.y}" r="11" class="map__halo"/>
        <path d="M${p.x} ${p.y - 6} L${p.x + 6} ${p.y} L${p.x} ${p.y + 6} L${p.x - 6} ${p.y} Z" class="map__pin"/>
        <text x="${lx}" y="${ly}" text-anchor="${anchor}">${esc(p.name)}</text>
      </a>`;
    }).join("");
    return `<section class="continent reveal" id="continent" aria-labelledby="continent-title" data-toc data-chapter="The Continent">
      <header class="section-head">
        <p class="eyebrow">Before the first page</p>
        <h3 class="section-title" id="continent-title">The Lay of the Land</h3>
        <p class="section-lede">Both games take place in the Northern Kingdoms, a patchwork of rival realms north of the Nilfgaardian Empire. The first game stays around Vizima, the Temerian capital. The second follows the Pontar river east into Aedirn. Select a place to jump to its chapter.</p>
      </header>
      <figure class="map">
        <svg viewBox="0 0 800 500" role="group" aria-label="Schematic map of the Northern Kingdoms">
          <defs>
            <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0V8" class="map__hatch"/></pattern>
          </defs>
          <rect width="800" height="500" class="map__paper"/>
          <path d="M0 448 C 160 438 300 458 420 446 S 680 440 800 452 V500 H0Z" fill="url(#hatch)" class="map__south"/>
          <path class="map__border" d="M430 0 C 436 80 420 160 430 226"/>
          <path class="map__border" d="M470 205 C 560 196 680 214 800 200"/>
          <path class="map__border" d="M455 245 C 448 300 462 360 452 432"/>
          <path class="map__river" d="M800 238 C 740 246 700 240 660 248 S 580 254 530 248 S 450 230 405 230 S 320 214 260 220 S 120 206 0 216"/>
          <path class="map__river" d="M800 424 C 700 432 600 418 500 428 S 300 444 200 432 S 60 422 0 432"/>
          <path class="map__mount" d="M500 160 l14 -22 l14 22 M526 168 l12 -18 l12 18 M600 160 l14 -22 l14 22 M622 150 l10 -16 l10 16"/>
          <ellipse cx="240" cy="352" rx="34" ry="12" class="map__lake"/>
          <text class="map__river-label" x="120" y="204">Pontar</text>
          <text class="map__river-label" x="90" y="420">Yaruga</text>
          ${regions}
          ${places}
          <g class="map__rose" transform="translate(740 90)"><circle r="26"/><path d="M0 -34 L5 0 L0 34 L-5 0 Z M-34 0 L0 -5 L34 0 L0 5 Z"/><text y="-40" text-anchor="middle">N</text></g>
        </svg>
        <figcaption class="map__caption"><span><i class="sw sw--w1"></i>The Witcher</span><span><i class="sw sw--w2"></i>The Witcher 2</span><em>Schematic and not to scale. Positions are approximate.</em></figcaption>
      </figure>
    </section>`;
  }

  function branchFigure() {
    const { nodes, edges } = D.branchMap;
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const H = 720;
    const lines = edges.map(([a, b]) => {
      const A = byId[a], B = byId[b];
      const kind = B.kind === "iorveth" || A.kind === "iorveth" ? "iorveth" : B.kind === "roche" || A.kind === "roche" ? "roche" : "shared";
      const ax = A.x / 6, bx = B.x / 6, my = (A.y + B.y) / 2;
      return `<path class="branch__edge branch__edge--${kind}" d="M${ax} ${A.y} C ${ax} ${my}, ${bx} ${my}, ${bx} ${B.y}" vector-effect="non-scaling-stroke"/>`;
    }).join("");
    const btns = nodes.map((n) =>
      `<a class="branch__node branch__node--${n.kind}" href="${n.href}" style="left:${n.x / 6}%;top:${n.y}px">
        <span class="branch__label">${esc(n.label)}</span><span class="branch__sub">${esc(n.sub)}</span></a>`).join("");
    return `<section class="branches reveal" id="branches" aria-labelledby="branches-title" data-toc data-chapter="The Shape of the Story">
      <header class="section-head">
        <p class="eyebrow">Read this first</p>
        <h3 class="section-title" id="branches-title">The Shape of the Story</h3>
        <p class="section-lede">The Witcher 2 splits in two after its first chapter and comes back together at Loc Muinne. This diagram shows the structure only, not the order of every event. Select any stage to read it.</p>
      </header>
      <div class="branch" style="height:${H}px">
        <svg class="branch__lines" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">${lines}</svg>
        <span class="branch__route-tag branch__route-tag--iorveth" style="left:23.3%;top:356px" aria-hidden="true">exclusive</span>
        <span class="branch__route-tag branch__route-tag--roche" style="left:76.7%;top:356px" aria-hidden="true">exclusive</span>
        ${btns}
      </div>
      <ul class="branch__key">
        <li><i class="sw sw--shared"></i>Shared by both routes</li>
        <li><i class="sw sw--iorveth"></i>Iorveth route only</li>
        <li><i class="sw sw--roche"></i>Roche route only</li>
        <li><i class="sw sw--choice"></i>Decision</li>
        <li><i class="sw sw--ending"></i>Endings &amp; outcomes</li>
      </ul>
    </section>`;
  }

  function forkBanner() {
    return `<aside class="fork reveal" aria-label="The story forks">
      <p class="eyebrow">The chronicle forks</p>
      <p class="fork__text">What follows are two alternative versions of Chapter II. A single playthrough sees only one of them. Read both, or jump to the one you will play.</p>
      <div class="fork__paths">
        <a class="fork__path fork__path--iorveth" href="#w2-ch2-iorveth"><span>If Geralt sided with</span><strong>Iorveth</strong><em>Vergen, from inside the rebellion</em></a>
        <a class="fork__path fork__path--roche" href="#w2-ch2-roche"><span>If Geralt sided with</span><strong>Roche</strong><em>Henselt's camp, from inside the army</em></a>
      </div>
    </aside>`;
  }

  function compareBlock() {
    const c = D.routeCompare;
    const col = (cls, title, items) => `<div class="compare__col compare__col--${cls}"><h4>${title}</h4><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`;
    return `<aside class="compare reveal" id="w2-compare" aria-labelledby="compare-title">
      <p class="eyebrow">The routes rejoin</p>
      <h3 class="section-title section-title--sm" id="compare-title">What the two Chapter IIs share, and where they differ</h3>
      <div class="compare__grid">
        ${col("iorveth", "Iorveth route only", c.iorveth)}
        ${col("shared", "On both routes", c.shared)}
        ${col("roche", "Roche route only", c.roche)}
      </div>
    </aside>`;
  }

  /* ─────────────── story rendering ─────────────── */

  function renderOptions(ev) {
    if (!ev.options) return "";
    const big = ev.big ? " choice--big" : "";
    return `<div class="choice${big}" role="group" aria-label="${esc(ev.kind === "choice" ? "Possible outcomes" : "Branch in this event")}">
      ${ev.kind !== "choice" ? '<p class="choice__head">A decision within this event</p>' : ""}
      <ul class="choice__options">
        ${ev.options.map((o) => {
          const inner = `<span class="choice__label">${esc(o.label)}</span><span class="choice__result">${esc(o.result)}</span>`;
          return `<li class="choice__option">${o.href ? `<a href="${o.href}">${inner}<span class="choice__go" aria-hidden="true">Read this route →</span></a>` : inner}</li>`;
        }).join("")}
      </ul>
    </div>`;
  }

  function renderPeople(ev) {
    if (!ev.people || !ev.people.length) return "";
    return `<ul class="cast" aria-label="Who is involved">${ev.people.map((id) => {
      const c = charById[id];
      const inner = `${crest(id)}<span class="cast__name">${esc(c ? c.name : personName(id))}</span>`;
      return `<li>${c ? `<a href="#char-${id}" class="cast__item" title="${esc(c.title)}">${inner}</a>` : `<span class="cast__item">${inner}</span>`}</li>`;
    }).join("")}</ul>`;
  }

  function renderEvent(ev, i) {
    const margin = [
      ev.matters ? `<div class="margin__item margin__item--matters"><p class="margin__label">Why it matters</p><p>${esc(ev.matters)}</p></div>` : "",
      ev.next ? `<div class="margin__item margin__item--next"><p class="margin__label">What follows</p><p>${esc(ev.next)}</p></div>` : "",
      ev.note ? `<div class="margin__item margin__item--note"><p class="margin__label">Chronicler's note</p><p>${esc(ev.note)}</p></div>` : ""
    ].join("");
    const figure = ev.figure && FIGURES[ev.figure] ? FIGURES[ev.figure]() : "";
    const wide = ev.figure === "w2-outcomes";
    const hasMore = !!ev.gist || ev.body.length > 1;
    const cls = ["event", "event--" + ev.kind, i === 0 && "event--first", wide && "event--wide", ev.pivotal && "event--pivotal", ev.gist && "has-gist", hasMore && "has-more", "reveal"].filter(Boolean).join(" ");
    const head = `<p class="event__kicker"><span class="badge badge--${ev.kind}">${KIND[ev.kind]}</span><em>${esc(ev.kicker)}</em></p>
        <h4 class="event__title" id="${ev.id}-t">${esc(ev.title)}</h4>`;
    const fallen = ev.fallen ? `<p class="fallen"><span class="fallen__mark" aria-hidden="true">†</span><span class="fallen__label">Fallen</span>${ev.fallen.map(esc).join(" · ")}</p>` : "";
    return `<li class="${cls}" id="${ev.id}">
      <a class="event__marker" href="#${ev.id}" aria-label="Permalink: ${esc(ev.title)}"><span></span></a>
      <article class="event__card" aria-labelledby="${ev.id}-t">
        ${ev.pivotal ? `<div class="scene"><div class="scene__art parallax">${artBlock(ev.art)}</div><div class="scene__cap"><p class="scene__tag">Turning point</p>${head}</div></div>` : head}
        ${fallen}
        <div class="event__grid${margin ? "" : " event__grid--solo"}">
          <div class="event__text">
            ${ev.gist ? `<p class="event__gist">${esc(ev.gist)}</p>` : ""}
            <div class="event__body">${ev.body.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
            ${hasMore ? `<button type="button" class="more-btn" aria-expanded="false"><span class="more-btn__open">Full account</span><span class="more-btn__close">Show less</span></button>` : ""}
            ${figure}
            ${renderOptions(ev)}
            ${renderPeople(ev)}
          </div>
          ${margin ? `<aside class="event__margin">${margin}</aside>` : ""}
        </div>
      </article>
    </li>`;
  }

  function renderChapter(ch, chron) {
    const route = ch.route ? `<p class="route-flag route-flag--${ch.route}">${ch.route === "iorveth" ? "Alternative · Iorveth route only" : "Alternative · Roche route only"}</p>` : "";
    return `<section class="chapter${ch.route ? " chapter--" + ch.route : ""}" id="${ch.id}" aria-labelledby="${ch.id}-title"
        data-toc data-game="${esc("Chronicle " + chron.numeral + " · " + GAME[chron.game])}" data-chapter="${esc(ch.label + " — " + ch.title)}">
      <header class="chapter__head reveal">
        <div class="chapter__art parallax">${artBlock(ch.art)}</div>
        <div class="chapter__cap">
          ${route}
          <p class="chapter__label"><span>${esc(ch.label)}</span></p>
          <h3 class="chapter__title" id="${ch.id}-title">${esc(ch.title)}</h3>
          <p class="chapter__place">${esc(ch.place)}</p>
        </div>
      </header>
      <aside class="previously reveal" aria-label="Previously">
        <p class="previously__label">Previously</p>
        <p>${esc(ch.previously)}</p>
      </aside>
      <ol class="events">${ch.events.map(renderEvent).join("")}</ol>
    </section>`;
  }

  const depthControl = () => `<div class="depth" role="group" aria-label="Reading depth">
      <button type="button" data-depth="short" aria-pressed="true">Essentials</button><button type="button" data-depth="full" aria-pressed="false">Full account</button>
    </div>`;

  function stats(chron) {
    const evs = chron.chapters.flatMap((c) => c.events);
    const items = [
      [chron.chapters.length, "Chapters"],
      [evs.length, "Events"],
      [evs.filter((e) => e.options).length, "Decisions"],
      [evs.reduce((n, e) => n + (e.fallen ? e.fallen.length : 0), 0), "Fallen"]
    ];
    return `<dl class="stats">${items.map(([n, l]) => `<div><dd>${n}</dd><dt>${l}</dt></div>`).join("")}</dl>`;
  }

  function renderChronicle(chron) {
    const strip = chron.chapters.map((ch) =>
      `<li class="strip__item${ch.route ? " strip__item--" + ch.route : ""}"><a href="#${ch.id}"><span class="strip__dot" aria-hidden="true"></span><span class="strip__label">${esc(ch.label)}</span><span class="strip__title">${esc(ch.title)}</span></a></li>`).join("");
    let chapters = "";
    chron.chapters.forEach((ch) => {
      if (ch.id === "w2-ch2-iorveth") chapters += forkBanner();
      chapters += renderChapter(ch, chron);
      if (ch.id === "w2-ch2-roche") chapters += compareBlock();
    });
    return `<section class="chronicle chronicle--${chron.game}" id="${chron.id}" aria-labelledby="${chron.id}-title"
        data-toc data-game="${esc("Chronicle " + chron.numeral + " · " + GAME[chron.game])}" data-chapter="${esc(chron.tagline)}">
      <header class="chronicle__head reveal">
        <p class="eyebrow">Chronicle ${chron.numeral}</p>
        <h2 class="chronicle__title" id="${chron.id}-title"><span class="chronicle__numeral" aria-hidden="true">${chron.numeral}</span>${esc(chron.title)}</h2>
        <p class="chronicle__meta"><em>${esc(chron.year)} · ${esc(chron.tagline)}</em></p>
        <div class="ornament" aria-hidden="true"><span></span><i>◆</i><span></span></div>
        <p class="chronicle__intro">${esc(chron.intro)}</p>
        ${stats(chron)}
        ${chron.game === "w1" ? `<div class="depth-hint"><p>Reading depth</p>${depthControl()}<p class="depth-hint__note"><em>Essentials gives one paragraph per event. Full account adds every detail.</em></p></div>` : ""}
        <nav aria-label="Chapters of ${esc(chron.title)}"><ol class="strip">${strip}</ol></nav>
      </header>
      ${chron.game === "w1" ? mapFigure() : ""}
      ${chron.branchMap ? branchFigure() : ""}
      ${chapters}
    </section>`;
  }

  /* ─────────────── index & afterword ─────────────── */

  function renderCharacters() {
    const filters = D.factionFilters.map((f) => `<button type="button" class="chip" data-affil="${f.id}" aria-pressed="false">${esc(f.label)}</button>`).join("");
    const cards = D.characters.map((c) => `<article class="char reveal" id="char-${c.id}" data-games="${c.games.join(" ")}" data-affil="${c.affiliation.join(" ")}">
        <header class="char__head">
          ${c.img ? `<img class="crest crest--img" src="${esc(c.img)}" alt="${esc(c.name)}" loading="lazy">` : crest(c.id)}
          <div>
          <h3 class="char__name">${esc(c.name)}</h3>
          <p class="char__title"><em>${esc(c.title)}</em></p>
          <p class="char__tags">${c.games.map((g) => `<span class="tag tag--${g}">${g === "w1" ? "W1" : "W2"}</span>`).join("")}${c.affiliation.map((a) => `<span class="tag">${esc(AFFIL[a] || a)}</span>`).join("")}</p>
          </div>
        </header>
        <p class="char__role">${esc(c.role)}</p>
        <dl class="char__fate">
          <div><dt>End of The Witcher</dt><dd>${esc(c.endW1)}</dd></div>
          <div><dt>End of The Witcher 2</dt><dd>${esc(c.endW2)}</dd></div>
        </dl>
        <details class="char__more"><summary>Relationships &amp; key events</summary>
          <dl><dt>Relationships</dt><dd>${esc(c.relations)}</dd><dt>Key events</dt><dd>${esc(c.events)}</dd></dl>
        </details>
      </article>`).join("");
    return `<section class="index-section" id="characters" aria-labelledby="characters-title" data-toc data-game="Index" data-chapter="Characters">
      <header class="section-head reveal">
        <p class="eyebrow">Dramatis personae</p>
        <h2 class="section-title" id="characters-title">The Characters</h2>
        <p class="section-lede">The people who matter across both games, and where each one stands when the story ends.</p>
      </header>
      <div class="filters reveal" role="group" aria-label="Filter characters">
        <div class="filters__row" role="group" aria-label="By game">
          <span class="filters__label">Game</span>
          <button type="button" class="chip" data-game="all" aria-pressed="true">Both</button>
          <button type="button" class="chip" data-game="w1" aria-pressed="false">The Witcher</button>
          <button type="button" class="chip" data-game="w2" aria-pressed="false">The Witcher 2</button>
        </div>
        <div class="filters__row" role="group" aria-label="By affiliation">
          <span class="filters__label">Affiliation</span>
          <button type="button" class="chip" data-affil="all" aria-pressed="true">All</button>
          ${filters}
        </div>
        <p class="filters__count" id="char-count" aria-live="polite"></p>
      </div>
      <div class="chars">${cards}</div>
    </section>`;
  }

  function renderItems() {
    const list = D.items || [];
    const tabs = list.map((i, n) => `<button type="button" class="kit__tab" role="tab" data-i="${n}" aria-selected="${n === 0}">
        <span class="kit__tabname">${esc(i.name)}</span><span class="kit__tabsub">${esc(i.title)}</span></button>`).join("");
    const stages = list.map((i, n) => `<div class="kit__panel" role="tabpanel" data-i="${n}"${n ? " hidden" : ""}>
        <div class="kit__stage"><div class="kit__card"><img src="${esc(i.img)}" alt="${esc(i.name)}" loading="lazy"><span class="kit__glare"></span></div></div>
        <h3 class="char__name">${esc(i.name)}</h3>
        <p class="char__title"><em>${esc(i.title)}</em></p>
        <p class="char__role">${esc(i.text)}</p>
      </div>`).join("");
    return `<section class="index-section" id="arms" aria-labelledby="arms-title" data-toc data-game="Index" data-chapter="Gear">
      <header class="section-head reveal">
        <p class="eyebrow">Geralt's companions &amp; kit</p>
        <h2 class="section-title" id="arms-title">On the Path</h2>
        <p class="section-lede">Two swords, a medallion and a horse. Pick one, then move over it to turn it.</p>
      </header>
      <div class="kit reveal"><div class="kit__tabs" role="tablist" aria-label="Geralt's kit">${tabs}</div><div class="kit__view">${stages}</div></div>
    </section>`;
  }

  // Tabs plus a pointer-driven 3D tilt on the active card.
  function initKit() {
    const kit = $(".kit");
    if (!kit) return;
    const pick = (n) => {
      $$(".kit__tab", kit).forEach((t) => t.setAttribute("aria-selected", String(t.dataset.i === String(n))));
      $$(".kit__panel", kit).forEach((p) => (p.hidden = p.dataset.i !== String(n)));
    };
    kit.addEventListener("click", (e) => { const t = e.target.closest(".kit__tab"); if (t) pick(t.dataset.i); });
    if (reduceMotion.matches) return;
    kit.addEventListener("pointermove", (e) => {
      const st = e.target.closest(".kit__stage");
      if (!st) return;
      const r = st.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      const c = $(".kit__card", st);
      c.style.transform = `rotateY(${(x - 0.5) * 28}deg) rotateX(${(0.5 - y) * 20}deg) scale(1.03)`;
      c.style.setProperty("--gx", x * 100 + "%"); c.style.setProperty("--gy", y * 100 + "%");
    });
    kit.addEventListener("pointerout", (e) => {
      const st = e.target.closest(".kit__stage");
      if (st && !st.contains(e.relatedTarget)) $(".kit__card", st).style.transform = "";
    });
  }

  function renderFactions() {
    return `<section class="index-section" id="factions" aria-labelledby="factions-title" data-toc data-game="Index" data-chapter="Factions">
      <header class="section-head reveal">
        <p class="eyebrow">Banners of the North</p>
        <h2 class="section-title" id="factions-title">The Factions</h2>
        <p class="section-lede">What each power wants, and whom it stands against.</p>
      </header>
      <div class="factions">
        ${D.factions.map((f) => `<article class="faction reveal" id="${f.id}">
          ${seal(f.seal)}
          <div>
            <h3 class="faction__name">${esc(f.name)}</h3>
            <p class="char__tags">${f.games.map((g) => `<span class="tag tag--${g}">${GAME[g]}</span>`).join("")}</p>
            <p><strong class="faction__k">Aims</strong>${esc(f.goal)}</p>
            <p><strong class="faction__k">Relations</strong>${esc(f.relations)}</p>
          </div>
        </article>`).join("")}
      </div>
    </section>`;
  }

  function renderAftermath() {
    const A = D.aftermath;
    return `<section class="afterword" id="world" aria-labelledby="world-title" data-toc data-game="Afterword" data-chapter="The World Geralt Leaves Behind">
      <header class="section-head reveal">
        <p class="eyebrow">Afterword</p>
        <h2 class="section-title" id="world-title">The World Geralt Leaves Behind</h2>
        <p class="section-lede">Where things stand as The Witcher 2 ends. Some of this is true in every playthrough; some of it depends on what you chose.</p>
      </header>
      <div class="afterword__grid">
        <div class="afterword__col reveal">
          <h3 class="col-title"><span class="sw sw--main"></span>Fixed: true in every playthrough</h3>
          <ol class="facts">${A.fixed.map((f) => `<li><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></li>`).join("")}</ol>
        </div>
        <div class="afterword__col reveal">
          <h3 class="col-title"><span class="sw sw--choice"></span>Variable: depends on your choices</h3>
          <dl class="vars">${A.variable.map((v) => `<div><dt>${esc(v.title)}</dt><dd>${esc(v.text)}</dd></div>`).join("")}</dl>
          <p class="imports"><strong>Carrying choices forward.</strong> ${esc(A.imports)}</p>
        </div>
      </div>
    </section>
    <section class="before" id="before" aria-labelledby="before-title" data-toc data-game="Afterword" data-chapter="Before You Begin the Wild Hunt">
      <header class="section-head reveal">
        <svg class="before__medallion" viewBox="0 0 200 200" aria-hidden="true"><use href="#medallion"/></svg>
        <p class="eyebrow">No spoilers for The Witcher 3</p>
        <h2 class="section-title" id="before-title">Before You Begin the Wild Hunt</h2>
      </header>
      <ol class="tips">${A.tips.map((t, i) => `<li class="reveal"><span class="tips__n" aria-hidden="true">${["I", "II", "III", "IV", "V", "VI", "VII"][i]}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div></li>`).join("")}</ol>
      <p class="before__close"><a class="btn-begin" href="#top">Return to the first page</a></p>
    </section>`;
  }

  /* ─────────────── table of contents ─────────────── */

  function renderTOC() {
    const items = [];
    D.chronicles.forEach((chron) => {
      const subs = [];
      if (chron.game === "w1") subs.push({ href: "#continent", label: "Map", title: "The Lay of the Land" });
      if (chron.branchMap) subs.push({ href: "#branches", label: "Diagram", title: "The Shape of the Story" });
      chron.chapters.forEach((ch) => subs.push({ href: "#" + ch.id, label: ch.label.replace(/ · .*/, ""), title: ch.title.replace(/^The (Iorveth|Roche) Route: /, ""), route: ch.route }));
      items.push(`<li class="toc__group toc__group--${chron.game}">
        <a href="#${chron.id}" class="toc__chron"><span class="toc__num">${chron.numeral}</span><span>${esc(chron.title)}<em>${chron.year}</em></span></a>
        <ol>${subs.map((s) => `<li><a href="${s.href}"${s.route ? ` class="toc__route toc__route--${s.route}"` : ""}><span class="toc__lbl">${esc(s.label)}${s.route ? ` · ${s.route === "iorveth" ? "Iorveth" : "Roche"}` : ""}</span>${esc(s.title)}</a></li>`).join("")}</ol>
      </li>`);
    });
    items.push(`<li class="toc__group"><a href="#characters" class="toc__chron"><span class="toc__num">✦</span><span>Index</span></a>
      <ol><li><a href="#characters">Characters</a></li><li><a href="#arms">On the Path</a></li><li><a href="#factions">Factions</a></li></ol></li>`);
    items.push(`<li class="toc__group"><a href="#world" class="toc__chron"><span class="toc__num">✦</span><span>Afterword</span></a>
      <ol><li><a href="#world">The World Geralt Leaves Behind</a></li><li><a href="#before">Before You Begin the Wild Hunt</a></li></ol></li>`);
    $("#toc-list").innerHTML = items.join("");
    $("#toc-list").insertAdjacentHTML("beforebegin", `<div class="toc__depth"><p class="toc__title">Reading depth</p>${depthControl()}</div>`);
  }

  /* ─────────────── mount ─────────────── */

  root.innerHTML = D.chronicles.map(renderChronicle).join("") + renderCharacters() + renderItems() + renderFactions() + renderAftermath();
  renderTOC();
  initKit();
  $(".hero").insertAdjacentHTML("beforeend", particles("embers", 22));

  /* ─────────────── reading depth ─────────────── */

  function setDepth(d, save) {
    document.body.classList.toggle("mode-short", d === "short");
    $$("button[data-depth]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.depth === d)));
    if (save) try { localStorage.setItem("chronicle-depth", d); } catch (e) { /* storage unavailable */ }
    requestAnimationFrame(() => { measure(); lastActive = undefined; onScroll(); });
  }
  let savedDepth = "short";
  try { savedDepth = localStorage.getItem("chronicle-depth") || "short"; } catch (e) { /* storage unavailable */ }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-depth]");
    if (b) {
      // Keep the reader's place: re-anchor to the element under the button after the layout changes.
      const top = b.getBoundingClientRect().top;
      setDepth(b.dataset.depth, true);
      window.scrollBy(0, b.getBoundingClientRect().top - top);
      return;
    }
    const m = e.target.closest(".more-btn");
    if (m) {
      const ev = m.closest(".event");
      const open = ev.classList.toggle("is-open");
      m.setAttribute("aria-expanded", String(open));
      measure();
    }
  });

  /* ─────────────── navigation state ─────────────── */

  const progressEl = $(".progress");
  const progressBar = $(".progress__bar");
  const whereGame = $(".topbar__game");
  const whereChapter = $(".topbar__chapter");
  const toTop = $("#to-top");
  const topbar = $("#topbar");
  const tocLinks = $$("#toc a");
  let targets = [];

  function collectTargets() {
    targets = $$("[data-toc]").map((el) => ({ el, id: el.id, top: 0 }));
    measure();
  }
  function measure() {
    const y = window.scrollY;
    targets.forEach((t) => (t.top = t.el.getBoundingClientRect().top + y));
    targets.sort((a, b) => a.top - b.top);
  }

  let lastActive = null;
  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight - vh;
    const start = $("#chronicle-1").offsetTop - vh * 0.5;
    const pct = Math.max(0, Math.min(100, ((y - start) / (docH - start)) * 100));
    progressBar.style.transform = `scaleX(${pct / 100})`;
    progressEl.setAttribute("aria-valuenow", String(Math.round(pct)));

    const heroH = $("#top").offsetHeight;
    topbar.classList.toggle("is-solid", y > heroH - 80);
    toTop.hidden = y < vh * 1.2;

    // Active section: the last one whose top has passed 30% of the viewport.
    let active = null;
    for (const t of targets) if (t.top <= y + vh * 0.3) active = t;
    if (y < heroH * 0.6) active = null;
    if (active === lastActive) return;
    lastActive = active;

    // Prefer the innermost chapter for the label; chronicles carry their own game label.
    const el = active && active.el;
    const gameEl = el && (el.dataset.game ? el : el.closest("[data-game]"));
    const g = gameEl ? gameEl.dataset.game : "";
    whereGame.innerHTML = g ? `<span class="where-long">${esc(g)}</span><span class="where-short">${esc(g.replace(/^.*· /, ""))}</span>` : "";
    whereChapter.textContent = el ? el.dataset.chapter || "" : "";
    document.body.classList.toggle("in-w2", !!(el && el.closest(".chronicle--w2")));

    tocLinks.forEach((a) => a.removeAttribute("aria-current"));
    if (el) {
      const match = tocLinks.filter((a) => a.getAttribute("href") === "#" + el.id);
      match.forEach((a) => a.setAttribute("aria-current", "location"));
      const parentChron = el.closest(".chronicle");
      if (parentChron && parentChron !== el) tocLinks.filter((a) => a.getAttribute("href") === "#" + parentChron.id).forEach((a) => a.setAttribute("aria-current", "true"));
      // Keep the active item visible inside a long sidebar.
      const cur = match[match.length - 1];
      const toc = $("#toc");
      if (cur && toc.scrollHeight > toc.clientHeight && !document.body.classList.contains("nav-open")) {
        const r = cur.getBoundingClientRect(), tr = toc.getBoundingClientRect();
        if (r.top < tr.top + 40 || r.bottom > tr.bottom - 40) toc.scrollTop += r.top - tr.top - tr.height / 2;
      }
    }
  }

  const parallax = $$(".parallax");
  function onParallax() {
    if (reduceMotion.matches) return;
    const vh = window.innerHeight;
    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 around viewport centre
      el.style.setProperty("--p", p.toFixed(3));
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); onParallax(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener("resize", () => { measure(); lastActive = undefined; onScroll(); });
  window.addEventListener("load", () => { measure(); onScroll(); });

  /* ─────────────── internal links ─────────────── */

  function goTo(hash, { focus = true } = {}) {
    const id = decodeURIComponent(hash.slice(1));
    const target = id === "top" ? $("#top") : document.getElementById(id);
    if (!target) return false;
    if (target.matches(".char")) {
      const d = $("details", target);
      if (d) d.open = true;
      // Make sure filters are not hiding the card.
      if (target.hidden) resetCharFilters();
    }
    target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    if (focus) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
    target.classList.remove("is-flash");
    void target.offsetWidth;
    target.classList.add("is-flash");
    return true;
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const hash = a.getAttribute("href");
    if (hash.length < 2) return;
    if (goTo(hash)) {
      e.preventDefault();
      history.pushState(null, "", hash === "#top" ? location.pathname + location.search : hash);
      closeNav();
    }
  });
  window.addEventListener("popstate", () => { if (location.hash) goTo(location.hash, { focus: false }); });
  if (location.hash) requestAnimationFrame(() => goTo(location.hash, { focus: false }));

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
    $("#top .hero__title").setAttribute("tabindex", "-1");
    $("#top .hero__title").focus({ preventScroll: true });
    history.pushState(null, "", location.pathname + location.search);
  });

  /* ─────────────── mobile contents drawer ─────────────── */

  const navToggle = $("#nav-toggle");
  const scrim = $("#scrim");
  function openNav() {
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    scrim.hidden = false;
    const cur = $('#toc a[aria-current="location"]') || $("#toc a");
    cur && cur.focus();
  }
  function closeNav() {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    scrim.hidden = true;
  }
  navToggle.addEventListener("click", () => (document.body.classList.contains("nav-open") ? closeNav() : openNav()));
  $("#nav-close").addEventListener("click", () => { closeNav(); navToggle.focus(); });
  scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) { closeNav(); navToggle.focus(); }
  });

  /* ─────────────── character filters ─────────────── */

  const charState = { game: "all", affil: "all" };
  const matchFor = Object.fromEntries(D.factionFilters.map((f) => [f.id, f.match]));
  function applyCharFilters() {
    let n = 0;
    $$(".char").forEach((card) => {
      const games = card.dataset.games.split(" ");
      const affils = card.dataset.affil.split(" ");
      const okGame = charState.game === "all" || games.includes(charState.game);
      const okAffil = charState.affil === "all" || matchFor[charState.affil].some((m) => affils.includes(m));
      card.hidden = !(okGame && okAffil);
      if (!card.hidden) n++;
    });
    $("#char-count").textContent = n === D.characters.length ? `Showing all ${n} characters` : `Showing ${n} of ${D.characters.length} characters`;
    $$(".filters [data-game]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.game === charState.game)));
    $$(".filters [data-affil]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.affil === charState.affil)));
    measure();
  }
  function resetCharFilters() { charState.game = "all"; charState.affil = "all"; applyCharFilters(); }
  $(".filters").addEventListener("click", (e) => {
    const b = e.target.closest("button.chip");
    if (!b) return;
    if (b.dataset.game) charState.game = b.dataset.game;
    if (b.dataset.affil) charState.affil = b.dataset.affil;
    applyCharFilters();
  });
  applyCharFilters();

  /* ─────────────── search ─────────────── */

  const index = [];
  D.chronicles.forEach((chron) => chron.chapters.forEach((ch) => {
    index.push({ title: ch.title, ctx: `${GAME[chron.game]} · ${ch.label}`, text: ch.place + " " + ch.previously, href: "#" + ch.id, kind: ch.route || "main" });
    ch.events.forEach((ev) => index.push({
      title: ev.title,
      ctx: `${GAME[chron.game]} · ${ch.label}`,
      text: [ev.kicker, ...ev.body, ev.matters, ev.next, ev.note, ...(ev.options || []).map((o) => o.label + " " + o.result), ...(ev.people || []).map(personName)].filter(Boolean).join(" "),
      href: "#" + ev.id,
      kind: ev.kind
    }));
  }));
  D.characters.forEach((c) => index.push({ title: c.name, ctx: `Character · ${c.title}`, text: [c.role, c.relations, c.events, c.endW1, c.endW2].join(" "), href: "#char-" + c.id, kind: "character" }));
  D.factions.forEach((f) => index.push({ title: f.name, ctx: "Faction", text: f.goal + " " + f.relations, href: "#" + f.id, kind: "faction" }));
  D.places.forEach((p) => index.push({ title: p.name, ctx: `Place · ${p.note}`, text: p.note, href: p.href, kind: "place" }));
  index.forEach((e) => { e.hay = fold(e.title + " " + e.text); e.t = fold(e.title); });

  const dlg = $("#search");
  const input = $("#search-input");
  const results = $("#search-results");
  const status = $("#search-status");
  const hasDialog = typeof dlg.showModal === "function";

  function openSearch() {
    if (hasDialog) dlg.showModal(); else dlg.setAttribute("open", "");
    input.select();
    runSearch();
  }
  function closeSearch() { if (hasDialog) dlg.close(); else dlg.removeAttribute("open"); }

  function snippet(text, terms) {
    const f = fold(text);
    let at = f.indexOf(terms[0]);
    if (at < 0) return esc(text.slice(0, 140)) + (text.length > 140 ? "…" : "");
    const start = Math.max(0, at - 50);
    let s = (start > 0 ? "…" : "") + text.slice(start, start + 160) + (start + 160 < text.length ? "…" : "");
    return highlight(s, terms);
  }
  function highlight(s, terms) {
    let out = esc(s);
    terms.forEach((t) => {
      if (t.length < 2) return;
      const re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }

  function runSearch() {
    const q = fold(input.value.trim());
    if (!q) {
      results.innerHTML = ["Letho", "Saskia", "Salamandra", "Loc Muinne", "Alvin", "Iorveth"].map((s) => `<li><button type="button" class="search__suggest">${s}</button></li>`).join("");
      status.textContent = "Try a name, place or event.";
      return;
    }
    const terms = q.split(/\s+/).filter(Boolean);
    const hits = index
      .filter((e) => terms.every((t) => e.hay.includes(t)))
      .map((e) => ({ e, score: terms.reduce((s, t) => s + (e.t.includes(t) ? 10 : 0) + (e.t.startsWith(t) ? 5 : 0), 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
    status.textContent = hits.length ? `${hits.length} result${hits.length === 1 ? "" : "s"}` : "Nothing in the chronicle matches that.";
    results.innerHTML = hits.map(({ e }) => `<li><a href="${e.href}" class="search__hit search__hit--${e.kind}">
        <span class="search__ctx">${esc(e.ctx)}</span>
        <span class="search__title">${highlight(e.title, terms)}</span>
        <span class="search__snip">${snippet(e.text, terms)}</span></a></li>`).join("");
  }

  input.addEventListener("input", runSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); const f = $("a, button", results); f && f.focus(); }
    if (e.key === "Enter") { const f = $("a", results); if (f) { e.preventDefault(); f.click(); } }
  });
  results.addEventListener("keydown", (e) => {
    const items = $$("a, button", results);
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown" && i < items.length - 1) { e.preventDefault(); items[i + 1].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); (i > 0 ? items[i - 1] : input).focus(); }
  });
  results.addEventListener("click", (e) => {
    const sug = e.target.closest(".search__suggest");
    if (sug) { input.value = sug.textContent; runSearch(); input.focus(); return; }
    if (e.target.closest("a")) closeSearch(); // the document click handler performs navigation
  }, true);
  $("#search-open").addEventListener("click", openSearch);
  $("#search-close").addEventListener("click", closeSearch);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeSearch(); });
  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(document.activeElement.tagName);
    if (e.key === "/" && !typing && !dlg.open) { e.preventDefault(); openSearch(); }
    if (e.key === "Escape" && !hasDialog && dlg.hasAttribute("open")) closeSearch();
  });

  /* ─────────────── reveal animations ─────────────── */

  const reveals = $$(".reveal");
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  }

  collectTargets();
  setDepth(savedDepth === "full" ? "full" : "short", false);
  onScroll();
  onParallax();
  // Fonts can shift layout; re-measure once they settle.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); onScroll(); });
})();
