import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import { HomeScreen } from './pages';
import 'macro-css';
import './styles/app.scss';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';

function App() {
	return (
		<div className="wrapper d-flex flex-column">
			<Layout>
				<div className="content">
					<div className="container">
						<Route exact path="/" component={HomeScreen} />
						<Route exact path="/product/:id" component={ProductScreen} />
						<Route exact path="/cart" component={CartScreen} />
					</div>
				</div>
			</Layout>
		</div>
	);
}

export default App;
