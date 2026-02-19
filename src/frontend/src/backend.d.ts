import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SeminarFormValues {
    additionalSessions: string;
    duration: string;
    organizerEmail: string;
    expectedAttendance: bigint;
    seminarTitle: string;
    equipmentRequirements: string;
    description: string;
    organizerName: string;
    questionsOrComments: string;
    targetAudience: string;
    pricing: string;
    preferredDate: string;
    paymentConsent: boolean;
    location: string;
    timeZone: string;
    privacyConsent: boolean;
    record: boolean;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSubmissions(): Promise<Array<[Principal, SeminarFormValues]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitForm(form: SeminarFormValues): Promise<void>;
}
