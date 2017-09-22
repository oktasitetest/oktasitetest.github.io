---
layout: docs_page
title: Okta API Release Notes
excerpt: Summary of changes to the Okta API since Release 2017.33
---

## Okta API Release Notes for Release 2017.34

The following API feature enhancements and bug fixes are available in the 2017.34 release.
Dates for preview and production release are the earliest possible release date. Always check your org to verify the release version.

### API Feature Enhancements

| Feature Enhancement                                                           | Expected in Preview Orgs            | Expected in Production Orgs |
|:------------------------------------------------------------------------------|:------------------------------------|:----------------------------|
|         [New Developer Dashboard](#new-developer-dashboard)                           | Available now in new developer orgs | N/A                         |
|        [Zones API is an Early Access Release](#zones-api-is-an-early-access-release) | August 22, 2017                     | September 5, 2017           |

#### New Developer Dashboard

The new developer dashboard is available in all new developer orgs in preview:

{% img release_notes/dev-dashboard.png alt:"New Developer Dashboard" %}

Use the developer dashboard to access quick-start guides for your favorite language and view recent system log events.
You can also create an OpenID Connect app more easily with this simplified flow:

{% img release_notes/new-oidc-app-dashboard.png alt:"New Developer Dashboard" %}

#### Zones API is an Early Access Release
<!-- OKTA-129115 -->

Zones are used to group IP Address ranges so that policy decisions can be made based on the client’s IP location.

[The Zones API](/docs/api/resources/zones.html) is an {% api_lifecycle ea %} release. Contact Support to enable it.
This API can be enabled beginning August 22, 2017 for preview orgs, and beginning September 5, 2017 for production orgs.

### API Bug Fixes

Bug fixes are expected on preview orgs starting August 22, 2017, and on production orgs starting Sept 5, 2017.

* OpenID Connect and OAuth 2.0 client apps with an `application_type` of `native` or `browser` incorrectly allowed the `client_credentials` grant type. This fix adheres to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-1.3.4). (OKTA-135853)
* Requests to `GET /api/v1/apps/:aid/groups?expand=group%2Cmetadata` caused an error in orgs with the Application Entitlements Policy enabled. (OKTA-135969)
* The `AssertionConsumerServiceURL` attribute in a SAML authentication requests matched one of the configured SSO URLs but an error was returned. (OKTA-137555)

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

{% img release_notes/version_footer.png alt:"Release Number in Footer" %}

### Looking for Something Else?

* [Platform Release Note Index for 2016](platform-release-notes2016-index.html) 
* [Platform Release Note Index for 2017](platform-release-notes2017-index.html)
* For changes outside the Okta platform, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).