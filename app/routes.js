import React from 'react';
// Imports only Route object
import {Route} from 'react-router';

import Main from 'components/main';
import Example from 'components/example';

const routes = (
	<Route handler={Main}>
		<Route handler={Example} name='example'>
	<Route handler={Main}>
);

export default routes;