import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SeminarFormValues } from '@/backend';

interface RegistrationFormData {
  name: string;
  institutionName: string;
  position: string;
  date: string;
}

export function useSubmitSeminarRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: RegistrationFormData) => {
      if (!actor) throw new Error('Actor not available');

      // Map the 4-field UI form to the backend's full SeminarFormValues structure
      const backendForm: SeminarFormValues = {
        seminarTitle: 'Awareness Over Addiction Seminar',
        organizerName: formData.name,
        organizerEmail: '', // Not collected in simplified form
        description: `Registration from ${formData.institutionName}`,
        targetAudience: formData.position,
        pricing: 'Free',
        location: 'To be announced',
        preferredDate: formData.date,
        timeZone: 'IST',
        duration: '2 hours',
        additionalSessions: 'None',
        equipmentRequirements: 'None',
        record: false,
        questionsOrComments: `Institution: ${formData.institutionName}, Position: ${formData.position}`,
        expectedAttendance: BigInt(0),
        privacyConsent: true,
        paymentConsent: true,
      };

      await actor.submitForm(backendForm);
    },
    onSuccess: () => {
      // Invalidate submissions query so admin view refreshes
      queryClient.invalidateQueries({ queryKey: ['seminarSubmissions'] });
    },
    onError: (error: any) => {
      console.error('Registration submission error:', error);
      // Return user-friendly error message
      if (error.message?.includes('Unauthorized')) {
        throw new Error('You must be logged in to submit a registration.');
      }
      throw error;
    },
  });
}
