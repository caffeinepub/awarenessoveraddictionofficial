import type { SeminarFormValues } from "@/backend";
import type { Principal } from "@dfinity/principal";
import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useGetAllSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return useQuery<Array<[Principal, SeminarFormValues]>>({
    queryKey: ["seminarSubmissions"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return await actor.getAllSubmissions();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });
}
