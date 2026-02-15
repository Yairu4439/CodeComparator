import React from 'react';
import { ClipboardDocumentIcon, CheckIcon, DocumentTextIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import '../../styles/diff-viewer.css';
import DiffLines from './DiffLines';

const LINE_HEIGHT = 21; // 14px font × 1.5 line-height

const EditorPane = React.forwardRef(({
    title,
    value,
    onChange,
    placeholder,
    readOnly = false,
    wrapLines = false,
    diffResult = [],
    side = 'original'
}, ref) => {

    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const totalLines = value.split('\n').length;
    const trimmedValue = value.replace(/\n+$/, '');
    const codeLineCount = trimmedValue ? trimmedValue.split('\n').length : 1;
    const lines = Array.from({ length: codeLineCount }, (_, i) => i + 1);


    const textareaHeight = totalLines * LINE_HEIGHT + 32; // +32 = 1rem top + 1rem bottom padding


    const maxLineLength = React.useMemo(() => {
        if (wrapLines) return 0;
        return Math.max(0, ...value.split('\n').map(l => l.length));
    }, [value, wrapLines]);

    const diffParts = diffResult.filter(part => {
        if (side === 'original') return !part.added;
        if (side === 'modified') return !part.removed;
        return true;
    });

    return (
        <div className={`editor-pane ${side}`}>
            <div className="pane-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {side === 'modified' ? (
                        <PencilSquareIcon style={{ width: 18, height: 18, color: 'var(--sky-400)' }} />
                    ) : (
                        <DocumentTextIcon style={{ width: 18, height: 18, color: 'var(--text-secondary)' }} />
                    )}
                    <span style={{ fontWeight: 600 }}>{title}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        className="btn-icon"
                        style={{
                            padding: '0.25rem',
                            color: copied ? 'var(--success)' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            background: 'transparent',
                            border: 'none',
                            transition: 'color 0.2s'
                        }}
                    >
                        {copied ? (
                            <CheckIcon style={{ width: 18, height: 18 }} />
                        ) : (
                            <ClipboardDocumentIcon style={{ width: 18, height: 18 }} />
                        )}
                    </button>
                    <span className="badge">{codeLineCount} lines</span>
                </div>
            </div>

            <div className="editor-content" ref={ref}>
                <div className="line-numbers">
                    {lines.map(line => (
                        <div key={line}>{line}</div>
                    ))}
                </div>

                <div className="code-wrapper" style={{ position: 'relative', flex: 1, minHeight: '100%' }}>
                    <DiffLines diffParts={diffParts} type={side} />

                    <textarea
                        className="code-area"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        spellCheck="false"
                        style={{
                            whiteSpace: wrapLines ? 'pre-wrap' : 'pre',
                            wordBreak: wrapLines ? 'break-all' : 'normal',
                            height: wrapLines ? 'auto' : `${textareaHeight}px`,
                            minHeight: `${textareaHeight}px`,
                            width: wrapLines ? '100%' : `calc(100% + ${Math.max(0, maxLineLength - 50)}ch)`, // only grow if lines are somewhat long
                            minWidth: wrapLines ? '100%' : `calc(${maxLineLength}ch + 4rem)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
});

EditorPane.displayName = 'EditorPane';

export default EditorPane;
