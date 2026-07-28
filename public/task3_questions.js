// AZ-104 Study Questions - Task 3: Practice Questions Bank
// 125 practice questions across all 5 AZ-104 domains.

var az104Questions = [

  // ─── DOMAIN 1: Identity, Governance & Compliance (Q1-Q25) ───────────────

  { id: 1, domain: "domain1", difficulty: "medium",
    question: "You need to assign a role so a user can read all resources in a subscription but cannot make any changes. Which built-in RBAC role should you assign?",
    options: ["A. Owner", "B. Contributor", "C. Reader", "D. User Access Administrator"],
    correct: "C",
    explanation: "The Reader role grants read-only access to view all resources but does not allow changes. Owner has full control including access management, Contributor can change resources but not manage access, and User Access Administrator manages access assignments only."
  },
  { id: 2, domain: "domain1", difficulty: "hard",
    question: "You need to ensure MFA is required for all admin accounts in your Azure AD tenant. What is the most efficient approach?",
    options: ["A. Configure Conditional Access policies targeting admin roles", "B. Enable per-user MFA for each admin account individually", "C. Use Identity Protection risk policies", "D. Configure Azure AD Privileged Identity Management"],
    correct: "A",
    explanation: "Conditional Access policies targeting admin roles provide the most efficient and scalable approach. A single policy applies to all users with administrator roles, requiring MFA for all sign-ins. Per-user MFA is manual and doesn't scale well."
  },
  { id: 3, domain: "domain1", difficulty: "easy",
    question: "What is the maximum number of custom roles that can be created in an Azure AD tenant?",
    options: ["A. 1000", "B. 2000", "C. 5000", "D. Unlimited"],
    correct: "C",
    explanation: "Azure allows up to 5,000 custom roles per Azure AD tenant. This limit applies across all subscriptions within the tenant."
  },
  { id: 4, domain: "domain1", difficulty: "medium",
    question: "You need to create a resource group and deploy resources consistently across environments using Azure-native infrastructure as code. Which service should you use?",
    options: ["A. Azure PowerShell scripts", "B. Azure CLI scripts", "C. Azure Resource Manager (ARM) templates", "D. Azure Management Groups"],
    correct: "C",
    explanation: "ARM templates provide declarative infrastructure as code for Azure. They ensure consistent, idempotent deployments across environments. PowerShell and CLI scripts are imperative and harder to maintain for complex deployments."
  },
  { id: 5, domain: "domain1", difficulty: "hard",
    question: "Your organization has 3 management groups, 10 subscriptions, and 50 resource groups. You need to assign a policy that requires all resources to have a 'CostCenter' tag. At which scope should you assign the policy to minimize administrative effort?",
    options: ["A. Each resource group", "B. Each subscription", "C. The top-level management group", "D. Each resource individually"],
    correct: "C",
    explanation: "Assigning the policy at the top-level management group means it inherits down to all subscriptions, resource groups, and resources. This requires only one assignment and covers all current and future resources automatically."
  },
  { id: 6, domain: "domain1", difficulty: "medium",
    question: "You create a resource lock of type 'ReadOnly' on a resource group. What is the effect on resources within that group?",
    options: ["A. Resources can be read and modified, but not deleted", "B. Resources can be read only — modification and deletion are blocked", "C. Resources can be read and deleted, but not modified", "D. All operations including reads are blocked"],
    correct: "B",
    explanation: "A ReadOnly lock prevents modification and deletion while allowing read operations. The CanNotDelete lock allows both reads and modifications but prevents deletion. ReadOnly is the most restrictive lock type available."
  },
  { id: 7, domain: "domain1", difficulty: "easy",
    question: "Which Azure AD group type allows membership to be automatically updated based on user attribute values?",
    options: ["A. Assigned groups", "B. Dynamic user groups", "C. Distribution groups", "D. Mail-enabled security groups"],
    correct: "B",
    explanation: "Dynamic user groups use membership rules based on user attributes (e.g., department, job title, location). Azure AD evaluates these rules automatically and updates group membership without manual intervention."
  },
  { id: 8, domain: "domain1", difficulty: "hard",
    question: "You need to allow a third-party application to access Azure resources without using user credentials. The access should be scoped to a specific resource group. What is the most secure approach?",
    options: ["A. Create a service principal with a client secret and assign RBAC to the RG", "B. Create a managed identity and assign RBAC to the RG", "C. Share an admin account credentials with the application", "D. Use an SAS token for all resource access"],
    correct: "B",
    explanation: "A managed identity (system-assigned or user-assigned) eliminates the need to manage credentials entirely. Azure handles credential rotation automatically. Service principals require managing secrets/certificates. Sharing admin credentials is insecure."
  },
  { id: 9, domain: "domain1", difficulty: "medium",
    question: "Your organization has a policy that requires all Azure resources to be deployed only in specific regions. Which Azure Policy effect should you use to prevent deployments to unauthorized regions?",
    options: ["A. Audit", "B. Append", "C. Deny", "D. DeployIfNotExists"],
    correct: "C",
    explanation: "The Deny effect prevents resources from being created or updated if they don't comply with the policy condition. Audit only logs non-compliant resources but allows creation. Append adds fields to resources. DeployIfNotExists creates related resources."
  },
  { id: 10, domain: "domain1", difficulty: "medium",
    question: "You have an Azure AD tenant with a P2 license. You want to require approval before a user can activate the 'Global Administrator' role. Which feature should you configure?",
    options: ["A. Conditional Access", "B. Azure AD Identity Protection", "C. Privileged Identity Management (PIM)", "D. Access Reviews"],
    correct: "C",
    explanation: "PIM (Privileged Identity Management) enables just-in-time privileged access with approval workflows, time limits, and justification requirements. It requires Azure AD P2 and is the correct tool for controlling privileged role activation."
  },
  { id: 11, domain: "domain1", difficulty: "easy",
    question: "Which RBAC role allows a user to manage all Azure resources but NOT assign roles to other users?",
    options: ["A. Owner", "B. Contributor", "C. Reader", "D. User Access Administrator"],
    correct: "B",
    explanation: "The Contributor role provides full access to manage all Azure resources (create, modify, delete) but cannot grant or manage access rights to other users. Owner has full control including access management."
  },
  { id: 12, domain: "domain1", difficulty: "hard",
    question: "You configured a Conditional Access policy requiring compliant devices for accessing Office 365. A user reports they cannot access Office 365 from their personal phone. What is the most likely cause?",
    options: ["A. The user's account is locked in Azure AD", "B. The user's device is not enrolled in Intune and marked compliant", "C. MFA is not configured for the user", "D. The user's license has expired"],
    correct: "B",
    explanation: "A device compliance requirement means the device must be enrolled in Microsoft Intune and meet the compliance policy settings (e.g., PIN, encryption, OS version). Personal devices not enrolled in Intune will not meet this requirement."
  },
  { id: 13, domain: "domain1", difficulty: "medium",
    question: "You need to ensure users can reset their own passwords without contacting the helpdesk. What feature should you enable?",
    options: ["A. Conditional Access with password change policy", "B. Self-Service Password Reset (SSPR)", "C. Azure AD Identity Protection", "D. Multi-Factor Authentication"],
    correct: "B",
    explanation: "SSPR (Self-Service Password Reset) allows users to reset or unlock their own accounts without contacting IT. You configure authentication methods (email, phone, authenticator app) that users must register to use SSPR."
  },
  { id: 14, domain: "domain1", difficulty: "hard",
    question: "You assign the Owner role to User A at the subscription level. User A is also a member of a group that has a Deny assignment for the 'Microsoft.Compute/virtualMachines/delete' action. What happens when User A tries to delete a VM?",
    options: ["A. User A can delete the VM because Owner overrides Deny", "B. User A cannot delete the VM because Deny assignments take precedence over role assignments", "C. User A can delete the VM because Deny only applies to individual users, not groups", "D. User A cannot delete the VM because Owner doesn't include delete permissions"],
    correct: "B",
    explanation: "Deny assignments take precedence over role assignments, regardless of the role. Even an Owner with a Deny assignment blocking a specific action cannot perform that action. Deny assignments are created by Azure Blueprints and managed applications."
  },
  { id: 15, domain: "domain1", difficulty: "easy",
    question: "What is the default retention period for the Azure AD Activity Log (audit log)?",
    options: ["A. 7 days", "B. 30 days", "C. 90 days", "D. 365 days"],
    correct: "B",
    explanation: "Azure AD audit and sign-in logs are retained for 30 days in the Azure portal by default. With P1/P2 licenses, you can export logs to a storage account, Event Hub, or Log Analytics workspace for longer retention."
  },
  { id: 16, domain: "domain1", difficulty: "medium",
    question: "You need to create a custom RBAC role that allows users to start and stop VMs but not create or delete them. What should you include in the role definition?",
    options: ["A. Actions: Microsoft.Compute/virtualMachines/read, write, delete", "B. Actions: Microsoft.Compute/virtualMachines/start/action, deallocate/action; DataActions: none", "C. Actions: Microsoft.Compute/virtualMachines/start/action, deallocate/action, read", "D. Actions: Microsoft.Compute/virtualMachines/* with NotActions for write and delete"],
    correct: "C",
    explanation: "The custom role needs: read action (to see VMs), start/action, and deallocate/action. Including 'read' is necessary so users can view VMs in the portal. The start and deallocate/action permissions handle power operations without granting full write or delete."
  },
  { id: 17, domain: "domain1", difficulty: "medium",
    question: "Your organization wants to enforce governance across 8 subscriptions. All subscriptions belong to the same Azure AD tenant. What is the most efficient way to manage policies across all subscriptions?",
    options: ["A. Assign policies individually to each subscription", "B. Create a management group and assign policies at the management group level", "C. Create a separate Azure AD tenant for each subscription", "D. Use Azure Blueprints on each subscription"],
    correct: "B",
    explanation: "Management groups allow you to organize subscriptions and apply policies, RBAC, and initiatives at the management group level. All child subscriptions inherit these assignments, eliminating the need to apply them to each subscription individually."
  },
  { id: 18, domain: "domain1", difficulty: "hard",
    question: "You need to invite 500 external users (B2B) to your Azure AD tenant from a CSV file. What is the most efficient approach?",
    options: ["A. Invite each user manually through the Azure portal", "B. Use PowerShell with the New-AzureADMSInvitation cmdlet in a loop", "C. Use the bulk invite feature in the Azure portal with a CSV file", "D. Create accounts for them as internal members"],
    correct: "C",
    explanation: "The bulk invite feature in the Azure portal allows importing a CSV file with email addresses and redirect URLs to invite up to 500 users at once. PowerShell scripting also works but the bulk invite portal feature is the most efficient for this scenario."
  },
  { id: 19, domain: "domain1", difficulty: "easy",
    question: "Which Azure AD license tier is required to use Conditional Access policies?",
    options: ["A. Azure AD Free", "B. Azure AD P1", "C. Azure AD P2", "D. Microsoft 365 E3"],
    correct: "B",
    explanation: "Azure AD P1 is the minimum license required for Conditional Access policies. Azure AD Free does not include Conditional Access. P2 adds Identity Protection and PIM. Microsoft 365 E3/Business Premium includes P1 features."
  },
  { id: 20, domain: "domain1", difficulty: "medium",
    question: "You deploy an ARM template to a resource group using Complete mode. The resource group already contains Resource A (in the template) and Resource B (not in the template). What happens to Resource B?",
    options: ["A. Resource B is left unchanged", "B. Resource B is deleted", "C. Resource B is modified to match template defaults", "D. The deployment fails because of the conflict"],
    correct: "B",
    explanation: "In Complete deployment mode, Azure deletes any resources in the resource group that are NOT specified in the template. Resource B is not in the template, so it will be deleted. Incremental mode (default) would leave Resource B unchanged."
  },
  { id: 21, domain: "domain1", difficulty: "hard",
    question: "You need users in Group A to only access the Azure portal from corporate IP addresses. Users in Group B should be able to access from anywhere but must use MFA. What is the minimum number of Conditional Access policies needed?",
    options: ["A. 1 policy", "B. 2 policies", "C. 3 policies", "D. 4 policies"],
    correct: "B",
    explanation: "Two policies are needed: Policy 1 targets Group A, condition is non-corporate IP locations, action is Block. Policy 2 targets Group B, condition is any location, action is require MFA. These are distinct conditions and different access controls requiring separate policies."
  },
  { id: 22, domain: "domain1", difficulty: "medium",
    question: "What is the maximum number of resource tags that can be applied to a single Azure resource?",
    options: ["A. 15", "B. 25", "C. 50", "D. 100"],
    correct: "C",
    explanation: "Each Azure resource, resource group, and subscription can have a maximum of 50 tag name-value pairs. Tag names are case-insensitive (limited to 512 characters) while tag values are case-sensitive (limited to 256 characters)."
  },
  { id: 23, domain: "domain1", difficulty: "easy",
    question: "Which scope is at the TOP of the Azure resource hierarchy for organizing multiple subscriptions?",
    options: ["A. Subscription", "B. Resource Group", "C. Management Group", "D. Azure AD Tenant"],
    correct: "C",
    explanation: "Management Groups sit above subscriptions in the Azure resource hierarchy. The hierarchy is: Root Management Group → Management Groups → Subscriptions → Resource Groups → Resources. Management Groups allow applying governance at scale across subscriptions."
  },
  { id: 24, domain: "domain1", difficulty: "hard",
    question: "You enable Azure Policy with the DeployIfNotExists effect. What happens when the policy finds a non-compliant resource?",
    options: ["A. The resource is deleted", "B. The policy denies future deployments of the resource type", "C. A remediation task deploys the required related resource", "D. An audit log entry is created but no action is taken"],
    correct: "C",
    explanation: "DeployIfNotExists triggers a remediation task that deploys the specified related resource when the policy finds a non-compliant resource. For example, deploying a Log Analytics agent when a VM doesn't have it. Remediation tasks run under a managed identity with appropriate permissions."
  },
  { id: 25, domain: "domain1", difficulty: "medium",
    question: "A user cannot access Azure resources despite being assigned the Contributor role at the subscription level. Which of the following is the MOST likely reason?",
    options: ["A. The Contributor role doesn't apply to the subscription scope", "B. A CanNotDelete lock is preventing access", "C. A Deny assignment is blocking the specific action", "D. The user's Azure AD account is disabled"],
    correct: "D",
    explanation: "If a user's Azure AD account is disabled, they cannot authenticate and access any Azure resources regardless of RBAC assignments. A CanNotDelete lock doesn't block reads or creates. A Deny assignment would block specific actions, not all access. Contributor applies at subscription scope."
  },

  // ─── DOMAIN 2: Storage (Q26-Q50) ─────────────────────────────────────────

  { id: 26, domain: "domain2", difficulty: "medium",
    question: "You need to provide a third-party application temporary access to a specific blob container for 24 hours without exposing your account keys. What should you use?",
    options: ["A. Storage account access keys", "B. Shared Access Signature (SAS) token", "C. Azure AD authentication with a service principal", "D. Storage firewall rules with the app's IP"],
    correct: "B",
    explanation: "A SAS token provides temporary, limited access to storage resources without exposing account keys. You can set an expiry time (24 hours), limit permissions (read/write/delete), and scope it to a specific container."
  },
  { id: 27, domain: "domain2", difficulty: "hard",
    question: "You need to automatically move blobs to Cool tier after 30 days of no access and delete them after 90 days total. What is the correct configuration?",
    options: ["A. One rule: tier to Cool after 30 days since last modified, delete after 90 days since last modified", "B. One rule: tier to Cool after 30 days since last access, delete after 90 days since last access (with access time tracking enabled)", "C. Two rules: one for tiering, one for deletion, using creation time", "D. Configure a retention policy for 90 days and set Cool tier as default"],
    correct: "B",
    explanation: "The lifecycle policy should use 'last access time' tracking (must be enabled on the storage account first). One rule with two conditions: tierToCool at 30 days since last accessed, delete at 90 days since last accessed. All based on access time, not modification time."
  },
  { id: 28, domain: "domain2", difficulty: "medium",
    question: "You have a storage account in East US. You need the data to be available for reads even if the primary region is unavailable. What redundancy option should you choose?",
    options: ["A. LRS (Locally Redundant Storage)", "B. ZRS (Zone-Redundant Storage)", "C. GRS (Geo-Redundant Storage)", "D. RA-GRS (Read-Access Geo-Redundant Storage)"],
    correct: "D",
    explanation: "RA-GRS provides geo-replication to a secondary region AND a read-only endpoint for the secondary region. With GRS, the secondary is readable only after failover. LRS and ZRS do not provide cross-region redundancy. RA-GRS is the only option for reads during primary region unavailability."
  },
  { id: 29, domain: "domain2", difficulty: "easy",
    question: "Which type of Azure Storage blob is optimized for appending data, such as logging?",
    options: ["A. Block blob", "B. Page blob", "C. Append blob", "D. Queue blob"],
    correct: "C",
    explanation: "Append blobs are optimized for append operations and cannot modify or delete existing data. They are ideal for logging, diagnostic data, and audit trails. Block blobs are for general-purpose storage and page blobs are for random read/write (used for VHDs)."
  },
  { id: 30, domain: "domain2", difficulty: "hard",
    question: "You need to allow an Azure VM to access a storage account without using access keys or SAS tokens. The VM should access only the specific storage account. What is the most secure approach?",
    options: ["A. Enable the storage firewall and add the VM's public IP", "B. Enable a system-assigned managed identity on the VM and assign 'Storage Blob Data Contributor' role", "C. Create a service principal and store the client secret in the VM's environment variables", "D. Use a User Delegation SAS generated from an admin account"],
    correct: "B",
    explanation: "A system-assigned managed identity on the VM allows it to authenticate to Azure services using its Azure AD identity without storing credentials. Assigning 'Storage Blob Data Contributor' (a data-plane role) grants access to the specific storage account. This is the most secure approach."
  },
  { id: 31, domain: "domain2", difficulty: "medium",
    question: "You have an Azure file share that needs to be mounted on Windows Server 2019 running on-premises. The connection must use encryption. What protocol and port must be allowed through your firewall?",
    options: ["A. NFS port 2049", "B. SMB port 445 over TCP", "C. iSCSI port 3260", "D. HTTPS port 443"],
    correct: "B",
    explanation: "Azure Files uses SMB 3.x protocol which requires TCP port 445. SMB 3.x includes encryption in transit. Many ISPs and corporate firewalls block port 445. If port 445 is blocked, use Azure File Sync instead, which uses HTTPS (port 443)."
  },
  { id: 32, domain: "domain2", difficulty: "easy",
    question: "What is the maximum size of a single block blob in Azure Storage?",
    options: ["A. 5 GB", "B. 50 GB", "C. 190.7 TB", "D. 5 TB"],
    correct: "C",
    explanation: "Block blobs support up to 190.7 TB (50,000 blocks × 4,000 MB per block). Page blobs (used for VHDs) support up to 8 TB. Azure Files shares support up to 100 TiB with large file shares enabled."
  },
  { id: 33, domain: "domain2", difficulty: "hard",
    question: "You need to store sensitive business data in Azure Blob Storage with customer-managed encryption keys stored in Azure Key Vault. What must you configure?",
    options: ["A. Enable transparent data encryption and link to the Key Vault key", "B. Configure customer-managed keys (CMK) in the storage account's Encryption settings", "C. Create an SAS token using the Key Vault key", "D. Enable Always Encrypted with Key Vault as the key store"],
    correct: "B",
    explanation: "Azure Storage encryption with customer-managed keys (CMK) is configured in the storage account's Encryption settings. You link to an Azure Key Vault and key. The storage service uses the CMK to encrypt the data encryption key. The key must be RSA and have specific Key Vault access permissions."
  },
  { id: 34, domain: "domain2", difficulty: "medium",
    question: "You accidentally deleted an important file from an Azure file share. The share has soft delete enabled with a 14-day retention period. The file was deleted 5 days ago. What can you do?",
    options: ["A. Restore the file from the last backup only", "B. Recover the file using the soft delete recovery feature in the portal", "C. Use Azure Site Recovery to restore the file", "D. The file is permanently deleted and cannot be recovered"],
    correct: "B",
    explanation: "With soft delete enabled, deleted files and shares are retained for the configured retention period (14 days in this case). Since only 5 days have passed, you can recover the file from the Azure portal or via the REST API/PowerShell/CLI. The file is not permanently deleted yet."
  },
  { id: 35, domain: "domain2", difficulty: "medium",
    question: "Which redundancy option provides 3 synchronous copies across 3 availability zones within the same region?",
    options: ["A. LRS", "B. ZRS", "C. GRS", "D. GZRS"],
    correct: "B",
    explanation: "ZRS (Zone-Redundant Storage) stores 3 synchronous copies across 3 availability zones in the same region. This protects against datacenter-level failures. LRS stores 3 copies in a single datacenter. GRS replicates to another region asynchronously."
  },
  { id: 36, domain: "domain2", difficulty: "hard",
    question: "You need to copy 50 TB of data from on-premises to Azure Blob Storage as quickly as possible. What is the most efficient method?",
    options: ["A. Upload using AzCopy over your internet connection", "B. Use Azure Data Box to physically ship data to Microsoft", "C. Create a Site-to-Site VPN and use Storage Explorer to transfer", "D. Use Azure File Sync to migrate the data"],
    correct: "B",
    explanation: "Azure Data Box is a physical device Microsoft ships to your location. You copy data to it locally, ship it back, and Microsoft uploads it to Azure Storage. For large datasets (>40 TB), Data Box is faster than internet transfer. AzCopy over internet would be very slow for 50 TB."
  },
  { id: 37, domain: "domain2", difficulty: "easy",
    question: "Which type of SAS token is signed with Azure AD user credentials and is considered the most secure?",
    options: ["A. Account SAS", "B. Service SAS", "C. User Delegation SAS", "D. Stored Access Policy SAS"],
    correct: "C",
    explanation: "A User Delegation SAS is signed with Azure AD credentials (not storage account keys) and is valid for up to 7 days. This is the most secure type because it uses the Azure AD identity and inherits the user's permissions. Account and Service SAS tokens use storage account keys."
  },
  { id: 38, domain: "domain2", difficulty: "medium",
    question: "You have a storage account with the firewall configured to allow access from selected virtual networks. A VM in another VNet needs access to the storage account. What should you configure?",
    options: ["A. Add a VNet peering between the two VNets", "B. Add the second VNet to the storage account's firewall rules using a service endpoint", "C. Create an SAS token and use it from the VM", "D. Create a private endpoint in the storage account"],
    correct: "B",
    explanation: "Adding the second VNet (via subnet) to the storage firewall's VNet rules using a service endpoint allows the VM to access the storage account through the Microsoft backbone. The VM must have a service endpoint configured on its subnet for Microsoft.Storage. Alternatively, a private endpoint gives a private IP directly."
  },
  { id: 39, domain: "domain2", difficulty: "hard",
    question: "You configure a lifecycle management policy on your storage account to archive blobs after 30 days. A blob was archived yesterday. A user needs to read the blob immediately. How should you rehydrate it at the fastest speed?",
    options: ["A. Use Standard priority rehydration — it will be available in 1-2 hours", "B. Use High priority rehydration — available within 1 hour for blobs < 10 GB", "C. Move the blob to Cool tier first, then to Hot tier", "D. Download directly from archive — archive supports direct download"],
    correct: "B",
    explanation: "High priority rehydration from archive completes within 1 hour for blobs under 10 GB and within 12 hours for larger blobs. Standard priority takes 1-15 hours. You cannot read directly from archive tier — you must rehydrate to Hot or Cool first."
  },
  { id: 40, domain: "domain2", difficulty: "medium",
    question: "You need to enable immutable storage for compliance. Which feature should you use to prevent blobs from being modified or deleted for 7 years?",
    options: ["A. Blob soft delete with 7-year retention", "B. Time-based retention policy (WORM)", "C. Storage account lock", "D. Azure Backup for blob storage"],
    correct: "B",
    explanation: "Time-based retention policies implement WORM (Write Once Read Many) storage. Once set, blobs cannot be modified or deleted until the retention period expires. This is a compliance feature that satisfies SEC 17a-4 and similar regulations. Soft delete is a recovery mechanism, not a WORM solution."
  },
  { id: 41, domain: "domain2", difficulty: "easy",
    question: "Which AzCopy command synchronizes a local folder to an Azure Blob container, deleting blobs not present locally?",
    options: ["A. azcopy copy './local/*' 'https://account.blob.core.windows.net/container'", "B. azcopy sync './local/' 'https://account.blob.core.windows.net/container' --delete-destination=true", "C. azcopy upload './local/' 'https://account.blob.core.windows.net/container'", "D. azcopy transfer './local/' 'https://account.blob.core.windows.net/container' --sync"],
    correct: "B",
    explanation: "azcopy sync performs incremental sync and can delete destination blobs not present in the source when using --delete-destination=true. azcopy copy transfers all files without deletion. There is no 'azcopy upload' or 'azcopy transfer' command."
  },
  { id: 42, domain: "domain2", difficulty: "hard",
    question: "You have a GPv2 storage account. You need to ensure that blob data is encrypted with customer-managed keys and the key rotation is handled automatically. What combination should you configure?",
    options: ["A. Customer-managed keys in Key Vault + manual key rotation every 90 days", "B. Customer-managed keys with Auto-rotation enabled in Key Vault", "C. Service-managed keys with automatic rotation by Microsoft", "D. Customer-managed keys stored in the storage account itself"],
    correct: "B",
    explanation: "Azure Key Vault supports automatic key rotation for storage account customer-managed keys. Configure CMK in storage account settings, link to a Key Vault key, and enable auto-rotation in Key Vault. Azure Storage automatically uses the new key version after rotation, without requiring manual updates."
  },
  { id: 43, domain: "domain2", difficulty: "medium",
    question: "You need to store virtual machine disk data with the lowest possible latency and highest IOPS for a SQL Server workload. Which storage type should you use?",
    options: ["A. Standard HDD Managed Disk", "B. Standard SSD Managed Disk", "C. Premium SSD Managed Disk", "D. Azure Blob Storage (Page Blob)"],
    correct: "C",
    explanation: "Premium SSD Managed Disks provide the highest performance with guaranteed IOPS/throughput (up to 20,000 IOPS and 900 MB/s per disk for P50). They are optimized for I/O-intensive workloads like SQL Server. Ultra Disk provides even higher performance but with more configuration complexity."
  },
  { id: 44, domain: "domain2", difficulty: "easy",
    question: "What is the Archive access tier best suited for?",
    options: ["A. Data accessed daily", "B. Data accessed a few times per month", "C. Data rarely accessed and stored for years with flexible retrieval requirements", "D. Data that must be accessible within seconds at any time"],
    correct: "C",
    explanation: "Archive tier is for data that is rarely accessed, stored for at least 180 days, and can tolerate retrieval times of hours. It has the lowest storage cost but the highest access cost and retrieval latency. Use Hot for frequent access, Cool for infrequent monthly access."
  },
  { id: 45, domain: "domain2", difficulty: "hard",
    question: "You have an Azure File Sync setup. The cloud endpoint is an Azure file share and you have three server endpoints. Cloud tiering is enabled with 20% free space policy. What happens when a server endpoint's volume is 85% full?",
    options: ["A. The sync fails and data is not uploaded to the cloud share", "B. Old files are tiered to the cloud and replaced with stubs until free space is above 20%", "C. The server endpoint is automatically removed from the sync group", "D. AFS compresses files to create more space"],
    correct: "B",
    explanation: "With cloud tiering enabled and 20% free space policy, AFS will tier the least recently accessed files to the cloud and replace them with recall stubs to maintain at least 20% free space. The full file data is in Azure Files; locally only frequently accessed files are cached in full."
  },
  { id: 46, domain: "domain2", difficulty: "medium",
    question: "You need to migrate a storage account to a different subscription. What is the correct approach?",
    options: ["A. Use Azure Resource Mover to move the storage account to the new subscription", "B. Use az storage account update --subscription to change the subscription", "C. Export an ARM template of the storage account and redeploy to the new subscription", "D. Create a new storage account in the target subscription and use AzCopy to migrate the data"],
    correct: "A",
    explanation: "Azure Resource Mover supports moving storage accounts between subscriptions within the same region. Alternatively, you can use the Move feature in the Azure portal (resource group/subscription move). Option D would also work but requires data migration. Option B doesn't exist as a command."
  },
  { id: 47, domain: "domain2", difficulty: "medium",
    question: "A developer complains that they cannot upload files to a blob container even though they have the 'Storage Account Contributor' role. What is the likely reason?",
    options: ["A. Storage Account Contributor doesn't grant permissions to read blobs", "B. Storage Account Contributor is a control-plane role and doesn't grant data-plane (blob read/write) permissions", "C. The container doesn't have public access enabled", "D. The developer needs the Storage Account Owner role instead"],
    correct: "B",
    explanation: "Storage Account Contributor is a management/control-plane role that grants access to manage the storage account (settings, keys) but NOT to read or write blob/file data. Data-plane operations require roles like Storage Blob Data Contributor. These are separate permission planes in Azure."
  },
  { id: 48, domain: "domain2", difficulty: "easy",
    question: "How many access keys does each Azure Storage account have by default?",
    options: ["A. 1", "B. 2", "C. 4", "D. Unlimited"],
    correct: "B",
    explanation: "Each Azure Storage account has 2 access keys (key1 and key2). Having two keys allows you to rotate keys without downtime: update applications to use key2, regenerate key1, update applications to use key1, regenerate key2. Each key provides full access to the storage account."
  },
  { id: 49, domain: "domain2", difficulty: "hard",
    question: "You need to replicate a storage account's data to three different Azure regions for read access. Which configuration supports this?",
    options: ["A. Configure RA-GZRS on the storage account", "B. Use Storage replication policies to replicate to 3 regions", "C. Create storage accounts in 3 regions and use AzCopy to sync data", "D. Enable GRS and add two additional secondary regions"],
    correct: "C",
    explanation: "Azure Storage built-in redundancy options only support replication to one secondary region (GRS/RA-GRS/GZRS/RA-GZRS). For multi-region read access, you must create separate storage accounts in each region and implement synchronization using AzCopy, Azure Data Factory, or Azure Storage Object Replication."
  },
  { id: 50, domain: "domain2", difficulty: "medium",
    question: "Which storage redundancy type protects against complete Azure regional failure AND enables read access from the secondary region without failover?",
    options: ["A. LRS", "B. ZRS", "C. GRS", "D. RA-GRS"],
    correct: "D",
    explanation: "RA-GRS (Read-Access Geo-Redundant Storage) replicates data to a paired region and provides a read-only secondary endpoint accessible at any time without failover. GRS replicates to a secondary but the secondary is only readable after initiating a failover. LRS and ZRS don't provide cross-region protection."
  },

  // ─── DOMAIN 3: Compute (Q51-Q75) ─────────────────────────────────────────

  { id: 51, domain: "domain3", difficulty: "medium",
    question: "You need to deploy an application requiring a minimum of 2 and maximum of 10 VM instances based on CPU utilization. Which Azure service should you use?",
    options: ["A. Azure VMs with manual scaling", "B. Azure VM Scale Sets with autoscale", "C. Azure Kubernetes Service", "D. Azure App Service with autoscale"],
    correct: "B",
    explanation: "Azure VM Scale Sets with autoscale allows you to define minimum and maximum instance counts and configure scaling rules based on metrics like CPU utilization. This provides automatic scaling within defined bounds with identical VM configurations."
  },
  { id: 52, domain: "domain3", difficulty: "easy",
    question: "Which VM size series in Azure is optimized for memory-intensive workloads such as large relational databases and in-memory analytics?",
    options: ["A. D-series", "B. F-series", "C. E-series", "D. H-series"],
    correct: "C",
    explanation: "The E-series (Esv4, Eav4, etc.) VMs are memory-optimized and designed for memory-intensive workloads like large relational databases, caches, and in-memory analytics. F-series is compute-optimized, D-series is general purpose, and H-series is for high-performance computing."
  },
  { id: 53, domain: "domain3", difficulty: "hard",
    question: "You have a production web application on an App Service Plan. You need to test a new version before directing all production traffic to it, with the ability to rollback instantly. What should you use?",
    options: ["A. Create a new App Service Plan and deploy the new version there", "B. Use deployment slots with slot swap", "C. Deploy the new version directly to production and use the rollback button", "D. Create an A/B test using Traffic Manager"],
    correct: "B",
    explanation: "Deployment slots allow you to deploy to a staging slot, test it, then swap staging and production with near-zero downtime. The swap warms up the staging slot before routing traffic, and if issues occur, you can quickly swap back. Rollback is instant by swapping again."
  },
  { id: 54, domain: "domain3", difficulty: "medium",
    question: "You need to run a containerized batch job that will complete in 10 minutes and should not require managing any infrastructure. What is the most cost-effective Azure service?",
    options: ["A. Azure Kubernetes Service (AKS)", "B. Azure App Service on Linux", "C. Azure Container Instances (ACI)", "D. Azure Virtual Machines with Docker"],
    correct: "C",
    explanation: "ACI is ideal for short-lived, isolated containers without orchestration overhead. It bills per second of CPU and memory used, making it very cost-effective for batch jobs. AKS has cluster overhead, App Service is for web apps, and VMs require management."
  },
  { id: 55, domain: "domain3", difficulty: "easy",
    question: "What is the maximum SLA for a single Azure VM using Premium SSD managed disks?",
    options: ["A. 99.5%", "B. 99.9%", "C. 99.95%", "D. 99.99%"],
    correct: "B",
    explanation: "A single Azure VM with Premium SSD (or Ultra Disk) managed disks provides a 99.9% SLA. VMs in an Availability Set provide 99.95% SLA. VMs across multiple Availability Zones provide 99.99% SLA. Standard HDD/SSD disks provide no SLA for single VMs."
  },
  { id: 56, domain: "domain3", difficulty: "hard",
    question: "You need to configure autoscaling for a VMSS that adds 2 instances when CPU > 80% for 5 minutes, and removes 1 instance when CPU < 30% for 10 minutes. What should you configure?",
    options: ["A. One scale-out rule and one scale-in rule, each with separate metric conditions and time grains", "B. One rule with a CPU threshold of 50% and bidirectional scaling", "C. A schedule-based autoscale only", "D. Manual scaling with Azure Automation to check CPU"],
    correct: "A",
    explanation: "VMSS autoscale requires separate scale-out and scale-in rules. The scale-out rule: metric 'Percentage CPU', operator Greater Than, threshold 80%, time grain average 5 minutes, action Add 2 instances. Scale-in rule: metric CPU, operator Less Than, threshold 30%, time grain 10 minutes, action Remove 1 instance."
  },
  { id: 57, domain: "domain3", difficulty: "medium",
    question: "You want to ensure that a VM is always running and automatically restarts after the host system reboots. What should you configure?",
    options: ["A. Set up a cron job to start the VM", "B. Enable 'Start on Azure host restart' in VM settings", "C. Configure the OS to automatically start the application services", "D. Use the auto-restart setting (it is the default behavior for Azure VMs)"],
    correct: "D",
    explanation: "Azure VMs automatically restart after planned maintenance or host reboots by default. The Azure platform restarts VMs after host OS updates. For unplanned hardware failures, VMs in availability sets or zones also restart on another host. No special configuration is needed for this default behavior."
  },
  { id: 58, domain: "domain3", difficulty: "easy",
    question: "Which Azure service allows you to SSH or RDP into a VM directly from the Azure portal without needing a public IP on the VM?",
    options: ["A. Azure VPN Gateway", "B. Azure Bastion", "C. Azure Private Link", "D. Azure ExpressRoute"],
    correct: "B",
    explanation: "Azure Bastion provides secure SSH and RDP connectivity from the Azure portal over SSL (port 443). The VM does not need a public IP. Traffic stays on the Microsoft network. No client software is needed — just a web browser."
  },
  { id: 59, domain: "domain3", difficulty: "hard",
    question: "You need to reduce costs for non-production VMs that run only during business hours (8am-6pm weekdays). What is the most cost-effective approach?",
    options: ["A. Resize VMs to smaller sizes during off-hours", "B. Schedule VM start/stop using Azure Automation or Start/Stop VMs solution", "C. Purchase 3-year reserved instances for all VMs", "D. Delete VMs at 6pm and recreate them at 8am each day"],
    correct: "B",
    explanation: "Scheduling automatic start/stop of VMs during business hours saves approximately 60% on compute costs (since you only pay for running VMs). Azure Automation runbooks or the Start/Stop VMs v2 solution can automate this. Deleting and recreating VMs would lose OS state and data."
  },
  { id: 60, domain: "domain3", difficulty: "medium",
    question: "You deploy an ARM template with multiple resources. One resource deployment fails. What happens to the other successfully deployed resources?",
    options: ["A. All resources are rolled back automatically", "B. Successfully deployed resources remain; you must manually clean up or redeploy the failed resource", "C. The entire template is retried from scratch", "D. Azure pauses and waits for manual intervention before continuing"],
    correct: "B",
    explanation: "ARM deployments are NOT automatically rolled back on partial failure. Resources that deployed successfully remain deployed. You need to investigate the failure, fix the template, and redeploy. Only resources that haven't been deployed yet will be skipped. Use what-if before deploying to catch issues."
  },
  { id: 61, domain: "domain3", difficulty: "medium",
    question: "What is the purpose of Fault Domains in an Azure Availability Set?",
    options: ["A. Group VMs that can be updated simultaneously without downtime", "B. Isolate VMs on separate physical hardware (rack, power, network) to protect against hardware failures", "C. Distribute VMs across availability zones", "D. Control when Azure performs planned maintenance on VMs"],
    correct: "B",
    explanation: "Fault Domains represent separate physical hardware (servers in different racks with independent power and networking). VMs in different fault domains don't share these resources. If a rack fails, only VMs in that fault domain are affected. Availability Sets have up to 3 fault domains. Update Domains control maintenance windows."
  },
  { id: 62, domain: "domain3", difficulty: "hard",
    question: "You need to deploy an application across 3 Azure regions with active-active configuration. The application runs on Azure App Service. What should you use to distribute traffic globally?",
    options: ["A. Azure Load Balancer with cross-region configuration", "B. Azure Application Gateway with multi-region backend pools", "C. Azure Traffic Manager with Performance routing", "D. Azure Front Door with multiple origin groups"],
    correct: "D",
    explanation: "Azure Front Door provides global HTTP load balancing with anycast, built-in WAF, health monitoring, SSL offload, and intelligent routing. For App Service across regions, Front Door with Performance routing sends users to the nearest healthy origin. Traffic Manager is DNS-based and less feature-rich for HTTP workloads."
  },
  { id: 63, domain: "domain3", difficulty: "easy",
    question: "Which Azure compute service is best suited for running stateless HTTP APIs that scale to zero when not in use?",
    options: ["A. Azure Virtual Machines", "B. Azure Kubernetes Service", "C. Azure Functions with Consumption Plan", "D. Azure App Service with Basic plan"],
    correct: "C",
    explanation: "Azure Functions on the Consumption Plan scale to zero when idle (no compute cost when not running) and scale out automatically on demand. You pay only per execution. This is ideal for stateless HTTP APIs, event-driven workloads, and microservices with variable traffic."
  },
  { id: 64, domain: "domain3", difficulty: "medium",
    question: "You have a VMSS deployed across 3 availability zones. During scale-in, Azure removes instances. What is the default scale-in policy?",
    options: ["A. Remove the newest instances first", "B. Remove the oldest instances first", "C. Balance VMs across availability zones first, then remove the instance with the highest instance ID", "D. Remove instances randomly to maintain even distribution"],
    correct: "C",
    explanation: "The default scale-in policy first balances instances across zones (removing from the zone with the most instances), then removes the instance with the highest instance ID. You can configure alternative policies: NewestVM, OldestVM, or Default. Zone balancing helps maintain HA during scale-in."
  },
  { id: 65, domain: "domain3", difficulty: "hard",
    question: "You need to deploy an AKS cluster where system workloads and application workloads use separate node pools with different VM sizes. How should you configure this?",
    options: ["A. Create one node pool with mixed VM sizes", "B. Create a system node pool (Standard_D2s_v3) and one or more user node pools with required VM sizes", "C. Use a single node pool and configure pod affinity rules", "D. Deploy two separate AKS clusters and use Traffic Manager to route between them"],
    correct: "B",
    explanation: "AKS requires at least one system node pool for system pods (CoreDNS, metrics-server, etc.). Additional user node pools run application workloads and can have different VM sizes, OS types, and scaling configurations. This separation isolates system components from application workloads."
  },
  { id: 66, domain: "domain3", difficulty: "medium",
    question: "You want to ensure an Azure VM is always on a specific physical host for licensing compliance reasons. What feature should you use?",
    options: ["A. Availability Set with single fault domain", "B. Azure Dedicated Host", "C. Reserved Instances", "D. VM pinning in the portal"],
    correct: "B",
    explanation: "Azure Dedicated Host provides a physical server dedicated to your organization for hosting VMs. This gives physical server-level isolation and visibility into maintenance events, and allows you to use existing Windows Server licenses with BYOL for compliance. Reserved Instances are for billing discounts, not hardware dedication."
  },
  { id: 67, domain: "domain3", difficulty: "easy",
    question: "Which Azure App Service plan tier supports automatic scaling (autoscale)?",
    options: ["A. Free (F1)", "B. Basic (B1)", "C. Standard (S1) and above", "D. Shared (D1)"],
    correct: "C",
    explanation: "Autoscaling is available on Standard (S1) tier and above (Standard, Premium, Isolated). Basic tier supports only manual scale-out. Free and Shared tiers run on shared infrastructure and don't support scaling at all. Premium adds more scale limits and advanced features."
  },
  { id: 68, domain: "domain3", difficulty: "hard",
    question: "You use Azure Container Registry (ACR) to store images for your AKS cluster. You want AKS to pull images without storing credentials in Kubernetes secrets. What should you configure?",
    options: ["A. Create a Kubernetes secret with the ACR access keys", "B. Attach the ACR to AKS using managed identity (az aks update --attach-acr)", "C. Enable public access on ACR and allow anonymous pulls", "D. Configure an imagePullSecret using a service principal password"],
    correct: "B",
    explanation: "Using 'az aks update --attach-acr <acr-name>' configures the AKS cluster's managed identity with the 'AcrPull' role on the ACR. This allows AKS to pull images without any Kubernetes secrets or stored credentials. This is the recommended, most secure approach."
  },
  { id: 69, domain: "domain3", difficulty: "medium",
    question: "You need to run a custom script on a new Azure VM immediately after it is deployed to install software. What is the recommended approach?",
    options: ["A. Log into the VM after deployment and run the script manually", "B. Use Custom Script Extension to execute the script during or after deployment", "C. Configure a Scheduled Task in the VM to run the script on first boot", "D. Use Azure Automation to run the script remotely"],
    correct: "B",
    explanation: "Custom Script Extension (CSE) allows you to execute scripts on Azure VMs during or after deployment. It can download scripts from Azure Storage or GitHub and run them. This is the standard method for post-deployment configuration. It's specified in the ARM template or via az vm extension set."
  },
  { id: 70, domain: "domain3", difficulty: "medium",
    question: "You have 3 VMs in an Availability Set. The Availability Set has 2 fault domains and 5 update domains. How are the VMs distributed across these domains?",
    options: ["A. All 3 VMs in fault domain 0", "B. VMs distributed across 2 fault domains; update domain assignment cycles through all 5", "C. VMs can only use a maximum of 3 update domains in this configuration", "D. Azure assigns all VMs to the same update domain for consistency"],
    correct: "B",
    explanation: "Azure distributes VMs across available fault domains in a round-robin fashion. With 2 fault domains, VMs would be distributed as FD0, FD1, FD0. Update domains are also assigned round-robin. With 5 update domains, the 3 VMs get UD0, UD1, UD2. No two VMs share the same update domain if possible."
  },
  { id: 71, domain: "domain3", difficulty: "easy",
    question: "What command-line tool does Azure provide for multi-platform infrastructure as code that compiles to ARM JSON?",
    options: ["A. Terraform", "B. Ansible", "C. Bicep", "D. Helm"],
    correct: "C",
    explanation: "Azure Bicep is a domain-specific language (DSL) that compiles to ARM JSON templates. It provides a cleaner syntax with less verbosity than ARM JSON while supporting all ARM features. 'az bicep build --file main.bicep' converts Bicep to ARM JSON."
  },
  { id: 72, domain: "domain3", difficulty: "hard",
    question: "You deploy an ARM template in Incremental mode to a resource group that already has 5 resources. The template defines 3 of those 5 resources with updated configurations. What is the result?",
    options: ["A. The 2 resources not in the template are deleted", "B. The 3 resources in the template are updated; the 2 not in the template remain unchanged", "C. All 5 resources are replaced with the versions in the template", "D. The deployment fails because of the configuration mismatch"],
    correct: "B",
    explanation: "Incremental mode (default) updates or creates resources defined in the template and leaves existing resources NOT in the template unchanged. The 3 resources in the template are updated with the new configurations. The 2 unspecified resources remain intact. Complete mode would delete those 2 resources."
  },
  { id: 73, domain: "domain3", difficulty: "medium",
    question: "You need to connect to an Azure VM via RDP but the VM has no public IP. Azure Bastion is not configured. What is another option to securely access this VM?",
    options: ["A. Add a public IP to the VM temporarily", "B. Use JIT (Just-In-Time) VM Access and RDP from an approved IP via the portal", "C. Configure Azure VPN Gateway point-to-site and RDP over the private IP", "D. Both B and C are valid options"],
    correct: "D",
    explanation: "Both JIT VM Access and P2S VPN are valid secure options. JIT temporarily opens RDP/SSH only for approved source IPs on request. P2S VPN creates a secure tunnel from your computer to the Azure VNet, allowing RDP to the private IP. Either works without a public IP on the VM."
  },
  { id: 74, domain: "domain3", difficulty: "easy",
    question: "Which Azure Container Instances feature allows multiple containers to share a network and storage and be managed as a unit?",
    options: ["A. Container pool", "B. Container group", "C. Container set", "D. Pod"],
    correct: "B",
    explanation: "A container group is the top-level resource in ACI and contains one or more containers that share a lifecycle, network (same IP and ports), and optionally storage volumes. Container groups are analogous to Kubernetes pods. 'Pod' is Kubernetes terminology, not ACI."
  },
  { id: 75, domain: "domain3", difficulty: "hard",
    question: "You are deploying an AKS cluster. You need node VMs to automatically receive OS patches without manual intervention while minimizing disruption. What upgrade channel should you configure?",
    options: ["A. none — disable automatic upgrades and patch manually", "B. node-image — automatically update node OS images", "C. patch — automatically apply patch releases of Kubernetes", "D. stable — automatically upgrade to stable Kubernetes releases"],
    correct: "B",
    explanation: "The 'node-image' upgrade channel automatically updates the node OS image (VHD) to include the latest OS security patches and updates while keeping the Kubernetes version unchanged. This minimizes OS-level vulnerabilities without Kubernetes version upgrades that might require application validation."
  },

  // ─── DOMAIN 4: Networking (Q76-Q100) ─────────────────────────────────────

  { id: 76, domain: "domain4", difficulty: "medium",
    question: "You have two VNets in different Azure regions. Users in VNet-A need to communicate with resources in VNet-B without routing through the public internet. What should you configure?",
    options: ["A. VPN Gateway with site-to-site connection", "B. Global VNet Peering", "C. Azure ExpressRoute", "D. Azure Virtual WAN"],
    correct: "B",
    explanation: "Global VNet Peering connects VNets across different Azure regions using the Microsoft backbone network. Traffic is private, does not traverse the public internet, and provides low latency. VPN Gateway adds encryption overhead. ExpressRoute requires physical connectivity from on-premises."
  },
  { id: 77, domain: "domain4", difficulty: "hard",
    question: "You need to allow internet traffic on port 443 to reach VMs while blocking all other inbound internet traffic. VMs are in a subnet with an NSG. What is the minimum number of rules needed?",
    options: ["A. 1 rule — Allow port 443 inbound from Internet", "B. 2 rules — Allow port 443 and Deny all internet inbound", "C. 3 rules — Allow 443, Deny others, Allow VNet traffic", "D. No additional rules — default NSG rules handle this"],
    correct: "A",
    explanation: "NSGs have a default DenyAllInBound rule at priority 65500. You only need to add one Allow rule for port 443 from Internet. The default rule blocks all other internet inbound traffic. Default rules cannot be deleted but can be overridden by rules with lower priority numbers."
  },
  { id: 78, domain: "domain4", difficulty: "medium",
    question: "You need to configure Azure DNS to resolve 'app.contoso.com' to an Azure Traffic Manager profile. What type of DNS record should you create?",
    options: ["A. A record pointing to the Traffic Manager public IP", "B. CNAME record pointing to the Traffic Manager DNS name", "C. Alias record pointing to the Traffic Manager profile resource", "D. MX record pointing to the Traffic Manager endpoint"],
    correct: "C",
    explanation: "An Alias record in Azure DNS can point directly to Azure resources including Traffic Manager profiles, Azure CDN endpoints, and Public IP addresses. Unlike CNAME records, Alias records work at the zone apex (e.g., contoso.com), automatically update when the target IP changes, and work with Azure resources natively."
  },
  { id: 79, domain: "domain4", difficulty: "easy",
    question: "How many IP addresses does Azure reserve in each subnet?",
    options: ["A. 3", "B. 4", "C. 5", "D. 8"],
    correct: "C",
    explanation: "Azure reserves 5 IP addresses in each subnet: .0 (network address), .1 (default gateway), .2 and .3 (Azure DNS), and .255 (broadcast). For a /29 subnet with 8 total IPs, only 3 are usable. This affects subnet sizing — always account for the 5 reserved addresses."
  },
  { id: 80, domain: "domain4", difficulty: "hard",
    question: "You configured a UDR on Subnet A to route all traffic (0.0.0.0/0) through an Azure Firewall. A VM in Subnet A can't reach the internet. The firewall's application rules allow the required FQDNs. What is the most likely cause?",
    options: ["A. The NSG on Subnet A is blocking outbound traffic", "B. The Azure Firewall subnet doesn't have a route table", "C. The Azure Firewall needs SNAT rules configured for internet traffic", "D. The UDR needs to be applied to the Azure Firewall subnet as well"],
    correct: "C",
    explanation: "Azure Firewall automatically performs SNAT for outbound internet traffic IF the destination IP is not in the private IP space. However, if SNAT is disabled or the source IP range is in the firewall's private IP settings, traffic may not be SNATed. Also check that the firewall application rules log shows 'Allow' decisions."
  },
  { id: 81, domain: "domain4", difficulty: "medium",
    question: "You need to deploy a Network Virtual Appliance (NVA) and route all traffic from Subnet A through it. What must you configure?",
    options: ["A. NSG on Subnet A with a rule pointing to the NVA", "B. A User-Defined Route (UDR) on Subnet A with next hop as VirtualAppliance pointing to the NVA's private IP", "C. BGP routing from the NVA to propagate routes to Subnet A", "D. VNet peering between Subnet A's VNet and the NVA's VNet"],
    correct: "B",
    explanation: "A UDR (User-Defined Route) on Subnet A overrides Azure's default system routes. Set the destination (e.g., 0.0.0.0/0 for all traffic or a specific prefix) and next hop type as VirtualAppliance with the NVA's private IP. Enable IP forwarding on the NVA's NIC. NSG rules filter traffic but don't route it."
  },
  { id: 82, domain: "domain4", difficulty: "easy",
    question: "Which Azure load balancing service operates at Layer 7 and can route traffic based on URL paths?",
    options: ["A. Azure Load Balancer", "B. Azure Traffic Manager", "C. Azure Application Gateway", "D. Azure VPN Gateway"],
    correct: "C",
    explanation: "Azure Application Gateway is a Layer 7 load balancer that can route traffic based on URL paths (e.g., /images/* to one backend, /api/* to another) and hostnames. It supports SSL termination, cookie-based session affinity, and WAF. Azure Load Balancer is Layer 4 (TCP/UDP only)."
  },
  { id: 83, domain: "domain4", difficulty: "hard",
    question: "You have a VNet with an ExpressRoute gateway and a VPN gateway. A partner company needs to connect their on-premises network to your VNet. They don't have an ExpressRoute circuit. What connection option should they use?",
    options: ["A. ExpressRoute connection using your existing circuit", "B. Site-to-Site VPN to your VPN gateway", "C. VNet peering to a new partner VNet", "D. Azure Virtual WAN connection"],
    correct: "B",
    explanation: "A Site-to-Site (S2S) VPN uses IPsec/IKE over the internet to connect on-premises networks to Azure VNets. The partner connects their on-premises VPN device to your Azure VPN Gateway. ExpressRoute requires a physical circuit from a connectivity provider — it can't be established without one."
  },
  { id: 84, domain: "domain4", difficulty: "medium",
    question: "You need to verify whether traffic from a VM (10.0.1.4) to a remote IP (52.1.2.3) on port 80 is allowed by NSG rules. What tool should you use?",
    options: ["A. Azure Network Performance Monitor", "B. Azure Network Watcher — IP flow verify", "C. Azure Network Watcher — Connection monitor", "D. NSG Flow Logs"],
    correct: "B",
    explanation: "IP Flow Verify in Network Watcher tests whether a specific packet would be allowed or denied by NSG rules for a given VM, direction, protocol, local IP/port, and remote IP/port. It returns which NSG rule allowed or denied the traffic. Connection Monitor tests end-to-end connectivity including routing."
  },
  { id: 85, domain: "domain4", difficulty: "easy",
    question: "What is the minimum subnet size required for the Azure Firewall dedicated subnet (AzureFirewallSubnet)?",
    options: ["A. /28", "B. /27", "C. /26", "D. /24"],
    correct: "C",
    explanation: "Azure Firewall requires a dedicated subnet named 'AzureFirewallSubnet' with a minimum size of /26 (64 IPs). This allows for the firewall management plane scaling. A /27 or smaller is not supported. The recommended minimum is /26."
  },
  { id: 86, domain: "domain4", difficulty: "hard",
    question: "You have VNet-A (10.0.0.0/16) and VNet-B (10.1.0.0/16) with peering. A VM in VNet-A needs to reach a resource in VNet-C (10.2.0.0/16) via VNet-B which is peered with VNet-C. Traffic is not reaching VNet-C. What is missing?",
    options: ["A. VNet-A needs a peering to VNet-C directly", "B. VNet-B must have 'Allow gateway transit' enabled and VNet-A must use 'Use remote gateways'", "C. The VNet-A to VNet-B peering must allow forwarded traffic and VNet-B to VNet-C peering must also allow forwarded traffic", "D. VNet peering supports transit routing by default"],
    correct: "C",
    explanation: "VNet peering is non-transitive by default. Traffic from VNet-A cannot reach VNet-C through VNet-B with standard peering. To enable transit, you need forwarded traffic allowed in both peerings AND a custom route/NVA in VNet-B to forward traffic between A and C, OR directly peer A with C."
  },
  { id: 87, domain: "domain4", difficulty: "medium",
    question: "You need to provide DNS name resolution for VMs within a VNet using private DNS names like 'vm1.contoso.internal'. VMs should auto-register their names. What should you configure?",
    options: ["A. Azure Public DNS zone for contoso.internal", "B. Azure Private DNS zone linked to the VNet with auto-registration enabled", "C. Custom DNS server in the VNet settings pointing to an on-premises DNS server", "D. DNS forwarding in each VM's hosts file"],
    correct: "B",
    explanation: "Azure Private DNS zones provide DNS name resolution within VNets. Link the private zone to the VNet and enable auto-registration. VMs automatically register their hostnames in the private zone when they get a private IP. This enables DNS resolution by name within and across linked VNets."
  },
  { id: 88, domain: "domain4", difficulty: "hard",
    question: "You need to ensure that all traffic from your Azure VMs to Azure Storage goes over the Microsoft backbone (not internet) without assigning the storage a private IP. What should you use?",
    options: ["A. Private Endpoint for storage", "B. Service Endpoint on the VM subnet for Microsoft.Storage", "C. VNet peering between the VM VNet and the storage VNet", "D. Azure ExpressRoute with private peering"],
    correct: "B",
    explanation: "Service Endpoints route traffic from the subnet to Azure services (like Storage) over the Microsoft backbone network using optimized paths. The storage keeps its public IP but the traffic doesn't traverse the internet. Service Endpoints are free and require only a subnet-level configuration. Private Endpoints assign a private IP."
  },
  { id: 89, domain: "domain4", difficulty: "easy",
    question: "Which Traffic Manager routing method sends all traffic to a primary endpoint and only switches to a secondary endpoint if the primary is unavailable?",
    options: ["A. Weighted", "B. Performance", "C. Priority", "D. Geographic"],
    correct: "C",
    explanation: "Priority routing sends all traffic to the endpoint with the highest priority (lowest priority number). If that endpoint becomes unavailable (health check fails), Traffic Manager routes to the next highest priority endpoint. This is a simple active-passive failover configuration."
  },
  { id: 90, domain: "domain4", difficulty: "medium",
    question: "An NSG has an inbound rule (priority 100) that allows TCP port 22 from any source, and another rule (priority 200) that denies all TCP traffic from 10.0.1.0/24. A VM with IP 10.0.1.5 tries to SSH (port 22). Is the connection allowed?",
    options: ["A. Denied — the deny rule applies to this source IP", "B. Allowed — the allow rule (priority 100) is processed first and matches", "C. Denied — deny rules always override allow rules", "D. Allowed — 10.0.1.0/24 is a private range and always allowed"],
    correct: "B",
    explanation: "NSG rules are processed in priority order (lowest number first). The allow rule at priority 100 matches TCP port 22 from any source (including 10.0.1.5) and allows the traffic. Processing stops at the first matching rule — the deny rule at priority 200 is never evaluated. Deny rules only override allows if they have a lower priority number."
  },
  { id: 91, domain: "domain4", difficulty: "hard",
    question: "You have Azure Firewall deployed in a hub VNet. All spoke VNets are peered to the hub. You added a UDR to each spoke subnet routing 0.0.0.0/0 to the firewall. VMs in spoke VNets can't communicate with each other. What additional step is needed?",
    options: ["A. Add inbound NAT rules on the firewall for each spoke VM", "B. Add network rules in the Azure Firewall policy to allow spoke-to-spoke traffic", "C. Configure VNet peering between each spoke VNet directly", "D. Enable BGP on the Azure Firewall"],
    correct: "B",
    explanation: "When spoke-to-spoke traffic goes through Azure Firewall (due to UDR), the firewall must have explicit network rules allowing the traffic. By default, Azure Firewall denies all traffic. Add network rules to allow the spoke address spaces (e.g., 10.1.0.0/24 → 10.2.0.0/24) with the required protocols and ports."
  },
  { id: 92, domain: "domain4", difficulty: "medium",
    question: "You create an Azure Load Balancer with Standard SKU. By default, which inbound traffic is allowed to the backend pool VMs?",
    options: ["A. All traffic from any source", "B. Traffic from the load balancer only", "C. No inbound internet traffic — Standard ALB is secure by default", "D. Traffic from VNet only"],
    correct: "C",
    explanation: "Standard SKU Azure Load Balancer is 'secure by default' — backend pool VMs are not reachable from the internet unless an NSG explicitly allows the traffic. Basic SKU allows all traffic by default. For Standard ALB, you must configure NSG rules to allow the specific traffic you want to reach the VMs."
  },
  { id: 93, domain: "domain4", difficulty: "easy",
    question: "What protocol does Azure VPN Gateway use for encryption in a Site-to-Site connection?",
    options: ["A. SSL/TLS", "B. IPsec/IKE", "C. PPTP", "D. GRE"],
    correct: "B",
    explanation: "Azure VPN Gateway uses IPsec/IKE (Internet Protocol Security / Internet Key Exchange) for Site-to-Site VPN connections. IKEv2 is used with route-based VPN gateways. Point-to-Site connections can use OpenVPN (SSL), SSTP (TLS), or IKEv2. PPTP is deprecated and not supported."
  },
  { id: 94, domain: "domain4", difficulty: "hard",
    question: "You need to implement a hub-spoke network topology where spoke VMs use the hub VNet's VPN Gateway to connect to on-premises. What must you enable on the VNet peering?",
    options: ["A. Hub peering: 'Allow gateway transit' = true; Spoke peering: 'Use remote gateways' = true", "B. Hub peering: 'Use remote gateways' = true; Spoke peering: 'Allow gateway transit' = true", "C. Enable BGP on both the hub gateway and the spoke VNets", "D. Create a separate VPN Gateway in each spoke VNet"],
    correct: "A",
    explanation: "For hub-spoke with shared gateway: in the HUB-to-SPOKE peering, enable 'Allow gateway transit' (hub exposes its gateway to spokes). In the SPOKE-to-HUB peering, enable 'Use remote gateways' (spoke uses hub's gateway). Only the hub needs a gateway — spokes share it."
  },
  { id: 95, domain: "domain4", difficulty: "medium",
    question: "You need to capture all network traffic to and from a VM NIC for troubleshooting for 30 minutes. What tool should you use?",
    options: ["A. Azure Monitor Logs", "B. NSG Flow Logs", "C. Azure Network Watcher Packet Capture", "D. Azure Diagnostics Extension"],
    correct: "C",
    explanation: "Network Watcher Packet Capture creates a capture session that records all packets to/from a VM's NIC. You can set time duration, file size limits, and filters. The capture file (.pcap) is saved to Azure Storage or the VM's local disk and can be analyzed with Wireshark. NSG Flow Logs record flow metadata, not full packet data."
  },
  { id: 96, domain: "domain4", difficulty: "easy",
    question: "Which NSG service tag represents the Azure platform infrastructure IP addresses?",
    options: ["A. Internet", "B. VirtualNetwork", "C. AzurePlatformDNS", "D. AzureLoadBalancer"],
    correct: "D",
    explanation: "The 'AzureLoadBalancer' service tag represents Azure's infrastructure load balancer (168.63.129.16) used for health probes. All NSG rule sets have a default rule AllowAzureLBInBound(65001) using this tag. The 'Internet' tag represents all IPs outside the VNet. 'VirtualNetwork' includes all VNet address spaces and peered VNets."
  },
  { id: 97, domain: "domain4", difficulty: "hard",
    question: "You have an application running behind an Azure Application Gateway (v2) with WAF enabled. Legitimate requests from certain countries are being blocked. Where should you investigate?",
    options: ["A. NSG rules blocking the source country IP ranges", "B. WAF custom rules or managed rule set blocking the geographic locations", "C. Application Gateway access policies for geographic filtering", "D. Traffic Manager geographic routing configuration"],
    correct: "B",
    explanation: "Azure WAF (Web Application Firewall) on Application Gateway can block requests based on OWASP managed rule sets, custom rules (including geo-filtering), or rate limiting. If legitimate traffic is blocked, review WAF logs in the Diagnostics settings (ApplicationGatewayFirewallLog), identify which rule is triggering, and add exclusions or adjust rule mode (Prevention → Detection)."
  },
  { id: 98, domain: "domain4", difficulty: "medium",
    question: "A VM in Subnet-A (with NSG-A) needs to communicate with a VM in Subnet-B (with NSG-B) in the same VNet. What traffic rules are evaluated?",
    options: ["A. Only NSG-A outbound rules", "B. Only NSG-B inbound rules", "C. NSG-A outbound AND NSG-B inbound rules", "D. No NSG rules because traffic within a VNet is always allowed"],
    correct: "C",
    explanation: "When traffic flows from Subnet-A to Subnet-B, NSG-A outbound rules are evaluated first (as traffic leaves Subnet-A), then NSG-B inbound rules are evaluated (as traffic enters Subnet-B). Both NSGs must allow the traffic. Default NSG rules allow VNet-to-VNet traffic, but custom deny rules could block it."
  },
  { id: 99, domain: "domain4", difficulty: "easy",
    question: "What is the default limit for the maximum number of VNet peerings per VNet in Azure?",
    options: ["A. 50", "B. 100", "C. 500", "D. 1000"],
    correct: "C",
    explanation: "The default limit is 500 VNet peerings per VNet. This can be increased by contacting Azure support (hard limit is higher). Each peering connection is counted: a peering between VNet-A and VNet-B counts as 1 peering for VNet-A and 1 for VNet-B."
  },
  { id: 100, domain: "domain4", difficulty: "hard",
    question: "You need to filter outbound internet traffic from VMs to only allow specific websites (by FQDN). NSGs cannot filter by FQDN. What solution should you implement?",
    options: ["A. Configure egress rules in the subnet NSG to block port 80/443", "B. Deploy Azure Firewall with application rules allowing specific FQDNs, and route traffic through it", "C. Use DNS to block unauthorized FQDNs by returning null responses", "D. Configure Web Proxy on each VM to filter outbound URLs"],
    correct: "B",
    explanation: "Azure Firewall supports FQDN-based filtering in Application Rules. Deploy Azure Firewall in a hub VNet, add application rules allowing specific FQDNs (e.g., *.microsoft.com, *.github.com), and add a UDR on spoke subnets routing 0.0.0.0/0 to the firewall. NSGs cannot filter by hostname/FQDN."
  },

  // ─── DOMAIN 5: Monitor & Maintain (Q101-Q125) ────────────────────────────

  { id: 101, domain: "domain5", difficulty: "medium",
    question: "You need to configure backup for Azure VMs with an RPO of 24 hours and 30-day retention. What should you use?",
    options: ["A. Azure Site Recovery with daily replication", "B. Azure Backup with daily backup policy and 30-day retention", "C. Azure Storage snapshots with 30-day retention policy", "D. VM replication to another region"],
    correct: "B",
    explanation: "Azure Backup with a daily backup policy meets the 24-hour RPO, and you can configure 30-day retention for recovery points. Azure Site Recovery is for disaster recovery/replication, not traditional backup. Storage snapshots don't provide the management features of Azure Backup."
  },
  { id: 102, domain: "domain5", difficulty: "easy",
    question: "Which Azure Monitor feature allows you to run log queries to analyze collected data from multiple sources?",
    options: ["A. Azure Metrics", "B. Log Analytics workspace", "C. Application Insights", "D. Azure Advisor"],
    correct: "B",
    explanation: "Log Analytics workspace stores log data and provides a query interface using Kusto Query Language (KQL) to analyze data from multiple sources including VMs, applications, and Azure services. Azure Metrics is for numerical time-series data, not log queries."
  },
  { id: 103, domain: "domain5", difficulty: "hard",
    question: "You need to automatically stop all VMs in a subscription when the monthly spend exceeds $5,000. What is the recommended approach?",
    options: ["A. Create a budget with a $5,000 threshold and manually stop VMs when notified", "B. Create a budget with an action group that triggers a Logic App or Automation runbook to stop VMs", "C. Configure Azure Cost Management alerts to delete the resource group when $5,000 is reached", "D. Set subscription spending limit to $5,000 in billing settings"],
    correct: "B",
    explanation: "Create a budget at the subscription scope with a $5,000 monthly threshold. Configure an action group that triggers an Azure Automation runbook (or Logic App) to stop/deallocate VMs. The budget can trigger at forecast reaching 100% for proactive stopping. Simple email alerts require manual intervention."
  },
  { id: 104, domain: "domain5", difficulty: "medium",
    question: "You need to monitor CPU usage across all VMs in a resource group and receive an email alert when any VM's CPU exceeds 90% for 5 consecutive minutes. What should you configure?",
    options: ["A. A log analytics query scheduled to run every 5 minutes", "B. A metric alert rule targeting the resource group with CPU metric > 90% for 5 minutes, with email action group", "C. An Azure Policy that monitors CPU and sends alerts", "D. Azure Advisor performance recommendations"],
    correct: "B",
    explanation: "A metric alert rule can target a resource group scope, monitoring 'Percentage CPU' metric across all VMs. Set the threshold to 90%, evaluation frequency to 1 minute, time window to 5 minutes, and aggregation to Average. Configure an action group with email notification. This covers current and future VMs in the group."
  },
  { id: 105, domain: "domain5", difficulty: "easy",
    question: "How long are Azure Activity Log events retained by default?",
    options: ["A. 30 days", "B. 90 days", "C. 365 days", "D. 7 years"],
    correct: "B",
    explanation: "Azure Activity Log events are retained for 90 days by default. To retain them longer, configure a Diagnostic Setting to export to a Log Analytics workspace (configurable retention up to 2 years by default, more with archive tier) or Azure Storage account for long-term archival."
  },
  { id: 106, domain: "domain5", difficulty: "hard",
    question: "You configured a Recovery Services Vault with GRS redundancy and enabled VM backup. You need to restore a VM to a different Azure region during a disaster. What option enables this?",
    options: ["A. Cross-subscription restore from the portal", "B. Cross-region restore, which requires GRS-redundant vault", "C. Azure Site Recovery failover to secondary region", "D. Export the VM disk to secondary region and create a new VM"],
    correct: "B",
    explanation: "Cross-region restore allows restoring Azure VMs to the paired region from a GRS-redundant Recovery Services Vault. You must enable cross-region restore on the vault (it's not enabled by default). This is specifically for disaster recovery scenarios where the primary region is unavailable."
  },
  { id: 107, domain: "domain5", difficulty: "medium",
    question: "You need to write a KQL query that shows the count of failed login events (EventID 4625) per computer in the last 24 hours, sorted by count descending. Which query is correct?",
    options: [
      "A. SecurityEvent | where EventID == 4625 and TimeGenerated > ago(24h) | summarize FailCount = count() by Computer | sort by FailCount desc",
      "B. SecurityEvent | filter EventID = 4625 | group by Computer | count | order by count",
      "C. SELECT Computer, COUNT(*) FROM SecurityEvent WHERE EventID = 4625 AND TimeGenerated > NOW()-24h GROUP BY Computer ORDER BY COUNT(*) DESC",
      "D. SecurityEvent | EventID == 4625 | timespan = 24h | count by Computer"
    ],
    correct: "A",
    explanation: "KQL syntax uses pipe (|) to chain operators: filter with 'where', aggregate with 'summarize count() by', sort with 'sort by ... desc'. The 'ago(24h)' function returns the time 24 hours ago. Option B and D have invalid KQL syntax. Option C is SQL syntax, not KQL."
  },
  { id: 108, domain: "domain5", difficulty: "easy",
    question: "What is the purpose of Action Groups in Azure Monitor?",
    options: ["A. Group Azure resources for monitoring purposes", "B. Define who gets notified and how when an alert fires", "C. Group alert rules by severity", "D. Aggregate metrics from multiple resources"],
    correct: "B",
    explanation: "Action Groups define the set of notification actions to take when an alert fires: email, SMS, push notification, voice call, webhook, Azure Function, Logic App, Event Hub, ITSM ticket, or Automation runbook. An Action Group can be reused across multiple alert rules."
  },
  { id: 109, domain: "domain5", difficulty: "hard",
    question: "You use Azure Site Recovery to replicate VMs from East US to West US. You need to test failover without impacting production. What should you do?",
    options: ["A. Perform a planned failover to West US", "B. Perform a test failover to an isolated network in West US", "C. Stop replication and manually create VMs in West US from snapshots", "D. Use cross-region restore from Azure Backup instead"],
    correct: "B",
    explanation: "Test failover in ASR creates a new set of VMs in a specified isolated VNet in the target region without interrupting ongoing replication or affecting production. It validates recovery plans and application functionality. After testing, you clean up the test failover VMs. A planned failover actually moves production to the secondary region."
  },
  { id: 110, domain: "domain5", difficulty: "medium",
    question: "You need to collect performance counters from Windows VMs in Azure and query them in Log Analytics. What agent should you install?",
    options: ["A. Azure Diagnostics Extension (WAD)", "B. Azure Monitor Agent (AMA) with Data Collection Rules", "C. Operations Management Suite (OMS) agent", "D. Log Analytics agent (MMA) is still required in 2024"],
    correct: "B",
    explanation: "Azure Monitor Agent (AMA) with Data Collection Rules (DCR) is the current recommended agent for collecting performance counters, event logs, and syslog from VMs. AMA replaced the legacy Log Analytics agent (MMA/OMS) which is deprecated. DCRs define what data to collect and where to send it."
  },
  { id: 111, domain: "domain5", difficulty: "easy",
    question: "What does Azure Advisor provide?",
    options: ["A. Real-time monitoring dashboards for Azure resources", "B. Personalized recommendations for reliability, security, performance, and cost optimization", "C. Log query capabilities for diagnosing issues", "D. Automated remediation for all Azure compliance issues"],
    correct: "B",
    explanation: "Azure Advisor analyzes your resource configurations and usage telemetry and provides personalized best-practice recommendations across 5 categories: Reliability (availability), Security, Performance, Cost, and Operational Excellence. It doesn't actively fix issues but shows recommendations with steps."
  },
  { id: 112, domain: "domain5", difficulty: "hard",
    question: "You need to ensure that Azure Backup for VMs has a 4-hour recovery point objective (RPO). What backup policy setting achieves this?",
    options: ["A. Configure daily backups with 4-hour backup window", "B. Configure Enhanced policy with hourly backup frequency (every 4 hours)", "C. Set backup frequency to 15 minutes with 4-hour retention", "D. Azure VM Backup only supports daily backups — 4-hour RPO is not achievable"],
    correct: "B",
    explanation: "Azure Backup's Enhanced policy supports hourly backup schedules (every 1, 2, 4, 6, 8, or 12 hours) for Azure VMs. Standard policy only supports daily backups (24-hour RPO). The Enhanced policy uses application-consistent snapshots and is available for supported VM SKUs."
  },
  { id: 113, domain: "domain5", difficulty: "medium",
    question: "Which Azure service provides a 90-day view of planned maintenance events, service incidents, and health advisories for your Azure resources?",
    options: ["A. Azure Monitor Activity Log", "B. Azure Service Health", "C. Azure Resource Health", "D. Azure Advisor"],
    correct: "B",
    explanation: "Azure Service Health provides personalized alerts about Azure service issues, planned maintenance, and health advisories that affect your subscriptions and regions. It shows a 90-day history of health events. Resource Health shows health for specific individual resources. Activity Log shows actions in your subscription."
  },
  { id: 114, domain: "domain5", difficulty: "hard",
    question: "You have Recovery Services Vault with soft delete enabled. You delete an Azure VM backup today. A user accidentally deleted the backup last week, and it's now 10 days old. What is the backup status?",
    options: ["A. Permanently deleted — soft delete retains only 7 days", "B. Soft deleted — recoverable for 14 days from deletion date, so 4 more days remain", "C. Automatically restored — soft delete prevents permanent deletion indefinitely", "D. Moved to archive tier — soft deleted items reduce cost after 7 days"],
    correct: "B",
    explanation: "Soft delete retains deleted backup data for 14 days after the deletion event. The backup was deleted 10 days ago, so it's still in a soft-deleted state with 4 days remaining before permanent deletion. During this period, you can undelete it from the Recovery Services Vault. Soft delete is free and enabled by default."
  },
  { id: 115, domain: "domain5", difficulty: "medium",
    question: "You configure an alert rule with a metric condition. The alert fires and sends an email. 2 hours later, the metric drops below the threshold. What is the default behavior?",
    options: ["A. The alert remains in 'Fired' state until manually resolved", "B. The alert auto-resolves and sends a resolved notification if configured", "C. The alert fires again when the metric rises above threshold next time", "D. The alert is deactivated after firing once"],
    correct: "B",
    explanation: "Azure metric alerts automatically resolve when the condition is no longer met. When the metric drops below the threshold (for a stateful alert), the alert transitions to 'Resolved' state. If 'Auto Mitigate' is enabled (default) and the action group has a notification configured for resolved state, a resolved notification is sent."
  },
  { id: 116, domain: "domain5", difficulty: "easy",
    question: "What is a Recovery Point in Azure Backup?",
    options: ["A. The maximum time allowed to recover data after a failure", "B. A snapshot of your VM or data at a specific point in time that you can restore from", "C. The physical location where backup data is stored", "D. The monitoring endpoint that checks if VMs are running"],
    correct: "B",
    explanation: "A Recovery Point is a point-in-time backup snapshot stored in the Recovery Services Vault. For VMs, Azure Backup creates app-consistent or crash-consistent recovery points based on the backup policy. You select a recovery point when restoring — it represents the state of the VM at that backup time."
  },
  { id: 117, domain: "domain5", difficulty: "hard",
    question: "You need to monitor SQL Server instances on Azure VMs for slow queries and send alerts when query duration exceeds 5 seconds. What is the correct Azure-native approach?",
    options: ["A. Install SQL Server Profiler on each VM and configure email alerts", "B. Enable Azure Monitor for SQL — configure SQL Insights workbook with KQL-based log alert", "C. Use Azure SQL Analytics (OMS solution) in Log Analytics with performance counter collection", "D. Configure Azure Security Center SQL vulnerability assessment"],
    correct: "B",
    explanation: "SQL Insights (a feature of Azure Monitor) provides monitoring for SQL Server on Azure VMs using Data Collection Rules and custom KQL queries. You can create log search alert rules on SQL performance data (query duration, CPU, I/O) and trigger Action Groups. This is the current recommended approach for SQL Server monitoring on VMs."
  },
  { id: 118, domain: "domain5", difficulty: "medium",
    question: "You need to implement monitoring for an Azure web application to track response times, failure rates, and user sessions. What should you use?",
    options: ["A. Azure Monitor Metrics only", "B. Application Insights", "C. Log Analytics with custom application logs", "D. Azure Network Performance Monitor"],
    correct: "B",
    explanation: "Application Insights (part of Azure Monitor) is specifically designed for web application monitoring. It tracks request rates, response times, failure rates, dependencies, page views, user sessions, and custom events. It provides built-in dashboards, smart detection of anomalies, and distributed tracing."
  },
  { id: 119, domain: "domain5", difficulty: "easy",
    question: "What Azure feature automatically analyzes your Azure environment and provides cost-saving recommendations such as resizing underutilized VMs?",
    options: ["A. Azure Monitor", "B. Azure Cost Management", "C. Azure Advisor", "D. Azure Policy"],
    correct: "C",
    explanation: "Azure Advisor provides cost recommendations including right-sizing underutilized VMs, deleting idle VMs, purchasing reserved instances for consistent usage, and eliminating unused resources. It analyzes 7-14 days of usage data for VM sizing recommendations."
  },
  { id: 120, domain: "domain5", difficulty: "hard",
    question: "You need to ensure that Azure VM backups are retained for compliance for 7 years with the lowest possible cost. What configuration achieves this?",
    options: ["A. Standard backup policy with daily backups and 7-year daily retention in GRS vault", "B. Enhanced backup policy with Vault-standard tier for daily backups and Vault-archive tier for long-term retention (after 3 months)", "C. Daily snapshot of VM disks stored in LRS storage for 7 years", "D. Azure Site Recovery with 7-year replication history"],
    correct: "B",
    explanation: "Azure Backup supports tiering recovery points to the Vault-archive tier for long-term, lower-cost retention (min 6 months after creation, max 99 years). Archive tier has lower storage cost than Vault-standard but higher retrieval cost and latency. This combination minimizes cost for long-term compliance retention while maintaining daily backups."
  },
  { id: 121, domain: "domain5", difficulty: "medium",
    question: "You need to view a consolidated health status for all resources in your subscription organized by resource type. Which Azure service provides this at-a-glance view?",
    options: ["A. Azure Service Health dashboard", "B. Azure Resource Health for each resource individually", "C. Azure Monitor Workbooks with resource health tiles", "D. Azure Monitor Service Map"],
    correct: "A",
    explanation: "Azure Service Health provides a dashboard view of Azure service status, planned maintenance, and health advisories personalized to your subscriptions and regions. It shows the health of Azure services (not individual resources) and allows you to configure alerts. Resource Health shows individual resource health."
  },
  { id: 122, domain: "domain5", difficulty: "easy",
    question: "What is the difference between Azure Backup and Azure Site Recovery?",
    options: ["A. Azure Backup is for disaster recovery; Site Recovery is for data backup", "B. Azure Backup protects data (point-in-time recovery); Site Recovery enables disaster recovery (continuous replication and failover)", "C. They are the same service with different names", "D. Azure Backup works for VMs only; Site Recovery works for databases only"],
    correct: "B",
    explanation: "Azure Backup provides point-in-time data protection with configurable retention. It's for backup and restore use cases. Azure Site Recovery provides continuous replication and enables rapid failover to another region/site for business continuity/disaster recovery (BCDR). Both use Recovery Services Vault."
  },
  { id: 123, domain: "domain5", difficulty: "hard",
    question: "You manage 200 VMs across multiple resource groups. You need to ensure all VMs have the Azure Monitor Agent installed and configured with a specific Data Collection Rule. What is the most efficient approach?",
    options: ["A. Manually install AMA on each VM via SSH/RDP", "B. Use Azure Policy with DeployIfNotExists effect to automatically deploy AMA and associate DCR", "C. Create an ARM template for AMA and run it 200 times", "D. Use Azure Automation DSC to configure AMA on each VM"],
    correct: "B",
    explanation: "Azure Policy with DeployIfNotExists can automatically deploy the Azure Monitor Agent extension and associate Data Collection Rules to VMs that don't have them. Azure provides built-in policy initiatives for AMA deployment. This covers new VMs automatically and can remediate existing non-compliant VMs via remediation tasks."
  },
  { id: 124, domain: "domain5", difficulty: "medium",
    question: "You set up an Azure Budget alert at 90% of $1,000/month. The alert triggers an email. You also set up a 100% forecast alert. Two weeks into the month, the forecast shows $1,200 spend. What alerts fire?",
    options: ["A. Only the 90% alert (actual spend is below $1,000)", "B. Both the 90% actual and 100% forecast alerts", "C. Only the 100% forecast alert", "D. No alerts — forecasts are informational only"],
    correct: "C",
    explanation: "Budget alerts fire based on the configured threshold type. The 90% alert fires when actual spend reaches $900. If actual spend is below $900, that alert hasn't fired. The 100% forecast alert fires when Azure predicts spending will reach $1,000 by month end — since forecast is $1,200 (>100%), this fires. Both could fire if actual is also > $900."
  },
  { id: 125, domain: "domain5", difficulty: "hard",
    question: "You need to configure Azure Monitor to alert the operations team within 5 minutes when any VM in a subscription is deleted. What alert rule configuration achieves this?",
    options: ["A. Metric alert on 'VMs running' count across the subscription", "B. Activity Log alert targeting the subscription scope for 'Delete Virtual Machine' operation", "C. Log Analytics alert querying AzureActivity for delete operations every 5 minutes", "D. Resource Health alert for all VMs"],
    correct: "B",
    explanation: "Activity Log alerts trigger on control-plane events captured in the Azure Activity Log. Configure an alert rule at the subscription scope for Event Category = Administrative, Operation = Microsoft.Compute/virtualMachines/delete, Status = Succeeded. Activity Log alerts typically fire within 1-2 minutes of the event. This is more reliable and faster than polling log queries."
  }

];

// Group questions by domain for quick access
var domainQuestionDatabase = {
  domain1: az104Questions.filter(function(q) { return q.domain === "domain1"; }),
  domain2: az104Questions.filter(function(q) { return q.domain === "domain2"; }),
  domain3: az104Questions.filter(function(q) { return q.domain === "domain3"; }),
  domain4: az104Questions.filter(function(q) { return q.domain === "domain4"; }),
  domain5: az104Questions.filter(function(q) { return q.domain === "domain5"; })
};

// Helper functions
function getQuestionsByDomain(domainId) {
  return az104Questions.filter(function(q) { return q.domain === domainId; });
}

function getQuestionsByDifficulty(difficulty) {
  return az104Questions.filter(function(q) { return q.difficulty === difficulty; });
}

function getRandomQuestions(count) {
  var shuffled = az104Questions.slice().sort(function() { return Math.random() - 0.5; });
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
