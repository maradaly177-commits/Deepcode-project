import { create } from 'zustand';
import type { PackageManager, ActiveTab, ToastMessage } from '../types';

interface AppState {
    packageManager: PackageManager;
    activeTab: ActiveTab;
    projectName: string;
    selectedFileId: string;
    toasts: ToastMessage[];
    expandedFolderIds: string[];

    // Actions
    setPackageManager: (pm: PackageManager) => void;
    setActiveTab: (tab: ActiveTab) => void;
    setProjectName: (name: string) => void;
    setSelectedFileId: (fileId: string) => void;
    toggleFolder: (folderId: string) => void;
    expandAllFolders: (folderIds: string[]) => void;
    collapseAllFolders: () => void;
    addToast: (toast: Omit<ToastMessage, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    packageManager: 'npm',
    activeTab: 'overview',
    projectName: 'deepcode-web',
    selectedFileId: 'src/App.tsx',
    toasts: [],
    expandedFolderIds: ['src', 'src/components', 'src/components/ui', 'src/features', 'src/services', 'src/store'],

    setPackageManager: (packageManager) => set({ packageManager }),
    setActiveTab: (activeTab) => set({ activeTab }),
    setProjectName: (projectName) => set({ projectName }),
    setSelectedFileId: (selectedFileId) => set({ selectedFileId }),

    toggleFolder: (folderId) =>
        set((state) => ({
            expandedFolderIds: state.expandedFolderIds.includes(folderId)
                ? state.expandedFolderIds.filter((id) => id !== folderId)
                : [...state.expandedFolderIds, folderId],
        })),

    expandAllFolders: (folderIds) => set({ expandedFolderIds: folderIds }),
    collapseAllFolders: () => set({ expandedFolderIds: [] }),

    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id }],
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, 4000);
    },

    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));