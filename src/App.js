import Layout from "./components/Layout/Layout";
import { Route } from "react-router-dom";
import { HomeScreen } from "./pages";
import "macro-css";
import "./styles/app.scss";

function App() {
  return (
    <div className="wrapper d-flex flex-column">
      <Layout>
        <div className="content">
          <div className="container">
            content
            <Route exact path="/" component={HomeScreen} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;
