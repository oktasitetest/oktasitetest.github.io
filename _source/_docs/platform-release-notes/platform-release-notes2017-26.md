---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.25
---

## Release 2017.26

### Advance Notice: Data Retention Changes

Okta is changing system log data retention windows. System log data is available from `/api/v1/events` or
Okta SDK `EventsAPIClient`.

* For orgs created before July 17th, data older than six months will be removed.
* For orgs created on or after July 17th, data older than three months will be removed.

The new data retention policy starts:

* June 7, 2017 for existing preview orgs
* July 17, 2017 for existing production orgs

Preview and production orgs created on or after July 17, 2017, will retain log data for three months.

For the full data retention policy, see our [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

You can export data before Okta deletes it. We recommend using Security Information and Event Management (SIEM) technology or Okta's API. <!-- OKTA-125424 -->

 <!-- OKTA-125424 -->

### Platform Enhancement: New Authentication Method for OpenID Connect and API Access Management
For OpenID Connect and API Access Management, Okta supports the `client_secret_jwt` method for token endpoint authentication (`token_endpoint_auth_method`).
This method is specified in the [OpenID Connect specification](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)
and allows you to use JWT and HMAC to authenticate a client for [OAuth 2.0](https://developer.okta.com/docs/api/resources/oauth2.html#token-authentication-methods) or [OpenID Connect](https://developer.okta.com/docs/api/resources/oidc.html#token-authentication-methods) requests.
<!-- (OKTA-101074) -->

### Platform Bugs Fixed

* When suspicious activity was logged for OAuth 2.0 clients the invalid secret was not masked. (OKTA-129694)

* When validating the names of scopes for social identity providers, Okta didn't enforce the restrictions
specified in the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-3.3). (OKTA-117352)

* When the same user was created multiple times simultaneously and added to a group, the HTTP error
response code was 500 rather than 400. (OKTA-126223)

* `/api/v1/apps/:appId/groups` didn't return groups if the specified app is inactive. (OKTA-123695)

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

{% img release_notes/version_footer.png alt:"Release Number in Footer" %}

### Looking for Something Else?

* [Platform Release Note Index](platform-release-notes2016-index.html)
* For changes outside the Okta platform, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).

