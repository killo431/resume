// AZ-104 Study App — Task 2: 14-Day Study Schedule
// Auto-generated structured data. Variable: dailySchedules
const dailySchedules = {
  "day1": {
    "domainId": 1,
    "title": "Day 1: Domain 1 – Identity & Governance (Part 1 of 2)",
    "sessions": [
      {
        "name": "Morning Session: Identity & Governance – Entra ID users and groups",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Entra ID users and groups",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=0m00s",
            "stopBadge": "Watch 00:00 – 20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Dynamic membership rules",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=10m00s",
            "stopBadge": "Watch 10:00 – 30:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Administrative units",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=20m00s",
            "stopBadge": "Watch 20:00 – 40:00"
          }
        ]
      },
      {
        "name": "Afternoon Session: Identity & Governance – Dynamic membership rules",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Role-based access control (RBAC)",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=30m00s",
            "stopBadge": "Watch 30:00 – 50:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Custom RBAC role definitions",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=40m00s",
            "stopBadge": "Watch 40:00 – 60:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Conditional Access policies",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=50m00s",
            "stopBadge": "Watch 50:00 – 70:00"
          }
        ]
      },
      {
        "name": "Evening Session: Identity & Governance – Administrative units",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Multi-factor authentication (MFA)",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=60m00s",
            "stopBadge": "Watch 60:00 – 80:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Self-service password reset (SSPR)",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=70m00s",
            "stopBadge": "Watch 70:00 – 90:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Privileged Identity Management (PIM)",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=80m00s",
            "stopBadge": "Watch 80:00 – 100:00"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 01",
      "title": "Manage Entra ID Identities",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_01-Manage_Entra_ID_Identities.md",
      "cliCommands": [
        "az ad user create --display-name \"Aria Admin\" --password \"P@ssw0rd!\" --user-principal-name aria@contoso.onmicrosoft.com",
        "az ad group create --display-name \"IT-Admins\" --mail-nickname it-admins",
        "az ad group member add --group \"IT-Admins\" --member-id <objectId>",
        "az role assignment create --assignee aria@contoso.onmicrosoft.com --role Reader --scope /subscriptions/<subId>"
      ]
    }
  },
  "day2": {
    "domainId": 1,
    "title": "Day 2: Domain 1 – Identity & Governance (Part 2 of 2)",
    "sessions": [
      {
        "name": "Morning Session: Identity & Governance – Azure Policy definitions and initiatives",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Azure Policy definitions and initiatives",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=90m00s",
            "stopBadge": "Watch 90:00 – 110:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Management groups hierarchy",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=100m00s",
            "stopBadge": "Watch 100:00 – 120:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Resource locks",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=110m00s",
            "stopBadge": "Watch 110:00 – 130:00"
          }
        ]
      },
      {
        "name": "Afternoon Session: Identity & Governance – Management groups hierarchy",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Cost Management, budgets and alerts",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=120m00s",
            "stopBadge": "Watch 120:00 – 140:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Subscriptions and tags",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=130m00s",
            "stopBadge": "Watch 130:00 – 150:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: B2B external collaboration",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=140m00s",
            "stopBadge": "Watch 140:00 – 160:00"
          }
        ]
      },
      {
        "name": "Evening Session: Identity & Governance – Resource locks",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Access reviews and entitlement",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=150m00s",
            "stopBadge": "Watch 150:00 – 170:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Licensing and group-based licensing",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=160m00s",
            "stopBadge": "Watch 160:00 – 180:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Identity & Governance: Enterprise applications and SSO",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=170m00s",
            "stopBadge": "Watch 170:00 – 190:00"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 02a",
      "title": "Manage Subscriptions and RBAC",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_02a-Manage_Subscriptions_and_RBAC.md",
      "cliCommands": [
        "az role assignment create --assignee <user> --role \"Contributor\" --resource-group RG1",
        "az role definition create --role-definition custom-role.json",
        "az policy assignment create --name \"require-tag\" --policy <policyId> --scope /subscriptions/<subId>",
        "az lock create --name lock-rg --lock-type CanNotDelete --resource-group RG1"
      ]
    }
  },
  "day3": {
    "domainId": 2,
    "title": "Day 3: Domain 2 – Storage (Part 1 of 2)",
    "sessions": [
      {
        "name": "Morning Session: Storage – Storage account types and performance tiers",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Storage account types and performance tiers",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=0m00s",
            "stopBadge": "Watch 00:00 – 20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Blob access tiers: Hot, Cool, Cold, Archive",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=5m00s",
            "stopBadge": "Watch 05:00 – 25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Shared Access Signatures (SAS)",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=10m00s",
            "stopBadge": "Watch 10:00 – 30:00"
          }
        ]
      },
      {
        "name": "Afternoon Session: Storage – Blob access tiers: Hot, Cool, Cold, Archive",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Stored access policies",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=15m00s",
            "stopBadge": "Watch 15:00 – 35:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Managed identity for storage",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=20m00s",
            "stopBadge": "Watch 20:00 – 40:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Azure Files and SMB shares",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=25m00s",
            "stopBadge": "Watch 25:00 – 45:00"
          }
        ]
      },
      {
        "name": "Evening Session: Storage – Shared Access Signatures (SAS)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Azure File Sync",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=30m00s",
            "stopBadge": "Watch 30:00 – 50:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Blob lifecycle management policies",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=35m00s",
            "stopBadge": "Watch 35:00 – 55:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Redundancy: LRS, ZRS, GRS, GZRS",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=40m00s",
            "stopBadge": "Watch 40:00 – 60:00"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 07",
      "title": "Manage Azure Storage",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_07-Manage_Azure_Storage.md",
      "cliCommands": [
        "az storage account create --name contosostor01 --resource-group RG1 --sku Standard_LRS --kind StorageV2",
        "az storage container create --name data --account-name contosostor01 --auth-mode login",
        "az storage blob upload --account-name contosostor01 --container-name data --name file.txt --file ./file.txt",
        "az storage share create --name projShare --account-name contosostor01"
      ]
    }
  },
  "day4": {
    "domainId": 2,
    "title": "Day 4: Domain 2 – Storage (Part 2 of 2)",
    "sessions": [
      {
        "name": "Morning Session: Storage – Encryption and customer-managed keys",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Encryption and customer-managed keys",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=45m00s",
            "stopBadge": "Watch 45:00 – 65:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Static website hosting",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=50m00s",
            "stopBadge": "Watch 50:00 – 70:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Azure Data Lake Storage Gen2",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=55m00s",
            "stopBadge": "Watch 55:00 – 75:00"
          }
        ]
      },
      {
        "name": "Afternoon Session: Storage – Static website hosting",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Storage firewalls and private endpoints",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=60m00s",
            "stopBadge": "Watch 60:00 – 80:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: AzCopy and Storage Explorer",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=65m00s",
            "stopBadge": "Watch 65:00 – 85:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Object replication and versioning",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=70m00s",
            "stopBadge": "Watch 70:00 – 90:00"
          }
        ]
      },
      {
        "name": "Evening Session: Storage – Azure Data Lake Storage Gen2",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Soft delete and blob snapshots",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=75m00s",
            "stopBadge": "Watch 75:00 – 95:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Import/Export and Data Box",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=80m00s",
            "stopBadge": "Watch 80:00 – 100:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage: Access keys rotation",
            "video": "https://www.youtube.com/watch?v=x7YLcQOHQAQ&t=85m00s",
            "stopBadge": "Watch 85:00 – 105:00"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 10",
      "title": "Implement Data Protection",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_10-Implement_Data_Protection.md",
      "cliCommands": [
        "az backup vault create --name rsv-contoso --resource-group RG1 --location eastus",
        "az backup protection enable-for-vm --vault-name rsv-contoso --resource-group RG1 --vm vm1 --policy-name DefaultPolicy",
        "az storage account blob-service-properties update --enable-delete-retention true --delete-retention-days 7 --account-name contosostor01"
      ]
    }
  },
  "day5": {
    "domainId": 3,
    "title": "Day 5: Domain 3 – Compute (Part 1 of 3)",
    "sessions": [
      {
        "name": "Morning Session: Compute – VM sizes and families",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: VM sizes and families",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=0m00s",
            "stopBadge": "Watch 00:00 – 20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Availability zones and availability sets",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=5m33s",
            "stopBadge": "Watch 05:33 – 25:33"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Virtual Machine Scale Sets (VMSS)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=11m06s",
            "stopBadge": "Watch 11:06 – 31:06"
          }
        ]
      },
      {
        "name": "Afternoon Session: Compute – Availability zones and availability sets",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: ARM templates",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=16m39s",
            "stopBadge": "Watch 16:39 – 36:39"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Bicep authoring",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=22m12s",
            "stopBadge": "Watch 22:12 – 42:12"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: App Service plans and tiers",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=27m45s",
            "stopBadge": "Watch 27:45 – 47:45"
          }
        ]
      },
      {
        "name": "Evening Session: Compute – Virtual Machine Scale Sets (VMSS)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Deployment slots and swap",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=33m18s",
            "stopBadge": "Watch 33:18 – 53:18"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Azure Kubernetes Service (AKS)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=38m51s",
            "stopBadge": "Watch 38:51 – 58:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Azure Container Instances (ACI)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=44m24s",
            "stopBadge": "Watch 44:24 – 64:24"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 08",
      "title": "Manage Virtual Machines",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_08-Manage_Virtual_Machines.md",
      "cliCommands": [
        "az vm create --resource-group RG1 --name vm1 --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys",
        "az vm availability-set create --resource-group RG1 --name avset1 --platform-fault-domain-count 2",
        "az vmss create --resource-group RG1 --name vmss1 --image Ubuntu2204 --instance-count 2",
        "az vm extension set --resource-group RG1 --vm-name vm1 --name customScript --publisher Microsoft.Azure.Extensions"
      ]
    }
  },
  "day6": {
    "domainId": 3,
    "title": "Day 6: Domain 3 – Compute (Part 2 of 3)",
    "sessions": [
      {
        "name": "Morning Session: Compute – Azure Container Apps",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Azure Container Apps",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=50m00s",
            "stopBadge": "Watch 50:00 – 70:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: VM extensions and custom script",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=55m33s",
            "stopBadge": "Watch 55:33 – 75:33"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Azure Bastion",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=61m06s",
            "stopBadge": "Watch 61:06 – 81:06"
          }
        ]
      },
      {
        "name": "Afternoon Session: Compute – VM extensions and custom script",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Managed disks and disk types",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=66m39s",
            "stopBadge": "Watch 66:39 – 86:39"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: VM images and generalization",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=72m12s",
            "stopBadge": "Watch 72:12 – 92:12"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Autoscale rules",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=77m45s",
            "stopBadge": "Watch 77:45 – 97:45"
          }
        ]
      },
      {
        "name": "Evening Session: Compute – Azure Bastion",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Spot VMs and reservations",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=83m18s",
            "stopBadge": "Watch 83:18 – 103:18"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: App Service scaling and networking",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=88m51s",
            "stopBadge": "Watch 88:51 – 108:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Container registries (ACR)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=94m24s",
            "stopBadge": "Watch 94:24 – 114:24"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 09a",
      "title": "Implement Web Apps",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_09a-Implement_Web_Apps.md",
      "cliCommands": [
        "az appservice plan create --name plan1 --resource-group RG1 --sku S1",
        "az webapp create --name contoso-web01 --plan plan1 --resource-group RG1 --runtime \"DOTNET:8\"",
        "az webapp deployment slot create --name contoso-web01 --resource-group RG1 --slot staging",
        "az webapp deployment slot swap --name contoso-web01 --resource-group RG1 --slot staging --target-slot production"
      ]
    }
  },
  "day7": {
    "domainId": 3,
    "title": "Day 7: Domain 3 – Compute (Part 3 of 3)",
    "sessions": [
      {
        "name": "Morning Session: Compute – VM sizes and families",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: VM sizes and families",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=100m00s",
            "stopBadge": "Watch 100:00 – 120:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Availability zones and availability sets",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=105m33s",
            "stopBadge": "Watch 105:33 – 125:33"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Virtual Machine Scale Sets (VMSS)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=111m06s",
            "stopBadge": "Watch 111:06 – 131:06"
          }
        ]
      },
      {
        "name": "Afternoon Session: Compute – Availability zones and availability sets",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: ARM templates",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=116m39s",
            "stopBadge": "Watch 116:39 – 136:39"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Bicep authoring",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=122m12s",
            "stopBadge": "Watch 122:12 – 142:12"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: App Service plans and tiers",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=127m45s",
            "stopBadge": "Watch 127:45 – 147:45"
          }
        ]
      },
      {
        "name": "Evening Session: Compute – Virtual Machine Scale Sets (VMSS)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Deployment slots and swap",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=133m18s",
            "stopBadge": "Watch 133:18 – 153:18"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Azure Kubernetes Service (AKS)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=138m51s",
            "stopBadge": "Watch 138:51 – 158:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Compute: Azure Container Instances (ACI)",
            "video": "https://www.youtube.com/watch?v=0GCR6MqYvOs&t=144m24s",
            "stopBadge": "Watch 144:24 – 164:24"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 09c",
      "title": "Implement Azure Kubernetes Service",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_09c-Implement_Azure_Kubernetes_Service.md",
      "cliCommands": [
        "az aks create --resource-group RG1 --name aks1 --node-count 2 --generate-ssh-keys",
        "az aks get-credentials --resource-group RG1 --name aks1",
        "az container create --resource-group RG1 --name aci1 --image mcr.microsoft.com/azuredocs/aci-helloworld --ports 80"
      ]
    }
  },
  "day8": {
    "domainId": 4,
    "title": "Day 8: Domain 4 – Networking (Part 1 of 3)",
    "sessions": [
      {
        "name": "Morning Session: Networking – Virtual networks and subnets",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Virtual networks and subnets",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=0m00s",
            "stopBadge": "Watch 00:00 – 20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: VNet peering",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=6m40s",
            "stopBadge": "Watch 06:40 – 26:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Network Security Groups (NSG)",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=13m20s",
            "stopBadge": "Watch 13:20 – 33:20"
          }
        ]
      },
      {
        "name": "Afternoon Session: Networking – VNet peering",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Application Security Groups (ASG)",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=20m00s",
            "stopBadge": "Watch 20:00 – 40:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Azure DNS zones",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=26m40s",
            "stopBadge": "Watch 26:40 – 46:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Private Endpoints",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=33m20s",
            "stopBadge": "Watch 33:20 – 53:20"
          }
        ]
      },
      {
        "name": "Evening Session: Networking – Network Security Groups (NSG)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Service Endpoints",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=40m00s",
            "stopBadge": "Watch 40:00 – 60:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: VPN Gateway (S2S / P2S)",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=46m40s",
            "stopBadge": "Watch 46:40 – 66:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: ExpressRoute",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=53m20s",
            "stopBadge": "Watch 53:20 – 73:20"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 04",
      "title": "Implement Virtual Networking",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_04-Implement_Virtual_Networking.md",
      "cliCommands": [
        "az network vnet create --resource-group RG1 --name vnet1 --address-prefix 10.0.0.0/16 --subnet-name sub1 --subnet-prefix 10.0.0.0/24",
        "az network nsg create --resource-group RG1 --name nsg1",
        "az network nsg rule create --resource-group RG1 --nsg-name nsg1 --name allow-https --priority 100 --destination-port-ranges 443 --access Allow --protocol Tcp"
      ]
    }
  },
  "day9": {
    "domainId": 4,
    "title": "Day 9: Domain 4 – Networking (Part 2 of 3)",
    "sessions": [
      {
        "name": "Morning Session: Networking – Azure Load Balancer",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Azure Load Balancer",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=60m00s",
            "stopBadge": "Watch 60:00 – 80:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Application Gateway and WAF",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=66m40s",
            "stopBadge": "Watch 66:40 – 86:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Azure Bastion",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=73m20s",
            "stopBadge": "Watch 73:20 – 93:20"
          }
        ]
      },
      {
        "name": "Afternoon Session: Networking – Application Gateway and WAF",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Network Watcher",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=80m00s",
            "stopBadge": "Watch 80:00 – 100:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Traffic Manager",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=86m40s",
            "stopBadge": "Watch 86:40 – 106:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Virtual WAN",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=93m20s",
            "stopBadge": "Watch 93:20 – 113:20"
          }
        ]
      },
      {
        "name": "Evening Session: Networking – Azure Bastion",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Route tables and UDR",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=100m00s",
            "stopBadge": "Watch 100:00 – 120:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Azure Firewall",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=106m40s",
            "stopBadge": "Watch 106:40 – 126:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: NAT Gateway",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=113m20s",
            "stopBadge": "Watch 113:20 – 133:20"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 05",
      "title": "Implement Intersite Connectivity",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_05-Implement_Intersite_Connectivity.md",
      "cliCommands": [
        "az network vnet peering create --resource-group RG1 --name peer1to2 --vnet-name vnet1 --remote-vnet vnet2 --allow-vnet-access",
        "az network vpn-gateway create --resource-group RG1 --name vpngw1 --vnet vnet1",
        "az network vnet-gateway create --resource-group RG1 --name vgw1 --vnet vnet1 --gateway-type Vpn --sku VpnGw1"
      ]
    }
  },
  "day10": {
    "domainId": 4,
    "title": "Day 10: Domain 4 – Networking (Part 3 of 3)",
    "sessions": [
      {
        "name": "Morning Session: Networking – Virtual networks and subnets",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Virtual networks and subnets",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=120m00s",
            "stopBadge": "Watch 120:00 – 140:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: VNet peering",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=126m40s",
            "stopBadge": "Watch 126:40 – 146:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Network Security Groups (NSG)",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=133m20s",
            "stopBadge": "Watch 133:20 – 153:20"
          }
        ]
      },
      {
        "name": "Afternoon Session: Networking – VNet peering",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Application Security Groups (ASG)",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=140m00s",
            "stopBadge": "Watch 140:00 – 160:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Azure DNS zones",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=146m40s",
            "stopBadge": "Watch 146:40 – 166:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Private Endpoints",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=153m20s",
            "stopBadge": "Watch 153:20 – 173:20"
          }
        ]
      },
      {
        "name": "Evening Session: Networking – Network Security Groups (NSG)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: Service Endpoints",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=160m00s",
            "stopBadge": "Watch 160:00 – 180:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: VPN Gateway (S2S / P2S)",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=166m40s",
            "stopBadge": "Watch 166:40 – 186:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking: ExpressRoute",
            "video": "https://www.youtube.com/watch?v=uQB2WYuJXBc&t=173m20s",
            "stopBadge": "Watch 173:20 – 193:20"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 06",
      "title": "Implement Network Traffic Management",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_06-Implement_Network_Traffic_Management.md",
      "cliCommands": [
        "az network lb create --resource-group RG1 --name lb1 --sku Standard --public-ip-address pip1",
        "az network application-gateway create --resource-group RG1 --name agw1 --sku Standard_v2 --public-ip-address pip2 --vnet-name vnet1 --subnet sub1",
        "az network traffic-manager profile create --name tm1 --resource-group RG1 --routing-method Performance --unique-dns-name contoso-tm"
      ]
    }
  },
  "day11": {
    "domainId": 5,
    "title": "Day 11: Domain 5 – Monitoring (Part 1 of 2)",
    "sessions": [
      {
        "name": "Morning Session: Monitoring – Azure Monitor overview",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Azure Monitor overview",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=0m00s",
            "stopBadge": "Watch 00:00 – 20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Log Analytics workspaces",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=5m00s",
            "stopBadge": "Watch 05:00 – 25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Kusto Query Language (KQL)",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=10m00s",
            "stopBadge": "Watch 10:00 – 30:00"
          }
        ]
      },
      {
        "name": "Afternoon Session: Monitoring – Log Analytics workspaces",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Application Insights",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=15m00s",
            "stopBadge": "Watch 15:00 – 35:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Metrics and metric alerts",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=20m00s",
            "stopBadge": "Watch 20:00 – 40:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Log alerts and action groups",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=25m00s",
            "stopBadge": "Watch 25:00 – 45:00"
          }
        ]
      },
      {
        "name": "Evening Session: Monitoring – Kusto Query Language (KQL)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Diagnostic settings",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=30m00s",
            "stopBadge": "Watch 30:00 – 50:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Azure Backup",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=35m00s",
            "stopBadge": "Watch 35:00 – 55:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Recovery Services vault",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=40m00s",
            "stopBadge": "Watch 40:00 – 60:00"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 11",
      "title": "Implement Monitoring",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_11-Implement_Monitoring.md",
      "cliCommands": [
        "az monitor log-analytics workspace create --resource-group RG1 --workspace-name law1",
        "az monitor action-group create --resource-group RG1 --name ag1 --short-name ag1 --action email admin admin@contoso.com",
        "az monitor metrics alert create --name cpu-alert --resource-group RG1 --scopes <vmId> --condition \"avg Percentage CPU > 80\"",
        "az backup vault create --name rsv1 --resource-group RG1 --location eastus"
      ]
    }
  },
  "day12": {
    "domainId": 5,
    "title": "Day 12: Domain 5 – Monitoring (Part 2 of 2)",
    "sessions": [
      {
        "name": "Morning Session: Monitoring – Backup policies",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Backup policies",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=45m00s",
            "stopBadge": "Watch 45:00 – 65:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Azure Site Recovery (ASR)",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=50m00s",
            "stopBadge": "Watch 50:00 – 70:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Failover and failback",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=55m00s",
            "stopBadge": "Watch 55:00 – 75:00"
          }
        ]
      },
      {
        "name": "Afternoon Session: Monitoring – Azure Site Recovery (ASR)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Workbooks and dashboards",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=60m00s",
            "stopBadge": "Watch 60:00 – 80:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Activity log and alerts",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=65m00s",
            "stopBadge": "Watch 65:00 – 85:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Autoscale monitoring",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=70m00s",
            "stopBadge": "Watch 70:00 – 90:00"
          }
        ]
      },
      {
        "name": "Evening Session: Monitoring – Failover and failback",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: VM insights and Change Analysis",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=75m00s",
            "stopBadge": "Watch 75:00 – 95:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Network Watcher diagnostics",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=80m00s",
            "stopBadge": "Watch 80:00 – 100:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Monitoring: Cost and capacity monitoring",
            "video": "https://www.youtube.com/watch?v=BNkMt4QfuEY&t=85m00s",
            "stopBadge": "Watch 85:00 – 105:00"
          }
        ]
      }
    ],
    "lab": {
      "number": "Lab 10",
      "title": "Implement Data Protection",
      "repoLink": "https://github.com/MicrosoftLearning/AZ-104-MicrosoftAzureAdministrator/tree/master/Instructions/Labs/LAB_10-Implement_Data_Protection.md",
      "cliCommands": [
        "az backup vault create --name rsv-contoso --resource-group RG1 --location eastus",
        "az backup protection enable-for-vm --vault-name rsv-contoso --resource-group RG1 --vm vm1 --policy-name DefaultPolicy",
        "az storage account blob-service-properties update --enable-delete-retention true --delete-retention-days 7 --account-name contosostor01"
      ]
    }
  },
  "day13": {
    "domainId": 0,
    "title": "Day 13: Mock Exam & Final Review (Part 1)",
    "sessions": [
      {
        "name": "Morning Session: Mock Review – Full Mock Exam 1 (125 Qs)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Full Mock Exam 1 (125 Qs)",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=0m00s",
            "stopBadge": "Watch 00:00 – 20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Review Weak Areas",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=6m40s",
            "stopBadge": "Watch 06:40 – 26:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Identity & Governance rapid review",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=13m20s",
            "stopBadge": "Watch 13:20 – 33:20"
          }
        ]
      },
      {
        "name": "Afternoon Session: Mock Review – Review Weak Areas",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Storage rapid review",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=20m00s",
            "stopBadge": "Watch 20:00 – 40:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Compute rapid review",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=26m40s",
            "stopBadge": "Watch 26:40 – 46:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Networking rapid review",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=33m20s",
            "stopBadge": "Watch 33:20 – 53:20"
          }
        ]
      },
      {
        "name": "Evening Session: Mock Review – Identity & Governance rapid review",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Monitoring rapid review",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=40m00s",
            "stopBadge": "Watch 40:00 – 60:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Exam objective walkthrough",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=46m40s",
            "stopBadge": "Watch 46:40 – 66:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Case-study question strategy",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=53m20s",
            "stopBadge": "Watch 53:20 – 73:20"
          }
        ]
      }
    ],
    "lab": null
  },
  "day14": {
    "domainId": 0,
    "title": "Day 14: Mock Exam & Final Review (Part 2)",
    "sessions": [
      {
        "name": "Morning Session: Mock Review – Full Mock Exam 2 (125 Qs)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Full Mock Exam 2 (125 Qs)",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=60m00s",
            "stopBadge": "Watch 60:00 – 80:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Final Cram Session",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=66m40s",
            "stopBadge": "Watch 66:40 – 86:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Command-line (az CLI) cheat sheet",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=73m20s",
            "stopBadge": "Watch 73:20 – 93:20"
          }
        ]
      },
      {
        "name": "Afternoon Session: Mock Review – Final Cram Session",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: PowerShell Az module review",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=80m00s",
            "stopBadge": "Watch 80:00 – 100:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Common pitfalls and gotchas",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=86m40s",
            "stopBadge": "Watch 86:40 – 106:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Time-management drills",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=93m20s",
            "stopBadge": "Watch 93:20 – 113:20"
          }
        ]
      },
      {
        "name": "Evening Session: Mock Review – Command-line (az CLI) cheat sheet",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Flashcard blitz",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=100m00s",
            "stopBadge": "Watch 100:00 – 120:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Whiteboard architecture drills",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=106m40s",
            "stopBadge": "Watch 106:40 – 126:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Mock Review: Final confidence check",
            "video": "https://www.youtube.com/watch?v=vWUBspbL6C0&t=113m20s",
            "stopBadge": "Watch 113:20 – 133:20"
          }
        ]
      }
    ],
    "lab": null
  }
};

if (typeof module !== 'undefined' && module.exports) { module.exports = dailySchedules; }
