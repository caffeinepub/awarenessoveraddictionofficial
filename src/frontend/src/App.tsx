import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import WhatAddictionIs from './pages/WhatAddictionIs';
import SignsRiskFactors from './pages/SignsRiskFactors';
import RecoveryBasics from './pages/RecoveryBasics';
import HowToSupportSomeone from './pages/HowToSupportSomeone';
import RelapseNextSteps from './pages/RelapseNextSteps';
import Faq from './pages/Faq';
import Resources from './pages/Resources';
import About from './pages/About';
import Contact from './pages/Contact';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const whatAddictionIsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/what-addiction-is',
  component: WhatAddictionIs,
});

const signsRiskFactorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signs-risk-factors',
  component: SignsRiskFactors,
});

const recoveryBasicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recovery-basics',
  component: RecoveryBasics,
});

const howToSupportSomeoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-to-support-someone',
  component: HowToSupportSomeone,
});

const relapseNextStepsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/relapse-next-steps',
  component: RelapseNextSteps,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: Faq,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  component: Resources,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  whatAddictionIsRoute,
  signsRiskFactorsRoute,
  recoveryBasicsRoute,
  howToSupportSomeoneRoute,
  relapseNextStepsRoute,
  faqRoute,
  resourcesRoute,
  aboutRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
