import React, { useState } from 'react';
import EditorPane from './EditorPane';
import { useDiff } from '../../hooks/useDiff';
import { useScrollSync } from '../../hooks/useScrollSync';
import { useTranslation } from 'react-i18next';
import Toolbar from './Toolbar';
import MergeGutter from './MergeGutter';
import Minimap from './Minimap';

const DiffViewer = () => {
    const { t } = useTranslation();

    const [original, setOriginal] = useState('{\n  "name": "Code Comparator",\n  "version": "1.0"\n}');
    const [modified, setModified] = useState('{\n  "name": "Code Comparator Pro",\n  "version": "2.0",\n  "features": ["diff", "merge"]\n}');

    const [options, setOptions] = useState({
        ignoreWhitespace: false,
        ignoreCase: false,
        wrapLines: false
    });

    const { diffResult, stats } = useDiff(original, modified, options);
    const [originalRef, modifiedRef, gutterRef] = useScrollSync();

    const handleClear = () => {
        setOriginal('');
        setModified('');
    };

    const handleSwap = () => {
        const temp = original;
        setOriginal(modified);
        setModified(temp);
    };

    const handleCopyLeft = () => setOriginal(modified);
    const handleCopyRight = () => setModified(original);

    const handleMergeBlock = (index, direction) => {
        const targetPart = diffResult[index];
        let newText = '';

        // Detect the adjacent counterpart block to skip.
        // diff outputs modifications as consecutive [removed, added] pairs.
        // When merging one side, we must skip the other side of the pair.
        let skipIndex = -1;

        if (direction === 'toRight' && targetPart.removed) {
            if (index + 1 < diffResult.length && diffResult[index + 1].added) {
                skipIndex = index + 1;
            }
        } else if (direction === 'toLeft' && targetPart.added) {
            if (index - 1 >= 0 && diffResult[index - 1].removed) {
                skipIndex = index - 1;
            }
        }

        diffResult.forEach((part, i) => {
            if (i === skipIndex) return;

            if (direction === 'toLeft') {
                if (i === index) {
                    if (part.added) newText += part.value;
                } else if (!part.added) {
                    newText += part.value;
                }
            } else {
                if (i === index) {
                    if (part.removed) newText += part.value;
                } else if (!part.removed) {
                    newText += part.value;
                }
            }
        });

        if (direction === 'toLeft') setOriginal(newText);
        else setModified(newText);
    };

    return (
        <div className="diff-viewer-container">
            <Toolbar
                options={options}
                setOptions={setOptions}
                onClear={handleClear}
                onCopyLeft={handleCopyLeft}
                onCopyRight={handleCopyRight}
                onSwap={handleSwap}
            />

            <div className="stats" style={{ padding: '0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span style={{ marginRight: '1rem', color: 'var(--success)' }}>
                    +{stats.added} {t('lines_added')}
                </span>
                <span style={{ color: 'var(--error)' }}>
                    -{stats.removed} {t('lines_removed')}
                </span>
            </div>

            <div className="editors-wrapper flex justify-between gap-4">
                <div className="editor-container">
                    <EditorPane
                        ref={originalRef}
                        title={t('original')}
                        value={original}
                        onChange={setOriginal}
                        wrapLines={options.wrapLines}
                        diffResult={diffResult}
                        side="original"
                    />
                </div>

                <div className="editor-pane" style={{ width: '40px', flexShrink: 0, flexGrow: 0 }}>
                    <div className="pane-header" style={{ visibility: 'hidden' }}>
                        <span>&nbsp;</span>
                    </div>
                    <div className="editor-content" ref={gutterRef} style={{ overflow: 'hidden' }}>
                        <MergeGutter
                            diffResult={diffResult}
                            onMerge={handleMergeBlock}
                        />
                    </div>
                </div>

                <div className="editor-container">
                    <EditorPane
                        ref={modifiedRef}
                        title={t('modified')}
                        value={modified}
                        onChange={setModified}
                        wrapLines={options.wrapLines}
                        diffResult={diffResult}
                        side="modified"
                    />
                </div>

                <div style={{ width: '50px', borderLeft: '1px solid var(--border-glass)' }}>
                    <Minimap diffResult={diffResult} />
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;
