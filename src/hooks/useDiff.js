import { useState, useEffect } from 'react';
import * as Diff from 'diff';

export const useDiff = (original, modified, options = {}) => {
    const [diffResult, setDiffResult] = useState([]);
    const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 });

    useEffect(() => {
        if (original === undefined || modified === undefined) return;

        const calculateDiff = () => {
            const cleanOriginal = original.replace(/\r\n/g, '\n').replace(/\n+$/, '');
            const cleanModified = modified.replace(/\r\n/g, '\n').replace(/\n+$/, '');

            const diffOptions = {
                ignoreWhitespace: options.ignoreWhitespace || false,
                ignoreCase: options.ignoreCase || false,
                stripTrailingCr: true,
            };

            const result = Diff.diffLines(cleanOriginal, cleanModified, diffOptions);

            let addedCount = 0;
            let removedCount = 0;
            let unchangedCount = 0;

            result.forEach(part => {
                const lineCount = part.count || 0;
                if (part.added) addedCount += lineCount;
                else if (part.removed) removedCount += lineCount;
                else unchangedCount += lineCount;
            });

            setDiffResult(result);
            setStats({ added: addedCount, removed: removedCount, unchanged: unchangedCount });
        };

        const timer = setTimeout(calculateDiff, 200);
        return () => clearTimeout(timer);

    }, [original, modified, options.ignoreWhitespace, options.ignoreCase]);

    return { diffResult, stats };
};
