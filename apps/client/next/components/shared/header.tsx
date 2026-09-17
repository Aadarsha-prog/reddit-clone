'use client';
import { DoorOpenIcon, Grid, Plus, UserPlus2 } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { APP_ROUTES } from '@/lib/app-routes';
import { useGetUserAPI } from '@/hooks/api/useUser';

function AppHeader() {
  const { data: user, isLoading } = useGetUserAPI();

  return (
    <header className="border-b border-border backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Common ground home"
        >
          <span className="grid size-8 place-items-center rounded-[11px] bg-foreground text-background shadow-sm transition-transform group-hover:-rotate-3">
            <span className="size-2.5 rounded-full bg-background" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em] sm:text-base">
            common<span className="text-muted-foreground">ground</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isLoading ? null : (
            <>
              {user ? (
                <>
                  <Link
                    href={APP_ROUTES.DASHBOARD}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <Grid className="size-4" aria-hidden="true" />
                    Dashboard
                  </Link>
                  <Link href={APP_ROUTES.POST.CREATE} className={buttonVariants({})}>
                    <Plus className="size-4" aria-hidden="true" />
                    New post
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={APP_ROUTES.AUTH.LOGIN}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <DoorOpenIcon className="size-4" aria-hidden="true" />
                    Login
                  </Link>
                  <Link
                    href={APP_ROUTES.AUTH.SIGNUP}
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    <UserPlus2 className="size-4" aria-hidden="true" />
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
