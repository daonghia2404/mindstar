import React, { useEffect } from 'react';
import { Redirect, Router } from '@reach/router';
import { useDispatch } from 'react-redux';

import { AuthRoute, LayoutPaths, Pages, Paths, ProtectedRoute, PublicRoute } from '@/pages/routers';
import Guest from '@/layouts/Guest';
import Auth from '@/layouts/Auth';
import Admin from '@/layouts/Admin';
import { uiActions } from '@/redux/actions';

import 'moment/locale/vi';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateSize = (): void => {
      dispatch(uiActions.setDevice(window.innerWidth));
    };
    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, [dispatch]);

  return (
    <div className="App">
      <Router primary={false}>
        <Guest path={LayoutPaths.Guest}>
          <PublicRoute path={Paths.Home} component={Pages.Home} />

          <Redirect noThrow from={Paths.Rest} to={`${LayoutPaths.Guest}${Paths.Home}`} />
        </Guest>

        <Auth path={LayoutPaths.Auth}>
          <AuthRoute path={Paths.Login} component={Pages.Login} />
          <AuthRoute path={Paths.LoginDomain} component={Pages.LoginDomain} />
          <AuthRoute path={Paths.Register} component={Pages.Register} />

          <ProtectedRoute path={Paths.RegisterBranch} component={Pages.RegisterBranch} />

          <Redirect noThrow from={Paths.Rest} to={`${LayoutPaths.Auth}${Paths.LoginDomain}`} />
        </Auth>

        <Admin path={LayoutPaths.Admin}>
          <ProtectedRoute path={Paths.Dashboard} component={Pages.Dashboard} />
          <ProtectedRoute path={Paths.Branches} component={Pages.Branches} />
          <ProtectedRoute path={Paths.TimeOffs} component={Pages.TimeOffs} />
          <ProtectedRoute path={Paths.Managers} component={Pages.Managers} />
          <ProtectedRoute path={Paths.ManagerDetail()} component={Pages.ManagerDetail} />
          <ProtectedRoute path={Paths.Classes} component={Pages.Classes} />
          <ProtectedRoute path={Paths.ClassDetail()} component={Pages.ClassDetail} />
          <ProtectedRoute path={Paths.Events} component={Pages.Events} />
          <ProtectedRoute path={Paths.Players} component={Pages.Players} />
          <ProtectedRoute path={Paths.PlayerDetail()} component={Pages.PlayerDetail} />
          <ProtectedRoute path={Paths.Connects} component={Pages.Connects} />
          <ProtectedRoute path={Paths.AttendancesManagers} component={Pages.Attendances} managers />
          <ProtectedRoute path={Paths.AttendancesPlayers} component={Pages.Attendances} />
          <ProtectedRoute path={Paths.Practices} component={Pages.Practices} />
          <ProtectedRoute path={Paths.Schedules} component={Pages.Schedules} />
          <ProtectedRoute path={Paths.Categories} component={Pages.Categories} />
          <ProtectedRoute path={Paths.Rewards} component={Pages.Rewards} />
          <ProtectedRoute path={Paths.Products} component={Pages.Products} />
          <ProtectedRoute path={Paths.Redeems} component={Pages.Redeems} />
          <ProtectedRoute path={Paths.SettingsGeneral} component={Pages.SettingsGeneral} />
          <ProtectedRoute path={Paths.Users} component={Pages.Users} />
          <ProtectedRoute path={Paths.Customers} component={Pages.Customers} />
          <ProtectedRoute path={Paths.Suppliers} component={Pages.Suppliers} />
          <ProtectedRoute path={Paths.Revenues} component={Pages.Revenues} />
          <ProtectedRoute path={Paths.Expenses} component={Pages.Expenses} />
          <ProtectedRoute path={Paths.BusStops} component={Pages.BusStops} />
          <ProtectedRoute path={Paths.PickupAttendances} component={Pages.PickupAttendances} />

          <Redirect noThrow from={Paths.Rest} to={`${LayoutPaths.Admin}${Paths.Dashboard}`} />
        </Admin>
      </Router>
    </div>
  );
};

export default App;
