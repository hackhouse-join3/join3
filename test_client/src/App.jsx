import { Navbar, Welcome, Footer, Services, Transactions, MyContract } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <MyContract />
    <Services />
    <Transactions />
    <Footer />
  </div>
);

export default App;
