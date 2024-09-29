import {useState} from 'react';
import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ResponsiveAppBar } from '../common/header';

export const Route = createRootRoute({
  component: () => {
    const [currentRoute, setCurrentRoute] = useState<string>("/");
    const navigate = useNavigate({ from: currentRoute });

    const navigateToMenu = (url: string | null) => {
      if (url != null) {
        setCurrentRoute(url);
        navigate({to: url});
      }
    }

    return (<>
      <div className="p-2 flex gap-2">
      <ResponsiveAppBar navigateToMenu={navigateToMenu}/>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
    );
  }
})
