---
layout: docs_page
title: Okta API Release Notes for 2017.36
excerpt: Summary of changes to the Okta API since Release 2017.35
---

# Okta API Release Note

The [Policy API](/docs/api/resources/policy.html) and [Password Policy API](/docs/api/resources/policy.html#GroupPasswordPolicy) are Generally Available in preview orgs starting on September 7, 2017 and in production orgs starting on October 9, 2017.

The Policy API enables an Administrator to perform policy and policy rule operations. The policy framework is used by Okta to control rules and settings that govern, among other things, user session lifetime, whether multi-factor authentication is required when logging in, what MFA factors may be employed, password complexity requirements, and what types of self-service operations are permitted under various circumstances.

The Password Policy type controls settings that determine a user’s password length and complexity, as well as the frequency with which a password can be changed. This policy also governs the recovery operations that may be performed by the user, including change password, reset (forgot) password and self-service password unlock.

### Does Your Org Have This Change Yet?

To verify the current release for an org, scroll to the bottom of the developer console, or click the **Admin** button and check the footer of the Dashboard page.

{% img release_notes/version_footer.png alt:"Release Number in Footer" %}

### Looking for Something Else?

* [Okta API Release Note Index for 2016](platform-release-notes2016-index.html) 
* [Okta API Release Note Index for 2017](platform-release-notes2017-index.html)
* For changes outside the Okta API, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).