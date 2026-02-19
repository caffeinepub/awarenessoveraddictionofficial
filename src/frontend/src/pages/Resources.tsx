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
        {/* Banner Image */}
        <div className="mb-12 overflow-hidden rounded-lg">
          <img
            src="/assets/generated/aaoa-resources-banner.dim_1600x900.png"
            alt="Resources for addiction support and recovery - Help is available"
            width={1600}
            height={900}
            className="h-auto w-full"
          />
        </div>

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
            <h2 className="mb-2 text-2xl font-bold text-foreground">Crisis & Emergency Support</h2>
            <p className="text-muted-foreground">{crisisGuidance}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-destructive" />
                    {resource.name}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {resource.phone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone:</p>
                      <a
                        href={`tel:${resource.phone}`}
                        className="text-lg font-semibold text-foreground hover:text-primary"
                      >
                        {resource.phone}
                      </a>
                    </div>
                  )}
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
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
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Treatment Finders */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Find Treatment</h2>
            <p className="text-muted-foreground">
              Locate treatment facilities and services in your area.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {treatmentResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {resource.phone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone:</p>
                      <a
                        href={`tel:${resource.phone}`}
                        className="text-lg font-semibold text-foreground hover:text-primary"
                      >
                        {resource.phone}
                      </a>
                    </div>
                  )}
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Educational Resources */}
        <section>
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Educational Resources</h2>
            <p className="text-muted-foreground">
              Learn more about addiction, treatment, and recovery from trusted sources.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {informationResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
