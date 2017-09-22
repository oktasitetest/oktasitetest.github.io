---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.37
---

# Release 2016.39

### Feature Enhancement: Sharing Certificates Between App Instances

By cloning an app key credential with the Apps API, you can share the same certificate between two or more apps:

<pre>/apps/<em>:aid</em>/credentials/keys/<em>:kid</em>/clone?targetAid=<em>:targetAid</em></pre>

To share a certificate among app instances:

1. Generate a new app key credential for an app (the source app).
2. Use the new credential in the source app.
3. Share the credential (`kid`) with one or more target apps.
4. Use the new credential in the target app.

For more detailed instructions, see ["Clone Key Credential for Application"](/docs/api/resources/apps.html#clone-application-key-credential)
and ["Update Key Credential for Application"](/docs/api/resources/apps.html#update-key-credential-for-application).

### Bug Fixed

The WWW-Authenticate header couldn't be read when the `/oauth2/v1/userinfo` endpoint returned errors in a browser. (OKTA-101943)

### Does Your Org Have These Changes Yet?

Check the footer of any Admin page in an org to verify the current release for that org. For example,
scroll to the bottom of the Admin <b>Dashboard</b> page to see the version number:

{% img release_notes/version_footer.png alt:"Release Number in Footer" %}

### Looking for Product Release Notes?

For changes outside the Okta platform, see the [Release Notes Knowledge Hub](https://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).
