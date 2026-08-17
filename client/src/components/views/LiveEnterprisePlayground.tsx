import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '../../store/useAppStore';
import dayjs from 'dayjs';
import {
    PlaySquare,
    CheckCircle2,
    AlertCircle,
    Database,
    Send,
    Calendar,
    User,
    Shield,
    RefreshCw,
} from 'lucide-react';

// Zod Schema
const demoUserSchema = z.object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: z.string().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
    role: z.enum(['admin', 'developer', 'manager']),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: 'Bạn phải đồng ý với điều khoản sử dụng',
    }),
});

type DemoFormData = z.infer<typeof demoUserSchema>;

export const LiveEnterprisePlayground: React.FC = () => {
    const { addToast } = useAppStore();

    // 1. Simulated Auth User
    const [currentUser, setCurrentUser] = useState<{
        name: string;
        email: string;
        role: string;
        token: string;
    } | null>(null);

    // 2. Simulated Axios Request State
    const [apiLoading, setApiLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<unknown>(null);

    // 3. React Hook Form + Zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DemoFormData>({
        resolver: zodResolver(demoUserSchema),
        defaultValues: {
            fullName: '',
            email: '',
            role: 'developer',
            agreeTerms: true,
        },
    });

    const onFormSubmit = async (data: DemoFormData) => {
        await new Promise((r) => setTimeout(r, 600));
        const token = `jwt_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
        setCurrentUser({
            name: data.fullName,
            email: data.email,
            role: data.role,
            token,
        });
        addToast({
            type: 'success',
            title: 'Đăng ký & Validate thành công!',
            message: `Chào mừng ${data.fullName} (${data.role}). Token đã được tạo vào Store!`,
        });
    };

    const handleSimulateAxiosCall = async (endpoint: string) => {
        setApiLoading(true);
        setApiResponse(null);

        // Simulate network latency with Axios interceptor structure
        setTimeout(() => {
            setApiLoading(false);
            const res = {
                status: 200,
                statusText: 'OK',
                headers: {
                    'content-type': 'application/json',
                    authorization: currentUser ? `Bearer ${currentUser.token}` : 'None',
                },
                data: {
                    endpoint,
                    timestamp: dayjs().toISOString(),
                    formattedTime: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    server: 'DeepCode-Vite-Backend',
                    authenticated: !!currentUser,
                    user: currentUser || { guest: true },
                    message: 'Dữ liệu trả về qua Axios Interceptor chuẩn Doanh Nghiệp',
                },
            };
            setApiResponse(res);
            addToast({
                type: 'info',
                title: `Gọi API thành công: ${endpoint}`,
                message: 'Interceptor đã tự động bắt request và response.',
            });
        }, 700);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Banner */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold mb-2">
                        <PlaySquare className="w-3.5 h-3.5" />
                        Live Enterprise Features
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        Trải nghiệm Thực tế các Thư viện Doanh Nghiệp đã tích hợp
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Dự án này đã cài đặt và cấu hình sẵn: Zustand, React Hook Form, Zod, Axios Interceptors, Dayjs và Toast.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Module 1: React Hook Form + Zod Validation */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-orange-500" />
                                <h3 className="text-sm font-bold text-white">
                                    Form Validation (React Hook Form + Zod)
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
                                zodResolver
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            Nhập thử để thấy khả năng bắt lỗi theo thời gian thực và tự động suy diễn kiểu TypeScript.
                        </p>

                        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3.5 mt-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Họ và tên *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nguyễn Văn A"
                                    {...register('fullName')}
                                    className={`w-full px-3.5 py-2 text-xs bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${errors.fullName
                                            ? 'border-rose-500 focus:ring-rose-500/20'
                                            : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                                        }`}
                                />
                                {errors.fullName && (
                                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Email công việc *
                                </label>
                                <input
                                    type="email"
                                    placeholder="nguyenvana@deepcode.dev"
                                    {...register('email')}
                                    className={`w-full px-3.5 py-2 text-xs bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${errors.email
                                            ? 'border-rose-500 focus:ring-rose-500/20'
                                            : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Vai trò (Role)
                                </label>
                                <select
                                    {...register('role')}
                                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-orange-500"
                                >
                                    <option value="developer">Developer</option>
                                    <option value="manager">Project Manager</option>
                                    <option value="admin">System Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="agreeTerms"
                                    {...register('agreeTerms')}
                                    className="w-4 h-4 rounded text-orange-500 bg-slate-950 border-slate-700 cursor-pointer"
                                />
                                <label htmlFor="agreeTerms" className="text-xs text-slate-300 cursor-pointer">
                                    Đồng ý với các điều khoản bảo mật chuẩn Doanh nghiệp
                                </label>
                            </div>
                            {errors.agreeTerms && (
                                <p className="text-[11px] text-rose-400 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {errors.agreeTerms.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="w-4 h-4" />
                                )}
                                Submit & Lưu vào Store
                            </button>
                        </form>
                    </div>

                    {currentUser && (
                        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                            <User className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-emerald-300">
                                    Đã đăng nhập: {currentUser.name} ({currentUser.role})
                                </div>
                                <div className="text-[11px] font-mono text-emerald-400/80 truncate mt-0.5">
                                    Token: {currentUser.token}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Module 2: Axios Client & Mock Interceptor */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <Database className="w-5 h-5 text-sky-400" />
                                <h3 className="text-sm font-bold text-white">
                                    Axios Interceptor & API Client
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">
                                Bearer Auth Auto-Attach
                            </span>
                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                            Kiểm tra việc gửi request qua Axios Client với token authorization tự động.
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                onClick={() => handleSimulateAxiosCall('/api/v1/user/profile')}
                                disabled={apiLoading}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5 text-sky-400" />
                                GET /user/profile
                            </button>

                            <button
                                onClick={() => handleSimulateAxiosCall('/api/v1/dashboard/metrics')}
                                disabled={apiLoading}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5 text-amber-400" />
                                GET /dashboard/metrics
                            </button>
                        </div>

                        {/* API Result Box */}
                        <div className="mt-4">
                            <div className="text-xs font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                                <span>Response Payload:</span>
                                {apiLoading && (
                                    <span className="text-orange-400 flex items-center gap-1 text-[11px]">
                                        <RefreshCw className="w-3 h-3 animate-spin" /> Đang tải...
                                    </span>
                                )}
                            </div>
                            <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                                <code>
                                    {apiResponse
                                        ? JSON.stringify(apiResponse, null, 2)
                                        : '// Nhấp vào một trong các nút bên trên để giả lập gọi API qua Axios Client'}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* Date formatting with Dayjs */}
                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            Dayjs format hiện tại:
                        </span>
                        <span className="font-mono text-orange-400 font-semibold">
                            {dayjs().format('DD/MM/YYYY - HH:mm:ss')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};