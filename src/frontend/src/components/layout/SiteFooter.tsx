import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'awarenessoveraddiction'
  );

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/aaoa-logo.dim_512x512.png"
                alt="Awareness Over Addiction Official"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-semibold text-foreground">
                Awareness Over Addiction
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting recovery through education, compassion, and understanding.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                to="/resources"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Get Help Now
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
              This website provides educational information only and is not a substitute for
              professional medical advice. If you're experiencing a crisis, please contact your
              local emergency services immediately.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} Awareness Over Addiction Official. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 fill-primary text-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
