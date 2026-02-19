import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Bool "mo:core/Bool";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  type SeminarFormValues = {
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

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let submissions = Map.empty<Principal, SeminarFormValues>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitForm(form : SeminarFormValues) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit forms");
    };
    if (not (form.privacyConsent and form.paymentConsent)) {
      Runtime.trap("All consents must be accepted before submitting. ");
    };
    submissions.add(caller, form);
  };

  public query ({ caller }) func getAllSubmissions() : async [(Principal, SeminarFormValues)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    submissions.toArray();
  };
};

