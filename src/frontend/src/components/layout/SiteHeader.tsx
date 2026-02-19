import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useIsCallerAdmin } from '@/hooks/useAdminSubmissions';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const showAdminLink = isAuthenticated && isAdmin && !isAdminLoading;

  const navLinks = [
    { href: '/what-addiction-is', label: 'What Addiction Is' },
    { href: '/signs-risk-factors', label: 'Signs & Risk Factors' },
    { href: '/recovery-basics', label: 'Recovery Basics' },
    { href: '/how-to-support-someone', label: 'How to Support' },
    { href: '/relapse-next-steps', label: 'Relapse & Next Steps' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/generated/aaoa-logo.dim_512x512.png"
            alt="Awareness Over Addiction Official"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="hidden font-semibold text-foreground sm:inline-block">
            Awareness Over Addiction
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                currentPath === link.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {showAdminLink && (
            <Link
              to="/admin/submissions"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                currentPath === '/admin/submissions'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Admin
            </Link>
          )}
          <Link to="/resources">
            <Button variant="default" size="sm" className="ml-2">
              Get Help Now
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-border/40 bg-background lg:hidden">
          <div className="container mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  currentPath === link.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {showAdminLink && (
              <Link
                to="/admin/submissions"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  currentPath === '/admin/submissions'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Admin
              </Link>
            )}
            <Link to="/resources" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="default" size="sm" className="mt-2 w-full">
                Get Help Now
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
