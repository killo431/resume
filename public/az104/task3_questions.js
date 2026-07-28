// AZ-104 Microsoft Azure Administrator - Practice Exam Questions
const AZ104_QUESTIONS = [
  // Domain 1: Manage Azure Identities and Governance
  {
    id: 1,
    domain: "identity",
    difficulty: "medium",
    question: "You need to create a group in Azure AD where membership is automatically managed based on user properties. What type of group should you create?",
    options: [
      "Security group with assigned membership",
      "Microsoft 365 group with assigned membership",
      "Security group with dynamic membership",
      "Distribution group"
    ],
    correct: 2,
    explanation: "A Security group with dynamic membership automatically adds/removes members based on user attribute rules (e.g., department, job title). This eliminates manual membership management."
  },
  {
    id: 2,
    domain: "identity",
    difficulty: "medium",
    question: "A user needs to view all resources in a subscription but cannot make any changes. Which built-in RBAC role should you assign?",
    options: [
      "Contributor",
      "Owner",
      "Reader",
      "User Access Administrator"
    ],
    correct: 2,
    explanation: "The Reader role grants read-only access to view all resources. Contributor allows creating/managing resources, Owner has full access including role assignment, and User Access Administrator only manages user access to Azure resources."
  },
  {
    id: 3,
    domain: "identity",
    difficulty: "hard",
    question: "You assign a policy with the 'Deny' effect at the subscription level and a policy with the 'Audit' effect for the same rule at the resource group level. A user tries to create a non-compliant resource in that resource group. What happens?",
    options: [
      "The resource is created and audited only",
      "The resource creation is denied",
      "The resource is created but flagged as non-compliant",
      "Both effects apply and cancel each other out"
    ],
    correct: 1,
    explanation: "Azure Policy with 'Deny' effect at the subscription level overrides the 'Audit' effect at the resource group level. The deny effect takes precedence, blocking resource creation entirely."
  },
  {
    id: 4,
    domain: "identity",
    difficulty: "easy",
    question: "You want to prevent accidental deletion of a critical production resource group. What should you apply?",
    options: [
      "A CanNotDelete lock",
      "An RBAC Deny assignment",
      "A ReadOnly lock",
      "An Azure Policy with Deny effect"
    ],
    correct: 0,
    explanation: "A CanNotDelete lock prevents deletion while still allowing read and modify operations. A ReadOnly lock prevents both modification and deletion. For preventing accidental deletion only, CanNotDelete is the appropriate choice."
  },
  {
    id: 5,
    domain: "identity",
    difficulty: "medium",
    question: "Your organization uses management groups to organize subscriptions. You assign an RBAC role at the management group level. Which resources does this role apply to?",
    options: [
      "Only the management group itself",
      "Only direct child subscriptions",
      "All subscriptions, resource groups, and resources within the management group hierarchy",
      "Only resources explicitly tagged with the management group name"
    ],
    correct: 2,
    explanation: "RBAC assignments at the management group level are inherited by all child management groups, subscriptions, resource groups, and resources within that hierarchy. This is a key benefit of management groups for policy enforcement."
  },
  {
    id: 6,
    domain: "identity",
    difficulty: "medium",
    question: "You need to allow an external consultant (who has a personal Microsoft account) to access your Azure subscription resources without creating a full Azure AD account. What should you use?",
    options: [
      "Create a guest user via Azure AD B2B collaboration",
      "Share your admin credentials temporarily",
      "Create a service principal",
      "Use Azure AD B2C"
    ],
    correct: 0,
    explanation: "Azure AD B2B (Business-to-Business) collaboration allows you to invite external users as guest users. They can use their own credentials (Microsoft accounts, social accounts, etc.) and you control access via RBAC."
  },

  // Domain 2: Implement and Manage Storage
  {
    id: 7,
    domain: "storage",
    difficulty: "medium",
    question: "You need to provide a third-party vendor temporary read access to a specific blob container for 24 hours without sharing your storage account key. What should you use?",
    options: [
      "Managed identity",
      "Shared Access Signature (SAS) token",
      "Azure AD authentication",
      "Storage account access key"
    ],
    correct: 1,
    explanation: "A Shared Access Signature (SAS) token provides delegated, time-limited access to specific storage resources without sharing the account key. You can scope it to a specific container and set it to expire in 24 hours."
  },
  {
    id: 8,
    domain: "storage",
    difficulty: "medium",
    question: "You have blobs that are frequently accessed during the first 30 days after upload, then rarely accessed afterward. Which lifecycle management rule should you configure?",
    options: [
      "Move to Archive tier immediately after upload",
      "Move to Cool tier after 30 days, then Archive tier after 90 days",
      "Keep in Hot tier and delete after 90 days",
      "Move to Archive tier after 1 day"
    ],
    correct: 1,
    explanation: "Moving to Cool tier after 30 days reduces costs for infrequently accessed data while keeping it readily available. Moving to Archive tier after 90 days further reduces costs for data that's rarely needed. This matches the access pattern described."
  },
  {
    id: 9,
    domain: "storage",
    difficulty: "hard",
    question: "You have a storage account with LRS (Locally Redundant Storage). You need to ensure data is replicated to a secondary region for disaster recovery. What should you change the replication to?",
    options: [
      "ZRS (Zone-Redundant Storage)",
      "GRS (Geo-Redundant Storage)",
      "GZRS (Geo-Zone-Redundant Storage)",
      "RA-GRS (Read-Access Geo-Redundant Storage)"
    ],
    correct: 1,
    explanation: "GRS replicates data to a secondary region (geo-replication). ZRS replicates across availability zones in the same region. GZRS combines zone-redundancy with geo-replication. RA-GRS provides read access to the secondary, but GRS is the minimum required for cross-region replication."
  },
  {
    id: 10,
    domain: "storage",
    difficulty: "medium",
    question: "Which Azure storage service is best suited for sharing files across multiple VMs using the SMB protocol?",
    options: [
      "Azure Blob Storage",
      "Azure Table Storage",
      "Azure Files",
      "Azure Queue Storage"
    ],
    correct: 2,
    explanation: "Azure Files provides fully managed file shares accessible via SMB (Server Message Block) and NFS protocols, making it ideal for sharing files across multiple VMs. It can also be mounted on-premises."
  },
  {
    id: 11,
    domain: "storage",
    difficulty: "medium",
    question: "You need to configure Azure File Sync to sync files from your on-premises file server to Azure Files. After configuration, you notice the on-premises server has a 'cloud tiering' option enabled. What does this mean?",
    options: [
      "Files are deleted from the on-premises server and only kept in Azure",
      "Frequently accessed files are kept locally; less-used files are replaced with pointer stubs that are recalled on demand",
      "All files are encrypted before syncing to Azure",
      "Files are compressed to save bandwidth during sync"
    ],
    correct: 1,
    explanation: "Cloud tiering in Azure File Sync keeps frequently accessed (hot) files in the local cache while replacing infrequently accessed files with pointer stubs. When a stubbed file is accessed, it's automatically recalled from Azure Files transparently to the user."
  },

  // Domain 3: Deploy and Manage Azure Compute Resources
  {
    id: 12,
    domain: "compute",
    difficulty: "medium",
    question: "You deploy an ARM template and the deployment fails halfway through. What happens to the resources that were already created before the failure?",
    options: [
      "All resources created so far are automatically deleted (rollback)",
      "The successfully created resources remain; only failed resources are not created",
      "The entire deployment is retried automatically",
      "All resources are placed in a 'failed' state"
    ],
    correct: 1,
    explanation: "By default, ARM template deployments use 'Incremental' mode. Resources created before the failure remain intact. Only resources that failed to deploy are not created. You can use 'Complete' mode or deployment rollback features to change this behavior."
  },
  {
    id: 13,
    domain: "compute",
    difficulty: "medium",
    question: "You have a VM that needs to be available during planned maintenance. What should you use to guarantee the VM is restored to a working state within 30 minutes of planned maintenance?",
    options: [
      "Availability Zone",
      "Availability Set",
      "VM Scale Set",
      "Azure Site Recovery"
    ],
    correct: 1,
    explanation: "An Availability Set protects against planned maintenance and hardware failures by distributing VMs across fault domains and update domains. Azure guarantees that at least one VM in an availability set will be available during planned maintenance."
  },
  {
    id: 14,
    domain: "compute",
    difficulty: "hard",
    question: "You need to deploy a VM Scale Set that automatically scales based on CPU usage. The scale set should maintain a minimum of 2 and maximum of 10 instances. Which feature handles the automatic scaling?",
    options: [
      "Azure Load Balancer health probes",
      "Autoscale rules in the scale set",
      "Azure Monitor alerts",
      "Azure Policy auto-remediation"
    ],
    correct: 1,
    explanation: "VM Scale Sets have built-in autoscale capabilities where you configure rules that automatically scale in/out based on metrics like CPU percentage, memory, or custom metrics. You set minimum (2) and maximum (10) instance counts along with scale-out/in thresholds."
  },
  {
    id: 15,
    domain: "compute",
    difficulty: "medium",
    question: "Which Azure App Service plan tier supports deployment slots?",
    options: [
      "Free (F1)",
      "Shared (D1)",
      "Basic (B1)",
      "Standard (S1)"
    ],
    correct: 3,
    explanation: "Deployment slots are available on Standard, Premium, and Isolated App Service plan tiers. Free, Shared, and Basic tiers do not support deployment slots. Slots allow staging deployments and blue/green deployment patterns."
  },
  {
    id: 16,
    domain: "compute",
    difficulty: "medium",
    question: "You need to run a containerized application with a public IP and specific CPU/memory limits without managing any VMs or orchestration. Which service should you use?",
    options: [
      "Azure Kubernetes Service (AKS)",
      "Azure Container Instances (ACI)",
      "Azure VM with Docker",
      "Azure App Service containers"
    ],
    correct: 1,
    explanation: "Azure Container Instances (ACI) provides the fastest and simplest way to run a container in Azure without managing VMs. You specify CPU and memory requirements, assign a public IP, and the container runs immediately. No infrastructure management required."
  },
  {
    id: 17,
    domain: "compute",
    difficulty: "medium",
    question: "You have an existing Azure VM and need to add a 500 GB data disk. The VM is running. What type of disk operation can you perform without stopping the VM?",
    options: [
      "Attach a new managed disk (online disk attachment is supported)",
      "You must stop the VM to attach any disk",
      "You can only attach unmanaged disks to a running VM",
      "Disk attachment requires deallocating the VM"
    ],
    correct: 0,
    explanation: "Azure supports hot-attach (online disk attachment) for managed data disks. You can attach a new managed disk to a running VM without stopping or deallocating it. The OS disk replacement, however, requires the VM to be stopped."
  },

  // Domain 4: Configure and Manage Virtual Networking
  {
    id: 18,
    domain: "networking",
    difficulty: "easy",
    question: "You have two VNets in different Azure regions. You want VMs in both VNets to communicate privately. What should you configure?",
    options: [
      "VNet peering (global peering)",
      "VPN Gateway site-to-site connection",
      "ExpressRoute",
      "Service endpoints"
    ],
    correct: 0,
    explanation: "Global VNet peering enables direct communication between VNets in different Azure regions over Microsoft's backbone network. Traffic stays private, off the public internet. VPN Gateway is for on-premises connectivity, and ExpressRoute is for dedicated private connections."
  },
  {
    id: 19,
    domain: "networking",
    difficulty: "medium",
    question: "An NSG rule has the following configuration: Priority 100, Source: Any, Destination: Any, Port: 3389, Protocol: TCP, Action: Deny. A second rule has: Priority 200, Source: 10.0.0.0/24, Destination: Any, Port: 3389, Protocol: TCP, Action: Allow. Can the IP 10.0.0.5 connect on port 3389?",
    options: [
      "Yes, because the Allow rule matches",
      "No, because the Deny rule has lower priority number (higher priority) and matches first",
      "Yes, because Allow always overrides Deny",
      "It depends on which subnet the NSG is applied to"
    ],
    correct: 1,
    explanation: "In NSGs, lower priority numbers are processed first (higher precedence). Priority 100 (Deny) is processed before Priority 200 (Allow). Since the Deny rule matches ALL sources including 10.0.0.5, traffic is denied before the Allow rule is reached."
  },
  {
    id: 20,
    domain: "networking",
    difficulty: "medium",
    question: "You need to route all internet-bound traffic from a subnet through an Azure Firewall for inspection. What should you configure?",
    options: [
      "Network Security Group with priority 100 deny rule for internet",
      "User-Defined Route (UDR) with a next hop of Virtual Appliance pointing to the firewall IP",
      "Service endpoint for the subnet",
      "Private endpoint on the subnet"
    ],
    correct: 1,
    explanation: "User-Defined Routes (UDRs) override default Azure routing. By creating a route with destination 0.0.0.0/0 and next hop type 'Virtual Appliance' pointing to the Azure Firewall's private IP, all internet-bound traffic is directed through the firewall."
  },
  {
    id: 21,
    domain: "networking",
    difficulty: "hard",
    question: "You need to load balance HTTPS traffic (port 443) across three VMs and also terminate SSL at the load balancer level for SSL offloading. Which Azure service should you use?",
    options: [
      "Azure Load Balancer (Standard SKU)",
      "Azure Application Gateway with WAF",
      "Azure Traffic Manager",
      "Azure Front Door"
    ],
    correct: 1,
    explanation: "Azure Application Gateway is a Layer 7 load balancer that supports SSL termination (offloading). It handles SSL/TLS at the gateway level, decrypting traffic before forwarding to backend VMs. Azure Load Balancer operates at Layer 4 and does not terminate SSL."
  },
  {
    id: 22,
    domain: "networking",
    difficulty: "medium",
    question: "You want to allow VMs in a VNet to access Azure Storage without traffic going over the public internet. What should you configure?",
    options: [
      "Azure Firewall rule",
      "Service endpoint for Azure Storage on the subnet",
      "Private endpoint for the storage account",
      "Both B and C are valid, but serve different purposes"
    ],
    correct: 3,
    explanation: "Both service endpoints and private endpoints keep traffic off the public internet. Service endpoints route traffic through the Azure backbone but the storage account still has a public IP. Private endpoints assign a private IP from your VNet to the storage service for full network isolation. Both are valid depending on your requirements."
  },
  {
    id: 23,
    domain: "networking",
    difficulty: "medium",
    question: "You create a VNet with address space 10.1.0.0/16. You add a subnet with the address range 10.1.0.0/24. How many IP addresses are available for VMs in this subnet?",
    options: [
      "256",
      "254",
      "251",
      "248"
    ],
    correct: 2,
    explanation: "Azure reserves 5 IP addresses in each subnet: the network address (.0), Azure's default gateway (.1), Azure DNS (.2, .3), and broadcast address (.255). So a /24 subnet with 256 addresses minus 5 reserved = 251 usable IP addresses for resources."
  },
  {
    id: 24,
    domain: "networking",
    difficulty: "hard",
    question: "You need to establish a dedicated private network connection from your on-premises data center to Azure with guaranteed bandwidth, lower latency than VPN, and SLAs. Which service should you use?",
    options: [
      "Azure VPN Gateway with BGP",
      "Azure ExpressRoute",
      "Azure Virtual WAN",
      "Point-to-site VPN"
    ],
    correct: 1,
    explanation: "Azure ExpressRoute provides a dedicated private circuit between your on-premises network and Azure through a connectivity provider. It offers guaranteed bandwidth, lower and consistent latency, and higher security than VPN (traffic doesn't traverse the public internet). It comes with an SLA."
  },
  {
    id: 25,
    domain: "networking",
    difficulty: "medium",
    question: "Azure Bastion is deployed in your VNet. What does it provide?",
    options: [
      "A VPN connection to your on-premises environment",
      "Secure RDP/SSH access to VMs without exposing public IPs or opening inbound ports",
      "Automatic firewall protection for all VMs",
      "DNS resolution for internal resources"
    ],
    correct: 1,
    explanation: "Azure Bastion is a fully managed PaaS service that provides secure, seamless RDP and SSH connectivity to VMs directly over TLS from the Azure portal. VMs don't need public IPs, and you don't need to open RDP/SSH ports in NSGs, reducing the attack surface."
  },
  {
    id: 26,
    domain: "networking",
    difficulty: "medium",
    question: "You have a custom DNS server in your VNet. You configure Azure DNS on the VNet. When a VM in the VNet makes a DNS query, what is the order of resolution?",
    options: [
      "Azure DNS first, then custom DNS server",
      "Custom DNS server first; if it fails, Azure DNS is used",
      "Only Azure DNS is used when configured on the VNet",
      "The VM's DNS settings determine the order"
    ],
    correct: 1,
    explanation: "When you configure custom DNS servers on a VNet, VMs use those DNS servers first. The custom DNS server must be configured to forward unresolved queries to Azure DNS (168.63.129.16) for Azure-internal name resolution. The VM uses whatever servers are configured in the VNet's DNS settings."
  },

  // Domain 5: Monitor and Maintain Azure Resources
  {
    id: 27,
    domain: "monitoring",
    difficulty: "medium",
    question: "You want to receive an email notification when a VM's CPU usage exceeds 85% for more than 5 minutes. What should you configure in Azure Monitor?",
    options: [
      "A Diagnostic Setting with email export",
      "A metric alert rule with an action group containing an email action",
      "A Log Analytics query scheduled to run every 5 minutes",
      "An Azure Policy with email notification"
    ],
    correct: 1,
    explanation: "Azure Monitor metric alert rules allow you to define threshold conditions (CPU > 85%) with evaluation periods (5 minutes). Action groups define what happens when the alert fires, including sending emails, SMS, calling webhooks, or triggering runbooks."
  },
  {
    id: 28,
    domain: "monitoring",
    difficulty: "medium",
    question: "You need to back up an Azure VM. The recovery point objective (RPO) requires daily backups with 30-day retention. What should you use?",
    options: [
      "Azure Site Recovery",
      "Azure Backup with a custom backup policy",
      "VM snapshots",
      "Azure Storage geo-replication"
    ],
    correct: 1,
    explanation: "Azure Backup supports VM backups with customizable policies for frequency (daily) and retention (30 days). Azure Site Recovery is for disaster recovery/replication, not backup. VM snapshots can be used but don't have the same policy-based management as Azure Backup."
  },
  {
    id: 29,
    domain: "monitoring",
    difficulty: "hard",
    question: "A critical VM in Region A fails. You need to fail over to Region B within minutes. The VM was replicated using Azure Site Recovery. What is the correct failover process?",
    options: [
      "Restore from Azure Backup to Region B",
      "Initiate a failover in Azure Site Recovery to Region B; then perform a failback when Region A recovers",
      "Manually redeploy the VM in Region B from an ARM template",
      "Enable geo-redundancy on the VM's storage account"
    ],
    correct: 1,
    explanation: "Azure Site Recovery (ASR) provides continuous replication of VMs to a secondary region. During a disaster, you initiate a failover in ASR, which brings up the replicated VM in Region B. After Region A recovers, you can fail back. This achieves near-zero RPO and low RTO."
  },
  {
    id: 30,
    domain: "monitoring",
    difficulty: "medium",
    question: "You need to query Azure resource logs to find all failed operations in the last 24 hours across a subscription. Which tool should you use?",
    options: [
      "Azure Advisor",
      "Azure Log Analytics with Kusto Query Language (KQL)",
      "Azure Cost Management",
      "Azure Service Health"
    ],
    correct: 1,
    explanation: "Azure Log Analytics (part of Azure Monitor) collects and stores logs from Azure resources. You use Kusto Query Language (KQL) to query and analyze these logs. You can filter for failed operations, specific time ranges, resource types, etc."
  },
  {
    id: 31,
    domain: "monitoring",
    difficulty: "easy",
    question: "What does Azure Advisor provide?",
    options: [
      "A managed firewall service for VNets",
      "Personalized recommendations to optimize your Azure deployments for cost, security, reliability, operational excellence, and performance",
      "A tool to automate VM deployment from templates",
      "An incident management service for Azure outages"
    ],
    correct: 1,
    explanation: "Azure Advisor analyzes your resource configuration and usage telemetry and provides actionable recommendations across five categories: Cost, Security, Reliability (High Availability), Operational Excellence, and Performance. It helps you optimize your Azure environment."
  },

  // Mixed/Advanced Questions
  {
    id: 32,
    domain: "networking",
    difficulty: "hard",
    question: "You have a subnet with an NSG. You add a service endpoint for Azure SQL on the subnet and configure the Azure SQL server firewall to allow the VNet. Now users report they cannot access the SQL server from the internet. Why?",
    options: [
      "Service endpoints automatically disable public access to Azure SQL",
      "The SQL server firewall is blocking all non-VNet traffic because 'Allow Azure services' is disabled",
      "Service endpoints change the SQL server's public IP",
      "NSGs block all traffic to Azure SQL by default"
    ],
    correct: 1,
    explanation: "Service endpoints only route VNet traffic to the service via Azure backbone. If the Azure SQL firewall is configured to only allow the specific VNet/subnet (and 'Allow Azure services and resources to access this server' is disabled), internet traffic is blocked. Check the Azure SQL firewall rules."
  },
  {
    id: 33,
    domain: "storage",
    difficulty: "medium",
    question: "You need to prevent anyone from deleting blobs in a storage container for a specific compliance period. Even the account owner should not be able to delete blobs during this period. What should you configure?",
    options: [
      "A CanNotDelete lock on the storage account",
      "WORM (Write Once Read Many) policy using immutability policies on the container",
      "Soft delete with a 7-day retention period",
      "Azure Policy denying delete operations"
    ],
    correct: 1,
    explanation: "Immutability policies (WORM) on blob storage prevent modification or deletion of blobs for a specified period. Once locked, even account owners, administrators, or Microsoft cannot delete the blobs. This is required for compliance scenarios like SEC 17a-4(f), CFTC, FINRA."
  },
  {
    id: 34,
    domain: "identity",
    difficulty: "hard",
    question: "You have an application running on an Azure VM that needs to access Azure Key Vault secrets without storing any credentials in the application code. What is the best approach?",
    options: [
      "Store the service principal client secret in an environment variable",
      "Assign a system-assigned managed identity to the VM and grant it access to Key Vault",
      "Use a SAS token to access Key Vault",
      "Use the VM's boot diagnostics storage account for secrets"
    ],
    correct: 1,
    explanation: "A system-assigned managed identity creates an automatically managed identity in Azure AD for the VM. You grant this identity the necessary Key Vault access policy (or RBAC role). The application uses the Azure SDK to get tokens automatically from the VM's metadata service — no credentials needed in code."
  },
  {
    id: 35,
    domain: "compute",
    difficulty: "medium",
    question: "You have a Windows VM that is 'stopped' (not deallocated) in Azure. Which statement is true?",
    options: [
      "You are not billed for compute, but you are billed for storage",
      "You are billed for compute and storage",
      "You are not billed for anything",
      "The VM's public IP is automatically released"
    ],
    correct: 1,
    explanation: "A VM that is 'stopped' (OS shutdown) but NOT deallocated still incurs compute charges because the underlying hardware resources remain allocated. To stop compute billing, you must use 'Stop (Deallocate)' from the Azure portal or Azure CLI, which releases compute resources."
  },
  {
    id: 36,
    domain: "networking",
    difficulty: "medium",
    question: "You configure VNet peering between VNet-A (10.1.0.0/16) and VNet-B (10.2.0.0/16). VNet-A is connected to on-premises via VPN Gateway. You want VNet-B resources to reach on-premises through VNet-A's gateway. What must you enable on the peering?",
    options: [
      "Enable 'Allow forwarded traffic' on VNet-A's peering",
      "Enable 'Use remote gateway' on VNet-B's peering and 'Allow gateway transit' on VNet-A's peering",
      "Enable 'Allow virtual network access' on both peerings",
      "Configure a UDR on VNet-B pointing to VNet-A's gateway IP"
    ],
    correct: 1,
    explanation: "For gateway transit to work: on VNet-A's peering (the gateway hub), enable 'Allow gateway transit'. On VNet-B's peering (the spoke), enable 'Use remote gateways'. This allows VNet-B traffic to traverse VNet-A's VPN gateway to reach on-premises."
  },
  {
    id: 37,
    domain: "storage",
    difficulty: "easy",
    question: "What is the maximum size of a single blob in Azure Blob Storage?",
    options: [
      "500 GB",
      "1 TB",
      "4.75 TB",
      "190.7 TB"
    ],
    correct: 3,
    explanation: "Azure Block Blob supports a maximum size of approximately 190.7 TB. This is achieved by using up to 50,000 blocks of up to 4,000 MB each (50,000 × 4,000 MB = 200,000,000 MB ≈ 190.7 TiB). Page blobs support up to 8 TB."
  },
  {
    id: 38,
    domain: "identity",
    difficulty: "medium",
    question: "You need to ensure that all resources created in a subscription automatically have a 'CostCenter' tag. If the tag is missing, the resource should still be created but the tag should be added automatically. Which Azure Policy effect should you use?",
    options: [
      "Deny",
      "Audit",
      "Modify",
      "Append"
    ],
    correct: 2,
    explanation: "The 'Modify' effect adds or replaces tags on resources during create/update operations. Unlike 'Append' (which adds properties but cannot modify existing ones), 'Modify' can set tag values. The resource is still created — the tag is just automatically added if missing."
  },
  {
    id: 39,
    domain: "compute",
    difficulty: "hard",
    question: "You need to deploy an application that requires autoscaling, load balancing, and running containers. The team wants to use Kubernetes but doesn't want to manage the control plane. Which Azure service should you use?",
    options: [
      "Azure Container Instances with a load balancer",
      "Azure Kubernetes Service (AKS) — managed Kubernetes",
      "Azure Service Fabric",
      "Azure Batch"
    ],
    correct: 1,
    explanation: "Azure Kubernetes Service (AKS) is a managed Kubernetes offering where Azure manages the control plane (API server, etcd, scheduler) at no charge. You only manage and pay for the worker nodes. AKS supports autoscaling (Horizontal Pod Autoscaler, Cluster Autoscaler) and integrates with Azure Load Balancer."
  },
  {
    id: 40,
    domain: "monitoring",
    difficulty: "medium",
    question: "You have an Azure Storage Account and need to log all read and write operations for auditing purposes. Where should you configure this?",
    options: [
      "Azure Monitor Alerts",
      "Diagnostic Settings on the storage account to send logs to Log Analytics",
      "Azure Policy audit effect",
      "Storage account access keys rotation policy"
    ],
    correct: 1,
    explanation: "Diagnostic Settings on a storage account can be configured to capture blob, queue, table, and file read/write/delete operations. These logs can be sent to Log Analytics workspace, Storage Account, or Event Hubs for retention and analysis."
  },
  {
    id: 41,
    domain: "networking",
    difficulty: "hard",
    question: "You need to distribute incoming HTTPS traffic across servers in multiple Azure regions. The solution must route users to the closest healthy region and support instant failover. Which Azure service should you use?",
    options: [
      "Azure Load Balancer",
      "Azure Application Gateway",
      "Azure Traffic Manager",
      "Azure Front Door"
    ],
    correct: 3,
    explanation: "Azure Front Door is a global, scalable CDN/load balancer that routes users to the closest healthy backend using Anycast. It supports SSL termination, WAF, instant failover, and health probes. Traffic Manager uses DNS-based routing (slower failover), while Load Balancer and App Gateway are regional only."
  },
  {
    id: 42,
    domain: "identity",
    difficulty: "medium",
    question: "Users in your organization forget their passwords frequently. You want to allow them to reset their own passwords without contacting the help desk. What should you enable?",
    options: [
      "Azure AD Privileged Identity Management (PIM)",
      "Self-Service Password Reset (SSPR)",
      "Azure AD Identity Protection",
      "Azure Multi-Factor Authentication"
    ],
    correct: 1,
    explanation: "Self-Service Password Reset (SSPR) allows users to reset or unlock their own accounts without contacting help desk. It supports multiple authentication methods (email, phone, authenticator app, security questions) and reduces IT support burden."
  },
  {
    id: 43,
    domain: "storage",
    difficulty: "medium",
    question: "You need to copy 50 TB of data from on-premises to Azure Blob Storage over the internet. The available internet bandwidth is 100 Mbps. The data must be in Azure within 2 days. Is internet transfer feasible?",
    options: [
      "Yes, 100 Mbps is sufficient for 50 TB in 2 days",
      "No, 50 TB at 100 Mbps would take approximately 46 days; use Azure Data Box instead",
      "Yes, with AzCopy parallel uploads it would be faster",
      "No, but ExpressRoute would allow transfer within 2 days"
    ],
    correct: 1,
    explanation: "At 100 Mbps (12.5 MB/s), transferring 50 TB would take ~50,000,000 MB ÷ 12.5 MB/s ÷ 86,400 s/day ≈ 46 days. Azure Data Box (an offline transfer appliance) can physically ship up to 80 TB and typically arrives in Azure within a week, making it the appropriate solution."
  },
  {
    id: 44,
    domain: "compute",
    difficulty: "medium",
    question: "You need to deploy an ARM template to create a VM with specific configuration settings. You want to test the template before actual deployment to ensure there are no errors. What should you use?",
    options: [
      "Deploy to a dev subscription first",
      "Use the ARM template 'what-if' operation",
      "Validate the JSON syntax manually",
      "Use Azure Policy to check compliance"
    ],
    correct: 1,
    explanation: "The ARM template 'what-if' operation shows what changes would be made to your environment if you deployed the template, without actually making those changes. It returns a list of changes (creates, modifies, deletes) and any errors, allowing you to review before executing."
  },
  {
    id: 45,
    domain: "networking",
    difficulty: "easy",
    question: "What is the default outbound internet access for VMs in an Azure VNet that have no public IP and no NAT Gateway configured?",
    options: [
      "Outbound internet access is blocked by default",
      "VMs use default outbound access via Azure SNAT (though Microsoft recommends explicit configuration)",
      "VMs automatically get a NAT Gateway",
      "VMs must use a VPN Gateway for internet access"
    ],
    correct: 1,
    explanation: "Azure provides default outbound access (via SNAT) to VMs without explicit outbound connectivity. However, Microsoft is retiring this default outbound access and recommends explicitly configuring outbound connectivity via NAT Gateway, Load Balancer outbound rules, or a public IP on the VM."
  }
];
