/* ══ DATA ══ */
const OWNER_TOURNEYS = [
  {name:'Summer Badminton Pro', sport:'Badminton', dates:'15-18 Apr 2026', fee:'₹1,200', prize:'₹25,000', status:'live'},
  {name:'Corporate Cricket Cup', sport:'Cricket', dates:'22-25 Apr 2026', fee:'₹4,500', prize:'₹50,000', status:'live'},
];
const OWNER_COURTS=[
  {id:1,name:'Cricket Ground A',sport:'cricket',image:'https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?w=600&q=80',area:'Dharampeth',price:1200,rating:4.8,badge:'FLOODLIT',bookings:48,revenue:'₹57.6K'},
  {id:2,name:'Badminton Court 1',sport:'badminton',image:'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80',area:'Sitabuldi',price:400,rating:4.6,badge:'INDOOR',bookings:62,revenue:'₹24.8K'},
  {id:3,name:'Tennis Court 1',sport:'tennis',image:'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80',area:'Civil Lines',price:800,rating:4.9,badge:'PRO',bookings:35,revenue:'₹28K'},
];
const ALL_BOOKINGS=[
  {id:'#B2P-0041',player:'Rahul Sharma',court:'Cricket Ground A',date:'19 Mar 2026',slot:'6:00 AM',dur:'2h',amount:'₹2,400',payment:'UPI',status:'confirmed'},
  {id:'#B2P-0040',player:'Priya Nair',court:'Badminton Court 1',date:'19 Mar 2026',slot:'8:00 AM',dur:'1h',amount:'₹400',payment:'Card',status:'confirmed'},
  {id:'#B2P-0039',player:'Arjun Mehta',court:'Tennis Court 1',date:'19 Mar 2026',slot:'10:00 AM',dur:'1h',amount:'₹800',payment:'UPI',status:'pending'},
  {id:'#B2P-0038',player:'Sneha Kulkarni',court:'Cricket Ground A',date:'19 Mar 2026',slot:'4:00 PM',dur:'3h',amount:'₹3,600',payment:'UPI',status:'confirmed'},
  {id:'#B2P-0037',player:'Dev Joshi',court:'Badminton Court 1',date:'19 Mar 2026',slot:'6:00 PM',dur:'1h',amount:'₹400',payment:'Wallet',status:'cancelled'},
  {id:'#B2P-0036',player:'Anita Patil',court:'Tennis Court 1',date:'18 Mar 2026',slot:'5:00 PM',dur:'2h',amount:'₹1,600',payment:'Card',status:'confirmed'},
];
const SLOTS=['5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM'];
const AMENITIES=['Floodlights','Parking','Showers','Cafeteria','Pro Shop','CCTV','WiFi','First Aid','Lockers','Accessible','Café'];
const REVDATA=[180,210,155,230,265,190,220,240];

/* ══ AUTH ══ */
function oSwitchTab(t){
  document.getElementById('oatab-login').classList.toggle('active',t==='login');
  document.getElementById('oatab-signup').classList.toggle('active',t==='signup');
  document.getElementById('oform-login').style.display=t==='login'?'block':'none';
  document.getElementById('oform-signup').style.display=t==='signup'?'block':'none';
}
function doOwnerLogin(){
  const e=document.getElementById('ownerEmail').value||'owner@venue.com';
  const name=e.split('@')[0]||'Owner';
  initDashboard(name,e);
}
function doOwnerSignup(){
  const n=document.getElementById('ownerName').value||'Venue Owner';
  initDashboard(n,'owner@venue.com');
}
function initDashboard(name,email){
  const init=name.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('sbAvatar').textContent=init;
  document.getElementById('sbOwnerName').textContent=name;
  document.getElementById('paAvatar').textContent=init;
  document.getElementById('paName').textContent=name;
  document.getElementById('paEmail').textContent=email;
  document.getElementById('pFullName').value=name;
  document.getElementById('pEmail').value=email;
  document.getElementById('ownerGreet').textContent=name.toUpperCase().split(' ')[0];
  document.getElementById('todayDate').textContent=new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('authPage').style.display='none';
  document.getElementById('dashApp').style.display='flex';
  buildCharts();buildOwnerCourts();buildSlots();buildAllBookings();buildAmenities();buildOwnerTourneys();
  showToast('Welcome to your Owner Dashboard, '+name.split(' ')[0]+'!');
}
function doOwnerLogout(){
  document.getElementById('authPage').style.display='flex';
  document.getElementById('dashApp').style.display='none';
  showToast('Logged out successfully');
}

/* ══ NAV ══ */
function goPage(page,el){
  document.querySelector('.sidebar').classList.remove('show');
  document.querySelectorAll('.dash-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sbn-item').forEach(i=>i.classList.remove('active'));
  document.getElementById('dp-'+page).classList.add('active');
  if(el)el.classList.add('active');
  const titles={overview:'OVERVIEW',bookings:'BOOKINGS',courts:'MY COURTS',tournaments:'ORGANIZE TOURNAMENTS',addcourt:'ADD COURT',slots:'SLOT MANAGER',earnings:'EARNINGS',profile:'PROFILE',settings:'SETTINGS'};
  document.getElementById('topbarTitle').textContent=titles[page]||page.toUpperCase();
  if(page==='overview'){buildCharts()}
  if(page==='earnings'){buildEarnChart()}
}

/* ══ CHARTS ══ */
const MONTHS=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
function buildCharts(){
  const el=document.getElementById('overviewChart');if(!el)return;
  const max=Math.max(...REVDATA);
  el.innerHTML=REVDATA.map((v,i)=>`<div class="bar-col"><div class="bar-val">₹${v}K</div><div class="bar-fill ${i===7?'bar-cur':''}" style="height:${Math.round(v/max*80)}px"></div></div>`).join('');
}
function buildEarnChart(){
  const el=document.getElementById('earnChart');if(!el)return;
  const max=Math.max(...REVDATA);
  el.innerHTML=REVDATA.map((v,i)=>`<div class="bar-col"><div class="bar-val">₹${v}K</div><div class="bar-fill ${i===7?'bar-cur':''}" style="height:${Math.round(v/max*100)}px"></div></div>`).join('');
}

/* ══ COURTS ══ */
function buildOwnerCourts(){
  const el=document.getElementById('ownerCourtGrid');if(!el)return;
  el.innerHTML=OWNER_COURTS.map(c=>`
    <div class="court-mini">
      <div class="cm-thumb" style="background-image:url('${c.image}');background-size:cover;background-position:center"><div class="cm-badge">${c.badge}</div><div class="cm-status">● Live</div></div>
      <div class="cm-body">
        <div class="cm-name">${c.name}</div>
        <div class="cm-loc"><i data-lucide="map-pin" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> ${c.area} · ${c.bookings} bookings/month</div>
        <div class="cm-meta">
          <div class="cm-price">₹${c.price}<span style="font-family:var(--ff);font-size:11px;color:var(--muted)">/hr</span></div>
          <div class="cm-rating"><i data-lucide="star" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> ${c.rating} · ${c.revenue}</div>
        </div>
        <div class="cm-actions">
          <button class="btn btn-outline btn-sm" onclick="showToast('Editing ${c.name}')">Edit</button>
          <button class="btn btn-ghost btn-sm" onclick="showToast('Stats for ${c.name}')">Stats</button>
          <button class="btn btn-danger btn-sm" onclick="showToast('Court removed')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  if(window.lucide) lucide.createIcons();
}

/* ══ SLOTS ══ */
const BLOCKED=new Set(['9:00 AM','10:00 AM','3:00 PM']);
function buildSlots(){
  const el=document.getElementById('ownerSlotGrid');if(!el)return;
  el.innerHTML=SLOTS.map(s=>`<div class="slo ${BLOCKED.has(s)?'blocked':''}" onclick="toggleSlot(this,'${s}')">${s}</div>`).join('');
}
function toggleSlot(el,s){el.classList.toggle('blocked');BLOCKED.has(s)?BLOCKED.delete(s):BLOCKED.add(s)}

/* ══ BOOKINGS TABLE ══ */
let bFilter='all';
function setBookingFilter(f,el){
  bFilter=f;
  document.querySelectorAll('[id^=bfilt-]').forEach(b=>{b.className='btn btn-ghost btn-sm';b.style.background='';b.style.borderColor=''});
  el.className='btn btn-outline btn-sm';el.style.background='var(--ad)';
  buildAllBookings();
}
function buildAllBookings(){
  const el=document.getElementById('allBookingsTbody');if(!el)return;
  const list=bFilter==='all'?ALL_BOOKINGS:ALL_BOOKINGS.filter(b=>b.status===bFilter);
  el.innerHTML=list.map(b=>{
    const sc=b.status==='confirmed'?'sc-ok':b.status==='pending'?'sc-pend':'sc-can';
    const label=b.status==='confirmed'?'✓ Confirmed':b.status==='pending'?'⏳ Pending':'✗ Cancelled';
    return `<tr><td style="font-family:var(--fm);font-size:11px;color:var(--a)">${b.id}</td><td><b>${b.player}</b></td><td>${b.court}</td><td>${b.date}</td><td>${b.slot}</td><td>${b.dur}</td><td style="font-weight:700;color:var(--a)">${b.amount}</td><td>${b.payment}</td><td><span class="sc ${sc}">${label}</span></td><td><button class="btn btn-ghost btn-sm" style="padding:6px 12px" onclick="showToast('Booking ${b.id} details')">View</button></td></tr>`;
  }).join('');
}

/* ══ ADD COURT AMENITIES ══ */
function buildAmenities(){
  const el=document.getElementById('addCourtAmenityGrid');if(!el)return;
  el.innerHTML=AMENITIES.map(a=>`<div class="at" onclick="this.classList.toggle('on')">${a}</div>`).join('');
}
function publishCourt(){showToast('Court published on Book2Play!')}
function saveProfile(){
  const n=document.getElementById('pFullName').value;
  const e=document.getElementById('pEmail').value;
  document.getElementById('sbOwnerName').textContent=n;
  document.getElementById('paName').textContent=n;
  document.getElementById('paEmail').textContent=e;
  const init=n.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('sbAvatar').textContent=init;
  document.getElementById('paAvatar').textContent=init;
  showToast('Profile updated!');
}

/* ══ TOAST ══ */
let tt;
function showToast(msg){
  document.getElementById('toastMsg').textContent=msg;
  const t=document.getElementById('toast');
  t.classList.add('show');clearTimeout(tt);
  tt=setTimeout(()=>t.classList.remove('show'),3200);
}

/* ══ MODALS ══ */
function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){document.getElementById(id).classList.remove('open')}
function closeModalOnBg(e,id){if(e.target.id===id)closeModal(id)}

/* ══ TOURNAMENTS ══ */
function buildOwnerTourneys(){
  const el=document.getElementById('ownerTourneysTbody');if(!el)return;
  el.innerHTML=OWNER_TOURNEYS.map(t=>`
    <tr>
      <td><b>${t.name}</b></td>
      <td>${t.sport}</td>
      <td>${t.dates}</td>
      <td>${t.fee}</td>
      <td style="color:var(--a);font-weight:700">${t.prize}</td>
      <td><span class="sc sc-ok">Live</span></td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="showToast('Editing ${t.name}')">Edit</button>
        <button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="showToast('Removing event...')">Remove</button>
      </td>
    </tr>
  `).join('');
  if(window.lucide) requestAnimationFrame(()=>lucide.createIcons());
}