const CODE = "202008091145404250";
const HOME = `https://vimla.se/?${CODE}`;
const plans = [
  {data:1, gb:10,  was:5,   now:"10 kr/mån", then:"därefter 110 kr/mån"},
  {data:2, gb:20,  was:10,  now:"10 kr/mån", then:"därefter 160 kr/mån"},
  {data:3, gb:30,  was:15,  now:"10 kr/mån", then:"därefter 200 kr/mån"},
  {data:4, gb:50,  was:25,  now:"10 kr/mån", then:"därefter 250 kr/mån"},
  {data:5, gb:200, was:100, now:"10 kr/mån", then:"därefter 360 kr/mån"}
];
const regular = {1:[120,110], 2:[170,160], 3:[210,200], 4:[260,250], 5:[370,360]};
const $ = id => document.getElementById(id);

document.querySelectorAll("[data-reflink]").forEach(e => e.textContent = HOME);
document.querySelectorAll("[data-home]").forEach(e => e.href = HOME);

if ($("plans")) {
  for (const p of plans) {
    const a = document.createElement("div");
    a.className = "plan";
    a.innerHTML = `<div class="gb">${p.gb} GB</div><div class="old"><del>${p.was} GB</del></div><div class="price">${p.now}</div><div class="then">i 3 månader, ${p.then}</div><a class="btn" aria-label="Välj ${p.gb} GB">Välj</a>`;
    a.querySelector("a").href = `https://vimla.se/bestall/valj/nummer?${CODE}&data=${p.data}`;
    $("plans").appendChild(a);
  }
}

if ($("tabs")) {
  const showExample = p => {
    $("oWas").textContent = p.was + " GB";
    $("oNow").textContent = p.gb + " GB";
    $("oOld").textContent = regular[p.data][0] + " kr/mån";
    $("oAfter").textContent = regular[p.data][1] + " kr/mån";
    document.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.d == p.data)));
  };
  for (const p of plans) {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.d = p.data; b.textContent = p.gb + " GB";
    b.addEventListener("click", () => showExample(p));
    $("tabs").appendChild(b);
  }
  showExample(plans[0]);
}

document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(HOME); btn.textContent = "Kopierad!"; }
    catch { btn.textContent = "Markera och kopiera"; }
    setTimeout(() => btn.textContent = "Kopiera länk", 2000);
  });
});

// Alla länkar med tipskoden är affiliate-länkar
document.querySelectorAll(`a[href*="${CODE}"]`).forEach(a => a.rel = "sponsored nofollow noopener");
