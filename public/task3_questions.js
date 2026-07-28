// AZ-104 Study Questions - Task 3: Practice Questions Bank
// Practice questions for AZ-104 Microsoft Azure Administrator exam preparation.

var az104Questions = [
  // Domain 1: Manage Azure identities and governance
  {
    id: 1,
    domain: "domain1",
    difficulty: "medium",
    question: "You need to assign a role to a user so they can read all resources in a subscription but cannot make any changes. Which built-in RBAC role should you assign?",
    options: [
      "A. Owner",
      "B. Contributor",
      "C. Reader",
      "D. User Access Administrator"
    ],
    correct: "C",
    explanation: "The Reader role grants read-only access to view all resources but does not allow making changes. Owner has full access, Contributor can make changes but not manage access, and User Access Administrator manages user access to resources."
  },
  {
    id: 2,
    domain: "domain1",
    difficulty: "hard",
    question: "You need to ensure that MFA is required for all admin accounts in your Azure AD tenant. What is the most efficient approach?",
    options: [
      "A. Configure Conditional Access policies targeting admin roles",
      "B. Enable per-user MFA for each admin account individually",
      "C. Use Azure AD Identity Protection risk policies",
      "D. Configure Azure AD Privileged Identity Management"
    ],
    correct: "A",
    explanation: "Conditional Access policies targeting admin roles provide the most efficient and scalable approach. You can create a single policy that applies to all users assigned to administrator roles, requiring MFA for all sign-ins."
  },
  {
    id: 3,
    domain: "domain1",
    difficulty: "easy",
    question: "What is the maximum number of custom roles that can be created in an Azure subscription?",
    options: [
      "A. 1000",
      "B. 2000",
      "C. 5000",
      "D. Unlimited"
    ],
    correct: "C",
    explanation: "Azure allows up to 5000 custom roles per Azure AD tenant (applies across all subscriptions in the tenant)."
  },
  // Domain 2: Implement and manage storage
  {
    id: 4,
    domain: "domain2",
    difficulty: "medium",
    question: "You have a storage account that contains blob data. You need to provide a third-party application temporary access to a specific blob container for 24 hours without exposing your account keys. What should you use?",
    options: [
      "A. Access keys",
      "B. Shared Access Signature (SAS)",
      "C. Azure AD authentication",
      "D. Storage firewall rules"
    ],
    correct: "B",
    explanation: "A Shared Access Signature (SAS) provides temporary, limited access to storage resources without exposing account keys. You can set an expiry time (24 hours in this case) and limit the permissions and scope to the specific container."
  },
  {
    id: 5,
    domain: "domain2",
    difficulty: "hard",
    question: "You need to configure Azure Blob Storage lifecycle management to automatically move blobs to the Cool tier after 30 days of no access, then delete them after 90 days total. What is the correct configuration?",
    options: [
      "A. Create a lifecycle policy with two rules: one to tier to Cool after 30 days since last modified, one to delete after 90 days since last modified",
      "B. Create a lifecycle policy with a rule to tier to Cool after 30 days since last access, and delete after 60 more days (90 total since last access)",
      "C. Use Azure Storage Explorer to manually move blobs based on access dates",
      "D. Configure a Storage Account retention policy for 90 days"
    ],
    correct: "B",
    explanation: "The lifecycle policy should use 'last access time' tracking. Tier to Cool at 30 days since last access, and delete at 90 days since last access (not 90 days since creation or modification). Enable last access time tracking in the storage account first."
  },
  // Domain 3: Deploy and manage Azure compute resources
  {
    id: 6,
    domain: "domain3",
    difficulty: "medium",
    question: "You need to deploy an application that requires a minimum of 2 and maximum of 10 VM instances based on CPU utilization. Which Azure service should you use?",
    options: [
      "A. Azure Virtual Machines with manual scaling",
      "B. Azure VM Scale Sets with autoscale",
      "C. Azure Kubernetes Service",
      "D. Azure App Service with autoscale"
    ],
    correct: "B",
    explanation: "Azure VM Scale Sets with autoscale allows you to define minimum and maximum instance counts and configure scaling rules based on metrics like CPU utilization. This provides automatic scaling within your defined bounds."
  },
  {
    id: 7,
    domain: "domain3",
    difficulty: "easy",
    question: "Which VM size series in Azure is optimized for memory-intensive workloads such as large relational databases and in-memory analytics?",
    options: [
      "A. D-series",
      "B. F-series",
      "C. E-series",
      "D. H-series"
    ],
    correct: "C",
    explanation: "The E-series (Esv4, Eav4, etc.) VMs are memory-optimized and are designed for memory-intensive workloads like large relational databases, caches, and in-memory analytics. F-series is compute-optimized, D-series is general purpose, and H-series is for high-performance computing."
  },
  // Domain 4: Configure and manage virtual networking
  {
    id: 8,
    domain: "domain4",
    difficulty: "medium",
    question: "You have two virtual networks in different Azure regions. Users in VNet-A need to communicate with resources in VNet-B with low latency and without routing through the public internet. What should you configure?",
    options: [
      "A. VPN Gateway with site-to-site connection",
      "B. Global VNet Peering",
      "C. Azure ExpressRoute",
      "D. Azure Virtual WAN"
    ],
    correct: "B",
    explanation: "Global VNet Peering connects virtual networks across different Azure regions using the Microsoft backbone network. Traffic is private and does not traverse the public internet, providing low latency. VPN Gateway adds latency due to encryption overhead, ExpressRoute requires physical connectivity, and Virtual WAN is for hub-spoke topologies."
  },
  {
    id: 9,
    domain: "domain4",
    difficulty: "hard",
    question: "You need to allow internet traffic to reach VMs on port 443 while blocking all other inbound internet traffic. The VMs are in a subnet with a Network Security Group (NSG). What is the minimum number of rules needed?",
    options: [
      "A. 1 rule - Allow port 443 inbound",
      "B. 2 rules - Allow port 443 and Deny all inbound",
      "C. 3 rules - Allow port 443, Deny others, allow VNet traffic",
      "D. No additional rules - default NSG rules handle this"
    ],
    correct: "A",
    explanation: "NSGs have a default deny-all rule for internet inbound traffic (priority 65500). You only need to add one Allow rule for port 443 from the Internet. The default DenyAllInBound rule (priority 65500) will block all other internet traffic. Default rules cannot be deleted but can be overridden."
  },
  // Domain 5: Monitor and maintain Azure resources
  {
    id: 10,
    domain: "domain5",
    difficulty: "medium",
    question: "You need to configure backup for Azure VMs with a recovery point objective (RPO) of 24 hours and a retention period of 30 days. What should you use?",
    options: [
      "A. Azure Site Recovery with daily replication",
      "B. Azure Backup with daily backup policy and 30-day retention",
      "C. Azure Storage snapshots with 30-day retention policy",
      "D. Azure VM replication to another region"
    ],
    correct: "B",
    explanation: "Azure Backup with a daily backup policy meets the 24-hour RPO requirement, and you can configure 30-day retention for the recovery points. Azure Site Recovery is for disaster recovery/replication, not traditional backup. Storage snapshots don't provide the management features of Azure Backup."
  },
  {
    id: 11,
    domain: "domain5",
    difficulty: "easy",
    question: "Which Azure Monitor feature allows you to run log queries to analyze collected data from multiple sources?",
    options: [
      "A. Azure Metrics",
      "B. Log Analytics workspace",
      "C. Application Insights",
      "D. Azure Advisor"
    ],
    correct: "B",
    explanation: "Log Analytics workspace in Azure Monitor is where log data is collected and stored, and it provides a query interface using Kusto Query Language (KQL) to analyze data from multiple sources including VMs, applications, and Azure services."
  },
  {
    id: 12,
    domain: "domain1",
    difficulty: "medium",
    question: "You need to create a resource group and deploy resources to Azure using infrastructure as code. All resources must be deployed consistently across environments. Which Azure native service should you use?",
    options: [
      "A. Azure PowerShell scripts",
      "B. Azure CLI scripts",
      "C. Azure Resource Manager (ARM) templates",
      "D. Azure Management Groups"
    ],
    correct: "C",
    explanation: "ARM templates provide declarative infrastructure as code for Azure. They ensure consistent deployments across environments and support idempotent deployments. PowerShell and CLI scripts are imperative and harder to maintain for complex deployments. Management Groups are for organizing subscriptions."
  }
];

// Helper function to get questions by domain
function getQuestionsByDomain(domainId) {
  return az104Questions.filter(q => q.domain === domainId);
}

// Helper function to get questions by difficulty
function getQuestionsByDifficulty(difficulty) {
  return az104Questions.filter(q => q.difficulty === difficulty);
}

// Helper function to get a random subset of questions
function getRandomQuestions(count) {
  var shuffled = az104Questions.slice().sort(function() { return Math.random() - 0.5; });
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
