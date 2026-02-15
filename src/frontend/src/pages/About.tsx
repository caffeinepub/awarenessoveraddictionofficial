import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Awareness Over Addiction Official is dedicated to providing compassionate,
            evidence-based information about addiction and recovery.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our mission is to break down the stigma surrounding addiction and provide accessible,
                accurate information to those affected by substance use disorders. We believe that
                understanding addiction as a medical condition—not a moral failing—is the first step
                toward healing.
              </p>
              <p>
                Through education, we aim to empower individuals, families, and communities with the
                knowledge and resources needed to support recovery and prevent addiction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We approach addiction with compassion, recognizing that recovery is a personal
                journey that looks different for everyone. Our content is grounded in scientific
                research and medical expertise, presented in a way that's accessible and
                non-judgmental.
              </p>
              <p>
                We believe in the power of awareness—understanding the nature of addiction, its
                causes, and available treatments—to transform lives and communities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                Who We Serve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>This website is designed for:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Individuals struggling with addiction who are seeking information and hope
                </li>
                <li>
                  Family members and friends who want to understand and support their loved ones
                </li>
                <li>
                  Anyone interested in learning about addiction, treatment, and recovery
                </li>
                <li>
                  People in recovery looking for resources and continued support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg bg-primary/5 p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Important Disclaimer</h2>
          <p className="text-muted-foreground">
            The information provided on this website is for educational purposes only and is not
            intended to be a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician or other qualified health provider with any
            questions you may have regarding a medical condition or treatment. Never disregard
            professional medical advice or delay in seeking it because of something you have read on
            this website.
          </p>
        </div>
      </div>
    </div>
  );
}
