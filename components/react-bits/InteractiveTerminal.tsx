"use client";

import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, Play, RefreshCw, Cpu, Smartphone, Globe, Workflow } from "lucide-react";

interface TerminalTab {
  id: string;
  label: string;
  icon: React.ElementType;
  command: string;
  output: string[];
}

const TABS: TerminalTab[] = [
  {
    id: "web",
    label: "webdev.ts",
    icon: Globe,
    command: "npx create-next-app@latest --typescript --tailwind --turbo",
    output: [
      "[info] Compiling /app/[lang]/page.tsx with Turbopack (42ms)",
      "[perf] Server-side rendered in 18ms | Edge Cache: HIT",
      "[seo] Lighthouse Score: 100/100 (Performance, Accessibility, SEO)",
      "[bundle] Zero bloated JS: 48.2 kB Gzip transmitted",
      "✓ Deployment live on Edge CDN -> https://client-platform.prod.app"
    ]
  },
  {
    id: "mobile",
    label: "mobile.swift",
    icon: Smartphone,
    command: "eas build --platform all --profile production",
    output: [
      "[build:ios] Generating native archive with React Native 0.78 (Fabric)",
      "[build:android] Compiling Hermes bytecode & Proguard optimization",
      "[ux] 120Hz smooth gestures + biometric FaceID/TouchID integrated",
      "[offline] SQLite local sync engine initialized (0ms latency)",
      "✓ Ready for App Store & Google Play distribution"
    ]
  },
  {
    id: "automation",
    label: "pipeline.py",
    icon: Workflow,
    command: "python3 -m studio.automation --sync-all --agents=active",
    output: [
      "[trigger] Webhook received: New Lead Qualified -> Score 98/100",
      "[agent] DeepSeek/GPT-4o agent initiated context extraction...",
      "[crm] BadiCRM updated via REST API (Pipelines synced)",
      "[omnichannel] WhatsApp confirmation + Calendar invite dispatched",
      "✓ Workflow executed in 410ms (0 manual hours spent)"
    ]
  },
  {
    id: "cloud",
    label: "docker-compose.yml",
    icon: Cpu,
    command: "docker compose up -d --build --scale worker=4",
    output: [
      "[infra] PostgreSQL 16 read-replicas healthy with pgvector",
      "[cache] Redis cluster ping: 0.8ms | Auth tokens refreshed",
      "[metrics] CPU: 12% | RAM: 1.4GB / 32GB | 0 error rate",
      "[security] TLS 1.3 enforced, automated DDoS shield active",
      "✓ System operational with 99.99% high-availability SLA"
    ]
  }
];

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<string>("web");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(TABS[0].output.length);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSimulateRun = () => {
    if (isRunning) return;
    clearTimer();
    setIsRunning(true);
    setVisibleCount(0);

    const maxLines = currentTab.output.length;
    let currentCount = 0;

    intervalRef.current = setInterval(() => {
      currentCount++;
      if (currentCount <= maxLines) {
        setVisibleCount(currentCount);
      } else {
        clearTimer();
        setIsRunning(false);
      }
    }, 260);
  };

  const handleTabChange = (tabId: string) => {
    clearTimer();
    setIsRunning(false);
    setActiveTab(tabId);
    const targetTab = TABS.find((t) => t.id === tabId) || TABS[0];
    setVisibleCount(targetTab.output.length);
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const displayedLines = currentTab.output.slice(0, visibleCount);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-200/90 bg-white shadow-[0_16px_50px_-12px_rgba(15,23,42,0.1)] overflow-hidden backdrop-blur-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/30" />
          <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/30" />
          <span className="ml-3 text-xs font-mono text-slate-500 hidden sm:inline font-medium">
            badii-dev-studio ~ zsh (arm64)
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all font-semibold cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
          title="Copier la commande"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs sm:text-sm bg-slate-950 text-slate-100">
        {/* Command line */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto text-emerald-400">
            <span className="text-blue-400 font-semibold">studio@engine:~$</span>
            <span className="text-white font-medium">{currentTab.command}</span>
          </div>

          <button
            onClick={handleSimulateRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 rounded transition-all shrink-0 ml-3 font-semibold cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Play className="w-3 h-3 fill-current" />
            )}
            <span>{isRunning ? "Running..." : "Test Execute"}</span>
          </button>
        </div>

        {/* Output lines */}
        <div className="space-y-2 min-h-[140px]">
          {displayedLines.map((line, idx) => {
            if (!line) return null;
            const isSuccess = typeof line === "string" && line.startsWith("✓");
            const isInfo = typeof line === "string" && (line.startsWith("[info]") || line.startsWith("[build"));
            const isPerf = typeof line === "string" && (line.startsWith("[perf]") || line.startsWith("[seo]"));

            return (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  isSuccess
                    ? "text-emerald-400 font-bold"
                    : isPerf
                    ? "text-cyan-400"
                    : isInfo
                    ? "text-blue-400"
                    : "text-slate-300"
                }`}
              >
                <span className="text-slate-600 select-none">{(idx + 1).toString().padStart(2, "0")}</span>
                <span>{line}</span>
              </div>
            );
          })}
          {isRunning && (
            <div className="flex items-center gap-2 text-slate-500 animate-pulse">
              <span className="w-2 h-4 bg-emerald-400 inline-block" />
              <span>executing pipeline step...</span>
            </div>
          )}
        </div>

        {/* Status prompt */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-slate-400">
          <span className="text-purple-400 font-semibold">⚡ Status:</span>
          <span className="text-slate-300">Production ready · Microsecond benchmarks verified</span>
          <span className="w-2 h-4 bg-blue-500 animate-pulse ml-1 inline-block" />
        </div>
      </div>
    </div>
  );
}
