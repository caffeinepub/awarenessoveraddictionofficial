import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SeminarFormValues } from '@/backend';
import { Principal } from '@dfinity/principal';

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();
  const { data: isAdmin } = useIsCallerAdmin();

  return useQuery<Array<[Principal, SeminarFormValues]>>({
    queryKey: ['seminarSubmissions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return await actor.getAllSubmissions();
    },
    enabled: !!actor && !actorFetching && isAdmin === true,
    retry: false,
  });
}
