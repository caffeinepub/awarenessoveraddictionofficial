import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { educationSections } from '@/content/education';

export default function SignsRiskFactors() {
  const section = educationSections.find((s) => s.slug === 'signs-risk-factors')!;

  return (
    <div className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {section.title}
          </h1>
          <p className="text-lg text-muted-foreground">{section.content.introduction}</p>
        </div>

        <div className="space-y-6">
          {section.content.sections.map((subsection, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{subsection.heading}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{subsection.content}</p>
                {subsection.bullets && (
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    {subsection.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
