import { Grid3X3, Columns3 } from 'lucide-react';
import type { ViewButtonProps, ViewModeSelectorProps } from '@/types/types';

export default function ViewModeSelector({ viewMode, onViewModeChange }: ViewModeSelectorProps) {
    return (
        <div className="flex p-1 items-center rounded-lg border border-zinc-200 dark:border-zinc-700">
            <ViewButton
                mode="standard"
                currentMode={viewMode}
                onClick={() => onViewModeChange('standard')}
                icon={<Columns3 className="h-5 w-5" />}
                title="Standard View"
            />
            <ViewButton
                mode="grid"
                currentMode={viewMode}
                onClick={() => onViewModeChange('grid')}
                icon={<Grid3X3 className="h-5 w-5" />}
                title="Grid View"
            />
        </div>
    );
}

function ViewButton({ mode, currentMode, onClick, icon, title }: ViewButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition-colors ${mode === currentMode
                ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-700'
                : 'text-zinc-400 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-800'
                }`}
            title={title}
        >
            {icon}
        </button>
    );
}
