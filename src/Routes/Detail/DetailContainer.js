import { MoviesApi, tvApi } from 'api';
import React from 'react';
import DetailPresenter from './DetailPresenter';



class DetailContainer extends React.Component {
    constructor(props) {
        super(props);
        const {location: {pathname}} = props;
        this.state = {
            result: null,
            loading: true,
            error: null,
            isMovie: pathname.includes("/movie/")
        };
    }


    async componentDidMount() {
        const {
            match: { params: { id } },
            history: { push }
        } = this.props;

        const { isMovie } = this.state;
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push("/");
        }

        let result = null;
        try {
            if(isMovie) {
                const request = await MoviesApi.movieDetail(parsedId);
                result = request.data;
            } else {
                const request = await tvApi.showDetail(parsedId);
                result = request.data;
            }

        } catch {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ loading: false, result});
        }
    }

    render() {
        const { result, loading, error } = this.state;
        return (
            <DetailPresenter
                result={result}
                loading={loading}
                error={error}
            />
        )
    }
}

export default DetailContainer;