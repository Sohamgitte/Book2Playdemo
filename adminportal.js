// Admin Portal JS Logic
const RECENT_VENUES = [
  {id:'VEN-042',name:'Super Kickers Turf',city:'Mumbai',courts:2,status:'live'},
  {id:'VEN-043',name:'Pro Sports Arena',city:'Delhi',courts:0,status:'pending'},
  {id:'VEN-044',name:'Racket Club Elite',city:'Pune',courts:4,status:'live'},
  {id:'VEN-045',name:'Smash Badminton Hub',city:'Bengaluru',courts:0,status:'pending'}
];

function doAdminLogin(){
  document.getElementById('authPage').style.display='none';
  document.getElementById('dashApp').style.display='flex';
  buildOverviewVenues();
  showToast('Welcome to Book2Play Admin Center');
}
function doAdminLogout(){
  document.getElementById('authPage').style.display='flex';
  document.getElementById('dashApp').style.display='none';
  showToast('System session terminated.');
}

function goPage(page, el){
  document.querySelector('.sidebar').classList.remove('show');
  document.querySelectorAll('.dash-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sbn-item').forEach(i=>i.classList.remove('active'));
  document.getElementById('dp-'+page).classList.add('active');
  if(el)el.classList.add('active');
  const titles={overview:'PLATFORM OVERVIEW',approvals:'VENUE APPROVALS',venues:'ALL VENUES',users:'CUSTOMERS',payouts:'VENDOR SETTLEMENTS',platformfee:'PLATFORM EARNINGS',promos:'PROMO CODES'};
  document.getElementById('topbarTitle').textContent=titles[page]||page.toUpperCase();
}

function buildOverviewVenues() {
  const el = document.getElementById('overviewVenues');
  if(!el) return;
  el.innerHTML = RECENT_VENUES.map(v => {
    let sc = v.status==='live' ? 'sc-ok' : 'sc-pend';
    let s = v.status==='live' ? '✓ LIVE' : '⏳ PENDING';
    return `<tr>
      <td style="font-family:var(--fm);font-size:11px;color:var(--a)">${v.id}</td>
      <td><b>${v.name}</b></td>
      <td>${v.city}</td>
      <td>${v.courts} listed</td>
      <td><span class="sc ${sc}">${s}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="showToast('Loading details...')">View Details</button></td>
    </tr>`;
  }).join('');
}

function approveVenue(btn) {
  btn.innerHTML = 'Approving...';
  setTimeout(() => {
    btn.parentNode.innerHTML = '<span class="sc sc-ok">✓ Approved</span>';
    showToast('Venue successfully approved and live!');
  }, 1000);
}

function rejectVenue(btn) {
  btn.parentNode.innerHTML = '<span class="sc sc-can">✗ Rejected</span>';
  showToast('Venue application rejected.');
}

let tt;
function showToast(msg){
  document.getElementById('toastMsg').textContent=msg;
  const t=document.getElementById('toast');
  t.classList.add('show');clearTimeout(tt);
  tt=setTimeout(()=>t.classList.remove('show'),3200);
}
