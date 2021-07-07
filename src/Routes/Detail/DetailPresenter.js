import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

const Container = styled.div `
    height: calc(100vh - 50px);
    width: 100vw;
    position: relative;
    padding: 50px;

    @media only screen and (max-width: 1200px) {
        padding: 20px;
    }

    @media only screen and (max-width: 768px) {
        padding: 10px;
    }
`;

const BackDrop = styled.div `
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(2px);
    opacity: 0.7;
    z-index: 0;
`;

const Content = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    z-index: 1;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Cover = styled.div `
    min-width: 500px;
    height: 800px;
    background: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    
    @media only screen and (max-width: 1200px) {
        min-width: 375px;
        height: 600px;
    }

    @media only screen and (max-width: 768px) {
        min-width: 140px;
        height: 240px;
        margin-bottom: 10px;
    }
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 768px) {
        align-items: center;
    }
`;

const Data = styled.div `
    width: 70%;
    max-height: 35vh;
    margin-left: 10px;

    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`;

const Title = styled.h3 `
    font-size: 32px;

    @media only screen and (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

const ItemContainer = styled.div `
    margin: 20px 0;

    @media only screen and (max-width: 768px) {
        margin: 10px 0;
    }
`;

const Item = styled.span `

`;

const Divider = styled.span `
    margin: 0 10px;
`;

const Overview = styled.p `
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 100%;
    margin-bottom: 20px;

    @media only screen and (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

const IframeContianer = styled.div`
    width: 60vw;
    height: 580px;
    margin-left: 20px;

    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 35vh;
        margin-left: 0;
        margin-top: 20px;
    }
`;

const IFrame = styled.iframe`
    width: 100%;
    height: 580px;

    @media only screen and (max-width: 1200px) {
        width: 80%;
        height: 60%;
    }

    @media only screen and (max-width: 768px) {
        margin: 0;
        width: 100%;
        height: 100%;
    }
`;

const DetailPresenter = ({result, loading, error}) => (
    loading
        ? (
            <> 
                < Helmet > <title>Loading | Seecreen</title>
                </Helmet>
                <Loader/>
            </>
        )
        : (
                error
                ? <Message/>
                : <Container>
                    <Helmet>
                        <title>
                            {result.original_title ? result.original_title : result.original_name} | Seecreen
                        </title>
                    </Helmet>
                    <BackDrop
                        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
                    <Content>
                        <Cover
                            bgImage={result.poster_path
                                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                                : require('assets/noPoster.png').default}/>
                        <DataContainer>
                            <Data>
                                <Title>
                                    {
                                        result.original_title
                                            ? result.original_title
                                            : result.original_name
                                    }
                                </Title>
                                <ItemContainer>
                                    <Item>
                                        {
                                            result.release_date
                                                ? result
                                                    .release_date
                                                    .substring(0, 4)
                                                : result
                                                    .first_air_date
                                                    .substring(0, 4)
                                        }
                                    </Item>
                                    <Divider>•</Divider>
                                    <Item>
                                        {
                                            result.runtime
                                                ? result.runtime
                                                : result.episode_run_time
                                        }
                                        min
                                    </Item>
                                    <Divider>•</Divider>
                                    <Item>
                                        {
                                            result.genres && result
                                                .genres
                                                .map(
                                                    (genre, index) => index === result.genres.length - 1
                                                        ? genre.name
                                                        : `${genre.name}/`
                                                )
                                        }
                                    </Item>
                                </ItemContainer>
                                <Overview>{result.overview}</Overview>
                            </Data>
                            {result.videos.results.length > 0 && 
                                <IframeContianer>
                                    <IFrame
                                        src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen="allowfullscreen"
                                    />
                                </IframeContianer>
                            }
                        </DataContainer>
                    </Content>
                </Container>
            )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailPresenter;