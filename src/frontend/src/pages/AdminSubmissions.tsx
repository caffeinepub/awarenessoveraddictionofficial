import LoginButton from "@/components/auth/LoginButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  useGetAllSubmissions,
  useIsCallerAdmin,
} from "@/hooks/useAdminSubmissions";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";

function useIsAdminUnclaimed() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdminUnclaimed"],
    queryFn: async () => {
      if (!actor) return false;
      return await actor.isAdminUnclaimed();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export default function AdminSubmissions() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: isUnclaimed, isLoading: isUnclaimedLoading } =
    useIsAdminUnclaimed();
  const {
    data: submissions,
    isLoading: submissionsLoading,
    error,
  } = useGetAllSubmissions();
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const isAuthenticated = !!identity;

  if (isInitializing || isAdminLoading || isUnclaimedLoading) {
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

  // No admin claimed yet — let the logged-in user claim it
  if (isAuthenticated && isUnclaimed && !isAdmin) {
    const handleClaim = async () => {
      if (!actor) return;
      setIsClaiming(true);
      setClaimError(null);
      try {
        const ok = await actor.claimFirstAdmin();
        if (ok) {
          setClaimSuccess(true);
          await queryClient.invalidateQueries({ queryKey: ["isCallerAdmin"] });
          await queryClient.refetchQueries({ queryKey: ["isCallerAdmin"] });
          await queryClient.invalidateQueries({
            queryKey: ["isAdminUnclaimed"],
          });
        } else {
          setClaimError("Could not claim admin. An admin may already exist.");
        }
      } catch {
        setClaimError("Something went wrong. Please try again.");
      } finally {
        setIsClaiming(false);
      }
    };

    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4 py-16">
        <Card className="w-full" data-ocid="admin.claim.card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Activate Admin Access</CardTitle>
            <CardDescription>
              No admin has been set up yet. Click below to activate your admin
              access as the site owner.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {claimSuccess ? (
              <Alert
                className="border-green-500/30 bg-green-500/10"
                data-ocid="admin.claim.success_state"
              >
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Admin access activated! Refreshing your permissions...
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {claimError && (
                  <Alert
                    variant="destructive"
                    data-ocid="admin.claim.error_state"
                  >
                    <AlertDescription>{claimError}</AlertDescription>
                  </Alert>
                )}
                <Button
                  className="w-full"
                  onClick={handleClaim}
                  disabled={isClaiming}
                  data-ocid="admin.claim.primary_button"
                >
                  {isClaiming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Activating...
                    </>
                  ) : (
                    "Activate Admin Access"
                  )}
                </Button>
              </>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-center text-xs text-muted-foreground">
              This option is only available before any admin is set.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Admin exists but this user is not admin
  if (isAuthenticated && isAdmin === false) {
    return (
      <div className="container mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              This page is restricted to administrators only.
            </CardDescription>
          </CardHeader>
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
          View and manage all seminar registration submissions.
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
                    <TableHead>Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Preferred Date</TableHead>
                    <TableHead>Principal ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map(([principal, form], idx) => (
                    <TableRow
                      key={principal.toString()}
                      data-ocid={`admin.submissions.row.${idx + 1}`}
                    >
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
                      <TableCell className="font-mono text-xs">
                        {principal.toString()}
                      </TableCell>
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
              Seminar registrations will appear here once users start submitting
              the form.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
