/* Shared helpers + navigation/footer */
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function toast(t){const d=document.createElement("div");d.className="toast";d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}
function tile(z){
  return `<div class="card subj" style="--h:${z.hue}"><a class="go" href="play.html?id=${encodeURIComponent(z.id)}"><div class="ico">${z.icon}</div><b>${esc(z.title)}</b><span>${z.questions.length} question${z.questions.length>1?"s":""}</span><em class="tag">${esc(z.category)}</em></a></div>`;
}
(function(){
  const pages=[["index.html","Home"],["quizzes.html","Quizzes"],["create.html","Create"],["manage.html","My quizzes"],["history.html","History"],["about.html","About"]];
  const cur=location.pathname.split("/").pop()||"index.html";
  $("nav").outerHTML=`<nav><div class="nav-in"><a class="brand" href="index.html"><i>✓</i>Pop Quiz</a><div class="links">${pages.map(([h,t])=>`<a class="l${h===cur?" on":""}" href="${h}">${t}</a>`).join("")}</div></div></nav>`;
  $("foot").outerHTML=`<footer><div class="foot"><a class="brand" href="index.html"><i>✓</i>Pop Quiz</a><span>Made for students. Your quizzes are saved in this browser.</span></div></footer>`;
})();
