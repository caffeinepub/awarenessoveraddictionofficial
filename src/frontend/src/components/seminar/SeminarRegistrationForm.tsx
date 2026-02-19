import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useSubmitSeminarRegistration } from '@/hooks/useSubmitSeminarRegistration';

export default function SeminarRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    institutionName: '',
    position: '',
    date: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: submitRegistration, isPending, error } = useSubmitSeminarRegistration();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.institutionName || !formData.position || !formData.date) {
      return;
    }

    submitRegistration(formData, {
      onSuccess: () => {
        setShowSuccess(true);
        setFormData({
          name: '',
          institutionName: '',
          position: '',
          date: '',
        });
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      },
    });
  };

  if (showSuccess) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Registration Successful!
              </h3>
              <p className="text-muted-foreground">
                Thank you for registering. We'll be in touch with more details about the seminar.
              </p>
            </div>
            <Button onClick={() => setShowSuccess(false)} variant="outline">
              Register Another Person
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seminar Registration</CardTitle>
        <CardDescription>
          Please provide your information to register for the Awareness Over Addiction seminar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to submit registration. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institutionName">
              Institution Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="institutionName"
              name="institutionName"
              type="text"
              value={formData.institutionName}
              onChange={handleChange}
              required
              placeholder="Enter your institution or organization"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">
              Position <span className="text-destructive">*</span>
            </Label>
            <Input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Enter your position or role"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">
              Preferred Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Registration'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
