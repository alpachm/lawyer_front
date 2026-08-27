import { createRootRoute } from '@tanstack/react-router';
import { PrincipalLayout } from '../layouts/PrincipalLayout';

export const Route = createRootRoute({
  component: PrincipalLayout,
});
