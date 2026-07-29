// AZ-104 Master Dashboard — Application Engine
// Data files task2_data.js (schedules) and task3_questions.js (questions) load first.

/* ============================================================
   HELPERS
   ============================================================ */
function escHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ytLink(topic) {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent('AZ-104 ' + topic);
}

function quizletLink(topic) {
  return 'https://quizlet.com/search?query=' + encodeURIComponent(topic + ' AZ-104') + '&type=sets';
}

let _toastTimer = null;
function showToast(msg) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    el.className = 'toast-notification';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

function copyText(text, btn) {
  const done = () => {
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); done();
  }
}


/* ============================================================
   DATA ACCESS ADAPTERS
   The data files (task2_data.js, task3_questions.js) already declare
   the globals `dailySchedules` and `domainQuestionDatabase` with const.
   We reference them directly here (no redeclaration) and add small
   helpers, guarding against them being missing.
   ============================================================ */
function QDB() { return (typeof domainQuestionDatabase !== 'undefined' && domainQuestionDatabase) ? domainQuestionDatabase : {}; }
function SCHED() { return (typeof dailySchedules !== 'undefined' && dailySchedules) ? dailySchedules : {}; }

const MOCK_DOMAINS = ['dom1', 'dom2', 'dom3', 'dom4', 'dom5'];
const MAX_QUESTIONS_FOR_DEFAULT_DIFFICULTY = 2;
const MEDIUM_DIFFICULTY_THRESHOLD = 0.35;
const HARD_DIFFICULTY_THRESHOLD = 0.7;
const DIFFICULTY_META = {
  easy: { label: 'Easy', className: 'difficulty-easy' },
  medium: { label: 'Medium', className: 'difficulty-medium' },
  hard: { label: 'Hard', className: 'difficulty-hard' }
};
function allQuestions() {
  let out = [];
  MOCK_DOMAINS.forEach((k) => { out = out.concat(QDB()[k] || []); });
  return out;
}
// Normalize a question explanation/video across possible field names.
function qExplanation(q) { return q.guide || q.explanation || ''; }
function qVideo(q) { return q.videoLink || q.video || ytLink((q.scenarioTag || q.question || '').slice(0, 60)); }
function shuffleList(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
function normalizeDifficulty(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'easy' || normalized === 'beginner' || normalized === 'basic') return 'easy';
  if (normalized === 'hard' || normalized === 'advanced' || normalized === 'expert') return 'hard';
  if (normalized === 'medium' || normalized === 'moderate' || normalized === 'intermediate') return 'medium';
  return '';
}
function inferDifficulty(index, total) {
  if (total <= MAX_QUESTIONS_FOR_DEFAULT_DIFFICULTY) return 'medium';
  const position = (index + 1) / total;
  if (position > HARD_DIFFICULTY_THRESHOLD) return 'hard';
  if (position > MEDIUM_DIFFICULTY_THRESHOLD) return 'medium';
  return 'easy';
}
function qDifficulty(q, domainKey) {
  const resolvedDomainKey = domainKey || (String(q.id || '').split('-')[0]) || '';
  const explicitDifficulty = normalizeDifficulty(q.difficulty || q.level || q.complexity);
  if (explicitDifficulty) return DIFFICULTY_META[explicitDifficulty] || DIFFICULTY_META.medium;
  const domainQuestions = QDB()[resolvedDomainKey] || [];
  const sourceIndex = domainQuestions.findIndex(item => item.id === q.id);
  if (sourceIndex < 0 || !domainQuestions.length) return DIFFICULTY_META.medium;
  const key = inferDifficulty(sourceIndex, domainQuestions.length);
  return DIFFICULTY_META[key] || DIFFICULTY_META.medium;
}
function getDomainExamQuestions(domainKey) {
  const questions = (QDB()[domainKey] || []).slice();
  const orderedIds = (AppState.loadState().examOrder || {})[domainKey];
  if (!orderedIds) return questions;
  if (orderedIds.length !== questions.length) {
    AppState.setDomainExamOrder(domainKey, undefined);
    console.warn('Resetting stale practice exam order for domain:', domainKey);
    return questions;
  }
  const byId = new Map(questions.map(q => [q.id, q]));
  const seen = new Set();
  const orderedQuestions = orderedIds.map((id) => {
    const q = byId.get(id);
    if (q) seen.add(id);
    return q;
  }).filter(Boolean);
  return orderedQuestions.concat(questions.filter(q => !seen.has(q.id)));
}
function setDomainExamQuestions(domainKey, questions) {
  AppState.setDomainExamOrder(domainKey, questions.map(q => q.id));
}

/* ============================================================
   DAY KEY POINTS DATA
   ============================================================ */
const dayKeyPoints = {
  day1: { title: 'Day 1 Key Points — Identity Fundamentals',
    keyPoints: [
      'WHAT: Microsoft Entra ID is Azure\u2019s cloud identity service. WHY: It authenticates users to Azure, M365, and SaaS. EXAM TIP: A tenant = a directory; a subscription trusts one tenant.',
      'WHAT: Dynamic groups auto-add members via attribute rules. WHY: Removes manual membership upkeep. EXAM TIP: Requires Entra ID P1; only Security & M365 groups support dynamic membership.',
      'WHAT: B2B guest users are invited external identities. WHY: Share resources without new accounts. EXAM TIP: Guests appear as #EXT# in the UPN.',
      'WHAT: SSPR lets users reset passwords themselves. WHY: Cuts helpdesk load. EXAM TIP: Requires registering 2+ auth methods by default.',
      'WHAT: Administrative Units scope admin rights to a subset of users. WHY: Delegated administration. EXAM TIP: Great for regional help desks.',
      'WHAT: Entra ID editions: Free, P1, P2. WHY: Features gate on edition. EXAM TIP: Conditional Access needs P1; PIM & Identity Protection need P2.'
    ],
    cheatSheet: [['az ad user create', 'Create a cloud user'], ['az ad group create', 'Create a group'], ['az ad group member add', 'Add member to group']],
    quizlet: ['Entra ID basics', 'Dynamic vs assigned groups', 'SSPR'] },
  day2: { title: 'Day 2 Key Points — RBAC & Governance',
    keyPoints: [
      'WHAT: RBAC grants least-privilege access. WHY: Security. EXAM TIP: Owner manages access; Contributor cannot assign roles; Reader is read-only.',
      'WHAT: Scope hierarchy MG \u2192 Sub \u2192 RG \u2192 Resource; assignments inherit down. WHY: Assign once, inherit widely. EXAM TIP: Deny assignments beat Allow.',
      'WHAT: Custom roles use Actions/NotActions/DataActions. WHY: Fine-grained control. EXAM TIP: JSON AssignableScopes limits where the role applies.',
      'WHAT: Azure Policy enforces standards. WHY: Governance at scale. EXAM TIP: Deny blocks creation; DeployIfNotExists remediates; Audit only reports.',
      'WHAT: Locks: CanNotDelete vs ReadOnly. WHY: Prevent accidental changes. EXAM TIP: ReadOnly can break operations that write (e.g., listKeys).',
      'WHAT: Management groups organize subscriptions. WHY: Apply policy/RBAC across many subs. EXAM TIP: Root MG sits above all; max 6 levels deep.'
    ],
    cheatSheet: [['az role assignment create', 'Assign a role'], ['az policy assignment create', 'Assign a policy'], ['az lock create', 'Create a resource lock']],
    quizlet: ['RBAC roles', 'Azure Policy effects', 'Management groups'] },
  day3: { title: 'Day 3 Key Points — Storage & Redundancy',
    keyPoints: [
      'WHAT: LRS/ZRS/GRS/GZRS define redundancy. WHY: Durability trade-offs. EXAM TIP: LRS=1 datacenter, ZRS=3 zones, GRS=2 regions, GZRS=zones+region.',
      'WHAT: Access tiers Hot/Cool/Cold/Archive. WHY: Cost vs latency. EXAM TIP: Archive is offline\u2014rehydration takes hours.',
      'WHAT: StorageV2 is the recommended kind. WHY: All features + tiers. EXAM TIP: Premium uses SSD for low latency (BlockBlob/FileStorage).',
      'WHAT: Lifecycle policies auto-move/delete blobs. WHY: Cost optimization. EXAM TIP: Rules act on last-modified/last-accessed time.',
      'WHAT: RA-GRS adds read access to the secondary. WHY: Read during outages. EXAM TIP: You cannot write to the secondary until failover.',
      'WHAT: Blob types: block, append, page. WHY: Different workloads. EXAM TIP: Page blobs back VM disks; append blobs suit logging.'
    ],
    cheatSheet: [['az storage account create', 'Create storage account'], ['az storage container create', 'Create a container'], ['az storage blob upload', 'Upload a blob']],
    quizlet: ['Storage redundancy', 'Blob tiers', 'Lifecycle management'] },
  day4: { title: 'Day 4 Key Points — Files, SAS & Security',
    keyPoints: [
      'WHAT: Azure Files offers SMB/NFS shares. WHY: Lift-and-shift file servers. EXAM TIP: Azure File Sync tiers cold data to the cloud.',
      'WHAT: SAS grants scoped, time-limited access. WHY: Share without keys. EXAM TIP: User-delegation SAS (Entra-signed) is most secure.',
      'WHAT: Stored access policies wrap service SAS. WHY: Central revocation. EXAM TIP: Delete the policy to revoke all its SAS tokens.',
      'WHAT: Storage firewalls restrict to VNets/IPs. WHY: Network security. EXAM TIP: Default action Deny + explicit allow rules.',
      'WHAT: Private endpoints give a private IP to storage. WHY: Traffic stays on the VNet. EXAM TIP: Needs private DNS zone for name resolution.',
      'WHAT: SSE encrypts data at rest by default. WHY: Compliance. EXAM TIP: Use customer-managed keys (CMK) in Key Vault for control.'
    ],
    cheatSheet: [['az storage share create', 'Create a file share'], ['az storage container generate-sas', 'Generate a SAS'], ['az storage account network-rule add', 'Add firewall rule']],
    quizlet: ['SAS tokens', 'Azure Files', 'Storage firewall'] },
  day5: { title: 'Day 5 Key Points — Virtual Machines',
    keyPoints: [
      'WHAT: VM series map to workloads (B, D, E, F...). WHY: Right-size cost/perf. EXAM TIP: B-series = burstable/dev; D = general; E = memory.',
      'WHAT: Managed disks: Standard HDD/SSD, Premium SSD, Ultra. WHY: IOPS/latency. EXAM TIP: Ultra & Premium need supported VM sizes.',
      'WHAT: Availability sets use fault + update domains. WHY: 99.95% SLA. EXAM TIP: Set spans a datacenter; zones span datacenters.',
      'WHAT: Availability zones are physically separate. WHY: 99.99% SLA. EXAM TIP: Combine zones + LB for resilience.',
      'WHAT: ADE encrypts OS/data disks. WHY: Data protection. EXAM TIP: Uses BitLocker (Windows) / DM-Crypt (Linux) with Key Vault.',
      'WHAT: VM extensions run post-deploy config. WHY: Automation. EXAM TIP: Custom Script Extension installs software at boot.'
    ],
    cheatSheet: [['az vm create', 'Create a VM'], ['az vm open-port', 'Open an inbound port'], ['az vm disk attach', 'Attach a data disk']],
    quizlet: ['VM sizes', 'Managed disks', 'Availability sets vs zones'] },
  day6: { title: 'Day 6 Key Points — VMSS, Containers & AKS',
    keyPoints: [
      'WHAT: VMSS runs identical, autoscaling VMs. WHY: Elastic web tiers. EXAM TIP: Autoscale on CPU/schedule; Flexible orchestration mixes sizes.',
      'WHAT: ACI runs serverless containers fast. WHY: Simple, short-lived workloads. EXAM TIP: No orchestration\u2014use AKS for that.',
      'WHAT: AKS is managed Kubernetes. WHY: Container orchestration at scale. EXAM TIP: Control plane is free; you pay for node pools.',
      'WHAT: Node pools scale independently. WHY: Mix workloads. EXAM TIP: Cluster Autoscaler adds nodes; HPA scales pods.',
      'WHAT: kubectl manages AKS objects. WHY: Deploy/inspect. EXAM TIP: az aks get-credentials merges kubeconfig.',
      'WHAT: ACR stores container images. WHY: Private registry. EXAM TIP: Attach ACR to AKS for pull auth without secrets.'
    ],
    cheatSheet: [['az vmss create', 'Create a scale set'], ['az vmss scale', 'Change instance count'], ['az aks create', 'Create an AKS cluster']],
    quizlet: ['VM Scale Sets', 'AKS basics', 'Container Instances'] },
  day7: { title: 'Day 7 Key Points — App Service, ARM & Bicep',
    keyPoints: [
      'WHAT: App Service hosts web apps (PaaS). WHY: No VM management. EXAM TIP: Scale up = bigger plan; scale out = more instances.',
      'WHAT: Deployment slots enable zero-downtime swaps. WHY: Safe releases. EXAM TIP: Warm up staging, then swap with production.',
      'WHAT: ARM templates are declarative JSON. WHY: Repeatable IaC. EXAM TIP: Incremental mode keeps unlisted resources; Complete deletes them.',
      'WHAT: Bicep is a cleaner DSL over ARM. WHY: Readable IaC. EXAM TIP: Bicep compiles to ARM JSON; use az bicep decompile to convert.',
      'WHAT: Template functions (resourceId, concat). WHY: Dynamic values. EXAM TIP: parameters() vs variables() vs reference().',
      'WHAT: App Service plan tiers gate features. WHY: Cost/scale. EXAM TIP: Slots & custom domains need Standard+ tiers.'
    ],
    cheatSheet: [['az webapp create', 'Create a web app'], ['az webapp deployment slot create', 'Add a slot'], ['az deployment group create', 'Deploy a template']],
    quizlet: ['App Service', 'ARM templates', 'Bicep'] },
  day8: { title: 'Day 8 Key Points — VNets & Subnets',
    keyPoints: [
      'WHAT: A VNet is an isolated L3 network. WHY: Private connectivity. EXAM TIP: Azure reserves 5 IPs per subnet (.0,.1,.2,.3,.255).',
      'WHAT: Subnets segment a VNet by CIDR. WHY: Organize & secure. EXAM TIP: /24 = 251 usable Azure IPs after reservations.',
      'WHAT: VNet peering links two VNets privately. WHY: Low-latency traffic. EXAM TIP: Peering is non-transitive; use hub-spoke + routing.',
      'WHAT: Public IP SKUs Basic vs Standard. WHY: Feature/SLA. EXAM TIP: Standard is zone-redundant and secure-by-default (deny inbound).',
      'WHAT: NAT Gateway provides scalable outbound. WHY: SNAT port exhaustion fix. EXAM TIP: Preferred over LB outbound rules for egress.',
      'WHAT: System & user-defined routes control traffic. WHY: Force tunneling/NVA. EXAM TIP: UDR with next-hop = virtual appliance.'
    ],
    cheatSheet: [['az network vnet create', 'Create a VNet'], ['az network vnet peering create', 'Peer two VNets'], ['az network nat gateway create', 'Create NAT gateway']],
    quizlet: ['VNet & subnets', 'CIDR', 'VNet peering'] },
  day9: { title: 'Day 9 Key Points — Network Security & LB',
    keyPoints: [
      'WHAT: NSGs filter traffic by 5-tuple rules. WHY: Micro-segmentation. EXAM TIP: Lower priority number wins; 65000 default AllowVNet.',
      'WHAT: ASGs group NICs by app role. WHY: Simpler rules. EXAM TIP: Reference ASGs as source/destination instead of IPs.',
      'WHAT: Azure Bastion gives browser RDP/SSH. WHY: No public IP on VMs. EXAM TIP: Deploy into subnet named AzureBastionSubnet.',
      'WHAT: Load Balancer is L4 (TCP/UDP). WHY: Distribute traffic. EXAM TIP: Standard LB needs health probes + NSG allow.',
      'WHAT: Application Gateway is L7 with WAF. WHY: HTTP routing + security. EXAM TIP: URL path-based & host-based routing; SSL offload.',
      'WHAT: Azure Firewall is a managed stateful firewall. WHY: Central egress control. EXAM TIP: Use FQDN rules + DNAT for inbound.'
    ],
    cheatSheet: [['az network nsg create', 'Create an NSG'], ['az network nsg rule create', 'Add an NSG rule'], ['az network lb create', 'Create a load balancer']],
    quizlet: ['NSG rules', 'Load Balancer vs App Gateway', 'Azure Bastion'] },
  day10: { title: 'Day 10 Key Points — Hybrid, DNS & Private Link',
    keyPoints: [
      'WHAT: VPN Gateway encrypts traffic over the internet. WHY: Hybrid connectivity. EXAM TIP: S2S for sites, P2S for individual clients.',
      'WHAT: ExpressRoute is a private circuit. WHY: Predictable, high bandwidth. EXAM TIP: Does not traverse the public internet.',
      'WHAT: Azure DNS hosts public & private zones. WHY: Name resolution. EXAM TIP: Private zones resolve within linked VNets.',
      'WHAT: Traffic Manager is DNS-based global routing. WHY: Route users to regions. EXAM TIP: Methods: Priority, Weighted, Performance, Geographic.',
      'WHAT: Private Endpoint maps a PaaS service to a private IP. WHY: Keep traffic on the VNet. EXAM TIP: Needs privatelink DNS zone.',
      'WHAT: Service Endpoints extend VNet identity to PaaS. WHY: Restrict access to the VNet. EXAM TIP: Traffic still uses the public endpoint (optimized route).'
    ],
    cheatSheet: [['az network vnet-gateway create', 'Create a VPN gateway'], ['az network dns zone create', 'Create a DNS zone'], ['az network private-endpoint create', 'Create a private endpoint']],
    quizlet: ['VPN vs ExpressRoute', 'Traffic Manager', 'Private Endpoints'] },
  day11: { title: 'Day 11 Key Points — Azure Monitor & Logs',
    keyPoints: [
      'WHAT: Azure Monitor collects metrics & logs. WHY: Observability. EXAM TIP: Metrics are numeric/near-real-time; logs are queryable events.',
      'WHAT: Log Analytics workspace stores logs. WHY: Central query with KQL. EXAM TIP: Diagnostic settings route resource logs to a workspace.',
      'WHAT: KQL queries logs (where/summarize/project). WHY: Analysis. EXAM TIP: Know Heartbeat & Perf tables for VM Insights.',
      'WHAT: Alerts fire on metric/log/activity signals. WHY: Proactive ops. EXAM TIP: Alert rule + action group + (optional) processing rule.',
      'WHAT: Action groups define notifications/actions. WHY: Reuse across alerts. EXAM TIP: Email, SMS, webhook, Logic App, Automation runbook.',
      'WHAT: Application Insights monitors apps (APM). WHY: App-level telemetry. EXAM TIP: Distinct from platform metrics.'
    ],
    cheatSheet: [['az monitor log-analytics workspace create', 'Create workspace'], ['az monitor metrics list', 'List metrics'], ['az monitor action-group create', 'Create action group']],
    quizlet: ['Azure Monitor', 'Log Analytics/KQL', 'Alerts & action groups'] },
  day12: { title: 'Day 12 Key Points — Backup & Site Recovery',
    keyPoints: [
      'WHAT: Recovery Services vault stores backups. WHY: Central protection. EXAM TIP: Backup policy sets frequency + retention.',
      'WHAT: Azure Backup protects VMs/files/SQL. WHY: Recover data. EXAM TIP: Soft delete keeps deleted backups 14 days.',
      'WHAT: ASR replicates workloads for DR. WHY: Regional failover. EXAM TIP: Recovery plans orchestrate multi-VM failover order.',
      'WHAT: RPO vs RTO. WHY: DR targets. EXAM TIP: RPO = data loss window; RTO = time to recover.',
      'WHAT: Cross-region restore uses RA-GRS vaults. WHY: Restore in paired region. EXAM TIP: Enable GRS on the vault.',
      'WHAT: Backup reports use Log Analytics. WHY: Compliance/insight. EXAM TIP: Configure diagnostic settings on the vault.'
    ],
    cheatSheet: [['az backup vault create', 'Create a backup vault'], ['az backup protection enable-for-vm', 'Protect a VM'], ['az backup job list', 'List backup jobs']],
    quizlet: ['Azure Backup', 'Site Recovery', 'RPO/RTO'] },
  day13: { title: 'Day 13 Key Points — Mock Exam Strategy',
    keyPoints: [
      'WHAT: Simulate real 130-minute timing. WHY: Build stamina. EXAM TIP: ~2 min per question; flag and move on.',
      'WHAT: Case studies bundle related questions. WHY: Applied reasoning. EXAM TIP: Read requirements first, then each question.',
      'WHAT: Eliminate wrong options. WHY: Improve odds. EXAM TIP: Watch absolute words (always/never) in distractors.',
      'WHAT: Log every miss immediately. WHY: Targeted review. EXAM TIP: Use the Weakness Log tab in this app.',
      'WHAT: Networking is highest weight (25-30%). WHY: Score impact. EXAM TIP: Prioritize NSG, peering, LB, VPN mastery.',
      'WHAT: No penalty for guessing. WHY: Answer everything. EXAM TIP: Never leave a question blank.'
    ],
    cheatSheet: [['Go to #mock', 'Run the full exam'], ['Submit quiz', 'See grade report'], ['#errorlog', 'Review misses']],
    quizlet: ['Exam strategy', 'Time management', 'Case studies'] },
  day14: { title: 'Day 14 Key Points — Final Readiness',
    keyPoints: [
      'WHAT: Retry all weak questions. WHY: Close gaps. EXAM TIP: Aim for 85%+ on your weakness set.',
      'WHAT: Speed-drill 35 keywords. WHY: Fast recall. EXAM TIP: Focus on networking + storage terms.',
      'WHAT: Memorize the CIDR table. WHY: Subnetting questions. EXAM TIP: /24=254, /25=126, /26=62, /27=30, /28=14, /29=6 hosts.',
      'WHAT: Review the 5 az command families. WHY: CLI questions. EXAM TIP: identity, storage, compute, network, monitor.',
      'WHAT: Prep the environment (ID, quiet room). WHY: Smooth check-in. EXAM TIP: Online proctored requires a clear desk.',
      'WHAT: Rest and hydrate the night before. WHY: Peak focus. EXAM TIP: Don\u2019t cram new material on exam morning.'
    ],
    cheatSheet: [['#cheat', 'Review CLI & CIDR'], ['#keywords', 'Speed-drill terms'], ['#errorlog', 'Retry weak questions']],
    quizlet: ['Final review', 'CIDR table', 'CLI verbs'] }
};

/* ============================================================
   DOMAIN STUDY GUIDES DATA
   ============================================================ */
const domainStudyGuides = {
  dom1: { title: '🔐 Domain 1 Study Guide — Identity & Governance (20-25%)', sections: [
    { heading: 'Identity Fundamentals & Entra ID', content: [
      '<b>Microsoft Entra ID</b> (formerly Azure AD) is the cloud identity provider that authenticates users and apps.',
      '<ul><li>A <b>tenant</b> is a dedicated directory instance; a <b>subscription</b> trusts exactly one tenant.</li><li>Editions: <b>Free</b>, <b>P1</b> (Conditional Access, dynamic groups), <b>P2</b> (PIM, Identity Protection).</li><li><b>Users</b> can be cloud-only, synced (Entra Connect), or <b>B2B guests</b> (#EXT#).</li></ul>',
      '<b>Groups:</b> <ul><li><b>Assigned</b> = manual membership.</li><li><b>Dynamic</b> = rule-based on attributes (needs P1).</li></ul>',
      '<b>Administrative Units</b> scope admin permissions to a subset of users/groups (e.g., regional help desk).'] },
    { heading: 'RBAC & Access Control', content: [
      '<b>Azure RBAC</b> grants least-privilege access at MG \u2192 Subscription \u2192 Resource Group \u2192 Resource.',
      '<ul><li><b>Owner</b>: full access incl. assigning roles.</li><li><b>Contributor</b>: manage resources, <b>cannot</b> assign roles.</li><li><b>Reader</b>: view only.</li><li><b>User Access Administrator</b>: manage access only.</li></ul>',
      'Custom roles use <b>Actions</b>, <b>NotActions</b>, <b>DataActions</b>, and <b>AssignableScopes</b>.',
      '<b>Deny assignments</b> always override Allow. Role assignments <b>inherit</b> down the hierarchy.'] },
    { heading: 'Azure Policy & Governance', content: [
      '<b>Azure Policy</b> enforces organizational standards and assesses compliance.',
      '<ul><li>Effects: <b>Deny</b> (block), <b>Audit</b> (report), <b>Append/Modify</b> (add settings), <b>DeployIfNotExists</b> (remediate).</li><li><b>Initiatives</b> bundle multiple policies.</li></ul>',
      '<b>Locks</b>: <b>CanNotDelete</b> and <b>ReadOnly</b> protect resources (inherit down; most restrictive wins).',
      '<b>Management Groups</b> apply policy & RBAC across many subscriptions (up to 6 levels).'] },
    { heading: 'Cost Management & Subscriptions', content: [
      '<b>Tags</b> organize resources for billing and automation (key/value).',
      '<b>Budgets</b> trigger alerts at spending thresholds; <b>Cost Analysis</b> visualizes spend.',
      '<b>Resource Locks + Policy</b> together prevent costly mistakes.'] },
    { heading: '🚨 Critical Exam Scenario Cheat Sheet', content: [
      '<b>Goal \u2192 Solution</b>',
      '<ul><li>Auto-manage group membership \u2192 <b>Dynamic group</b> (P1).</li><li>Let users reset passwords \u2192 <b>SSPR</b> (register 2 methods).</li><li>Give access without assigning roles \u2192 <b>User Access Administrator</b>.</li><li>Prevent resource deletion \u2192 <b>CanNotDelete lock</b>.</li><li>Enforce tag on all new resources \u2192 Policy with <b>Deny</b>/<b>Modify</b>.</li><li>Delegate help desk to a region \u2192 <b>Administrative Unit</b>.</li></ul>'] }
  ]},
  dom2: { title: '💾 Domain 2 Study Guide — Storage (15-20%)', sections: [
    { heading: 'Storage Account Types & Redundancy', content: [
      'Use <b>StorageV2 (general-purpose v2)</b> for nearly all workloads.',
      '<b>Redundancy:</b><ul><li><b>LRS</b>: 3 copies in one datacenter.</li><li><b>ZRS</b>: 3 copies across zones.</li><li><b>GRS</b>: LRS + async copy to paired region.</li><li><b>GZRS</b>: ZRS + paired region.</li><li><b>RA-GRS/RA-GZRS</b>: read access to secondary.</li></ul>'] },
    { heading: 'Blob Storage & Tiers', content: [
      '<b>Access tiers:</b> <b>Hot</b> (frequent), <b>Cool</b> (30+ days), <b>Cold</b> (90+ days), <b>Archive</b> (offline, cheapest).',
      'Archive requires <b>rehydration</b> (hours) before reading.',
      '<b>Blob types:</b> block (files), append (logs), page (VM disks).',
      '<b>Lifecycle management</b> auto-tiers/deletes based on last-modified or last-accessed.'] },
    { heading: 'Azure Files & File Sync', content: [
      '<b>Azure Files</b> provides SMB/NFS shares mountable cross-platform.',
      '<b>Azure File Sync</b> centralizes on-prem shares in Azure and <b>cloud-tiers</b> cold files.',
      'Premium file shares (FileStorage) use SSD for low latency.'] },
    { heading: 'Security & Access Control', content: [
      '<b>SAS tokens</b> grant scoped, time-limited access; <b>user-delegation SAS</b> (Entra-signed) is most secure.',
      '<b>Stored access policies</b> allow central SAS revocation.',
      '<b>Storage firewalls</b> restrict to VNets/IPs; <b>private endpoints</b> give a private IP (need private DNS).',
      '<b>SSE</b> encrypts at rest; use <b>CMK</b> in Key Vault for control.'] },
    { heading: '🚨 Critical Exam Scenario Cheat Sheet', content: [
      '<b>Goal \u2192 Solution</b>',
      '<ul><li>Survive a region outage with read \u2192 <b>RA-GRS</b>.</li><li>Cheapest for rarely-read archives \u2192 <b>Archive tier</b>.</li><li>Share a file temporarily \u2192 <b>SAS token</b>.</li><li>Revoke many SAS at once \u2192 <b>Stored access policy</b>.</li><li>Keep storage traffic off the internet \u2192 <b>Private endpoint</b>.</li><li>Sync branch file servers \u2192 <b>Azure File Sync</b>.</li></ul>'] }
  ]},
  dom3: { title: '💻 Domain 3 Study Guide — Compute (20-25%)', sections: [
    { heading: 'Virtual Machines', content: [
      'VM <b>series</b>: B (burstable), D (general), E (memory), F (compute).',
      '<b>Managed disks</b>: Standard HDD/SSD, Premium SSD, Ultra Disk (highest IOPS).',
      '<b>ADE</b> encrypts OS/data disks via Key Vault; <b>extensions</b> automate config (Custom Script Extension).'] },
    { heading: 'VM Scale Sets & Availability', content: [
      '<b>Availability sets</b>: fault + update domains \u2192 99.95% SLA (single datacenter).',
      '<b>Availability zones</b>: physically separate datacenters \u2192 99.99% SLA.',
      '<b>VMSS</b> runs identical autoscaling instances (CPU/schedule rules; Flexible orchestration mixes sizes).'] },
    { heading: 'Containers & AKS', content: [
      '<b>ACI</b>: fast, serverless single containers (no orchestration).',
      '<b>AKS</b>: managed Kubernetes; control plane free, pay for node pools.',
      '<b>Cluster Autoscaler</b> scales nodes; <b>HPA</b> scales pods. <b>ACR</b> stores images.'] },
    { heading: 'App Service & Web Apps', content: [
      '<b>App Service</b> hosts web apps (PaaS); scale <b>up</b> (bigger plan) or <b>out</b> (more instances).',
      '<b>Deployment slots</b> enable zero-downtime swaps (Standard+ tier).'] },
    { heading: 'ARM Templates & Bicep', content: [
      '<b>ARM templates</b> = declarative JSON IaC. <b>Incremental</b> keeps existing; <b>Complete</b> deletes unlisted.',
      '<b>Bicep</b> is a readable DSL that compiles to ARM JSON (az bicep decompile converts).'] },
    { heading: '🚨 Critical Exam Scenario Cheat Sheet', content: [
      '<b>Goal \u2192 Solution</b>',
      '<ul><li>Web tier that grows with load \u2192 <b>VMSS</b> autoscale.</li><li>99.99% VM SLA \u2192 <b>Availability zones</b>.</li><li>Run a quick container \u2192 <b>ACI</b>.</li><li>Managed Kubernetes \u2192 <b>AKS</b>.</li><li>Zero-downtime web release \u2192 <b>Deployment slot swap</b>.</li><li>Repeatable infra \u2192 <b>ARM/Bicep</b> (Incremental).</li></ul>'] }
  ]},
  dom4: { title: '🌐 Domain 4 Study Guide — Networking (25-30%)', sections: [
    { heading: 'Virtual Networks & Subnets', content: [
      'A <b>VNet</b> is an isolated network; <b>subnets</b> segment it by CIDR.',
      'Azure <b>reserves 5 IPs</b> per subnet (network, 3 Azure, broadcast).',
      '<b>UDRs</b> override system routes (next-hop = virtual appliance for forced tunneling).'] },
    { heading: 'Network Security (NSG/ASG/Bastion)', content: [
      '<b>NSGs</b> filter by 5-tuple; lowest priority number wins.',
      '<b>ASGs</b> group NICs by role so rules reference roles, not IPs.',
      '<b>Azure Bastion</b> gives browser RDP/SSH (subnet must be <b>AzureBastionSubnet</b>).'] },
    { heading: 'Load Balancing & Traffic Management', content: [
      '<b>Load Balancer</b> = L4 (TCP/UDP) with health probes.',
      '<b>Application Gateway</b> = L7 with WAF, URL/host routing, SSL offload.',
      '<b>Traffic Manager</b> = DNS-based global routing (Priority/Weighted/Performance/Geographic).',
      '<b>Front Door</b> = global L7 + CDN + WAF.'] },
    { heading: 'Hybrid Connectivity (VPN/ExpressRoute)', content: [
      '<b>VPN Gateway</b>: encrypted over the internet (S2S for sites, P2S for clients).',
      '<b>ExpressRoute</b>: private circuit, never touches the public internet.',
      '<b>Azure Firewall</b> centralizes egress (FQDN rules + DNAT).'] },
    { heading: 'DNS & Private Endpoints', content: [
      '<b>Azure DNS</b> hosts public and private zones (private zones linked to VNets).',
      '<b>Private Endpoint</b> maps a PaaS service to a private IP (needs privatelink DNS zone).',
      '<b>Service Endpoint</b> extends VNet identity to PaaS over the optimized public route.'] },
    { heading: '🚨 Critical Exam Scenario Cheat Sheet', content: [
      '<b>Goal \u2192 Solution</b>',
      '<ul><li>Connect two VNets privately \u2192 <b>VNet peering</b>.</li><li>RDP without public IP \u2192 <b>Azure Bastion</b>.</li><li>Route users to nearest region \u2192 <b>Traffic Manager (Performance)</b>.</li><li>Web app firewall + path routing \u2192 <b>Application Gateway + WAF</b>.</li><li>Private, high-bandwidth on-prem link \u2192 <b>ExpressRoute</b>.</li><li>Keep PaaS traffic on the VNet \u2192 <b>Private Endpoint</b>.</li></ul>'] }
  ]},
  dom5: { title: '📈 Domain 5 Study Guide — Monitoring & Backup (10-15%)', sections: [
    { heading: 'Azure Monitor & Metrics', content: [
      '<b>Azure Monitor</b> unifies metrics and logs.',
      '<b>Metrics</b> are numeric and near-real-time; <b>Application Insights</b> monitors app performance (APM).',
      '<b>Diagnostic settings</b> route platform logs/metrics to a workspace, storage, or Event Hub.'] },
    { heading: 'Log Analytics & Alerts', content: [
      '<b>Log Analytics workspace</b> stores logs queried with <b>KQL</b> (where/summarize/project).',
      '<b>Alerts</b> fire on metric/log/activity signals \u2192 <b>action groups</b> (email, SMS, webhook, runbook).',
      'Know <b>Heartbeat</b> and <b>Perf</b> tables for VM Insights.'] },
    { heading: 'Azure Backup', content: [
      '<b>Recovery Services vault</b> stores backups; <b>backup policy</b> sets schedule + retention.',
      '<b>Soft delete</b> retains deleted backups 14 days.',
      'Enable <b>GRS</b> for cross-region restore.'] },
    { heading: 'Azure Site Recovery', content: [
      '<b>ASR</b> replicates workloads to another region for DR.',
      '<b>Recovery plans</b> orchestrate multi-VM failover order.',
      'Understand <b>RPO</b> (data-loss window) vs <b>RTO</b> (time to recover).'] },
    { heading: '🚨 Critical Exam Scenario Cheat Sheet', content: [
      '<b>Goal \u2192 Solution</b>',
      '<ul><li>Query VM performance logs \u2192 <b>Log Analytics + KQL</b>.</li><li>Notify a team on high CPU \u2192 <b>Alert rule + action group</b>.</li><li>Back up a VM \u2192 <b>Recovery Services vault</b>.</li><li>Recover accidentally deleted backup \u2192 <b>Soft delete</b> (14 days).</li><li>Fail over a region \u2192 <b>Azure Site Recovery</b>.</li><li>Restore in the paired region \u2192 <b>GRS vault + cross-region restore</b>.</li></ul>'] }
  ]}
};

/* ============================================================
   MODULE 1: STATE PERSISTENCE
   ============================================================ */
const AppState = (() => {
  const KEY = 'az104_app_state';
  let _state = { answers: {}, completedBlocks: [], weaknessLog: [], examOrder: {}, timerState: { mode: 'study', timeLeft: 1200, isRunning: false } };

  function loadState() {
    try {
      const s = localStorage.getItem(KEY);
      if (s) {
        const parsed = JSON.parse(s);
        _state = { ..._state, ...parsed, examOrder: parsed.examOrder || {} };
      }
    } catch(e) {}
    return _state;
  }
  function saveState() { try { localStorage.setItem(KEY, JSON.stringify(_state)); } catch(e) {} }
  function getAnswer(qid) { return _state.answers[qid]; }
  function setAnswer(qid, ans) { _state.answers[qid] = ans; saveState(); }
  function addCompletedBlock(bid) { if (!_state.completedBlocks.includes(bid)) { _state.completedBlocks.push(bid); saveState(); } }
  function isBlockCompleted(bid) { return _state.completedBlocks.includes(bid); }
  function addToWeaknessLog(q, domainKey) { if (!_state.weaknessLog.find(w => w.id === q.id)) { _state.weaknessLog.push({...q, domainKey}); saveState(); } }
  function removeFromWeaknessLog(qid) { _state.weaknessLog = _state.weaknessLog.filter(w => w.id !== qid); saveState(); }
  function clearDomainAnswers(domainKey) { const qs = (typeof domainQuestionDatabase!=='undefined'?domainQuestionDatabase[domainKey]:null) || []; qs.forEach(q => delete _state.answers[q.id]); saveState(); }
  function clearAllAnswers() { _state.answers = {}; saveState(); }
  function getWeaknessLog() { return _state.weaknessLog; }
  function setDomainExamOrder(domainKey, order) {
    if (order === undefined) delete _state.examOrder[domainKey];
    else _state.examOrder[domainKey] = order;
    saveState();
  }
  function getTotalBlocks() {
    let total = 0;
    Object.values(dailySchedules).forEach(day => {
      if (!day.sessions) return;
      day.sessions.forEach(s => s.blocks.forEach(b => { if (b.type === 'study') total++; }));
    });
    return total;
  }
  function getCompletedCount() { return _state.completedBlocks.length; }
  return { loadState, saveState, getAnswer, setAnswer, addCompletedBlock, isBlockCompleted, addToWeaknessLog, removeFromWeaknessLog, clearDomainAnswers, clearAllAnswers, getWeaknessLog, setDomainExamOrder, getTotalBlocks, getCompletedCount };
})();

/* ============================================================
   MODULE 2: POMODORO TIMER
   ============================================================ */
const timerEngine = (() => {
  const STUDY_TIME = 1200;
  const BREAK_TIME = 600;
  let timeLeft = STUDY_TIME;
  let mode = 'study';
  let isRunning = false;
  let intervalId = null;

  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.3);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.35);
      });
    } catch(e) {}
  }

  function render() {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    const displayEl = document.getElementById('timer-display');
    const modeEl = document.getElementById('timer-mode');
    if (displayEl) displayEl.textContent = `${mins}:${secs}`;
    if (modeEl) modeEl.textContent = mode === 'study' ? 'STUDY MODE' : 'BREAK MODE';
    if (displayEl) displayEl.style.color = mode === 'study' ? 'var(--accent)' : 'var(--green)';
  }

  function persist() {
    const s = AppState.loadState();
    s.timerState = { mode, timeLeft, isRunning };
    AppState.saveState();
  }

  function tick() {
    if (timeLeft > 0) { timeLeft--; render(); }
    else {
      playBeep();
      mode = mode === 'study' ? 'break' : 'study';
      timeLeft = mode === 'study' ? STUDY_TIME : BREAK_TIME;
      render();
      showToast(mode === 'study' ? '📚 Study time! 20 minutes' : '☕ Break time! 10 minutes');
    }
    persist();
  }

  function start() { if (!isRunning) { isRunning = true; intervalId = setInterval(tick, 1000); } }
  function pause() { isRunning = false; clearInterval(intervalId); persist(); }
  function reset() { pause(); timeLeft = mode === 'study' ? STUDY_TIME : BREAK_TIME; render(); persist(); }
  function init() {
    const s = AppState.loadState();
    if (s.timerState) { mode = s.timerState.mode || 'study'; timeLeft = s.timerState.timeLeft || STUDY_TIME; }
    render();
    document.getElementById('btn-start')?.addEventListener('click', start);
    document.getElementById('btn-pause')?.addEventListener('click', pause);
    document.getElementById('btn-reset')?.addEventListener('click', reset);
  }
  return { init, start, pause, reset };
})();

/* ============================================================
   MODULE 3: NAVIGATION ENGINE
   ============================================================ */
const domainConfig = {
  dom1: { label: '🔐 Domain 1', days: ['day1', 'day2'], sectionId: 'section-dom1', tabsId: 'dom1-tabs', contentId: 'dom1-content' },
  dom2: { label: '💾 Domain 2', days: ['day3', 'day4'], sectionId: 'section-dom2', tabsId: 'dom2-tabs', contentId: 'dom2-content' },
  dom3: { label: '💻 Domain 3', days: ['day5', 'day6', 'day7'], sectionId: 'section-dom3', tabsId: 'dom3-tabs', contentId: 'dom3-content' },
  dom4: { label: '🌐 Domain 4', days: ['day8', 'day9', 'day10'], sectionId: 'section-dom4', tabsId: 'dom4-tabs', contentId: 'dom4-content' },
  dom5: { label: '📈 Domain 5', days: ['day11', 'day12'], sectionId: 'section-dom5', tabsId: 'dom5-tabs', contentId: 'dom5-content' },
};

const navMap = {
  'nav-overview': 'section-overview',
  'nav-dom1': 'section-dom1',
  'nav-dom2': 'section-dom2',
  'nav-dom3': 'section-dom3',
  'nav-dom4': 'section-dom4',
  'nav-dom5': 'section-dom5',
  'nav-mock': 'section-mock',
  'nav-keywords': 'section-keywords',
  'nav-errorlog': 'section-errorlog',
  'nav-cheat': 'section-cheat',
};

function switchView(sectionId, navId) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');
  if (navId) { const nav = document.getElementById(navId); if (nav) nav.classList.add('active'); }
  if (sectionId === 'section-errorlog') renderWeaknessLog();
  window.location.hash = navId ? navId.replace('nav-', '') : '';
}

/* ============================================================
   RENDER HELPERS: DAY CONTENT, STUDY BLOCKS, LABS
   ============================================================ */
function renderStudyBlock(block, blockId) {
  const done = AppState.isBlockCompleted(blockId);
  const badgeText = block.stopBadge || (block.stop ? '🛑 STOP &amp; PRACTICE' : '');
  const stopBadge = badgeText ? `<span class="stop-badge" style="background:var(--red-bg);color:var(--red);padding:2px 8px;border-radius:6px;font-size:.7rem;font-weight:600;margin-left:.5rem">🛑 ${escHtml(badgeText)}</span>` : '';
  const title = block.topic || block.title || 'Study block';
  const durText = typeof block.duration === 'number' ? block.duration + ' min' : (block.duration || '20 min');
  let videoUrl = '', videoLabel = '';
  if (block.video && typeof block.video === 'object') { videoUrl = block.video.url; videoLabel = block.video.label || '▶ Watch'; }
  else if (typeof block.video === 'string') { videoUrl = block.video; videoLabel = '▶ Watch: ' + title; }
  const video = videoUrl ? `<a class="lab-link" href="${escHtml(videoUrl)}" target="_blank" rel="noopener">${escHtml(videoLabel)}</a>` : '';
  const quizlet = `<a class="lab-link" href="${escHtml(quizletLink(title))}" target="_blank" rel="noopener">📚 Quizlet: ${escHtml(title)}</a>`;
  const points = (block.points || []).map(p => `<li class="keypoint-item">${escHtml(p)}</li>`).join('');
  const body = points ? `<div class="study-block-body"><ul class="keypoints-list">${points}</ul></div>` : '';
  return `
    <div class="study-block" id="block-${escHtml(blockId)}">
      <div class="study-block-header">
        <span class="session-name">${escHtml(title)}</span>${stopBadge}
      </div>
      ${body}
      <div class="study-block-meta">⏱ ${escHtml(durText)}</div>
      <div class="study-block-actions">
        ${video}
        ${quizlet}
        <button class="mark-complete-btn${done ? ' completed' : ''}" data-block="${escHtml(blockId)}">
          ${done ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>`;
}

function renderLabCard(lab) {
  if (!lab) return '';
  const repo = lab.repoLink || lab.repo || '';
  const isHash = repo && repo.startsWith('#');
  const repoLink = repo
    ? `<a class="lab-link" href="${escHtml(repo)}" ${isHash ? '' : 'target="_blank" rel="noopener"'}>${isHash ? '➡ Open in app' : '🔗 GitHub Lab Repo'}</a>`
    : '';
  const commands = lab.cliCommands || lab.commands || [];
  const cmds = commands.map(c => `
    <div class="cli-command">
      <code>${escHtml(c)}</code>
      <button class="copy-btn" data-copy="${escHtml(c)}">Copy</button>
    </div>`).join('');
  const heading = (lab.number ? escHtml(lab.number) + ' — ' : '') + escHtml(lab.title || 'Hands-on Lab');
  return `
    <div class="lab-card">
      <div class="session-name">🧪 ${heading}</div>
      ${repoLink}
      <div class="cli-block">${cmds}</div>
    </div>`;
}

function renderDayContent(dayKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const day = dailySchedules[dayKey];
  if (!day) { container.innerHTML = '<div class="card">No content for this day.</div>'; return; }
  let html = `<div class="card"><h2 class="section-heading">${escHtml(day.title)}</h2></div>`;

  (day.sessions || []).forEach((session, si) => {
    html += `<div class="session-card"><div class="session-name">${escHtml(session.name)}</div>`;
    (session.blocks || []).forEach((block, bi) => {
      if (block.type === 'break') {
        const bl = block.label || `☕ ${typeof block.duration === 'number' ? block.duration + '-min' : ''} break — stretch, hydrate, review notes`;
        html += `<div class="break-block">${escHtml(bl)}</div>`;
      } else {
        html += renderStudyBlock(block, `${dayKey}-s${si}-b${bi}`);
      }
    });
    if (session.lab) html += renderLabCard(session.lab);
    html += `</div>`;
  });
  if (day.lab) html += renderLabCard(day.lab);

  const kp = dayKeyPoints[dayKey];
  if (kp) {
    html += `<div class="keypoints-card"><h3 class="sg-heading">🎯 ${escHtml(kp.title)}</h3><ul class="keypoints-list">`;
    (kp.keyPoints || []).forEach(p => { html += `<li class="keypoint-item">${escHtml(p)}</li>`; });
    html += `</ul></div>`;
    if (kp.cheatSheet && kp.cheatSheet.length) {
      html += `<div class="cheatsheet-card"><h3 class="sg-heading">⚡ Quick CLI</h3><table class="cheatsheet-table"><tbody>`;
      kp.cheatSheet.forEach(row => {
        html += `<tr><td class="cheat-cmd"><code>${escHtml(row[0])}</code></td><td class="cheat-desc">${escHtml(row[1])}</td></tr>`;
      });
      html += `</tbody></table></div>`;
    }
    if (kp.quizlet && kp.quizlet.length) {
      html += `<div class="quizlet-card"><div class="session-name">📚 Review Topics</div><div class="quizlet-links">`;
      kp.quizlet.forEach(t => { html += `<a class="quizlet-link" href="${escHtml(quizletLink(t))}" target="_blank" rel="noopener">${escHtml(t)}</a>`; });
      html += `</div></div>`;
    }
  }

  container.innerHTML = html;
  wireBlockButtons(container);
  wireCopyButtons(container);
}

function wireBlockButtons(scope) {
  (scope || document).querySelectorAll('.mark-complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bid = btn.getAttribute('data-block');
      AppState.addCompletedBlock(bid);
      btn.classList.add('completed');
      btn.textContent = '✓ Completed';
      calculateProgress();
      showToast('✓ Block marked complete');
    });
  });
}

function wireCopyButtons(scope) {
  (scope || document).querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      copyText(btn.getAttribute('data-copy'));
      btn.classList.add('copied');
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.classList.remove('copied'); btn.textContent = orig; }, 1500);
    });
  });
}

/* ============================================================
   RENDER HELPERS: DOMAIN TABS
   ============================================================ */
function renderDomainTabs(domainKey) {
  const cfg = domainConfig[domainKey];
  if (!cfg) return;
  const tabsEl = document.getElementById(cfg.tabsId);
  const contentEl = document.getElementById(cfg.contentId);
  if (!tabsEl || !contentEl) return;

  const tabs = [];
  const sched = SCHED();
  cfg.days.forEach((dayKey, i) => {
    const title = (sched[dayKey] && sched[dayKey].title) ? sched[dayKey].title : '';
    const label = title ? title.split(':')[0].trim() : (dayKey.replace('day', 'Day '));
    tabs.push({ id: 'day-' + dayKey, label: '📅 ' + label, render: () => renderDayContent(dayKey, cfg.contentId) });
  });
  tabs.push({ id: 'exam-' + domainKey, label: '📝 Practice Exam (' + (QDB()[domainKey] || []).length + ' Qs)', render: () => renderDomainExam(domainKey, cfg.contentId) });
  tabs.push({ id: 'guide-' + domainKey, label: '📖 Study Guide', render: () => renderDomainStudyGuide(domainKey, cfg.contentId) });

  tabsEl.innerHTML = tabs.map((t, i) => `<button class="day-tab${i === 0 ? ' active' : ''}" data-tab="${t.id}">${escHtml(t.label)}</button>`).join('');
  tabsEl.querySelectorAll('.day-tab').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabs[i].render();
    });
  });
  tabs[0].render();
}

/* ============================================================
   MODULE 9 (render): DOMAIN STUDY GUIDES
   ============================================================ */
function renderDomainStudyGuide(domainKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const guide = domainStudyGuides[domainKey];
  if (!guide) { container.innerHTML = '<div class="card">No study guide available.</div>'; return; }
  let html = `<div class="study-guide"><h2 class="page-title">${escHtml(guide.title)}</h2>`;
  (guide.sections || []).forEach(sec => {
    html += `<div class="sg-section"><h3 class="sg-heading">${escHtml(sec.heading)}</h3><div class="sg-content">`;
    (sec.content || []).forEach(c => { html += `<p>${c}</p>`; });
    html += `</div></div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

/* ============================================================
   MODULE 4: EXAM ENGINE
   ============================================================ */
function renderQuestionCard(q, domainKey, index) {
  const card = document.createElement('div');
  card.className = 'question-card';
  card.id = 'qcard-' + q.id;

  const prev = AppState.getAnswer(q.id);

  const header = document.createElement('div');
  header.className = 'question-header';

  const topicWrap = document.createElement('span');
  topicWrap.className = 'topic-summary';

  const revealBtn = document.createElement('button');
  revealBtn.className = 'reveal-topic-btn';
  revealBtn.textContent = '\u25b6 Reveal';
  revealBtn.setAttribute('aria-label', 'Reveal question topic');

  const topicText = document.createElement('span');
  topicText.className = 'topic-hidden';
  topicText.textContent = q.scenarioTag || '';

  revealBtn.addEventListener('click', function () {
    revealBtn.style.display = 'none';
    topicText.style.display = 'inline';
  });

  topicWrap.appendChild(revealBtn);
  topicWrap.appendChild(topicText);

  const metaWrap = document.createElement('div');
  metaWrap.className = 'question-meta';

  const qNum = document.createElement('span');
  qNum.textContent = 'Q' + (index + 1);
  qNum.setAttribute('aria-label', 'Question ' + (index + 1));

  const difficulty = qDifficulty(q, domainKey);
  const difficultyBadge = document.createElement('span');
  difficultyBadge.className = 'difficulty-badge ' + difficulty.className;
  difficultyBadge.textContent = difficulty.label;

  metaWrap.appendChild(qNum);
  metaWrap.appendChild(difficultyBadge);

  header.appendChild(topicWrap);
  header.appendChild(metaWrap);
  card.appendChild(header);

  const qtext = document.createElement('div');
  qtext.className = 'question-text';
  qtext.innerHTML = escHtml(q.question);
  card.appendChild(qtext);

  const optsList = document.createElement('div');
  optsList.className = 'options-list';
  const optionEls = [];

  const explanationEl = document.createElement('div');
  explanationEl.className = 'explanation-card';
  explanationEl.style.display = 'none';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<b>${String.fromCharCode(65 + i)}.</b> ${escHtml(opt)}`;
    btn.addEventListener('click', () => handleAnswer(q.id, i, q, domainKey, optionEls, explanationEl));
    optionEls.push(btn);
    optsList.appendChild(btn);
  });
  card.appendChild(optsList);
  card.appendChild(explanationEl);

  if (prev !== undefined) lockAnswer(q, prev, optionEls, explanationEl);

  return card;
}

function lockAnswer(q, selectedIdx, optionEls, explanationEl) {
  optionEls.forEach((el, i) => {
    el.classList.add('disabled');
    el.disabled = true;
    if (i === q.correct) el.classList.add('correct');
    if (i === selectedIdx && selectedIdx !== q.correct) el.classList.add('wrong');
  });
  const isCorrect = selectedIdx === q.correct;
  explanationEl.style.display = 'block';
  explanationEl.className = 'explanation-card ' + (isCorrect ? 'correct' : 'wrong');
  explanationEl.innerHTML = `<b>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</b> ${qExplanation(q)}` +
    (qVideo(q) ? ` <a class="missed-video-link" href="${escHtml(qVideo(q))}" target="_blank" rel="noopener">▶ Watch explainer</a>` : '');
}

function handleAnswer(qid, selectedIdx, q, domainKey, optionEls, explanationEl) {
  if (AppState.getAnswer(qid) !== undefined) return;
  AppState.setAnswer(qid, selectedIdx);
  lockAnswer(q, selectedIdx, optionEls, explanationEl);
  if (selectedIdx !== q.correct) {
    AppState.addToWeaknessLog(q, domainKey);
  } else {
    AppState.removeFromWeaknessLog(q.id);
  }
}

function renderDomainExam(domainKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const questions = getDomainExamQuestions(domainKey);
  container.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'exam-container';

  const intro = document.createElement('div');
  intro.className = 'card';
  intro.innerHTML = `<h2 class="section-heading">📝 Practice Exam — ${escHtml(domainConfig[domainKey] ? domainConfig[domainKey].label : domainKey)}</h2>
    <p class="page-subtitle">${questions.length} questions. Answer each to lock in and reveal the explanation.</p>`;
  wrap.appendChild(intro);

  questions.forEach((q, i) => wrap.appendChild(renderQuestionCard(q, domainKey, i)));

  const submitArea = document.createElement('div');
  submitArea.className = 'exam-submit-area';
  submitArea.innerHTML = `
    <button class="submit-quiz-btn btn btn-accent" id="submit-${domainKey}">Submit &amp; Grade</button>
    <button class="btn btn-outline" id="reshuffle-${domainKey}">🔀 Reshuffle Questions</button>
    <button class="btn btn-outline" id="clear-${domainKey}">↺ Clear Answers</button>
    <div id="grade-${domainKey}"></div>`;
  wrap.appendChild(submitArea);
  container.appendChild(wrap);

  document.getElementById('submit-' + domainKey)?.addEventListener('click', () => submitQuiz(domainKey, questions, 'grade-' + domainKey));
  document.getElementById('reshuffle-' + domainKey)?.addEventListener('click', () => reshuffleDomainExam(domainKey, containerId));
  document.getElementById('clear-' + domainKey)?.addEventListener('click', () => clearDomainAnswers(domainKey, containerId));
}

function buildGradeReport(questions, domainLabel) {
  let answered = 0, correct = 0;
  const missed = [];
  questions.forEach(q => {
    const a = AppState.getAnswer(q.id);
    if (a !== undefined) {
      answered++;
      if (a === q.correct) correct++; else missed.push(q);
    }
  });
  const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  let cls = 'grade-fail', badge = 'Keep studying';
  if (pct >= 80) { cls = 'grade-pass'; badge = 'PASS'; }
  else if (pct >= 60) { cls = 'grade-warn'; badge = 'Almost there'; }

  let html = `<div class="grade-report">
    <div class="grade-score ${cls}">${pct}% — ${badge}</div>
    <div class="topic-summary">${correct}/${questions.length} correct · ${answered} answered</div>`;
  if (missed.length) {
    html += `<div class="missed-section"><h3 class="sg-heading">❌ Missed Questions</h3>`;
    missed.forEach(q => {
      html += `<div class="missed-item">
        <div class="question-text">${escHtml(q.question)}</div>
        <div class="callout correct">Correct: <b>${escHtml(q.options[q.correct] || '')}</b></div>
        <div class="topic-summary">${qExplanation(q)}</div>
        ${qVideo(q) ? `<a class="missed-video-link" href="${escHtml(qVideo(q))}" target="_blank" rel="noopener">▶ Watch explainer</a>` : ''}
      </div>`;
    });
    html += `</div>`;
  } else if (answered) {
    html += `<div class="callout correct">🎉 Perfect on answered questions!</div>`;
  }
  html += `</div>`;
  return html;
}

function submitQuiz(domainKey, questions, gradeContainerId) {
  const el = document.getElementById(gradeContainerId);
  if (!el) return;
  el.innerHTML = buildGradeReport(questions, domainConfig[domainKey] ? domainConfig[domainKey].label : domainKey);
  renderWeaknessLog();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearDomainAnswers(domainKey, containerId) {
  AppState.clearDomainAnswers(domainKey);
  renderDomainExam(domainKey, containerId);
  showToast('↺ Answers cleared');
}

function reshuffleDomainExam(domainKey, containerId) {
  const questions = shuffleList(QDB()[domainKey] || []);
  setDomainExamQuestions(domainKey, questions);
  renderDomainExam(domainKey, containerId);
  showToast('🔀 Questions reshuffled');
}

/* ============================================================
   MODULE 5: PROGRESS CALCULATION
   ============================================================ */
function calculateProgress() {
  const total = AppState.getTotalBlocks();
  const done = AppState.getCompletedCount();
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progressText');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = pct + '% Complete';
}

/* ============================================================
   MODULE 6: WEAKNESS LOG
   ============================================================ */
function renderWeaknessLog() {
  const container = document.getElementById('errorLogContainer');
  const retryArea = document.getElementById('retry-area');
  if (!container) return;
  const log = AppState.getWeaknessLog();
  if (!log.length) {
    container.innerHTML = '<div class="error-log-empty">✅ No weak areas yet — keep practicing!</div>';
    if (retryArea) retryArea.innerHTML = '';
    return;
  }
  container.innerHTML = log.map(q => `
    <div class="error-log-entry">
      <div class="error-scenario-tag">${escHtml(q.scenarioTag || '')}</div>
      <div class="error-question">${escHtml(q.question)}</div>
      <div class="error-correct">Correct answer: <b>${escHtml(q.options[q.correct] || '')}</b></div>
    </div>
  `).join('');
  if (retryArea) {
    retryArea.innerHTML = '<button class="btn btn-accent" id="btn-retry-weak">🔄 Retry Weak Questions</button> <button class="btn btn-danger" id="btn-clear-weak">🗑 Clear Log</button><div id="retry-quiz-area" style="margin-top:1.5rem"></div>';
    document.getElementById('btn-retry-weak')?.addEventListener('click', renderRetryQuiz);
    document.getElementById('btn-clear-weak')?.addEventListener('click', () => {
      AppState.getWeaknessLog().slice().forEach(q => AppState.removeFromWeaknessLog(q.id));
      renderWeaknessLog();
      showToast('🗑 Weakness log cleared');
    });
  }
}

function renderRetryQuiz() {
  const area = document.getElementById('retry-quiz-area');
  if (!area) return;
  const log = AppState.getWeaknessLog().slice();
  if (!log.length) { area.innerHTML = ''; return; }
  area.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'exam-container';
  log.forEach((q, i) => {
    const dk = q.domainKey || 'dom1';
    AppState.setAnswer(q.id, undefined);
    delete AppState.loadState().answers[q.id];
    wrap.appendChild(renderQuestionCard(q, dk, i));
  });
  area.appendChild(wrap);
  area.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   MODULE 7: KEYWORD SPEED DRILL (35 terms)
   ============================================================ */
const keywordDeck = [
  { term: 'Dynamic Membership', def: 'Group whose members are added/removed automatically via attribute rules (needs Entra ID P1).' },
  { term: 'RBAC', def: 'Role-Based Access Control — grants least-privilege permissions at MG/Sub/RG/Resource scope.' },
  { term: 'Conditional Access', def: 'Policy engine (P1) that enforces access controls (MFA, device) based on signals like user, location, risk.' },
  { term: 'SSPR', def: 'Self-Service Password Reset — lets users reset their own passwords after registering auth methods.' },
  { term: 'LRS', def: 'Locally Redundant Storage — 3 copies within a single datacenter.' },
  { term: 'GRS', def: 'Geo-Redundant Storage — LRS plus asynchronous replication to a paired region.' },
  { term: 'ZRS', def: 'Zone-Redundant Storage — 3 copies across separate availability zones in one region.' },
  { term: 'GZRS', def: 'Geo-Zone-Redundant Storage — ZRS in the primary region plus replication to a paired region.' },
  { term: 'SAS Token', def: 'Shared Access Signature — a scoped, time-limited URL granting delegated access to storage.' },
  { term: 'Blob Tiers', def: 'Hot, Cool, Cold, Archive — cost/latency tiers; Archive is offline and needs rehydration.' },
  { term: 'ARM Template', def: 'Declarative JSON Infrastructure-as-Code for repeatable Azure deployments.' },
  { term: 'Bicep', def: 'A concise DSL that compiles to ARM JSON; cleaner authoring for IaC.' },
  { term: 'Availability Zone', def: 'Physically separate datacenter within a region; enables 99.99% VM SLA.' },
  { term: 'VMSS', def: 'Virtual Machine Scale Set — identical autoscaling VM instances behind a load balancer.' },
  { term: 'NSG', def: 'Network Security Group — filters traffic by 5-tuple rules; lowest priority number wins.' },
  { term: 'VNet Peering', def: 'Private, low-latency connection between two VNets; non-transitive.' },
  { term: 'Private Endpoint', def: 'A private IP on your VNet that maps to a PaaS service via Azure Private Link.' },
  { term: 'VPN Gateway', def: 'Encrypted connectivity over the internet — Site-to-Site or Point-to-Site.' },
  { term: 'ExpressRoute', def: 'Private, dedicated circuit to Azure that bypasses the public internet.' },
  { term: 'Application Gateway', def: 'Layer-7 load balancer with WAF, URL/host routing and SSL offload.' },
  { term: 'Azure Monitor', def: 'Unified platform that collects metrics and logs for observability.' },
  { term: 'Log Analytics', def: 'Workspace that stores logs queried with KQL; target of diagnostic settings.' },
  { term: 'Recovery Services Vault', def: 'Container that stores Azure Backup and Site Recovery data.' },
  { term: 'Azure Site Recovery', def: 'ASR — replicates workloads to another region for disaster recovery failover.' },
  { term: 'Azure Policy', def: 'Enforces org standards with effects like Deny, Audit, and DeployIfNotExists.' },
  { term: 'PIM', def: 'Privileged Identity Management (P2) — just-in-time, time-bound privileged role activation.' },
  { term: 'Azure Bastion', def: 'Browser-based RDP/SSH to VMs without public IPs (needs AzureBastionSubnet).' },
  { term: 'Service Endpoint', def: 'Extends VNet identity to a PaaS service over the optimized public route.' },
  { term: 'Azure DNS', def: 'Hosts public and private DNS zones; private zones resolve within linked VNets.' },
  { term: 'Traffic Manager', def: 'DNS-based global routing (Priority, Weighted, Performance, Geographic).' },
  { term: 'Azure Firewall', def: 'Managed, stateful network firewall for central egress control (FQDN rules, DNAT).' },
  { term: 'CIDR', def: 'Classless Inter-Domain Routing notation (e.g., /24) defining subnet size.' },
  { term: 'Managed Identity', def: 'Entra identity for Azure resources to access services without stored credentials.' },
  { term: 'Azure AD B2B', def: 'Invite external users as guests to collaborate using their own identities.' },
  { term: 'Azure AD B2C', def: 'Customer identity and access management for consumer-facing apps.' },
  { term: 'Resource Lock', def: 'CanNotDelete or ReadOnly lock protecting resources from accidental change.' },
  { term: 'Management Group', def: 'Container above subscriptions for applying policy and RBAC at scale.' },
  { term: 'Administrative Unit', def: 'Scopes admin permissions to a subset of users/groups (e.g., a region).' }
];

function renderKeywordDrill() {
  const grid = document.getElementById('keyword-grid');
  if (!grid) return;
  grid.innerHTML = keywordDeck.map((k, i) => `
    <div class="keyword-card" data-kw="${i}">
      <div class="keyword-front">${escHtml(k.term)}<br><small style="color:var(--text-muted)">tap to flip</small></div>
      <div class="keyword-back">${escHtml(k.def)}</div>
    </div>`).join('');
  grid.querySelectorAll('.keyword-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* ============================================================
   MODULE 8: CLI & SUBNETTING CHEAT SHEET
   ============================================================ */
const cliCategories = [
  { name: '🔐 az identity', commands: [
    'az ad user create --display-name "Jane" --user-principal-name jane@contoso.com --password "P@ss!"',
    'az ad group create --display-name Engineers --mail-nickname engineers',
    'az ad group member add --group Engineers --member-id <objectId>',
    'az role assignment create --assignee jane@contoso.com --role Reader --scope /subscriptions/<id>',
    'az policy assignment create --name allowed-locs --policy <policyId>'
  ]},
  { name: '💾 az storage', commands: [
    'az storage account create --name mystg --resource-group rg1 --sku Standard_GRS --kind StorageV2',
    'az storage container create --name data --account-name mystg',
    'az storage blob upload --account-name mystg --container-name data --name f.txt --file ./f.txt',
    'az storage share create --name share1 --account-name mystg',
    'az storage container generate-sas --account-name mystg --name data --permissions rl --expiry 2025-12-31'
  ]},
  { name: '💻 az compute', commands: [
    'az vm create --resource-group rg1 --name vm1 --image Ubuntu2204 --generate-ssh-keys',
    'az vmss create --resource-group rg1 --name vmss1 --image Ubuntu2204 --instance-count 2',
    'az aks create --resource-group rg1 --name aks1 --node-count 2 --generate-ssh-keys',
    'az webapp create --resource-group rg1 --plan plan1 --name myapp',
    'az container create --resource-group rg1 --name ci1 --image mcr.microsoft.com/hello-world'
  ]},
  { name: '🌐 az network', commands: [
    'az network vnet create --resource-group rg1 --name vnet1 --address-prefix 10.0.0.0/16 --subnet-name sub1 --subnet-prefix 10.0.0.0/24',
    'az network nsg create --resource-group rg1 --name nsg1',
    'az network application-gateway create --resource-group rg1 --name agw1 --sku Standard_v2 --public-ip-address pip1 --vnet-name vnet1 --subnet sub1',
    'az network vnet-gateway create --resource-group rg1 --name vpngw1 --vnet vnet1 --gateway-type Vpn --sku VpnGw1'
  ]},
  { name: '📈 az monitor', commands: [
    'az monitor metrics list --resource <resourceId> --metric "Percentage CPU"',
    'az monitor log-analytics workspace create --resource-group rg1 --workspace-name law1',
    'az monitor action-group create --resource-group rg1 --name ag1 --short-name ops',
    'az backup vault create --resource-group rg1 --name rsv1 --location eastus',
    'az backup protection enable-for-vm --resource-group rg1 --vault-name rsv1 --vm vm1 --policy-name DefaultPolicy'
  ]}
];

const cidrTable = [
  ['/24', '255.255.255.0', '254'],
  ['/25', '255.255.255.128', '126'],
  ['/26', '255.255.255.192', '62'],
  ['/27', '255.255.255.224', '30'],
  ['/28', '255.255.255.240', '14'],
  ['/29', '255.255.255.248', '6']
];

function renderCheatSheet() {
  const container = document.getElementById('cheat-content');
  if (!container) return;
  let html = '';
  cliCategories.forEach(cat => {
    html += `<div class="cheat-category card"><h3 class="sg-heading">${escHtml(cat.name)}</h3>`;
    cat.commands.forEach(cmd => {
      html += `<div class="code-block"><code>${escHtml(cmd)}</code><button class="copy-btn" data-copy="${escHtml(cmd)}">Copy</button></div>`;
    });
    html += `</div>`;
  });
  html += `<div class="cheat-category card"><h3 class="sg-heading">🧮 CIDR Quick Reference</h3>
    <table class="cheat-table"><thead><tr><th>CIDR</th><th>Subnet Mask</th><th>Usable Hosts</th></tr></thead><tbody>`;
  cidrTable.forEach(r => {
    html += `<tr><td class="cheat-cmd"><code>${escHtml(r[0])}</code></td><td class="cheat-desc">${escHtml(r[1])}</td><td>${escHtml(r[2])}</td></tr>`;
  });
  html += `</tbody></table>
    <p class="topic-summary">Azure reserves 5 IPs per subnet, so usable Azure hosts = (hosts − 5) for the smaller subnets.</p></div>`;
  container.innerHTML = html;
  wireCopyButtons(container);
}

/* ============================================================
   MOCK REVIEW (Days 13–14 + full exam)
   ============================================================ */
function renderMockDays() {
  const tabsEl = document.getElementById('mock-tabs');
  const contentEl = document.getElementById('mock-content');
  if (!tabsEl || !contentEl) return;

  const tabs = [
    { id: 'mock-exam', label: '📝 Full Practice Exam', render: renderMockExam },
    { id: 'mock-day13', label: '📅 Day 13 — Mock', render: () => renderDayContent('day13', 'mock-content') },
    { id: 'mock-day14', label: '📅 Day 14 — Final Review', render: () => renderDayContent('day14', 'mock-content') }
  ];
  tabsEl.innerHTML = tabs.map((t, i) => `<button class="day-tab${i === 0 ? ' active' : ''}" data-tab="${t.id}">${escHtml(t.label)}</button>`).join('');
  tabsEl.querySelectorAll('.day-tab').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabs[i].render();
    });
  });
  tabs[0].render();
}

function renderMockExam() {
  const container = document.getElementById('mock-content');
  if (!container) return;
  const questions = allQuestions();
  container.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'exam-container';
  const intro = document.createElement('div');
  intro.className = 'card';
  intro.innerHTML = `<h2 class="section-heading">📝 Full Mock Exam</h2>
    <p class="page-subtitle">${questions.length} questions across all 5 domains. Simulate the real exam, then submit for a grade report.</p>`;
  wrap.appendChild(intro);

  questions.forEach((q, i) => wrap.appendChild(renderQuestionCard(q, (String(q.id).split('-')[0]) || MOCK_DOMAINS[0], i)));

  const submitArea = document.createElement('div');
  submitArea.className = 'exam-submit-area';
  submitArea.innerHTML = `
    <button class="submit-quiz-btn btn btn-accent" id="submit-mock">Submit &amp; Grade</button>
    <button class="btn btn-outline" id="clear-mock">↺ Clear Answers</button>
    <div id="grade-mock"></div>`;
  wrap.appendChild(submitArea);
  container.appendChild(wrap);

  document.getElementById('submit-mock')?.addEventListener('click', () => submitQuiz('mock', questions, 'grade-mock'));
  document.getElementById('clear-mock')?.addEventListener('click', () => {
    AppState.clearAllAnswers();
    renderMockExam();
    showToast('↺ Mock answers cleared');
  });
}

/* ============================================================
   MODULE 10: INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  AppState.loadState();
  timerEngine.init();

  Object.entries(navMap).forEach(([navId, sectionId]) => {
    const el = document.getElementById(navId);
    if (el) el.addEventListener('click', (e) => { e.preventDefault(); switchView(sectionId, navId); });
  });

  const dlcMap = { 'dlc-dom1': ['section-dom1', 'nav-dom1'], 'dlc-dom2': ['section-dom2', 'nav-dom2'], 'dlc-dom3': ['section-dom3', 'nav-dom3'], 'dlc-dom4': ['section-dom4', 'nav-dom4'], 'dlc-dom5': ['section-dom5', 'nav-dom5'] };
  Object.entries(dlcMap).forEach(([cardId, [secId, navId]]) => {
    document.getElementById(cardId)?.addEventListener('click', () => switchView(secId, navId));
  });

  Object.entries(domainConfig).forEach(([domainKey]) => {
    renderDomainTabs(domainKey);
  });
  renderMockDays();
  renderKeywordDrill();
  renderCheatSheet();
  renderWeaknessLog();
  calculateProgress();

  const hash = window.location.hash.replace('#', '');
  if (hash && navMap['nav-' + hash]) switchView(navMap['nav-' + hash], 'nav-' + hash);

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    if (h && navMap['nav-' + h]) switchView(navMap['nav-' + h], 'nav-' + h);
  });
});
