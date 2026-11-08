// Selected Sahifa lessons. Explanations are original child-friendly paraphrases;
// Arabic excerpts and chapter references are checked against the cited Shia text.
const sahifaDuas = [
  {
    id:"dua1", number:1, title:"Praise of Allah", short:"Begin by knowing and thanking Allah",
    icon:"✨", tags:["aqaid","akhlaq"], focus:"Tawhid · Allah’s greatness · gratitude",
    arabic:"الْحَمْدُ لِلَّهِ الْأَوَّلِ بِلَا أَوَّلٍ كَانَ قَبْلَهُ، وَالْآخِرِ بِلَا آخِرٍ يَكُونُ بَعْدَهُ",
    meaning:"Imam Zayn al-Abidin begins by praising Allah, who has no beginning before Him and no end after Him. Everything depends on Him; He does not depend on anything.",
    connections:[
      {type:"aqaid",title:"Aqa’id · What we believe",body:"Allah is not created and does not have a beginning or an ending. This is part of learning Tawhid: Allah is One and unlike His creation.",refs:[["Qur’an 57:3","https://quran.com/57/3"]]},
      {type:"akhlaq",title:"Akhlaq · How we live",body:"Start by noticing blessings and thanking the One who gave them. Gratitude should make us more generous and less boastful.",refs:[["Qur’an 14:7","https://quran.com/14/7"]]}
    ],
    activity:"Name one blessing you often forget to thank Allah for. Say Alhamdulillah, then use that blessing in a good way.",
    source:"https://al-islam.org/book/export/html/18815#"
  },
  {
    id:"dua20", number:20, title:"Noble Moral Traits", short:"Ask Allah to help you grow in good character",
    icon:"💛", tags:["aqaid","akhlaq","ahkam"], focus:"Faith · intention · good actions",
    arabic:"وَبَلِّغْ بِإِيمَانِي أَكْمَلَ الْإِيمَانِ، وَاجْعَلْ يَقِينِي أَفْضَلَ الْيَقِينِ",
    meaning:"The Imam asks Allah to help his faith become stronger, his certainty clearer, his intentions better, and his actions more beautiful.",
    connections:[
      {type:"aqaid",title:"Aqa’id · Faith and certainty",body:"Faith is not only saying that we believe. We learn who Allah is, understand why we believe, and ask Him to strengthen our certainty.",refs:[["Qur’an 49:15","https://quran.com/49/15"]]},
      {type:"akhlaq",title:"Akhlaq · Intention and character",body:"Good actions begin with good intentions. The dua asks us to improve both what is inside our hearts and what people see in our behaviour.",refs:[["Qur’an 91:9–10","https://quran.com/91/9-10"],["Qur’an 3:134","https://quran.com/3/134"]]},
      {type:"ahkam",title:"Ahkam · Acting on what Allah teaches",body:"The supplication asks for good works and a life pleasing to Allah. It encourages us to learn Allah’s commands and avoid what He has forbidden; it does not replace a fiqh ruling.",refs:[["Qur’an 2:201","https://quran.com/2/201"]]}
    ],
    activity:"Choose one good quality—honesty, patience, or generosity. Make one small plan to practise it today.",
    source:"https://al-islam.org/book/export/html/18815"
  },
  {
    id:"dua24", number:24, title:"For One’s Parents", short:"Speak gently and recognise the care of parents",
    icon:"🏡", tags:["akhlaq","ahkam"], focus:"Parents’ rights · kindness · respectful speech",
    arabic:"اللَّهُمَّ خَفِّضْ لَهُمَا صَوْتِي، وَأَطِبْ لَهُمَا كَلَامِي، وَأَلِنْ لَهُمَا عَرِيكَتِي",
    meaning:"The Imam asks Allah to help him lower his voice, speak pleasantly, soften his manner, and keep a caring heart toward his parents.",
    connections:[
      {type:"akhlaq",title:"Akhlaq · Respect in everyday life",body:"Respect is shown in our tone, words, patience, and helpful actions—not only in saying that we love our parents.",refs:[["Qur’an 17:23–24","https://quran.com/17/23-24"]]},
      {type:"ahkam",title:"Ahkam · Rights and limits",body:"The Qur’an commands kindness to parents. It also teaches that if parents call someone to disobey Allah, that command is not followed—but they must still be treated with kindness. This is a learning introduction, not a complete legal ruling.",refs:[["Qur’an 31:14–15","https://quran.com/31/14-15"]]}
    ],
    activity:"Today, practise one gentle answer, one helpful action, and one sincere thank-you for a parent or caregiver.",
    source:"https://al-islam.org/sahifa-al-kamilah-al-sajjadiyya-imam-ali-zayn-al-abidin/24-his-supplication-his-parents-upon-two"
  },
  {
    id:"dua25", number:25, title:"For One’s Children", short:"Pray for children’s faith, health, and character",
    icon:"🌱", tags:["aqaid","akhlaq","ahkam"], focus:"Guidance · family responsibility · good upbringing",
    arabic:"وَأَصِحَّ لِي أَبْدَانَهُمْ وَأَدْيَانَهُمْ وَأَخْلَاقَهُمْ",
    meaning:"The Imam asks Allah to care for children’s bodies, faith, and character. The prayer reminds families to seek goodness for children in every part of life.",
    connections:[
      {type:"aqaid",title:"Aqa’id · We depend on Allah",body:"Parents can teach, protect, and encourage, but they also ask Allah for help. Guidance and strength are blessings for which we should be grateful.",refs:[["Qur’an 1:5","https://quran.com/1/5"]]},
      {type:"akhlaq",title:"Akhlaq · Growing together",body:"A good upbringing includes care, teaching, patience, and being a good example. Children learn from what adults do as well as what they say.",refs:[["Qur’an 31:13–19","https://quran.com/31/13-19"]]},
      {type:"ahkam",title:"Ahkam · A family’s responsibilities",body:"The Qur’an tells believers to protect themselves and their families from the Fire. This is a reminder to learn and practise faith responsibly; detailed duties should be studied from reliable Shia fiqh sources.",refs:[["Qur’an 66:6","https://quran.com/66/6"]]}
    ],
    activity:"Ask an adult to help you choose one thing to learn together this week: a short surah, a prayer, or a good habit.",
    source:"https://al-islam.org/sahifa-al-kamilah-al-sajjadiyya-imam-ali-zayn-al-abidin/25-his-supplication-his-children"
  }
];

let activeSahifaFilter="all";
let activeSahifaDua="dua20";
const sahifaList=document.getElementById("sahifaDuaList");
const sahifaDetail=document.getElementById("sahifaDetail");
const sahifaFilters=document.getElementById("sahifaFilters");

function renderSahifaList(){
  if(!sahifaList)return;
  const visible=sahifaDuas.filter(dua=>activeSahifaFilter==="all"||dua.tags.includes(activeSahifaFilter));
  sahifaList.innerHTML=visible.map(dua=>`<button class="sahifa-dua-choice ${dua.id===activeSahifaDua?"active":""}" type="button" data-dua-id="${dua.id}" aria-pressed="${dua.id===activeSahifaDua}">
    <span class="sahifa-dua-icon">${dua.icon}</span><span class="sahifa-dua-copy"><small>DUA ${String(dua.number).padStart(2,"0")}</small><b>${dua.title}</b><span>${dua.short}</span></span><span class="sahifa-dua-arrow">›</span>
  </button>`).join("");
}
function renderSahifaDetail(){
  if(!sahifaDetail)return;
  const dua=sahifaDuas.find(item=>item.id===activeSahifaDua)||sahifaDuas[0];
  const connectionHtml=dua.connections.filter(item=>activeSahifaFilter==="all"||item.type===activeSahifaFilter).map(item=>`<section class="sahifa-connection sahifa-${item.type}"><span class="sahifa-connection-label">${item.type.toUpperCase()}</span><h3>${item.title}</h3><p>${item.body}</p><div class="sahifa-refs">${item.refs.map(ref=>`<a href="${ref[1]}" target="_blank" rel="noopener">${ref[0]}</a>`).join("")}</div></section>`).join("");
  sahifaDetail.innerHTML=`<div class="sahifa-detail-top"><span class="tag tag-green">DUA ${String(dua.number).padStart(2,"0")}</span><span class="sahifa-focus">${dua.focus}</span></div>
    <h2>${dua.icon} ${dua.title}</h2>
    <div class="sahifa-arabic" lang="ar" dir="rtl">${dua.arabic}</div>
    <div class="sahifa-meaning"><b>In simple words</b><p>${dua.meaning}</p></div>
    <h3 class="sahifa-learn-heading">What can we learn?</h3>
    <div class="sahifa-connections">${connectionHtml}</div>
    <div class="sahifa-activity"><span>🌟 TRY IT TODAY</span><p>${dua.activity}</p></div>
    <a class="sahifa-source-link" href="${dua.source}" target="_blank" rel="noopener">Read the source text at Al-Islam.org ↗</a>
    <p class="sahifa-translation-note">The Arabic shown is a short excerpt. The English explanation above is an original learning summary, not a verbatim translation.</p>`;
}
if(sahifaList&&sahifaDetail&&sahifaFilters){
  renderSahifaList();renderSahifaDetail();
  sahifaList.addEventListener("click",event=>{
    const button=event.target.closest("[data-dua-id]");
    if(!button)return;
    activeSahifaDua=button.dataset.duaId;renderSahifaList();renderSahifaDetail();
  });
  sahifaFilters.addEventListener("click",event=>{
    const button=event.target.closest("[data-filter]");
    if(!button)return;
    activeSahifaFilter=button.dataset.filter;
    sahifaFilters.querySelectorAll("[data-filter]").forEach(item=>{
      const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));
    });
    const current=sahifaDuas.find(item=>item.id===activeSahifaDua);
    if(activeSahifaFilter!=="all"&&!current.tags.includes(activeSahifaFilter)){
      activeSahifaDua=sahifaDuas.find(item=>item.tags.includes(activeSahifaFilter)).id;
    }
    renderSahifaList();renderSahifaDetail();
  });
}
