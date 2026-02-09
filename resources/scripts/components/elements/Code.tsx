import React from 'react';

interface CodeProps {
    children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export default ({ children }: CodeProps) => (
    <code className={'font-mono text-sm px-2 py-1 inline-block rounded-ui bg-gray-800 border border-gray-600'}>
        {children}
    </code>
);
