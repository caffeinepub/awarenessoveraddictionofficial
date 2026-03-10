import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Bool "mo:core/Bool";
import Iter "mo:core/Iter";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

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

  // State
  let accessControlState = AccessControl.initState();
  let submissions = Map.empty<Principal, SeminarFormValues>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Mixin for role management
  include MixinAuthorization(accessControlState);

  // Claim admin — only works when no admin has been assigned yet
  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    if (caller.isAnonymous()) {
      return false;
    };
    if (accessControlState.adminAssigned) {
      return false;
    };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    return true;
  };

  // Check if no admin has been assigned yet
  public query func isAdminUnclaimed() : async Bool {
    not accessControlState.adminAssigned;
  };

  // Form submission - open to all
  public shared ({ caller }) func submitForm(form : SeminarFormValues) : async () {
    if (not form.privacyConsent or not form.paymentConsent) {
      Runtime.trap("All consents must be accepted before submitting.");
    };
    submissions.add(caller, form);
  };

  // Get all submissions - restricted to admin
  public query ({ caller }) func getAllSubmissions() : async [(Principal, SeminarFormValues)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    submissions.toArray();
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };
};
