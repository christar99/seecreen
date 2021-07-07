import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    :not(:last-child) {
        margin-bottom: 50px;
    }
    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.span`
    font-size: 17px;
    font-weight: 600;
`;

const Grid = styled.div`
    width: 100%;
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
    @media only screen and (max-width: 768px) {
        place-content: center;
    }
`;

const Section = ({ title, children }) => (
    <Container>
        <Title>{title}</Title>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Section;