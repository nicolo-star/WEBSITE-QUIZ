/* Data layer: all CRUD goes through here. Data lives in the browser's localStorage. */
const CATS={Science:["🔬","#bdeedd"],Math:["📐","#d4f2a8"],History:["🏛️","#c9ecc0"],Geography:["🌍","#b8ebe0"],Language:["📖","#e2f5a6"],Other:["✏️","#c9ecc0"]};
const Store=(()=>{
  const g=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
  const s=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
  const mine=()=>g("pq.quizzes",[]);
  const all=()=>SEED.concat(mine());
  const clean=x=>{
    if(!x||typeof x.title!=="string"||!x.title.trim()||!Array.isArray(x.questions)||!x.questions.length)return null;
    const qs=x.questions.map(q=>({text:String(q.text||"").trim(),options:(q.options||[]).map(o=>String(o).trim()),answer:q.answer,explanation:String(q.explanation||"").trim()}))
      .filter(q=>q.text&&q.options.length===4&&q.options.every(Boolean)&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
    return qs.length?{title:x.title.trim().slice(0,40),category:CATS[x.category]?x.category:"Other",questions:qs.slice(0,50)}:null;
  };
  const S={
    all,mine,clean,find:id=>all().find(q=>q.id===id),
    save(q){
      const l=mine(),i=l.findIndex(x=>x.id===q.id),c=CATS[q.category]||CATS.Other;
      q.icon=c[0];q.hue=c[1];q.updated=Date.now();
      if(i<0){q.id="u"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);q.created=q.updated;l.unshift(q)}else l[i]=q;
      s("pq.quizzes",l);return q;
    },
    remove(id){s("pq.quizzes",mine().filter(q=>q.id!==id))},
    duplicate(id){const o=S.find(id);if(!o)return null;const c=JSON.parse(JSON.stringify(o));delete c.id;delete c.builtin;delete c.description;c.title=(o.title+" (copy)").slice(0,40);return S.save(c)},
    importJSON(text){const d=JSON.parse(text);let n=0;(Array.isArray(d)?d:[d]).forEach(x=>{const c=clean(x);if(c){S.save(c);n++}});return n},
    exportJSON:list=>JSON.stringify(list.map(q=>({title:q.title,category:q.category,questions:q.questions})),null,2),
    hist:()=>g("pq.history",[]),
    addAttempt(a){const h=S.hist();h.unshift({...a,date:Date.now(),name:S.name()});s("pq.history",h.slice(0,300))},
    removeAttempt(i){const h=S.hist();h.splice(i,1);s("pq.history",h)},
    clearHist(){s("pq.history",[])},
    name:()=>g("pq.name","Student"),setName:n=>s("pq.name",n.trim().slice(0,20)||"Student"),
    reset(){["pq.quizzes","pq.history","pq.name"].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}})}
  };
  return S;
})();
