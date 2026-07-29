"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Shuffle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Trophy,
  Target,
  AlertCircle,
} from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";

interface Question {
  id: number;
  domain: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ALL_QUESTIONS: Question[] = [
  // ─── Identities & Governance ───────────────────────────────────────────────
  {
    id: 1,
    domain: "Identities & Governance",
    difficulty: "Easy",
    question:
      "Which Azure AD role grants the broadest administrative privileges across all Azure AD resources?",
    options: [
      "User Administrator",
      "Global Administrator",
      "Security Administrator",
      "Privileged Role Administrator",
    ],
    correctIndex: 1,
    explanation:
      "Global Administrator has full control over all Azure AD features and services, including assigning other admin roles.",
  },
  {
    id: 2,
    domain: "Identities & Governance",
    difficulty: "Medium",
    question:
      "You need to ensure that users in your organization must use multi-factor authentication when accessing Azure resources from outside the corporate network. Which Azure AD feature should you configure?",
    options: [
      "Azure AD Identity Protection",
      "Conditional Access policies",
      "Privileged Identity Management",
      "Azure AD B2C",
    ],
    correctIndex: 1,
    explanation:
      "Conditional Access policies allow you to enforce MFA based on conditions such as network location, user risk, device compliance, and more.",
  },
  {
    id: 3,
    domain: "Identities & Governance",
    difficulty: "Hard",
    question:
      "Your organization requires that a user's Azure AD role assignment is only active for a specific 8-hour window and must require approval before activation. Which service provides this capability?",
    options: [
      "Azure AD Conditional Access",
      "Azure AD Identity Protection",
      "Azure AD Privileged Identity Management (PIM)",
      "Azure Role-Based Access Control (RBAC)",
    ],
    correctIndex: 2,
    explanation:
      "PIM provides just-in-time privileged access, time-bound assignments, approval workflows, and audit history for Azure AD and Azure resource roles.",
  },
  {
    id: 4,
    domain: "Identities & Governance",
    difficulty: "Easy",
    question:
      "Which Azure feature allows you to group multiple subscriptions to apply governance policies, access controls, and compliance at scale?",
    options: [
      "Resource groups",
      "Management groups",
      "Azure Blueprints",
      "Azure Policy initiatives",
    ],
    correctIndex: 1,
    explanation:
      "Management groups provide a hierarchy above subscriptions, allowing you to apply policies and RBAC across multiple subscriptions simultaneously.",
  },
  {
    id: 5,
    domain: "Identities & Governance",
    difficulty: "Medium",
    question:
      "You need to prevent your team from creating any virtual machines with a size larger than Standard_D4s_v3. What is the most efficient way to enforce this?",
    options: [
      "Create a custom Azure AD role that removes VM create permissions",
      "Define and assign an Azure Policy with an 'deny' effect",
      "Use a Resource Manager lock on the subscription",
      "Configure Conditional Access for Azure portal",
    ],
    correctIndex: 1,
    explanation:
      "Azure Policy with a 'deny' effect can restrict which VM SKUs can be deployed. You define allowed sizes and any non-compliant deployment is blocked at creation time.",
  },
  {
    id: 6,
    domain: "Identities & Governance",
    difficulty: "Hard",
    question:
      "A resource group has a ReadOnly lock. Which of the following operations will SUCCEED?",
    options: [
      "Deleting a virtual machine inside the resource group",
      "Creating a new storage account in the resource group",
      "Reading the list of virtual machines in the resource group",
      "Modifying a network security group rule",
    ],
    correctIndex: 2,
    explanation:
      "A ReadOnly lock allows read operations but blocks all write and delete operations. Listing/reading resources is always permitted.",
  },

  // ─── Storage ───────────────────────────────────────────────────────────────
  {
    id: 7,
    domain: "Storage",
    difficulty: "Easy",
    question:
      "Which Azure Storage redundancy option replicates data synchronously across three availability zones within a single region?",
    options: [
      "Locally Redundant Storage (LRS)",
      "Geo-Redundant Storage (GRS)",
      "Zone-Redundant Storage (ZRS)",
      "Geo-Zone-Redundant Storage (GZRS)",
    ],
    correctIndex: 2,
    explanation:
      "ZRS replicates data synchronously across three Azure availability zones in the primary region, providing high availability against zone failures.",
  },
  {
    id: 8,
    domain: "Storage",
    difficulty: "Medium",
    question:
      "You need to give a third-party vendor temporary, read-only access to a specific blob container for 24 hours without sharing your storage account keys. What should you use?",
    options: [
      "Storage account access keys",
      "Shared Access Signature (SAS) token",
      "Azure AD service principal",
      "Storage account firewall rules",
    ],
    correctIndex: 1,
    explanation:
      "A SAS token provides delegated, time-limited access to specific resources with defined permissions, without exposing the account keys.",
  },
  {
    id: 9,
    domain: "Storage",
    difficulty: "Medium",
    question:
      "Your company wants to reduce costs by automatically moving blobs that haven't been accessed in 30 days to the Cool tier and deleting blobs older than 365 days. What should you configure?",
    options: [
      "Azure Storage replication policy",
      "Azure Backup policy",
      "Azure Blob lifecycle management policy",
      "Azure Storage firewall rule",
    ],
    correctIndex: 2,
    explanation:
      "Blob lifecycle management policies let you define rules that automatically transition blobs between tiers or delete them based on last-modified or last-accessed time.",
  },
  {
    id: 10,
    domain: "Storage",
    difficulty: "Hard",
    question:
      "You have a storage account with hierarchical namespace enabled. Which storage service is being used?",
    options: [
      "Azure Blob Storage (standard)",
      "Azure Files",
      "Azure Data Lake Storage Gen2",
      "Azure Table Storage",
    ],
    correctIndex: 2,
    explanation:
      "Azure Data Lake Storage Gen2 is built on Blob Storage but adds a hierarchical namespace (directory/file structure) for big data analytics workloads.",
  },

  // ─── Compute ───────────────────────────────────────────────────────────────
  {
    id: 11,
    domain: "Compute",
    difficulty: "Easy",
    question:
      "Which Azure VM feature automatically distributes VMs across multiple physical servers, racks, and storage units within a datacenter to protect against hardware failures?",
    options: [
      "Availability Zones",
      "Availability Sets",
      "Scale Sets",
      "Proximity Placement Groups",
    ],
    correctIndex: 1,
    explanation:
      "Availability Sets use fault domains and update domains to spread VMs across different physical hardware in a single datacenter, protecting against local hardware failures.",
  },
  {
    id: 12,
    domain: "Compute",
    difficulty: "Medium",
    question:
      "You need to automatically scale a group of identical VMs based on CPU utilization metrics. Which Azure resource should you deploy?",
    options: [
      "Azure Virtual Machine with autoshutdown",
      "Azure Virtual Machine Scale Set (VMSS)",
      "Azure App Service with autoscale",
      "Azure Kubernetes Service",
    ],
    correctIndex: 1,
    explanation:
      "Virtual Machine Scale Sets allow you to create and manage a group of load-balanced, identical VMs that scale in or out automatically based on demand or schedules.",
  },
  {
    id: 13,
    domain: "Compute",
    difficulty: "Hard",
    question:
      "A VM is currently running with a managed OS disk on Standard HDD. You need to upgrade it to Premium SSD with zero data loss and minimal downtime. What is the correct approach?",
    options: [
      "Redeploy the VM from the Azure Marketplace with a new Premium SSD disk",
      "Stop (deallocate) the VM, change the disk SKU to Premium SSD, then start the VM",
      "Create a snapshot, create a new Premium SSD disk from the snapshot, then swap disks",
      "Enable Write Accelerator on the existing Standard HDD disk",
    ],
    correctIndex: 1,
    explanation:
      "You can change the disk SKU of a managed disk without any data migration. You must deallocate the VM first, update the disk type via the portal or CLI, then restart.",
  },
  {
    id: 14,
    domain: "Compute",
    difficulty: "Medium",
    question:
      "Which Azure service lets you run containerized applications without managing the underlying VM infrastructure?",
    options: [
      "Azure Virtual Machines",
      "Azure Virtual Machine Scale Sets",
      "Azure Container Instances (ACI)",
      "Azure Dedicated Host",
    ],
    correctIndex: 2,
    explanation:
      "ACI provides the fastest and simplest way to run containers in Azure without managing servers. Containers start in seconds and are billed per second.",
  },
  {
    id: 15,
    domain: "Compute",
    difficulty: "Hard",
    question:
      "You need to deploy a web application that automatically scales, has built-in load balancing, and supports deployment slots for zero-downtime releases. Which service is most appropriate?",
    options: [
      "Azure Virtual Machines with Azure Load Balancer",
      "Azure App Service",
      "Azure Container Instances",
      "Azure Batch",
    ],
    correctIndex: 1,
    explanation:
      "Azure App Service provides a fully managed PaaS with built-in autoscaling, load balancing, and deployment slots for staging/production swap with zero downtime.",
  },

  // ─── Virtual Networking ────────────────────────────────────────────────────
  {
    id: 16,
    domain: "Virtual Networking",
    difficulty: "Easy",
    question:
      "What is the minimum subnet size (CIDR prefix) supported in Azure Virtual Networks?",
    options: ["/28", "/29", "/30", "/32"],
    correctIndex: 1,
    explanation:
      "Azure reserves 5 IP addresses per subnet (network address, gateway, two DNS addresses, and broadcast). The minimum usable subnet is /29 (8 addresses, 3 usable after Azure reservations).",
  },
  {
    id: 17,
    domain: "Virtual Networking",
    difficulty: "Medium",
    question:
      "Two virtual networks in the same Azure region need to communicate privately. They do not overlap in address space. What is the simplest solution?",
    options: [
      "Configure a site-to-site VPN between the two VNets",
      "Create a VNet-to-VNet peering connection",
      "Deploy an Azure Virtual WAN hub",
      "Use an Azure ExpressRoute circuit",
    ],
    correctIndex: 1,
    explanation:
      "VNet peering connects two virtual networks in Azure, enabling resources to communicate using private IP addresses with low latency and high bandwidth—even across regions.",
  },
  {
    id: 18,
    domain: "Virtual Networking",
    difficulty: "Medium",
    question:
      "You want to filter inbound internet traffic to your web tier VMs and allow only TCP port 443. Where should you configure this rule?",
    options: [
      "Azure Firewall policy",
      "Network Security Group (NSG) associated with the web subnet",
      "Azure DDoS Protection plan",
      "Route table associated with the subnet",
    ],
    correctIndex: 1,
    explanation:
      "NSGs contain inbound and outbound security rules that control traffic to/from Azure resources. Associating an NSG with a subnet applies rules to all resources in that subnet.",
  },
  {
    id: 19,
    domain: "Virtual Networking",
    difficulty: "Hard",
    question:
      "You need on-premises VMs to resolve Azure private DNS zone names (e.g., privatelink.blob.core.windows.net) from an on-premises DNS server. What must be configured?",
    options: [
      "Add an Azure public DNS record for the private zone",
      "Enable DNS forwarding on on-premises servers to the Azure DNS IP 168.63.129.16 for the private zone",
      "Configure split-horizon DNS on Azure",
      "Create a custom DNS server VM in Azure with forwarders",
    ],
    correctIndex: 1,
    explanation:
      "On-premises DNS servers cannot natively query Azure DNS. You must configure conditional forwarding on the on-premises DNS server to forward the private zone queries to Azure's recursive resolver at 168.63.129.16.",
  },
  {
    id: 20,
    domain: "Virtual Networking",
    difficulty: "Hard",
    question:
      "Which Azure Load Balancer SKU supports availability zones, outbound rules, and HTTPS health probes?",
    options: [
      "Basic SKU",
      "Standard SKU",
      "Gateway SKU",
      "Both Basic and Standard SKUs",
    ],
    correctIndex: 1,
    explanation:
      "Standard Load Balancer supports zone-redundant frontends, HTTPS health probes, outbound rules, and is the recommended SKU for production workloads. Basic SKU does not support availability zones.",
  },

  // ─── Monitor & Maintain ────────────────────────────────────────────────────
  {
    id: 21,
    domain: "Monitor & Maintain",
    difficulty: "Easy",
    question:
      "Which Azure service provides a centralized dashboard for monitoring the health, performance, and availability of Azure resources?",
    options: [
      "Azure Advisor",
      "Azure Monitor",
      "Azure Service Health",
      "Azure Security Center",
    ],
    correctIndex: 1,
    explanation:
      "Azure Monitor collects, analyzes, and acts on telemetry from Azure and on-premises environments. It includes metrics, logs, alerts, and dashboards.",
  },
  {
    id: 22,
    domain: "Monitor & Maintain",
    difficulty: "Medium",
    question:
      "You need to receive an email notification when a VM's CPU utilization exceeds 80% for more than 5 minutes. What should you configure?",
    options: [
      "Azure Policy with an audit effect",
      "Azure Monitor metric alert rule with an action group",
      "Azure Advisor recommendation",
      "Azure Service Health alert",
    ],
    correctIndex: 1,
    explanation:
      "Azure Monitor metric alert rules evaluate resource metrics against thresholds. Action groups define who gets notified and how (email, SMS, webhook, ITSM, etc.).",
  },
  {
    id: 23,
    domain: "Monitor & Maintain",
    difficulty: "Medium",
    question:
      "Where should you send VM diagnostic logs to enable long-term retention, complex queries, and cross-resource analysis using KQL?",
    options: [
      "Azure Storage account (archive tier)",
      "Log Analytics workspace",
      "Azure Event Hub",
      "Azure Application Insights",
    ],
    correctIndex: 1,
    explanation:
      "Log Analytics workspaces store log data that can be queried with KQL. They are the foundation for Azure Monitor Logs and integrate with Sentinel, Defender, and other services.",
  },
  {
    id: 24,
    domain: "Monitor & Maintain",
    difficulty: "Hard",
    question:
      "You need to create an alert that fires only when BOTH CPU > 80% AND Available Memory < 1 GB simultaneously on a single VM. Which alert type supports this?",
    options: [
      "Single-condition metric alert",
      "Multi-condition metric alert (multi-criteria)",
      "Log search alert with a union query",
      "Azure Service Health alert",
    ],
    correctIndex: 1,
    explanation:
      "Azure Monitor supports multiple conditions on a single metric alert rule. All conditions must evaluate to true simultaneously before the alert fires, providing AND logic.",
  },
  {
    id: 25,
    domain: "Monitor & Maintain",
    difficulty: "Hard",
    question:
      "Azure Advisor provides recommendations in which five categories?",
    options: [
      "Cost, Security, Reliability, Performance, Operational Excellence",
      "Cost, Security, Availability, Scalability, Compliance",
      "Cost, Security, Reliability, Networking, Storage",
      "Cost, Governance, Reliability, Performance, Sustainability",
    ],
    correctIndex: 0,
    explanation:
      "Azure Advisor analyzes your configurations and usage telemetry to give personalized best-practice recommendations across: Cost, Security, Reliability (formerly High Availability), Performance, and Operational Excellence.",
  },
];

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; bg: string; text: string; border: string }
> = {
  Easy: {
    label: "Easy",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  Medium: {
    label: "Medium",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  Hard: {
    label: "Hard",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function AZ104Page() {
  const [questions, setQuestions] = useState<Question[]>(ALL_QUESTIONS);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "All">(
    "All"
  );

  const handleShuffle = useCallback(() => {
    setQuestions((prev) => shuffleArray(prev));
    setSelected({});
    setRevealed({});
    setSubmitted(false);
  }, []);

  const handleReset = () => {
    setQuestions(ALL_QUESTIONS);
    setSelected({});
    setRevealed({});
    setSubmitted(false);
  };

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleExplanation = (questionId: number) => {
    setRevealed((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const visibleQuestions =
    filterDifficulty === "All"
      ? questions
      : questions.filter((q) => q.difficulty === filterDifficulty);

  const handleSubmit = () => {
    setSubmitted(true);
    setRevealed(
      Object.fromEntries(visibleQuestions.map((q) => [q.id, true]))
    );
  };

  const totalVisible = visibleQuestions.length;
  const answeredCount = visibleQuestions.filter(
    (q) => selected[q.id] !== undefined
  ).length;

  const score = submitted
    ? visibleQuestions.filter((q) => selected[q.id] === q.correctIndex).length
    : null;

  const scorePercent =
    score !== null && totalVisible > 0
      ? Math.round((score / totalVisible) * 100)
      : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-2 text-blue-700 font-bold text-lg">
            <BookOpen size={20} />
            AZ-104 Practice Exam
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Microsoft Azure Administrator
          </h1>
          <p className="text-slate-500 text-lg mb-1">
            AZ-104 Certification Practice Exam
          </p>
          <p className="text-slate-400 text-sm">
            {ALL_QUESTIONS.length} questions across 5 exam domains
          </p>
        </div>

        {/* Score banner (after submit) */}
        {submitted && scorePercent !== null && (
          <div
            className={`mb-8 p-6 rounded-2xl border flex items-center gap-4 ${
              scorePercent >= 80
                ? "bg-emerald-50 border-emerald-200"
                : scorePercent >= 60
                ? "bg-amber-50 border-amber-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <Trophy
              size={36}
              className={
                scorePercent >= 80
                  ? "text-emerald-600"
                  : scorePercent >= 60
                  ? "text-amber-600"
                  : "text-red-500"
              }
            />
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {score} / {totalVisible} correct &mdash; {scorePercent}%
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {scorePercent >= 80
                  ? "Great work! You're on track for the AZ-104."
                  : scorePercent >= 60
                  ? "Getting there — review the explanations below."
                  : "Keep studying — focus on the explanations for each wrong answer."}
              </div>
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {/* Shuffle */}
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-xl shadow transition-all"
          >
            <Shuffle size={16} />
            Shuffle Questions
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition-all"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  filterDifficulty === d
                    ? d === "All"
                      ? "bg-slate-800 text-white border-slate-800"
                      : d === "Easy"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : d === "Medium"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-red-600 text-white border-red-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-500">
          <Target size={15} />
          <span>
            {answeredCount} of {totalVisible} answered
          </span>
          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{
                width: totalVisible
                  ? `${(answeredCount / totalVisible) * 100}%`
                  : "0%",
              }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {visibleQuestions.map((q, idx) => {
            const userAnswer = selected[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;
            const cfg = DIFFICULTY_CONFIG[q.difficulty];

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-2xl p-6 shadow-sm transition-all ${
                  submitted && isAnswered
                    ? isCorrect
                      ? "border-emerald-300"
                      : "border-red-300"
                    : "border-slate-200"
                }`}
              >
                {/* Question header */}
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <span className="text-xs font-bold text-slate-400 mt-0.5 shrink-0">
                    Q{idx + 1}
                  </span>

                  {/* Difficulty badge */}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border} shrink-0`}
                  >
                    {cfg.label}
                  </span>

                  {/* Domain badge */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    {q.domain}
                  </span>

                  {/* Correct/Wrong icon after submit */}
                  {submitted && isAnswered && (
                    <span className="ml-auto shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      ) : (
                        <XCircle size={20} className="text-red-500" />
                      )}
                    </span>
                  )}
                  {submitted && !isAnswered && (
                    <span className="ml-auto shrink-0">
                      <AlertCircle size={20} className="text-amber-400" />
                    </span>
                  )}
                </div>

                <p className="text-slate-800 font-medium leading-relaxed mb-4">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const isSelected = userAnswer === i;
                    const isRight = i === q.correctIndex;

                    let optionClass =
                      "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ";

                    if (!submitted) {
                      optionClass += isSelected
                        ? "bg-blue-600 text-white border-blue-600 font-semibold"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
                    } else {
                      if (isRight) {
                        optionClass +=
                          "bg-emerald-50 text-emerald-800 border-emerald-400 font-semibold";
                      } else if (isSelected && !isRight) {
                        optionClass +=
                          "bg-red-50 text-red-800 border-red-400 font-semibold";
                      } else {
                        optionClass +=
                          "bg-slate-50 text-slate-500 border-slate-200";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(q.id, i)}
                        disabled={submitted}
                        className={optionClass}
                      >
                        <span className="font-bold mr-2 text-xs opacity-60">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation toggle */}
                <button
                  onClick={() => handleToggleExplanation(q.id)}
                  className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {revealed[q.id] ? (
                    <>
                      <ChevronUp size={14} /> Hide Explanation
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} /> Show Explanation
                    </>
                  )}
                </button>

                {revealed[q.id] && (
                  <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">
                      Explanation:{" "}
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Reset */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow transition-all"
            >
              Submit Exam ({answeredCount}/{totalVisible} answered)
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow transition-all"
            >
              <RotateCcw size={16} />
              Retake Exam
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-500 py-6 text-center text-sm border-t border-white/10">
        <p>
          © {new Date().getFullYear()} Randy DeRego &mdash; AZ-104 Practice
          Questions
        </p>
      </footer>
    </div>
  );
}
