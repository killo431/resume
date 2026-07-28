// AZ-104 Study App — Task 3: 125 Scenario-Based Exam Questions
// Auto-generated. Variable: domainQuestionDatabase (dom1..dom5, 25 each)
const domainQuestionDatabase = {
  "dom1": [
    {
      "id": "dom1-q1",
      "scenarioTag": "Dynamic Groups",
      "question": "Contoso needs Entra ID group membership to update automatically whenever a user's department attribute changes. What should you configure?",
      "options": [
        "A security group with dynamic user membership using a membership rule",
        "An assigned security group with manually added members",
        "A Microsoft 365 group with assigned membership",
        "A mail-enabled distribution group"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> A dynamic user group evaluates a rule such as user.department -eq \"Sales\" and Entra ID automatically adds or removes members as attributes change. <b>Wrong-Answer Breakdown:</b><ul><li><b>An assigned security group with manually added members:</b> Assigned membership requires an admin to add or remove users; it never reacts to attribute changes.</li><li><b>A Microsoft 365 group with assigned membership:</b> M365 groups add collaboration features but assigned membership is still manual, so department changes are not applied.</li><li><b>A mail-enabled distribution group:</b> Distribution groups are only used for email delivery and do not support dynamic membership rules.</li></ul>"
    },
    {
      "id": "dom1-q2",
      "scenarioTag": "RBAC Reader",
      "question": "A company has an auditor who must view every resource in a subscription but must never change anything. Which built-in role should you assign?",
      "options": [
        "Contributor",
        "Reader",
        "Owner",
        "User Access Administrator"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Reader grants view-only access to all resources in the assigned scope without any write or delete permission. <b>Wrong-Answer Breakdown:</b><ul><li><b>Contributor:</b> Contributor can create and modify resources, which exceeds view-only requirements.</li><li><b>Owner:</b> Owner has full control including assigning access, far more than read-only.</li><li><b>User Access Administrator:</b> This role manages access assignments, not general resource viewing.</li></ul>"
    },
    {
      "id": "dom1-q3",
      "scenarioTag": "Custom RBAC",
      "question": "You are configuring access so a team can restart VMs but cannot create or delete them, and no built-in role fits exactly. What should you do?",
      "options": [
        "Assign the Contributor role",
        "Assign the Virtual Machine Contributor role",
        "Create a custom RBAC role with only the required Microsoft.Compute actions and assign it",
        "Use a Conditional Access policy"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> A custom role lets you specify exactly Actions like Microsoft.Compute/virtualMachines/restart/action while omitting create/delete, satisfying least privilege. <b>Wrong-Answer Breakdown:</b><ul><li><b>Assign the Contributor role:</b> Contributor allows creating and deleting VMs, violating least privilege.</li><li><b>Assign the Virtual Machine Contributor role:</b> This built-in role still permits create and delete of VMs, more than restart.</li><li><b>Use a Conditional Access policy:</b> Conditional Access governs sign-in conditions, not granular resource operations.</li></ul>"
    },
    {
      "id": "dom1-q4",
      "scenarioTag": "Conditional Access",
      "question": "Contoso wants to require MFA only when users sign in from outside the corporate network. What should you implement?",
      "options": [
        "Enable Security Defaults",
        "Per-user MFA for all users",
        "A resource lock on the tenant",
        "A Conditional Access policy with a named location condition requiring MFA"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Conditional Access can evaluate named locations and grant access only if MFA is satisfied when the sign-in comes from outside trusted IP ranges. <b>Wrong-Answer Breakdown:</b><ul><li><b>Enable Security Defaults:</b> Security Defaults enforce MFA broadly and cannot be scoped by location.</li><li><b>Per-user MFA for all users:</b> Legacy per-user MFA always prompts and cannot be conditioned on network location.</li><li><b>A resource lock on the tenant:</b> Resource locks prevent resource changes and have nothing to do with sign-in MFA.</li></ul>"
    },
    {
      "id": "dom1-q5",
      "scenarioTag": "SSPR",
      "question": "A company wants employees to reset their own passwords without calling the help desk, using a phone and email. What should you enable?",
      "options": [
        "Self-service password reset (SSPR) with the required authentication methods",
        "Privileged Identity Management",
        "Conditional Access",
        "Access reviews"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> SSPR lets users reset passwords after verifying registered methods such as phone and email, reducing help-desk load. <b>Wrong-Answer Breakdown:</b><ul><li><b>Privileged Identity Management:</b> PIM handles just-in-time role activation, not end-user password resets.</li><li><b>Conditional Access:</b> Conditional Access controls access conditions and cannot reset passwords.</li><li><b>Access reviews:</b> Access reviews recertify access; they do not provide password reset.</li></ul>"
    },
    {
      "id": "dom1-q6",
      "scenarioTag": "Azure Policy Deny",
      "question": "You are configuring governance so that no storage account can be created without HTTPS-only enabled across a subscription. What should you use?",
      "options": [
        "A resource lock of type CanNotDelete",
        "An Azure Policy with a Deny effect assigned at the subscription scope",
        "An RBAC deny assignment created manually",
        "A tag policy"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> An Azure Policy with Deny blocks creation of non-compliant resources at evaluation time, enforcing HTTPS-only everywhere in scope. <b>Wrong-Answer Breakdown:</b><ul><li><b>A resource lock of type CanNotDelete:</b> Locks prevent deletion or changes but do not enforce configuration rules.</li><li><b>An RBAC deny assignment created manually:</b> Manual deny assignments are limited and not the tool for enforcing property values.</li><li><b>A tag policy:</b> A tag policy governs tagging, not the secure-transfer property.</li></ul>"
    },
    {
      "id": "dom1-q7",
      "scenarioTag": "Management Groups",
      "question": "Contoso has 30 subscriptions and wants a single policy applied to all of them at once. What should you configure?",
      "options": [
        "Assign the policy to each subscription individually",
        "A single large resource group spanning subscriptions",
        "A management group containing the subscriptions with the policy assigned there",
        "An Azure Blueprint per subscription"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Management groups let you organize subscriptions hierarchically and assign policy or RBAC once so it inherits to all child subscriptions. <b>Wrong-Answer Breakdown:</b><ul><li><b>Assign the policy to each subscription individually:</b> This works but is error-prone and not the single-point solution requested.</li><li><b>A single large resource group spanning subscriptions:</b> Resource groups cannot span subscriptions.</li><li><b>An Azure Blueprint per subscription:</b> Blueprints are being deprecated and still require per-subscription effort.</li></ul>"
    },
    {
      "id": "dom1-q8",
      "scenarioTag": "Resource Locks",
      "question": "A company must prevent accidental deletion of a critical resource group while still allowing configuration changes. Which lock should you apply?",
      "options": [
        "A ReadOnly lock on the resource group",
        "A Deny Azure Policy",
        "Remove all Contributor role assignments",
        "A CanNotDelete lock on the resource group"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> A CanNotDelete lock allows read and modify operations but blocks deletion, exactly matching the requirement. <b>Wrong-Answer Breakdown:</b><ul><li><b>A ReadOnly lock on the resource group:</b> ReadOnly also blocks configuration changes, which are still required.</li><li><b>A Deny Azure Policy:</b> A Deny policy blocks resource creation, not deletion of an existing group.</li><li><b>Remove all Contributor role assignments:</b> Removing roles blocks all management, not just deletion.</li></ul>"
    },
    {
      "id": "dom1-q9",
      "scenarioTag": "Cost Management",
      "question": "Contoso wants an email alert when monthly spend reaches 80% of a set amount. What should you configure?",
      "options": [
        "A budget in Cost Management with an alert threshold at 80%",
        "A metric alert in Azure Monitor",
        "Azure Advisor cost recommendations",
        "A resource lock"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Cost Management budgets let you set an amount and trigger action-group or email alerts at configured percentage thresholds such as 80%. <b>Wrong-Answer Breakdown:</b><ul><li><b>A metric alert in Azure Monitor:</b> Monitor metric alerts track resource telemetry, not subscription spend budgets.</li><li><b>Azure Advisor cost recommendations:</b> Advisor suggests savings but does not send threshold-based spend alerts.</li><li><b>A resource lock:</b> Locks prevent changes and are unrelated to spending notifications.</li></ul>"
    },
    {
      "id": "dom1-q10",
      "scenarioTag": "Administrative Units",
      "question": "A company wants a regional help-desk admin to reset passwords only for users in the Berlin office. What should you use?",
      "options": [
        "A tenant-wide Password Administrator assignment",
        "An administrative unit scoped to Berlin users with the Password Administrator role",
        "A dynamic group only",
        "A management group"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Administrative units restrict a directory role's scope to the members of that unit, so the admin manages only Berlin users. <b>Wrong-Answer Breakdown:</b><ul><li><b>A tenant-wide Password Administrator assignment:</b> Tenant-wide scope lets the admin reset any user, breaking the regional boundary.</li><li><b>A dynamic group only:</b> A group alone does not delegate scoped admin permissions.</li><li><b>A management group:</b> Management groups scope Azure resources, not Entra ID user administration.</li></ul>"
    },
    {
      "id": "dom1-q11",
      "scenarioTag": "PIM",
      "question": "You are configuring access so administrators hold the Global Administrator role only when needed and must justify activation. What should you use?",
      "options": [
        "A permanent Global Administrator assignment",
        "A Conditional Access policy",
        "Privileged Identity Management (PIM) with eligible, time-bound activation",
        "A custom RBAC role"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> PIM makes roles eligible rather than active, requiring just-in-time activation with justification and optional approval and MFA. <b>Wrong-Answer Breakdown:</b><ul><li><b>A permanent Global Administrator assignment:</b> Permanent assignment defeats just-in-time and standing-access reduction.</li><li><b>A Conditional Access policy:</b> Conditional Access governs sign-in conditions, not role activation lifecycle.</li><li><b>A custom RBAC role:</b> Custom RBAC governs Azure resources and cannot manage Entra role eligibility.</li></ul>"
    },
    {
      "id": "dom1-q12",
      "scenarioTag": "B2B Collaboration",
      "question": "Contoso needs to give an external partner's users access to a shared app using their own credentials. What should you configure?",
      "options": [
        "Create cloud-only member accounts for each partner user",
        "Share a single service account password",
        "Configure B2C user flows",
        "Invite the users as Entra ID B2B guest accounts"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> B2B guest invitations let external users authenticate with their home organization identity while you control access to your resources. <b>Wrong-Answer Breakdown:</b><ul><li><b>Create cloud-only member accounts for each partner user:</b> Member accounts create and manage separate credentials instead of federating the partner identity.</li><li><b>Share a single service account password:</b> Shared credentials break auditing and violate security best practice.</li><li><b>Configure B2C user flows:</b> B2C is for customer-facing consumer identities, not partner collaboration.</li></ul>"
    },
    {
      "id": "dom1-q13",
      "scenarioTag": "Group-Based Licensing",
      "question": "A company wants all members of the Sales group to automatically receive a Microsoft 365 license. What should you configure?",
      "options": [
        "Group-based licensing on the Sales group",
        "Assign licenses to each user manually",
        "A Conditional Access policy",
        "An Azure Policy assignment"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Group-based licensing assigns licenses to a group so members automatically gain or lose licenses as membership changes. <b>Wrong-Answer Breakdown:</b><ul><li><b>Assign licenses to each user manually:</b> Manual assignment does not scale and is not automatic on membership change.</li><li><b>A Conditional Access policy:</b> Conditional Access does not assign product licenses.</li><li><b>An Azure Policy assignment:</b> Azure Policy governs Azure resources, not user licensing.</li></ul>"
    },
    {
      "id": "dom1-q14",
      "scenarioTag": "Access Reviews",
      "question": "Contoso must periodically recertify who has access to a sensitive group and remove stale members. What should you use?",
      "options": [
        "A resource lock",
        "Entra ID access reviews for the group",
        "Azure Policy audit effect",
        "Cost Management budgets"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Access reviews let reviewers periodically approve or deny continued access, automatically removing members who are no longer needed. <b>Wrong-Answer Breakdown:</b><ul><li><b>A resource lock:</b> Locks prevent resource deletion, not membership recertification.</li><li><b>Azure Policy audit effect:</b> Policy audit reports Azure resource compliance, not group membership reviews.</li><li><b>Cost Management budgets:</b> Budgets track spend and are unrelated to access recertification.</li></ul>"
    },
    {
      "id": "dom1-q15",
      "scenarioTag": "Custom Role Scope",
      "question": "You are configuring a custom role that should be assignable only within one resource group. What defines that limit?",
      "options": [
        "The Actions property",
        "The NotActions property",
        "The AssignableScopes property of the role definition",
        "A resource lock"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> AssignableScopes lists the subscriptions, resource groups, or resources where a custom role can be assigned. <b>Wrong-Answer Breakdown:</b><ul><li><b>The Actions property:</b> Actions define what operations are allowed, not where the role can be assigned.</li><li><b>The NotActions property:</b> NotActions subtract permissions but do not limit assignment scope.</li><li><b>A resource lock:</b> Locks do not control where a role definition may be assigned.</li></ul>"
    },
    {
      "id": "dom1-q16",
      "scenarioTag": "Break-Glass Accounts",
      "question": "A company wants emergency access accounts that keep working even if the MFA service is unavailable. How should they be configured?",
      "options": [
        "Regular admin accounts with per-user MFA",
        "Guest B2B accounts",
        "Accounts secured only by Security Defaults",
        "Cloud-only accounts excluded from Conditional Access MFA policies and closely monitored"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Break-glass accounts are excluded from MFA/Conditional Access so they remain usable during outages, with strict monitoring and alerting. <b>Wrong-Answer Breakdown:</b><ul><li><b>Regular admin accounts with per-user MFA:</b> If MFA is down these accounts could be locked out during an emergency.</li><li><b>Guest B2B accounts:</b> Guest accounts depend on an external identity provider that may also be unavailable.</li><li><b>Accounts secured only by Security Defaults:</b> Security Defaults enforce MFA on all accounts, risking lockout.</li></ul>"
    },
    {
      "id": "dom1-q17",
      "scenarioTag": "Tags Governance",
      "question": "Contoso wants every new resource to inherit a CostCenter tag from its resource group automatically. What should you use?",
      "options": [
        "An Azure Policy with a modify effect that inherits the tag from the resource group",
        "A CanNotDelete lock",
        "Manual tagging at creation",
        "An RBAC custom role"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> An Azure Policy with the Modify effect can add or inherit tags such as CostCenter from the parent resource group during deployment. <b>Wrong-Answer Breakdown:</b><ul><li><b>A CanNotDelete lock:</b> Locks prevent deletion, not tag inheritance.</li><li><b>Manual tagging at creation:</b> Manual tagging is not automatic and is easily missed.</li><li><b>An RBAC custom role:</b> RBAC governs permissions, not tag inheritance.</li></ul>"
    },
    {
      "id": "dom1-q18",
      "scenarioTag": "Conditional Access Block Legacy",
      "question": "A company wants to block legacy authentication protocols that bypass MFA. What should you configure?",
      "options": [
        "Disable SSPR",
        "A Conditional Access policy that blocks legacy authentication clients",
        "A network security group rule",
        "A resource lock on Entra ID"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> A Conditional Access policy targeting the \"Other clients\" (legacy auth) condition with Block prevents protocols like IMAP/POP that can bypass MFA. <b>Wrong-Answer Breakdown:</b><ul><li><b>Disable SSPR:</b> SSPR is unrelated to legacy authentication protocols.</li><li><b>A network security group rule:</b> NSGs filter network traffic, not authentication client types.</li><li><b>A resource lock on Entra ID:</b> Resource locks apply to Azure resources, not authentication flows.</li></ul>"
    },
    {
      "id": "dom1-q19",
      "scenarioTag": "Subscription Transfer",
      "question": "You must move a subscription to a different management group for consistent policy. What permission scope is needed?",
      "options": [
        "Reader on the subscription",
        "A resource lock",
        "Owner or appropriate write permission on the target management group and subscription",
        "Cost Management Contributor"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Moving a subscription requires write access (such as Owner) on both the subscription and the target management group. <b>Wrong-Answer Breakdown:</b><ul><li><b>Reader on the subscription:</b> Reader cannot move a subscription between management groups.</li><li><b>A resource lock:</b> Locks block changes rather than enabling the move.</li><li><b>Cost Management Contributor:</b> This role manages cost data only, not management group placement.</li></ul>"
    },
    {
      "id": "dom1-q20",
      "scenarioTag": "Named Locations",
      "question": "Contoso wants Conditional Access to treat its office IP ranges as trusted. What should you define first?",
      "options": [
        "An application security group",
        "A route table",
        "A management group",
        "A named location containing the corporate IP ranges"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Named locations define IP ranges (or countries) that Conditional Access policies can reference as trusted or blocked. <b>Wrong-Answer Breakdown:</b><ul><li><b>An application security group:</b> ASGs group VMs for NSG rules, not sign-in locations.</li><li><b>A route table:</b> Route tables direct network traffic, not Conditional Access trust.</li><li><b>A management group:</b> Management groups organize subscriptions, not IP-based trust.</li></ul>"
    },
    {
      "id": "dom1-q21",
      "scenarioTag": "Guest Access Restrictions",
      "question": "A company wants to limit what guest users can see in the directory. Where do you configure this?",
      "options": [
        "External collaboration settings for guest user access restrictions",
        "A Conditional Access policy only",
        "A custom RBAC role",
        "Azure Policy"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> External collaboration settings let you restrict guest permissions so guests have limited directory visibility. <b>Wrong-Answer Breakdown:</b><ul><li><b>A Conditional Access policy only:</b> Conditional Access controls sign-in, not directory object visibility for guests.</li><li><b>A custom RBAC role:</b> RBAC governs Azure resource access, not directory browsing for guests.</li><li><b>Azure Policy:</b> Azure Policy targets Azure resources, not guest directory permissions.</li></ul>"
    },
    {
      "id": "dom1-q22",
      "scenarioTag": "Initiative Definition",
      "question": "You need to group multiple related policies and assign them together for a compliance standard. What should you create?",
      "options": [
        "A management group",
        "A policy initiative (set definition) containing the policies",
        "A resource group",
        "A custom RBAC role"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> An initiative (policy set) bundles multiple policy definitions so they can be assigned and tracked as one compliance unit. <b>Wrong-Answer Breakdown:</b><ul><li><b>A management group:</b> Management groups organize subscriptions, not bundle policy definitions.</li><li><b>A resource group:</b> Resource groups contain resources, not policy definitions.</li><li><b>A custom RBAC role:</b> RBAC roles group permissions, not policies.</li></ul>"
    },
    {
      "id": "dom1-q23",
      "scenarioTag": "Role Assignment Scope",
      "question": "Contoso assigned Reader at the subscription and Contributor at a resource group to the same user. What is the effective access in that resource group?",
      "options": [
        "Reader, because subscription scope overrides child scopes",
        "No access, because the assignments conflict",
        "Contributor, because RBAC permissions are additive and the most permissive applies",
        "Owner, because two roles combine into Owner"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Azure RBAC is additive; the user gets the union of both roles, so within the resource group they effectively have Contributor. <b>Wrong-Answer Breakdown:</b><ul><li><b>Reader, because subscription scope overrides child scopes:</b> RBAC does not let a broader scope override; permissions are cumulative.</li><li><b>No access, because the assignments conflict:</b> Multiple assignments do not cancel out; they combine.</li><li><b>Owner, because two roles combine into Owner:</b> Roles do not merge into Owner; the user gets the union of granted actions.</li></ul>"
    },
    {
      "id": "dom1-q24",
      "scenarioTag": "MFA Registration Policy",
      "question": "A company wants to require users to register authentication methods so MFA can be enforced later. What should you use?",
      "options": [
        "A resource lock",
        "Group-based licensing",
        "A budget alert",
        "A Conditional Access policy or Identity Protection registration policy for MFA registration"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Registration policies prompt users to set up MFA methods, ensuring they are ready before enforcement. <b>Wrong-Answer Breakdown:</b><ul><li><b>A resource lock:</b> Locks are unrelated to MFA registration.</li><li><b>Group-based licensing:</b> Licensing assigns products, not MFA registration.</li><li><b>A budget alert:</b> Budgets track spend, not authentication registration.</li></ul>"
    },
    {
      "id": "dom1-q25",
      "scenarioTag": "Deny vs Audit Precedence",
      "question": "You are configuring two policies for the same rule: Deny at subscription and Audit at resource group. A user creates a non-compliant resource in that group. What happens?",
      "options": [
        "The resource is created and only audited",
        "The creation is denied because Deny takes precedence over Audit",
        "The resource is created and flagged compliant",
        "Both policies are ignored"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> When multiple effects apply, Deny always takes precedence, so the inherited subscription Deny blocks the resource. <b>Wrong-Answer Breakdown:</b><ul><li><b>The resource is created and only audited:</b> Audit does not override an inherited Deny from a higher scope.</li><li><b>The resource is created and flagged compliant:</b> A non-compliant resource is never flagged compliant.</li><li><b>Both policies are ignored:</b> Both policies evaluate; the more restrictive Deny wins.</li></ul>"
    }
  ],
  "dom2": [
    {
      "id": "dom2-q1",
      "scenarioTag": "Access Tiers",
      "question": "Contoso stores backups accessed once or twice a year and wants the lowest storage cost, accepting hours of retrieval latency. Which blob tier should you use?",
      "options": [
        "Archive tier",
        "Cool tier",
        "Hot tier",
        "Premium block blob"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Archive offers the lowest storage price for rarely accessed data, with rehydration latency of hours which is acceptable here. <b>Wrong-Answer Breakdown:</b><ul><li><b>Cool tier:</b> Cool is cheaper than Hot but far more expensive to store than Archive for yearly-access data.</li><li><b>Hot tier:</b> Hot has the highest storage cost, wrong for rarely accessed backups.</li><li><b>Premium block blob:</b> Premium is for high-transaction low-latency workloads, the opposite of this need.</li></ul>"
    },
    {
      "id": "dom2-q2",
      "scenarioTag": "SAS Tokens",
      "question": "A company must give a partner temporary read-only access to a single blob container without sharing account keys. What should you provide?",
      "options": [
        "The storage account access key",
        "A service SAS token scoped to the container with read permission and an expiry",
        "A shared account password",
        "A ReadOnly resource lock"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> A SAS token grants scoped, time-limited permissions (e.g., read on one container) without exposing account keys. <b>Wrong-Answer Breakdown:</b><ul><li><b>The storage account access key:</b> Account keys grant full access and never expire until rotated.</li><li><b>A shared account password:</b> Storage accounts do not use passwords for data-plane access.</li><li><b>A ReadOnly resource lock:</b> Locks affect management operations, not data-plane blob access.</li></ul>"
    },
    {
      "id": "dom2-q3",
      "scenarioTag": "Redundancy GRS",
      "question": "Contoso needs storage that survives a complete regional outage with data replicated to a second region. Which redundancy should you choose?",
      "options": [
        "Locally redundant storage (LRS)",
        "Zone-redundant storage (ZRS)",
        "Geo-redundant storage (GRS)",
        "Read-access to a single zone"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> GRS replicates data to a paired secondary region, protecting against a full regional failure. <b>Wrong-Answer Breakdown:</b><ul><li><b>Locally redundant storage (LRS):</b> LRS keeps copies only within one datacenter and cannot survive a regional outage.</li><li><b>Zone-redundant storage (ZRS):</b> ZRS spans zones in one region but not a second region.</li><li><b>Read-access to a single zone:</b> A single zone offers no cross-region protection.</li></ul>"
    },
    {
      "id": "dom2-q4",
      "scenarioTag": "ZRS",
      "question": "A company wants protection against a single datacenter (zone) failure while keeping all data in one region. Which redundancy fits best?",
      "options": [
        "Locally redundant storage (LRS)",
        "Geo-redundant storage (GRS)",
        "Archive tier",
        "Zone-redundant storage (ZRS)"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> ZRS synchronously replicates across three availability zones in the same region, surviving a single zone outage. <b>Wrong-Answer Breakdown:</b><ul><li><b>Locally redundant storage (LRS):</b> LRS copies stay in one datacenter and do not survive a zone failure.</li><li><b>Geo-redundant storage (GRS):</b> GRS adds cross-region copies, more than required and more costly for this need.</li><li><b>Archive tier:</b> Archive is an access tier, not a redundancy option.</li></ul>"
    },
    {
      "id": "dom2-q5",
      "scenarioTag": "Azure Files",
      "question": "You are configuring shared storage that on-premises Windows servers can mount over SMB with standard file semantics. What should you use?",
      "options": [
        "An Azure Files SMB file share",
        "A blob container",
        "A managed disk",
        "A queue"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Azure Files provides fully managed SMB shares that Windows, Linux, and macOS clients can mount like a network drive. <b>Wrong-Answer Breakdown:</b><ul><li><b>A blob container:</b> Blob storage is object storage and is not natively mounted as an SMB drive.</li><li><b>A managed disk:</b> Managed disks attach to a single VM, not shared SMB mounts.</li><li><b>A queue:</b> Queues store messages, not files.</li></ul>"
    },
    {
      "id": "dom2-q6",
      "scenarioTag": "File Sync",
      "question": "Contoso wants to cache frequently used files on a local file server while keeping the full dataset in Azure Files. What should you deploy?",
      "options": [
        "Blob lifecycle management",
        "Azure File Sync with cloud tiering on the server endpoint",
        "GRS replication",
        "AzCopy scheduled scripts"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Azure File Sync turns a Windows Server into a cache of an Azure file share, with cloud tiering keeping hot files local. <b>Wrong-Answer Breakdown:</b><ul><li><b>Blob lifecycle management:</b> Lifecycle policies move blobs between tiers, not sync files to on-prem servers.</li><li><b>GRS replication:</b> GRS is a redundancy option, not a caching mechanism.</li><li><b>AzCopy scheduled scripts:</b> AzCopy copies data but does not provide transparent tiered caching.</li></ul>"
    },
    {
      "id": "dom2-q7",
      "scenarioTag": "Lifecycle Management",
      "question": "A company wants blobs automatically moved to Cool after 30 days and deleted after 365 days. What should you configure?",
      "options": [
        "A SAS token",
        "A resource lock",
        "A blob lifecycle management policy with tier and delete rules",
        "Object replication"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Lifecycle management rules act on last-modified time to move blobs between tiers and delete them automatically. <b>Wrong-Answer Breakdown:</b><ul><li><b>A SAS token:</b> SAS grants access; it cannot transition tiers on a schedule.</li><li><b>A resource lock:</b> Locks prevent changes and cannot move or delete blobs on schedule.</li><li><b>Object replication:</b> Replication copies blobs to another account, not lifecycle transitions.</li></ul>"
    },
    {
      "id": "dom2-q8",
      "scenarioTag": "Managed Identity Storage",
      "question": "You are configuring a VM app to access blob storage without storing any keys or connection strings. What should you use?",
      "options": [
        "An account access key in the app config",
        "A SAS token embedded in code",
        "Anonymous public blob access",
        "A managed identity granted the Storage Blob Data Reader role"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> A managed identity lets the app authenticate via Entra ID with an RBAC data role, so no keys or secrets are stored. <b>Wrong-Answer Breakdown:</b><ul><li><b>An account access key in the app config:</b> This stores a secret, exactly what must be avoided.</li><li><b>A SAS token embedded in code:</b> Embedded SAS is still a shared secret that can leak.</li><li><b>Anonymous public blob access:</b> Public access exposes data to anyone and is insecure.</li></ul>"
    },
    {
      "id": "dom2-q9",
      "scenarioTag": "Static Website",
      "question": "Contoso wants to host a static HTML/CSS/JS site directly from a storage account. What should you enable?",
      "options": [
        "Static website hosting on the storage account with a $web container",
        "An Azure Files share",
        "A queue-triggered function",
        "Archive tier on the container"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Enabling static website hosting serves content from the special $web container with an index and error document. <b>Wrong-Answer Breakdown:</b><ul><li><b>An Azure Files share:</b> File shares are not served as public web content.</li><li><b>A queue-triggered function:</b> Queues process messages and do not host web pages.</li><li><b>Archive tier on the container:</b> Archive makes content offline and unservable.</li></ul>"
    },
    {
      "id": "dom2-q10",
      "scenarioTag": "Data Lake Gen2",
      "question": "A company needs hierarchical namespaces and directory-level security for a big-data analytics store. What should you enable?",
      "options": [
        "A standard blob container without hierarchical namespace",
        "Azure Data Lake Storage Gen2 (hierarchical namespace) on the storage account",
        "Azure Files",
        "A queue"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Data Lake Storage Gen2 adds a hierarchical namespace with directories and ACLs, ideal for analytics workloads. <b>Wrong-Answer Breakdown:</b><ul><li><b>A standard blob container without hierarchical namespace:</b> Flat blob storage lacks true directories and POSIX ACLs for analytics.</li><li><b>Azure Files:</b> Files is SMB/NFS shares, not optimized as an analytics data lake.</li><li><b>A queue:</b> Queues store messages, not analytics datasets.</li></ul>"
    },
    {
      "id": "dom2-q11",
      "scenarioTag": "Encryption CMK",
      "question": "You are configuring storage encryption so your organization controls the encryption keys in Key Vault. What should you use?",
      "options": [
        "Microsoft-managed keys",
        "A SAS token",
        "Customer-managed keys (CMK) stored in Azure Key Vault",
        "A resource lock"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> CMK lets you supply and rotate your own keys in Key Vault while Storage handles encryption at rest. <b>Wrong-Answer Breakdown:</b><ul><li><b>Microsoft-managed keys:</b> These are managed by Microsoft, so the organization does not control them.</li><li><b>A SAS token:</b> SAS controls access, not encryption key ownership.</li><li><b>A resource lock:</b> Locks prevent deletion, unrelated to encryption keys.</li></ul>"
    },
    {
      "id": "dom2-q12",
      "scenarioTag": "Soft Delete",
      "question": "Contoso wants to recover blobs that are accidentally deleted for up to 14 days. What should you enable?",
      "options": [
        "A CanNotDelete lock on the account",
        "GRS redundancy",
        "Archive tier",
        "Blob soft delete with a 14-day retention period"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Soft delete retains deleted blobs for a configured period so they can be undeleted within the window. <b>Wrong-Answer Breakdown:</b><ul><li><b>A CanNotDelete lock on the account:</b> A lock blocks deleting the account but not individual blob deletions or recovery windows.</li><li><b>GRS redundancy:</b> GRS replicates data but does not restore intentionally deleted blobs.</li><li><b>Archive tier:</b> Archive lowers cost but does not provide a recovery window for deletes.</li></ul>"
    },
    {
      "id": "dom2-q13",
      "scenarioTag": "Storage Firewall",
      "question": "A company must restrict a storage account so only a specific VNet subnet can reach it. What should you configure?",
      "options": [
        "Storage firewall rules allowing the subnet via a service endpoint or private endpoint",
        "A SAS token with IP restriction only",
        "Public network access enabled for all",
        "A resource lock"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Storage firewall combined with service/private endpoints limits data-plane access to the approved VNet subnet. <b>Wrong-Answer Breakdown:</b><ul><li><b>A SAS token with IP restriction only:</b> IP-scoped SAS limits a token but does not lock the account to a subnet at the network layer.</li><li><b>Public network access enabled for all:</b> Allowing all networks is the opposite of restricting to one subnet.</li><li><b>A resource lock:</b> Locks do not filter network traffic.</li></ul>"
    },
    {
      "id": "dom2-q14",
      "scenarioTag": "AzCopy",
      "question": "You need to copy several terabytes of blobs between two storage accounts efficiently from a script. Which tool is best?",
      "options": [
        "The Azure portal upload blade",
        "AzCopy",
        "A resource lock",
        "Object versioning"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> AzCopy is a high-performance command-line tool optimized for bulk, parallel data transfer between storage endpoints. <b>Wrong-Answer Breakdown:</b><ul><li><b>The Azure portal upload blade:</b> Portal uploads are impractical and slow for terabytes.</li><li><b>A resource lock:</b> Locks do not copy data.</li><li><b>Object versioning:</b> Versioning tracks blob versions but does not copy between accounts.</li></ul>"
    },
    {
      "id": "dom2-q15",
      "scenarioTag": "Object Replication",
      "question": "Contoso wants to asynchronously copy new blobs from a source account in one region to a destination account in another for read locality. What should you configure?",
      "options": [
        "ZRS on the source account",
        "A SAS token",
        "Object replication with a replication policy between the two accounts",
        "Static website hosting"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Object replication asynchronously copies block blobs from a source to a destination account based on a policy, improving read locality. <b>Wrong-Answer Breakdown:</b><ul><li><b>ZRS on the source account:</b> ZRS spans zones in one region, not cross-account replication.</li><li><b>A SAS token:</b> SAS provides access, not automated replication.</li><li><b>Static website hosting:</b> Static hosting serves content, it does not replicate blobs.</li></ul>"
    },
    {
      "id": "dom2-q16",
      "scenarioTag": "Stored Access Policy",
      "question": "A company issued many SAS tokens and now needs a way to revoke them all at once. What should they have used?",
      "options": [
        "Account key rotation only",
        "Individual token expiry",
        "A resource lock",
        "A stored access policy that the SAS tokens reference"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> SAS tokens tied to a stored access policy can all be revoked instantly by deleting or modifying that policy. <b>Wrong-Answer Breakdown:</b><ul><li><b>Account key rotation only:</b> Rotating keys invalidates key-based SAS but is disruptive and less targeted than a policy.</li><li><b>Individual token expiry:</b> Waiting for each token to expire cannot revoke them immediately.</li><li><b>A resource lock:</b> Locks do not revoke SAS tokens.</li></ul>"
    },
    {
      "id": "dom2-q17",
      "scenarioTag": "Cold Tier",
      "question": "You are configuring storage for data accessed roughly every 90 days that needs cheaper storage than Cool but faster access than Archive. Which tier fits?",
      "options": [
        "Cold tier",
        "Hot tier",
        "Archive tier",
        "Premium tier"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Cold tier offers lower storage cost than Cool with online (immediate) access, suited to data accessed every few months. <b>Wrong-Answer Breakdown:</b><ul><li><b>Hot tier:</b> Hot is the most expensive to store, wrong for infrequently accessed data.</li><li><b>Archive tier:</b> Archive requires rehydration of hours, too slow for periodic access.</li><li><b>Premium tier:</b> Premium targets high-transaction low-latency workloads at higher cost.</li></ul>"
    },
    {
      "id": "dom2-q18",
      "scenarioTag": "NFS Files",
      "question": "Contoso needs a Linux-friendly shared file system over NFS 4.1 in Azure. What should you deploy?",
      "options": [
        "A blob container mounted with SAS",
        "A premium Azure Files share configured for the NFS protocol",
        "A managed disk",
        "A queue"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Azure Files premium (FileStorage) supports NFS 4.1 shares for Linux workloads needing POSIX file semantics. <b>Wrong-Answer Breakdown:</b><ul><li><b>A blob container mounted with SAS:</b> Blob is object storage and not an NFS 4.1 share.</li><li><b>A managed disk:</b> Managed disks attach to one VM and are not shared NFS.</li><li><b>A queue:</b> Queues are messaging, not file shares.</li></ul>"
    },
    {
      "id": "dom2-q19",
      "scenarioTag": "GZRS",
      "question": "A company needs both zone-level protection within the primary region and cross-region durability. Which redundancy should you pick?",
      "options": [
        "LRS",
        "ZRS",
        "Geo-zone-redundant storage (GZRS)",
        "GRS"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> GZRS combines ZRS in the primary region with geo-replication to a secondary region for maximum durability. <b>Wrong-Answer Breakdown:</b><ul><li><b>LRS:</b> LRS has neither zone nor region redundancy.</li><li><b>ZRS:</b> ZRS covers zones but not a second region.</li><li><b>GRS:</b> GRS covers a second region but uses LRS (single zone) in the primary region.</li></ul>"
    },
    {
      "id": "dom2-q20",
      "scenarioTag": "Blob Versioning",
      "question": "You are configuring storage to automatically keep previous versions of a blob whenever it is overwritten. What should you enable?",
      "options": [
        "Soft delete only",
        "A SAS token",
        "Lifecycle management",
        "Blob versioning on the storage account"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Blob versioning automatically creates a new version each time a blob is modified or overwritten, enabling restore. <b>Wrong-Answer Breakdown:</b><ul><li><b>Soft delete only:</b> Soft delete recovers deleted blobs but does not retain versions on overwrite.</li><li><b>A SAS token:</b> SAS controls access, not version retention.</li><li><b>Lifecycle management:</b> Lifecycle transitions tiers; it does not create versions on write.</li></ul>"
    },
    {
      "id": "dom2-q21",
      "scenarioTag": "Immutable Storage",
      "question": "Contoso must store compliance records so they cannot be modified or deleted for five years (WORM). What should you configure?",
      "options": [
        "A time-based immutability (WORM) policy on the container",
        "A CanNotDelete lock",
        "Soft delete",
        "Archive tier"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Immutable storage time-based retention enforces write-once-read-many so data cannot be altered or deleted until the period ends. <b>Wrong-Answer Breakdown:</b><ul><li><b>A CanNotDelete lock:</b> Locks can be removed by an admin and do not enforce WORM at the data level.</li><li><b>Soft delete:</b> Soft delete only aids recovery and does not prevent modification.</li><li><b>Archive tier:</b> Archive lowers cost but permits deletion, failing WORM.</li></ul>"
    },
    {
      "id": "dom2-q22",
      "scenarioTag": "Connection Security",
      "question": "A company must ensure all storage traffic uses encryption in transit. What setting should you enable?",
      "options": [
        "Enable public blob access",
        "Require secure transfer (HTTPS-only) on the storage account",
        "A CanNotDelete lock",
        "Archive tier"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> The secure transfer required setting rejects HTTP requests, forcing all data-plane traffic over HTTPS/SMB encryption. <b>Wrong-Answer Breakdown:</b><ul><li><b>Enable public blob access:</b> Public access reduces security and does not enforce encryption in transit.</li><li><b>A CanNotDelete lock:</b> Locks do not affect transport encryption.</li><li><b>Archive tier:</b> Tiers are unrelated to transport security.</li></ul>"
    },
    {
      "id": "dom2-q23",
      "scenarioTag": "Storage Account Kind",
      "question": "You are creating a general-purpose account that supports blobs, files, queues, and tables with the latest features. Which kind should you choose?",
      "options": [
        "BlobStorage (legacy)",
        "A classic (v1) account",
        "StorageV2 (general-purpose v2)",
        "A managed disk"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> StorageV2 supports all services (blob, file, queue, table) and the newest features like tiering, making it the default choice. <b>Wrong-Answer Breakdown:</b><ul><li><b>BlobStorage (legacy):</b> Legacy BlobStorage supports only blobs and lacks newer features.</li><li><b>A classic (v1) account:</b> V1 lacks tiering and newer capabilities of v2.</li><li><b>A managed disk:</b> Managed disks are not a storage account kind.</li></ul>"
    },
    {
      "id": "dom2-q24",
      "scenarioTag": "Private Endpoint",
      "question": "Contoso wants storage reachable only over a private IP inside the VNet with no public exposure. What should you deploy?",
      "options": [
        "A service endpoint only",
        "A SAS token",
        "A public IP on the account",
        "A private endpoint for the storage account and disable public network access"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> A private endpoint assigns the storage account a private IP in the VNet, and disabling public access removes internet exposure. <b>Wrong-Answer Breakdown:</b><ul><li><b>A service endpoint only:</b> Service endpoints keep traffic on the backbone but the resource still uses its public endpoint.</li><li><b>A SAS token:</b> SAS controls permissions, not network private connectivity.</li><li><b>A public IP on the account:</b> A public IP is the opposite of private-only access.</li></ul>"
    },
    {
      "id": "dom2-q25",
      "scenarioTag": "Access Key Rotation",
      "question": "A company suspects a storage account key may be exposed. What is the correct immediate action?",
      "options": [
        "Delete the storage account",
        "Regenerate the exposed access key and update dependent applications",
        "Apply a resource lock",
        "Switch to the Archive tier"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Regenerating (rotating) the compromised key invalidates it immediately; using two keys lets you rotate without downtime. <b>Wrong-Answer Breakdown:</b><ul><li><b>Delete the storage account:</b> Deleting destroys data and is unnecessary to revoke a key.</li><li><b>Apply a resource lock:</b> A lock does not invalidate a leaked key.</li><li><b>Switch to the Archive tier:</b> Tier changes do not revoke access.</li></ul>"
    }
  ],
  "dom3": [
    {
      "id": "dom3-q1",
      "scenarioTag": "Availability Zones",
      "question": "Contoso needs two VMs that stay available even if an entire datacenter within the region fails. How should you deploy them?",
      "options": [
        "Place each VM in a different availability zone",
        "Put both VMs in one availability set",
        "Deploy both VMs to the same zone",
        "Use a single larger VM"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Availability zones are physically separate datacenters; spreading VMs across zones survives a full zone failure. <b>Wrong-Answer Breakdown:</b><ul><li><b>Put both VMs in one availability set:</b> Availability sets protect against rack failures within a datacenter, not a whole-zone outage.</li><li><b>Deploy both VMs to the same zone:</b> Same-zone deployment offers no protection if that zone fails.</li><li><b>Use a single larger VM:</b> A single VM has no redundancy at all.</li></ul>"
    },
    {
      "id": "dom3-q2",
      "scenarioTag": "VMSS",
      "question": "A company needs identical web VMs that automatically scale out and in based on CPU load. What should you deploy?",
      "options": [
        "Several standalone VMs behind manual management",
        "A Virtual Machine Scale Set (VMSS) with autoscale rules",
        "A single VM with a larger size",
        "An availability set only"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> VMSS manages a group of identical VMs and scales instance count automatically based on metrics like CPU. <b>Wrong-Answer Breakdown:</b><ul><li><b>Several standalone VMs behind manual management:</b> Standalone VMs do not autoscale as a managed group.</li><li><b>A single VM with a larger size:</b> Scaling up one VM does not add instances for load.</li><li><b>An availability set only:</b> Availability sets provide redundancy but not automatic scaling.</li></ul>"
    },
    {
      "id": "dom3-q3",
      "scenarioTag": "Bicep",
      "question": "You are configuring infrastructure as code and want a concise, type-safe language that compiles to ARM JSON. What should you use?",
      "options": [
        "Raw ARM JSON templates",
        "A shell script calling az commands",
        "Bicep",
        "A resource lock"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Bicep is a declarative DSL that transpiles to ARM JSON, offering cleaner syntax, modules, and type safety. <b>Wrong-Answer Breakdown:</b><ul><li><b>Raw ARM JSON templates:</b> ARM JSON works but is more verbose and harder to author than Bicep.</li><li><b>A shell script calling az commands:</b> Imperative scripts lack the declarative idempotency of Bicep/ARM.</li><li><b>A resource lock:</b> Locks are not an IaC language.</li></ul>"
    },
    {
      "id": "dom3-q4",
      "scenarioTag": "Deployment Slots",
      "question": "Contoso wants to deploy a new app version to a staging environment and swap it into production with zero downtime. What should you use?",
      "options": [
        "Redeploy directly to production",
        "A second App Service plan",
        "A VMSS",
        "App Service deployment slots with a slot swap"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Deployment slots let you validate in staging and swap to production, warming instances first for zero-downtime releases. <b>Wrong-Answer Breakdown:</b><ul><li><b>Redeploy directly to production:</b> Direct deploy risks downtime and offers no easy rollback.</li><li><b>A second App Service plan:</b> A separate plan does not provide the warm-up and swap mechanism.</li><li><b>A VMSS:</b> VMSS is for VMs, not App Service slot swaps.</li></ul>"
    },
    {
      "id": "dom3-q5",
      "scenarioTag": "AKS",
      "question": "A company needs to run and orchestrate many Docker containers with self-healing and scaling. Which service should you choose?",
      "options": [
        "Azure Kubernetes Service (AKS)",
        "A single Azure Container Instance",
        "An App Service plan",
        "A standalone VM with Docker"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> AKS provides managed Kubernetes for orchestrating containers with scaling, self-healing, and rolling updates. <b>Wrong-Answer Breakdown:</b><ul><li><b>A single Azure Container Instance:</b> ACI runs isolated containers without full orchestration or self-healing at scale.</li><li><b>An App Service plan:</b> App Service hosts web apps, not full Kubernetes orchestration.</li><li><b>A standalone VM with Docker:</b> A single VM lacks orchestration, scaling, and self-healing.</li></ul>"
    },
    {
      "id": "dom3-q6",
      "scenarioTag": "Container Instances",
      "question": "You need to run a short-lived batch container quickly without managing any orchestrator or VM. What should you use?",
      "options": [
        "Azure Kubernetes Service",
        "Azure Container Instances (ACI)",
        "A Virtual Machine Scale Set",
        "An App Service plan"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> ACI runs containers on demand with per-second billing and no infrastructure to manage, ideal for short tasks. <b>Wrong-Answer Breakdown:</b><ul><li><b>Azure Kubernetes Service:</b> AKS adds orchestration overhead unnecessary for a single short task.</li><li><b>A Virtual Machine Scale Set:</b> VMSS manages VM fleets, overkill for one container job.</li><li><b>An App Service plan:</b> App Service targets long-running web apps, not quick batch containers.</li></ul>"
    },
    {
      "id": "dom3-q7",
      "scenarioTag": "App Service Plan Tier",
      "question": "Contoso needs an App Service that supports custom domains, TLS, and autoscaling but not deployment slots. Which tier is the minimum?",
      "options": [
        "Free tier",
        "Shared tier",
        "Standard tier",
        "Basic tier"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Standard adds autoscale, staging slots, and daily backups; it is the minimum tier meeting these production requirements. <b>Wrong-Answer Breakdown:</b><ul><li><b>Free tier:</b> Free lacks custom domains, TLS, and autoscale.</li><li><b>Shared tier:</b> Shared does not support autoscale or many production features.</li><li><b>Basic tier:</b> Basic supports custom domains/TLS but not autoscale.</li></ul>"
    },
    {
      "id": "dom3-q8",
      "scenarioTag": "Managed Disks",
      "question": "A company wants Azure to handle storage account management for VM disks with built-in redundancy. What should they use?",
      "options": [
        "Unmanaged disks in a storage account",
        "Azure Files shares",
        "Blob page uploads by hand",
        "Managed disks"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Managed disks abstract the underlying storage accounts, handling placement, redundancy, and scaling automatically. <b>Wrong-Answer Breakdown:</b><ul><li><b>Unmanaged disks in a storage account:</b> Unmanaged disks require you to manage storage accounts and scale limits.</li><li><b>Azure Files shares:</b> Files are shared file systems, not OS/data disks for a VM boot.</li><li><b>Blob page uploads by hand:</b> Manually managing page blobs is exactly what managed disks remove.</li></ul>"
    },
    {
      "id": "dom3-q9",
      "scenarioTag": "Spot VMs",
      "question": "You are configuring interruptible batch compute at the lowest possible price, tolerating eviction. What should you use?",
      "options": [
        "Spot VMs",
        "Reserved instances",
        "Standard on-demand VMs",
        "Dedicated hosts"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Spot VMs use spare capacity at deep discounts but can be evicted, ideal for fault-tolerant batch workloads. <b>Wrong-Answer Breakdown:</b><ul><li><b>Reserved instances:</b> Reservations lower cost for steady workloads but are not evictable spot pricing.</li><li><b>Standard on-demand VMs:</b> On-demand costs more and is not the cheapest option for interruptible work.</li><li><b>Dedicated hosts:</b> Dedicated hosts are the most expensive, for isolation not savings.</li></ul>"
    },
    {
      "id": "dom3-q10",
      "scenarioTag": "VM Extensions",
      "question": "Contoso must run a post-deployment configuration script automatically on new VMs. What should you use?",
      "options": [
        "A deployment slot",
        "The Custom Script Extension",
        "A resource lock",
        "An availability set"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> The Custom Script Extension downloads and runs scripts on the VM after provisioning for post-deployment configuration. <b>Wrong-Answer Breakdown:</b><ul><li><b>A deployment slot:</b> Slots are an App Service feature, not for VM scripts.</li><li><b>A resource lock:</b> Locks prevent changes and cannot run scripts.</li><li><b>An availability set:</b> Availability sets provide redundancy, not script execution.</li></ul>"
    },
    {
      "id": "dom3-q11",
      "scenarioTag": "Azure Bastion Compute",
      "question": "A company wants secure RDP/SSH to VMs without exposing public IPs or opening inbound ports on the VMs. What should you deploy?",
      "options": [
        "A public IP on each VM",
        "A VPN client per user only",
        "Azure Bastion",
        "A load balancer"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Azure Bastion provides RDP/SSH over TLS in the portal without public IPs or open inbound ports on the VMs. <b>Wrong-Answer Breakdown:</b><ul><li><b>A public IP on each VM:</b> Public IPs increase attack surface, the opposite of the goal.</li><li><b>A VPN client per user only:</b> A VPN adds connectivity but does not itself provide browser-based portless RDP/SSH.</li><li><b>A load balancer:</b> Load balancers distribute traffic, not provide secure management access.</li></ul>"
    },
    {
      "id": "dom3-q12",
      "scenarioTag": "ARM Idempotency",
      "question": "You redeploy an ARM template whose resources already exist and are unchanged. What is the expected result?",
      "options": [
        "All resources are deleted and recreated",
        "The deployment fails because resources exist",
        "Duplicate resources are created",
        "The deployment is idempotent and makes no changes to unchanged resources"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> ARM/Bicep deployments are declarative and idempotent; resources already matching the desired state are left unchanged. <b>Wrong-Answer Breakdown:</b><ul><li><b>All resources are deleted and recreated:</b> ARM does not delete-and-recreate unchanged resources on redeploy.</li><li><b>The deployment fails because resources exist:</b> Existing matching resources do not cause failure.</li><li><b>Duplicate resources are created:</b> ARM matches by name and does not duplicate resources.</li></ul>"
    },
    {
      "id": "dom3-q13",
      "scenarioTag": "Scale Up vs Out",
      "question": "Contoso's App Service needs more instances to handle more concurrent users. What action is this?",
      "options": [
        "Scale out by increasing the instance count",
        "Scale up to a larger pricing tier",
        "Enable a deployment slot",
        "Add a managed disk"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Scaling out adds more instances to share the load, increasing capacity for concurrent users. <b>Wrong-Answer Breakdown:</b><ul><li><b>Scale up to a larger pricing tier:</b> Scaling up adds CPU/memory per instance, not more instances for concurrency.</li><li><b>Enable a deployment slot:</b> Slots are for staged releases, not adding capacity.</li><li><b>Add a managed disk:</b> Managed disks are VM storage, unrelated to App Service concurrency.</li></ul>"
    },
    {
      "id": "dom3-q14",
      "scenarioTag": "ACR",
      "question": "A company needs a private registry to store and manage its Docker images used by AKS. What should you use?",
      "options": [
        "A storage account blob container",
        "Azure Container Registry (ACR)",
        "Azure Files",
        "A deployment slot"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> ACR is a managed private Docker/OCI registry that integrates with AKS for storing and pulling images. <b>Wrong-Answer Breakdown:</b><ul><li><b>A storage account blob container:</b> Blob storage is not a container image registry with pull/push semantics.</li><li><b>Azure Files:</b> Files is SMB/NFS shares, not an OCI image registry.</li><li><b>A deployment slot:</b> Slots are an App Service concept, not image storage.</li></ul>"
    },
    {
      "id": "dom3-q15",
      "scenarioTag": "Generalized Image",
      "question": "You are configuring a reusable VM image from an existing VM to deploy many identical machines. What must you do first?",
      "options": [
        "Capture the image while the VM is specialized and running",
        "Apply a resource lock and capture",
        "Generalize the VM (sysprep/deprovision) before capturing the image",
        "Move the VM to an availability zone"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Generalizing removes machine-specific identity so the captured image can spin up many unique VMs. <b>Wrong-Answer Breakdown:</b><ul><li><b>Capture the image while the VM is specialized and running:</b> A specialized running VM cannot be reliably captured as a reusable generalized image.</li><li><b>Apply a resource lock and capture:</b> Locks do not prepare an image for reuse.</li><li><b>Move the VM to an availability zone:</b> Zone placement does not create a reusable image.</li></ul>"
    },
    {
      "id": "dom3-q16",
      "scenarioTag": "Container Apps",
      "question": "Contoso wants serverless containers with built-in scaling to zero and event-driven KEDA scaling, without managing Kubernetes. What should you use?",
      "options": [
        "Azure Kubernetes Service",
        "A single Container Instance",
        "A VMSS",
        "Azure Container Apps"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Azure Container Apps offers serverless containers with KEDA-based, event-driven autoscaling including scale to zero, built on managed infrastructure. <b>Wrong-Answer Breakdown:</b><ul><li><b>Azure Kubernetes Service:</b> AKS requires managing the cluster and does not natively give the serverless scale-to-zero experience.</li><li><b>A single Container Instance:</b> ACI does not provide built-in KEDA event-driven autoscaling.</li><li><b>A VMSS:</b> VMSS scales VMs, not serverless containers.</li></ul>"
    },
    {
      "id": "dom3-q17",
      "scenarioTag": "Availability Set SLA",
      "question": "A company placed a single VM in an availability set and expects a high uptime SLA. Why might this fail to qualify?",
      "options": [
        "A higher single-instance SLA requires premium/ultra managed disks, and availability-set SLA needs two or more VMs",
        "Availability sets are deprecated",
        "Single VMs never have any SLA",
        "You must use Spot VMs for SLA"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> The availability-set SLA applies to two or more VMs across fault/update domains; a single VM must use premium/ultra disks to get its single-instance SLA. <b>Wrong-Answer Breakdown:</b><ul><li><b>Availability sets are deprecated:</b> Availability sets are still supported and not deprecated.</li><li><b>Single VMs never have any SLA:</b> Single VMs do have an SLA when using premium/ultra disks.</li><li><b>You must use Spot VMs for SLA:</b> Spot VMs are evictable and reduce, not increase, availability guarantees.</li></ul>"
    },
    {
      "id": "dom3-q18",
      "scenarioTag": "Disk Types",
      "question": "You need the highest-performance managed disk with sub-millisecond latency for a demanding database. Which disk should you choose?",
      "options": [
        "Standard HDD",
        "Ultra Disk (or Premium SSD v2 for very high IOPS)",
        "Standard SSD",
        "A blob container"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Ultra Disks (and Premium SSD v2) deliver the highest IOPS/throughput with configurable, very low latency for demanding workloads. <b>Wrong-Answer Breakdown:</b><ul><li><b>Standard HDD:</b> Standard HDD is the slowest and unsuited to demanding databases.</li><li><b>Standard SSD:</b> Standard SSD improves on HDD but is not the top performance tier.</li><li><b>A blob container:</b> Blob storage is object storage, not a low-latency VM disk.</li></ul>"
    },
    {
      "id": "dom3-q19",
      "scenarioTag": "Autoscale Rules",
      "question": "Contoso wants a VMSS to add instances when average CPU exceeds 75% and remove them below 25%. What should you configure?",
      "options": [
        "A manual instance count only",
        "A deployment slot swap",
        "Autoscale rules based on the Percentage CPU metric with scale-out and scale-in thresholds",
        "A resource lock"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Autoscale profiles use metric rules (e.g., CPU thresholds) to automatically increase and decrease VMSS instance count. <b>Wrong-Answer Breakdown:</b><ul><li><b>A manual instance count only:</b> Manual counts do not react automatically to CPU.</li><li><b>A deployment slot swap:</b> Slot swaps are for App Service releases, not VMSS scaling.</li><li><b>A resource lock:</b> Locks prevent changes and cannot scale instances.</li></ul>"
    },
    {
      "id": "dom3-q20",
      "scenarioTag": "App Service Networking",
      "question": "A company must let an App Service reach resources inside a VNet privately for outbound calls. What should you configure?",
      "options": [
        "A public IP on the app",
        "A managed disk",
        "An availability set",
        "Regional VNet integration for the App Service"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> VNet integration lets an App Service make outbound calls into a VNet privately, reaching internal resources. <b>Wrong-Answer Breakdown:</b><ul><li><b>A public IP on the app:</b> A public IP does not grant private VNet outbound access.</li><li><b>A managed disk:</b> Disks are VM storage, unrelated to App Service networking.</li><li><b>An availability set:</b> Availability sets are a VM concept, not App Service VNet access.</li></ul>"
    },
    {
      "id": "dom3-q21",
      "scenarioTag": "VM Size Family",
      "question": "You are configuring a memory-intensive in-memory database VM. Which VM series is most appropriate?",
      "options": [
        "A memory-optimized series (e.g., E-series)",
        "A compute-optimized F-series",
        "A burstable B-series",
        "A GPU N-series"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Memory-optimized series like E-series provide a high memory-to-CPU ratio ideal for in-memory databases. <b>Wrong-Answer Breakdown:</b><ul><li><b>A compute-optimized F-series:</b> F-series favors CPU-to-memory ratio, not large memory workloads.</li><li><b>A burstable B-series:</b> B-series is for low-baseline bursty workloads, not sustained memory-heavy databases.</li><li><b>A GPU N-series:</b> N-series targets GPU compute, not general memory-optimized databases.</li></ul>"
    },
    {
      "id": "dom3-q22",
      "scenarioTag": "Reserved Instances",
      "question": "Contoso runs steady 24/7 VMs and wants to reduce compute cost with a commitment. What should you purchase?",
      "options": [
        "Spot VMs",
        "A 1- or 3-year VM reserved instance",
        "Larger on-demand VMs",
        "A dedicated host by default"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Reserved instances give significant discounts for committing to steady usage over one or three years. <b>Wrong-Answer Breakdown:</b><ul><li><b>Spot VMs:</b> Spot is cheap but evictable, unsuitable for steady 24/7 production.</li><li><b>Larger on-demand VMs:</b> Bigger on-demand VMs increase, not reduce, cost.</li><li><b>A dedicated host by default:</b> Dedicated hosts raise cost for isolation, not general savings.</li></ul>"
    },
    {
      "id": "dom3-q23",
      "scenarioTag": "Update Domains",
      "question": "A company wants VMs in an availability set protected during planned Azure maintenance. Which concept provides this?",
      "options": [
        "Fault domains",
        "Availability zones only",
        "Update domains, which stagger maintenance so not all VMs reboot at once",
        "A resource lock"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Update domains group VMs so Azure reboots them in separate batches during planned maintenance, preserving availability. <b>Wrong-Answer Breakdown:</b><ul><li><b>Fault domains:</b> Fault domains protect against hardware failures, not planned maintenance staggering.</li><li><b>Availability zones only:</b> Zones are a separate construct; the question asks about availability-set maintenance protection.</li><li><b>A resource lock:</b> Locks do not influence maintenance domains.</li></ul>"
    },
    {
      "id": "dom3-q24",
      "scenarioTag": "Ephemeral OS Disk",
      "question": "You are configuring stateless VMSS nodes and want faster reimaging with no persistent OS disk cost. What should you use?",
      "options": [
        "Ultra managed OS disks",
        "Standard HDD OS disks",
        "A blob-based unmanaged disk",
        "Ephemeral OS disks"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Ephemeral OS disks store the OS on local VM storage, enabling fast reimage with no separate persistent disk cost for stateless nodes. <b>Wrong-Answer Breakdown:</b><ul><li><b>Ultra managed OS disks:</b> Ultra disks are persistent and costly, opposite of ephemeral needs.</li><li><b>Standard HDD OS disks:</b> Standard HDD is persistent and slower, not the ephemeral option.</li><li><b>A blob-based unmanaged disk:</b> Unmanaged disks add management overhead and persistence.</li></ul>"
    },
    {
      "id": "dom3-q25",
      "scenarioTag": "Scale In Policy",
      "question": "Contoso wants control over which VMSS instances are removed first during scale-in. What should you configure?",
      "options": [
        "A deployment slot",
        "A scale-in policy on the scale set",
        "A resource lock",
        "An availability set"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> A VMSS scale-in policy (e.g., default, NewestVM, OldestVM) determines which instances are deleted first when scaling in. <b>Wrong-Answer Breakdown:</b><ul><li><b>A deployment slot:</b> Slots are App Service features, unrelated to VMSS scale-in.</li><li><b>A resource lock:</b> Locks block changes and do not choose scale-in order.</li><li><b>An availability set:</b> Availability sets do not define scale-in ordering.</li></ul>"
    }
  ],
  "dom4": [
    {
      "id": "dom4-q1",
      "scenarioTag": "VNet Peering",
      "question": "Contoso needs two VNets in the same region to communicate privately over the Azure backbone with low latency. What should you configure?",
      "options": [
        "VNet peering between the two virtual networks",
        "A site-to-site VPN between the VNets",
        "Public IPs on each VM",
        "A single subnet shared across VNets"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> VNet peering connects two VNets over the Microsoft backbone with low latency and private IP connectivity. <b>Wrong-Answer Breakdown:</b><ul><li><b>A site-to-site VPN between the VNets:</b> A VPN adds gateway overhead and latency versus direct backbone peering.</li><li><b>Public IPs on each VM:</b> Public IP communication traverses the internet, not private backbone.</li><li><b>A single subnet shared across VNets:</b> Subnets cannot be shared across separate VNets.</li></ul>"
    },
    {
      "id": "dom4-q2",
      "scenarioTag": "NSG",
      "question": "A company must allow HTTPS but block RDP inbound to a subnet. What should you configure?",
      "options": [
        "An application security group alone",
        "A network security group with an allow-443 and a deny/omit-3389 rule on the subnet",
        "A route table",
        "Azure DNS"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> NSGs contain prioritized allow/deny rules by port, protocol, and address to permit 443 and block 3389. <b>Wrong-Answer Breakdown:</b><ul><li><b>An application security group alone:</b> ASGs group NICs but still require NSG rules to filter traffic.</li><li><b>A route table:</b> Route tables direct traffic paths but do not allow or deny ports.</li><li><b>Azure DNS:</b> DNS resolves names and does not filter ports.</li></ul>"
    },
    {
      "id": "dom4-q3",
      "scenarioTag": "ASG",
      "question": "You are configuring NSG rules that should apply to a logical group of web VMs regardless of IP. What should you use?",
      "options": [
        "Hard-coded IP addresses in each rule",
        "A route table",
        "Application security groups referenced in the NSG rules",
        "A private endpoint"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> ASGs let you group VM NICs by workload so NSG rules reference the group instead of individual IPs. <b>Wrong-Answer Breakdown:</b><ul><li><b>Hard-coded IP addresses in each rule:</b> IP-based rules break when VM addresses change and are hard to maintain.</li><li><b>A route table:</b> Route tables control next hops, not rule grouping by workload.</li><li><b>A private endpoint:</b> Private endpoints expose PaaS privately, not group VMs for NSG rules.</li></ul>"
    },
    {
      "id": "dom4-q4",
      "scenarioTag": "Private Endpoint",
      "question": "Contoso wants a SQL PaaS resource accessible only via a private IP inside the VNet. What should you deploy?",
      "options": [
        "A service endpoint",
        "A public IP on the SQL server",
        "A VPN gateway",
        "A private endpoint for the SQL resource"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> A private endpoint projects the PaaS service into the VNet with a private IP, removing public exposure. <b>Wrong-Answer Breakdown:</b><ul><li><b>A service endpoint:</b> Service endpoints keep traffic on the backbone but the service still uses its public endpoint.</li><li><b>A public IP on the SQL server:</b> A public IP exposes the service, the opposite of the goal.</li><li><b>A VPN gateway:</b> A VPN connects networks but does not give a PaaS resource a private VNet IP.</li></ul>"
    },
    {
      "id": "dom4-q5",
      "scenarioTag": "Service Endpoint",
      "question": "A company wants to keep VNet-to-storage traffic on the Microsoft backbone and restrict the storage account to that subnet, without deploying a private IP. What should you configure?",
      "options": [
        "A service endpoint for storage on the subnet plus a storage firewall rule",
        "A private endpoint",
        "A public IP allow-all rule",
        "A route table only"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Service endpoints extend the VNet identity to the service over the backbone, and storage firewall rules restrict access to that subnet. <b>Wrong-Answer Breakdown:</b><ul><li><b>A private endpoint:</b> A private endpoint uses a private IP; the scenario specifically wants no private IP deployment.</li><li><b>A public IP allow-all rule:</b> Allowing all public traffic does not restrict to the subnet.</li><li><b>A route table only:</b> Routes alone do not authorize the subnet on the storage firewall.</li></ul>"
    },
    {
      "id": "dom4-q6",
      "scenarioTag": "VPN Gateway",
      "question": "Contoso needs to connect its on-premises datacenter to Azure over an encrypted IPsec tunnel across the internet. What should you deploy?",
      "options": [
        "ExpressRoute",
        "A site-to-site VPN gateway",
        "VNet peering",
        "A load balancer"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> A site-to-site VPN gateway establishes an encrypted IPsec/IKE tunnel between on-premises and Azure over the internet. <b>Wrong-Answer Breakdown:</b><ul><li><b>ExpressRoute:</b> ExpressRoute is a private circuit, not an internet IPsec tunnel, and costs more.</li><li><b>VNet peering:</b> Peering connects Azure VNets, not on-premises networks.</li><li><b>A load balancer:</b> Load balancers distribute traffic, not create VPN tunnels.</li></ul>"
    },
    {
      "id": "dom4-q7",
      "scenarioTag": "ExpressRoute",
      "question": "A company requires a private, high-bandwidth connection to Azure that does not traverse the public internet. What should they use?",
      "options": [
        "A site-to-site VPN",
        "VNet peering",
        "ExpressRoute",
        "A NAT gateway"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> ExpressRoute provides a dedicated private circuit via a connectivity provider, bypassing the public internet with high bandwidth. <b>Wrong-Answer Breakdown:</b><ul><li><b>A site-to-site VPN:</b> VPN traffic traverses the public internet, not a private circuit.</li><li><b>VNet peering:</b> Peering is Azure-to-Azure, not on-premises private connectivity.</li><li><b>A NAT gateway:</b> NAT provides outbound internet, not private on-prem connectivity.</li></ul>"
    },
    {
      "id": "dom4-q8",
      "scenarioTag": "Load Balancer",
      "question": "You are configuring layer-4 distribution of TCP traffic across a set of backend VMs in one region. What should you use?",
      "options": [
        "Application Gateway",
        "Traffic Manager",
        "Azure Firewall",
        "Azure Load Balancer"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Azure Load Balancer distributes layer-4 (TCP/UDP) traffic across backend pool VMs within a region. <b>Wrong-Answer Breakdown:</b><ul><li><b>Application Gateway:</b> Application Gateway is layer-7; the requirement is simple layer-4 TCP distribution.</li><li><b>Traffic Manager:</b> Traffic Manager is DNS-based global routing, not in-region L4 distribution.</li><li><b>Azure Firewall:</b> Azure Firewall filters traffic; it is not a load balancer.</li></ul>"
    },
    {
      "id": "dom4-q9",
      "scenarioTag": "Application Gateway WAF",
      "question": "Contoso needs URL path-based routing and protection against common web exploits for its web app. What should you deploy?",
      "options": [
        "Application Gateway with Web Application Firewall (WAF)",
        "A basic Azure Load Balancer",
        "Traffic Manager",
        "A NAT gateway"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Application Gateway is a layer-7 load balancer supporting path-based routing and an integrated WAF against OWASP threats. <b>Wrong-Answer Breakdown:</b><ul><li><b>A basic Azure Load Balancer:</b> Layer-4 load balancers cannot do URL path routing or WAF.</li><li><b>Traffic Manager:</b> Traffic Manager routes by DNS and offers no WAF or path routing.</li><li><b>A NAT gateway:</b> NAT provides outbound connectivity, not web routing or WAF.</li></ul>"
    },
    {
      "id": "dom4-q10",
      "scenarioTag": "Traffic Manager",
      "question": "A company wants to direct users to the closest of several regional endpoints using DNS for lowest latency. What should you use?",
      "options": [
        "Azure Load Balancer",
        "Traffic Manager with the performance routing method",
        "Application Gateway",
        "A private endpoint"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Traffic Manager is a DNS-based global load balancer; performance routing sends users to the lowest-latency endpoint. <b>Wrong-Answer Breakdown:</b><ul><li><b>Azure Load Balancer:</b> Load Balancer is regional layer-4, not global DNS-based routing.</li><li><b>Application Gateway:</b> Application Gateway is regional layer-7, not cross-region DNS routing.</li><li><b>A private endpoint:</b> Private endpoints provide private access, not global latency routing.</li></ul>"
    },
    {
      "id": "dom4-q11",
      "scenarioTag": "Azure DNS",
      "question": "You are configuring name resolution for the contoso.com public domain hosted in Azure. What should you create?",
      "options": [
        "A private DNS zone only",
        "An NSG rule",
        "An Azure public DNS zone for contoso.com with the appropriate records",
        "A route table"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> A public Azure DNS zone hosts your domain's records and answers internet DNS queries after delegation. <b>Wrong-Answer Breakdown:</b><ul><li><b>A private DNS zone only:</b> Private zones resolve only within linked VNets, not the public internet.</li><li><b>An NSG rule:</b> NSGs filter traffic and cannot host DNS records.</li><li><b>A route table:</b> Route tables direct traffic, not resolve names.</li></ul>"
    },
    {
      "id": "dom4-q12",
      "scenarioTag": "Private DNS Zone",
      "question": "Contoso wants automatic private name resolution for VMs across peered VNets. What should you configure?",
      "options": [
        "A public DNS zone",
        "A service endpoint",
        "A load balancer",
        "A private DNS zone linked to the VNets with autoregistration"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> A private DNS zone linked to VNets (with autoregistration) provides internal name resolution for VMs. <b>Wrong-Answer Breakdown:</b><ul><li><b>A public DNS zone:</b> Public zones resolve on the internet, not private VM names.</li><li><b>A service endpoint:</b> Service endpoints secure PaaS access, not private DNS.</li><li><b>A load balancer:</b> Load balancers distribute traffic, not resolve names.</li></ul>"
    },
    {
      "id": "dom4-q13",
      "scenarioTag": "User Defined Routes",
      "question": "A company must force all subnet traffic through a network virtual appliance for inspection. What should you configure?",
      "options": [
        "A route table with a user-defined route setting the NVA as next hop",
        "An NSG rule",
        "An ASG",
        "A private endpoint"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> A UDR overrides default system routes, sending subnet traffic to the NVA (as next hop) for inspection. <b>Wrong-Answer Breakdown:</b><ul><li><b>An NSG rule:</b> NSGs allow or deny traffic but do not redirect it through an appliance.</li><li><b>An ASG:</b> ASGs group NICs for NSG rules, not routing.</li><li><b>A private endpoint:</b> Private endpoints expose PaaS privately, not force routing.</li></ul>"
    },
    {
      "id": "dom4-q14",
      "scenarioTag": "NAT Gateway",
      "question": "You are configuring scalable, predictable outbound internet connectivity for VMs in a subnet without assigning each a public IP. What should you deploy?",
      "options": [
        "A public IP per VM",
        "A NAT gateway on the subnet",
        "A private endpoint",
        "VNet peering"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> A NAT gateway provides scalable, stable outbound SNAT for a subnet without exposing individual VM public IPs. <b>Wrong-Answer Breakdown:</b><ul><li><b>A public IP per VM:</b> Per-VM public IPs are less scalable and increase exposure.</li><li><b>A private endpoint:</b> Private endpoints are for inbound private PaaS access, not outbound internet.</li><li><b>VNet peering:</b> Peering connects VNets, not outbound internet SNAT.</li></ul>"
    },
    {
      "id": "dom4-q15",
      "scenarioTag": "Network Watcher",
      "question": "Contoso must diagnose why traffic from a VM is being blocked and identify the responsible NSG rule. Which tool should you use?",
      "options": [
        "Azure Monitor budgets",
        "A resource lock",
        "Network Watcher IP flow verify / NSG diagnostics",
        "A route table only"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Network Watcher IP flow verify tests whether traffic is allowed or denied and names the NSG rule responsible. <b>Wrong-Answer Breakdown:</b><ul><li><b>Azure Monitor budgets:</b> Budgets track spend, not network flow diagnostics.</li><li><b>A resource lock:</b> Locks prevent changes and do not diagnose traffic.</li><li><b>A route table only:</b> A route table shows routes but does not test which NSG rule blocks a flow.</li></ul>"
    },
    {
      "id": "dom4-q16",
      "scenarioTag": "Gateway Transit",
      "question": "A hub VNet has a VPN gateway. Spokes must reach on-premises through it without their own gateways. What peering setting is required?",
      "options": [
        "Deploy a VPN gateway in each spoke",
        "A NAT gateway in the hub",
        "A private endpoint",
        "Enable gateway transit on the hub peering and use remote gateways on the spokes"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Gateway transit lets spokes use the hub's gateway; spokes set \"use remote gateways\" to reach on-premises through the hub. <b>Wrong-Answer Breakdown:</b><ul><li><b>Deploy a VPN gateway in each spoke:</b> Per-spoke gateways defeat the hub-spoke design and add cost.</li><li><b>A NAT gateway in the hub:</b> NAT provides outbound internet, not on-prem transit for spokes.</li><li><b>A private endpoint:</b> Private endpoints expose PaaS, not on-prem gateway transit.</li></ul>"
    },
    {
      "id": "dom4-q17",
      "scenarioTag": "Standard LB Zones",
      "question": "A company needs a load balancer that is zone-redundant and supports availability-zone backends. Which SKU is required?",
      "options": [
        "Standard Load Balancer",
        "Basic Load Balancer",
        "Traffic Manager",
        "Application Gateway v1"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> The Standard Load Balancer SKU supports availability zones and zone-redundant frontends, unlike Basic. <b>Wrong-Answer Breakdown:</b><ul><li><b>Basic Load Balancer:</b> Basic SKU does not support availability zones or zone redundancy.</li><li><b>Traffic Manager:</b> Traffic Manager is DNS-based global routing, not a zonal L4 balancer.</li><li><b>Application Gateway v1:</b> v1 lacks the zone redundancy of the Standard/v2 offerings.</li></ul>"
    },
    {
      "id": "dom4-q18",
      "scenarioTag": "Virtual WAN",
      "question": "Contoso wants a Microsoft-managed hub to interconnect many branches and VNets globally with optimized routing. What should you use?",
      "options": [
        "Many manual VNet peerings",
        "Azure Virtual WAN",
        "A single VPN gateway",
        "A load balancer"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Virtual WAN provides managed hubs that automate branch, VNet, and user connectivity with optimized global routing. <b>Wrong-Answer Breakdown:</b><ul><li><b>Many manual VNet peerings:</b> Manual full-mesh peering is complex and not centrally managed.</li><li><b>A single VPN gateway:</b> One gateway does not provide global managed hub-and-spoke transit.</li><li><b>A load balancer:</b> Load balancers distribute traffic, not interconnect global branches.</li></ul>"
    },
    {
      "id": "dom4-q19",
      "scenarioTag": "DDoS Protection",
      "question": "A company needs enhanced mitigation and tuning against volumetric network attacks on its public endpoints. What should you enable?",
      "options": [
        "An NSG rule",
        "A private endpoint",
        "Azure DDoS Network Protection on the VNet",
        "A route table"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Azure DDoS Network Protection adds adaptive tuning, telemetry, and enhanced mitigation beyond the always-on basic protection. <b>Wrong-Answer Breakdown:</b><ul><li><b>An NSG rule:</b> NSGs filter defined flows but do not provide adaptive DDoS mitigation.</li><li><b>A private endpoint:</b> Private endpoints reduce exposure but are not DDoS mitigation for public endpoints.</li><li><b>A route table:</b> Route tables direct traffic and do not mitigate DDoS.</li></ul>"
    },
    {
      "id": "dom4-q20",
      "scenarioTag": "Peering Transitivity",
      "question": "VNet A peers with hub H, and VNet B peers with H, but A cannot reach B. Why?",
      "options": [
        "Peering was misconfigured as one-way only",
        "NSGs always block spoke-to-spoke traffic",
        "Azure DNS is not configured",
        "VNet peering is non-transitive, so A and B cannot communicate through H by default"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Peering is non-transitive; spoke-to-spoke traffic through a hub requires an NVA/gateway or Virtual WAN routing. <b>Wrong-Answer Breakdown:</b><ul><li><b>Peering was misconfigured as one-way only:</b> Even correctly configured, peering does not transit through a third VNet by default.</li><li><b>NSGs always block spoke-to-spoke traffic:</b> The default cause is non-transitivity, not an NSG rule.</li><li><b>Azure DNS is not configured:</b> DNS resolution is unrelated to routing transitivity.</li></ul>"
    },
    {
      "id": "dom4-q21",
      "scenarioTag": "Subnet Delegation",
      "question": "You are configuring a subnet dedicated to a PaaS service that must inject its instances there. What should you configure?",
      "options": [
        "Subnet delegation to the required Azure service",
        "An NSG allow-all rule",
        "A route table",
        "A private endpoint"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Subnet delegation grants a specific Azure service permission to deploy its resources into that subnet. <b>Wrong-Answer Breakdown:</b><ul><li><b>An NSG allow-all rule:</b> Allowing all traffic does not delegate the subnet to a service.</li><li><b>A route table:</b> Route tables direct traffic, not delegate subnets.</li><li><b>A private endpoint:</b> Private endpoints consume an IP but are not subnet delegation for service injection.</li></ul>"
    },
    {
      "id": "dom4-q22",
      "scenarioTag": "Bastion Networking",
      "question": "Contoso deploys Azure Bastion and must create a specific subnet for it. What must the subnet be named?",
      "options": [
        "GatewaySubnet",
        "AzureBastionSubnet",
        "Any custom subnet name",
        "AzureFirewallSubnet"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Azure Bastion must be deployed into a subnet named exactly AzureBastionSubnet with sufficient address space. <b>Wrong-Answer Breakdown:</b><ul><li><b>GatewaySubnet:</b> GatewaySubnet is required for VPN/ExpressRoute gateways, not Bastion.</li><li><b>Any custom subnet name:</b> Bastion requires the exact reserved subnet name, not an arbitrary one.</li><li><b>AzureFirewallSubnet:</b> That reserved name is for Azure Firewall, not Bastion.</li></ul>"
    },
    {
      "id": "dom4-q23",
      "scenarioTag": "Effective Routes",
      "question": "A company must verify the actual routes applied to a VM NIC after adding UDRs. Which tool shows this?",
      "options": [
        "The NSG effective security rules only",
        "A budget alert",
        "The effective routes view (Network Watcher / NIC effective routes)",
        "A private DNS zone"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Effective routes on the NIC combine system, peering, gateway, and user-defined routes to show what actually applies. <b>Wrong-Answer Breakdown:</b><ul><li><b>The NSG effective security rules only:</b> That shows security rules, not routing.</li><li><b>A budget alert:</b> Budgets track spend, not routes.</li><li><b>A private DNS zone:</b> DNS zones resolve names, not display routes.</li></ul>"
    },
    {
      "id": "dom4-q24",
      "scenarioTag": "Overlapping Address Space",
      "question": "You attempt to peer two VNets but the operation fails. The most common cause is what?",
      "options": [
        "They are in different regions",
        "They use different subscriptions",
        "One has a NAT gateway",
        "The VNets have overlapping IP address spaces"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> VNet peering requires non-overlapping address spaces; overlapping ranges cause the peering to fail. <b>Wrong-Answer Breakdown:</b><ul><li><b>They are in different regions:</b> Global peering supports different regions, so region difference is not the blocker.</li><li><b>They use different subscriptions:</b> Cross-subscription peering is supported.</li><li><b>One has a NAT gateway:</b> A NAT gateway does not prevent peering.</li></ul>"
    },
    {
      "id": "dom4-q25",
      "scenarioTag": "ExpressRoute + VPN Failover",
      "question": "Contoso uses ExpressRoute and wants a backup path if the circuit fails. What should you add?",
      "options": [
        "A second load balancer",
        "A site-to-site VPN as a failover connection to the same VNet gateway",
        "A private endpoint",
        "A NAT gateway"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> A site-to-site VPN can serve as a resilient failover path for ExpressRoute connectivity to Azure. <b>Wrong-Answer Breakdown:</b><ul><li><b>A second load balancer:</b> Load balancers do not provide WAN failover for ExpressRoute.</li><li><b>A private endpoint:</b> Private endpoints are for PaaS access, not WAN failover.</li><li><b>A NAT gateway:</b> NAT provides outbound internet, not ExpressRoute backup.</li></ul>"
    }
  ],
  "dom5": [
    {
      "id": "dom5-q1",
      "scenarioTag": "Log Analytics",
      "question": "Contoso wants to run KQL queries across logs collected from many VMs and services in one place. What should you deploy?",
      "options": [
        "A Log Analytics workspace",
        "A Recovery Services vault",
        "A storage account only",
        "An action group"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> A Log Analytics workspace ingests logs and metrics and lets you query them with KQL across sources. <b>Wrong-Answer Breakdown:</b><ul><li><b>A Recovery Services vault:</b> Vaults store backups, not queryable log data.</li><li><b>A storage account only:</b> Archiving logs to storage does not provide KQL querying like a workspace.</li><li><b>An action group:</b> Action groups send notifications, not store queryable logs.</li></ul>"
    },
    {
      "id": "dom5-q2",
      "scenarioTag": "Application Insights",
      "question": "A company needs request rates, dependency timings, and failure traces for a web application. What should you enable?",
      "options": [
        "A Recovery Services vault",
        "Application Insights",
        "A metric alert only",
        "Azure Site Recovery"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Application Insights is an APM service capturing requests, dependencies, exceptions, and traces for applications. <b>Wrong-Answer Breakdown:</b><ul><li><b>A Recovery Services vault:</b> Vaults handle backup, not application performance telemetry.</li><li><b>A metric alert only:</b> A single alert does not provide full APM traces and dependency mapping.</li><li><b>Azure Site Recovery:</b> ASR handles disaster recovery, not app performance monitoring.</li></ul>"
    },
    {
      "id": "dom5-q3",
      "scenarioTag": "Action Groups",
      "question": "You are configuring alerts so that when they fire, an email and an SMS are sent and a webhook is called. What defines these responses?",
      "options": [
        "A diagnostic setting",
        "A Log Analytics workspace",
        "An action group referenced by the alert rule",
        "A backup policy"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Action groups define reusable notification and automation actions (email, SMS, webhook, functions) triggered by alerts. <b>Wrong-Answer Breakdown:</b><ul><li><b>A diagnostic setting:</b> Diagnostic settings route logs/metrics, not define alert notifications.</li><li><b>A Log Analytics workspace:</b> A workspace stores data but does not define notification actions.</li><li><b>A backup policy:</b> Backup policies schedule backups, not alert responses.</li></ul>"
    },
    {
      "id": "dom5-q4",
      "scenarioTag": "Metric Alert",
      "question": "Contoso wants to be alerted when a VM's average CPU exceeds 90% for 5 minutes. What should you create?",
      "options": [
        "A log alert with a daily schedule",
        "A backup policy",
        "An action group by itself",
        "A metric alert on Percentage CPU with the threshold and evaluation window"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Metric alerts evaluate a platform metric (like CPU) against a threshold over a window and trigger near real time. <b>Wrong-Answer Breakdown:</b><ul><li><b>A log alert with a daily schedule:</b> A daily schedule is too slow for near-real-time CPU alerting.</li><li><b>A backup policy:</b> Backup policies do not alert on metrics.</li><li><b>An action group by itself:</b> An action group only defines responses; a rule is still needed to trigger it.</li></ul>"
    },
    {
      "id": "dom5-q5",
      "scenarioTag": "Recovery Services Vault",
      "question": "A company needs to back up Azure VMs and on-premises servers to Azure. What resource is required?",
      "options": [
        "A Recovery Services vault",
        "A Log Analytics workspace",
        "A storage account alone",
        "An action group"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> A Recovery Services vault is the resource that stores and manages Azure Backup and Site Recovery data. <b>Wrong-Answer Breakdown:</b><ul><li><b>A Log Analytics workspace:</b> Workspaces store logs, not VM backups.</li><li><b>A storage account alone:</b> A bare storage account is not the managed backup vault construct.</li><li><b>An action group:</b> Action groups send notifications, not store backups.</li></ul>"
    },
    {
      "id": "dom5-q6",
      "scenarioTag": "Azure Site Recovery",
      "question": "Contoso must replicate VMs to a secondary region so it can fail over during a regional disaster. What should you use?",
      "options": [
        "Azure Backup only",
        "Azure Site Recovery (ASR)",
        "A Log Analytics workspace",
        "A metric alert"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> ASR continuously replicates VMs to another region and orchestrates failover and failback for disaster recovery. <b>Wrong-Answer Breakdown:</b><ul><li><b>Azure Backup only:</b> Backup restores point-in-time data but is not orchestrated regional failover replication.</li><li><b>A Log Analytics workspace:</b> Workspaces store logs, not replicate VMs for failover.</li><li><b>A metric alert:</b> Alerts notify but do not replicate or fail over workloads.</li></ul>"
    },
    {
      "id": "dom5-q7",
      "scenarioTag": "Diagnostic Settings",
      "question": "You must send a resource's platform logs and metrics to a Log Analytics workspace. What should you configure?",
      "options": [
        "An action group",
        "A backup policy",
        "A diagnostic setting on the resource targeting the workspace",
        "A metric alert"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Diagnostic settings route a resource's platform logs and metrics to destinations like Log Analytics, storage, or Event Hub. <b>Wrong-Answer Breakdown:</b><ul><li><b>An action group:</b> Action groups notify on alerts; they do not route platform logs.</li><li><b>A backup policy:</b> Backup policies schedule backups, not stream diagnostics.</li><li><b>A metric alert:</b> Alerts fire on conditions but do not continuously export logs.</li></ul>"
    },
    {
      "id": "dom5-q8",
      "scenarioTag": "Backup Policy",
      "question": "A company wants daily VM backups retained for 30 days with weekly points kept for a year. What should you configure?",
      "options": [
        "A diagnostic setting",
        "An action group",
        "A metric alert",
        "An Azure Backup policy defining the schedule and retention"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> A backup policy specifies backup frequency and retention rules (daily, weekly, monthly, yearly) applied to protected items. <b>Wrong-Answer Breakdown:</b><ul><li><b>A diagnostic setting:</b> Diagnostic settings route telemetry, not schedule backups.</li><li><b>An action group:</b> Action groups send notifications, not define backup retention.</li><li><b>A metric alert:</b> Alerts do not schedule or retain backups.</li></ul>"
    },
    {
      "id": "dom5-q9",
      "scenarioTag": "Log Alert KQL",
      "question": "Contoso needs an alert when a specific error string appears more than 10 times in application logs within 5 minutes. What should you create?",
      "options": [
        "A log (search) alert running a KQL query on the Log Analytics workspace",
        "A metric alert",
        "A backup policy",
        "A diagnostic setting"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Log alerts run scheduled KQL queries and fire when the result meets a threshold, such as an error count over 10. <b>Wrong-Answer Breakdown:</b><ul><li><b>A metric alert:</b> Metric alerts use numeric platform metrics, not arbitrary log-text queries.</li><li><b>A backup policy:</b> Backup policies do not evaluate log content.</li><li><b>A diagnostic setting:</b> Diagnostic settings route logs but do not alert on query results.</li></ul>"
    },
    {
      "id": "dom5-q10",
      "scenarioTag": "Activity Log",
      "question": "You must audit who deleted a resource group and when. Where should you look?",
      "options": [
        "Application Insights",
        "The Azure Activity Log",
        "A backup policy",
        "A metric alert history"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> The Activity Log records control-plane operations (create, update, delete) including who performed them and when. <b>Wrong-Answer Breakdown:</b><ul><li><b>Application Insights:</b> App Insights tracks application telemetry, not subscription control-plane actions.</li><li><b>A backup policy:</b> Backup policies do not record who deleted resources.</li><li><b>A metric alert history:</b> Metric alert history shows alert firings, not who performed operations.</li></ul>"
    },
    {
      "id": "dom5-q11",
      "scenarioTag": "Soft Delete Backups",
      "question": "A company wants backups to remain recoverable for 14 days even if someone deletes the backup item. What should you rely on?",
      "options": [
        "A CanNotDelete lock on VMs",
        "GRS on a storage account",
        "Soft delete for backups in the Recovery Services vault",
        "A metric alert"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Backup soft delete retains deleted backup data for 14 days so it can be undeleted, guarding against accidental or malicious deletion. <b>Wrong-Answer Breakdown:</b><ul><li><b>A CanNotDelete lock on VMs:</b> A VM lock does not protect deleted backup items in the vault.</li><li><b>GRS on a storage account:</b> Storage redundancy does not restore deleted vault backup items.</li><li><b>A metric alert:</b> Alerts notify but do not retain deleted backups.</li></ul>"
    },
    {
      "id": "dom5-q12",
      "scenarioTag": "Workbooks",
      "question": "Contoso wants rich, interactive visual reports combining metrics and logs for stakeholders. What should you create?",
      "options": [
        "An action group",
        "A backup policy",
        "A resource lock",
        "An Azure Monitor workbook"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Workbooks combine text, KQL queries, metrics, and parameters into interactive, shareable visual reports. <b>Wrong-Answer Breakdown:</b><ul><li><b>An action group:</b> Action groups send notifications, not visual reports.</li><li><b>A backup policy:</b> Backup policies schedule backups, not reporting.</li><li><b>A resource lock:</b> Locks prevent changes and produce no reports.</li></ul>"
    },
    {
      "id": "dom5-q13",
      "scenarioTag": "VM Insights",
      "question": "A company wants preconfigured performance and dependency monitoring for its VMs with minimal setup. What should you enable?",
      "options": [
        "VM insights",
        "Application Insights",
        "A backup policy",
        "Azure Site Recovery"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> VM insights provides out-of-the-box performance charts and a dependency map for VMs via the monitoring agent. <b>Wrong-Answer Breakdown:</b><ul><li><b>Application Insights:</b> App Insights targets application code telemetry, not VM-level OS performance and maps.</li><li><b>A backup policy:</b> Backup policies do not monitor performance.</li><li><b>Azure Site Recovery:</b> ASR replicates VMs, it does not monitor performance.</li></ul>"
    },
    {
      "id": "dom5-q14",
      "scenarioTag": "Data Retention",
      "question": "You must keep Log Analytics data for two years for compliance while controlling cost. What should you configure?",
      "options": [
        "A backup policy",
        "The workspace data retention (and archive) settings to two years",
        "An action group",
        "A resource lock"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Log Analytics retention settings (with interactive and archive tiers) let you keep data for the required period cost-effectively. <b>Wrong-Answer Breakdown:</b><ul><li><b>A backup policy:</b> Backup policies apply to protected items, not log retention.</li><li><b>An action group:</b> Action groups notify; they do not set retention.</li><li><b>A resource lock:</b> Locks do not control data retention periods.</li></ul>"
    },
    {
      "id": "dom5-q15",
      "scenarioTag": "Alert Processing Rules",
      "question": "Contoso wants to suppress alert notifications during a planned maintenance window. What should you configure?",
      "options": [
        "Delete the alert rules temporarily",
        "A diagnostic setting",
        "An alert processing rule that suppresses notifications during the window",
        "A backup policy"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Alert processing rules can suppress or modify notifications on a schedule, ideal for maintenance windows. <b>Wrong-Answer Breakdown:</b><ul><li><b>Delete the alert rules temporarily:</b> Deleting and recreating rules is error-prone and unnecessary.</li><li><b>A diagnostic setting:</b> Diagnostic settings route telemetry, not suppress alerts.</li><li><b>A backup policy:</b> Backup policies are unrelated to alert suppression.</li></ul>"
    },
    {
      "id": "dom5-q16",
      "scenarioTag": "Cross-Region Restore",
      "question": "A company wants the ability to restore backups in the paired region even without a declared disaster. What should you enable?",
      "options": [
        "A metric alert",
        "LRS redundancy on the vault",
        "A diagnostic setting",
        "Cross-region restore on the Recovery Services vault (with GRS)"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Cross-region restore, available with GRS vaults, lets you restore backups in the secondary region on demand. <b>Wrong-Answer Breakdown:</b><ul><li><b>A metric alert:</b> Alerts do not enable cross-region restore.</li><li><b>LRS redundancy on the vault:</b> LRS keeps data in one region, preventing paired-region restore.</li><li><b>A diagnostic setting:</b> Diagnostic settings route logs, not enable restores.</li></ul>"
    },
    {
      "id": "dom5-q17",
      "scenarioTag": "Autoscale Monitoring",
      "question": "You are configuring autoscale for a VMSS and want it based on a metric collected by Azure Monitor. Which metric source is standard?",
      "options": [
        "Azure Monitor platform metrics such as Percentage CPU",
        "A backup policy",
        "A resource lock",
        "An Activity Log entry"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Autoscale rules consume Azure Monitor metrics (e.g., CPU) to add or remove instances automatically. <b>Wrong-Answer Breakdown:</b><ul><li><b>A backup policy:</b> Backup policies do not drive autoscale.</li><li><b>A resource lock:</b> Locks cannot trigger scaling.</li><li><b>An Activity Log entry:</b> Activity Log records operations, not real-time metrics for scaling.</li></ul>"
    },
    {
      "id": "dom5-q18",
      "scenarioTag": "Change Analysis",
      "question": "Contoso needs to find what configuration change caused a recent app outage. Which Azure Monitor feature helps?",
      "options": [
        "A backup policy",
        "Change Analysis",
        "An action group",
        "A resource lock"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Change Analysis surfaces recent resource and configuration changes to help pinpoint what triggered an incident. <b>Wrong-Answer Breakdown:</b><ul><li><b>A backup policy:</b> Backup policies do not track configuration changes.</li><li><b>An action group:</b> Action groups notify; they do not analyze changes.</li><li><b>A resource lock:</b> Locks prevent changes but do not analyze past ones.</li></ul>"
    },
    {
      "id": "dom5-q19",
      "scenarioTag": "Smart Detection",
      "question": "A company wants automatic anomaly detection of failure spikes in its web app telemetry. What provides this?",
      "options": [
        "A static metric threshold alert",
        "A backup policy",
        "Application Insights Smart Detection",
        "Azure Site Recovery"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Smart Detection uses machine learning on Application Insights telemetry to automatically flag anomalies like failure spikes. <b>Wrong-Answer Breakdown:</b><ul><li><b>A static metric threshold alert:</b> Static thresholds do not adapt to detect anomalies automatically.</li><li><b>A backup policy:</b> Backups do not detect telemetry anomalies.</li><li><b>Azure Site Recovery:</b> ASR handles failover, not anomaly detection.</li></ul>"
    },
    {
      "id": "dom5-q20",
      "scenarioTag": "Metrics vs Logs",
      "question": "You need sub-minute, numeric time-series data for near-real-time alerting on resource performance. Which should you use?",
      "options": [
        "Log Analytics logs only",
        "A backup policy",
        "An Activity Log alert",
        "Azure Monitor metrics"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> Metrics are lightweight numeric time-series collected at one-minute or finer granularity, ideal for fast alerting. <b>Wrong-Answer Breakdown:</b><ul><li><b>Log Analytics logs only:</b> Log queries have higher latency and are less suited to sub-minute numeric alerting.</li><li><b>A backup policy:</b> Backups are not a telemetry source.</li><li><b>An Activity Log alert:</b> Activity Log tracks operations, not performance time-series.</li></ul>"
    },
    {
      "id": "dom5-q21",
      "scenarioTag": "File-Level Restore",
      "question": "Contoso needs to recover a single file from a VM backup without restoring the whole VM. What should you use?",
      "options": [
        "The Azure Backup file recovery (item-level restore) feature",
        "A full VM restore",
        "Azure Site Recovery failover",
        "A metric alert"
      ],
      "correct": 0,
      "guide": "<b>Why Correct:</b> Item-level (file) recovery mounts the recovery point so you can copy individual files without a full VM restore. <b>Wrong-Answer Breakdown:</b><ul><li><b>A full VM restore:</b> Restoring the whole VM is unnecessary and slower for a single file.</li><li><b>Azure Site Recovery failover:</b> ASR fails over VMs, not restore individual files.</li><li><b>A metric alert:</b> Alerts do not restore files.</li></ul>"
    },
    {
      "id": "dom5-q22",
      "scenarioTag": "Diagnostic to Event Hub",
      "question": "A company must stream resource diagnostics to a third-party SIEM in near real time. What destination should the diagnostic setting use?",
      "options": [
        "A Recovery Services vault",
        "An Event Hub",
        "A backup policy",
        "A resource lock"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Diagnostic settings can send logs/metrics to an Event Hub, which SIEMs and partner tools consume in near real time. <b>Wrong-Answer Breakdown:</b><ul><li><b>A Recovery Services vault:</b> Vaults store backups, not stream telemetry to a SIEM.</li><li><b>A backup policy:</b> Backup policies do not stream diagnostics.</li><li><b>A resource lock:</b> Locks are unrelated to telemetry streaming.</li></ul>"
    },
    {
      "id": "dom5-q23",
      "scenarioTag": "Alert Severity",
      "question": "You are configuring alerts and want on-call routing to differentiate critical from informational events. What should you set on each alert?",
      "options": [
        "A backup retention value",
        "A resource lock",
        "An appropriate alert severity level (Sev 0–4)",
        "A diagnostic setting"
      ],
      "correct": 2,
      "guide": "<b>Why Correct:</b> Alert rules have severity levels (Sev0 critical to Sev4 verbose) that on-call tools use to prioritize response. <b>Wrong-Answer Breakdown:</b><ul><li><b>A backup retention value:</b> Retention is a backup setting, not alert prioritization.</li><li><b>A resource lock:</b> Locks do not classify alert importance.</li><li><b>A diagnostic setting:</b> Diagnostic settings route logs, not classify alerts.</li></ul>"
    },
    {
      "id": "dom5-q24",
      "scenarioTag": "Agent Health",
      "question": "Contoso wants to confirm the monitoring agent is reporting from all VMs and detect ones that stopped. What should you use?",
      "options": [
        "A backup policy",
        "An action group only",
        "A resource lock",
        "A heartbeat log query / agent health in Log Analytics"
      ],
      "correct": 3,
      "guide": "<b>Why Correct:</b> The Heartbeat table in Log Analytics shows agent check-ins, letting you alert on VMs that stop reporting. <b>Wrong-Answer Breakdown:</b><ul><li><b>A backup policy:</b> Backup policies do not track agent heartbeats.</li><li><b>An action group only:</b> An action group notifies but does not itself track heartbeats.</li><li><b>A resource lock:</b> Locks do not report agent health.</li></ul>"
    },
    {
      "id": "dom5-q25",
      "scenarioTag": "Log Ingestion Cost",
      "question": "A company's Log Analytics costs are high due to verbose logs. What is the most direct way to control ingestion cost?",
      "options": [
        "Delete the Recovery Services vault",
        "Reduce collected data by scoping data collection rules / filtering log categories",
        "Add more action groups",
        "Apply a resource lock"
      ],
      "correct": 1,
      "guide": "<b>Why Correct:</b> Filtering what is collected via data collection rules and selecting only needed categories directly lowers ingestion volume and cost. <b>Wrong-Answer Breakdown:</b><ul><li><b>Delete the Recovery Services vault:</b> Vaults are unrelated to Log Analytics ingestion cost.</li><li><b>Add more action groups:</b> Action groups do not reduce ingestion volume.</li><li><b>Apply a resource lock:</b> Locks do not reduce data ingestion.</li></ul>"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) { module.exports = domainQuestionDatabase; }
