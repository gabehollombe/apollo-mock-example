import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Galleries extends Component {
    render() {
        if (this.props.query && this.props.query.loading) {
            return <div>Loading...</div>
        }

        if (this.props.query && this.props.query.error) {
            return <div>Error {this.props.query.error.message}</div>
        }

        const galleries = this.props.query.galleries;

        return (
            <div>
                {galleries.map(gallery => gallery.name)}
            </div>
        );
    }
}

const GALLERIES_QUERY = gql`
    query GalleriesQuery {
        galleries {
            id
            name
        }
    }
`

export default graphql(GALLERIES_QUERY, { name: 'query' })(Galleries)