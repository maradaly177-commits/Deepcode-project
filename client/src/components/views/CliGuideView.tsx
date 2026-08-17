import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SETUP_STEPS, ENTERPRISE_PACKAGES, generateAllInOneScript } from '../../constants/starterData';
import { copyToClipboard } from '../../utils/cn';
import {
    Terminal,
    Copy,
    Check,
    Info,
    PackageCheck,
    FileCode,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

export const CliGuideView: React.FC = () => {
    const { packageManager, projectName, addToast } = useAppStore();
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(1);

    const handleCopyCommand = async (id: number, text: string, title: string) => {
        const formatted = text.replace(/deepcode-web/g, projectName);
        const ok = await copyToClipboard(formatted);
        if (ok) {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
            addToast({
                type: 'success',
                title: `Đã copy: ${title}`,
                message: 'Lệnh đã được sao chép vào clipboard.',
            });
        }
    };

    const handleCopyCategoryPackages = async (categoryName: string, pkgs: { command: string; isDev?: boolean }[]) => {
        const prodPkgs = pkgs.filter((p) => !p.isDev).map((p) => p.command).join(' ');
        const devPkgs = pkgs.filter((p) => p.isDev).map((p) => p.command).join(' ');

        let cmd = '';
        if (packageManager === 'npm') {
            if (prodPkgs) cmd += `npm install ${prodPkgs}\n`;
            if (devPkgs) cmd += `npm install -D ${devPkgs}`;
        } else if (packageManager === 'yarn') {
            if (prodPkgs) cmd += `yarn add ${prodPkgs}\n`;
            if (devPkgs) cmd += `yarn add -D ${devPkgs}`;
        } else if (packageManager === 'pnpm') {
            if (prodPkgs) cmd += `pnpm add ${prodPkgs}\n`;
            if (devPkgs) cmd += `pnpm add -D ${devPkgs}`;
        } else {
            if (prodPkgs) cmd += `bun add ${prodPkgs}\n`;
            if (devPkgs) cmd += `bun add -d ${devPkgs}`;
        }

        const ok = await copyToClipboard(cmd.trim());
        if (ok) {
            addToast({
                type: 'success',
                title: `Đã copy lệnh cài đặt: ${categoryName}`,
                message: 'Dán vào terminal để cài nhóm thư viện này.',
            });
        }
    };

    return (
        <div className="space-y-10 animate-fadeIn">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950/30 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-semibold">
                        <Terminal className="w-3.5 h-3.5" />
                        Hướng dẫn chạy lệnh từng bước ({packageManager.toUpperCase()})
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Khởi tạo & Cài đặt Dự án React Vite Tailwind v4
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Làm theo 8 bước tuần tự dưới đây hoặc copy nhanh toàn bộ lệnh chỉ với 1 cú click để tạo lại dự án mới hoàn chỉnh.
                    </p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => {
                            const fullScript = generateAllInOneScript(packageManager, projectName);
                            copyToClipboard(fullScript);
                            addToast({
                                type: 'success',
                                title: `Đã copy toàn bộ kịch bản 8 bước (${packageManager.toUpperCase()})`,
                                message: 'Dán vào terminal để chạy tự động toàn bộ!',
                            });
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                        <Copy className="w-4 h-4" />
                        Copy All Commands
                    </button>
                </div>
            </div>

            {/* 8 Setup Steps */}
            <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 px-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    8 Bước cài đặt chi tiết
                </h3>

                <div className="space-y-3">
                    {SETUP_STEPS.map((step) => {
                        const rawCommand = step.commands[packageManager];
                        const displayCommand = rawCommand.replace(/deepcode-web/g, projectName);
                        const isExpanded = expandedStep === step.id;

                        return (
                            <div
                                key={step.id}
                                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-700"
                            >
                                <div
                                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-lg bg-slate-800 text-orange-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                                            {step.id}
                                        </span>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                                                {step.badge && (
                                                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-orange-500/10 text-orange-400 rounded-md border border-orange-500/20">
                                                        {step.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end sm:self-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopyCommand(step.id, displayCommand, step.title);
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                                        >
                                            {copiedId === step.id ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span className="text-emerald-400">Đã copy</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" />
                                                    <span>Copy Lệnh</span>
                                                </>
                                            )}
                                        </button>

                                        <span className="text-slate-500 p-1">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Content Details */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
                                        {/* Command Box */}
                                        <div className="relative group">
                                            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-orange-400 overflow-x-auto">
                                                <code>{displayCommand}</code>
                                            </pre>
                                        </div>

                                        {/* File Content Preview if this step edits a file */}
                                        {step.fileName && step.fileContent && (
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs text-slate-400">
                                                    <span className="flex items-center gap-1.5 font-mono text-slate-300">
                                                        <FileCode className="w-3.5 h-3.5 text-orange-400" />
                                                        Nội dung file: <span className="text-orange-400">{step.fileName}</span>
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            copyToClipboard(step.fileContent || '');
                                                            addToast({
                                                                type: 'success',
                                                                title: `Đã copy nội dung ${step.fileName}`,
                                                            });
                                                        }}
                                                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <Copy className="w-3 h-3" /> Copy Code
                                                    </button>
                                                </div>
                                                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto max-h-48">
                                                    <code>{step.fileContent}</code>
                                                </pre>
                                            </div>
                                        )}

                                        {/* Helpful Tip */}
                                        {step.tip && (
                                            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-lg flex items-start gap-2.5 text-xs text-slate-300">
                                                <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                                <span>{step.tip}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Enterprise Packages Section */}
            <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <PackageCheck className="w-5 h-5 text-orange-500" />
                            Các thư viện Doanh Nghiệp nên cài đặt
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            Phân loại rõ ràng theo từng nhóm tính năng cần thiết cho một ứng dụng React Production.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ENTERPRISE_PACKAGES.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-white">{cat.category}</h4>
                                    <button
                                        onClick={() => handleCopyCategoryPackages(cat.category, cat.packages)}
                                        className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 bg-orange-500/10 px-2 py-1 rounded-md cursor-pointer"
                                    >
                                        <Copy className="w-3 h-3" /> Copy Lệnh Nhóm
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>

                                <div className="space-y-2 pt-2">
                                    {cat.packages.map((pkg, pIdx) => (
                                        <div
                                            key={pIdx}
                                            className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg flex items-start justify-between gap-2"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-xs font-bold text-orange-400 font-mono">
                                                        {pkg.name}
                                                    </code>
                                                    <span className="text-[10px] font-mono text-slate-500">{pkg.version}</span>
                                                    {pkg.isDev && (
                                                        <span className="text-[9px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-1.5 py-0.2 rounded">
                                                            dev
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-400 mt-1">{pkg.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};