import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchMovie } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail"
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsPinAngle } from 'react-icons/bs';
import {Glyphicon, Panel} from 'react-bootstrap'
import {Image} from 'react-bootstrap'

// support routing
/*
function Movie(props) {
    const [selectedMovie] = useState(props.selectedMovie);
    const params = useParams();
    const movieId = params.movieId;
    console.log(movieId);
    const dispatch = useDispatch();
    if (selectedMovie == null) {
        dispatch(fetchMovie(movieId));
    }

    return (<MovieDetail movieId={movieId} />)
}
*/



class Movie extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null){
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actorName}</b> {actor.characterName}
                </p>
        )
        }

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.username}</b> {review.review}
                    <Glyphicon glyph={'start'} /> {review.rating}
                </p>
        )
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) {
                return <div>Loading...</div>;
            }
            return(
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imageUrl} thumbnail/></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                </Panel>
            );
        }
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.paramas.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));