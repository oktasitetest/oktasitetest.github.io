---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.34
---

# Release 2016.34

## Feature Enhancement: HAL Links For Sessions API Are CORS-Enabled
<!-- OKTA-98961 -->

Two Session API endpoints, `GET /api/v1/sessions/me` and `POST /sessions/me/lifecycle/refresh`, return `/me` instead of `/:id` in response links.
These links are CORS-enabled, consistent with the original API calls which are also CORS-enabled.

For more information, see [Get Session](/docs/api/resources/sessions#get-session) or [Refresh Session](/docs/api/resources/sessions#refresh-session).

## Bugs Fixed

The following issues are fixed:

* IdP keys could be deleted even when referenced by an active or inactive app instance. (OKTA-96139)
* Properties could be deleted from the [User Profile schema](/docs/api/resources/schemas.html#remove-property-from-user-profile-schema)
while still referenced as a `matchAttribute` in inbound SAML IdPs. (OKTA-96281)
* Identity Providers for social authentication configured to look up usernames by Okta username or email failed to return a valid match.
This failure occurred if the username was in both the username and email and a second user existed with the same email but different username. (OKTA-96335)

## Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org, for example the **Dashboard** or **Directory** tab, to verify the current release for that org.

## Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).
