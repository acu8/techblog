import Articles from "./components/Articles";
import Blogs from "./components/Blogs";
import Home from "./components/Home";

export default function Page() {
  return (
    <div>
      <Home />
      <Articles />
      <Blogs />
    </div>
  );
}
