import type { SeminarFormValues } from "@/backend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

interface RegistrationFormData {
  name: string;
  institutionName: string;
  position: string;
  date: string;
  email: string;
  phone: string;
  alternatePhone: string;
}

export function useSubmitSeminarRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: RegistrationFormData) => {
      if (!actor) throw new Error("Actor not available");

      const backendForm: SeminarFormValues = {
        seminarTitle: "Awareness Over Addiction Seminar",
        organizerName: formData.name,
        organizerEmail: formData.email,
        description: `Registration from ${formData.institutionName}`,
        targetAudience: formData.position,
        pricing: "Free",
        location: formData.phone,
        preferredDate: formData.date,
        timeZone: "IST",
        duration: "2 hours",
        additionalSessions: formData.alternatePhone || "N/A",
        equipmentRequirements: "None",
        record: false,
        questionsOrComments: `Institution: ${formData.institutionName}, Position: ${formData.position}`,
        expectedAttendance: BigInt(0),
        privacyConsent: true,
        paymentConsent: true,
      };

      await actor.submitForm(backendForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seminarSubmissions"] });
    },
    onError: (error: any) => {
      console.error("Registration submission error:", error);
      throw error;
    },
  });
}
