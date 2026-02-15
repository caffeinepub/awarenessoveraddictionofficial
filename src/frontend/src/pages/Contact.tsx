import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export default function Contact() {
  return (
    <div className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            India Support Contact
          </h1>
          <p className="text-lg text-muted-foreground">
            Reach out to us for support and information.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Email</p>
                <a
                  href="mailto:awarenessoveraddictionoffial@gmail.com"
                  className="text-primary hover:underline break-all"
                >
                  awarenessoveraddictionoffial@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <SiInstagram className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Instagram</p>
                <a
                  href="https://instagram.com/awarenessoveraddictionofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @awarenessoveraddictionofficial
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            For immediate help and resources, please visit our{' '}
            <a href="/resources" className="font-medium text-primary hover:underline">
              Get Help Now
            </a>{' '}
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
