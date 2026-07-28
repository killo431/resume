// AZ-104 Study Data - Task 2: Domain Reference Data + Daily Schedules + Study Guides
// This file contains all reference data, schedules, and study guides for AZ-104 exam prep.

// ─── Domain Definitions ─────────────────────────────────────────────────────

var az104Domains = [
  {
    id: "domain1",
    name: "Manage Azure identities and governance",
    weight: "20-25%",
    days: [1, 2],
    topics: [
      "Manage Azure Active Directory (Entra ID) objects",
      "Manage role-based access control (RBAC)",
      "Manage subscriptions and governance",
      "Manage Azure Policy",
      "Implement management groups",
      "Configure resource locks"
    ]
  },
  {
    id: "domain2",
    name: "Implement and manage storage",
    weight: "15-20%",
    days: [3, 4],
    topics: [
      "Configure access to storage",
      "Configure and manage storage accounts",
      "Configure Azure Files and Azure Blob Storage",
      "Configure storage redundancy and replication",
      "Manage data using Storage Explorer and AzCopy"
    ]
  },
  {
    id: "domain3",
    name: "Deploy and manage Azure compute resources",
    weight: "20-25%",
    days: [5, 6, 7],
    topics: [
      "Automate deployment of resources using ARM templates",
      "Create and configure VMs and VM Scale Sets",
      "Create and configure containers (AKS, ACI)",
      "Create and configure Azure App Service",
      "Configure Azure Functions",
      "Manage VM availability and scaling"
    ]
  },
  {
    id: "domain4",
    name: "Configure and manage virtual networking",
    weight: "25-30%",
    days: [8, 9, 10],
    topics: [
      "Configure virtual networks and subnets",
      "Configure network security groups (NSGs) and ASGs",
      "Configure Azure DNS",
      "Configure load balancing (ALB, App Gateway, Traffic Manager)",
      "Configure VNet peering and VPN Gateway",
      "Configure Azure Firewall and Private Endpoints",
      "Monitor and troubleshoot virtual networking"
    ]
  },
  {
    id: "domain5",
    name: "Monitor and maintain Azure resources",
    weight: "10-15%",
    days: [11, 12],
    topics: [
      "Monitor resources using Azure Monitor",
      "Configure alerts and action groups",
      "Configure Log Analytics workspaces",
      "Implement Azure Backup",
      "Implement Azure Site Recovery",
      "Manage Azure resource costs"
    ]
  }
];

var az104Services = {
  identity: ["Azure AD / Entra ID", "Azure AD B2C", "Azure AD DS", "Managed Identities", "Service Principals", "RBAC", "Azure Policy", "Management Groups", "Blueprints"],
  storage: ["Blob Storage", "Azure Files", "Queue Storage", "Table Storage", "Disk Storage", "Azure Data Lake", "Storage Firewall", "Private Endpoints", "AzCopy", "Storage Explorer"],
  compute: ["Virtual Machines", "VM Scale Sets", "Azure Kubernetes Service", "App Service", "Azure Functions", "Container Instances", "ARM Templates", "Azure Bicep", "Azure Bastion"],
  networking: ["Virtual Networks", "VPN Gateway", "ExpressRoute", "Load Balancer", "Application Gateway", "Azure Firewall", "NSG", "ASG", "Private Endpoint", "Azure DNS", "Traffic Manager", "VNet Peering"],
  monitoring: ["Azure Monitor", "Log Analytics", "Application Insights", "Azure Alerts", "Azure Backup", "Azure Site Recovery", "Cost Management", "Azure Advisor", "Network Watcher"]
};

// ─── 14-Day Daily Schedules ─────────────────────────────────────────────────

var dailySchedules = {

  day1: {
    title: "Day 1: Azure AD / Entra ID Fundamentals",
    domain: "domain1",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "Azure AD Overview, Tenants & Editions", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis" },
          { type: "study", topic: "Users: Create, Invite, Bulk operations", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/add-users-azure-active-directory" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Groups: Assigned vs Dynamic, Nested groups", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/how-to-manage-groups" },
          { type: "study", topic: "External Identities, B2B Guest Invitations", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/active-directory/external-identities/what-is-b2b" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "Licenses: E1/E3/E5, Group-based licensing", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/license-users-groups" },
          { type: "study", topic: "Self-Service Password Reset (SSPR)", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/active-directory/authentication/tutorial-enable-sspr" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Conditional Access Policies fundamentals", duration: "50min", url: "https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/overview" }
        ]
      }
    ],
    lab: {
      title: "Lab 01: Manage Microsoft Entra ID Identities",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_01-Manage_Entra_ID_Identities.html",
      commands: [
        "az ad user create --display-name \"AZ104 User\" --user-principal-name az104user@yourdomain.com --password \"P@ssw0rd123!\"",
        "az ad user list --output table",
        "az ad group create --display-name \"AZ104-Admins\" --mail-nickname \"AZ104-Admins\"",
        "az ad group member add --group AZ104-Admins --member-id <user-object-id>",
        "az ad user delete --id <user-object-id>"
      ]
    },
    keyPoints: [
      "Azure AD (now called Microsoft Entra ID) is the cloud-based identity provider for Azure",
      "A tenant = one organization; you can have multiple subscriptions per tenant",
      "Free tier: 500K objects; P1 adds Conditional Access; P2 adds Identity Protection & PIM",
      "Dynamic groups update membership automatically based on user/device attributes",
      "B2B guests are invited, B2C is for customer-facing apps — know the difference for the exam",
      "SSPR requires at least one auth method (email, phone, app); admin accounts need 2",
      "Bulk user operations use CSV upload via the portal or PowerShell/CLI"
    ],
    quizlet: {
      title: "Azure AD / Entra ID Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-identity-flash-cards/"
    }
  },

  day2: {
    title: "Day 2: RBAC, Subscriptions & Governance",
    domain: "domain1",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "RBAC: Roles, Scope, Role Assignments", duration: "45min", url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview" },
          { type: "study", topic: "Built-in vs Custom Roles, JSON structure", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Management Groups & Subscription hierarchy", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview" },
          { type: "study", topic: "Azure Policy: Definitions, Initiatives, Compliance", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/governance/policy/overview" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "Resource Locks (CanNotDelete, ReadOnly)", duration: "20min", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources" },
          { type: "study", topic: "Tags: Apply, enforce with policy, billing", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Cost Management + Budgets + Alerts", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets" },
          { type: "study", topic: "ARM Templates: Structure, deploy, parameters", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview" }
        ]
      }
    ],
    lab: {
      title: "Lab 02a: Manage Subscriptions and RBAC",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_02a-Manage_Subscriptions_and_RBAC_Entra.html",
      commands: [
        "az role assignment create --assignee <user-id> --role \"Contributor\" --scope /subscriptions/<sub-id>",
        "az role assignment list --assignee <user-id> --output table",
        "az role definition list --name \"Contributor\" --output json",
        "az policy assignment create --name \"require-tags\" --policy \"requireTag\" --scope /subscriptions/<sub-id>",
        "az lock create --name \"NoDelete\" --lock-type CanNotDelete --resource-group myRG",
        "az lock list --resource-group myRG --output table"
      ]
    },
    keyPoints: [
      "RBAC scope hierarchy: Management Group > Subscription > Resource Group > Resource",
      "Role assignments are inherited downward — a Contributor at subscription level applies to all RGs",
      "Custom roles have up to 5000 per tenant; define Actions, NotActions, DataActions, NotDataActions",
      "Azure Policy enforces rules at scale; it evaluates existing resources and new deployments",
      "CanNotDelete lock prevents deletion but allows modifications; ReadOnly prevents both",
      "Tags are key-value pairs used for cost allocation, filtering, and automation",
      "ARM templates are idempotent — re-running the same template produces the same result"
    ],
    quizlet: {
      title: "RBAC & Governance Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-governance-flash-cards/"
    }
  },

  day3: {
    title: "Day 3: Storage Accounts & Access Control",
    domain: "domain2",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "Storage Account Types: GPv1, GPv2, Blob, Files", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview" },
          { type: "study", topic: "Redundancy: LRS, ZRS, GRS, RA-GRS, GZRS", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Access Keys, SAS tokens (Account, Service, User Delegation)", duration: "45min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview" },
          { type: "study", topic: "Storage Firewall, VNet rules, Private Endpoints", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "Azure AD + RBAC for Storage (Storage Blob Data Contributor)", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory" },
          { type: "study", topic: "Encryption: Service-side, Customer-managed keys", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "AzCopy, Storage Explorer, az storage CLI", duration: "55min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10" }
        ]
      }
    ],
    lab: {
      title: "Lab 07: Manage Azure Storage",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_07-Manage_Azure_Storage.html",
      commands: [
        "az storage account create --name mystorageacct --resource-group myRG --location eastus --sku Standard_LRS",
        "az storage account list --resource-group myRG --output table",
        "az storage blob upload --account-name mystorageacct --container-name mycontainer --name myblob.txt --file ./myblob.txt",
        "az storage account keys list --account-name mystorageacct --resource-group myRG",
        "az storage account generate-sas --account-name mystorageacct --expiry 2024-12-31 --permissions rwdlacup --resource-types sco --services bqtf",
        "azcopy copy 'https://mystorageacct.blob.core.windows.net/source' 'https://destacct.blob.core.windows.net/dest' --recursive"
      ]
    },
    keyPoints: [
      "LRS = 3 copies in one datacenter; ZRS = 3 copies across 3 AZs (same region)",
      "GRS replicates to a paired region (6 copies total); RA-GRS adds read access to secondary",
      "Account SAS: access to multiple services; Service SAS: scoped to one service/resource",
      "User Delegation SAS uses Azure AD credentials — most secure type of SAS",
      "Storage Firewall allows/denies by IP range or VNet — default is to deny all public access",
      "Storage Blob Data Contributor RBAC role needed for data-plane operations with AAD auth",
      "AzCopy supports single-file and recursive bulk transfer with authentication via SAS or AAD"
    ],
    quizlet: {
      title: "Azure Storage Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-storage-flash-cards/"
    }
  },

  day4: {
    title: "Day 4: Blob Storage, Files & Lifecycle",
    domain: "domain2",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "Blob types: Block, Append, Page blobs; Access tiers Hot/Cool/Archive", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction" },
          { type: "study", topic: "Lifecycle Management Policies: tier and delete rules", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Blob versioning, soft delete, point-in-time restore", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview" },
          { type: "study", topic: "Azure Files: Shares, SMB/NFS, File Sync", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction" }
        ]
      },
      {
        title: "🌇 Afternoon Session (1h 30min)",
        blocks: [
          { type: "study", topic: "Azure File Sync: Cloud tiering, sync groups, endpoints", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/storage/file-sync/file-sync-introduction" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Storage Domain 1-2 recap & practice questions", duration: "40min", url: "https://learn.microsoft.com/en-us/certifications/exams/az-104" }
        ]
      }
    ],
    lab: {
      title: "Lab 07b: Configure Azure Blob Storage",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_07-Manage_Azure_Storage.html",
      commands: [
        "az storage container create --name mycontainer --account-name mystorageacct --public-access blob",
        "az storage blob set-tier --account-name mystorageacct --container-name mycontainer --name myblob.txt --tier Cool",
        "az storage account blob-service-properties update --account-name mystorageacct --enable-delete-retention --delete-retention-days 14",
        "az storage share create --name myshare --account-name mystorageacct --quota 100",
        "az storage file upload --account-name mystorageacct --share-name myshare --source ./myfile.txt",
        "az storage account management-policy create --account-name mystorageacct --resource-group myRG --policy @lifecycle-policy.json"
      ]
    },
    keyPoints: [
      "Block blobs: up to 190.7TB, best for streaming/text; Append blobs: logs; Page blobs: VHD disks",
      "Archive tier has 180-day early deletion penalty; rehydration takes hours (Standard) or minutes (High)",
      "Lifecycle policies use lastModified or lastAccessTime — enable access time tracking first",
      "Soft delete lets you recover deleted blobs within retention period (1-365 days)",
      "Azure Files supports SMB 2.1/3.x and NFS 4.1; FileSync extends to on-premises Windows servers",
      "Cloud tiering in File Sync: hot files stay local, cold files are replaced with stubs",
      "Snapshot vs version: snapshots are manual/point-in-time; versions are automatic on write/delete"
    ],
    quizlet: {
      title: "Blob Storage & Files Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-blob-flash-cards/"
    }
  },

  day5: {
    title: "Day 5: Virtual Machines Deep Dive",
    domain: "domain3",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "VM sizes & families (B, D, E, F, H, N series)", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/sizes" },
          { type: "study", topic: "VM deployment: Portal, CLI, ARM template, Bicep", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-cli" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Managed disks: HDD, SSD Standard, SSD Premium, Ultra", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview" },
          { type: "study", topic: "VM availability: Availability Sets, Availability Zones, Fault/Update Domains", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/availability" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "VM Scale Sets: Uniform vs Flexible, autoscale rules", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview" },
          { type: "study", topic: "Azure Bastion, JIT VM Access, VM extensions", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/bastion/bastion-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "VM backup, snapshots, and restore points", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/snapshot-copy-managed-disk" }
        ]
      }
    ],
    lab: {
      title: "Lab 08: Manage Virtual Machines",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_08-Manage_Virtual_Machines.html",
      commands: [
        "az vm create --resource-group myRG --name myVM --image UbuntuLTS --admin-username azureuser --generate-ssh-keys",
        "az vm list --resource-group myRG --output table",
        "az vm show --resource-group myRG --name myVM",
        "az vm resize --resource-group myRG --name myVM --size Standard_DS2_v2",
        "az vm disk attach --resource-group myRG --vm-name myVM --name myDataDisk --size-gb 128 --sku Premium_LRS --new",
        "az vm extension set --resource-group myRG --vm-name myVM --name customScript --publisher Microsoft.Azure.Extensions --settings '{\"commandToExecute\": \"apt-get install -y nginx\"}'",
        "az vm stop --resource-group myRG --name myVM",
        "az vm deallocate --resource-group myRG --name myVM"
      ]
    },
    keyPoints: [
      "D-series: general purpose; E-series: memory optimized; F-series: compute optimized; N-series: GPU",
      "Availability Sets protect against hardware failures (fault domains) and planned maintenance (update domains)",
      "Availability Zones protect against entire datacenter failures — available in select regions",
      "Premium SSD required for SLA on single VM; Availability Set or Zone needed for 99.99% SLA",
      "VMSS Uniform: identical VMs (max 1000); Flexible: mix VMs for 99.95% SLA",
      "Azure Bastion: secure SSH/RDP via browser, no public IP on VM needed",
      "JIT VM Access locks down RDP/SSH ports and opens them on-demand for limited time windows"
    ],
    quizlet: {
      title: "Virtual Machines Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-vm-flash-cards/"
    }
  },

  day6: {
    title: "Day 6: App Service, Functions & Containers",
    domain: "domain3",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "App Service Plans: tiers (Free, Shared, Basic, Standard, Premium, Isolated)", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans" },
          { type: "study", topic: "Web Apps: deployment slots, slot swap, auto-swap", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Functions: triggers, bindings, hosting plans", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview" },
          { type: "study", topic: "Container Instances (ACI): quick container deploy", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "Azure Kubernetes Service (AKS): clusters, nodes, pods", duration: "50min", url: "https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Container Registry (ACR): push/pull images", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-intro" },
          { type: "study", topic: "ARM Templates & Bicep: parameters, variables, outputs, modules", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview" }
        ]
      }
    ],
    lab: {
      title: "Lab 09a: Implement Web Apps",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_09a-Implement_Web_Apps.html",
      commands: [
        "az appservice plan create --name myPlan --resource-group myRG --sku S1",
        "az webapp create --name myWebApp --resource-group myRG --plan myPlan --runtime \"NODE|18-lts\"",
        "az webapp deployment slot create --name myWebApp --resource-group myRG --slot staging",
        "az webapp deployment slot swap --name myWebApp --resource-group myRG --slot staging",
        "az container create --name mycontainer --resource-group myRG --image nginx --dns-name-label myapp --ports 80",
        "az aks create --resource-group myRG --name myAKSCluster --node-count 2 --generate-ssh-keys",
        "az acr create --resource-group myRG --name myACR --sku Basic",
        "az acr login --name myACR && docker tag myimage myACR.azurecr.io/myimage:v1 && docker push myACR.azurecr.io/myimage:v1"
      ]
    },
    keyPoints: [
      "App Service Plan defines compute resources; multiple apps can share one plan",
      "Deployment slots allow blue/green deployments; slot swap is near-zero-downtime",
      "Consumption plan for Functions: pay per execution, auto-scale; Premium: pre-warmed workers",
      "ACI is best for short-lived or isolated containers without orchestration overhead",
      "AKS manages the control plane for free; you pay for worker nodes (VMs)",
      "ACR integrates with AKS via managed identity — no credentials needed",
      "Bicep compiles to ARM JSON; use modules for reusable, composable infrastructure"
    ],
    quizlet: {
      title: "App Service & Containers Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-compute-flash-cards/"
    }
  },

  day7: {
    title: "Day 7: Compute Review & ARM Automation",
    domain: "domain3",
    sessions: [
      {
        title: "🌅 Morning Session (2h)",
        blocks: [
          { type: "study", topic: "Custom Script Extension, Cloud-init, DSC for VM config", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/custom-script-linux" },
          { type: "study", topic: "Azure Image Builder, Shared Image Gallery", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/image-builder-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Spot VMs and Reserved Instances", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms" },
          { type: "study", topic: "Compute domain practice Q&A and review", duration: "25min", url: "https://learn.microsoft.com/en-us/certifications/exams/az-104" }
        ]
      },
      {
        title: "🌇 Afternoon Session (1h 30min)",
        blocks: [
          { type: "study", topic: "ARM template what-if, validate, complete vs incremental mode", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Domain 3 full mock and flashcard review", duration: "45min", url: "https://learn.microsoft.com/en-us/certifications/exams/az-104" }
        ]
      }
    ],
    lab: {
      title: "Lab 03b: ARM Template Deployments",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_03b-Manage_Azure_Resources_by_Using_ARM_Templates.html",
      commands: [
        "az deployment group create --resource-group myRG --template-file azuredeploy.json --parameters @azuredeploy.parameters.json",
        "az deployment group what-if --resource-group myRG --template-file azuredeploy.json",
        "az deployment group validate --resource-group myRG --template-file azuredeploy.json",
        "az deployment group list --resource-group myRG --output table",
        "az bicep build --file main.bicep",
        "az deployment group create --resource-group myRG --template-file main.bicep --parameters env=prod"
      ]
    },
    keyPoints: [
      "Custom Script Extension executes scripts on VM after deployment — used for post-deployment config",
      "Cloud-init is a cross-platform tool for VM initialization on Linux VMs",
      "Shared Image Gallery stores, versions, and replicates VM images across regions",
      "Spot VMs use unused Azure capacity at discount — can be evicted with 30-second notice",
      "Reserved Instances: 1 or 3 year commitment, up to 72% savings over pay-as-you-go",
      "ARM template modes: Incremental (default, keeps existing) vs Complete (deletes unlisted resources)",
      "what-if shows planned changes without executing — always use before production deployments"
    ],
    quizlet: {
      title: "Compute & ARM Templates Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-compute-arm-flash-cards/"
    }
  },

  day8: {
    title: "Day 8: Virtual Networks & Subnets",
    domain: "domain4",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "VNet: Address spaces, subnets, CIDR notation", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview" },
          { type: "study", topic: "NSGs: Inbound/Outbound rules, default rules, priority", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "ASGs: Application Security Groups, rule simplification", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups" },
          { type: "study", topic: "Azure DNS: Public zones, private zones, alias records", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/dns/dns-overview" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "Service Endpoints vs Private Endpoints", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview" },
          { type: "study", topic: "VNet Peering: Local and Global, gateway transit", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "User-Defined Routes (UDR) & Route Tables", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview" }
        ]
      }
    ],
    lab: {
      title: "Lab 04: Implement Virtual Networking",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_04-Implement_Virtual_Networking.html",
      commands: [
        "az network vnet create --resource-group myRG --name myVNet --address-prefix 10.0.0.0/16 --subnet-name mySubnet --subnet-prefix 10.0.1.0/24",
        "az network nsg create --resource-group myRG --name myNSG",
        "az network nsg rule create --resource-group myRG --nsg-name myNSG --name AllowHTTPS --priority 100 --protocol Tcp --destination-port-range 443 --access Allow",
        "az network nsg rule list --resource-group myRG --nsg-name myNSG --output table",
        "az network vnet subnet update --resource-group myRG --vnet-name myVNet --name mySubnet --network-security-group myNSG",
        "az network dns zone create --resource-group myRG --name contoso.com",
        "az network dns record-set a add-record --resource-group myRG --zone-name contoso.com --record-set-name www --ipv4-address 10.0.1.4"
      ]
    },
    keyPoints: [
      "Azure reserves 5 IPs per subnet: network, gateway, broadcast, and 2 Azure-reserved addresses",
      "NSG default rules: AllowVnetInBound(65000), AllowAzureLBInBound(65001), DenyAllInBound(65500)",
      "Lower priority number = higher precedence (100 beats 200); range 100-4096",
      "ASGs group VMs logically — reference ASG in NSG rules instead of IP ranges",
      "Service Endpoints extend VNet identity to Azure services; Private Endpoints give services private IPs",
      "VNet Peering is non-transitive — A↔B and B↔C does NOT mean A↔C without additional peering",
      "UDR overrides Azure's default system routes — required to force traffic through NVA or Azure Firewall"
    ],
    quizlet: {
      title: "Virtual Networking Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-networking-flash-cards/"
    }
  },

  day9: {
    title: "Day 9: Load Balancing & VPN Connectivity",
    domain: "domain4",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "Azure Load Balancer (Layer 4): SKUs, rules, health probes", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview" },
          { type: "study", topic: "Application Gateway (Layer 7): WAF, routing rules, SSL termination", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/application-gateway/overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Traffic Manager: routing methods (Priority, Weighted, Performance, Geographic)", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview" },
          { type: "study", topic: "Azure Front Door: global load balancing, WAF, caching", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview" }
        ]
      },
      {
        title: "🌇 Afternoon Session (2h)",
        blocks: [
          { type: "study", topic: "VPN Gateway: SKUs, site-to-site, point-to-site, VNet-to-VNet", duration: "45min", url: "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways" },
          { type: "study", topic: "ExpressRoute: circuits, private peering, Global Reach", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Virtual WAN: hub-spoke at scale, secured hub", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about" }
        ]
      }
    ],
    lab: {
      title: "Lab 06: Traffic Management",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_06-Implement_Network_Traffic_Management.html",
      commands: [
        "az network lb create --resource-group myRG --name myLB --sku Standard --public-ip-address myPublicIP --frontend-ip-name myFrontEnd --backend-pool-name myBackEndPool",
        "az network lb rule create --resource-group myRG --lb-name myLB --name myHTTPRule --protocol tcp --frontend-port 80 --backend-port 80 --frontend-ip-name myFrontEnd --backend-pool-name myBackEndPool",
        "az network lb probe create --resource-group myRG --lb-name myLB --name myHealthProbe --protocol tcp --port 80",
        "az network application-gateway create --resource-group myRG --name myAppGW --capacity 2 --sku WAF_v2 --vnet-name myVNet --subnet appgw-subnet --http-settings-protocol Http --frontend-port 80",
        "az network vnet-gateway create --resource-group myRG --name myVpnGW --vnet myVNet --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --public-ip-address myGWPublicIP"
      ]
    },
    keyPoints: [
      "ALB Basic SKU: no SLA, single availability set; Standard SKU: zone redundant, 99.99% SLA",
      "Application Gateway routes based on URL path or hostname (Layer 7); supports WAF",
      "Traffic Manager is DNS-based global load balancer — not for routing within a VNet",
      "VPN Gateway takes 45-60 mins to provision; SKU determines throughput (VpnGw1: 650Mbps)",
      "Site-to-site VPN: connects on-premises to Azure; Point-to-site: individual client to Azure VNet",
      "ExpressRoute connections do NOT traverse the public internet — private, dedicated bandwidth",
      "Azure Front Door: global anycast entry points + CDN + WAF in one service"
    ],
    quizlet: {
      title: "Load Balancing & VPN Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-lb-vpn-flash-cards/"
    }
  },

  day10: {
    title: "Day 10: Azure Firewall, Monitoring & Networking Review",
    domain: "domain4",
    sessions: [
      {
        title: "🌅 Morning Session (2h)",
        blocks: [
          { type: "study", topic: "Azure Firewall: Premium vs Standard, DNAT, SNAT, network/app rules", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/firewall/overview" },
          { type: "study", topic: "Network Watcher: packet capture, connection troubleshoot, IP flow verify", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-monitoring-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "NSG Flow Logs, Traffic Analytics, Effective Routes & Security Rules", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-overview" }
        ]
      },
      {
        title: "🌇 Afternoon Session (1h 30min)",
        blocks: [
          { type: "study", topic: "Network troubleshooting scenarios: connectivity, routing, DNS", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-connectivity-portal" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Domain 4 full recap and practice questions", duration: "45min", url: "https://learn.microsoft.com/en-us/certifications/exams/az-104" }
        ]
      }
    ],
    lab: {
      title: "Lab 05: Implement Intersite Connectivity",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_05-Implement_Intersite_Connectivity.html",
      commands: [
        "az network firewall create --resource-group myRG --name myFirewall --location eastus",
        "az network firewall application-rule create --resource-group myRG --firewall-name myFirewall --collection-name AppRules --name AllowAzure --priority 100 --action Allow --protocols Http=80 Https=443 --target-fqdns *.azure.com",
        "az network watcher connection-monitor create --name myMonitor --resource-group myRG --location eastus",
        "az network watcher test-ip-flow --resource-group myRG --vm myVM --direction Inbound --protocol TCP --local 10.0.1.4:80 --remote 1.2.3.4:50000",
        "az network watcher show-next-hop --resource-group myRG --vm myVM --source-ip 10.0.1.4 --dest-ip 10.0.2.4",
        "az network nsg flow-log create --resource-group myRG --nsg myNSG --storage-account myStorage --enabled true"
      ]
    },
    keyPoints: [
      "Azure Firewall needs its own AzureFirewallSubnet (/26 or larger) and a public IP",
      "Firewall rule processing order: DNAT → Network rules → Application rules",
      "Network Watcher is per-region; enable it before using packet capture or connection monitor",
      "IP Flow Verify tests if traffic would be allowed/denied and which NSG rule applies",
      "Next Hop shows where traffic would be routed from a VM — helps debug UDR issues",
      "NSG Flow Logs v2 include throughput data; send to Log Analytics for Traffic Analytics",
      "Connection Troubleshoot checks end-to-end TCP connectivity including NSG, routes, and firewall"
    ],
    quizlet: {
      title: "Firewall & Network Monitoring Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-firewall-flash-cards/"
    }
  },

  day11: {
    title: "Day 11: Azure Monitor, Alerts & Diagnostics",
    domain: "domain5",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "Azure Monitor: metrics, logs, data sources, platform metrics", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview" },
          { type: "study", topic: "Log Analytics Workspace: tables, KQL queries, data retention", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Alerts: metric alerts, log alerts, activity log alerts, action groups", duration: "40min", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview" },
          { type: "study", topic: "Application Insights: telemetry, smart detection, availability tests", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview" }
        ]
      },
      {
        title: "🌇 Afternoon Session (1h 30min)",
        blocks: [
          { type: "study", topic: "Diagnostic settings: route to Log Analytics, Storage, Event Hub", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Advisor and Service Health", duration: "20min", url: "https://learn.microsoft.com/en-us/azure/advisor/advisor-overview" },
          { type: "study", topic: "KQL basics: where, project, summarize, join", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/" }
        ]
      }
    ],
    lab: {
      title: "Lab 11: Monitor Azure Infrastructure",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_11-Implement_Monitoring.html",
      commands: [
        "az monitor log-analytics workspace create --resource-group myRG --workspace-name myWorkspace",
        "az monitor metrics list --resource /subscriptions/<sub>/resourceGroups/myRG/providers/Microsoft.Compute/virtualMachines/myVM --metric \"Percentage CPU\" --output table",
        "az monitor alert create --name HighCPU --resource-group myRG --condition \"avg Percentage CPU > 90\" --window-size 5m --evaluation-frequency 1m --action myActionGroup",
        "az monitor action-group create --resource-group myRG --name myActionGroup --short-name myAG --email-receiver name=admin email=admin@contoso.com",
        "az monitor diagnostic-settings create --resource /subscriptions/<sub>/resourceGroups/myRG/providers/Microsoft.Compute/virtualMachines/myVM --name vm-diagnostics --workspace myWorkspace --logs '[{\"category\":\"AuditEvent\",\"enabled\":true}]' --metrics '[{\"category\":\"AllMetrics\",\"enabled\":true}]'"
      ]
    },
    keyPoints: [
      "Azure Monitor collects Metrics (numerical, 93-day retention) and Logs (queried with KQL)",
      "Log Analytics workspace is the backend store — multiple resources can send data to one workspace",
      "Metric alerts fire based on threshold crossings; log alerts run scheduled KQL queries",
      "Action groups define WHO gets notified (email/SMS/webhook/Logic App/ITSM/ARM deployment)",
      "Diagnostic settings are per-resource and must be configured manually or via policy",
      "Activity Log captures control-plane events (who did what); stored 90 days, export for longer",
      "Application Insights is part of Azure Monitor; supports distributed tracing and dependency maps"
    ],
    quizlet: {
      title: "Azure Monitor & Alerting Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-monitor-flash-cards/"
    }
  },

  day12: {
    title: "Day 12: Backup, Recovery & Cost Management",
    domain: "domain5",
    sessions: [
      {
        title: "🌅 Morning Session (2h 30min)",
        blocks: [
          { type: "study", topic: "Azure Backup: RSV, backup policies, VM backup, File/Folder, SQL", duration: "50min", url: "https://learn.microsoft.com/en-us/azure/backup/backup-overview" },
          { type: "study", topic: "Recovery Services Vault: replication settings, soft delete", duration: "30min", url: "https://learn.microsoft.com/en-us/azure/backup/backup-azure-recovery-services-vault-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Azure Site Recovery: replication, failover, failback, RPO/RTO", duration: "45min", url: "https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview" },
          { type: "study", topic: "VM restore options: full VM, file/folder, cross-region restore", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/backup/about-azure-vm-restore" }
        ]
      },
      {
        title: "🌇 Afternoon Session (1h 30min)",
        blocks: [
          { type: "study", topic: "Cost Management: budgets, cost analysis, reserved instances, hybrid benefit", duration: "35min", url: "https://learn.microsoft.com/en-us/azure/cost-management-billing/cost-management-billing-overview" },
          { type: "break", topic: "Break", duration: "10min" },
          { type: "study", topic: "Domain 5 recap + full monitoring & backup review", duration: "45min", url: "https://learn.microsoft.com/en-us/certifications/exams/az-104" }
        ]
      }
    ],
    lab: {
      title: "Lab 10b: Implement Data Protection",
      url: "https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/Instructions/Labs/LAB_10b-Implement_Data_Protection.html",
      commands: [
        "az backup vault create --resource-group myRG --name myRSV --location eastus",
        "az backup protection enable-for-vm --resource-group myRG --vault-name myRSV --vm myVM --policy-name DefaultPolicy",
        "az backup job list --resource-group myRG --vault-name myRSV --output table",
        "az backup item list --resource-group myRG --vault-name myRSV --workload-type VM --output table",
        "az backup protection backup-now --resource-group myRG --vault-name myRSV --item-name myVM --backup-management-type AzureIaasVM --retain-until 01-01-2025",
        "az consumption budget create --amount 500 --budget-name myBudget --category Cost --end-date 2024-12-31 --start-date 2024-01-01 --resource-group myRG --time-grain Monthly"
      ]
    },
    keyPoints: [
      "Recovery Services Vault stores backups; redundancy set at creation (LRS, ZRS, GRS)",
      "Default backup policy: daily at 9:30PM UTC, 30-day retention for daily, 12-week weekly",
      "Soft delete protects backup data for 14 days after deletion — free, enabled by default",
      "ASR RPO for Azure-to-Azure is about 15 minutes for multi-VM app consistency",
      "Azure Hybrid Benefit: use existing Windows Server and SQL Server licenses in Azure",
      "Reserved Instances commitment: 1-year or 3-year; can be exchanged but not refunded after limits",
      "Cost analysis in Azure Portal shows spend by resource, resource group, tag, and time period"
    ],
    quizlet: {
      title: "Backup, Recovery & Cost Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-backup-flash-cards/"
    }
  },

  day13: {
    title: "Day 13: Full Mock Exam — First Attempt",
    domain: "mock",
    sessions: [
      {
        title: "🌅 Morning: 125-Question Full Mock Exam",
        blocks: [
          { type: "study", topic: "Timed exam simulation (3 hours) — all 5 domains, mixed difficulty", duration: "180min", url: "https://learn.microsoft.com/en-us/certifications/exams/az-104" },
          { type: "break", topic: "Break — do not review answers yet", duration: "20min" }
        ]
      },
      {
        title: "🌇 Afternoon: Score Analysis & Targeted Review",
        blocks: [
          { type: "study", topic: "Score report analysis: identify weak domains (< 70% per domain)", duration: "30min", url: "" },
          { type: "study", topic: "Deep-dive review of all missed questions with explanations", duration: "60min", url: "" },
          { type: "break", topic: "Break", duration: "15min" },
          { type: "study", topic: "Focused re-read of weakest domain study guide", duration: "45min", url: "" },
          { type: "study", topic: "Second attempt on missed questions only", duration: "30min", url: "" }
        ]
      }
    ],
    lab: {
      title: "Practice Exam Resources",
      url: "https://learn.microsoft.com/en-us/certifications/practice/assessments?assessment-type=practice&assessmentId=21",
      commands: [
        "# Microsoft Official Practice Assessment (free, 50 questions)",
        "# URL: https://learn.microsoft.com/en-us/certifications/practice/assessments?assessment-type=practice&assessmentId=21",
        "# MeasureUp AZ-104 Practice Exams (paid, 250+ questions)",
        "# Whizlabs AZ-104 Practice Tests (freemium)",
        "# Udemy: Scott Duffy / Alan Rodrigues AZ-104 mock exams"
      ]
    },
    keyPoints: [
      "Target score for real exam: 700/1000 to pass; practice targeting 800+ for confidence",
      "Read each question twice — look for 'MOST appropriate', 'LEAST expensive', 'FASTEST'",
      "Eliminate obviously wrong answers first, then reason through remaining 2-3 options",
      "Case study questions in the real exam share a common scenario across 4-6 sub-questions",
      "Flag uncertain questions and return to them — time management is critical",
      "Don't change answers unless you have a specific reason; first instinct is often correct",
      "Focus extra time on Domain 4 (Networking) — historically the most complex section"
    ],
    quizlet: {
      title: "AZ-104 Full Mock Review Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-full-review-flash-cards/"
    }
  },

  day14: {
    title: "Day 14: Final Review & Exam Day Prep",
    domain: "mock",
    sessions: [
      {
        title: "🌅 Morning: Rapid-Fire Domain Reviews",
        blocks: [
          { type: "study", topic: "Domain 1 key facts blitz (20 min)", duration: "20min", url: "https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis" },
          { type: "study", topic: "Domain 2 key facts blitz (15 min)", duration: "15min", url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview" },
          { type: "study", topic: "Domain 3 key facts blitz (20 min)", duration: "20min", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/overview" },
          { type: "study", topic: "Domain 4 key facts blitz (25 min) — highest weight section", duration: "25min", url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview" },
          { type: "study", topic: "Domain 5 key facts blitz (15 min)", duration: "15min", url: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview" },
          { type: "break", topic: "Break", duration: "15min" }
        ]
      },
      {
        title: "🌇 Afternoon: Light Review & Logistics",
        blocks: [
          { type: "study", topic: "Keyword speed drill — all domains", duration: "30min", url: "" },
          { type: "study", topic: "CLI cheat sheet review — memorize key az commands", duration: "20min", url: "" },
          { type: "break", topic: "Break — rest your brain", duration: "30min" },
          { type: "study", topic: "Review exam logistics: check-in, ID requirements, breaks", duration: "15min", url: "https://learn.microsoft.com/en-us/certifications/certification-exam-policies" },
          { type: "study", topic: "Light review of 10 hardest personal questions", duration: "25min", url: "" }
        ]
      }
    ],
    lab: {
      title: "Exam Day Checklist",
      url: "https://learn.microsoft.com/en-us/certifications/azure-administrator/",
      commands: [
        "# Night before: get 7-8 hours sleep, no heavy study after 9PM",
        "# Morning of: light breakfast, arrive 30 min early for online or in-person",
        "# Have government-issued photo ID ready",
        "# Online proctored: clear desk, no phone, no second monitor",
        "# Exam duration: 150 minutes for ~60-65 questions (varies)",
        "# Passing score: 700 out of 1000",
        "# Results shown immediately after submission"
      ]
    },
    keyPoints: [
      "Don't cram new material today — review and reinforce what you already know",
      "Sleep is more valuable than 2 extra hours of study the night before the exam",
      "Exam has ~60-65 questions in 150 minutes — pace yourself at ~2 min per question",
      "Case study sections are longer — read the scenario carefully before answering sub-questions",
      "Mark questions for review — you can return to flagged questions before submitting",
      "Pass mark is 700/1000; you will see your score immediately after the exam",
      "If you fail: review the score report, focus on weak areas, and reschedule in 14 days"
    ],
    quizlet: {
      title: "AZ-104 Final Day Review Flashcards",
      url: "https://quizlet.com/gb/783241230/az-104-final-day-flash-cards/"
    }
  }
};

// ─── Study Guides (per Domain) ───────────────────────────────────────────────

var studyGuides = {

  domain1: {
    title: "Domain 1: Identity, Governance & Compliance — Study Guide",
    sections: [
      {
        heading: "Microsoft Entra ID (Azure AD) Core Concepts",
        items: [
          { bold: "Tenant", text: "A dedicated instance of Azure AD representing one organization. Multiple subscriptions can share a tenant." },
          { bold: "Azure AD Editions", text: "Free (included), Microsoft 365 Apps, P1 (Conditional Access, hybrid identity), P2 (Identity Protection, PIM, Access Reviews)." },
          { bold: "User Types", text: "Member (internal): full directory access. Guest (B2B): limited access via invitation. Cloud-only vs synced from on-premises AD." },
          { bold: "Groups", text: "Security groups (access control) vs Microsoft 365 groups (collaboration). Assigned (manual) vs Dynamic (rule-based automatic membership)." },
          { bold: "Bulk Operations", text: "Import/export users via CSV in portal, or use PowerShell/CLI for automation." },
          { bold: "SSPR", text: "Self-Service Password Reset requires ≥1 auth method for users, ≥2 for admins. Auth methods: mobile app, email, mobile/office phone, security Q&A." }
        ]
      },
      {
        heading: "Role-Based Access Control (RBAC)",
        items: [
          { bold: "Scope Hierarchy", text: "Management Group → Subscription → Resource Group → Resource. Roles assigned at higher scope are inherited downward." },
          { bold: "Key Built-in Roles", text: "Owner (full control + manage access), Contributor (full control, no access management), Reader (view only), User Access Administrator (manage access only)." },
          { bold: "Custom Roles", text: "Max 5,000 per tenant. Define Actions (allowed), NotActions (excluded), DataActions, NotDataActions. Scope must be specified." },
          { bold: "Role Assignment", text: "Security principal (user/group/SP/MI) + Role definition + Scope = Role Assignment. Max 4,000 per subscription." },
          { bold: "Deny Assignments", text: "Block specific actions even if a role grants them. Created by Blueprints and managed apps — you cannot create them directly." }
        ]
      },
      {
        heading: "Subscriptions, Management Groups & Governance",
        items: [
          { bold: "Management Groups", text: "Containers above subscriptions for applying policies at scale. Up to 6 levels deep (excluding root and subscription levels). Up to 10,000 MGs per directory." },
          { bold: "Azure Policy", text: "Evaluates resources for compliance. Assign policy definitions or initiatives (groups of policies). Effects: Deny, Audit, Append, Modify, DeployIfNotExists, AuditIfNotExists." },
          { bold: "Resource Locks", text: "CanNotDelete: read and modify allowed, delete blocked. ReadOnly: read allowed, modify and delete blocked. Locks are inherited and cannot be removed without authorization." },
          { bold: "Tags", text: "Max 50 tag name-value pairs per resource. Names case-insensitive, values case-sensitive. Tags not inherited; use Policy to enforce tagging standards." },
          { bold: "Cost Management", text: "Create budgets with alert thresholds. Use Cost Analysis for breakdown by service/RG/tag. Reserved Instances: 1 or 3 year, up to 72% savings." },
          { bold: "ARM Templates", text: "JSON declarative IaC. Sections: $schema, contentVersion, parameters, variables, resources, outputs. Incremental (default) vs Complete mode. Always idempotent." }
        ]
      },
      {
        heading: "Conditional Access & Identity Protection",
        items: [
          { bold: "Conditional Access", text: "If (assignment) → Then (access control). Conditions: users/groups, cloud apps, locations, device platforms, device state, sign-in risk. Controls: MFA, compliant device, approved app, block." },
          { bold: "Named Locations", text: "IP-based or country-based trusted locations. Used in CA policies to allow/block by location." },
          { bold: "Identity Protection", text: "Detects risky sign-ins and risky users. Risk levels: Low, Medium, High. Can auto-remediate with CA policy requiring MFA or password change." },
          { bold: "PIM (Privileged Identity Management)", text: "P2 feature. Just-in-time privileged access: activate roles for limited time. Requires approval and justification. Provides access reviews." }
        ]
      }
    ]
  },

  domain2: {
    title: "Domain 2: Storage — Study Guide",
    sections: [
      {
        heading: "Storage Account Types & Configuration",
        items: [
          { bold: "Account Types", text: "General Purpose v2 (GPv2): recommended for most scenarios, supports all services and tiers. Premium Block Blobs: low latency blob storage. Premium Page Blobs: unmanaged disks. Premium File Shares: SMB/NFS file shares." },
          { bold: "Access Tiers", text: "Hot: frequent access, lower access cost, higher storage cost. Cool: infrequent access (≥30 days), lower storage cost. Cold: ≥90 days. Archive: ≥180 days, offline, requires rehydration (hours)." },
          { bold: "Performance Tiers", text: "Standard (HDD-backed, general use) vs Premium (SSD-backed, low latency). Premium doesn't support archive tier." },
          { bold: "Secure Transfer Required", text: "Enforces HTTPS for REST API calls. Enabled by default on new accounts — do not disable." }
        ]
      },
      {
        heading: "Redundancy Options",
        items: [
          { bold: "LRS", text: "Locally Redundant Storage: 3 synchronous copies in one datacenter. Cheapest. Risk: datacenter failure loses all copies." },
          { bold: "ZRS", text: "Zone-Redundant Storage: 3 copies across 3 AZs in one region. Protects against datacenter failure. Recommended for HA applications." },
          { bold: "GRS", text: "Geo-Redundant Storage: LRS in primary + asynchronous copy to secondary region (read requires failover). 6 copies total." },
          { bold: "RA-GRS", text: "Read-Access Geo-Redundant: GRS + readable secondary endpoint. Use for read-heavy disaster recovery." },
          { bold: "GZRS / RA-GZRS", text: "ZRS in primary + asynchronous copy to secondary (read-access variant). Highest durability available." }
        ]
      },
      {
        heading: "Access Control & Security",
        items: [
          { bold: "Access Keys", text: "Two 512-bit keys per account. Full access to entire account. Rotate regularly. Should not be used in app code — use managed identity or SAS instead." },
          { bold: "SAS (Shared Access Signature)", text: "Account SAS: multiple services. Service SAS: one service/resource. User Delegation SAS: signed with Azure AD credentials — most secure. Always specify minimum permissions and short expiry." },
          { bold: "Stored Access Policies", text: "Named policy on a container/queue/table/share. Can revoke SAS by deleting the policy. SAS tokens should reference a stored policy for revocation capability." },
          { bold: "Azure AD Auth (RBAC)", text: "Storage Blob Data Owner, Storage Blob Data Contributor, Storage Blob Data Reader. Data-plane roles (not control-plane). Preferred over access keys for applications." },
          { bold: "Storage Firewall", text: "Allow access from selected VNets (service endpoints) or IP ranges. Default: deny all public access. Add trusted Microsoft services to exceptions list." },
          { bold: "Private Endpoints", text: "Assign private IP from your VNet to storage account. Traffic stays on Microsoft backbone. DNS resolves to private IP via Private DNS Zone." }
        ]
      },
      {
        heading: "Blob Storage & Data Protection",
        items: [
          { bold: "Blob Types", text: "Block Blob: up to 190.7 TB, ideal for files/images/videos. Append Blob: write-only sequential appends, ideal for logs. Page Blob: 512-byte pages, up to 8 TB, ideal for VHD/IaaS disks." },
          { bold: "Lifecycle Management", text: "Automate tiering and deletion based on last modified or last access time (enable access tracking). Rules: filter (blob prefix, type) + action (tierToCool, tierToArchive, delete) + condition (daysAfterModification)." },
          { bold: "Soft Delete", text: "Blob soft delete: recover deleted/overwritten blobs within 1-365 days. Container soft delete: recover deleted containers. Enable separately." },
          { bold: "Versioning", text: "Automatically creates versions on object write/delete. Current version vs previous versions. Versions count toward storage costs." },
          { bold: "Immutability", text: "WORM (Write Once Read Many): Time-based retention or Legal hold. Prevents modification and deletion. Available at container level or object level (account-level immutability support)." }
        ]
      },
      {
        heading: "Azure Files & AzCopy",
        items: [
          { bold: "Azure Files", text: "Fully managed cloud file shares accessed via SMB 2.1/3.x or NFS 4.1. Mount on Windows, Linux, macOS. Max 100 TiB per share, 5 TB per file." },
          { bold: "Azure File Sync", text: "Extends Azure Files to on-premises Windows Servers. Cloud Tiering: infrequently accessed files become stubs on disk. Multiple server endpoints can sync to same share." },
          { bold: "AzCopy", text: "Command-line tool for bulk copy/sync operations. Authenticate with SAS token or Azure AD login. azcopy copy, azcopy sync, azcopy list, azcopy login, azcopy jobs." }
        ]
      }
    ]
  },

  domain3: {
    title: "Domain 3: Compute — Study Guide",
    sections: [
      {
        heading: "Virtual Machines",
        items: [
          { bold: "VM Size Families", text: "A/B: basic/burstable. D: general purpose. E: memory optimized. F: compute optimized. G: memory/storage. H: HPC. L: storage optimized. M: very large memory. N: GPU." },
          { bold: "Managed Disks", text: "OS disk (boot volume) + Data disks (up to 32 for most sizes). Types: Standard HDD, Standard SSD, Premium SSD, Ultra Disk (lowest latency, configurable IOPS). Disks are Azure-managed — no storage account needed." },
          { bold: "Availability Sets", text: "Protect against hardware failures (fault domains, max 3) and planned maintenance (update domains, max 20). Only VMs in same AS protected together. Up to 99.95% SLA with ≥2 VMs in AS." },
          { bold: "Availability Zones", text: "Physically separate datacenters in same region. 99.99% SLA for VMs across 2+ zones. Not available in all regions." },
          { bold: "VM SLA Rules", text: "Single VM + Premium SSD: 99.9%. VMs in Availability Set: 99.95%. VMs across AZs: 99.99%. No SLA for single VM with Standard storage." }
        ]
      },
      {
        heading: "VM Scale Sets (VMSS)",
        items: [
          { bold: "Uniform Mode", text: "Identical VMs from same image. Up to 1,000 instances. Use for stateless workloads." },
          { bold: "Flexible Mode", text: "Mix different VM configurations. Up to 1,000 instances. 99.95% SLA with ≥2 VMs. Can include VMs from Availability Zones." },
          { bold: "Autoscale", text: "Scale in/out based on metrics (CPU, memory, custom). Define min, max, and default instance counts. Scale-in policy: newest, oldest, or default (balanced across zones)." },
          { bold: "Upgrade Policies", text: "Manual (you control when), Automatic (Azure upgrades in batches), Rolling (gradual, preserves availability)." }
        ]
      },
      {
        heading: "Azure App Service",
        items: [
          { bold: "App Service Plan Tiers", text: "Free (F1): shared, 60 min/day CPU. Shared (D1): shared, custom domain. Basic (B1-B3): dedicated, manual scale, no SLA. Standard (S1-S3): auto-scale, deployment slots (5), 99.95% SLA. Premium (P1-P3): more scale, slots (20). Isolated (I1-I3): ASE, private VNet." },
          { bold: "Deployment Slots", text: "Swap production ↔ staging with slot swap (zero downtime). Connection strings and app settings can be slot-specific (sticky). Auto-swap: auto-promote staging to production on deployment." },
          { bold: "Scaling", text: "Scale up: change pricing tier (more CPU/RAM). Scale out: add instances (manual or auto). Autoscale rules: by metric or schedule." }
        ]
      },
      {
        heading: "Azure Functions & Containers",
        items: [
          { bold: "Function Hosting Plans", text: "Consumption (serverless, auto-scale, pay-per-execution, 5-min default timeout). Premium (pre-warmed, VNet integration, no cold start). Dedicated (App Service Plan, always on)." },
          { bold: "Azure Container Instances (ACI)", text: "Run containers without managing infrastructure. Per-second billing. Container groups: share lifecycle, network, storage. Good for: batch jobs, CI/CD, simple microservices." },
          { bold: "Azure Kubernetes Service (AKS)", text: "Managed Kubernetes control plane (free). Pay for worker nodes. Node pools: system (required) + user (optional). Enable autoscaler per node pool. Integrates with ACR for images, Azure AD for auth, Azure Monitor for logging." },
          { bold: "Azure Container Registry (ACR)", text: "Store and manage Docker container images and OCI artifacts. Tiers: Basic, Standard, Premium (geo-replication, content trust). Use managed identity for AKS to ACR pull (no credentials)." }
        ]
      },
      {
        heading: "ARM Templates & IaC",
        items: [
          { bold: "ARM Template Structure", text: "$schema, contentVersion, parameters (user inputs), variables (computed values), resources (resources to deploy), outputs (return values). Also: apiProfile, functions." },
          { bold: "Deployment Modes", text: "Incremental (default): add or modify resources, leave others unchanged. Complete: delete any resources not in template. Complete mode is destructive — use carefully." },
          { bold: "Template Functions", text: "resourceGroup(), subscription(), parameters(), variables(), concat(), uniqueString(), reference(), listKeys(), base64(). Use in expressions: [functionName()]." },
          { bold: "Bicep", text: "DSL that compiles to ARM JSON. Cleaner syntax, no brackets needed. Supports modules (reusable components), loops (for), conditions (if). az bicep build converts to JSON." }
        ]
      }
    ]
  },

  domain4: {
    title: "Domain 4: Networking — Study Guide",
    sections: [
      {
        heading: "Virtual Networks & Subnets",
        items: [
          { bold: "VNet Address Space", text: "CIDR notation (e.g., 10.0.0.0/16). Non-overlapping with on-premises or other peered VNets. Can add multiple address spaces to one VNet." },
          { bold: "Reserved IPs per Subnet", text: "Azure reserves 5 IPs: .0 (network), .1 (gateway), .2-.3 (Azure DNS), .255 (broadcast). A /29 subnet has 3 usable IPs." },
          { bold: "Subnet Delegation", text: "Delegate a subnet to an Azure service (e.g., Azure SQL MI, App Service, API Management). Service creates/manages resources in that subnet." },
          { bold: "Special Subnets", text: "GatewaySubnet: for VPN/ExpressRoute gateways (min /27 recommended). AzureFirewallSubnet: /26 required. AzureBastionSubnet: /26 required." }
        ]
      },
      {
        heading: "Network Security Groups (NSGs)",
        items: [
          { bold: "Default Rules", text: "Inbound: AllowVnetInBound(65000), AllowAzureLBInBound(65001), DenyAllInBound(65500). Outbound: AllowVnetOutBound(65000), AllowInternetOutBound(65001), DenyAllOutBound(65500)." },
          { bold: "Custom Rules", text: "Priority 100-4096, lower = higher precedence. Properties: name, priority, direction, access (Allow/Deny), protocol (TCP/UDP/ICMP/Any), source/destination (IP, CIDR, service tag, ASG), port range." },
          { bold: "Service Tags", text: "Named groups of IP address prefixes (e.g., Internet, VirtualNetwork, AzureLoadBalancer, Storage, Sql, AzureActiveDirectory). Updated automatically by Microsoft." },
          { bold: "NSG Placement", text: "Apply to subnets (affects all VMs in subnet) or NICs (affects specific VM). Traffic evaluated by both if applied at both levels." }
        ]
      },
      {
        heading: "DNS & Routing",
        items: [
          { bold: "Azure DNS Public Zones", text: "Host DNS records for internet-facing domains. Supported records: A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT. Alias records: point to Azure resources (Traffic Manager, CDN, Public IP)." },
          { bold: "Azure Private DNS Zones", text: "Name resolution within VNets. Link VNet to zone for auto-registration (VMs register automatically). Must have unique names within linked VNets." },
          { bold: "Custom DNS Servers", text: "Set per VNet (DNS settings). Overrides Azure-provided DNS (168.63.129.16). Common with AD DS environments." },
          { bold: "User-Defined Routes (UDR)", text: "Route table with custom routes. Next hop types: VirtualNetworkGateway, VirtualNetwork, Internet, VirtualAppliance, None (drop). Associate to subnets. Override system routes." }
        ]
      },
      {
        heading: "Load Balancing",
        items: [
          { bold: "Azure Load Balancer (Layer 4)", text: "Basic SKU: no availability guarantees, free, limited features. Standard SKU: zone-redundant, 99.99% SLA, secure by default (no inbound by default). Rules + health probes required." },
          { bold: "Application Gateway (Layer 7)", text: "HTTP/HTTPS routing by URL path or hostname. WAF (OWASP rules). SSL offload and end-to-end SSL. Autoscaling (v2 SKU). Session affinity via cookie." },
          { bold: "Traffic Manager", text: "DNS-based global load balancer. Routing methods: Priority (failover), Weighted (load distribution), Performance (lowest latency), Geographic, Multivalue, Subnet. No packet inspection — works by DNS response." },
          { bold: "Azure Front Door (AFD)", text: "Global anycast HTTP load balancer. WAF, CDN, SSL offload, URL-based routing, session affinity. Standard and Premium tiers. Replaces classic AFD and CDN." }
        ]
      },
      {
        heading: "VPN & ExpressRoute",
        items: [
          { bold: "VPN Gateway", text: "Virtual network gateway for VPN connections. SKUs: Basic, VpnGw1-VpnGw5 (throughput: 650Mbps to 10Gbps). Types: Route-based (recommended), Policy-based (IKEv1, legacy). Provisioning takes 45-60 minutes." },
          { bold: "Connection Types", text: "Site-to-Site (S2S): on-premises to VNet via IPsec/IKE. Point-to-Site (P2S): individual client to VNet. VNet-to-VNet: connect two Azure VNets via VPN (different from peering)." },
          { bold: "ExpressRoute", text: "Private connection (not over internet) between on-premises and Azure via connectivity provider. Bandwidth: 50Mbps to 10Gbps. Latency SLA. Global Reach: connect on-premises sites via ExpressRoute." },
          { bold: "VNet Peering", text: "Direct traffic between VNets over Microsoft backbone. Local peering: same region. Global peering: different regions. Non-transitive: configure peering for each pair. Gateway transit: shared VPN/ER gateway." }
        ]
      },
      {
        heading: "Azure Firewall & Network Security",
        items: [
          { bold: "Azure Firewall", text: "Managed, stateful, cloud-native firewall. Standard SKU: L4 rules, FQDN filtering. Premium SKU: TLS inspection, IDPS, URL filtering. Deploy in dedicated AzureFirewallSubnet (/26+)." },
          { bold: "Rule Types", text: "DNAT rules: redirect inbound traffic to internal IP. Network rules: IP/port/protocol Allow/Deny. Application rules: FQDN-based Allow for outbound. Processing order: DNAT → Network → Application." },
          { bold: "Azure DDoS Protection", text: "Basic: always-on, free, platform-level protection. Standard (Network Protection): per-VNet, adaptive tuning, attack analytics, cost guarantee. Enable per VNet." }
        ]
      }
    ]
  },

  domain5: {
    title: "Domain 5: Monitor & Maintain Azure Resources — Study Guide",
    sections: [
      {
        heading: "Azure Monitor",
        items: [
          { bold: "Data Types", text: "Metrics: numerical time-series, 93-day retention, near real-time. Logs: structured/unstructured records, stored in Log Analytics workspace, queried with KQL." },
          { bold: "Data Sources", text: "Azure resources (platform metrics/logs), Guest OS (via Log Analytics agent or Azure Monitor Agent), Applications (App Insights), Custom sources (REST API, Logic Apps)." },
          { bold: "Metrics Explorer", text: "Visualize and analyze resource metrics. Create charts, pin to dashboard. Aggregate: avg, min, max, sum, count. Split by dimension (e.g., API name, region)." },
          { bold: "Activity Log", text: "Subscription-level control-plane events (who did what, when). Retained 90 days. Export to Log Analytics, Storage, or Event Hub for longer retention. Searchable by: caller, event category, timespan, resource." }
        ]
      },
      {
        heading: "Log Analytics & KQL",
        items: [
          { bold: "Log Analytics Workspace", text: "Central repository for log data. Multiple resources send data to one workspace. Data retention: 30-730 days (default 30). Archive tier: up to 7 years at lower cost." },
          { bold: "KQL Basics", text: "search * where TimeGenerated > ago(1h) | where Computer == 'myVM' | project TimeGenerated, Computer, EventID | summarize count() by Computer | order by Computer asc." },
          { bold: "Common Tables", text: "Heartbeat (agent check-in), Event (Windows events), Syslog (Linux), AzureDiagnostics (resource diagnostics), SecurityEvent (Windows security events), AzureActivity (activity log)." },
          { bold: "Workspace Design", text: "Centralized (one workspace for all) or decentralized (per team/env). Consider data residency, access control (workspace vs resource-context), and cost when designing." }
        ]
      },
      {
        heading: "Alerts & Action Groups",
        items: [
          { bold: "Alert Types", text: "Metric alert: threshold on metric value. Log search alert: KQL query result count or metric measurement. Activity log alert: specific control-plane event. Smart detection: App Insights anomaly detection." },
          { bold: "Alert Rule Components", text: "Target resource, Signal (metric/log/activity), Condition (threshold/query), Action Group, Alert name, Description, Severity (0-4)." },
          { bold: "Action Groups", text: "Reusable set of notification actions. Types: Email/SMS/Push/Voice, Azure App (mobile), Webhook, Event Hub, Azure Function, Logic App, ITSM connector, Automation Runbook, Arm Role." },
          { bold: "Alert Processing Rules", text: "Suppress alerts during maintenance windows. Apply action group to multiple alerts. Filter alerts before they reach action group." }
        ]
      },
      {
        heading: "Azure Backup",
        items: [
          { bold: "Recovery Services Vault", text: "Container for backup and ASR data. Set redundancy at creation (LRS, ZRS, GRS — cannot change after protected items added). Soft delete enabled by default (14 days)." },
          { bold: "Backup Policy", text: "Schedule (frequency, time) + Retention (daily, weekly, monthly, yearly points). Default policy: daily backup, 30-day retention. Custom policies allow more granular control." },
          { bold: "Supported Workloads", text: "Azure VMs, Azure Files, SQL Server in Azure VM, SAP HANA in Azure VM, Azure Disk (via Backup vault), Azure Database for PostgreSQL/MySQL/MariaDB." },
          { bold: "Restore Options", text: "VM: Create new VM, Replace existing disk, Restore disks (for custom config). File recovery: mount recovery point to Windows/Linux. Cross-region restore: restore to paired region (requires GRS vault)." }
        ]
      },
      {
        heading: "Azure Site Recovery (ASR)",
        items: [
          { bold: "Purpose", text: "Disaster recovery solution: replicate workloads to secondary location and failover when primary region fails. Supports Azure-to-Azure, on-premises-to-Azure, on-premises-to-on-premises." },
          { bold: "RPO & RTO", text: "Azure-to-Azure: RPO as low as 15 minutes for app-consistent snapshots. RTO: depends on VM size and dependencies, typically minutes to hours." },
          { bold: "Recovery Plans", text: "Group VMs for coordinated failover. Add manual steps, scripts, Azure Automation runbooks. Test failover uses isolated network — does not impact production." },
          { bold: "Failover vs Failback", text: "Failover: switch from primary to secondary. Failback: return from secondary to primary after primary is restored. Reprotect needed before failback." }
        ]
      },
      {
        heading: "Cost Management",
        items: [
          { bold: "Cost Analysis", text: "Break down costs by service, resource group, tag, location, subscription. View daily/monthly trends. Filter and group to identify waste." },
          { bold: "Budgets", text: "Set monthly/quarterly/annual spend limits. Alert at % of budget (e.g., 80%, 100%, forecast 100%). Send to email or trigger Action Group (e.g., auto-stop VMs)." },
          { bold: "Reservations", text: "1 or 3 year commitment for VMs, SQL, Cosmos DB, Storage, etc. Up to 72% savings. Scope: shared (all subs in billing account) or single subscription. Exchange or refund with limits." },
          { bold: "Azure Hybrid Benefit", text: "Use on-premises Windows Server and SQL Server licenses in Azure. Combine with Reserved Instances for maximum savings. Apply to VMs, SQL MI, SQL Database, AKS." }
        ]
      }
    ]
  }
};
