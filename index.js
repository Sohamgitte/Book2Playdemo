/* ══════════════════════════
   DATA
══════════════════════════ */
const PLAYPALS = [
  {id:'P1', user:'Arjun M.', sport:'Tennis', loc:'City Tennis Park', datetime:'24 Apr · 6:00 PM', cost:'₹400/head', dist:'2.5 km', needed: 1, avatar:'A', msg:'Need intermediate player to spar. I already booked the slot.'},
  {id:'P2', user:'Rahul S.', sport:'Cricket', loc:'LevelUp Arena', datetime:'25 Apr · 8:00 AM', cost:'₹200/head', dist:'1.2 km', needed: 4, avatar:'R', msg:'Need batsmen and bowlers for a friendly match.'},
];

const TOURNEYS = [
  { id:'T1', name:'Summer Badminton Pro League', loc:'Smash Hub, Pune', date:'15th April 2026', fee:1200, prize:25000, sport:'Badminton', spots:16, filled:12, img:'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600' },
  { id:'T2', name:'Corporate Box Cricket Cup', loc:'Greenbox Turf, Mumbai', date:'22nd April 2026', fee:4500, prize:50000, sport:'Cricket', spots:8, filled:8, img:'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600' },
  { id:'T3', name:'Open Tennis Championship', loc:'City Tennis Park, Nagpur', date:'02nd May 2026', fee:800, prize:15000, sport:'Tennis', spots:32, filled:18, img:'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=600' }
];

const COURTS = [
  {id:1,name:'LevelUp Cricket Arena',sport:'cricket',emoji:'🏏',image:'https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?w=600&q=80',area:'Dharampeth',price:1200,rating:4.8,reviews:142,badge:'FLOODLIT',surface:'Artificial Turf',sports:['Cricket','Football'],amenities:[{i:'💡',l:'Floodlights'},{i:'🚗',l:'Parking'},{i:'🚿',l:'Showers'},{i:'🥤',l:'Cafeteria'},{i:'📷',l:'CCTV'},{i:'♿',l:'Accessible'}],bookedSlots:['09:00','10:00','14:00']},
  {id:2,name:'Smash Zone Badminton',sport:'badminton',emoji:'🏸',image:'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80',area:'Sitabuldi',price:400,rating:4.6,reviews:89,badge:'INDOOR',surface:'Wooden PU',sports:['Badminton'],amenities:[{i:'❄️',l:'AC'},{i:'💡',l:'LED Lights'},{i:'🚗',l:'Parking'},{i:'🛒',l:'Pro Shop'}],bookedSlots:['08:00','09:00','18:00']},
  {id:3,name:'Ace Tennis Club',sport:'tennis',emoji:'🎾',image:'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80',area:'Civil Lines',price:800,rating:4.9,reviews:203,badge:'PRO COURT',surface:'Clay Court',sports:['Tennis'],amenities:[{i:'🌿',l:'Clay Court'},{i:'🚿',l:'Showers'},{i:'🏥',l:'First Aid'},{i:'🅿️',l:'Valet'},{i:'🌐',l:'WiFi'}],bookedSlots:['07:00','11:00','15:00','16:00']},
  {id:4,name:'Goal Rush Football Turf',sport:'football',emoji:'⚽',image:'https://images.unsplash.com/photo-1518605368461-1ee067098e6c?w=600&q=80',area:'Manish Nagar',price:2000,rating:4.5,reviews:67,badge:'TURF',surface:'Artificial Turf',sports:['Football','Cricket'],amenities:[{i:'🌿',l:'Turf'},{i:'💡',l:'Floodlights'},{i:'🚗',l:'Parking'},{i:'🥤',l:'Snacks'}],bookedSlots:['06:00','07:00','08:00']},
  {id:5,name:'Hoop Dreams Basketball',sport:'basketball',emoji:'🏀',image:'https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=600&q=80',area:'Trimurti Nagar',price:600,rating:4.3,reviews:44,badge:'OUTDOOR',surface:'Hard Court',sports:['Basketball'],amenities:[{i:'💡',l:'Lights'},{i:'🚗',l:'Parking'},{i:'🏥',l:'First Aid'}],bookedSlots:['13:00','14:00']},
  {id:6,name:'PowerPlay Cricket Hub',sport:'cricket',emoji:'🏏',image:'https://images.unsplash.com/photo-1624526267942-ab0f023fd35b?w=600&q=80',area:'Wathoda',price:1000,rating:4.7,reviews:118,badge:'COVERED',surface:'Natural Grass',sports:['Cricket'],amenities:[{i:'🏟️',l:'Covered'},{i:'💡',l:'Floodlights'},{i:'🚗',l:'Parking'},{i:'🚿',l:'Showers'}],bookedSlots:['09:00','10:00','11:00']},
];
const ALL_SLOTS=['05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];

const S={
  user:null, city:'Chhatrapati Sambhajinagar', sportFilter:'all',
  court:null, slot:null, dur:1, payMethod:'upi',
  bookings:[], counter:1000, favs:new Set(),
  promoApplied:false, promoCode:'', promoAmount:0
};

/* ── INIT ── */
document.getElementById('sbDate').valueAsDate=new Date();
renderCourts();
renderTourneys();
renderPlaypals();

/* ── PAGE NAV ── */
function showPage(p){
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  window.scrollTo(0,0);
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  if(p==='mybookings'){renderBookings();document.querySelectorAll('.nav-link')[1]?.classList.add('active')}
}
function scrollToCourts(){showPage('home');setTimeout(()=>document.getElementById('courts-section').scrollIntoView({behavior:'smooth'}),100)}

/* ── COURTS ── */
function filterSport(el){
  document.querySelectorAll('.sp').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  S.sportFilter=el.dataset.sport;
  renderCourts();
}
function doSearch(){
  const sp=document.getElementById('sbSport').value;
  S.sportFilter=sp;
  document.querySelectorAll('.sp').forEach(p=>{p.classList.toggle('active',p.dataset.sport===sp)});
  scrollToCourts();
}
function renderCourts(){
  const g=document.getElementById('courtsGrid');
  const list=COURTS.filter(c=>S.sportFilter==='all'||c.sport===S.sportFilter);
  g.innerHTML=list.map(c=>`
    <div class="court-card" onclick="openDetail(${c.id})">
      <div class="cc-thumb" style="background-image:url('${c.image}')"><div class="cc-thumb-overlay"></div><div class="cc-badge">${c.badge}</div>
        <button class="cc-fav ${S.favs.has(c.id)?'on':''}" onclick="toggleFav(event,${c.id})">${S.favs.has(c.id)?'♥':'♡'}</button>
      </div>
      <div class="cc-body">
        <div class="cc-name">${c.name}</div>
        <div class="cc-loc">📍 ${c.area}, ${S.city} &nbsp;·&nbsp; ${(Math.random()*3+.5).toFixed(1)} km</div>
        <div class="cc-bottom">
          <div class="cc-rating"><span class="cc-stars">★★★★★</span>&nbsp;${c.rating}&nbsp;<span style="color:var(--muted)">(${c.reviews})</span></div>
          <div class="cc-price">₹${c.price.toLocaleString()}<small>/hr</small></div>
        </div>
        <div class="cc-slots">${c.bookedSlots.length<ALL_SLOTS.length?`<span class="slot-tag">${ALL_SLOTS.length-c.bookedSlots.length} slots free today</span>`:''}${c.bookedSlots.length>3?`<span class="slot-tag full">${c.bookedSlots.length} booked</span>`:''}</div>
      </div>
    </div>
  `).join('');
  if(window.lucide) {
    requestAnimationFrame(()=>lucide.createIcons());
  }
}
function toggleFav(e,id){e.stopPropagation();S.favs.has(id)?S.favs.delete(id):S.favs.add(id);renderCourts();showToast(S.favs.has(id)?'❤️ Added to favourites':'💔 Removed')}

function renderTourneys() {
  const grid = document.getElementById('tourneysGrid');
  if(!grid) return;
  
  grid.innerHTML = TOURNEYS.map(t => {
    let spotsLeft = t.spots - t.filled;
    let badgeStr = spotsLeft === 0 ? '<div class="tc-badge" style="background:var(--red)">SOLD OUT</div>' : `<div class="tc-badge">${spotsLeft} SPOTS LEFT</div>`;
    let btnStr = spotsLeft === 0 
      ? `<button class="btn btn-ghost btn-full" disabled style="opacity:0.6">REGISTRATION CLOSED</button>`
      : `<button class="btn btn-primary btn-full" onclick="showToast('Redirecting to tournament registration...')">JOIN NOW • ₹${t.fee}</button>`;
      
    return `
      <div class="tourney-card">
        <div class="tc-thumb" style="background-image:url('${t.img}')">
          <div class="tc-overlay"></div>
          ${badgeStr}
          <div class="tc-prize"><i data-lucide="trophy" style="width:14px;height:14px;margin-right:4px"></i> ₹${t.prize.toLocaleString()} Prize Pool</div>
        </div>
        <div class="tc-body">
          <div class="tc-meta"><span>${t.sport}</span> • <span>${t.date}</span></div>
          <div class="tc-name">${t.name}</div>
          <div class="tc-loc"><i data-lucide="map-pin" style="width:14px;height:14px"></i> ${t.loc}</div>
          <div style="margin-top:20px">${btnStr}</div>
        </div>
      </div>
    `;
  }).join('');
  
  if(window.lucide) {
    requestAnimationFrame(()=>lucide.createIcons());
  }
}

function renderPlaypals() {
  const grid = document.getElementById('playpalsGrid');
  if(!grid) return;
  grid.innerHTML = PLAYPALS.map(p => `
    <div class="tourney-card" style="padding:10px">
      <div class="tc-body" style="padding:14px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;border-bottom:1px solid var(--bdr);padding-bottom:16px">
          <div style="display:flex;gap:12px;align-items:center">
            <div style="background:var(--gd);color:var(--g);border:1px solid var(--bdrg);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:var(--fd);font-size:20px">${p.avatar}</div>
            <div>
              <div style="font-weight:800;font-size:16px;font-family:var(--fd);margin-bottom:2px">${p.user}</div>
              <div class="tc-meta" style="margin:0">${p.sport} · ${p.dist}</div>
            </div>
          </div>
          <div style="background:rgba(57,255,20,.1);color:var(--g);border:1px solid var(--bdrg);font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:100px">Needs ${p.needed}</div>
        </div>
        <p style="font-size:14px;color:var(--txt);margin-bottom:16px;line-height:1.6">"${p.msg}"</p>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          <div style="font-size:13px;color:var(--soft);display:flex;gap:8px;align-items:center"><i data-lucide="map-pin" style="width:16px;height:16px"></i> ${p.loc}</div>
          <div style="font-size:13px;color:var(--soft);display:flex;gap:8px;align-items:center"><i data-lucide="clock" style="width:16px;height:16px"></i> ${p.datetime} <strong style="color:var(--g);margin-left:4px">${p.cost}</strong></div>
        </div>
        <button class="btn btn-outline btn-full" onclick="showToast('Request sent to ${p.user}. Waiting for approval.')">SEND JOIN REQUEST →</button>
      </div>
    </div>
  `).join('');
  if(window.lucide) requestAnimationFrame(()=>lucide.createIcons());
}

/* ── DETAIL ── */
function openDetail(id){
  const c=COURTS.find(x=>x.id===id);S.court=c;
  document.getElementById('detailHero').style.backgroundImage = `url('${c.image}')`;
  document.getElementById('detailBadge').textContent=c.badge;
  document.getElementById('detailName').textContent=c.name;
  document.getElementById('detailLocStr').textContent=`${c.area}, ${S.city}`;
  document.getElementById('detailRating').textContent=c.rating;
  document.getElementById('detailReviews').textContent=`(${c.reviews} reviews)`;
  document.getElementById('dsPrice').textContent=`₹${c.price.toLocaleString()}`;
  document.getElementById('detailCtaPrice')||0;
  document.getElementById('dsAvail').textContent=`${ALL_SLOTS.length-c.bookedSlots.length} slots available today`;
  document.getElementById('dsSurface').textContent=c.surface;
  document.getElementById('detailMapAddr').textContent=`${c.area}, ${S.city}`;
  document.getElementById('detailSports').innerHTML=c.sports.map(s=>`<span class="sport-tag">${s}</span>`).join('');
  document.getElementById('detailAmenities').innerHTML=c.amenities.map(a=>`<div class="amenity-item"><span style="font-size:20px">${a.i}</span>${a.l}</div>`).join('');
  showPage('detail');
}

/* ── SLOTS MODAL ── */
function openSlotsModal(){
  if(!S.user){openAuthModal('login');showToast('⚠️ Please log in to book a slot');return}
  S.slot=null;S.dur=1;
  renderSlotsModal();
  openModal('slotsModal');
}
function renderSlotsModal(){
  const c=S.court;
  const today=new Date();
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dateTabs=Array.from({length:7},(_,i)=>{
    const d=new Date(today);d.setDate(today.getDate()+i);
    return `<div class="date-tab ${i===0?'active':''}" onclick="switchSlotDate(this,'${d.toDateString()}')"><div class="date-tab-day">${days[d.getDay()]}</div><div class="date-tab-num">${d.getDate()}</div><div style="font-size:10px;color:var(--muted)">${months[d.getMonth()]}</div></div>`;
  }).join('');
  if(!S.slotDate)S.slotDate=today.toDateString();
  const now=new Date();const isToday=S.slotDate===now.toDateString();
  const slotsHtml=ALL_SLOTS.map(sl=>{
    const h=parseInt(sl.split(':')[0]);const past=isToday&&h<=now.getHours();const booked=c.bookedSlots.includes(sl);
    const selected=S.slot===sl;const range=isInRange(sl);
    let cls='slt ';let status='';
    if(past){cls+='slt-past';status='Past'}else if(booked){cls+='slt-booked';status='Booked'}else if(selected){cls+='slt-selected';status='Selected'}else if(range){cls+='slt-range';status='Included'}else{status='Available'}
    return `<div class="${cls}" ${!past&&!booked?`onclick="pickSlot('${sl}')"`:''}><div class="slt-time">${fmt(sl)}</div><div class="slt-status">${status}</div></div>`;
  }).join('');
  const total=c.price*S.dur;
  document.getElementById('slotsModalInner').innerHTML=`
    <div class="modal-hdr"><div class="modal-title">SELECT YOUR SLOT</div><button class="modal-close" onclick="closeModal('slotsModal')">✕</button></div>
    <div class="modal-body">
      <div style="display:flex;gap:14px;align-items:center;padding:14px 0 20px;border-bottom:1px solid var(--bdr);margin-bottom:20px">
        <div style="width:64px;height:64px;border-radius:12px;background-image:url('${c.image}');background-size:cover;background-position:center;border:1px solid var(--bdr)"></div>
        <div><div style="font-weight:700;font-size:18px">${c.name}</div><div style="font-size:13px;color:var(--soft)"><i data-lucide="map-pin" style="width:12px;height:12px;display:inline"></i> ${c.area} &nbsp;·&nbsp; ₹${c.price.toLocaleString()}/hr</div></div>
      </div>
      <div class="field-label" style="margin-bottom:10px">Select Date</div>
      <div class="date-tabs">${dateTabs}</div>
      <div class="field-label" style="margin-bottom:10px">Duration</div>
      <div class="dur-row">
        ${[.5,1,1.5,2].map(d=>`<div class="dur-btn ${d===S.dur?'active':''}" onclick="setDur(${d})">${d<1?'30 min':d+' hr'}</div>`).join('')}
      </div>
      <div class="slots-legend">
        <div class="legend-item"><div class="ldot" style="background:var(--g)"></div>Available</div>
        <div class="legend-item"><div class="ldot" style="background:var(--red)"></div>Booked</div>
        <div class="legend-item"><div class="ldot" style="background:#fff"></div>Selected</div>
      </div>
      <div class="slots-grid-modal">${slotsHtml}</div>
      <div class="booking-summary-box">
        <div class="bs-row"><span class="bs-lbl">Court</span><span class="bs-val">${c.name}</span></div>
        <div class="bs-row"><span class="bs-lbl">Start Time</span><span class="bs-val" id="bsSlot">${S.slot?fmt(S.slot):'Not selected'}</span></div>
        <div class="bs-row"><span class="bs-lbl">Duration</span><span class="bs-val">${S.dur<1?'30 min':S.dur+' hr'}</span></div>
        <div class="bs-row"><span class="bs-lbl">End Time</span><span class="bs-val" id="bsEnd">${S.slot?addTime(S.slot,S.dur):'—'}</span></div>
        <div class="bs-row"><span class="bs-lbl">Court Fee</span><span class="bs-val">₹${(c.price*S.dur).toLocaleString()}</span></div>
        <div class="bs-row"><span class="bs-lbl">Platform Fee</span><span class="bs-val">₹30</span></div>
        ${S.promoApplied?`<div class="bs-row" style="color:var(--green)"><span class="bs-lbl" style="color:var(--green)">Promo Discount (${S.promoCode})</span><span class="bs-val">-₹${S.promoAmount}</span></div>`:''}
        <div class="bs-row" style="border-top:1px solid var(--bdr);padding-top:10px;margin-top:4px"><span style="font-weight:700">Total</span><span class="bs-total">₹${(Math.max(0, total+30 - (S.promoAmount||0))).toLocaleString()}</span></div>
      </div>
      
      <div style="display:flex;gap:10px;margin-bottom:20px;margin-top:16px">
        <input class="field-input" type="text" id="promoCodeInput" placeholder="Got a Promo Code? (e.g. WELCOME50)" style="margin-bottom:0;text-transform:uppercase" ${S.promoApplied?'disabled value="'+S.promoCode+'"':''}>
        <button class="btn btn-outline" onclick="applyPromo()" ${S.promoApplied?'disabled':''}>APPLY</button>
      </div>
      <div class="field-label" style="margin-bottom:10px">Payment Method</div>
      <div class="pay-methods">
        <div class="pay-m ${S.payMethod==='upi'?'active':''}" onclick="setPay(this,'upi')">📱 UPI</div>
        <div class="pay-m ${S.payMethod==='card'?'active':''}" onclick="setPay(this,'card')">💳 Card</div>
        <div class="pay-m ${S.payMethod==='wallet'?'active':''}" onclick="setPay(this,'wallet')">👛 Wallet</div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" ${S.slot?'':'style="opacity:.5;pointer-events:none"'} onclick="confirmBooking()">PAY & CONFIRM BOOKING →</button>
    </div>
  `;
  if(window.lucide) lucide.createIcons();
}
function switchSlotDate(el,date){document.querySelectorAll('.date-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');S.slotDate=date;S.slot=null;renderSlotsModal()}
function pickSlot(s){S.slot=s;renderSlotsModal()}
function setDur(d){S.dur=d;renderSlotsModal()}
function setPay(el,m){S.payMethod=m;document.querySelectorAll('.pay-m').forEach(p=>p.classList.remove('active'));el.classList.add('active')}
function isInRange(sl){
  if(!S.slot)return false;
  const si=ALL_SLOTS.indexOf(S.slot),cnt=Math.max(1,S.dur*2);
  return ALL_SLOTS.slice(si,si+cnt).includes(sl)&&sl!==S.slot;
}
function fmt(s){const[h,m]=s.split(':').map(Number);const ap=h>=12?'PM':'AM';const h12=h%12||12;return `${h12}:${String(m).padStart(2,'0')} ${ap}`}
function addTime(s,d){const[h,m]=s.split(':').map(Number);const t=h*60+m+d*60;const nh=Math.floor(t/60)%24;const nm=t%60;const ap=nh>=12?'PM':'AM';const h12=nh%12||12;return `${h12}:${String(nm).padStart(2,'0')} ${ap}`}

function applyPromo(){
  const el=document.getElementById('promoCodeInput');
  const code=el.value.toUpperCase().trim();
  if(!code) return showToast('⚠️ Enter a promo code first.');
  if(code==='WELCOME50'){
    S.promoApplied=true;S.promoCode=code;S.promoAmount=50;
    renderSlotsModal();
    showToast('🎉 Promo code WELCOME50 applied successfully! ₹50 off.');
  } else if(code==='FREEPLAY') {
    S.promoApplied=true;S.promoCode=code;S.promoAmount=200;
    renderSlotsModal();
    showToast('🎉 Huge discount applied! ₹200 off.');
  } else {
    showToast('❌ Invalid or expired promo code.');
  }
}

function confirmBooking(){
  if(!S.slot){showToast('⚠️ Select a time slot first!');return}
  const c=S.court;
  let total=(c.price*S.dur)+30-(S.promoAmount||0);
  if(total<0) total=0;
  const id='#B2P-'+(++S.counter);
  const durStr=S.dur<1?'30 min':(S.dur===1?'1 hour':S.dur+' hours');
  const b={id,emoji:c.emoji,sport:c.sport,courtName:c.name,area:c.area,date:S.slotDate||new Date().toDateString(),slot:S.slot,dur:S.dur,durStr,total,status:'upcoming'};
  S.bookings.unshift(b);c.bookedSlots.push(S.slot);
  document.getElementById('profileBCount').textContent=S.bookings.length;
  closeModal('slotsModal');
  
  // reset promo for future
  S.promoApplied=false; S.promoCode=''; S.promoAmount=0;

  document.getElementById('successContent').innerHTML=`
    <div class="success-check">✓</div>
    <div class="success-title">BOOKED!</div>
    <div style="font-size:15px;color:var(--soft);margin-bottom:4px">${c.name}</div>
    <div class="success-id">${id}</div>
    <div class="success-detail">
      <div class="sd-row"><span class="sd-lbl">Date</span><span class="sd-val">${b.date}</span></div>
      <div class="sd-row"><span class="sd-lbl">Time</span><span class="sd-val">${fmt(b.slot)} – ${addTime(b.slot,b.dur)}</span></div>
      <div class="sd-row"><span class="sd-lbl">Duration</span><span class="sd-val">${durStr}</span></div>
      <div class="sd-row"><span class="sd-lbl">Amount Paid</span><span class="sd-val" style="color:var(--g)">₹${total.toLocaleString()}</span></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
      <button class="btn btn-ghost" onclick="closeModal('successModal');showPage('mybookings')">View Bookings</button>
      <button class="btn btn-primary" onclick="closeModal('successModal')">Done 🎉</button>
    </div>
    <div style="font-size:12px;color:var(--muted);margin-top:12px">Confirmation sent to your email</div>
  `;
  openModal('successModal');
  showToast('🎉 Court booked successfully!');
}

/* ── BOOKINGS ── */
let bTab='upcoming';
function switchBTab(t){bTab=t;document.getElementById('btab-u').classList.toggle('active',t==='upcoming');document.getElementById('btab-p').classList.toggle('active',t==='past');renderBookings()}
function renderBookings(){
  const tbody=document.getElementById('bookingsTableBody');
  const list=S.bookings.filter(b=>b.status===bTab);
  if(!list.length){tbody.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:60px;color:var(--muted)">${bTab==='upcoming'?'No upcoming bookings. <a href="#" onclick="scrollToCourts();showPage(\'home\')" style="color:var(--g)">Book a court →</a>':'No past bookings yet.'}</td></tr>`;return}
  tbody.innerHTML=list.map(b=>`
    <tr>
      <td style="font-family:var(--fm);font-size:12px;color:var(--g)">${b.id}</td>
      <td><b>${b.courtName}</b></td>
      <td>${b.emoji} ${b.sport}</td>
      <td>${b.date}<br><span style="color:var(--soft);font-size:12px">${fmt(b.slot)}</span></td>
      <td>${b.durStr}</td>
      <td style="color:var(--g);font-weight:700;font-family:var(--fd);font-size:18px">₹${b.total.toLocaleString()}</td>
      <td><span class="status-chip ${bTab==='upcoming'?'sc-ok':'sc-green'}">${bTab==='upcoming'?'✓ Confirmed':'✓ Completed'}</span></td>
      <td>${bTab==='upcoming'?`<button class="btn btn-danger btn-sm" onclick="cancelB('${b.id}')">Cancel</button>`:`<button class="btn btn-outline btn-sm" onclick="openModal('reviewModal');document.getElementById('revCourtName').textContent='${b.courtName}'"><i data-lucide="star" style="width:14px;height:14px"></i> Rate</button>`}</td>
    </tr>
  `).join('');
  if(window.lucide) lucide.createIcons();
}
function cancelB(id){S.bookings.find(b=>b.id===id).status='past';renderBookings();showToast('✅ Booking cancelled. Refund in 3-5 days.')}

/* ── AUTH ── */
function openAuthModal(tab){switchAuthTab(tab);openModal('authModal')}
function switchAuthTab(t){
  document.getElementById('atab-login').classList.toggle('active',t==='login');
  document.getElementById('atab-signup').classList.toggle('active',t==='signup');
  document.getElementById('form-login').style.display=t==='login'?'block':'none';
  document.getElementById('form-signup').style.display=t==='signup'?'block':'none';
  document.getElementById('authModalTitle').textContent=t==='login'?'WELCOME BACK':'JOIN BOOK2PLAY';
}
function doLogin(){
  const e=document.getElementById('loginEmail').value||'player@example.com';
  S.user={name:e.split('@')[0]||'Player',email:e};
  afterLogin();
}
function doSignup(){
  const n=document.getElementById('signupName').value||'Player';
  S.user={name:n,email:'player@example.com'};
  afterLogin();
}
function afterLogin(){
  const init=S.user.name.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('navAvatar').textContent=init;
  document.getElementById('navUserName').textContent=S.user.name.split(' ')[0];
  document.getElementById('profileAvatarBig').textContent=init;
  document.getElementById('profileNameBig').textContent=S.user.name;
  document.getElementById('navAuthBtns').style.display='none';
  document.getElementById('navUserInfo').style.display='flex';
  document.getElementById('navGuest').style.display='none';
  document.getElementById('navUser').style.display='flex';
  closeModal('authModal');
  showToast('👋 Welcome to Book2Play, '+S.user.name.split(' ')[0]+'!');
}
function doLogout(){
  S.user=null;
  document.getElementById('navAuthBtns').style.display='flex';
  document.getElementById('navUserInfo').style.display='none';
  document.getElementById('navGuest').style.display='flex';
  document.getElementById('navUser').style.display='none';
  showPage('home');
  showToast('👋 Logged out. See you on the court!');
}

/* ── LOCATION ── */
let pendingCity='Chhatrapati Sambhajinagar';
function selectCity(el,city){document.querySelectorAll('.city-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');pendingCity=city}
function useGPS(){showToast('📡 Getting your location...');pendingCity='Near You';setTimeout(()=>applyCity(),600)}
function applyCity(){S.city=pendingCity;document.getElementById('navCity').textContent=pendingCity;document.getElementById('homeCityName')||0;closeModal('locationModal');showToast('📍 Showing courts in '+pendingCity);renderCourts()}

/* ── MODALS ── */
function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){document.getElementById(id).classList.remove('open')}
function closeModalOnBg(e,id){if(e.target===document.getElementById(id))closeModal(id)}

/* ── TOAST ── */
let tt;function showToast(msg){document.getElementById('toastMsg').textContent=msg;const t=document.getElementById('toast');t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3200)}