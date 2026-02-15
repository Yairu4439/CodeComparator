import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    TrashIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';


const Toolbar = ({ options, setOptions, onClear, onCopyLeft, onCopyRight, onSwap }) => {
    const { t } = useTranslation();

    const toggleOption = (key) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="toolbar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-glass)'
        }}>
            <div className="toolbar-group flex gap-4">

                <div className="flex items-center gap-2 select-none">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={options.wrapLines}
                            onChange={() => toggleOption('wrapLines')}
                        />
                        <span className="slider"></span>
                    </label>
                    <span style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => toggleOption('wrapLines')}>
                        {t('wrap_lines')}
                    </span>
                </div>

                <div className="flex items-center gap-2 select-none">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={options.ignoreWhitespace}
                            onChange={() => toggleOption('ignoreWhitespace')}
                        />
                        <span className="slider"></span>
                    </label>
                    <span style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => toggleOption('ignoreWhitespace')}>
                        {t('ignore_whitespace')}
                    </span>
                </div>

                <div className="flex items-center gap-2 select-none">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={options.ignoreCase}
                            onChange={() => toggleOption('ignoreCase')}
                        />
                        <span className="slider"></span>
                    </label>
                    <span style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => toggleOption('ignoreCase')}>
                        {t('ignore_case')}
                    </span>
                </div>
            </div>

            <div className="toolbar-actions flex gap-2">

                <button
                    onClick={onSwap}
                    className="btn-icon"
                    title="Swap Panes"
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--sky-400)' }}
                >
                    <ArrowsRightLeftIcon style={{ width: 18, height: 18 }} />
                </button>

                <div style={{ width: '1px', background: 'var(--border-glass)', margin: '0 0.2rem' }}></div>

                <button
                    onClick={onCopyLeft}
                    className="btn-icon flex items-center gap-1"
                    title="Copy Modified to Original"
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}
                >
                    <ArrowLeftIcon style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: '0.8rem' }}>{t('merge_left')}</span>
                </button>

                <button
                    onClick={onCopyRight}
                    className="btn-icon flex items-center gap-1"
                    title="Copy Original to Modified"
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}
                >
                    <span style={{ fontSize: '0.8rem' }}>{t('merge_right')}</span>
                    <ArrowRightIcon style={{ width: 16, height: 16 }} />
                </button>

                <div style={{ width: '1px', background: 'var(--border-glass)', margin: '0 0.5rem' }}></div>


                <button
                    onClick={onClear}
                    className="btn-icon"
                    title="Clear All"
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--error)' }}
                >
                    <TrashIcon style={{ width: 20, height: 20 }} />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
