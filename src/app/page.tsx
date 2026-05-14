import { useState, useEffect, useRef, useCallback } from "react";

const GROUPS = [
  { name:"स्वर (Vowels)", color:"#C62828", bg:"#FFEBEE",
    varnas:[
      { v:"अ", words:["अनार","अनानास","अखरोट","अजगर","अदरक","अमरूद","अंगूर","अचार","अंबा","अटारी"], emojis:["🍑","🍍","🥜","🐍","🫚","🍈","🍇","🫙","🥭","🏠"] },
      { v:"आ", words:["आम","आँख","आकाश","आलू","आग","आरा","आटा","आदमी","आईना","आसन"], emojis:["🥭","👁️","🌤️","🥔","🔥","🪚","🌾","👨","🪞","🧘"] },
      { v:"इ", words:["इमली","इंजन","इनाम","इमारत","इत्र","इंद्रधनुष","इकाई","इंसान","इलाज","ईंधन"], emojis:["🌱","🚂","🏆","🏛️","🌸","🌈","1️⃣","👤","💊","⛽"] },
      { v:"ई", words:["ईख","ईंट","ईनाम","ईमान","ईंधन","ईगल","ईशान","ईश्वर","ईमेल","ईर्ष्या"], emojis:["🎋","🧱","🎁","⚖️","⛽","🦅","🧭","🙏","📧","😤"] },
      { v:"उ", words:["उल्लू","उंगली","उद्यान","उपहार","उड़ान","उजाला","उत्सव","उषा","उकाब","उखड़ना"], emojis:["🦉","☝️","🌳","🎁","✈️","💡","🎉","🌅","🦅","🌪️"] },
      { v:"ऊ", words:["ऊँट","ऊन","ऊष्मा","ऊँचाई","ऊखल","ऊर्जा","ऊँघना","ऊपर","ऊसर","ऊटपटांग"], emojis:["🐪","🧶","🌡️","⛰️","🪨","⚡","😴","⬆️","🏜️","🤪"] },
      { v:"ए", words:["एड़ी","एकता","एटम","एनक","एलान","एल्बम","एक","एरंड","एप्रन","एकांत"], emojis:["🦶","🤝","⚛️","👓","📢","📸","1️⃣","🌿","🧥","🏕️"] },
      { v:"ऐ", words:["ऐनक","ऐरावत","ऐश्वर्य","ऐतिहास","ऐलान","ऐनी","ऐंठन","ऐक्य","ऐब","ऐसी"], emojis:["👓","🐘","💎","🏛️","📣","👧","😣","🤝","❌","❄️"] },
      { v:"ओ", words:["ओखली","ओस","ओझा","ओढ़नी","ओर","ओटना","ओले","ओवन","ओजस्वी","ओष्ठ"], emojis:["🪨","💧","🧙","🧣","↗️","🌾","🌨️","🍳","⭐","👄"] },
      { v:"औ", words:["औरत","औजार","औषधि","औलाद","औसत","औपचारिक","औद्योगिक","औनी","औचित्य","औकात"], emojis:["👩","🔧","💊","👶","📊","👔","🏭","🧶","⚖️","📏"] },
    ]
  },
  { name:"व्यंजन — र,स,श,ख,य,थ", color:"#B71C1C", bg:"#FFF3E0",
    varnas:[
      { v:"र", words:["रोटी","रेलगाड़ी","राजा","रात","रंग","राकेट","रोबोट","रेत","रुपया","रथ"], emojis:["🫓","🚂","👑","🌙","🎨","🚀","🤖","🏜️","💰","🛕"] },
      { v:"स", words:["सेब","सूरज","सितारा","साँप","सब्ज़ी","समुद्र","सोना","सीढ़ी","सड़क","सिंह"], emojis:["🍎","☀️","⭐","🐍","🥦","🌊","🪙","🪜","🛣️","🦁"] },
      { v:"श", words:["शेर","शतरंज","शहद","शंख","शीशा","शादी","शाखा","शिक्षक","शहर","शलगम"], emojis:["🦁","♟️","🍯","🐚","🪞","💍","🌿","👨‍🏫","🏙️","🥬"] },
      { v:"ख", words:["खरगोश","खजूर","खाना","खिड़की","खेत","खरबूजा","खम्बा","खोल","खुरपी","खेल"], emojis:["🐰","🌴","🍽️","🪟","🌾","🍈","🪵","🐚","🌱","🎮"] },
      { v:"य", words:["याक","यंत्र","यात्रा","यज्ञ","युद्ध","युवक","यकीन","यादें","युगल","यमुना"], emojis:["🐂","⚙️","🧳","🔥","⚔️","👨","✅","📷","👫","🌊"] },
      { v:"थ", words:["थाली","थैला","थर्मस","थका","थाना","थेला","थोड़ा","थपेड़ा","थम्ब","थोक"], emojis:["🍽️","👜","🧉","😴","🚓","🛒","🤏","👋","👍","📦"] },
    ]
  },
  { name:"व्यंजन — व,ब,क,छ,घ,ध", color:"#1565C0", bg:"#E3F2FD",
    varnas:[
      { v:"व", words:["वन","वर्षा","वायु","विमान","वृक्ष","वृत्त","वाद्य","विद्या","वज्र","व्याघ्र"], emojis:["🌳","🌧️","💨","✈️","🌲","⭕","🎵","📚","⚡","🐅"] },
      { v:"ब", words:["बकरी","बादल","बाघ","बच्चा","बिल्ली","बरतन","बाज़ार","बगीचा","बटन","बर्फ"], emojis:["🐐","☁️","🐅","👶","🐱","🫙","🏪","🌸","🔘","❄️"] },
      { v:"क", words:["कमल","कबूतर","कछुआ","कद्दू","कमरा","कलम","कपड़ा","कप","कान","कुत्ता"], emojis:["🪷","🕊️","🐢","🎃","🛏️","✏️","👕","☕","👂","🐕"] },
      { v:"छ", words:["छाता","छाछ","छड़ी","छत","छलनी","छुट्टी","छोटा","छत्र","छवि","छल"], emojis:["☂️","🥛","🪄","🏠","🫙","🏖️","🤏","☂️","🖼️","🃏"] },
      { v:"घ", words:["घर","घड़ी","घोड़ा","घोंसला","घंटा","घास","घड़ियाल","घना","घूमना","घुड़सवार"], emojis:["🏠","⏰","🐴","🪺","🔔","🌿","🐊","🌳","🔄","🏇"] },
      { v:"ध", words:["धनुष","धरती","धूप","धागा","धोबी","धान","धुआँ","धक्का","धमाका","ध्वज"], emojis:["🏹","🌍","☀️","🧵","🧺","🌾","💨","🚶","💥","🚩"] },
    ]
  },
  { name:"व्यंजन — न,म,भ,ग,प,त,ल,फ", color:"#1B5E20", bg:"#E8F5E9",
    varnas:[
      { v:"न", words:["नल","नाव","नींबू","नाचना","नमक","नाखून","नारियल","नीड़","नेत्र","नाटक"], emojis:["🚰","⛵","🍋","💃","🧂","💅","🥥","🪺","👁️","🎭"] },
      { v:"म", words:["मछली","मोर","मकान","मेला","मेंढक","मशीन","माँ","मिठाई","मेज़","मुर्गा"], emojis:["🐟","🦚","🏠","🎪","🐸","⚙️","👩","🍮","🪑","🐓"] },
      { v:"भ", words:["भालू","भूत","भाई","भेड़","भोजन","भवन","भूकंप","भ्रमर","भौंरा","भाषा"], emojis:["🐻","👻","👦","🐑","🍽️","🏛️","🌋","🐝","🐞","💬"] },
      { v:"ग", words:["गाय","गधा","गुलाब","गिलहरी","गाजर","गाना","गरुड़","गणेश","गिटार","गोला"], emojis:["🐄","🐴","🌹","🐿️","🥕","🎵","🦅","🐘","🎸","⚽"] },
      { v:"प", words:["पानी","पंखा","पत्ता","पक्षी","पहाड़","परी","पतंग","पुल","पेड़","पूजा"], emojis:["💧","🌬️","🍃","🐦","⛰️","🧚","🪁","🌉","🌳","🪔"] },
      { v:"त", words:["तोता","तरबूज","तारा","तितली","तराजू","तलवार","तम्बू","ताला","तकिया","तेंदुआ"], emojis:["🦜","🍉","⭐","🦋","⚖️","⚔️","⛺","🔒","🛏️","🐆"] },
      { v:"ल", words:["लड्डू","लहर","लड़की","लालटेन","लोमड़ी","लिफाफ़ा","लकड़ी","लहसुन","लालच","लिपि"], emojis:["🍮","🌊","👧","🪔","🦊","✉️","🪵","🧄","💰","📝"] },
      { v:"फ", words:["फूल","फल","फ़ोटो","फ़ौज","फीता","फटाखा","फाटक","फुटबॉल","फरिश्ता","फसल"], emojis:["🌺","🍎","📸","⚔️","🎀","🎆","🚪","⚽","👼","🌾"] },
    ]
  },
  { name:"व्यंजन — ट,ठ,ड,ढ,द,ज,झ,च", color:"#4A148C", bg:"#EDE7F6",
    varnas:[
      { v:"ट", words:["टमाटर","टोपी","टेलीफ़ोन","टापू","टोकरी","टहनी","टक्कर","टमटम","टेढ़ा","टुकड़ा"], emojis:["🍅","🎩","📞","🏝️","🧺","🌿","💥","🎺","〰️","✂️"] },
      { v:"ठ", words:["ठेला","ठंड","ठोकर","ठग","ठोस","ठाठ","ठूँठ","ठसक","ठंडा","ठिकाना"], emojis:["🛒","❄️","🦶","😈","🪨","👑","🌵","💪","🧊","📍"] },
      { v:"ड", words:["डमरू","डाकिया","डंडा","डायरी","डाल","डर","डोली","डफली","डोरी","डेंगू"], emojis:["🪘","📬","🪄","📓","🌿","😱","🛕","🥁","🧵","🦟"] },
      { v:"ढ", words:["ढोल","ढक्कन","ढलान","ढेर","ढाँचा","ढिंढोरा","ढंग","ढाल","ढोकला","ढीला"], emojis:["🥁","🫙","⛷️","📦","🏗️","📣","✅","🛡️","🍞","😴"] },
      { v:"द", words:["दरवाज़ा","दीपक","दूध","दस","दांत","दर्पण","दवाई","दिल","दुकान","दादी"], emojis:["🚪","🪔","🥛","🔟","🦷","🪞","💊","❤️","🏪","👵"] },
      { v:"ज", words:["जहाज़","जिराफ़","जूता","जल","जंगल","जादू","जलेबी","जासूस","जवान","जोड़"], emojis:["✈️","🦒","👟","💧","🌳","🪄","🌀","🕵️","💪","➕"] },
      { v:"झ", words:["झंडा","झरना","झाड़ू","झील","झूला","झींगुर","झाड़","झोला","झगड़ा","झांकी"], emojis:["🚩","🌊","🧹","🏞️","🎠","🦗","🌿","👜","😤","🎪"] },
      { v:"च", words:["चाँद","चिड़िया","चम्मच","चीता","चाय","चाकू","चींटी","चेरी","चश्मा","चौराहा"], emojis:["🌙","🐦","🥄","🐆","☕","🔪","🐜","🍒","👓","🛣️"] },
    ]
  },
  { name:"व्यंजन — ह,ण + संयुक्त", color:"#BF360C", bg:"#FBE9E7",
    varnas:[
      { v:"ह", words:["हाथी","हिरण","हंस","हवाई","हार","हल","हरियाली","हिमालय","हैलमेट","हनुमान"], emojis:["🐘","🦌","🦢","✈️","📿","🌾","🌿","🏔️","⛑️","🙏"] },
      { v:"ण", words:["बाण","वाणी","पाणि","रण","गण","मणि","कण","गणना","चाणक्य","प्राण"], emojis:["🏹","🗣️","💧","⚔️","👥","💎","⚛️","🔢","📜","🌬️"] },
      { v:"क्ष", words:["क्षमा","क्षेत्र","क्षण","क्षति","क्षितिज","क्षय","क्षुधा","क्षत्रिय","क्षीर","क्षुब्ध"], emojis:["🙏","🗺️","⏱️","💔","🌅","📉","🍽️","⚔️","🥛","😡"] },
      { v:"त्र", words:["त्रिभुज","त्रिशूल","त्वचा","त्राण","त्याग","त्रुटि","त्रिलोक","त्वरित","त्रेता","त्रिकोण"], emojis:["🔺","🔱","🖐️","🛡️","🙏","❌","🌍","⚡","📜","📐"] },
      { v:"ज्ञ", words:["ज्ञान","ज्ञानी","ज्ञापन","ज्ञेय","ज्ञात","ज्ञान-दीप","ज्ञानोदय","ज्ञान-शक्ति","ज्ञानवान","ज्ञानार्जन"], emojis:["📚","🧙","📋","💡","✅","🪔","🌅","💪","👨‍🏫","🎓"] },
    ]
  },
];

const BADGES = [
  { id:"first",  label:"पहला कदम",        emoji:"👣", desc:"पहला वर्ण सीखा",  color:"#FF9800" },
  { id:"star3",  label:"तीन सितारे",      emoji:"⭐", desc:"3 वर्ण पूरे",     color:"#FFD700" },
  { id:"group1", label:"ग्रुप चैंपियन",   emoji:"🏅", desc:"एक ग्रुप पूरा",  color:"#1565C0" },
  { id:"writer", label:"लेखक",             emoji:"✍️", desc:"5 वर्ण लिखे",    color:"#2E7D32" },
  { id:"quiz10", label:"Quiz मास्टर",      emoji:"🎯", desc:"10 Quiz सही",    color:"#6A1B9A" },
  { id:"all",    label:"वर्ण-बोध चैंपियन",emoji:"🏆", desc:"सभी वर्ण सीखे",  color:"#C62828" },
];

function shuffle(a){ return [...a].sort(()=>Math.random()-.5); }

/* ══ AUDIO ══ */
function useAudio() {
  const ctxRef=useRef(null), musicOn=useRef(false), tid=useRef(null);
  const getCtx=()=>{ if(!ctxRef.current) ctxRef.current=new(window.AudioContext||window.webkitAudioContext)(); if(ctxRef.current.state==="suspended")ctxRef.current.resume(); return ctxRef.current; };
  const tone=(f,d,tp="sine",v=0.22,del=0)=>{ try{ const ctx=getCtx(),o=ctx.createOscillator(),g=ctx.createGain(); o.connect(g);g.connect(ctx.destination); o.type=tp;o.frequency.value=f; const s=ctx.currentTime+del; g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(v,s+.02);g.gain.exponentialRampToValueAtTime(.001,s+d); o.start(s);o.stop(s+d+.05); }catch(e){} };
  const speak=useCallback((text)=>{ if(!window.speechSynthesis)return; window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="hi-IN";u.rate=.78;u.pitch=1.15;u.volume=1; const vs=window.speechSynthesis.getVoices(); const hi=vs.find(v=>v.lang&&v.lang.startsWith("hi")); if(hi)u.voice=hi; window.speechSynthesis.speak(u); },[]);
  const sndOk=()=>{tone(523,.1);tone(659,.1,"sine",.22,.1);tone(784,.2,"sine",.22,.2);};
  const sndBad=()=>{tone(200,.15,"sawtooth",.2);tone(160,.2,"sawtooth",.18,.16);};
  const sndWin=()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,.28,"sine",.22,i*.09));
  const sndClick=()=>tone(440,.06,"triangle",.12);
  const sndStar=()=>{tone(880,.18);tone(1100,.18,"sine",.18,.14);tone(1320,.28,"sine",.18,.28);};
  const startMusic=useCallback(()=>{ if(musicOn.current)return; musicOn.current=true; const scale=[261.6,293.7,329.6,392,440,523.3],pat=[0,2,4,5,4,2,0,2,4,3,2,0],step=.5; const loop=()=>{ if(!musicOn.current)return; try{ const ctx=getCtx(),now=ctx.currentTime; pat.forEach((p,i)=>{ const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter(); f.type="lowpass";f.frequency.value=700; o.connect(f);f.connect(g);g.connect(ctx.destination); o.type="sine";o.frequency.value=scale[p]; const s=now+i*step; g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(.05,s+.04);g.gain.linearRampToValueAtTime(0,s+step*.8); o.start(s);o.stop(s+step*.8+.05); }); const pad=ctx.createOscillator(),pg=ctx.createGain(); pad.connect(pg);pg.connect(ctx.destination); pad.type="sine";pad.frequency.value=130.8; pg.gain.setValueAtTime(0,now);pg.gain.linearRampToValueAtTime(.03,now+.5);pg.gain.linearRampToValueAtTime(0,now+pat.length*step-.3); pad.start(now);pad.stop(now+pat.length*step); tid.current=setTimeout(loop,(pat.length*step*1000)-150); }catch(e){} }; loop(); },[]);
  const stopMusic=useCallback(()=>{ musicOn.current=false; clearTimeout(tid.current); },[]);
  return{speak,sndOk,sndBad,sndWin,sndClick,sndStar,startMusic,stopMusic};
}

/* ══ TRACING PAD ══ */
function TracePad({varna,color,studentName,onSave}){
  const W=340,H=220;
  const traceRef=useRef(null),freeRef=useRef(null);
  const [phase,setPhase]=useState("trace");
  const [paths,setPaths]=useState([]);
  const [cur,setCur]=useState(null);
  const [saved,setSaved]=useState(false);
  const [msg,setMsg]=useState("");
  const LINES=[.15,.38,.65,.88].map(r=>Math.round(r*H));

  const drawRuling=(ctx,w,h)=>{ ctx.fillStyle="#FFFDE7";ctx.fillRect(0,0,w,h); ctx.beginPath();ctx.moveTo(44,0);ctx.lineTo(44,h);ctx.strokeStyle="#FFCDD2";ctx.lineWidth=1.5;ctx.setLineDash([]);ctx.stroke(); const lc=["#FFCDD2","#A5D6A7","#A5D6A7","#FFCDD2"]; LINES.forEach((y,i)=>{ ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y); ctx.strokeStyle=lc[i];ctx.lineWidth=i===1||i===2?1.5:1; ctx.setLineDash(i===0||i===3?[5,5]:[]);ctx.stroke();ctx.setLineDash([]); }); };

  useEffect(()=>{ if(phase!=="trace")return; const cv=traceRef.current;if(!cv)return; const ctx=cv.getContext("2d");ctx.clearRect(0,0,W,H);drawRuling(ctx,W,H); ctx.save();ctx.font=`bold ${Math.round(H*.55)}px Arial`;ctx.textAlign="center";ctx.textBaseline="middle"; const mid=(LINES[1]+LINES[2])/2; ctx.fillStyle=`${color||"#E53935"}22`;ctx.fillText(varna,W/2,mid+4);ctx.restore(); [...paths,...(cur?[cur]:[])].filter(Boolean).forEach(path=>{ if(path.length<2)return; ctx.beginPath();ctx.moveTo(path[0].x,path[0].y);path.forEach(p=>ctx.lineTo(p.x,p.y)); ctx.strokeStyle=color||"#C62828";ctx.lineWidth=6;ctx.lineCap="round";ctx.lineJoin="round";ctx.stroke(); }); },[phase,paths,cur,varna,color]);

  useEffect(()=>{ if(phase!=="free")return; const cv=freeRef.current;if(!cv)return; const ctx=cv.getContext("2d");ctx.clearRect(0,0,W,H);drawRuling(ctx,W,H); [...paths,...(cur?[cur]:[])].filter(Boolean).forEach(path=>{ if(path.length<2)return; ctx.beginPath();ctx.moveTo(path[0].x,path[0].y);path.forEach(p=>ctx.lineTo(p.x,p.y)); ctx.strokeStyle=color||"#1565C0";ctx.lineWidth=6;ctx.lineCap="round";ctx.lineJoin="round";ctx.stroke(); }); },[phase,paths,cur]);

  const getXY=(e,cv)=>{ const r=cv.getBoundingClientRect(),sx=W/r.width,sy=H/r.height; const src=e.touches?e.touches[0]:e; return{x:(src.clientX-r.left)*sx,y:(src.clientY-r.top)*sy}; };
  const activeCV=()=>phase==="trace"?traceRef.current:freeRef.current;
  const onDown=(e)=>{e.preventDefault();setCur([getXY(e,activeCV())]);};
  const onMove=(e)=>{if(!cur)return;e.preventDefault();setCur(c=>[...c,getXY(e,activeCV())]);};
  const onUp=()=>{if(!cur)return;if(cur.length>3)setPaths(p=>[...p,cur]);setCur(null);};
  const totalPts=[...paths,...(cur?[cur]:[])].reduce((a,p)=>a+p.length,0);
  const clearPad=()=>{setPaths([]);setCur(null);setSaved(false);setMsg("");};
  const saveWork=()=>{ if(saved)return; const cv=phase==="trace"?traceRef.current:freeRef.current; if(!cv)return; try{ const url=cv.toDataURL("image/png"); const a=document.createElement("a");a.href=url;a.download=`${studentName||"student"}_${varna}_writing.png`;a.click(); setSaved(true);setMsg("✅ सेव हो गया!"); if(onSave)onSave(); }catch(e){setMsg("❌ सेव नहीं हुआ");} };

  return(
    <div style={{textAlign:"center"}}>
      <div style={{display:"flex",gap:"6px",justifyContent:"center",marginBottom:"10px"}}>
        {["trace","free"].map((p,i)=>(
          <button key={p} onClick={()=>{clearPad();setPhase(p);}} style={{padding:"6px 16px",borderRadius:"20px",border:"none",fontWeight:"600",fontSize:"0.82rem",cursor:"pointer",fontFamily:"Arial,sans-serif",background:phase===p?(color||"#C62828"):"#eee",color:phase===p?"white":"#555"}}>
            {p==="trace"?"✏️ वर्ण ट्रेस करो":"🖊️ खुद लिखो"}
          </button>
        ))}
      </div>
      <div style={{fontSize:"0.78rem",color:"#666",marginBottom:"8px"}}>{phase==="trace"?"👆 वर्ण की छाया पर उँगली फेरो":"🖊️ 4-लाइन पर खुद वर्ण लिखो"}</div>
      {phase==="trace"&&<canvas ref={traceRef} width={W} height={H} style={{width:"100%",maxWidth:"380px",border:`2px solid ${color||"#C62828"}`,borderRadius:"12px",display:"block",margin:"0 auto",touchAction:"none",cursor:"crosshair"}} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}/>}
      {phase==="free"&&<canvas ref={freeRef} width={W} height={H} style={{width:"100%",maxWidth:"380px",border:`2px solid ${color||"#1565C0"}`,borderRadius:"12px",display:"block",margin:"0 auto",touchAction:"none",cursor:"crosshair"}} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}/>}
      <div style={{display:"flex",gap:"8px",justifyContent:"center",marginTop:"10px",flexWrap:"wrap"}}>
        <button onClick={clearPad} style={{padding:"6px 14px",background:"#f44336",border:"none",borderRadius:"8px",color:"white",cursor:"pointer",fontSize:"0.82rem",fontFamily:"Arial,sans-serif"}}>🗑️ मिटाओ</button>
        {totalPts>15&&<button onClick={saveWork} style={{padding:"6px 16px",background:"#2E7D32",border:"none",borderRadius:"8px",color:"white",cursor:"pointer",fontSize:"0.82rem",fontFamily:"Arial,sans-serif",fontWeight:"600"}}>💾 {studentName} का काम सेव करो</button>}
      </div>
      {msg&&<div style={{marginTop:"6px",fontSize:"0.82rem",color:"#2E7D32",fontWeight:"600"}}>{msg}</div>}
    </div>
  );
}

function Stars({n,max=3,size="1.4rem"}){ return <span>{Array.from({length:max},(_,i)=><span key={i} style={{fontSize:size,opacity:i<n?1:.2}}>⭐</span>)}</span>; }

/* ══ MAIN ══ */
export default function App(){
  const audio=useAudio();
  const [className,setClassName]=useState("");
  const [students,setStudents]=useState([]);
  const [newStu,setNewStu]=useState("");
  const [activeStu,setActiveStu]=useState(null);
  const [screen,setScreen]=useState("setup");
  const [prevScreen,setPrevScreen]=useState(null);
  const [selGroup,setSelGroup]=useState(null);
  const [selVarna,setSelVarna]=useState(null);
  const [picIdx,setPicIdx]=useState(0);
  const [musicOn,setMusicOn]=useState(false);
  const [progress,setProgress]=useState({});
  const [quizQ,setQuizQ]=useState([]);
  const [qIdx,setQIdx]=useState(0);
  const [qScore,setQScore]=useState(0);
  const [qCh,setQCh]=useState(null);
  const [qFB,setQFB]=useState(null);
  const [toast,setToast]=useState(null);
  const [lbTab,setLbTab]=useState("student"); // "student"|"class"

  useEffect(()=>{ if(musicOn)audio.startMusic(); else audio.stopMusic(); },[musicOn]);

  const go=(scr,prev)=>{ setPrevScreen(prev||screen); setScreen(scr); };
  const goHome=()=>{ audio.sndClick(); setScreen("groups"); setPrevScreen(null); };
  const goBack=()=>{ audio.sndClick(); if(prevScreen)setScreen(prevScreen); else setScreen("groups"); setPrevScreen(null); };

  const showToast=(msg,color="#2E7D32")=>{ setToast({msg,color}); setTimeout(()=>setToast(null),2500); };
  const getProg=(sid)=>progress[sid]||{learnedVarnas:[],badges:[],quizScore:0,traceCount:0,reportCard:[]};

  const awardBadge=(sid,bid)=>{ setProgress(p=>{ const pr=getProg(sid); if((pr.badges||[]).includes(bid))return p; audio.sndStar(); showToast("🏅 नया बैज: "+BADGES.find(b=>b.id===bid)?.label,"#FF6B35"); return{...p,[sid]:{...pr,badges:[...(pr.badges||[]),bid]}}; }); };
  const markLearned=(sid,v)=>{ setProgress(p=>{ const pr=getProg(sid); if((pr.learnedVarnas||[]).includes(v))return p; const lv=[...(pr.learnedVarnas||[]),v]; if(lv.length===1)setTimeout(()=>awardBadge(sid,"first"),300); if(lv.length===3)setTimeout(()=>awardBadge(sid,"star3"),300); return{...p,[sid]:{...pr,learnedVarnas:lv}}; }); };
  const addToReport=(sid,entry)=>{ setProgress(p=>{ const pr=getProg(sid); return{...p,[sid]:{...pr,reportCard:[...(pr.reportCard||[]),entry]}}; }); };

  const startQuiz=(varnaList,grp,from)=>{ const pool=shuffle(varnaList).slice(0,10); const allV=GROUPS.flatMap(g=>g.varnas); const qs=pool.map(v=>{ const correct={w:v.words[0],e:v.emojis[0]}; const others=shuffle(allV.filter(x=>x.v!==v.v)).slice(0,3).map(o=>({w:o.words[0],e:o.emojis[0]})); return{varna:v.v,correct:correct.w,opts:shuffle([correct,...others])}; }); setQuizQ(qs);setQIdx(0);setQScore(0);setQCh(null);setQFB(null); if(grp)setSelGroup(grp); go("quiz",from||screen); };

  const ansQ=(opt)=>{ if(qFB)return; setQCh(opt); const right=opt===quizQ[qIdx].correct; setQFB(right?"r":"w"); if(right){audio.sndOk();audio.speak("शाबाश!");}else{audio.sndBad();audio.speak("गलत");} const ns=qScore+(right?1:0); setTimeout(()=>{ if(qIdx+1>=quizQ.length){ if(activeStu){setProgress(p=>{const pr=getProg(activeStu.id);return{...p,[activeStu.id]:{...pr,quizScore:(pr.quizScore||0)+ns}};});if(ns>=8)awardBadge(activeStu.id,"quiz10");} audio.sndWin();setQScore(ns);go("quizResult","quiz"); }else{setQIdx(i=>i+1);setQCh(null);setQFB(null);setQScore(ns);} },1300); };

  /* ── NAV BAR ── */
  const NavBar=({title,back,backLabel,color})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"6px"}}>
      <div style={{display:"flex",gap:"6px"}}>
        <button onClick={goBack} style={{padding:"6px 12px",background:color||"#E53935",border:"none",borderRadius:"8px",color:"white",cursor:"pointer",fontFamily:"Arial,sans-serif",fontSize:"0.85rem",fontWeight:"600"}}>← {backLabel||"वापस"}</button>
        {screen!=="groups"&&<button onClick={goHome} style={{padding:"6px 12px",background:"#555",border:"none",borderRadius:"8px",color:"white",cursor:"pointer",fontFamily:"Arial,sans-serif",fontSize:"0.85rem",fontWeight:"600"}}>🏠 होम</button>}
      </div>
      <div style={{fontWeight:"bold",color:color||"#333",fontSize:"0.92rem",textAlign:"center",flex:1}}>{title}</div>
      <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
        <button onClick={()=>{audio.sndClick();setMusicOn(m=>!m);}} title={musicOn?"संगीत बंद":"संगीत चालू"} style={{padding:"5px 9px",background:musicOn?"#2E7D32":"#757575",border:"none",borderRadius:"20px",color:"white",cursor:"pointer",fontSize:"1rem"}}>{musicOn?"🎵":"🔇"}</button>
      </div>
    </div>
  );

  const css=`@keyframes pop{0%{transform:scale(.7);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}} @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} @keyframes glow{0%,100%{text-shadow:0 0 8px #FFD700}50%{text-shadow:0 0 24px #FFD700,0 0 48px #FF6B35}} @keyframes shake{0%,100%{transform:translateX(0)}30%{transform:translateX(-8px)}70%{transform:translateX(8px)}} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} .pop{animation:pop .3s ease-out} .fadeIn{animation:fadeIn .3s ease-out}`;

  /* ── SETUP ── */
  if(screen==="setup")return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#FFF9E6,#FFF0CC)",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
      <style>{css}</style>
      <div style={{maxWidth:"420px",margin:"0 auto"}}>
        <div style={{textAlign:"center",background:"linear-gradient(135deg,#E53935,#FF7043)",borderRadius:"20px",padding:"1.2rem",marginBottom:"12px",boxShadow:"0 6px 20px rgba(229,57,53,.3)"}}>
          <div style={{fontSize:"2.5rem",animation:"glow 2s infinite"}}>🔤</div>
          <div style={{fontSize:"1.6rem",fontWeight:"bold",color:"white"}}>वर्ण-बोध</div>
          <div style={{fontSize:"0.82rem",color:"#FFE0E0"}}>हिंदी वर्णमाला — सुनो, लिखो, पहचानो!</div>
          <div style={{marginTop:"10px",display:"flex",justifyContent:"center"}}>
            <button onClick={()=>{audio.sndClick();setMusicOn(m=>!m);}} style={{padding:"6px 16px",background:musicOn?"#2E7D32":"rgba(255,255,255,.25)",border:"none",borderRadius:"20px",color:"white",cursor:"pointer",fontSize:"0.9rem",fontFamily:"Arial,sans-serif",display:"flex",alignItems:"center",gap:"6px"}}>{musicOn?"🎵 संगीत चालू":"🔇 संगीत बंद"}</button>
          </div>
        </div>

        {/* Instructions */}
        <div style={{background:"linear-gradient(135deg,#FFF8E1,#FFF3CD)",borderRadius:"14px",padding:"1rem",marginBottom:"12px",border:"1.5px dashed #FFB300"}}>
          <div style={{fontWeight:"700",color:"#E65100",fontSize:"0.95rem",marginBottom:"8px"}}>📋 शुरू करने से पहले पढ़ें:</div>
          {[["1️⃣","कक्षा और सेक्शन लिखें","जैसे: कक्षा 2 या Class 3 - Section A"],["2️⃣","बच्चे का नाम लिखें और जोड़ें","एक या अधिक बच्चों के नाम जोड़ें"],["3️⃣","सक्रिय बच्चे का नाम चुनें","नाम पर click करें — वही बच्चा खेलेगा"],["4️⃣","खेल शुरू करें!","वर्ण सुनो → देखो → लिखो → Quiz दो"]].map(([n,t,d])=>(
            <div key={n} style={{display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"6px"}}>
              <span style={{fontSize:"1.1rem"}}>{n}</span>
              <div><div style={{fontWeight:"600",color:"#333",fontSize:"0.88rem"}}>{t}</div><div style={{color:"#777",fontSize:"0.75rem"}}>{d}</div></div>
            </div>
          ))}
        </div>

        <div style={{background:"white",borderRadius:"16px",padding:"1rem",marginBottom:"10px",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
          <div style={{fontWeight:"600",color:"#333",marginBottom:"6px"}}>📚 कक्षा और सेक्शन:</div>
          <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="जैसे: कक्षा 2 — Section A" style={{width:"100%",padding:"0.6rem",borderRadius:"8px",border:"1.5px solid #E53935",fontSize:"1rem",boxSizing:"border-box",fontFamily:"Arial,sans-serif"}}/>
          <div style={{fontSize:"0.75rem",color:"#aaa",marginTop:"4px"}}>👆 कक्षा का नाम और सेक्शन लिखें</div>
        </div>

        <div style={{background:"white",borderRadius:"16px",padding:"1rem",marginBottom:"10px",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
          <div style={{fontWeight:"600",color:"#333",marginBottom:"6px"}}>👤 बच्चे का नाम जोड़ें:</div>
          <div style={{display:"flex",gap:"8px",marginBottom:"6px"}}>
            <input value={newStu} onChange={e=>setNewStu(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newStu.trim()){setStudents(s=>[...s,{id:Date.now(),name:newStu.trim()}]);setNewStu("");}}} placeholder="बच्चे का पूरा नाम लिखें" style={{flex:1,padding:"0.6rem",borderRadius:"8px",border:"1.5px solid #ddd",fontSize:"1rem",fontFamily:"Arial,sans-serif"}}/>
            <button onClick={()=>{if(!newStu.trim())return;setStudents(s=>[...s,{id:Date.now(),name:newStu.trim()}]);setNewStu("");audio.sndClick();}} style={{padding:"0.6rem 1rem",background:"#E53935",border:"none",borderRadius:"8px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>+ जोड़ें</button>
          </div>
          <div style={{fontSize:"0.75rem",color:"#aaa",marginBottom:"8px"}}>👆 नाम लिखकर Enter दबाएं या "+ जोड़ें" पर click करें</div>
          {students.length>0&&<>
            <div style={{fontSize:"0.82rem",color:"#555",marginBottom:"6px",fontWeight:"600"}}>👇 नाम पर click करके सक्रिय बच्चा चुनें:</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
              {students.map(s=>(
                <div key={s.id} onClick={()=>{audio.sndClick();setActiveStu(s);}} style={{padding:"5px 14px",background:activeStu?.id===s.id?"#E53935":"#f5f5f5",color:activeStu?.id===s.id?"white":"#333",borderRadius:"20px",fontSize:"0.9rem",cursor:"pointer",border:`1.5px solid ${activeStu?.id===s.id?"#C62828":"#ddd"}`,display:"flex",alignItems:"center",gap:"4px"}}>
                  {activeStu?.id===s.id?"✓":"○"} {s.name}
                </div>
              ))}
            </div>
            {!activeStu&&<div style={{marginTop:"8px",background:"#FFF3E0",borderRadius:"8px",padding:"6px 10px",fontSize:"0.78rem",color:"#E65100"}}>⚠️ ऊपर किसी एक बच्चे के नाम पर click करें</div>}
            {activeStu&&<div style={{marginTop:"8px",background:"#E8F5E9",borderRadius:"8px",padding:"6px 10px",fontSize:"0.78rem",color:"#2E7D32"}}>✅ सक्रिय बच्चा: <b>{activeStu.name}</b></div>}
          </>}
        </div>

        <button onClick={()=>{ if(!className||students.length===0||!activeStu){showToast("कक्षा, छात्र और सक्रिय छात्र ज़रूरी है","#C62828");return;} audio.sndOk();setScreen("groups"); }} style={{width:"100%",padding:"1rem",background:"linear-gradient(135deg,#E53935,#FF7043)",border:"none",borderRadius:"14px",color:"white",fontWeight:"bold",fontSize:"1.1rem",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>🚀 खेल शुरू करें →</button>
        {toast&&<div style={{marginTop:"10px",background:toast.color,borderRadius:"10px",padding:"8px 14px",color:"white",fontSize:"0.9rem",textAlign:"center"}}>{toast.msg}</div>}
      </div>
    </div>
  );

  /* ── GROUPS ── */
  if(screen==="groups")return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#FFF9E6,#FFF0CC)",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
      <style>{css}</style>
      <div style={{maxWidth:"480px",margin:"0 auto"}}>
        {/* Top bar */}
        <div style={{background:"linear-gradient(135deg,#E53935,#FF7043)",borderRadius:"14px",padding:"0.7rem 1rem",marginBottom:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"6px"}}>
          <div>
            <div style={{color:"white",fontWeight:"bold",fontSize:"1rem"}}>📚 {className}</div>
            <div style={{color:"#FFE0E0",fontSize:"0.78rem"}}>✅ {activeStu?.name}</div>
          </div>
          <div style={{display:"flex",gap:"5px",alignItems:"center",flexWrap:"wrap"}}>
            {students.map(s=>(
              <div key={s.id} onClick={()=>{audio.sndClick();setActiveStu(s);}} style={{padding:"3px 10px",background:activeStu?.id===s.id?"white":"rgba(255,255,255,.3)",color:activeStu?.id===s.id?"#E53935":"white",borderRadius:"20px",fontSize:"0.78rem",cursor:"pointer",fontWeight:activeStu?.id===s.id?"bold":"normal"}}>{s.name}</div>
            ))}
            <button onClick={()=>{audio.sndClick();setMusicOn(m=>!m);}} style={{padding:"4px 8px",background:musicOn?"#2E7D32":"rgba(255,255,255,.2)",border:"none",borderRadius:"20px",color:"white",cursor:"pointer",fontSize:"0.95rem"}}>{musicOn?"🎵":"🔇"}</button>
            <button onClick={()=>{audio.sndClick();go("leaderboard");}} style={{padding:"4px 8px",background:"rgba(255,215,0,.4)",border:"none",borderRadius:"20px",color:"white",cursor:"pointer",fontSize:"0.82rem",fontFamily:"Arial,sans-serif"}}>🏆</button>
            <button onClick={()=>{audio.sndClick();go("reportCard");}} style={{padding:"4px 8px",background:"rgba(255,255,255,.2)",border:"none",borderRadius:"20px",color:"white",cursor:"pointer",fontSize:"0.82rem",fontFamily:"Arial,sans-serif"}}>📋</button>
            <button onClick={()=>{audio.sndClick();setScreen("setup");}} style={{padding:"4px 8px",background:"rgba(255,255,255,.2)",border:"none",borderRadius:"20px",color:"white",cursor:"pointer",fontSize:"0.82rem",fontFamily:"Arial,sans-serif"}}>⚙️</button>
          </div>
        </div>

        <div style={{fontSize:"1rem",fontWeight:"600",color:"#333",marginBottom:"8px"}}>वर्ण-परिचय-क्रम — ग्रुप चुनो:</div>
        {GROUPS.map((g,gi)=>(
          <div key={gi} style={{background:"white",borderRadius:"16px",padding:"1rem",marginBottom:"10px",boxShadow:"0 2px 12px rgba(0,0,0,.07)",border:`2px solid ${g.color}33`,animation:"fadeIn .3s ease-out"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
              <div style={{fontWeight:"bold",color:g.color,fontSize:"0.92rem"}}>{g.name}</div>
              <button onClick={()=>{audio.sndClick();startQuiz(g.varnas,g,"groups");}} style={{padding:"4px 10px",background:g.color,border:"none",borderRadius:"20px",color:"white",fontSize:"0.75rem",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>ग्रुप Quiz ▶️</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
              {g.varnas.map((vd,vi)=>{ const learned=(getProg(activeStu?.id).learnedVarnas||[]).includes(vd.v); return(
                <button key={vi} onClick={()=>{audio.sndClick();audio.speak(vd.v+" — "+vd.words[0]);setSelGroup(g);setSelVarna(vd);setPicIdx(0);go("explore","groups");}}
                  style={{width:"46px",height:"46px",background:learned?g.color:`${g.color}15`,border:`2px solid ${g.color}`,borderRadius:"10px",fontSize:"1.2rem",fontWeight:"bold",color:learned?"white":g.color,cursor:"pointer",fontFamily:"Arial,sans-serif",position:"relative"}}>
                  {vd.v}
                  {learned&&<div style={{position:"absolute",top:-4,right:-4,fontSize:"0.55rem",background:"#FFD700",borderRadius:"50%",width:"14px",height:"14px",display:"flex",alignItems:"center",justifyContent:"center"}}>✓</div>}
                </button>
              ); })}
            </div>
          </div>
        ))}
      </div>
      {toast&&<div className="pop" style={{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:toast.color,borderRadius:"12px",padding:"10px 20px",color:"white",fontWeight:"bold",fontSize:"0.95rem",zIndex:99,whiteSpace:"nowrap"}}>{toast.msg}</div>}
    </div>
  );

  /* ── EXPLORE ── */
  if(screen==="explore"&&selVarna){
    const w=selVarna.words[picIdx],em=selVarna.emojis[picIdx];
    return(
      <div style={{minHeight:"100vh",background:selGroup?.bg||"#FFF9E6",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
        <style>{css}</style>
        <div style={{maxWidth:"480px",margin:"0 auto"}}>
          <NavBar title={`${selVarna.v} — ${activeStu?.name}`} color={selGroup?.color} backLabel="ग्रुप"/>
          <div style={{display:"flex",gap:"5px",overflowX:"auto",marginBottom:"10px",paddingBottom:"4px"}}>
            {selGroup?.varnas.map((vd,i)=>(
              <button key={i} onClick={()=>{audio.sndClick();audio.speak(vd.v+" — "+vd.words[0]);setSelVarna(vd);setPicIdx(0);}}
                style={{flexShrink:0,width:"40px",height:"40px",background:selVarna.v===vd.v?selGroup.color:`${selGroup.color}18`,border:`2px solid ${selGroup.color}`,borderRadius:"8px",fontSize:"1.1rem",fontWeight:"bold",color:selVarna.v===vd.v?"white":selGroup.color,cursor:"pointer",fontFamily:"Arial,sans-serif"}}>
                {vd.v}
              </button>
            ))}
          </div>
          <div style={{background:"white",borderRadius:"22px",padding:"1.2rem",boxShadow:"0 6px 24px rgba(0,0,0,.1)",marginBottom:"10px",textAlign:"center",border:`3px solid ${selGroup?.color}44`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"6px"}}>
              <div style={{fontSize:"5rem",fontWeight:"bold",color:selGroup?.color,lineHeight:1,animation:"pop .3s ease-out"}}>{selVarna.v}</div>
              <button onClick={()=>{audio.sndClick();audio.speak(selVarna.v);}} style={{width:"44px",height:"44px",background:`${selGroup?.color}22`,border:`2px solid ${selGroup?.color}`,borderRadius:"50%",fontSize:"1.4rem",cursor:"pointer"}}>🔊</button>
            </div>
            <div className="pop" style={{fontSize:"4.5rem"}}>{em}</div>
            <div style={{fontSize:"1.5rem",fontWeight:"bold",color:"#333",marginTop:"4px"}}>{w}</div>
            <div style={{fontSize:"0.82rem",color:"#999",marginTop:"2px"}}>{selVarna.v} से शुरू • {picIdx+1}/{selVarna.words.length}</div>
            <div style={{display:"flex",justifyContent:"center",gap:"10px",marginTop:"10px"}}>
              <button onClick={()=>{audio.sndClick();setPicIdx(i=>(i-1+selVarna.words.length)%selVarna.words.length);}} style={{padding:"0.5rem 1.2rem",background:"#f0f0f0",border:"none",borderRadius:"10px",fontSize:"1.2rem",cursor:"pointer"}}>◀️</button>
              <button onClick={()=>{audio.sndClick();audio.speak(selVarna.v+" — "+w);}} style={{padding:"0.5rem 1.2rem",background:selGroup?.color,border:"none",borderRadius:"10px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif",fontSize:"0.9rem"}}>🔊 सुनो</button>
              <button onClick={()=>{audio.sndClick();setPicIdx(i=>(i+1)%selVarna.words.length);}} style={{padding:"0.5rem 1.2rem",background:"#f0f0f0",border:"none",borderRadius:"10px",fontSize:"1.2rem",cursor:"pointer"}}>▶️</button>
            </div>
          </div>
          <div style={{display:"flex",gap:"6px",overflowX:"auto",paddingBottom:"6px",marginBottom:"10px"}}>
            {selVarna.words.map((wd,i)=>(
              <button key={i} onClick={()=>{audio.sndClick();setPicIdx(i);audio.speak(selVarna.v+" — "+wd);}}
                style={{flexShrink:0,width:"62px",textAlign:"center",background:picIdx===i?`${selGroup?.color}22`:"white",border:`2px solid ${picIdx===i?selGroup?.color:"#ddd"}`,borderRadius:"10px",padding:"5px",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>
                <div style={{fontSize:"1.5rem"}}>{selVarna.emojis[i]}</div>
                <div style={{fontSize:"0.58rem",color:"#555",marginTop:"2px",lineHeight:1.2}}>{wd}</div>
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>{audio.sndClick();markLearned(activeStu?.id,selVarna.v);go("trace","explore");}} style={{flex:1,padding:"0.8rem",background:"linear-gradient(135deg,#2E7D32,#43A047)",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>✍️ लिखना सीखो</button>
            <button onClick={()=>{audio.sndClick();startQuiz([selVarna],selGroup,"explore");}} style={{flex:1,padding:"0.8rem",background:"linear-gradient(135deg,#1565C0,#1976D2)",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>❓ Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── TRACE ── */
  if(screen==="trace"&&selVarna)return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#E8F5E9,#F1F8E9)",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
      <style>{css}</style>
      <div style={{maxWidth:"480px",margin:"0 auto"}}>
        <NavBar title={`✍️ ${selVarna.v} लिखना — ${activeStu?.name}`} color="#2E7D32" backLabel="वर्ण"/>
        <div style={{display:"flex",gap:"5px",overflowX:"auto",marginBottom:"10px",paddingBottom:"4px"}}>
          {selGroup?.varnas.map((vd,i)=>(
            <button key={i} onClick={()=>{audio.sndClick();setSelVarna(vd);audio.speak(vd.v);}}
              style={{flexShrink:0,width:"38px",height:"38px",background:selVarna.v===vd.v?"#2E7D32":"#E8F5E9",border:"2px solid #2E7D32",borderRadius:"8px",fontSize:"1rem",fontWeight:"bold",color:selVarna.v===vd.v?"white":"#2E7D32",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>
              {vd.v}
            </button>
          ))}
        </div>
        <div style={{background:"white",borderRadius:"14px",padding:"0.8rem",marginBottom:"10px",textAlign:"center",border:`2px solid ${selGroup?.color||"#2E7D32"}44`}}>
          <div style={{fontSize:"3rem",fontWeight:"bold",color:selGroup?.color||"#2E7D32"}}>{selVarna.v}</div>
          <div style={{fontSize:"0.82rem",color:"#888"}}>उदाहरण: {selVarna.emojis[0]} {selVarna.words[0]}</div>
        </div>
        <div style={{background:"white",borderRadius:"16px",padding:"1rem",boxShadow:"0 4px 16px rgba(0,0,0,.08)",marginBottom:"10px",border:"2px solid #C8E6C9"}}>
          <TracePad varna={selVarna.v} color={selGroup?.color} studentName={activeStu?.name||"student"} onSave={()=>{ audio.sndWin(); addToReport(activeStu?.id,{varna:selVarna.v,date:new Date().toLocaleDateString("hi-IN"),type:"writing"}); setProgress(p=>{const pr=getProg(activeStu?.id);const tc=(pr.traceCount||0)+1;if(tc>=5)setTimeout(()=>awardBadge(activeStu?.id,"writer"),200);return{...p,[activeStu?.id]:{...pr,traceCount:tc}};}); showToast("🌟 "+activeStu?.name+" का काम सेव हो गया!","#2E7D32"); }}/>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={()=>{audio.sndClick();const i=selGroup?.varnas.findIndex(x=>x.v===selVarna.v)||0;const nxt=selGroup?.varnas[(i+1)%selGroup.varnas.length];setSelVarna(nxt);audio.speak(nxt.v);}} style={{flex:1,padding:"0.8rem",background:"#2E7D32",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>अगला वर्ण →</button>
          <button onClick={()=>{audio.sndClick();startQuiz([selVarna],selGroup,"trace");}} style={{flex:1,padding:"0.8rem",background:"#1565C0",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>❓ Quiz</button>
        </div>
      </div>
      {toast&&<div className="pop" style={{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:toast.color,borderRadius:"12px",padding:"10px 20px",color:"white",fontWeight:"bold",fontSize:"0.95rem",zIndex:99}}>{toast.msg}</div>}
    </div>
  );

  /* ── QUIZ ── */
  if(screen==="quiz"&&quizQ.length>0&&qIdx<quizQ.length){
    const q=quizQ[qIdx];
    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#E3F2FD,#EDE7F6)",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
        <style>{css}</style>
        <div style={{maxWidth:"480px",margin:"0 auto"}}>
          <NavBar title={`❓ Quiz — ${activeStu?.name} (${qIdx+1}/${quizQ.length})`} color="#1565C0" backLabel="वापस"/>
          <div style={{background:"#ddd",borderRadius:"10px",height:"6px",marginBottom:"14px"}}>
            <div style={{height:"6px",borderRadius:"10px",background:"linear-gradient(90deg,#1565C0,#7B1FA2)",width:`${(qIdx/quizQ.length)*100}%`,transition:"width .4s"}}/>
          </div>
          <div style={{background:"white",borderRadius:"20px",padding:"1.5rem",boxShadow:"0 6px 20px rgba(0,0,0,.1)",marginBottom:"12px",textAlign:"center",border:"2px solid #B39DDB"}}>
            <div style={{fontSize:"0.88rem",color:"#888",marginBottom:"8px"}}>इस वर्ण से शुरू होने वाला सही शब्द चुनो:</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}>
              <div style={{fontSize:"4.5rem",fontWeight:"bold",color:"#7B1FA2",lineHeight:1}}>{q.varna}</div>
              <button onClick={()=>{audio.sndClick();audio.speak(q.varna);}} style={{width:"42px",height:"42px",background:"#EDE7F6",border:"2px solid #7B1FA2",borderRadius:"50%",fontSize:"1.3rem",cursor:"pointer"}}>🔊</button>
            </div>
            <div style={{fontWeight:"bold",color:"#555",marginTop:"6px",fontSize:"0.85rem"}}>⭐ अंक: {qScore}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
            {q.opts.map((opt,i)=>{ const isC=qCh===opt.w,isR=opt.w===q.correct,show=qFB!==null; let bg="white",border="2px solid #ddd",clr="#333"; if(show&&isR){bg="#E8F5E9";border="2px solid #2E7D32";clr="#1B5E20";}else if(show&&isC&&!isR){bg="#FFEBEE";border="2px solid #C62828";clr="#B71C1C";} return(
              <button key={i} onClick={()=>ansQ(opt.w)} disabled={!!qFB} style={{padding:"1rem",background:bg,border,borderRadius:"14px",cursor:qFB?"default":"pointer",fontFamily:"Arial,sans-serif",textAlign:"center",transition:"all .15s",animation:show&&isC&&!isR?"shake .4s":"none"}}>
                <div style={{fontSize:"2.8rem"}}>{opt.e}</div>
                <div style={{fontSize:"1rem",fontWeight:"bold",color:clr,marginTop:"4px"}}>{opt.w}</div>
                {show&&isR&&<div>✅</div>}
                {show&&isC&&!isR&&<div>❌</div>}
              </button>
            ); })}
          </div>
        </div>
      </div>
    );
  }

  /* ── QUIZ RESULT ── */
  if(screen==="quizResult"){
    const pct=Math.round((qScore/quizQ.length)*100);
    const msg=pct>=80?"जबरदस्त! वर्ण-बोध चैंपियन! 🏆":pct>=60?"बहुत अच्छे! 🎉":"अभ्यास करते रहो! 💪";
    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#FFF9E6,#FFF0CC)",fontFamily:"Arial,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
        <style>{css}</style>
        <div style={{maxWidth:"380px",width:"100%",textAlign:"center"}}>
          <div style={{background:"white",borderRadius:"24px",padding:"2rem",boxShadow:"0 10px 36px rgba(0,0,0,.14)",border:"3px solid #FFD700"}}>
            <div style={{fontSize:"3.5rem",animation:"bounce 1s ease-in-out infinite"}}>{pct>=80?"🏆":pct>=60?"🎉":"💪"}</div>
            <div style={{fontSize:"1.1rem",fontWeight:"bold",color:"#333",margin:"10px 0"}}>{activeStu?.name}</div>
            <div style={{fontSize:"1.3rem",fontWeight:"bold",color:"#E53935",marginBottom:"6px"}}>{msg}</div>
            <div style={{fontSize:"2.5rem",fontWeight:"bold",color:"#FF6B35",margin:"12px 0"}}>{qScore} / {quizQ.length}</div>
            <div style={{background:"#FFF3E0",borderRadius:"10px",padding:"10px",marginBottom:"16px"}}><div style={{fontSize:"0.95rem",color:"#E65100"}}>{pct}% सही उत्तर</div></div>
            <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>{audio.sndClick();startQuiz(selGroup?.varnas||GROUPS.flatMap(g=>g.varnas),selGroup,"quizResult");}} style={{padding:"0.7rem 1rem",background:"linear-gradient(135deg,#1565C0,#1976D2)",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>🔄 फिर</button>
              <button onClick={goHome} style={{padding:"0.7rem 1rem",background:"linear-gradient(135deg,#E53935,#FF7043)",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>🏠 होम</button>
              <button onClick={()=>{audio.sndClick();go("leaderboard","quizResult");}} style={{padding:"0.7rem 1rem",background:"linear-gradient(135deg,#FF6B35,#FFD700)",border:"none",borderRadius:"12px",color:"white",fontWeight:"bold",cursor:"pointer",fontFamily:"Arial,sans-serif"}}>🏆 बोर्ड</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── LEADERBOARD ── */
  if(screen==="leaderboard"){
    const totalVarnas=GROUPS.flatMap(g=>g.varnas).length;
    const ranked=[...students].map(s=>{ const pr=getProg(s.id); const learned=(pr.learnedVarnas||[]).length; const quiz=pr.quizScore||0; const trace=pr.traceCount||0; const badges=(pr.badges||[]).length; const total=learned*2+quiz+trace; const pct=Math.round((learned/totalVarnas)*100); return{...s,learned,quiz,trace,badges,total,pct,pr}; }).sort((a,b)=>b.total-a.total);

    // Class-wise stats (all students aggregated)
    const classTotal={ learned:ranked.reduce((a,s)=>a+s.learned,0), quiz:ranked.reduce((a,s)=>a+s.quiz,0), trace:ranked.reduce((a,s)=>a+s.trace,0), badges:ranked.reduce((a,s)=>a+s.badges,0), avgPct:ranked.length?Math.round(ranked.reduce((a,s)=>a+s.pct,0)/ranked.length):0 };
    const groupCompletion=GROUPS.map(g=>{ const done=ranked.filter(s=>(s.pr.learnedVarnas||[]).some(v=>g.varnas.find(x=>x.v===v))).length; return{...g,done}; });

    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#FFF9E6,#FFF0CC)",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
        <style>{css}</style>
        <div style={{maxWidth:"520px",margin:"0 auto"}}>
          <NavBar title={`🏆 लीडरबोर्ड — ${className}`} color="#E65100" backLabel="होम"/>

          {/* Tabs */}
          <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
            {[["student","👤 छात्र रैंकिंग"],["class","📊 कक्षा विश्लेषण"]].map(([t,l])=>(
              <button key={t} onClick={()=>setLbTab(t)} style={{flex:1,padding:"8px",borderRadius:"10px",border:"none",fontWeight:"600",fontSize:"0.88rem",cursor:"pointer",fontFamily:"Arial,sans-serif",background:lbTab===t?"#E53935":"#f0f0f0",color:lbTab===t?"white":"#555"}}>{l}</button>
            ))}
          </div>

          {/* ── STUDENT TAB ── */}
          {lbTab==="student"&&(
            <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"14px"}}>
              {ranked.map((s,i)=>(
                <div key={s.id} style={{background:i===0?"linear-gradient(135deg,#FFF8E1,#FFE082)":i===1?"linear-gradient(135deg,#F5F5F5,#E0E0E0)":i===2?"linear-gradient(135deg,#FBE9E7,#FFCCBC)":"white",borderRadius:"14px",padding:"0.9rem 1rem",border:`2px solid ${i===0?"#FFD700":i===1?"#90A4AE":i===2?"#FF8A65":"#eee"}`,display:"flex",alignItems:"center",gap:"10px",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:"1.8rem",minWidth:"36px",textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:"bold",color:"#333",fontSize:"1rem"}}>{s.name}</div>
                    <div style={{fontSize:"0.72rem",color:"#888",marginTop:"2px"}}>📖 {s.learned}/{totalVarnas} वर्ण • ⭐ {s.quiz} Quiz • ✍️ {s.trace} लेखन</div>
                    {/* progress bar */}
                    <div style={{background:"#eee",borderRadius:"10px",height:"5px",marginTop:"5px"}}>
                      <div style={{height:"5px",borderRadius:"10px",background:`linear-gradient(90deg,#E53935,#FFD700)`,width:`${s.pct}%`,transition:"width .4s"}}/>
                    </div>
                    <div style={{fontSize:"0.68rem",color:"#aaa",marginTop:"2px"}}>{s.pct}% वर्ण सीखे</div>
                    <div style={{display:"flex",gap:"3px",marginTop:"4px"}}>{(s.pr.badges||[]).map(bid=>{const b=BADGES.find(x=>x.id===bid);return b?<span key={bid} title={b.label} style={{fontSize:"1rem"}}>{b.emoji}</span>:null;})}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:"1.5rem",fontWeight:"bold",color:"#E53935"}}>{s.total}</div>
                    <div style={{fontSize:"0.68rem",color:"#888"}}>कुल अंक</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CLASS ANALYSIS TAB ── */}
          {lbTab==="class"&&(
            <div>
              {/* Summary card */}
              <div style={{background:"linear-gradient(135deg,#E53935,#FF7043)",borderRadius:"16px",padding:"1.2rem",marginBottom:"12px",color:"white"}}>
                <div style={{fontWeight:"bold",fontSize:"1.05rem",marginBottom:"10px"}}>📊 {className} — कुल सारांश</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                  {[[`${ranked.length}`,"👥 कुल छात्र"],[`${classTotal.avgPct}%`,"📈 औसत प्रगति"],[`${classTotal.learned}`,"📖 कुल वर्ण सीखे"],[`${classTotal.quiz}`,"⭐ कुल Quiz अंक"],[`${classTotal.trace}`,"✍️ कुल लेखन"],[`${classTotal.badges}`,"🏅 कुल बैज"]].map(([v,l])=>(
                    <div key={l} style={{background:"rgba(255,255,255,.2)",borderRadius:"10px",padding:"8px 10px",textAlign:"center"}}>
                      <div style={{fontSize:"1.5rem",fontWeight:"bold"}}>{v}</div>
                      <div style={{fontSize:"0.72rem",opacity:.9}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall progress bar */}
              <div style={{background:"white",borderRadius:"14px",padding:"1rem",marginBottom:"10px",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
                <div style={{fontWeight:"600",color:"#333",marginBottom:"10px"}}>📈 कक्षा की प्रगति</div>
                <div style={{background:"#eee",borderRadius:"10px",height:"18px",marginBottom:"6px",overflow:"hidden"}}>
                  <div style={{height:"18px",borderRadius:"10px",background:"linear-gradient(90deg,#E53935,#FFD700)",width:`${classTotal.avgPct}%`,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:"6px",transition:"width .5s"}}>
                    {classTotal.avgPct>10&&<span style={{fontSize:"0.7rem",color:"white",fontWeight:"bold"}}>{classTotal.avgPct}%</span>}
                  </div>
                </div>
                <div style={{fontSize:"0.75rem",color:"#888"}}>औसत वर्ण-प्राप्ति: {classTotal.avgPct}% ({Math.round(classTotal.learned/Math.max(ranked.length,1))}/{totalVarnas} वर्ण प्रति छात्र)</div>
              </div>

              {/* Per-student progress */}
              <div style={{background:"white",borderRadius:"14px",padding:"1rem",marginBottom:"10px",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
                <div style={{fontWeight:"600",color:"#333",marginBottom:"10px"}}>👤 छात्र-वार प्रगति</div>
                {ranked.map((s,i)=>(
                  <div key={s.id} style={{marginBottom:"10px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
                      <span style={{fontSize:"0.85rem",fontWeight:"600",color:"#333"}}>{i+1}. {s.name}</span>
                      <span style={{fontSize:"0.8rem",color:"#E53935",fontWeight:"bold"}}>{s.pct}%</span>
                    </div>
                    <div style={{background:"#eee",borderRadius:"10px",height:"10px",overflow:"hidden"}}>
                      <div style={{height:"10px",borderRadius:"10px",background:s.pct>=80?"#2E7D32":s.pct>=50?"#FF9800":"#E53935",width:`${s.pct}%`,transition:"width .4s"}}/>
                    </div>
                    <div style={{fontSize:"0.68rem",color:"#aaa",marginTop:"2px"}}>{s.learned} वर्ण • {s.quiz} Quiz • {s.trace} लेखन</div>
                  </div>
                ))}
              </div>

              {/* Group-wise completion */}
              <div style={{background:"white",borderRadius:"14px",padding:"1rem",marginBottom:"10px",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
                <div style={{fontWeight:"600",color:"#333",marginBottom:"10px"}}>📚 ग्रुप-वार कवरेज</div>
                {groupCompletion.map((g,i)=>(
                  <div key={i} style={{marginBottom:"8px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
                      <span style={{fontSize:"0.8rem",fontWeight:"600",color:g.color}}>{g.name}</span>
                      <span style={{fontSize:"0.78rem",color:"#888"}}>{g.done}/{ranked.length} छात्र</span>
                    </div>
                    <div style={{background:"#eee",borderRadius:"10px",height:"8px",overflow:"hidden"}}>
                      <div style={{height:"8px",borderRadius:"10px",background:g.color,width:`${ranked.length?Math.round(g.done/ranked.length*100):0}%`,transition:"width .4s"}}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Badges summary */}
              <div style={{background:"white",borderRadius:"14px",padding:"1rem",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
                <div style={{fontWeight:"600",color:"#333",marginBottom:"8px"}}>🏅 बैज वितरण</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
                  {BADGES.map(b=>{ const count=ranked.filter(s=>(s.pr.badges||[]).includes(b.id)).length; return(
                    <div key={b.id} style={{padding:"8px",background:`${b.color}12`,borderRadius:"10px",border:`1.5px solid ${b.color}44`,display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontSize:"1.3rem"}}>{b.emoji}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:"0.78rem",fontWeight:"600",color:b.color}}>{b.label}</div>
                        <div style={{fontSize:"0.68rem",color:"#888"}}>{count}/{ranked.length} छात्र</div>
                      </div>
                    </div>
                  ); })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── REPORT CARD ── */
  if(screen==="reportCard")return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#E8F5E9,#FFF9E6)",fontFamily:"Arial,sans-serif",padding:"1rem"}}>
      <style>{css}</style>
      <div style={{maxWidth:"480px",margin:"0 auto"}}>
        <NavBar title={`📋 रिपोर्ट कार्ड — ${className}`} color="#2E7D32" backLabel="होम"/>
        {students.map(s=>{ const pr=getProg(s.id); return(
          <div key={s.id} style={{background:"white",borderRadius:"16px",padding:"1rem",marginBottom:"12px",boxShadow:"0 2px 12px rgba(0,0,0,.08)",border:"2px solid #C8E6C9"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
              <div style={{fontWeight:"bold",fontSize:"1.1rem",color:"#333"}}>👤 {s.name}</div>
              <div style={{display:"flex",gap:"3px"}}>{(pr.badges||[]).map(bid=>{const b=BADGES.find(x=>x.id===bid);return b?<span key={bid} title={b.label} style={{fontSize:"1.2rem"}}>{b.emoji}</span>:null;})}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"8px"}}>
              {[[`${(pr.learnedVarnas||[]).length}`,"#2E7D32","#E8F5E9","वर्ण सीखे"],[`${pr.quizScore||0}`,"#1565C0","#E3F2FD","Quiz अंक"],[`${pr.traceCount||0}`,"#E65100","#FFF3E0","लेखन"]].map(([v,c,bg,l])=>(
                <div key={l} style={{background:bg,borderRadius:"10px",padding:"8px",textAlign:"center"}}>
                  <div style={{fontSize:"1.5rem",fontWeight:"bold",color:c}}>{v}</div>
                  <div style={{fontSize:"0.72rem",color:"#555"}}>{l}</div>
                </div>
              ))}
            </div>
            {(pr.learnedVarnas||[]).length>0&&<div><div style={{fontSize:"0.78rem",color:"#888",marginBottom:"4px"}}>सीखे हुए वर्ण:</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{(pr.learnedVarnas||[]).map((v,i)=><span key={i} style={{background:"#C8E6C9",color:"#1B5E20",borderRadius:"20px",padding:"2px 10px",fontSize:"0.9rem",fontWeight:"bold"}}>{v}</span>)}</div></div>}
          </div>
        ); })}
      </div>
    </div>
  );

  return null;
}
