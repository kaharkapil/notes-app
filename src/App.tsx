import NoteList from "./components/NoteList";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="center-title">PyjamaHR Notes Application</h1>
      <NoteList />
    </div>
  );
};

export default App;
