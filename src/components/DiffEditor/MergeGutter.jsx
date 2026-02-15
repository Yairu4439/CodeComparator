import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LINE_HEIGHT = 21; // must match: font-size 14px × line-height 1.5
const CODE_PADDING = 16;

const MergeGutter = ({ diffResult, onMerge }) => {
    let leftLineIndex = 0;
    let rightLineIndex = 0;

    let totalLeft = 0;
    let totalRight = 0;
    diffResult.forEach(part => {
        if (part.added) totalRight += part.count;
        else if (part.removed) totalLeft += part.count;
        else { totalLeft += part.count; totalRight += part.count; }
    });
    const innerHeight = Math.max(totalLeft, totalRight) * LINE_HEIGHT + CODE_PADDING * 2;

    return (
        <div style={{ position: 'relative', width: '100%', height: `${innerHeight}px` }}>
            {diffResult.map((part, index) => {
                const lineCount = part.count;
                let button = null;

                if (part.added) {
                    const top = rightLineIndex * LINE_HEIGHT + CODE_PADDING;
                    button = (
                        <button
                            key={index}
                            className="btn-merge btn-merge-left"
                            onClick={() => onMerge(index, 'toLeft')}
                            style={{
                                top: `${top}px`,
                                position: 'absolute',
                                right: '2px',
                                color: 'var(--success)',
                                height: `${lineCount * LINE_HEIGHT}px`,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            title="Copy to Left"
                        >
                            <ArrowLeftIcon style={{ width: 16 }} />
                        </button>
                    );
                    rightLineIndex += lineCount;
                } else if (part.removed) {
                    const top = leftLineIndex * LINE_HEIGHT + CODE_PADDING;
                    button = (
                        <button
                            key={index}
                            className="btn-merge btn-merge-right"
                            onClick={() => onMerge(index, 'toRight')}
                            style={{
                                top: `${top}px`,
                                position: 'absolute',
                                left: '2px',
                                color: 'var(--error)',
                                height: `${lineCount * LINE_HEIGHT}px`,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            title="Copy to Right"
                        >
                            <ArrowRightIcon style={{ width: 16 }} />
                        </button>
                    );
                    leftLineIndex += lineCount;
                } else {
                    leftLineIndex += lineCount;
                    rightLineIndex += lineCount;
                }

                return button;
            })}
        </div>
    );
};

export default MergeGutter;
