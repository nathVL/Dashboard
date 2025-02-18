import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <div>
      <nav className="bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <img
            src="/img/img.png"
            alt="Logo"
            className="h-15"
          />
          <h1 className="text-4xl font-bold">Pi Dashboard</h1>
        </div>
      </nav>
      <hr className="border-t border-gray-200"/>
        <Dashboard/>
      </div>
  );
}

export default App;
