import { CliBar, EditorBar, SearchBar, Window } from "./Window";

export const Example = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-4 md:p-20">
      <h2 className="text-center text-5xl font-bold">
        <span className="text-indigo-700">Deploy</span> the way you want it
      </h2>

      <div className="grid grid-cols-3 gap-4 pt-12">
        <Window header={<SearchBar>https://your-app.com</SearchBar>} />
        <Window header={<CliBar>{"~/jane"}</CliBar>} inverse />
        <Window header={<EditorBar>index.js</EditorBar>}>lol</Window>
      </div>
    </section>
  );
};
