import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, BookOpen, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Awareness Over Addiction
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Understanding addiction is the first step toward recovery. We're here to provide
                compassionate, evidence-based information to support you or your loved ones on the
                journey to healing.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/resources">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Help Now
                  </Button>
                </Link>
                <Link to="/what-addiction-is">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/assets/generated/aaoa-hero.dim_1600x900.png"
                alt="Hope and recovery illustration"
                width={800}
                height={450}
                className="h-auto w-full max-w-2xl rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How We Can Help
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Access comprehensive resources designed to educate, support, and empower.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <BookOpen className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Learn about addiction, its causes, and how it affects individuals and families.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/what-addiction-is">
                  <Button variant="link" className="p-0">
                    Explore →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Heart className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Recovery</CardTitle>
                <CardDescription>
                  Discover the path to recovery and what treatment options are available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/recovery-basics">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Support</CardTitle>
                <CardDescription>
                  Find guidance on how to support someone struggling with addiction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/how-to-support-someone">
                  <Button variant="link" className="p-0">
                    Get Guidance →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Phone className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Resources</CardTitle>
                <CardDescription>
                  Access helplines, treatment centers, and emergency support services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/resources">
                  <Button variant="link" className="p-0">
                    Find Help →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            You're Not Alone
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Recovery is possible, and help is available. Whether you're seeking information for
            yourself or a loved one, we're here to support you every step of the way.
          </p>
          <Link to="/resources">
            <Button size="lg">
              <Phone className="mr-2 h-5 w-5" />
              Get Help Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
