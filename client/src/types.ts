export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export type ActiveTab = 'overview' | 'cli-guide' | 'project-tree' | 'live-demo' | 'script-generator';

export interface SetupStep {
    id: number;
    title: string;
    description: string;
    commands: Record<PackageManager, string>;
    fileName?: string;
    fileContent?: string;
    tip?: string;
    badge?: string;
}

export interface ProjectFileItem {
    id: string;
    name: string;
    path: string;
    type: 'file' | 'folder';
    children?: ProjectFileItem[];
    language?: string;
    content?: string;
    description?: string;
    isEnterprise?: boolean;
}

export interface PackageCategory {
    category: string;
    description: string;
    packages: {
        name: string;
        description: string;
        version: string;
        command: string;
        isDev?: boolean;
        recommended: boolean;
    }[];
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    message?: string;
}

export interface User {
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
}