# Specification

## Summary
**Goal:** Hide the login icon from the site header while maintaining full Internet Identity authentication functionality in the background.

**Planned changes:**
- Hide the LoginButton component in the SiteHeader so it's not visible to users
- Preserve all Internet Identity authentication logic and hooks
- Ensure admin functionality remains accessible for authenticated users

**User-visible outcome:** The login icon will no longer be visible in the site header, but authentication and admin features will continue to work normally in the background.
