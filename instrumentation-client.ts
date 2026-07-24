import * as Sentry from '@sentry/nextjs';
import { getSentryOptions } from './src/shared/sentry/options';

Sentry.init(getSentryOptions());

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
