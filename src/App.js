import { Route, Switch, Redirect } from 'react-router-dom';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/history">
        <HistoryPage />
      </Route>
    </Switch>
  );
}

export default App;
