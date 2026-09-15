import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/lib/app-routes';
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  MessageSquareQuote,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';

type AuthMode = 'login' | 'signup';

const content = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Pick up where you left off.',
    description: 'Sign in to return to your communities, saved posts, and ongoing conversations.',
    panelTitle: 'Good conversations are better when you come back to them.',
    panelDescription:
      'Your feed is ready with the questions, ideas, and communities that matter to you.',
    submitLabel: 'Sign in',
    switchPrompt: 'New to common ground?',
    switchLabel: 'Create an account',
    switchHref: APP_ROUTES.AUTH.SIGNUP,
  },
  signup: {
    eyebrow: 'Join the community',
    title: 'Create your place in the conversation.',
    description: 'A few details are all you need to start sharing, learning, and connecting.',
    panelTitle: 'Find your people. Share what you know. Stay curious.',
    panelDescription:
      'Common ground brings thoughtful questions and useful answers into one welcoming place.',
    submitLabel: 'Create account',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Sign in',
    switchHref: APP_ROUTES.AUTH.LOGIN,
  },
} as const;

function AuthPage({ mode }: { mode: AuthMode }) {
  const pageContent = content[mode];
  const isLogin = mode === 'login';

  return (
    <section className="grid min-h-[calc(100dvh-4rem)] overflow-hidden bg-background text-foreground lg:grid-cols-[minmax(0,0.85fr)_minmax(32rem,1.15fr)]">
      <aside className="relative isolate overflow-hidden bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-14 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 -top-10 -z-10 size-44 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-28 -z-10 size-80 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 px-3 py-1.5 text-xs font-medium text-primary-foreground/75">
            <span className="size-1.5 rounded-full bg-primary-foreground" />A place for thoughtful
            people
          </div>

          <h2 className="mt-8 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-balance sm:text-4xl lg:mt-12 lg:text-5xl">
            {pageContent.panelTitle}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-primary-foreground/65 sm:text-base">
            {pageContent.panelDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-16 lg:grid-cols-1">
          <CommunityPoint
            icon={MessageSquareQuote}
            title="Speak freely"
            description="Start conversations that are worth having."
          />
          <CommunityPoint
            icon={UsersRound}
            title="Find your circle"
            description="Discover people who care about the same things."
          />
          <CommunityPoint
            icon={ShieldCheck}
            title="Stay in control"
            description="Your profile and preferences remain yours."
          />
        </div>
      </aside>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {pageContent.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl">
              {pageContent.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {pageContent.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-7">
            <div className="space-y-5">
              {!isLogin ? (
                <AuthField
                  id="signup-name"
                  label="Display name"
                  placeholder="How should people know you?"
                  type="text"
                  autoComplete="name"
                  icon={UserRound}
                />
              ) : null}

              <AuthField
                id={isLogin ? 'login-email' : 'signup-email'}
                label="Email address"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                icon={Mail}
              />

              <AuthField
                id={isLogin ? 'login-password' : 'signup-password'}
                label="Password"
                placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                icon={LockKeyhole}
              />

              {!isLogin ? (
                <AuthField
                  id="signup-password-confirmation"
                  label="Confirm password"
                  placeholder="Enter it once more"
                  type="password"
                  autoComplete="new-password"
                  icon={LockKeyhole}
                />
              ) : null}
            </div>

            <div className="mt-5 flex items-start gap-2.5">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded border border-border bg-muted text-muted-foreground">
                {isLogin ? null : <Check className="size-3" aria-hidden="true" />}
              </span>
              <p className="text-xs leading-5 text-muted-foreground">
                {isLogin
                  ? 'Keep me signed in on this device.'
                  : 'I agree to keep conversations respectful and follow the community guidelines.'}
              </p>
            </div>

            <Button type="button" className="mt-6 h-11 w-full rounded-xl text-sm">
              {pageContent.submitLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            {pageContent.switchPrompt}{' '}
            <Link
              href={pageContent.switchHref}
              className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {pageContent.switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function AuthField({
  id,
  label,
  icon: Icon,
  ...inputProps
}: {
  id: string;
  label: string;
  icon: typeof Mail;
  placeholder: string;
  type: 'email' | 'password' | 'text';
  autoComplete: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id={id}
          className="h-11 rounded-xl border-border bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 md:text-sm"
          {...inputProps}
        />
      </div>
    </div>
  );
}

function CommunityPoint({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MessageSquareQuote;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-foreground/10 text-primary-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-primary-foreground/55">{description}</p>
      </div>
    </div>
  );
}

export default AuthPage;
