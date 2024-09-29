import { RouterProvider, AnyRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

interface AppProps {
  router: AnyRouter;
}

const queryClient = new QueryClient();

export const App = (props: AppProps) => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={props.router} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
