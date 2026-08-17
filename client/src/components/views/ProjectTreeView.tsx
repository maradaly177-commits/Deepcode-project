import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
    PROJECT_STRUCTURE_TREE,
    getAllFileIds,
    findFileById,
} from '../../constants/starterData';
import type { ProjectFileItem } from '../../types';
import { copyToClipboard } from '../../utils/cn';
import {
    Folder,
    FolderOpen,
    FileCode,
    FileText,
    Copy,
    Check,
    Search,
    ChevronRight,
    ChevronDown,
    File,
    Code2,
} from 'lucide-react';

export const ProjectTreeView: React.FC = () => {
    const {
        selectedFileId,
        setSelectedFileId,
        expandedFolderIds,
        toggleFolder,
        expandAllFolders,
        collapseAllFolders,
        addToast,
    } = useAppStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState(false);

    const allFolderIds = useMemo(() => getAllFileIds(PROJECT_STRUCTURE_TREE), []);

    const selectedFile = useMemo(() => {
        return findFileById(PROJECT_STRUCTURE_TREE, selectedFileId) || findFileById(PROJECT_STRUCTURE_TREE, 'src/App.tsx');
    }, [selectedFileId]);

    const handleCopyCode = async () => {
        if (!selectedFile?.content) return;
        const ok = await copyToClipboard(selectedFile.content);
        if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            addToast({
                type: 'success',
                title: `Đã copy mã nguồn ${selectedFile.name}`,
                message: 'Bạn có thể dán vào trình soạn thảo code của mình.',
            });
        }
    };

    // Render a node in the tree
    const renderTreeNode = (node: ProjectFileItem, level: number = 0) => {
        const isFolder = node.type === 'folder';
        const isExpanded = expandedFolderIds.includes(node.id);
        const isSelected = selectedFileId === node.id;

        // Filter by search query if present
        const matchesSearch =
            !searchQuery ||
            node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (node.description && node.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return (
            <div key={node.id} className="select-none">
                <div
                    onClick={() => {
                        if (isFolder) {
                            toggleFolder(node.id);
                        } else {
                            setSelectedFileId(node.id);
                        }
                    }}
                    style={{ paddingLeft: `${level * 16 + 8}px` }}
                    className={`flex items-center gap-2 py-1.5 pr-2 rounded-lg text-xs cursor-pointer transition-all ${isSelected
                            ? 'bg-orange-500/20 text-orange-400 font-semibold border-l-2 border-orange-500'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        } ${!matchesSearch && searchQuery ? 'opacity-40' : ''}`}
                >
                    {isFolder ? (
                        <span className="text-slate-400">
                            {isExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                            )}
                        </span>
                    ) : (
                        <span className="w-3.5" />
                    )}

                    {isFolder ? (
                        isExpanded ? (
                            <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                            <Folder className="w-4 h-4 text-amber-400/80 shrink-0" />
                        )
                    ) : node.name.endsWith('.tsx') || node.name.endsWith('.ts') ? (
                        <FileCode className="w-4 h-4 text-sky-400 shrink-0" />
                    ) : node.name.endsWith('.json') ? (
                        <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                    ) : (
                        <File className="w-4 h-4 text-slate-400 shrink-0" />
                    )}

                    <span className="truncate flex-1 font-mono">{node.name}</span>

                    {node.description && !isFolder && (
                        <span className="text-[10px] text-slate-500 truncate hidden xl:inline max-w-[120px]">
                            {node.description}
                        </span>
                    )}
                </div>

                {isFolder && isExpanded && node.children && (
                    <div>
                        {node.children.map((child) => renderTreeNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Overview header */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold mb-2">
                        <Code2 className="w-3.5 h-3.5" />
                        Cấu trúc thư mục chuẩn Doanh nghiệp
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        Trình khám phá cấu trúc mã nguồn (Project Explorer)
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Nhấp vào bất kỳ file nào trong cây thư mục để xem mã nguồn TypeScript mẫu chuẩn cho từng tầng kiến trúc.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => expandAllFolders(allFolderIds)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                        Mở rộng tất cả
                    </button>
                    <button
                        onClick={collapseAllFolders}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                        Thu gọn
                    </button>
                </div>
            </div>

            {/* Main split view: Tree on left, Code viewer on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Folder Tree */}
                <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
                    {/* Search box */}
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Lọc file / thư mục..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Tree list with custom scrollbar */}
                    <div className="max-h-[580px] overflow-y-auto pr-1 space-y-0.5 custom-scrollbar">
                        {renderTreeNode(PROJECT_STRUCTURE_TREE)}
                    </div>
                </div>

                {/* Right Column: Code Viewer */}
                <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[640px]">
                    {/* File Tab Header */}
                    <div className="bg-slate-950 border-b border-slate-800 px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <FileCode className="w-4 h-4 text-orange-400 shrink-0" />
                            <span className="font-mono text-xs font-bold text-slate-200 truncate">
                                {selectedFile?.path || 'src/App.tsx'}
                            </span>
                            {selectedFile?.description && (
                                <span className="text-[11px] text-slate-400 hidden sm:inline border-l border-slate-800 pl-2">
                                    {selectedFile.description}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleCopyCode}
                            disabled={!selectedFile?.content}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors active:scale-95 disabled:opacity-40 shrink-0 cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Đã copy</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy Code</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Code Content Box */}
                    <div className="p-4 flex-1 bg-slate-950/60 overflow-x-auto flex flex-col justify-between">
                        {selectedFile?.content ? (
                            <div className="relative">
                                <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto p-2">
                                    <code>
                                        {selectedFile.content.split('\n').map((line, idx) => (
                                            <div key={idx} className="table-row">
                                                <span className="table-cell pr-4 text-right select-none text-slate-600 text-[11px]">
                                                    {idx + 1}
                                                </span>
                                                <span className="table-cell">{line}</span>
                                            </div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500">
                                <Folder className="w-12 h-12 text-slate-700 mb-3" />
                                <p className="text-sm font-medium text-slate-400">Đây là một thư mục.</p>
                                <p className="text-xs text-slate-600 mt-1 max-w-xs">
                                    {selectedFile?.description || 'Hãy chọn một file cụ thể ở cây thư mục bên trái để xem nội dung code.'}
                                </p>
                            </div>
                        )}

                        {/* Bottom summary info */}
                        {selectedFile?.content && (
                            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                                <span>
                                    Định dạng: <span className="text-slate-400 font-mono">{selectedFile.language || 'typescript'}</span>
                                </span>
                                <span>
                                    Dung lượng: <span className="text-slate-400 font-mono">{selectedFile.content.length} ký tự</span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};