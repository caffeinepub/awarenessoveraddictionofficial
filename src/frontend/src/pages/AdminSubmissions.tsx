import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetAllSubmissions } from '@/hooks/useAdminSubmissions';
import AccessDeniedScreen from '@/components/auth/AccessDeniedScreen';
import LoginButton from '@/components/auth/LoginButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Users } from 'lucide-react';

export default function AdminSubmissions() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: submissions, isLoading: submissionsLoading, error } = useGetAllSubmissions();

  const isAuthenticated = !!identity;

  // Show loading while checking authentication
  if (isInitializing || isAdminLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              Please log in to view seminar submissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if authenticated but not admin
  if (isAuthenticated && isAdmin === false) {
    return <AccessDeniedScreen />;
  }

  // Show submissions for admin users
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Seminar Submissions
          </h1>
        </div>
        <p className="text-muted-foreground">
          View and manage all seminar registration submissions.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load submissions. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {submissionsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : submissions && submissions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Registrations</CardTitle>
            <CardDescription>
              <Badge variant="secondary">{submissions.length} total submissions</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Preferred Date</TableHead>
                    <TableHead>Principal ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map(([principal, form], index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{form.organizerName}</TableCell>
                      <TableCell>
                        {form.questionsOrComments.includes('Institution:')
                          ? form.questionsOrComments.split('Institution:')[1].split(',')[0].trim()
                          : form.description}
                      </TableCell>
                      <TableCell>{form.targetAudience}</TableCell>
                      <TableCell>{form.preferredDate}</TableCell>
                      <TableCell className="font-mono text-xs">{principal.toString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Submissions Yet</h3>
            <p className="text-muted-foreground">
              Seminar registrations will appear here once users start submitting the form.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
