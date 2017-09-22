---
layout: docs_page
title: Admin Roles
---

# Admin Roles API

The Okta Admin Roles API provides operations to manage administrative role assignments for a user.

## Getting Started with Admin Roles

Explore the Administrator Roles API:  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/04f5ec85685ac6f2827e)

## Role Assignment Operations

### List Roles Assigned to User
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/roles %}

Lists all roles assigned to a user.

#### Request Parameters
{:.api .api-request .api-request-params}

| Parameter    | Description                                         | Param Type | DataType | Required |
|:------------ |:--------------------------------------------------- |:---------- |:-------- |:-------- |
| uid          | `id` of user                                        | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Array of [Role](#role-model)

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "id": "ra1b8aahBZuGJRRa30g4",
    "label": "Organization Administrator",
    "type": "ORG_ADMIN",
    "status": "ACTIVE",
    "created": "2015-09-06T14:55:11.000Z",
    "lastUpdated": "2015-09-06T14:55:11.000Z"
  },
  {
    "id": "IFIFAX2BIRGUSTQ",
    "label": "Application Administrator",
    "type": "APP_ADMIN",
    "status": "ACTIVE",
    "created": "2015-09-06T14:55:11.000Z",
    "lastUpdated": "2015-09-06T14:55:11.000Z"
  }
]
~~~

### Assign Role to User
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/roles %}

Assigns a role to a user.

#### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description            | Param Type | DataType                  | Required |
|:----------|:-----------------------|:-----------|:--------------------------|:---------|
| uid       | `id` of user           | URL        | String                    | TRUE     |
| type      | type of role to assign | Body       |   [Role Type](#role-types)  | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Assigned [Role](#role-model)

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
      "type": "SUPER_ADMIN"
}' "https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ra1b8anIk7rx7em7L0g4",
  "label": "Super Organization Administrator",
  "type": "SUPER_ADMIN",
  "status": "ACTIVE",
  "created": "2015-09-06T15:28:47.000Z",
  "lastUpdated": "2015-09-06T15:28:47.000Z"
}
~~~

### Unassign Role from User
{:.api .api-operation}

{% api_operation delete /api/v1/users/*:uid*/roles/*:rid* %}

Unassigns a role from a user.

#### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description  | Param Type | DataType | Required |
|:----------|:-------------|:-----------|:---------|:---------|
| uid       | `id` of user | URL        | String   | TRUE     |
| rid       | `id` of role | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

~~~ http
HTTP/1.1 204 No Content
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/ra1b8anIk7rx7em7L0g4"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ http
HTTP/1.1 204 No Content
~~~

## Role Target Operations

### Group Admin Role Group Targets

#### List Group Targets for Group Admin Role
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/roles/*:rid*/targets/groups %}

Lists all group targets for a `USER_ADMIN` role assignment.

##### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description                                                  | Param Type | DataType | Required |
|:----------|:-------------------------------------------------------------|:-----------|:---------|:---------|
| uid       | `id` of user                                                 | URL        | String   | TRUE     |
| rid       | `id` of role                                                 | URL        | String   | TRUE     |
| limit     | Specifies the number of results for a page (default is 20)   | Query      | Number   | FALSE    |
| after     | Specifies the pagination cursor for the next page of targets | Query      | String   | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/api/getting_started/design_principles.html#pagination).

##### Response Parameters
{:.api .api-response .api-response-params}

Array of [Groups](./groups.html)

If the role isn't scoped to specific group targets, an empty array `[]` is returned.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "id": "00g1emaKYZTWRYYRRTSK",
    "objectClass": [
      "okta:user_group"
    ],
    "profile": {
      "name": "West Coast Users",
      "description": "Straight Outta Compton"
    },
    "_links": {
      "logo": [
        {
          "href": "https://{yourOktaDomain}.com/img/logos/groups/okta-medium.png",
          "name": "medium",
          "type": "image/png"
        },
        {
          "href": "https://{yourOktaDomain}.com/img/logos/groups/okta-large.png",
          "name": "large",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://{yourOktaDomain}.com/api/v1/groups/00g1emaKYZTWRYYRRTSK/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}.com/api/v1/groups/00g1emaKYZTWRYYRRTSK/apps"
      }
    }
  }
] 
~~~

#### Add Group Target to Group Admin Role
{:.api .api-operation}

{% api_operation put /api/v1/users/*:uid*/roles/*:rid*/targets/groups/*:gid* %}

Adds a group target for a `USER_ADMIN` role assignment.

Adding the first group target changes the scope of the role assignment from applying to all targets to only applying to the specified target.

##### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description                                   | Param Type | DataType | Required |
|:----------|:----------------------------------------------|:-----------|:---------|:---------|
| uid       | `id` of user                                  | URL        | String   | TRUE     |
| rid       | `id` of role                                  | URL        | String   | TRUE     |
| gid       | `id` of group target to scope role assignment | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

~~~ http
HTTP/1.1 204 No Content
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ http
HTTP/1.1 204 No Content
~~~

#### Remove Group Target from Group Admin Role
{:.api .api-operation}

{% api_operation delete /api/v1/users/*:uid*/roles/*:rid*/targets/groups/*:gid* %}

Removes a group target from a `USER_ADMIN` role assignment.

Don't remove the last group target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all groups, the API consumer should delete the `USER_ADMIN` role assignment and recreate it.

##### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description                              | Param Type | DataType | Required |
|:----------|:-----------------------------------------|:-----------|:---------|:---------|
| uid       | `id` of user                             | URL        | String   | TRUE     |
| rid       | `id` of role                             | URL        | String   | TRUE     |
| gid       | `id` of group target for role assignment | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

~~~ http
HTTP/1.1 204 No Content
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/groups/00garkxjAHDYPFcsP0g4"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ http
HTTP/1.1 204 No Content
~~~

### App Admin Role App Targets

#### List App Targets for App Admin Role
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/roles/*:rid*/targets/catalog/apps %}

Lists all app targets for an `APP_ADMIN` role assignment.

##### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description                                                  | Param Type | DataType | Required |
|:----------|:-------------------------------------------------------------|:-----------|:---------|:---------|
| uid       | `id` of user                                                 | URL        | String   | TRUE     |
| rid       | `id` of role                                                 | URL        | String   | TRUE     |
| limit     | Specifies the number of results for a page (default is 20)   | Query      | Number   | FALSE    |
| after     | Specifies the pagination cursor for the next page of targets | Query      | String   | FALSE    |

Treat the page cursor as an opaque value: obtain it through the next link relation. See [Pagination](/docs/api/getting_started/design_principles.html#pagination)

##### Response Parameters
{:.api .api-response .api-response-params}

Array of Catalog Apps

If the role is not scoped to specific apps in the catalog, an empty array `[]` is returned.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "name": "salesforce",
    "displayName": "Salesforce.com",
    "description": "Salesforce",
    "status": "ACTIVE",
    "lastUpdated": "2014-06-03T16:17:13.000Z",
    "category": "CRM",
    "verificationStatus": "OKTA_VERIFIED",
    "website": "http://www.salesforce.com",
    "signOnModes": [
      "SAML_2_0"
    ],
    "features": [
      "IMPORT_NEW_USERS",
      "IMPORT_PROFILE_UPDATES",
      "IMPORT_USER_SCHEMA",
      "PROFILE_MASTERING",
      "PUSH_NEW_USERS",
      "PUSH_PASSWORD_UPDATES",
      "PUSH_PROFILE_UPDATES",
      "PUSH_USER_DEACTIVATION",
      "REACTIVATE_USERS"
    ],
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://{yourOktaDomain}.com/img/logos/salesforce_logo.png",
          "type": "image/png"
        }
      ]
    }
  },
  {
    "name": "boxnet",
    "displayName": "Box",
    "description": "Cloud storage.",
    "status": "ACTIVE",
    "lastUpdated": "2014-06-03T16:17:13.000Z",
    "category": "CM",
    "verificationStatus": "OKTA_VERIFIED",
    "website": "http://www.box.net",
    "signOnModes": [
      "SAML_2_0"
    ],
    "features": [
      "GROUP_PUSH",
      "IMPORT_NEW_USERS",
      "IMPORT_PROFILE_UPDATES",
      "PUSH_NEW_USERS",
      "PUSH_PROFILE_UPDATES",
      "PUSH_USER_DEACTIVATION",
      "REACTIVATE_USERS"
    ],
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://{yourOktaDomain}.com/img/logos/box.png",
          "type": "image/png"
        }
      ]
    }
  }
]
~~~

#### Add App Target to App Admin Role
{:.api .api-operation}

{% api_operation put /api/v1/users/*:uid*/roles/*:rid*/targets/catalog/apps/*:appName* %}

Adds an app target for an `APP_ADMIN` role assignment.

Adding the first app target changes the scope of the role assignment from applying to all app targets to applying to the specified target.

##### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description                                                | Param Type | DataType | Required |
|:----------|:-----------------------------------------------------------|:-----------|:---------|:---------|
| uid       | `id` of user                                               | URL        | String   | TRUE     |
| rid       | `id` of role                                               | URL        | String   | TRUE     |
| appName   | `name` of app target from catalog to scope role assignment | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

~~~ http
HTTP/1.1 204 No Content
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ http
HTTP/1.1 204 No Content
~~~

#### Remove App Target from App Admin Role
{:.api .api-operation}

{% api_operation delete /api/v1/users/*:uid*/roles/*:rid*/targets/catalog/apps/*:appName* %}

Removes an app target from an `APP_ADMIN` role assignment.

Don't remove the last app target from a role assignment, as this causes an exception.  If you need a role assignment that applies to all apps, the API consumer should delete the `APP_ADMIN` role assignment and recreate it.

##### Request Parameters
{:.api .api-request .api-request-params}

| Parameter | Description                              | Param Type | DataType | Required |
|:----------|:-----------------------------------------|:-----------|:---------|:---------|
| uid       | `id` of user                             | URL        | String   | TRUE     |
| rid       | `id` of role                             | URL        | String   | TRUE     |
| appName   | `name` of app target for role assignment | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

~~~ http
HTTP/1.1 204 No Content
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u6fud33CXDPBXULRNG/roles/KVJUKUS7IFCE2SKO/targets/catalog/apps/amazon_aws"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~ http
HTTP/1.1 204 No Content
~~~

## Role Model

### Example

~~~json
{
  "id": "ra1b7aguRQ7e5iKYb0g4",
  "label": "Read-only Administrator",
  "type": "READ_ONLY_ADMIN",
  "status": "ACTIVE",
  "created": "2015-09-04T03:27:16.000Z",
  "lastUpdated": "2015-09-04T03:27:16.000Z"
}
~~~

### Role Properties

The role model defines several **read-only** properties:

| Property      | Description                                           | DataType                                                                                  | Nullable | Unique | Read Only |
|:------------- |:----------------------------------------------------- |:----------------------------------------------------------------------------------------- |:-------- |:------ |:--------- |
| id            | Unique key for the role assignment                    | String                                                                                    | FALSE    | TRUE   | TRUE      |
| label         | Display name of role                                  | String                                                                                    | FALSE    | FALSE  | TRUE      |
| type          | Type of role                                          | `SUPER_ADMIN`, `ORG_ADMIN`, `APP_ADMIN`, `USER_ADMIN`, `MOBILE_ADMIN`, `READ_ONLY_ADMIN`  | FALSE    | FALSE  | TRUE      |
| status        | Status of role assignment                             | `ACTIVE`                                                                                  | FALSE    | FALSE  | TRUE      |
| created       | Timestamp when app user was created                   | Date                                                                                      | FALSE    | FALSE  | TRUE      |
| lastUpdated   | Timestamp when app user was last updated              | Date                                                                                      | FALSE    | FALSE  | TRUE      |
| _embedded     | Embedded resources related to the role assignment     |        [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                            | TRUE     | FALSE  | TRUE      |
| _links        | Discoverable resources related to the role assignment |        [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                            | TRUE     | FALSE  | TRUE      |

#### Role Types

Some roles support optional targets that constrain the role to a specific set of groups or apps.  If an optional target is not specified, then the role assignment is unbounded (e.g applies to all groups or apps).

Refer to the [product documentation](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm?cshid=Security_Administrators#Security_Administrators) for a complete definition of permissions granted to each role.

| Role Type         | Label                        | Optional Targets        |
|:----------------- |:---------------------------- |:----------------------- |
| `SUPER_ADMIN`     | Super Administrator          |                         |
| `ORG_ADMIN`       | Organizational Administrator |                         |
| `APP_ADMIN`       | Application Administrator    | Apps                    |
| `USER_ADMIN`      | Group Administrator          | [Groups](./groups.html) |
| `MOBILE_ADMIN`    | Mobile Administrator         |                         |
| `READ_ONLY_ADMIN` | Read-only Administrator      |                         |