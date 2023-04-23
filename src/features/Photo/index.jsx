import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import AddEditPage from './pages/AddEdit';
import MainPage from './pages/Main';
import { useSelector } from 'react-redux';

Photo.propTypes = {};

function Photo(props) {
    const match = useRouteMatch();

    const photos = useSelector((state) => state.photos);
    console.log('list of photos: ', photos);

    return (
        <Switch>
            <Route exact path={match.url} component={MainPage} />

            <Route path={`${match.url}/add`} component={AddEditPage} />
            <Route path={`${match.url}/:photoId`} component={AddEditPage} />

            <Route component={NotFound} />
        </Switch>
    );
}

export default Photo;
