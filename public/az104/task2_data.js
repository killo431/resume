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
            "topic": "Enter Entra ID",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=18m52s",
            "stopBadge": "Watch 18:52 – 38:01"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Entra ID Objects",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=38m01s",
            "stopBadge": "Watch 38:01 – 57:46"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "AD to Entra ID Sync & Authentication",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=57m46s",
            "stopBadge": "Watch 57:46 – 1:13:41"
          }
        ]
      },
      {
        "name": "Afternoon Session: Identity & Governance – Dynamic membership rules",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Roles and Administrative Units",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=1h13m41s",
            "stopBadge": "Watch 1:13:41 – 1:27:31"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Privileged Identity Management",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=1h27m31s",
            "stopBadge": "Watch 1:27:31 – 1:39:13"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "MFA and Strong Authentication",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=1h39m13s",
            "stopBadge": "Watch 1:39:13 – 1:58:09"
          }
        ]
      },
      {
        "name": "Evening Session: Identity & Governance – Administrative units",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Conditional Access Policies",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=1h58m09s",
            "stopBadge": "Watch 1:58:09 – 2:05:53"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "B2B and External Identities",
            "video": "https://www.youtube.com/watch?v=megA6BPpYqo&t=2h05m53s",
            "stopBadge": "Watch 2:05:53 – 2:17:52"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Microsoft Entra ID Overview",
            "video": "https://www.youtube.com/watch?v=sVq7qjU9LNE",
            "stopBadge": "Watch Full video (4 min)"
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
            "topic": "Management Groups & Scope",
            "video": "https://www.youtube.com/watch?v=t-i4XrygWCc&t=12m41s",
            "stopBadge": "Watch 12:41 – 20:12"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Subscriptions & Organizing",
            "video": "https://www.youtube.com/watch?v=t-i4XrygWCc&t=20m12s",
            "stopBadge": "Watch 20:12 – 32:16"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Naming Standards & Tags",
            "video": "https://www.youtube.com/watch?v=t-i4XrygWCc&t=32m16s",
            "stopBadge": "Watch 32:16 – 42:16"
          }
        ]
      },
      {
        "name": "Afternoon Session: Identity & Governance – Management groups hierarchy",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Policy & Governance Types",
            "video": "https://www.youtube.com/watch?v=t-i4XrygWCc&t=42m16s",
            "stopBadge": "Watch 42:16 – 54:28"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Role Based Access Control (RBAC)",
            "video": "https://www.youtube.com/watch?v=t-i4XrygWCc&t=54m28s",
            "stopBadge": "Watch 54:28 – 1:04:20"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Custom Roles & PIM Usage",
            "video": "https://www.youtube.com/watch?v=t-i4XrygWCc&t=1h04m20s",
            "stopBadge": "Watch 1:04:20 – 1:07:50"
          }
        ]
      },
      {
        "name": "Evening Session: Identity & Governance – Resource locks",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "RBAC Deep Dive",
            "video": "https://www.youtube.com/watch?v=qFoHDTxkQII",
            "stopBadge": "Watch Full video"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Managed Identity Deep Dive",
            "video": "https://www.youtube.com/watch?v=rC1TV0_sIrM&t=0m0s",
            "stopBadge": "Watch 0:00 – 18:20"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Using Managed Identities",
            "video": "https://www.youtube.com/watch?v=rC1TV0_sIrM&t=18m20s",
            "stopBadge": "Watch 18:20 – 32:06"
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
            "topic": "Azure Storage 101 & Account Basics",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=6m14s",
            "stopBadge": "Watch 6:14 – 16:29"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage Durability & Resiliency Options",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=16m29s",
            "stopBadge": "Watch 16:29 – 25:16"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Storage Account Failover & Object Replication",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=23m12s",
            "stopBadge": "Watch 23:12 – 35:14"
          }
        ]
      },
      {
        "name": "Afternoon Session: Storage – Blob access tiers: Hot, Cool, Cold, Archive",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Blob Storage Offerings",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=35m39s",
            "stopBadge": "Watch 35:39 – 45:08"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Files, Table & Queue",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=45m08s",
            "stopBadge": "Watch 45:08 – 51:26"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Pricing & Tiering",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=51m26s",
            "stopBadge": "Watch 51:26 – 1:01:58"
          }
        ]
      },
      {
        "name": "Evening Session: Storage – Shared Access Signatures (SAS)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Provisioned Billing & Data Lake Features",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h01m58s",
            "stopBadge": "Watch 1:01:58 – 1:15:46"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Hosting a Website on Storage",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h15m46s",
            "stopBadge": "Watch 1:15:46 – 1:18:46"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Types of Storage & Intro Review",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=0m35s",
            "stopBadge": "Watch 0:35 – 6:14"
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
            "topic": "Account Keys & Blob Anonymous Access",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h18m46s",
            "stopBadge": "Watch 1:18:46 – 1:26:33"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Entra ID Data Plane RBAC",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h23m24s",
            "stopBadge": "Watch 1:23:24 – 1:26:33"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Shared Access Signatures (SAS)",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h26m33s",
            "stopBadge": "Watch 1:26:33 – 1:34:01"
          }
        ]
      },
      {
        "name": "Afternoon Session: Storage – Static website hosting",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Encryption & Encryption Scopes",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h34m01s",
            "stopBadge": "Watch 1:34:01 – 1:39:16"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Network Protection (Firewalls, Private Endpoints)",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h39m16s",
            "stopBadge": "Watch 1:39:16 – 1:44:48"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Lifecycle Management Policies",
            "video": "https://www.youtube.com/watch?v=YnFkgLxqrKQ&t=1h44m48s",
            "stopBadge": "Watch 1:44:48 – 1:50:00"
          }
        ]
      },
      {
        "name": "Evening Session: Storage – Azure Data Lake Storage Gen2",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "B2B & B2C Today",
            "video": "https://www.youtube.com/watch?v=9P10hgPDRZg&t=0m37s",
            "stopBadge": "Watch 0:37 – 7:48"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "External Identities Overview & User Flows",
            "video": "https://www.youtube.com/watch?v=9P10hgPDRZg&t=7m48s",
            "stopBadge": "Watch 7:48 – 18:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "External IDs: Sample App & Licensing",
            "video": "https://www.youtube.com/watch?v=9P10hgPDRZg&t=18m40s",
            "stopBadge": "Watch 18:40 – 27:18"
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
            "topic": "VM Basics & Introduction",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=0m35s",
            "stopBadge": "Watch 0:35 – 5:56"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "VM Series and Sizes",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=5m56s",
            "stopBadge": "Watch 5:56 – 31:16"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "VM Generations & Choosing a Size",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=31m16s",
            "stopBadge": "Watch 31:16 – 37:39"
          }
        ]
      },
      {
        "name": "Afternoon Session: Compute – Availability zones and availability sets",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "VM Building Blocks",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=37m39s",
            "stopBadge": "Watch 37:39 – 59:16"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Supported OS & Maintenance",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=59m16s",
            "stopBadge": "Watch 59:16 – 1:17:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Creating Your First Azure VM",
            "video": "https://www.youtube.com/watch?v=_UuO52KgwGk",
            "stopBadge": "Watch Full video (43 min)"
          }
        ]
      },
      {
        "name": "Evening Session: Compute – Virtual Machine Scale Sets (VMSS)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Understanding Availability Zones",
            "video": "https://www.youtube.com/watch?v=4nDRvZR2EjU&t=1m45s",
            "stopBadge": "Watch 1:45 – 9:49"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Using AZs, Resilient Solutions",
            "video": "https://www.youtube.com/watch?v=4nDRvZR2EjU&t=9m49s",
            "stopBadge": "Watch 9:49 – 14:24"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Patching, IMDS & Compute Gallery",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=1h17m51s",
            "stopBadge": "Watch 1:17:51 – 1:32:30"
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
            "topic": "VMSS Overview & Orchestration",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=1h47m05s",
            "stopBadge": "Watch 1:47:05 – 1:56:07"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "VMSS Features & Compute Fleet",
            "video": "https://www.youtube.com/watch?v=KRBFVqgxyo4&t=1h56m49s",
            "stopBadge": "Watch 1:56:49 – 2:01:24"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Resiliency: Availability Sets vs Zones vs VMSS",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=1h20m21s",
            "stopBadge": "Watch 1:20:21 – 1:36:19"
          }
        ]
      },
      {
        "name": "Afternoon Session: Compute – VM extensions and custom script",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure App Services Overview",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=1h34m47s",
            "stopBadge": "Watch 1:34:47 – 1:52:40"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Functions",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=1h52m40s",
            "stopBadge": "Watch 1:52:40 – 1:58:14"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Logic Apps & Static Web Apps",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=1h58m14s",
            "stopBadge": "Watch 1:58:14 – 2:08:50"
          }
        ]
      },
      {
        "name": "Evening Session: Compute – Azure Bastion",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "VM Replication & Resiliency",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=2h05m34s",
            "stopBadge": "Watch 2:05:34 – 2:13:42"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Clustering in Azure IaaS",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=2h13m42s",
            "stopBadge": "Watch 2:13:42 – 2:17:18"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Backup Deep Dive",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=2h17m18s",
            "stopBadge": "Watch 2:17:18 – 2:27:24"
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
            "topic": "Container Basics & Images",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=3m58s",
            "stopBadge": "Watch 3:58 – 32:46"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Container Instances (ACI)",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=32m46s",
            "stopBadge": "Watch 32:46 – 39:01"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Kubernetes Service (AKS)",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=39m01s",
            "stopBadge": "Watch 39:01 – 1:23:40"
          }
        ]
      },
      {
        "name": "Afternoon Session: Compute – Availability zones and availability sets",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Kubernetes Overview & Nodes",
            "video": "https://www.youtube.com/watch?v=r6YIlPEC4y4&t=46m45s",
            "stopBadge": "Watch 46:45 – 56:15"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Kubernetes Workloads & Deployments",
            "video": "https://www.youtube.com/watch?v=r6YIlPEC4y4&t=59m40s",
            "stopBadge": "Watch 59:40 – 1:08:20"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Autoscale, Networking & Storage",
            "video": "https://www.youtube.com/watch?v=r6YIlPEC4y4&t=1h08m20s",
            "stopBadge": "Watch 1:08:20 – 1:19:32"
          }
        ]
      },
      {
        "name": "Evening Session: Compute – Virtual Machine Scale Sets (VMSS)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Container Apps",
            "video": "https://www.youtube.com/watch?v=bMlkYLX4ZfQ&t=1h23m40s",
            "stopBadge": "Watch 1:23:40 – 1:34:47"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Deployments, GitOps & Helm",
            "video": "https://www.youtube.com/watch?v=r6YIlPEC4y4&t=1h19m32s",
            "stopBadge": "Watch 1:19:32 – 1:33:08"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Container Basics (VMs vs Containers)",
            "video": "https://www.youtube.com/watch?v=r6YIlPEC4y4&t=0m0s",
            "stopBadge": "Watch 0:00 – 9:20"
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
            "topic": "Virtual Network Basics",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=0m41s",
            "stopBadge": "Watch 0:41 – 14:26"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "VM NIC & Supported Traffic Types",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=14m26s",
            "stopBadge": "Watch 14:26 – 29:56"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "IPv6 & External (Internet) Access",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=29m56s",
            "stopBadge": "Watch 29:56 – 47:38"
          }
        ]
      },
      {
        "name": "Afternoon Session: Networking – VNet peering",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Bring Your Own IP & Connecting VNets",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=47m38s",
            "stopBadge": "Watch 47:38 – 55:50"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "VNet Peering",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=55m50s",
            "stopBadge": "Watch 55:50 – 1:05:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "User Defined Routes & Appliances",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h05m51s",
            "stopBadge": "Watch 1:05:51 – 1:14:59"
          }
        ]
      },
      {
        "name": "Evening Session: Networking – Network Security Groups (NSG)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Connecting to On-Premises & S2S VPN",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h14m59s",
            "stopBadge": "Watch 1:14:59 – 1:22:52"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "ExpressRoute Fundamentals",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h22m52s",
            "stopBadge": "Watch 1:22:52 – 1:38:34"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "ExpressRoute: GlobalReach, FastPath",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h38m34s",
            "stopBadge": "Watch 1:38:34 – 1:49:19"
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
            "topic": "Network Security Groups (NSGs)",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h49m19s",
            "stopBadge": "Watch 1:49:19 – 1:52:05"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Service Tags & Application Security Groups",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h52m05s",
            "stopBadge": "Watch 1:52:05 – 2:02:08"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Virtual WAN & Network Manager",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=2h02m08s",
            "stopBadge": "Watch 2:02:08 – 2:18:02"
          }
        ]
      },
      {
        "name": "Afternoon Session: Networking – Application Gateway and WAF",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Service Endpoints",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=2h18m02s",
            "stopBadge": "Watch 2:18:02 – 2:25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Firewall Deep Dive",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h45m01s",
            "stopBadge": "Watch 1:45:01 – 1:49:19"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "VPN vs ExpressRoute: When to Use Which",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h19m06s",
            "stopBadge": "Watch 1:19:06 – 1:22:52"
          }
        ]
      },
      {
        "name": "Evening Session: Networking – Azure Bastion",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Study Cram: Virtual Network",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h09m28s",
            "stopBadge": "Watch 1:09:28 – 1:20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Study Cram: Peering & NSG",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h20m00s",
            "stopBadge": "Watch 1:20:00 – 1:36:27"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Study Cram: Azure Firewall & DNS",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h36m27s",
            "stopBadge": "Watch 1:36:27 – 1:46:51"
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
            "topic": "Azure DNS: Public Zones & Record Sets",
            "video": "https://www.youtube.com/watch?v=nDtCSQyG_I8&t=1h38m41s",
            "stopBadge": "Watch 1:38:41 – 1:46:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Private DNS & Auto-registration",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h38m41s",
            "stopBadge": "Watch 1:38:41 – 1:46:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Resiliency: Multi-Region Deployments",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=1h50m03s",
            "stopBadge": "Watch 1:50:03 – 2:00:05"
          }
        ]
      },
      {
        "name": "Afternoon Session: Networking – VNet peering",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Infrastructure as Code for DR",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=2h00m05s",
            "stopBadge": "Watch 2:00:05 – 2:05:34"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Replication & Non-Stateful Components",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=2h03m47s",
            "stopBadge": "Watch 2:03:47 – 2:12:15"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Master the Azure Pricing Calculator",
            "video": "https://www.youtube.com/watch?v=rMKmbZ1SYQg&t=0m0s",
            "stopBadge": "Watch 0:00 – 13:13"
          }
        ]
      },
      {
        "name": "Evening Session: Networking – Network Security Groups (NSG)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Pricing Calculator Example Scenarios",
            "video": "https://www.youtube.com/watch?v=rMKmbZ1SYQg&t=13m13s",
            "stopBadge": "Watch 13:13 – 29:15"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Understanding Availability Zones",
            "video": "https://www.youtube.com/watch?v=4nDRvZR2EjU&t=0m0s",
            "stopBadge": "Watch 0:00 – 14:24"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Network Considerations & Global Services",
            "video": "https://www.youtube.com/watch?v=4nDRvZR2EjU&t=13m00s",
            "stopBadge": "Watch 13:00 – 14:24"
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
            "topic": "Monitoring in Azure Overview",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=0m51s",
            "stopBadge": "Watch 0:51 – 16:58"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Diagnostic Settings",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=16m58s",
            "stopBadge": "Watch 16:58 – 22:52"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Monitor Agent & Guest Monitoring",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=22m52s",
            "stopBadge": "Watch 22:52 – 37:21"
          }
        ]
      },
      {
        "name": "Afternoon Session: Monitoring – Log Analytics workspaces",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Types of Logs",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=37m21s",
            "stopBadge": "Watch 37:21 – 47:14"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Alerting Fundamentals",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=47m14s",
            "stopBadge": "Watch 47:14 – 1:12:21"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Action Groups & Alert Processing Rules",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=1h12m21s",
            "stopBadge": "Watch 1:12:21 – 1:20:12"
          }
        ]
      },
      {
        "name": "Evening Session: Monitoring – Kusto Query Language (KQL)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Security Basics & Zero Trust",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=1h20m12s",
            "stopBadge": "Watch 1:20:12 – 1:31:25"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Microsoft Defender for Cloud",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=1h31m25s",
            "stopBadge": "Watch 1:31:25 – 1:43:01"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Managed Identity & Azure Key Vault",
            "video": "https://www.youtube.com/watch?v=gzBXFnfvoXo&t=1h51m29s",
            "stopBadge": "Watch 1:51:29 – 2:06:54"
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
            "topic": "DR: Planned vs Unplanned & Protection",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=0m45s",
            "stopBadge": "Watch 0:45 – 12:03"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Infra Failures & Replication Requirements",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=12m03s",
            "stopBadge": "Watch 12:03 – 30:48"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Safe Deployment & Avoiding Pets",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=30m48s",
            "stopBadge": "Watch 30:48 – 49:36"
          }
        ]
      },
      {
        "name": "Afternoon Session: Monitoring – Azure Site Recovery (ASR)",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Knowing Services to Protect",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=49m36s",
            "stopBadge": "Watch 49:36 – 1:12:05"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Test, Chaos Engineering & Resiliency",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=1h12m05s",
            "stopBadge": "Watch 1:12:05 – 1:20:21"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure Backup Deep Dive",
            "video": "https://www.youtube.com/watch?v=tGr1KqnuxeM&t=2h17m18s",
            "stopBadge": "Watch 2:17:18 – 2:27:24"
          }
        ]
      },
      {
        "name": "Evening Session: Monitoring – Failover and failback",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Disaster Recovery in Azure",
            "video": "https://www.youtube.com/watch?v=8fvO3WArG-Y&t=0m0s",
            "stopBadge": "Watch 0:00 – 13:20"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "DR Requirements & Replication Options",
            "video": "https://www.youtube.com/watch?v=8fvO3WArG-Y&t=13m20s",
            "stopBadge": "Watch 13:20 – 32:52"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Making Failover Simple & Active-Active",
            "video": "https://www.youtube.com/watch?v=8fvO3WArG-Y&t=41m45s",
            "stopBadge": "Watch 41:45 – 54:09"
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
            "topic": "AZ-104 Study Cram: Entra ID",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=2m20s",
            "stopBadge": "Watch 2:20 – 25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Study Cram: Subscriptions & Policy",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=34m48s",
            "stopBadge": "Watch 34:48 – 54:35"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Study Cram: Azure Policy & RBAC",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=54m35s",
            "stopBadge": "Watch 54:35 – 1:09:28"
          }
        ]
      },
      {
        "name": "Afternoon Session: Mock Review – Review Weak Areas",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Study Cram: Networking",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h09m28s",
            "stopBadge": "Watch 1:09:28 – 1:46:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Practice Exam: Domain 1 & 2 Questions",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h46m51s",
            "stopBadge": "Watch 1:46:51 – 2:00:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Review Answers: Identity & Storage",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=0m44s",
            "stopBadge": "Watch 0:44 – 2:20"
          }
        ]
      },
      {
        "name": "Evening Session: Mock Review – Identity & Governance rapid review",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Deep Dive: Missed Questions Analysis",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=2m20s",
            "stopBadge": "Watch 2:20 – 25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Score Breakdown: Identify Weakest Domains",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=25m00s",
            "stopBadge": "Watch 25:00 – 34:48"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Practice Exam: Domain 3 & 4 Questions",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h09m28s",
            "stopBadge": "Watch 1:09:28 – 1:46:51"
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
            "topic": "Targeted Review: Weakest Domain",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=2m20s",
            "stopBadge": "Watch 2:20 – 25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Targeted Review: Second Weakest Domain",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h09m28s",
            "stopBadge": "Watch 1:09:28 – 1:46:51"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Scenario-Based Questions: Complex Multi-Domain",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=54m35s",
            "stopBadge": "Watch 54:35 – 1:09:28"
          }
        ]
      },
      {
        "name": "Afternoon Session: Mock Review – Final Cram Session",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "Azure CLI & PowerShell Command Review",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=34m48s",
            "stopBadge": "Watch 34:48 – 54:35"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Networking Diagrams & Subnetting Review",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=1h09m28s",
            "stopBadge": "Watch 1:09:28 – 1:20:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Exam Strategy: Time Management & Flagging",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=0m44s",
            "stopBadge": "Watch 0:44 – 2:20"
          }
        ]
      },
      {
        "name": "Evening Session: Mock Review – Command-line (az CLI) cheat sheet",
        "blocks": [
          {
            "type": "study",
            "duration": 20,
            "topic": "AZ-104 Exam Format: Case Studies, Labs",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=2m20s",
            "stopBadge": "Watch 2:20 – 25:00"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Top 50 AZ-104 Exam Tips & Common Pitfalls",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=25m00s",
            "stopBadge": "Watch 25:00 – 34:48"
          },
          {
            "type": "break",
            "duration": 10
          },
          {
            "type": "study",
            "duration": 20,
            "topic": "Final Confidence Check: Quick Domain 1-5 Review",
            "video": "https://www.youtube.com/watch?v=0Knf9nub4-k&t=34m48s",
            "stopBadge": "Watch 34:48 – 54:35"
          }
        ]
      }
    ],
    "lab": null
  }
};

if (typeof module !== 'undefined' && module.exports) { module.exports = dailySchedules; }
