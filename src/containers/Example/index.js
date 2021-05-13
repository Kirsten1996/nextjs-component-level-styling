import React from 'react';
//import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router';
//import { Link } from 'react-router-dom';

import './Example.scss';

class Example extends React.Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
              <div className="Example">
                { /* want headers */ }
                <Helmet
                    title="Example"
                    meta={[
                    { name: 'description', content: 'Description of Example' },
                    ]}
                />

                <Switch>
                    <Route exact path="/" component={''} />
                    <Route path="/:id" component={''} />
                </Switch>

            </div>
        );
    }
}

/*
Example.propTypes = {

};
*/

//withRouter
export default Example
