import React from 'react';
import '../../styles/diff-viewer.css';

const DiffLines = ({ diffParts, type = 'original' }) => {
    return (
        <div className="diff-backdrop" aria-hidden="true">
            {diffParts.map((part, index) => {
                const lines = part.value.split('\n');
                if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();

                let className = 'diff-line';
                if (type === 'original' && part.removed) className += ' diff-line-removed';
                if (type === 'modified' && part.added) className += ' diff-line-added';

                return lines.map((_, i) => (
                    <div key={`${index}-${i}`} className={className}>&nbsp;</div>
                ));
            })}
        </div>
    );
};

export default DiffLines;
