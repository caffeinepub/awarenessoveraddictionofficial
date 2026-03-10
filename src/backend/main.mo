import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Bool "mo:core/Bool";

import AccessControl "authorization/access-control";

actor {
  public type SeminarFormValues = {
    seminarTitle : Text;
    organizerName : Text;
    organizerEmail : Text;
    description : Text;
    targetAudience : Text;
    pricing : Text;
    location : Text;
    preferredDate : Text;
    timeZone : Text;
    duration : Text;
    additionalSessions : Text;
    equipmentRequirements : Text;
    record : Bool;
    questionsOrComments : Text;
    expectedAttendance : Nat;
    privacyConsent : Bool;
    paymentConsent : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  // Kept for stable variable compatibility with previous version
  let accessControlState = AccessControl.initState();

  // State
  let submissions = Map.empty<Principal, SeminarFormValues>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Form submission - open to all (including anonymous)
  public shared ({ caller }) func submitForm(form : SeminarFormValues) : async () {
    if (not form.privacyConsent or not form.paymentConsent) {
      Runtime.trap("All consents must be accepted before submitting.");
    };
    submissions.add(caller, form);
  };

  // Get all submissions - any logged-in (non-anonymous) user
  public query ({ caller }) func getAllSubmissions() : async [(Principal, SeminarFormValues)] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Please log in to view submissions");
    };
    ignore accessControlState; // suppress unused warning
    submissions.toArray();
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };
};
