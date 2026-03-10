import LoginButton from "@/components/auth/LoginButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { useGetAllSubmissions } from "@/hooks/useAdminSubmissions";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Loader2, Users } from "lucide-react";

export default function AdminSubmissions() {
  const { identity, isInitializing } = useInternetIdentity();
  const { isFetching: actorFetching } = useActor();
  const {
    data: submissions,
    isLoading: submissionsLoading,
    error,
  } = useGetAllSubmissions();

  const isAuthenticated = !!identity;

  if (isInitializing || actorFetching) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Please log in with Internet Identity to view seminar submissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

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
          All seminar registration submissions.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load submissions. Please try again."}
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
              <Badge variant="secondary">
                {submissions.length} total submissions
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table data-ocid="admin.submissions.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Preferred Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map(([principal, form], idx) => (
                    <TableRow
                      key={principal.toString()}
                      data-ocid={`admin.submissions.row.${idx + 1}`}
                    >
                      <TableCell className="text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {form.organizerName}
                      </TableCell>
                      <TableCell>
                        {form.questionsOrComments.includes("Institution:")
                          ? form.questionsOrComments
                              .split("Institution:")[1]
                              .split(",")[0]
                              .trim()
                          : form.description}
                      </TableCell>
                      <TableCell>{form.targetAudience}</TableCell>
                      <TableCell>{form.preferredDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent
            className="py-12 text-center"
            data-ocid="admin.submissions.empty_state"
          >
            <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Submissions Yet</h3>
            <p className="text-muted-foreground">
              Seminar registrations will appear here once visitors submit the
              form.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
