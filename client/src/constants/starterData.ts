import type { SetupStep, ProjectFileItem, PackageCategory, PackageManager } from '../types';

export const SETUP_STEPS: SetupStep[] = [
  {
    id: 1,
    title: '1. Tạo project React + Vite + TypeScript',
    description: 'Khởi tạo cấu trúc template cơ bản với Vite và TypeScript nhanh chóng.',
    badge: 'Khởi tạo ban đầu',
    commands: {
      npm: 'npm create vite@latest deepcode-web -- --template react-ts',
      yarn: 'yarn create vite deepcode-web --template react-ts',
      pnpm: 'pnpm create vite deepcode-web --template react-ts',
      bun: 'bun create vite deepcode-web --template react-ts',
    },
    tip: 'Lệnh này sẽ tạo thư mục deepcode-web chứa khung dự án Vite + React 19 + TypeScript.',
  },
  {
    id: 2,
    title: '2. Di chuyển vào thư mục dự án',
    description: 'Chuyển đường dẫn terminal vào thư mục project vừa tạo.',
    commands: {
      npm: 'cd deepcode-web',
      yarn: 'cd deepcode-web',
      pnpm: 'cd deepcode-web',
      bun: 'cd deepcode-web',
    },
  },
  {
    id: 3,
    title: '3. Cài đặt các package cơ bản',
    description: 'Tải và cài đặt tất cả dependencies ban đầu từ package.json.',
    commands: {
      npm: 'npm install',
      yarn: 'yarn install',
      pnpm: 'pnpm install',
      bun: 'bun install',
    },
  },
  {
    id: 4,
    title: '4. Cài Tailwind CSS (phiên bản v4 mới nhất)',
    description: 'Cài đặt tailwindcss và plugin chính thức @tailwindcss/vite cho Vite.',
    badge: 'Tailwind v4 Setup',
    commands: {
      npm: 'npm install tailwindcss @tailwindcss/vite',
      yarn: 'yarn add tailwindcss @tailwindcss/vite',
      pnpm: 'pnpm add tailwindcss @tailwindcss/vite',
      bun: 'bun add tailwindcss @tailwindcss/vite',
    },
    tip: 'Tailwind v4 không còn cần tailwind.config.js hay postcss.config.js nữa! Plugin @tailwindcss/vite sẽ tự động xử lý trực tiếp.',
  },
  {
    id: 5,
    title: '5. Cấu hình Vite (vite.config.ts)',
    description: 'Khai báo plugin tailwindcss() trong mảng plugins của file cấu hình Vite.',
    fileName: 'vite.config.ts',
    commands: {
      npm: '# Mở file vite.config.ts và cập nhật nội dung bên dưới',
      yarn: '# Mở file vite.config.ts và cập nhật nội dung bên dưới',
      pnpm: '# Mở file vite.config.ts và cập nhật nội dung bên dưới',
      bun: '# Mở file vite.config.ts và cập nhật nội dung bên dưới',
    },
    fileContent: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`,
  },
  {
    id: 6,
    title: '6. Import Tailwind vào src/index.css',
    description: 'Xóa toàn bộ nội dung mặc định của src/index.css và thêm 1 dòng duy nhất.',
    fileName: 'src/index.css',
    commands: {
      npm: 'echo \'@import "tailwindcss";\' > src/index.css',
      yarn: 'echo \'@import "tailwindcss";\' > src/index.css',
      pnpm: 'echo \'@import "tailwindcss";\' > src/index.css',
      bun: 'echo \'@import "tailwindcss";\' > src/index.css',
    },
    fileContent: `@import "tailwindcss";`,
    tip: 'Tailwind v4 sử dụng cú pháp CSS-first chuẩn `@import "tailwindcss";`.',
  },
  {
    id: 7,
    title: '7. Kiểm tra giao diện mẫu trong App.tsx',
    description: 'Thêm đoạn mã demo sử dụng utility classes của Tailwind để xác nhận cài đặt thành công.',
    fileName: 'src/App.tsx',
    commands: {
      npm: '# Cập nhật src/App.tsx với nội dung test',
      yarn: '# Cập nhật src/App.tsx với nội dung test',
      pnpm: '# Cập nhật src/App.tsx với nội dung test',
      bun: '# Cập nhật src/App.tsx với nội dung test',
    },
    fileContent: `function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-orange-500">
        DeepCode React + Vite + TailwindCSS
      </h1>
    </div>
  );
}

export default App;`,
  },
  {
    id: 8,
    title: '8. Chạy Development Server',
    description: 'Khởi động môi trường phát triển cục bộ và mở trình duyệt để xem kết quả.',
    badge: 'Chạy dự án',
    commands: {
      npm: 'npm run dev',
      yarn: 'yarn dev',
      pnpm: 'pnpm dev',
      bun: 'bun dev',
    },
    tip: 'Truy cập cổng mặc định: http://localhost:5173 (hoặc port được cấp trên terminal).',
  },
];

export const ENTERPRISE_PACKAGES: PackageCategory[] = [
  {
    category: 'State Management & Store',
    description: 'Quản lý state toàn cục nhẹ nhàng, hiệu năng cao và không boilerplate rườm rà',
    packages: [
      {
        name: 'zustand',
        description: 'Thư viện quản lý state nhỏ gọn (~1kB), cực kỳ dễ dùng và tối ưu cho React',
        version: '^5.0.0',
        command: 'zustand',
        recommended: true,
      },
    ],
  },
  {
    category: 'Routing & Navigation',
    description: 'Điều hướng đa trang chuyên nghiệp và bảo vệ route',
    packages: [
      {
        name: 'react-router-dom',
        description: 'Bộ định tuyến tiêu chuẩn cho Single Page Applications',
        version: '^7.0.0',
        command: 'react-router-dom',
        recommended: true,
      },
    ],
  },
  {
    category: 'Form Handling & Data Validation',
    description: 'Quản lý form phức tạp và kiểm tra tính hợp lệ kiểu dữ liệu với TypeScript',
    packages: [
      {
        name: 'react-hook-form',
        description: 'Hiệu suất cao, giảm số lần re-render, hỗ trợ uncontrolled inputs',
        version: '^7.54.0',
        command: 'react-hook-form',
        recommended: true,
      },
      {
        name: 'zod',
        description: 'Schema declaration and TypeScript-first validation library',
        version: '^3.24.0',
        command: 'zod',
        recommended: true,
      },
      {
        name: '@hookform/resolvers',
        description: 'Cầu nối tích hợp Zod schema trực tiếp vào React Hook Form',
        version: '^3.10.0',
        command: '@hookform/resolvers',
        recommended: true,
      },
    ],
  },
  {
    category: 'API, Network & Server State',
    description: 'Giao tiếp HTTP, tự động đính kèm token, refresh token và cache dữ liệu',
    packages: [
      {
        name: 'axios',
        description: 'HTTP Client với interceptors, cancel tokens và chuyển đổi dữ liệu tự động',
        version: '^1.7.0',
        command: 'axios',
        recommended: true,
      },
      {
        name: '@tanstack/react-query',
        description: 'Quản lý server state, caching, refetching và optimistic updates đỉnh cao',
        version: '^5.66.0',
        command: '@tanstack/react-query',
        recommended: true,
      },
    ],
  },
  {
    category: 'UI, Icons & Notification',
    description: 'Giao diện mượt mà, thông báo tức thì và icon hiện đại',
    packages: [
      {
        name: 'lucide-react',
        description: 'Bộ sưu tập hơn 1000+ vector icons sắc nét và tùy biến cao',
        version: '^0.475.0',
        command: 'lucide-react',
        recommended: true,
      },
      {
        name: 'react-hot-toast',
        description: 'Thông báo popup Toast nhẹ nhàng, bắt mắt, không cần config phức tạp',
        version: '^2.5.0',
        command: 'react-hot-toast',
        recommended: true,
      },
      {
        name: 'clsx & tailwind-merge',
        description: 'Ghép nối class linh hoạt và giải quyết xung đột CSS classes trong Tailwind',
        version: '^2.1.0',
        command: 'clsx tailwind-merge',
        recommended: true,
      },
      {
        name: 'motion',
        description: 'Thư viện animation mượt mà cho React layout transitions và gesture',
        version: '^12.0.0',
        command: 'motion',
        recommended: true,
      },
    ],
  },
  {
    category: 'Date, JWT & Security Utilities',
    description: 'Xử lý ngày tháng, decode token xác thực người dùng',
    packages: [
      {
        name: 'dayjs',
        description: 'Thay thế siêu nhẹ cho Moment.js với đầy đủ plugins định dạng thời gian',
        version: '^1.11.0',
        command: 'dayjs',
        recommended: true,
      },
      {
        name: 'jwt-decode',
        description: 'Giải mã JWT payload an toàn tại phía client mà không cần private key',
        version: '^4.0.0',
        command: 'jwt-decode',
        recommended: true,
      },
    ],
  },
  {
    category: 'Developer Tooling & Code Quality (Dev)',
    description: 'Định dạng code tự động và bắt lỗi cú pháp thống nhất',
    packages: [
      {
        name: 'eslint & prettier plugins',
        description: 'Bộ cấu hình linting và auto formatting chuẩn công nghiệp cho nhóm',
        version: 'latest',
        command: 'eslint prettier eslint-config-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh',
        isDev: true,
        recommended: true,
      },
    ],
  },
];

export const PROJECT_STRUCTURE_TREE: ProjectFileItem = {
  id: 'root',
  name: 'deepcode-web',
  path: '/',
  type: 'folder',
  children: [
    {
      id: 'src',
      name: 'src',
      path: 'src',
      type: 'folder',
      children: [
        {
          id: 'src/assets',
          name: 'assets',
          path: 'src/assets',
          type: 'folder',
          description: 'Chứa hình ảnh, logo, svg, icons tĩnh',
          children: [
            {
              id: 'src/assets/logo.svg',
              name: 'logo.svg',
              path: 'src/assets/logo.svg',
              type: 'file',
              language: 'xml',
              content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="m18 16 4-4-4-4"/>
  <path d="m6 8-4 4 4 4"/>
  <path d="m14.5 4-5 16"/>
</svg>`,
            },
          ],
        },
        {
          id: 'src/components',
          name: 'components',
          path: 'src/components',
          type: 'folder',
          description: 'Các components tái sử dụng trong toàn bộ ứng dụng',
          children: [
            {
              id: 'src/components/common',
              name: 'common',
              path: 'src/components/common',
              type: 'folder',
              description: 'Component dùng chung: Pagination, SearchBar, EmptyState...',
              children: [
                {
                  id: 'src/components/common/EmptyState.tsx',
                  name: 'EmptyState.tsx',
                  path: 'src/components/common/EmptyState.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không có dữ liệu',
  description = 'Chưa có bản ghi nào để hiển thị trong mục này.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl">
      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};`,
                },
              ],
            },
            {
              id: 'src/components/layout',
              name: 'layout',
              path: 'src/components/layout',
              type: 'folder',
              description: 'Khung bố cục: Header, Sidebar, Footer, Breadcrumbs...',
              children: [
                {
                  id: 'src/components/layout/Header.tsx',
                  name: 'Header.tsx',
                  path: 'src/components/layout/Header.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg text-white">
          Deep<span className="text-orange-500">Code</span> Hub
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-9 pr-4 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-orange-500 w-64"
          />
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-medium">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-slate-200">Admin</span>
        </div>
      </div>
    </header>
  );
};`,
                },
              ],
            },
            {
              id: 'src/components/ui',
              name: 'ui',
              path: 'src/components/ui',
              type: 'folder',
              description: 'UI Atomic primitives: Button, Input, Modal, Badge, Dropdown...',
              children: [
                {
                  id: 'src/components/ui/Button.tsx',
                  name: 'Button.tsx',
                  path: 'src/components/ui/Button.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
      outline: 'border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white',
      ghost: 'hover:bg-slate-800/80 text-slate-400 hover:text-white',
      danger: 'bg-rose-600 hover:bg-rose-700 text-white',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-5 py-2.5 text-base rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';`,
                },
                {
                  id: 'src/components/ui/Input.tsx',
                  name: 'Input.tsx',
                  path: 'src/components/ui/Input.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-slate-300 tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3.5 py-2 text-sm bg-slate-900 border rounded-lg text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-2',
            error
              ? 'border-rose-500/80 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-slate-800 focus:border-orange-500 focus:ring-orange-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';`,
                },
              ],
            },
          ],
        },
        {
          id: 'src/features',
          name: 'features',
          path: 'src/features',
          type: 'folder',
          description: 'Module chia theo nghiệp vụ chức năng (Auth, Products, Users...)',
          children: [
            {
              id: 'src/features/auth',
              name: 'auth',
              path: 'src/features/auth',
              type: 'folder',
              children: [
                {
                  id: 'src/features/auth/LoginForm.tsx',
                  name: 'LoginForm.tsx',
                  path: 'src/features/auth/LoginForm.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/useAuthStore';

const loginSchema = z.object({
  email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm w-full mx-auto">
      <Input
        label="Email công việc"
        type="email"
        placeholder="you@company.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Đăng nhập vào hệ thống
      </Button>
    </form>
  );
};`,
                },
              ],
            },
          ],
        },
        {
          id: 'src/hooks',
          name: 'hooks',
          path: 'src/hooks',
          type: 'folder',
          description: 'Custom React Hooks (useDebounce, useMediaQuery, useLocalStorage...)',
          children: [
            {
              id: 'src/hooks/useDebounce.ts',
              name: 'useDebounce.ts',
              path: 'src/hooks/useDebounce.ts',
              type: 'file',
              language: 'typescript',
              content: `import { useState, useEffect } from 'react';

/**
 * Hook làm chậm việc cập nhật giá trị (thích hợp cho ô search gọi API)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
            },
          ],
        },
        {
          id: 'src/layouts',
          name: 'layouts',
          path: 'src/layouts',
          type: 'folder',
          description: 'Cấu trúc layout chính: MainLayout, AuthLayout, DashboardLayout...',
          children: [
            {
              id: 'src/layouts/MainLayout.tsx',
              name: 'MainLayout.tsx',
              path: 'src/layouts/MainLayout.tsx',
              type: 'file',
              language: 'typescript',
              content: `import React from 'react';
import { Header } from '../components/layout/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 DeepCode Architecture. All rights reserved.
      </footer>
    </div>
  );
};`,
            },
          ],
        },
        {
          id: 'src/pages',
          name: 'pages',
          path: 'src/pages',
          type: 'folder',
          description: 'Các màn hình tương ứng với từng URL (Home, Dashboard, Settings...)',
          children: [
            {
              id: 'src/pages/HomePage.tsx',
              name: 'HomePage.tsx',
              path: 'src/pages/HomePage.tsx',
              type: 'file',
              language: 'typescript',
              content: `import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { LoginForm } from '../features/auth/LoginForm';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">
          Deep<span className="text-orange-500">Code</span> Enterprise Starter
        </h1>
        <p className="text-slate-400 mb-8 max-w-md">
          Khung dự án chuẩn hoá React 19, Vite, TypeScript và Tailwind CSS v4.
        </p>

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Đăng nhập tài khoản</h2>
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
};`,
            },
          ],
        },
        {
          id: 'src/routes',
          name: 'routes',
          path: 'src/routes',
          type: 'folder',
          description: 'Cấu hình route cho React Router (Public & Protected Routes)',
          children: [
            {
              id: 'src/routes/AppRoutes.tsx',
              name: 'AppRoutes.tsx',
              path: 'src/routes/AppRoutes.tsx',
              type: 'file',
              language: 'typescript',
              content: `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<div className="p-8 text-center text-slate-400">404 - Không tìm thấy trang</div>} />
    </Routes>
  );
};`,
            },
          ],
        },
        {
          id: 'src/services',
          name: 'services',
          path: 'src/services',
          type: 'folder',
          description: 'Tầng gọi API, Interceptor và xử lý dữ liệu backend',
          children: [
            {
              id: 'src/services/api',
              name: 'api',
              path: 'src/services/api',
              type: 'folder',
              children: [
                {
                  id: 'src/services/api/axiosClient.ts',
                  name: 'axiosClient.ts',
                  path: 'src/services/api/axiosClient.ts',
                  type: 'file',
                  language: 'typescript',
                  content: `import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.deepcode.dev/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm Bearer Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Xử lý lỗi toàn cục và Refresh Token nếu 401
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Logic refresh token hoặc chuyển hướng về trang login
      console.warn('Phiên đăng nhập hết hạn!');
    }
    return Promise.reject(error);
  }
);`,
                },
              ],
            },
            {
              id: 'src/services/auth',
              name: 'auth',
              path: 'src/services/auth',
              type: 'folder',
              children: [
                {
                  id: 'src/services/auth/authService.ts',
                  name: 'authService.ts',
                  path: 'src/services/auth/authService.ts',
                  type: 'file',
                  language: 'typescript',
                  content: `import { axiosClient } from '../api/axiosClient';
import { User, LoginCredentials, AuthResponse } from '../../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Gọi API login thực tế:
    // return axiosClient.post('/auth/login', credentials);

    // Giả lập mock response cho starter
    await new Promise((res) => setTimeout(res, 800));
    return {
      user: {
        id: 'usr_01',
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'admin',
      },
      token: 'jwt_mock_token_secret_123456',
    };
  },

  getCurrentUser: async (): Promise<User> => {
    return axiosClient.get('/auth/me');
  },
};`,
                },
              ],
            },
          ],
        },
        {
          id: 'src/store',
          name: 'store',
          path: 'src/store',
          type: 'folder',
          description: 'Zustand Global State Stores',
          children: [
            {
              id: 'src/store/useAuthStore.ts',
              name: 'useAuthStore.ts',
              path: 'src/store/useAuthStore.ts',
              type: 'file',
              language: 'typescript',
              content: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/auth/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await authService.login({ email, password });
          set({
            user: res.user,
            token: res.token,
            isAuthenticated: true,
            isLoading: false,
          });
          localStorage.setItem('access_token', res.token);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('access_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);`,
            },
          ],
        },
        {
          id: 'src/types',
          name: 'types',
          path: 'src/types',
          type: 'folder',
          description: 'Định nghĩa TypeScript interfaces, types & enums toàn cục',
          children: [
            {
              id: 'src/types/auth.ts',
              name: 'auth.ts',
              path: 'src/types/auth.ts',
              type: 'file',
              language: 'typescript',
              content: `export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}`,
            },
          ],
        },
        {
          id: 'src/utils',
          name: 'utils',
          path: 'src/utils',
          type: 'folder',
          description: 'Hàm tiện ích dùng chung (format tiền, ngày tháng, cn...)',
          children: [
            {
              id: 'src/utils/cn.ts',
              name: 'cn.ts',
              path: 'src/utils/cn.ts',
              type: 'file',
              language: 'typescript',
              content: `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
            },
            {
              id: 'src/utils/formatDate.ts',
              name: 'formatDate.ts',
              path: 'src/utils/formatDate.ts',
              type: 'file',
              language: 'typescript',
              content: `import dayjs from 'dayjs';

export function formatDate(date: string | Date | number, format = 'DD/MM/YYYY HH:mm'): string {
  if (!date) return '-';
  return dayjs(date).format(format);
}`,
            },
          ],
        },
        {
          id: 'src/constants',
          name: 'constants',
          path: 'src/constants',
          type: 'folder',
          description: 'Chứa hằng số cố định, regex, routes name, API endpoints',
          children: [
            {
              id: 'src/constants/api.ts',
              name: 'api.ts',
              path: 'src/constants/api.ts',
              type: 'file',
              language: 'typescript',
              content: `export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  USERS: '/users',
  PRODUCTS: '/products',
} as const;

export const APP_CONFIG = {
  SITE_NAME: 'DeepCode Web',
  PAGE_SIZE: 20,
};`,
            },
          ],
        },
        {
          id: 'src/styles',
          name: 'styles',
          path: 'src/styles',
          type: 'folder',
          description: 'Biến CSS custom, keyframes animation đặc thù',
          children: [
            {
              id: 'src/styles/custom.css',
              name: 'custom.css',
              path: 'src/styles/custom.css',
              type: 'file',
              language: 'css',
              content: `/* Custom utility CSS if needed alongside Tailwind v4 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.2);
  border-radius: 4px;
}`,
            },
          ],
        },
        {
          id: 'src/App.tsx',
          name: 'App.tsx',
          path: 'src/App.tsx',
          type: 'file',
          language: 'typescript',
          content: `function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-orange-500">
        DeepCode React + Vite + TailwindCSS
      </h1>
    </div>
  );
}

export default App;`,
        },
        {
          id: 'src/main.tsx',
          name: 'main.tsx',
          path: 'src/main.tsx',
          type: 'file',
          language: 'typescript',
          content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
        },
        {
          id: 'src/index.css',
          name: 'index.css',
          path: 'src/index.css',
          type: 'file',
          language: 'css',
          content: `@import "tailwindcss";`,
        },
      ],
    },
    {
      id: 'vite.config.ts',
      name: 'vite.config.ts',
      path: 'vite.config.ts',
      type: 'file',
      language: 'typescript',
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});`,
    },
    {
      id: 'tsconfig.json',
      name: 'tsconfig.json',
      path: 'tsconfig.json',
      type: 'file',
      language: 'json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noEmit": true
  },
  "include": ["src"]
}`,
    },
    {
      id: 'package.json',
      name: 'package.json',
      path: 'package.json',
      type: 'file',
      language: 'json',
      content: `{
  "name": "deepcode-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@tailwindcss/vite": "^4.1.14",
    "@tanstack/react-query": "^5.66.0",
    "axios": "^1.7.9",
    "clsx": "^2.1.1",
    "dayjs": "^1.11.13",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^0.475.0",
    "motion": "^12.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.2",
    "react-router-dom": "^7.1.5",
    "tailwind-merge": "^3.0.1",
    "zod": "^3.24.2",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@types/node": "^22.13.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.19.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "prettier": "^3.4.2",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.0",
    "vite": "^6.2.0"
  }
}`,
    },
    {
      id: '.env.example',
      name: '.env.example',
      path: '.env.example',
      type: 'file',
      language: 'shell',
      content: `# API Base URL
VITE_API_URL=https://api.deepcode.dev/v1

# App Environment
VITE_APP_ENV=development
VITE_ENABLE_ANALYTICS=false`,
    },
  ],
};

export function getAllFileIds(item: ProjectFileItem): string[] {
  const ids: string[] = [];
  if (item.type === 'folder') {
    ids.push(item.id);
    if (item.children) {
      item.children.forEach((child) => {
        ids.push(...getAllFileIds(child));
      });
    }
  }
  return ids;
}

export function findFileById(tree: ProjectFileItem, id: string): ProjectFileItem | null {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findFileById(child, id);
      if (found) return found;
    }
  }
  return null;
}

export function generateAllInOneScript(pm: PackageManager, projectName: string = 'deepcode-web'): string {
  if (pm === 'yarn') {
    return `# 1. Tạo project
yarn create vite ${projectName} --template react-ts
cd ${projectName}

# 2. Cài đặt Tailwind CSS v4
yarn add tailwindcss @tailwindcss/vite

# 3. Cài đặt các thư viện doanh nghiệp
yarn add react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion

# 4. Cài đặt dev dependencies
yarn add -D @types/node eslint prettier eslint-plugin-react-hooks eslint-plugin-react-refresh

# 5. Cấu hình Tailwind trong index.css
echo '@import "tailwindcss";' > src/index.css

# 6. Khởi động dự án
yarn dev`;
  }

  if (pm === 'pnpm') {
    return `# 1. Tạo project
pnpm create vite ${projectName} --template react-ts
cd ${projectName}

# 2. Cài đặt Tailwind CSS v4
pnpm add tailwindcss @tailwindcss/vite

# 3. Cài đặt các thư viện doanh nghiệp
pnpm add react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion

# 4. Cài đặt dev dependencies
pnpm add -D @types/node eslint prettier eslint-plugin-react-hooks eslint-plugin-react-refresh

# 5. Cấu hình Tailwind trong index.css
echo '@import "tailwindcss";' > src/index.css

# 6. Khởi động dự án
pnpm dev`;
  }

  if (pm === 'bun') {
    return `# 1. Tạo project
bun create vite ${projectName} --template react-ts
cd ${projectName}

# 2. Cài đặt Tailwind CSS v4
bun add tailwindcss @tailwindcss/vite

# 3. Cài đặt các thư viện doanh nghiệp
bun add react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion

# 4. Cài đặt dev dependencies
bun add -d @types/node eslint prettier eslint-plugin-react-hooks eslint-plugin-react-refresh

# 5. Cấu hình Tailwind trong index.css
echo '@import "tailwindcss";' > src/index.css

# 6. Khởi động dự án
bun dev`;
  }

  // Default: npm
  return `# 1. Tạo project với template react-ts
npm create vite@latest ${projectName} -- --template react-ts
cd ${projectName}

# 2. Cài đặt dependencies ban đầu
npm install

# 3. Cài đặt Tailwind CSS v4 và Vite plugin
npm install tailwindcss @tailwindcss/vite

# 4. Cài đặt bộ thư viện Doanh Nghiệp (Enterprise Full-pack)
npm install react-router-dom axios zustand @tanstack/react-query react-hook-form zod @hookform/resolvers react-hot-toast lucide-react dayjs clsx tailwind-merge jwt-decode motion

# 5. Cài đặt Dev dependencies cho Lint & Type
npm install -D @types/node eslint prettier eslint-plugin-react-hooks eslint-plugin-react-refresh

# 6. Cấu hình Tailwind trong index.css
echo '@import "tailwindcss";' > src/index.css

# 7. Khởi động dự án
npm run dev`;
}