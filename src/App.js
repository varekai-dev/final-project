import Layout from './components/Layout/Layout';
import { Route } from 'react-router-dom';
import { HomeScreen } from './pages';
import 'macro-css';
import './styles/app.scss';
import CartScreen from './pages/CartScreen';

function App() {
	return (
		<div className="wrapper d-flex flex-column">
			<Layout>
				<div className="content">
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/cart" component={CartScreen} />
				</div>
			</Layout>
		</div>
	);
}

export default App;
