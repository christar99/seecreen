import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from "styled-components";

const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    background-color:  rgba(20, 29, 20, 0.8);
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
    display: flex;
`;

const Item = styled.li`
    width: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 3px solid 
    ${props => (props.current ? "#3498db" : "transparnet")};
    transition: border-bottom .5s ease-in-out;
`;

const SelectorLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default withRouter(({location: { pathname }}) => {
    return (
        <Header>
            <List>
                <Item current={pathname === "/"}>
                    <SelectorLink to="/">Movies</SelectorLink>
                </Item>
                <Item current={pathname === "/tv"}>
                    <SelectorLink to="/tv">TV</SelectorLink>
                </Item>
                <Item current={pathname === "/search"}>
                    <SelectorLink to="/search">Search</SelectorLink>
                </Item>
            </List>
        </Header>
    );
});