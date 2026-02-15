import React from 'react';

const Minimap = ({ diffResult }) => {
    const totalLines = diffResult.reduce((acc, part) => acc + (part.count || 0), 0);
    if (totalLines === 0) return null;

    return (
        <div className="minimap" style={{
            width: '12px',
            height: '100%',
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {diffResult.map((part, index) => {
                const hasDiff = part.added || part.removed;
                let bg = 'transparent';
                if (part.added) bg = 'var(--success)';
                if (part.removed) bg = 'var(--error)';

                return (
                    <div
                        key={index}
                        style={{
                            flexGrow: part.count,
                            backgroundColor: bg,
                            opacity: hasDiff ? 0.6 : 0,
                            minHeight: hasDiff ? '2px' : 0
                        }}
                        title={`${part.count} lines ${part.added ? 'added' : part.removed ? 'removed' : 'unchanged'}`}
                    />
                );
            })}
        </div>
    );
};

export default Minimap;
