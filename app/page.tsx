import Articles from "./components/Articles";
import Home from "./components/Home";

// export const metadata = {
//   title: "App Router",
// };

export default function Page() {
  return (
    <div>
      <Home />;
      <Articles />
    </div>
  );
}
