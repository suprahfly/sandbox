import React from 'react';
import {RouteHandler, Link} from 'react-router';

class Main extends React.component {
	render() {
		return {
			<div>
				<h1>Example</h1>
				<Link to="example">Go to example page…</Link>
				<RouteHandler />
			</div>
		}
	}
}
