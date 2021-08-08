import Layout from "./components/Layout/Layout";
import { Route } from "react-router-dom";
import { HomeScreen, CartScreen, SettingsScreen } from "./pages";
import "macro-css";
import "./styles/app.scss";

function App() {
  return (
    <div className="wrapper d-flex flex-column">
      <Layout>
        <div className="content">
          <Route exact path="/" component={HomeScreen} />
          <Route path="/cart" component={CartScreen} />
          <Route path="/settings" component={SettingsScreen} />
        </div>
      </Layout>
    </div>
  );
}

export default App;
