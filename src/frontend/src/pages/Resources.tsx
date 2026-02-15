import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ExternalLink, Phone } from 'lucide-react';
import { resources, emergencyDisclaimer, crisisGuidance } from '@/content/resources';

export default function Resources() {
  const crisisResources = resources.filter((r) => r.category === 'crisis');
  const supportResources = resources.filter((r) => r.category === 'support');
  const treatmentResources = resources.filter((r) => r.category === 'treatment');
  const informationResources = resources.filter((r) => r.category === 'information');

  return (
    <div className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Get Help Now
          </h1>
          <p className="text-lg text-muted-foreground">
            Access immediate support, treatment resources, and helpful information. You don't have
            to face this alone.
          </p>
        </div>

        {/* Emergency Disclaimer */}
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Emergency Notice</AlertTitle>
          <AlertDescription>{emergencyDisclaimer}</AlertDescription>
        </Alert>

        {/* Crisis Resources */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Crisis Support</h2>
            <p className="text-muted-foreground">{crisisGuidance}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{resource.name}</span>
                    <Phone className="h-5 w-5 text-primary" />
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" className="w-full">
                      Visit Resource
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Support Groups */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Support Groups</h2>
            <p className="text-muted-foreground">
              Connect with others who understand your journey through peer support groups.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {supportResources.map((resource, index) => (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Treatment Resources */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Find Treatment</h2>
            <p className="text-muted-foreground">
              Locate professional treatment facilities and programs in your area.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {treatmentResources.map((resource, index) => (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Find Treatment
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Information Resources */}
        <section>
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Educational Resources
            </h2>
            <p className="text-muted-foreground">
              Access evidence-based information about addiction, treatment, and recovery.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {informationResources.map((resource, index) => (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
