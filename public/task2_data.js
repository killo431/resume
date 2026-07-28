// AZ-104 Study Data - Task 2: Domain Reference Data
// This file contains domain and service reference data for AZ-104 exam preparation.

var az104Domains = [
  {
    id: "domain1",
    name: "Manage Azure identities and governance",
    weight: "20-25%",
    topics: [
      "Manage Azure Active Directory (Azure AD) objects",
      "Manage role-based access control (RBAC)",
      "Manage subscriptions and governance"
    ]
  },
  {
    id: "domain2",
    name: "Implement and manage storage",
    weight: "15-20%",
    topics: [
      "Configure access to storage",
      "Configure and manage storage accounts",
      "Configure Azure Files and Azure Blob Storage"
    ]
  },
  {
    id: "domain3",
    name: "Deploy and manage Azure compute resources",
    weight: "20-25%",
    topics: [
      "Automate deployment of resources",
      "Create and configure VMs",
      "Create and configure containers",
      "Create and configure Azure App Service"
    ]
  },
  {
    id: "domain4",
    name: "Configure and manage virtual networking",
    weight: "25-30%",
    topics: [
      "Configure virtual networks",
      "Configure secure access to virtual networks",
      "Configure load balancing",
      "Monitor and troubleshoot virtual networking",
      "Integrate an on-premises network with an Azure virtual network"
    ]
  },
  {
    id: "domain5",
    name: "Monitor and maintain Azure resources",
    weight: "10-15%",
    topics: [
      "Monitor resources using Azure Monitor",
      "Implement backup and recovery"
    ]
  }
];

var az104Services = {
  identity: ["Azure AD", "Azure AD B2C", "Azure AD DS", "Managed Identities", "Service Principals"],
  storage: ["Blob Storage", "Azure Files", "Queue Storage", "Table Storage", "Disk Storage"],
  compute: ["Virtual Machines", "VM Scale Sets", "Azure Kubernetes Service", "App Service", "Azure Functions", "Container Instances"],
  networking: ["Virtual Networks", "VPN Gateway", "ExpressRoute", "Load Balancer", "Application Gateway", "Azure Firewall", "NSG", "Private Endpoint"],
  monitoring: ["Azure Monitor", "Log Analytics", "Application Insights", "Azure Alerts", "Azure Backup", "Azure Site Recovery"]
};
