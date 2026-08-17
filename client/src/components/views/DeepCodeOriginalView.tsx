import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { copyToClipboard } from '../../utils/cn';
import { generateAllInOneScript } from '../../constants/starterData';
import {
    Terminal,
    FolderTree,
    Play,
    CheckCircle,
    Copy,
    ArrowRight,
    ShieldCheck,
    Zap,
    Code,
} from 'lucide-react';

export const DeepCodeOriginalView: React.FC = () => {
    const { packageManager, projectName, setProjectName, setActiveTab, addToast } = useAppStore();

    const handleCopy = async (text: string, title: string) => {
        const ok = await copyToClipboard(text);
        if (ok) {
            addToast({
                type: 'success',
                title: `Đã copy: ${title}`,
                message: 'Lệnh đã sẵn sàng để dán vào terminal của bạn.',
            });
        }
    };

    const quickCommands = [
        {
            title: '1. Khởi tạo Project',
            cmd:
                packageManager === 'npm'
                    ? `npm create vite@latest ${projectName} -- --template react-ts`
                    : packageManager === 'yarn'
                        ? `yarn create vite ${projectName} --template react-ts`
                        : packageManager === 'pnpm'
                            ? `pnpm create vite ${projectName} --template react-ts`
                            : `bun create vite ${projectName} --template react-ts`,
        },
        {
            title: '2. Cài Tailwind v4 & Vite Plugin',
            cmd:
                packageManager === 'npm'
                    ? 'npm install tailwindcss @tailwindcss/vite'
                    : packageManager === 'yarn'
                        ? 'yarn add tailwindcss @tailwindcss/vite'
                        : packageManager === 'pnpm'
                            ? 'pnpm add tailwindcss @tailwindcss/vite'
                            : 'bun add tailwindcss @tailwindcss/vite',
        },
        {
            title: '3. Cài Bộ thư viện Doanh Nghiệp',
            cmd:
                packageManager === 'npm'
                    ? 'npm install react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion'
                    : packageManager === 'yarn'
                        ? 'yarn add react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion'
                        : packageManager === 'pnpm'
                            ? 'pnpm add react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion'
                            : 'bun add react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion',
        },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* 1. Exact Original Visual Output Preview */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-900/60">
                <div className="bg-slate-900 border-b border-slate-800 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                        <span className="text-xs font-mono text-slate-400 ml-2">
                            Preview kết quả chạy App.tsx gốc (http://localhost:5173)
                        </span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Tailwind v4 Active
                    </span>
                </div>

                {/* The Exact Render Box specified by the user */}
                <div className="p-8 sm:p-14 bg-gray-100 flex flex-col items-center justify-center text-center transition-all min-h-[220px] rounded-b-2xl">
                    <h1 className="text-3xl sm:text-5xl font-bold text-orange-500 tracking-tight drop-shadow-sm">
                        DeepCode React + Vite + TailwindCSS
                    </h1>
                    <p className="mt-3 text-sm text-gray-500 font-medium">
                        ✅ Tailwind CSS v4 (@tailwindcss/vite) đã biên dịch thành công 100%!
                    </p>
                </div>
            </div>

            {/* 2. Quick Setup & Re-creation Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 cols: Quick Project Generator Box */}
                <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-orange-500" />
                                Tái tạo dự án mới ngay lập tức
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Nhập tên dự án và copy các lệnh terminal đã được tự động chuẩn hóa.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-xs font-medium text-slate-400">Tên thư mục:</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value || 'deepcode-web')}
                                className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-orange-400 font-mono focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    {/* Quick command snippets */}
                    <div className="space-y-3">
                        {quickCommands.map((qc, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-slate-700 transition-colors"
                            >
                                <div className="space-y-1 min-w-0">
                                    <div className="text-xs font-semibold text-slate-300">{qc.title}</div>
                                    <div className="font-mono text-xs text-orange-400/90 truncate max-w-xl">
                                        {qc.cmd}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(qc.cmd, qc.title)}
                                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors active:scale-95 cursor-pointer"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* All in one CTA */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <button
                            onClick={() => {
                                const fullScript = generateAllInOneScript(packageManager, projectName);
                                handleCopy(fullScript, `Toàn bộ kịch bản ${packageManager.toUpperCase()}`);
                            }}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                        >
                            <Copy className="w-4 h-4" />
                            Copy Toàn bộ Lệnh (1-Click Run)
                        </button>

                        <button
                            onClick={() => setActiveTab('cli-guide')}
                            className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                        >
                            <span>Xem chi tiết 8 bước hướng dẫn</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right 1 col: Key Features Summary */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Đặc điểm kiến trúc mới (2026)
                        </h3>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                                <span><strong>Tailwind CSS v4:</strong> Tối ưu hiệu năng 5x, không cần file config js phức tạp.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                                <span><strong>Zustand Store:</strong> Quản lý state nhẹ, lưu cache localStorage an toàn.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                                <span><strong>React Hook Form + Zod:</strong> Validate form bảo vệ kiểu dữ liệu TypeScript.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                                <span><strong>Axios Interceptor:</strong> Tự động gắn Bearer JWT token và bắt mã lỗi 401.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                        <div className="text-xs font-semibold text-slate-200 mb-1">Thử nghiệm module:</div>
                        <p className="text-xs text-slate-400 mb-3">
                            Bạn có thể thử nghiệm ngay giao diện Login, Axios client và State store thực tế bên dưới.
                        </p>
                        <button
                            onClick={() => setActiveTab('live-demo')}
                            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Mở Live Playground
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Section Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div
                    onClick={() => setActiveTab('cli-guide')}
                    className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 p-5 rounded-2xl cursor-pointer transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                        Chi tiết 8 bước lệnh CLI
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Xem từng bước khởi tạo từ `create-vite` đến cấu hình `vite.config.ts` và `index.css`.
                    </p>
                </div>

                <div
                    onClick={() => setActiveTab('project-tree')}
                    className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 p-5 rounded-2xl cursor-pointer transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <FolderTree className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        Cấu trúc thư mục & Code mẫu
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Trình xem file trực quan: services, store, components, hooks, types với mã nguồn hoàn chỉnh.
                    </p>
                </div>

                <div
                    onClick={() => setActiveTab('script-generator')}
                    className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 p-5 rounded-2xl cursor-pointer transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Code className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                        Xuất Script tự động (Bash/PowerShell)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Tạo sẵn file script `setup.sh` hoặc `setup.ps1` để chạy tự động tạo tất cả thư mục và file.
                    </p>
                </div>
            </div>
        </div>
    );
};