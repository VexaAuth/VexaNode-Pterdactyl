import React from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import Console from '@/components/server/console/Console';

const Container = styled.div`
    ${tw`bg-gray-700 px-2 py-2 border border-gray-600 rounded-ui`}
`;

const ConsoleBlock = () => {
    return (
        <Container>
            <Console />
        </Container>
    );
};

export default ConsoleBlock;
