import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, Phone } from 'lucide-react';
import SeminarRegistrationForm from '@/components/seminar/SeminarRegistrationForm';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Awareness Over Addiction
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Join us for an educational seminar focused on raising awareness about addiction and
                supporting recovery in our communities.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#register">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Calendar className="mr-2 h-5 w-5" />
                    Register Now
                  </Button>
                </a>
                <a href="#about-seminar">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/assets/generated/aaoa-hero.dim_1600x900.png"
                alt="Awareness Over Addiction Seminar"
                width={1600}
                height={900}
                className="h-auto w-full max-w-2xl rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Seminar Section */}
      <section id="about-seminar" className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              About the Seminar
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              An educational program designed to increase understanding and reduce stigma around addiction.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <BookOpen className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Educational Focus</CardTitle>
                <CardDescription>
                  Learn about the science of addiction, its impact on individuals and families, and
                  evidence-based approaches to recovery.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Connect with others who are committed to supporting recovery and building healthier
                  communities through awareness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <Phone className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Resources & Help</CardTitle>
                <CardDescription>
                  Access information about local support services, treatment options, and ways to get
                  involved in advocacy efforts.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Register for the Seminar
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to register for our Awareness Over Addiction seminar.
            </p>
          </div>
          <SeminarRegistrationForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Together We Can Make a Difference
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join us in raising awareness and supporting those affected by addiction. Your participation
            helps build stronger, more informed communities.
          </p>
          <a href="#register">
            <Button size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Register Today
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
