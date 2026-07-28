// AZ-104 Microsoft Azure Administrator - Study Topics and Domain Data
const AZ104_STUDY_DATA = {
  examTitle: "AZ-104: Microsoft Azure Administrator",
  totalQuestions: 40,
  passingScore: 700,
  maxScore: 1000,
  timeLimit: 130,
  domains: [
    {
      id: "identity",
      name: "Manage Azure Identities and Governance",
      weight: "15-20%",
      color: "#4f86f7",
      topics: [
        {
          name: "Manage Azure Active Directory (Azure AD) objects",
          subtopics: [
            "Create users and groups",
            "Manage user and group properties",
            "Manage licenses in Azure AD",
            "Manage external identities",
            "Configure self-service password reset (SSPR)"
          ]
        },
        {
          name: "Manage role-based access control (RBAC)",
          subtopics: [
            "Create and assign custom RBAC roles",
            "Interpret access assignments",
            "Assign built-in Azure roles"
          ]
        },
        {
          name: "Manage Azure subscriptions and governance",
          subtopics: [
            "Configure Azure policies",
            "Configure resource locks",
            "Apply and manage tags on resources",
            "Manage resource groups",
            "Manage subscriptions",
            "Manage costs by using alerts, budgets, and Azure Advisor recommendations",
            "Configure management groups"
          ]
        }
      ]
    },
    {
      id: "storage",
      name: "Implement and Manage Storage",
      weight: "15-20%",
      color: "#22c55e",
      topics: [
        {
          name: "Configure access to storage",
          subtopics: [
            "Configure Azure Storage firewalls and virtual networks",
            "Create and use SAS tokens",
            "Configure stored access policies",
            "Manage access keys",
            "Configure Azure AD authentication for a storage account",
            "Configure storage encryption"
          ]
        },
        {
          name: "Configure and manage Azure Blob Storage",
          subtopics: [
            "Create and configure a storage account",
            "Configure containers",
            "Configure storage tiers",
            "Configure blob lifecycle management",
            "Configure data protection for blobs"
          ]
        },
        {
          name: "Configure Azure Files and Azure Blob Storage",
          subtopics: [
            "Create Azure file shares",
            "Create and configure Azure File Sync",
            "Configure Azure Blob Storage",
            "Configure storage tiers for Azure Blob Storage"
          ]
        }
      ]
    },
    {
      id: "compute",
      name: "Deploy and Manage Azure Compute Resources",
      weight: "20-25%",
      color: "#f59e0b",
      topics: [
        {
          name: "Automate deployment of resources",
          subtopics: [
            "Interpret and modify Azure Resource Manager (ARM) templates",
            "Deploy resources using ARM templates",
            "Export and configure deployment templates",
            "Deploy Bicep templates"
          ]
        },
        {
          name: "Create and configure virtual machines",
          subtopics: [
            "Create a VM",
            "Manage VM sizes",
            "Manage VM disks",
            "Deploy VMs to availability zones and availability sets",
            "Deploy and configure Azure Virtual Machine Scale Sets",
            "Configure VM network settings",
            "Configure VM extensions"
          ]
        },
        {
          name: "Create and configure containers",
          subtopics: [
            "Configure sizing and scaling for Azure Container Instances",
            "Configure container groups for Azure Container Instances",
            "Create and configure Azure Container Apps",
            "Configure storage for Azure Kubernetes Service (AKS)",
            "Configure scaling for AKS",
            "Configure network connections for AKS",
            "Upgrade an AKS cluster"
          ]
        },
        {
          name: "Create and configure Azure App Service",
          subtopics: [
            "Create an App Service plan",
            "Configure scaling settings in an App Service plan",
            "Create an App Service",
            "Configure certificates and TLS for an App Service",
            "Map an existing custom DNS name to an App Service",
            "Configure backup for an App Service",
            "Configure networking settings for an App Service",
            "Configure deployment slots for an App Service"
          ]
        }
      ]
    },
    {
      id: "networking",
      name: "Configure and Manage Virtual Networking",
      weight: "25-30%",
      color: "#8b5cf6",
      topics: [
        {
          name: "Configure virtual networks",
          subtopics: [
            "Create and configure virtual networks and subnets",
            "Create and configure virtual network peering",
            "Configure private and public IP addresses",
            "Configure user-defined network routes",
            "Configure Azure DNS"
          ]
        },
        {
          name: "Configure secure access to virtual networks",
          subtopics: [
            "Create and configure network security groups (NSGs) and application security groups (ASGs)",
            "Evaluate effective security rules in NSGs",
            "Implement Azure Bastion",
            "Configure service endpoints for Azure platform as a service (PaaS)",
            "Configure Private Endpoints"
          ]
        },
        {
          name: "Configure load balancing",
          subtopics: [
            "Configure Azure Application Gateway",
            "Configure an internal or public load balancer",
            "Troubleshoot load balancing"
          ]
        },
        {
          name: "Monitor and troubleshoot virtual networking",
          subtopics: [
            "Monitor on-premises connectivity",
            "Configure and use Azure Monitor for Networks",
            "Use Azure Network Watcher",
            "Troubleshoot external networking",
            "Troubleshoot virtual network connectivity"
          ]
        },
        {
          name: "Integrate an on-premises network with an Azure virtual network",
          subtopics: [
            "Create and configure Azure VPN Gateway",
            "Create and configure Azure ExpressRoute",
            "Configure Azure Virtual WAN"
          ]
        }
      ]
    },
    {
      id: "monitoring",
      name: "Monitor and Maintain Azure Resources",
      weight: "10-15%",
      color: "#ef4444",
      topics: [
        {
          name: "Monitor resources by using Azure Monitor",
          subtopics: [
            "Configure and interpret metrics",
            "Configure Azure Monitor Logs",
            "Query and analyze logs",
            "Set up alerts and actions",
            "Configure monitoring of VMs, storage accounts, and networks using Azure Monitor Insights",
            "Use Azure Monitor action groups and alert processing rules"
          ]
        },
        {
          name: "Implement backup and recovery",
          subtopics: [
            "Create a Recovery Services vault",
            "Create an Azure Backup vault",
            "Create and configure a backup policy",
            "Perform backup and restore operations",
            "Configure Azure Site Recovery for Azure resources",
            "Perform a failover to a secondary region",
            "Configure and review backup reports"
          ]
        }
      ]
    }
  ],

  studyTips: [
    "Focus heavily on networking (25-30%) as it has the highest weight",
    "Understand RBAC, policies, and resource governance thoroughly",
    "Practice with Azure CLI and PowerShell commands",
    "Learn ARM template structure and Bicep syntax",
    "Know the difference between public/private endpoints, service endpoints",
    "Understand NSG rule priorities and effective security rules",
    "Know when to use Azure Backup vs Azure Site Recovery",
    "Memorize key SLA values for common Azure services",
    "Practice creating and configuring VPN Gateway and ExpressRoute",
    "Understand storage tier trade-offs (Hot, Cool, Cold, Archive)"
  ],

  keyServices: {
    compute: ["Virtual Machines", "VM Scale Sets", "Azure Kubernetes Service", "Container Instances", "App Service", "Functions"],
    storage: ["Blob Storage", "Azure Files", "Table Storage", "Queue Storage", "Managed Disks"],
    networking: ["Virtual Network", "VPN Gateway", "ExpressRoute", "Load Balancer", "Application Gateway", "Azure DNS", "NSG", "Azure Bastion", "Private Link"],
    identity: ["Azure Active Directory", "RBAC", "Azure Policy", "Management Groups", "Subscriptions"],
    monitoring: ["Azure Monitor", "Log Analytics", "Application Insights", "Azure Backup", "Site Recovery"]
  }
};
