import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import type { PackageManager, ActiveTab } from '../../types';
import { copyToClipboard } from '../../utils/cn';
import { generateAllInOneScript } from '../../constants/starterData';
import {
    Code2,
    Terminal,
    FolderTree,
    PlaySquare,
    FileCode2,
    Copy,
    Layers,
} from 'lucide-react';

export const Header: React.FC = () => {
    const {
        packageManager,
        setPackageManager,
        activeTab,
        setActiveTab,
        projectName,
        addToast,
    } = useAppStore();

    const handleCopyOneClickScript = async () => {
        const script = generateAllInOneScript(packageManager, projectName);
        const ok = await copyToClipboard(script);
        if (ok) {
            addToast({
                type: 'success',
                title: `Đã copy toàn bộ lệnh (${packageManager.toUpperCase()})`,
                message: 'Bạn có thể dán trực tiếp vào Terminal để tạo dự án ngay lập tức!',
            });
        }
    };

    const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
        { id: 'overview', label: '1. Bản gốc & Demo App', icon: <Layers className="w-4 h-4" /> },
        { id: 'cli-guide', label: '2. Các bước chạy lệnh CLI', icon: <Terminal className="w-4 h-4" /> },
        { id: 'project-tree', label: '3. Cấu trúc Code Doanh nghiệp', icon: <FolderTree className="w-4 h-4" /> },
        { id: 'live-demo', label: '4. Trải nghiệm tính năng thực tế', icon: <PlaySquare className="w-4 h-4" /> },
        { id: 'script-generator', label: '5. Xuất Script 1-Click', icon: <FileCode2 className="w-4 h-4" /> },
    ];

    return (
        <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-black text-xl">
                        <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-extrabold text-lg tracking-tight text-white">
                                Deep<span className="text-orange-500">Code</span>
                            </span>
                            <span className="px-2 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
                                React 19 + Vite + Tailwind v4
                            </span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Kiến trúc dự án chuẩn Doanh nghiệp & Bộ khởi tạo tự động
                        </p>
                    </div>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-lg">
                        <span className="text-xs font-medium text-slate-400 px-2 hidden sm:inline">CLI:</span>
                        {(['npm', 'yarn', 'pnpm', 'bun'] as PackageManager[]).map((pm) => (
                            <button
                                key={pm}
                                onClick={() => {
                                    setPackageManager(pm);
                                    addToast({
                                        type: 'info',
                                        title: `Chuyển sang ${pm.toUpperCase()}`,
                                        message: `Tất cả câu lệnh cài đặt đã được chuyển sang cú pháp của ${pm}.`,
                                    });
                                }}
                                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${packageManager === pm
                                        ? 'bg-orange-500 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {pm}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleCopyOneClickScript}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-semibold rounded-lg shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Script</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-900 pt-1">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${isActive
                                    ? 'border-orange-500 text-orange-400 bg-orange-500/5'
                                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </header>
    );
};