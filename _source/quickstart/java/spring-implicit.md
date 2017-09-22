---
layout: quickstart_partial
exampleDescription: Spring Implicit Example
---

### Include the dependency

For Apache Maven:
```xml
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-security-starter</artifactId>
    <version>{{ site.versions.spring_security_starter }}</version>
</dependency>
```

For Gradle:
```groovy
compile 'com.okta.spring:okta-spring-security-starter:{{ site.versions.spring_security_starter }}'
```

### Configure your properties

You can configure your applications properties with environment variables, system properties, or configuration files. Take a look at the [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) for more details.

| Property | Default | Details |
|----------|---------|---------|
| okta.oauth.issuer     | N/A | [Authorization Server](/docs/how-to/set-up-auth-server.html) issuer URL, i.e.: https://{yourOktaDomain}.com/oauth2/default |
| okta.oauth.clientId   | N/A | The Client Id of your Okta OIDC application |
| okta.oauth.audience   | api://default | The audience of your [Authorization Server](/docs/how-to/set-up-auth-server.html) |
| okta.oauth.scopeClaim | scp | The scope claim key in the Access Token's JWT |
| okta.oauth.rolesClaim | groups | The claim key in the Access Token's JWT that corresponds to an array of the users groups. |

### Create a Controller

The above client makes a request to `/api/messages`, we simply need to create a `Controller` to handle the response: 

```java
@RestController
class MessagesRestController {

    @GetMapping("/api/messages")
    public List<String> getMessages(Principal principal) {
        // handle request
    }
}
```

### That's it!

Okta's Spring Security integration will [parse the JWT access token](/blog/2017/06/21/what-the-heck-is-oauth#oauth-flows) from the HTTP request's `Authorization: Bearer` header value.

Check out a [Spring Boot example](https://github.com/okta/okta-spring-security/tree/master/examples) or this [blog post](https://scotch.io/@mraible/build-a-secure-notes-application-with-kotlin-typescript-and-okta). 