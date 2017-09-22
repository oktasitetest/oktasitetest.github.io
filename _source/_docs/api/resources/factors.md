---
layout: docs_page
title: Factors
redirect_from: "/docs/api/rest/factors.html"
---

# Factors API

The Okta Factors API provides operations to enroll, manage, and verify factors for multi-factor authentication (MFA).  Manage both administration and end-user accounts, or verify an individual factor at any time.

## Getting Started with the Factors API

Explore the Factors API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9fdda657d134039fcaba)

## Factor Operations

 - **[List Operations](#factor-operations)** &ndash; List factors and security questions.
 - **[Lifecycle Operations](#factor-lifecycle-operations)** &ndash; Enroll, activate, and reset factors.
 - **[Verification Operations](#factor-verification-operations)** &ndash; Verify a factor

### Get Factor
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/factors/*:fid* %}

Fetches a factor for the specified user

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

[Factor](#factor-model)

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs2bysphxKODSZKWVCT"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "sms2gt8gzgEBPUWBIFHN",
  "factorType": "sms",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2014-06-27T20:27:26.000Z",
  "lastUpdated": "2014-06-27T20:27:26.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

### List Enrolled Factors
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/factors %}

Enumerates all the enrolled factors for the specified user

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Array of [Factors](#factor-model)

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "id": "ufs2bysphxKODSZKWVCT",
    "factorType": "question",
    "provider": "OKTA",
    "status": "ACTIVE",
    "created": "2014-04-15T18:10:06.000Z",
    "lastUpdated": "2014-04-15T18:10:06.000Z",
    "profile": {
      "question": "favorite_art_piece",
      "questionText": "What is your favorite piece of art?"
    },
    "_links": {
      "questions": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "self": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs2bysphxKODSZKWVCT",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "user": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  },
  {
    "id": "ostf2gsyictRQDSGTDZE",
    "factorType": "token:software:totp",
    "provider": "OKTA",
    "status": "PENDING_ACTIVATION",
    "created": "2014-06-27T20:27:33.000Z",
    "lastUpdated": "2014-06-27T20:27:33.000Z",
    "profile": {
      "credentialId": "dade.murphy@example.com"
    },
    "_links": {
      "next": {
        "name": "activate",
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf2gsyictRQDSGTDZE/lifecycle/activate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf2gsyictRQDSGTDZE",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "user": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    },
    "_embedded": {
      "activation": {
        "timeStep": 30,
        "sharedSecret": "HE64TMLL2IUZW2ZLB",
        "encoding": "base32",
        "keyLength": 16
      }
    }
  },
  {
    "id": "sms2gt8gzgEBPUWBIFHN",
    "factorType": "sms",
    "provider": "OKTA",
    "status": "ACTIVE",
    "created": "2014-06-27T20:27:26.000Z",
    "lastUpdated": "2014-06-27T20:27:26.000Z",
    "profile": {
      "phoneNumber": "+1-555-415-1337"
    },
    "_links": {
      "verify": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN/verify",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "self": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms2gt8gzgEBPUWBIFHN",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "user": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      }
    }
  }
]
~~~

### List Factors to Enroll
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/factors/catalog %}

Enumerates all the [supported factors](#supported-factors-for-providers) that can be enrolled for the specified user

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Array of [Factors](#factor-model)

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/catalog"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "factorType": "question",
    "provider": "OKTA",
    "_links": {
      "questions": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "enroll": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "token:software:totp",
    "provider": "OKTA",
    "_links": {
      "enroll": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "token:software:totp",
    "provider": "GOOGLE",
    "_links": {
      "enroll": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "sms",
    "provider": "OKTA",
    "_links": {
      "enroll": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    },
    "_embedded": {
      "phones": [
        {
          "id": "mblldntFJevYKbyQQ0g3",
          "profile": {
            "phoneNumber": "+14081234567"
          },
          "status": "ACTIVE"
        }
      ]
    }
  },
  {
      "factorType": "call",
      "provider": "OKTA",
      "_links": {
        "enroll": {
          "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        }
      }
  },
  {
    "factorType": "token",
    "provider": "RSA",
    "_links": {
      "enroll": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "factorType": "token",
    "provider": "SYMANTEC",
    "_links": {
      "enroll": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
]
~~~

> Notice that the `sms` factor type includes an existing phone number in `_embedded`. You can either use the existing phone number or update it with a new number. See [Enroll Okta SMS factor](#enroll-okta-sms-factor) for more information.


### List Security Questions
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/factors/questions %}

Enumerates all available security questions for a user's `question` factor

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Array of Questions

|---------------+---------------------------+-----------+----------+--------+----------|
| Property      | Description               | DataType  | Nullable | Unique | Readonly |
| ------------- | ------------------------- | --------- | -------- | -------| -------- |
| question      | unique key for question   | String    | FALSE    | TRUE   | TRUE     |
| questionText  | display text for question | String    | FALSE    | FALSE  | TRUE     |
|---------------+---------------------------+-----------+----------+--------+----------|

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
[
  {
    "question": "disliked_food",
    "questionText": "What is the food you least liked as a child?"
  },
  {
    "question": "name_of_first_plush_toy",
    "questionText": "What is the name of your first stuffed animal?"
  },
  {
    "question": "first_award",
    "questionText": "What did you earn your first medal or award for?"
  }
]
~~~

## Factor Lifecycle Operations

### Enroll Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:id*/factors %}

Enrolls a user with a supported [factor](#list-factors-to-enroll)

- [Enroll Okta Security Question Factor](#enroll-okta-security-question-factor)
- [Enroll Okta SMS Factor](#enroll-okta-sms-factor)
- [Enroll Okta Call Factor](#enroll-okta-call-factor)
- [Enroll Okta Verify TOTP Factor](#enroll-okta-verify-totp-factor)
- [Enroll Okta Verify Push Factor](#enroll-okta-verify-push-factor)
- [Enroll Google Authenticator Factor](#enroll-google-authenticator-factor)
- [Enroll RSA SecurID Factor](#enroll-rsa-securid-factor)
- [Enroll Symantec VIP Factor](#enroll-symantec-vip-factor)
- [Enroll YubiKey Factor](#enroll-yubikey-factor)
- [Enroll Okta Email Factor](#enroll-okta-email-factor)

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                   | Param Type  | DataType                | Required |
------------ | --------------------------------------------- | ----------- | ----------------------- | -------- |
id           | `id` of user                                  | URL         | String                  | TRUE     |
templateId   | `id` of SMS template (only for SMS factor)    | Query       | String                  | FALSE    |
factor       | Factor                                        | Body        | [Factor](#factor-model) | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

All responses return the enrolled [Factor](#factor-model) with a status of either `PENDING_ACTIVATION` or `ACTIVE`.

> Some [factor types](#factor-type) require [activation](#activate-factor) to complete the enrollment process.

#### Enroll Okta Security Question Factor
{:.api .api-operation}

Enrolls a user with the `question` factor and [question profile](#question-profile).

> The Security Question factor does not require activation and is `ACTIVE` after enrollment.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "question",
  "provider": "OKTA",
  "profile": {
    "question": "disliked_food",
    "answer": "mayonnaise"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ufs1o01OTMGHLAJPVHDZ",
  "factorType": "question",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2014-08-05T22:58:49.000Z",
  "lastUpdated": "2014-08-05T22:58:49.000Z",
  "profile": {
    "question": "disliked_food",
    "questionText": "What is the food you least liked as a child?"
  },
  "_links": {
    "questions": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1o01OTMGHLAJPVHDZ",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Enroll Okta SMS Factor
{:.api .api-operation}

Enrolls a user with the Okta `sms` factor and an [SMS profile](#sms-profile).  A text message with an OTP is sent to the device during enrollment and must be [activated](#activate-sms-factor) by following the `activate` link relation to complete the enrollment process.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "mbl1nz9JHJGHWRKMTLHP",
  "factorType": "sms",
  "provider": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2014-08-05T20:59:49.000Z",
  "lastUpdated": "2014-08-06T03:59:49.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  },
  "_links": {
    "activate": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/mbl1nz9JHJGHWRKMTLHP/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "sms",
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/mbl1nz9JHJGHWRKMTLHP/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ],
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/mbl1nz9JHJGHWRKMTLHP",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

###### Rate Limit

`429 Too Many Requests` status code may be returned if you attempt to resend an SMS challenge (OTP) within the same time window.

*The current rate limit is one SMS challenge per device every 30 seconds.*

> Okta round-robins between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

~~~json
{
    "errorCode": "E0000109",
    "errorSummary": "An SMS message was recently sent. Please wait 30 seconds before trying again.",
    "errorLink": "E0000109",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
~~~

###### Existing Phone

A `400 Bad Request` status code may be returned if you attempt to enroll with a different phone number when there is an existing mobile phone for the user.

*Currently, a user can enroll only one mobile phone.*

~~~json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: factorEnrollRequest",
    "errorLink": "E0000001",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": [
       {
          "errorSummary": "There is an existing verified phone number."
       }
    ]
}
~~~

##### Enroll Okta SMS Factor by Updating Phone Number
{:.api .api-operation}

If the user wants to use a different phone number (instead of the existing phone number) then the enroll API call needs to supply `updatePhone` option with `true`.

###### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/${userId}/factors?updatePhone=true"
~~~

##### Enroll Okta SMS Factor by Using Existing Phone Number
{:.api .api-operation}

If the user wants to use the existing phone number then the enroll API doesn't need to pass the phone number.
Or, you can pass the existing phone number in a profile object.

###### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA"
}' "https://{yourOktaDomain}.com/api/v1/users/${userId}/factors"
~~~

##### Enroll Okta SMS Factor Using Custom Template
{:.api .api-operation}

Customize (and optionally localize) the SMS message sent to the user on enrollment.
* If the request has an `Accept_Language` header and the template contains a translation for that language, the SMS message is sent using the translated template.
* If the language provided in the `Accept-Language` header doesn't exist, the SMS message is sent using the template text.
* If the provided <em>templateId</em> doesn't match the existing template, the SMS message is sent using the default template.

>For instructions about how to create custom templates, see [SMS Template](/docs/api/resources/templates.html#add-sms-template).


###### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/${userId}/factors?templateId=${templateId}"
~~~

##### Resend SMS as Part of Enrollment Using a Custom Template
{:.api .api-operation}

Customize (and optionally localize) the SMS message sent to the user in case Okta needs to resend the message as part of enrollment.

>For instructions about how to create custom templates, see [SMS Template](/docs/api/resources/templates.html#add-sms-template).


###### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Accept-Language: fr" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "sms",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/${userId}/factors/${factorId}/resend?templateId=${templateId}"
~~~

#### Enroll Okta Call Factor
{:.api .api-operation}

Enrolls a user with the Okta `call` factor and a [Call profile](#call-profile).  A text message with an OTP is sent to the device during enrollment and must be [activated](#activate-call-factor) by following the `activate` link relation to complete the enrollment process.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "call",
  "provider": "OKTA",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "clf1nz9JHJGHWRKMTLHP",
  "factorType": "call",
  "provider": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2014-08-05T20:59:49.000Z",
  "lastUpdated": "2014-08-06T03:59:49.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  },
  "_links": {
    "activate": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1nz9JHJGHWRKMTLHP/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "resend": [
      {
        "name": "call",
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1nz9JHJGHWRKMTLHP/resend",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ],
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1nz9JHJGHWRKMTLHP",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

###### Rate Limit

`429 Too Many Requests` status code may be returned if you attempt to resend a Voice Call challenge (OTP) within the same time window.

*The current rate limit is one Voice Call challenge per device every 30 seconds.*

~~~json
{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests",
    "errorLink": "E0000047",
    "errorId": "oaexL5rislQROquLn3Jec7oGw",
    "errorCauses": []
}
~~~

###### Existing Phone

A `400 Bad Request` status code may be returned if you attempt to enroll with a different phone number when there is an existing phone with 'Voice Call' capability for the user.

*Currently, a user can enroll only one ''voice call' capable phone.*

~~~json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: factorEnrollRequest",
    "errorLink": "E0000001",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": [
       {
          "errorSummary": "Factor already exists."
       }
    ]
}
~~~

#### Enroll Okta Verify TOTP Factor
{:.api .api-operation}

Enrolls a user with an Okta `token:software:totp` factor.  The factor must be [activated](#activate-totp-factor) after enrollment by following the `activate` link relation to complete the enrollment process.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:software:totp",
  "provider": "OKTA"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ostf1fmaMGJLMNGNLIVG",
  "factorType": "token:software:totp",
  "provider": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2014-07-16T16:13:56.000Z",
  "lastUpdated": "2014-07-16T16:13:56.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "activate": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  },
  "_embedded": {
    "activation": {
      "timeStep": 30,
      "sharedSecret": "JBTWGV22G4ZGKV3N",
      "encoding": "base32",
      "keyLength": 6
    },
    "_links": {
      "qrcode": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
        "type": "image/png"
      }
    }
  }
}
~~~

#### Enroll Okta Verify Push Factor
{:.api .api-operation}

Enrolls a user with the Okta verify `push` factor. The factor must be [activated on the device](#activate-push-factor) by scanning the QR code or visiting the activation link sent via email or sms.

> Use the published activation links to embed the QR code or distribute an activation `email` or `sms`.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "push",
  "provider": "OKTA",
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "opfbtzzrjgwauUsxO0g4",
  "factorType": "push",
  "provider": "OKTA",
  "status": "PENDING_ACTIVATION",
  "created": "2015-11-13T07:34:22.000Z",
  "lastUpdated": "2015-11-13T07:34:22.000Z",
  "_links": {
    "poll": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/poll",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  },
  "_embedded": {
    "activation": {
      "expiresAt": "2015-11-13T07:44:22.000Z",
      "factorResult": "WAITING",
      "_links": {
        "send": [
          {
            "name": "email",
            "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/email",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          },
          {
            "name": "sms",
            "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/sms",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        ],
        "qrcode": {
          "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/qr/00Ji8qVBNJD4LmjYy1WZO2VbNqvvPdaCVua-1qjypa",
          "type": "image/png"
        }
      }
    }
  }
}
~~~

#### Enroll Google Authenticator Factor
{:.api .api-operation}

Enrolls a user with the Google `token:software:totp` factor.  The factor must be [activated](#activate-totp-factor) after enrollment by following the `activate` link relation to complete the enrollment process.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:software:totp",
  "provider": "GOOGLE"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ostf1fmaMGJLMNGNLIVG",
  "factorType": "token:software:totp",
  "provider": "GOOGLE",
  "status": "PENDING_ACTIVATION",
  "created": "2014-07-16T16:13:56.000Z",
  "lastUpdated": "2014-07-16T16:13:56.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "activate": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  },
  "_embedded": {
    "activation": {
      "timeStep": 30,
      "sharedSecret": "JBTWGV22G4ZGKV3N",
      "encoding": "base32",
      "keyLength": 16,
      "_links": {
        "qrcode": {
          "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
          "type": "image/png"
        }
      }
    }
  }
}
~~~

#### Enroll RSA SecurID Factor
{:.api .api-operation}

Enrolls a user with a RSA SecurID factor and a [token profile](#token-profile).  RSA tokens must be verified with the [current pin+passcode](#factor-verification-object) as part of the enrollment request.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token",
  "provider": "RSA",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "verify": {
    "passCode": "5275875498",
  }
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "rsabtznMn6cp94ez20g4",
  "factorType": "token",
  "provider": "RSA",
  "status": "ACTIVE",
  "created": "2015-11-13T07:05:53.000Z",
  "lastUpdated": "2015-11-13T07:05:53.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/rsabtznMn6cp94ez20g4/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/rsabtznMn6cp94ez20g4",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Enroll Symantec VIP Factor
{:.api .api-operation}

Enrolls a user with a Symantec VIP factor and a [token profile](#token-profile).  Symantec tokens must be verified with the [current and next passcodes](#factor-verification-object) as part of the enrollment request.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token",
  "provider": "SYMANTEC",
  "profile": {
    "credentialId": "VSMT14393584"
  },
  "verify": {
    "passCode": "875498",
    "nextPassCode": "678195"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ufvbtzgkYaA7zTKdQ0g4",
  "factorType": "token",
  "provider": "SYMANTEC",
  "status": "ACTIVE",
  "created": "2015-11-13T06:52:08.000Z",
  "lastUpdated": "2015-11-13T06:52:08.000Z",
  "profile": {
    "credentialId": "VSMT14393584"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufvbtzgkYaA7zTKdQ0g4/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufvbtzgkYaA7zTKdQ0g4",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Enroll YubiKey Factor
{:.api .api-operation}

Enrolls a user with a YubiCo factor (YubiKey).  YubiKeys must be verified with the [current passcode](#factor-verification-object) as part of the enrollment request.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "factorType": "token:hardware",
  "provider": "YUBICO",
  "verify": {
    "passCode": "cccccceukngdfgkukfctkcvfidnetljjiknckkcjulji"
  }
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ykfbty3BJeBgUi3750g4",
  "factorType": "token:hardware",
  "provider": "YUBICO",
  "status": "ACTIVE",
  "created": "2015-11-13T05:27:49.000Z",
  "lastUpdated": "2015-11-13T05:27:49.000Z",
  "profile": {
    "credentialId": "000004102994"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ykfbty3BJeBgUi3750g4/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "hhttps://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ykfbty3BJeBgUi3750g4",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Enroll Okta Email Factor
{:.api .api-operation}
{% api_lifecycle ea %}

Enrolls a user with an email factor. An email with an OTP is sent to the primary or secondary (depending on which one is enrolled) email address of the user during enrollment. The factor must be [activated](#activate-email-factor) by following the `activate` link relation to complete the enrollment process. An optional `tokenLifetimeSeconds` can be specified as a query parameter to indicate the lifetime of the OTP. The default lifetime is 300 seconds. `tokenLifetimeSeconds` should be in the range 1 to 86400 inclusive.

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "factorType": "email",
    "provider": "OKTA",
    "profile": {
        "email": "test@gmail.com"
    }
  }' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors?tokenLifetimeSeconds=600"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
    "id": "emfnf3gSScB8xXoXK0g3",
    "factorType": "email",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "PENDING_ACTIVATION",
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "resend": [
            {
                "name": "email",
                "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/resend",
                "hints": {
                    "allow": [
                        "POST"
                    ]
                }
            }
        ],
        "self": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "user": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
~~~

###### Invalid Email address response

~~~json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: Only verified primary or secondary email can be enrolled.",
    "errorLink": "E0000001",
    "errorId": "oaeeJunJcxXQlCsrYEwGzN2LQ",
    "errorCauses": []
}
~~~

### Activate Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/lifecycle/activate %}

The `sms` and `token:software:totp` [factor types](#factor-type) require activation to complete the enrollment process.

- [Activate TOTP Factor](#activate-totp-factor)
- [Activate SMS Factor](#activate-sms-factor)
- [Activate Call Factor](#activate-call-factor)
- [Activate Push Factor](#activate-push-factor)
- [Activate Email Factor](#activate-email-factor)

#### Activate TOTP Factor
{:.api .api-operation}

Activates a `token:software:totp` factor by verifying the OTP.

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
passCode     | OTP generated by device                             | Body       | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

If the passcode is correct you will receive the [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/lifecycle/activate"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "ostf1fmaMGJLMNGNLIVG",
  "factorType": "token:software:totp",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2014-07-16T16:13:56.000Z",
  "lastUpdated": "2014-08-06T00:31:07.000Z",
  "profile": {
    "credentialId": "dade.murphy@example.com"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf1fmaMGJLMNGNLIVG",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Activate SMS Factor
{:.api .api-operation}

Activates a `sms` factor by verifying the OTP.  The request/response is identical to [activating a TOTP factor](#activate-totp-factor).

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

If the passcode is correct you will receive the [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP/lifecycle/activate"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "sms1o51EADOTFXHHBXBP",
  "factorType": "sms",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2014-08-06T16:56:31.000Z",
  "lastUpdated": "2014-08-06T16:56:31.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/sms1o51EADOTFXHHBXBP",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Activate Call Factor
{:.api .api-operation}

Activates a `call` factor by verifying the OTP.  The request/response is identical to [activating a TOTP factor](#activate-totp-factor).

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor returned from enrollment             | URL        | String   | TRUE     |
passCode     | OTP sent to mobile device                           | Body       | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

If the passcode is correct you will receive the [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

##### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "12345"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP/lifecycle/activate"
~~~

##### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "id": "clf1o51EADOTFXHHBXBP",
  "factorType": "call",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2014-08-06T16:56:31.000Z",
  "lastUpdated": "2014-08-06T16:56:31.000Z",
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clf1o51EADOTFXHHBXBP",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

#### Activate Push Factor
{:.api .api-operation}

Activation of `push` factors are asynchronous and must be polled for completion when the `factorResult` returns a `WAITING` status.

Activations have a short lifetime (minutes) and will `TIMEOUT` if they are not completed before the `expireAt` timestamp.  Use the published `activate` link to restart the activation process if the activation is expired.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter | Description    | Param Type | DataType | Required | Default
--------- | -------------- | ---------- | -------- | -------- | -------
uid       | `id` of user   | URL        | String   | TRUE     |
fid       | `id` of factor | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter        | Description                    | Param Type | DataType                                                        | Required | Default
---------------- | ------------------------------ | ---------- | --------------------------------------------------------------- | -------- | -------
activationResult | asynchronous activation result | Body       | [Push Factor Activation Object](#push-factor-activation-object) | TRUE     |

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate"
~~~

#### Response Example (Waiting)
{:.api .api-response .api-response-example}

~~~json
{
  "expiresAt": "2015-04-01T15:57:32.000Z",
  "factorResult": "WAITING",
  "_links": {
    "poll": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "qrcode": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/qr/00fukNElRS_Tz6k-CFhg3pH4KO2dj2guhmaapXWbc4",
      "type": "image/png"
    },
    "send": [
      {
        "name": "email",
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate/email",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      {
        "name": "sms",
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate/sms",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    ]
  }
}
~~~

#### Response Example (Timeout)
{:.api .api-response .api-response-example}

~~~json
{
    "factorResult": "TIMEOUT",
    "_links": {
        "activate": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
~~~

#### Response Example (Activated)
{:.api .api-response .api-response-example}

~~~json
{
    "id": "opf3hkfocI4JTLAju0g4",
    "factorType": "push",
    "provider": "OKTA",
    "status": "ACTIVE",
    "created": "2015-03-16T18:01:28.000Z",
    "lastUpdated": "2015-08-27T14:25:17.000Z",
    "profile": {
      "credentialId": "dade.murphy@example.com",
      "deviceType": "SmartPhone_IPhone",
      "name": "Gibson",
      "platform": "IOS",
      "version": "9.0"
    },
    "_links": {
        "verify": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
~~~

#### Activate Email Factor
{:.api .api-operation}
{% api_lifecycle ea %}

Activates an `email` factor by verifying the OTP.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required
------------ | --------------------------------------------------- | ---------- | -------- | -------- 
uid          | `id` of user                                        | URL        | String   | TRUE     
fid          | `id` of factor returned from enrollment             | URL        | String   | TRUE     
passCode     | OTP sent to email                           | Body       | String   | TRUE     

##### Response Parameters
{:.api .api-response .api-response-params}

If the passcode is correct the response contains [Factor](#factor-model) with an `ACTIVE` status.

If the passcode is invalid response will be `403 Forbidden` with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/lifecycle/activate"
~~~

#### Response Example (Activated)
{:.api .api-response .api-response-example}

~~~json
{
    "id": "emfnf3gSScB8xXoXK0g3",
    "factorType": "email",
    "provider": "OKTA",
    "vendorName": "OKTA",
    "status": "ACTIVE",
    "profile": {
        "email": "changed@clouditude.net"
    },
    "_links": {
        "verify": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3/verify",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3/factors/emfnf3gSScB8xXoXK0g3",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://{yourOktaDomain}.com/api/v1/users/00umvfJKwXOQ1mEL50g3",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
~~~


### Reset Factor
{:.api .api-operation}

{% api_operation delete /api/v1/users/*:uid*/factors/*:fid* %}

Unenrolls an existing factor for the specified user, allowing the user to enroll a new factor.

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of the factor to reset                         | URL        | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

`204 No Content`

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1o01OTMGHLAJPVHDZ"
~~~

#### Response Example
{:.api .api-response .api-response-example}

`204 No Content`

## Factor Verification Operations

### Verify Security Question Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/verify %}

Verifies an answer to a `question` factor.

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |
answer       | answer to security question                         | Body       | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                         | Param Type | DataType                                            | Required | Default
------------ | --------------------------------------------------- | ---------- | --------------------------------------------------- | -------- | -------
factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the `answer` is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your answer doesn't match our records. Please try again."
    }
  ]
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "answer": "mayonnaise"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs1pe3ISGKGPYKXRBKK/verify"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~


### Verify SMS Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/verify %}

Verifies an OTP for a `sms` factor.

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |
templateId   | `id` of SMS template                                | Query      | String   | FALSE    |
passCode     | OTP sent to device                                  | Body       | String   | FALSE    |

> If you omit `passCode` in the request a new OTP is sent to the device, otherwise the request attempts to verify the `passCode`.

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                         | Param Type | DataType                                            | Required | Default
------------ | --------------------------------------------------- | ---------- | --------------------------------------------------- | -------- | -------
factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

`429 Too Many Requests` status code may be returned if you attempt to resend a SMS challenge (OTP) within the same time window.

*The current rate limit is one SMS challenge per device every 30 seconds.*

> Okta will round-robin between SMS providers with every resend request to help ensure delivery of SMS OTP across different carriers.

~~~json
{
    "errorCode": "E0000109",
    "errorSummary": "An SMS message was recently sent. Please wait 30 seconds before trying again.",
    "errorLink": "E0000109",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~

#### Verify SMS Factor Using A Custom Template
{:.api .api-operation}

Customize (and optionally localize) the SMS message sent to the user on verification.
* If the request has an `Accept-Language` header and the template contains translation for that language, the SMS message is sent in that language.
* If the language provided in the `Accept-Language` header doesn't exist in the template definition, the SMS message is sent using the template text.
* If the provided `templateId` doesn't match an existing template, the SMS message is sent using the default template.

To create custom templates, see [Templates](/docs/api/resources/templates.html#add-sms-template).

###### Request Example
{:.api .api-request .api-request-example}

Sends the verification message in German, assuming that the SMS template is configured with a German translation

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Accept-Language: de" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  }
}' "https://{yourOktaDomain}.com/api/v1/users/${userId}/factors/${factorId}/verify?templateId=${templateId}"
~~~

### Verify Call Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/verify %}

Verifies an OTP for a `call` factor

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |
passCode     | OTP sent to device                                  | Body       | String   | FALSE    |

> If you omit `passCode` in the request a new OTP is sent to the device, otherwise the request attempts to verify the `passCode`.

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                         | Param Type | DataType                                            | Required | Default
------------ | --------------------------------------------------- | ---------- | --------------------------------------------------- | -------- | -------
factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

`429 Too Many Requests` status code may be returned if you attempt to resend a Voice Call challenge (OTP) within the same time window.

*The current rate limit is one Voice Call challenge per device every 30 seconds.*

~~~json
{
    "errorCode": "E0000047",
    "errorSummary": "API call exceeded rate limit due to too many requests.",
    "errorLink": "E0000047",
    "errorId": "oaeneEaQF8qQrepOWHSkdoejw",
    "errorCauses": []
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/clff17zuKEUMYQAQGCOV/verify"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~

### Verify TOTP Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/verify %}

Verifies an OTP for a `token:software:totp` factor

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |
passCode     | OTP generated by device                             | Body       | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                         | Param Type | DataType                                            | Required |
------------ | --------------------------------------------------- | ---------- | --------------------------------------------------- | -------- |
factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~

### Verify Push Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/verify %}

Creates a new verification transaction and sends an asynchronous push notification to the device for the user to approve or reject.  You must [poll the transaction](#poll-for-verify-transaction-completion) to determine when it completes or expires.

##### Start new Verify Transaction

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |

> The client `IP Address` & `User Agent` of the HTTP request is automatically captured and sent in the push notification as additional context.<br>You should [always send a valid User-Agent HTTP header](../getting_started/design_principles.html#user-agent) when verifying a push factor.

> The **public IP address** of your application must be [whitelisted as a gateway IP address](../getting_started/design_principles.html#ip-address) to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                                          | Param Type | DataType                                             | Required |
------------ | -------------------------------------------------------------------- | ---------- | ---------------------------------------------------- | -------- |
factorResult | verification result (`WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`) | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36" \
-H "X-Forwarded-For: 23.235.46.133" \
"https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opf3hkfocI4JTLAju0g4/verify"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "expiresAt": "2015-04-01T15:57:32.000Z",
  "factorResult": "WAITING",
  "_links": {
    "poll": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "cancel": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    }
  }
}
~~~

#### Poll for Verify Transaction Completion
{:.api .api-operation}

{% api_operation get /api/v1/users/*:uid*/factors/*:fid*/transactions/*:tid* %}

Polls a push verification transaction for completion.  The transaction result is `WAITING`, `SUCCESS`, `REJECTED`, or `TIMEOUT`.

> You should always use the `poll` link relation and never manually construct your own URL.

##### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description         | Param Type | DataType | Required |
------------ | ------------------- | ---------- | -------- | -------- |
uid          | `id` of user        | URL        | String   | TRUE     |
fid          | `id` of factor      | URL        | String   | TRUE     |
tid          | `id` of transaction | URL        | String   | TRUE     |

##### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description         | Param Type | DataType                                             | Required |
------------ | ------------------- | ---------- | ---------------------------------------------------- | -------- |
factorResult | verification result | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

##### Response Example (Waiting)
{:.api .api-response .api-response-example}

~~~json
{
  "expiresAt": "2015-04-01T15:57:32.000Z",
  "factorResult": "WAITING",
  "_links": {
    "poll": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "cancel": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/transactions/mst1eiHghhPxf0yhp0g",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    }
  }
}
~~~

#### Response Example (Approved)
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~

#### Response Example (Rejected)
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "REJECTED",
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "factor": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    }
  }
}
~~~

#### Response Example (Timeout)
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "TIMEOUT",
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "factor": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfh52xcuft3J4uZc0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    }
  }
}
~~~

### Verify Token Factor
{:.api .api-operation}

{% api_operation post /api/v1/users/*:uid*/factors/*:fid*/verify %}

Verifies an OTP for a `token` or `token:hardware` factor

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required |
------------ | --------------------------------------------------- | ---------- | -------- | -------- |
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |
passCode     | OTP generated by device                             | Body       | String   | TRUE     |

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                         | Param Type | DataType                                             | Required |
------------ | --------------------------------------------------- | ---------- | ---------------------------------------------------- | -------- |
factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid you will receive a `403 Forbidden` status code with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf17zuKEUMYQAQGCOV/verify"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~

### Verify Email Factor
{:.api .api-operation}
{% api_lifecycle ea %}

<span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /api/v1/users/*:uid*/factors/*:fid*/verify</span>

Verifies an OTP for an `email` factor

#### Request Parameters
{:.api .api-request .api-request-params}

Parameter    | Description                                         | Param Type | DataType | Required | Default
------------ | --------------------------------------------------- | ---------- | -------- | -------- | -------
uid          | `id` of user                                        | URL        | String   | TRUE     |
fid          | `id` of factor                                      | URL        | String   | TRUE     |
passCode     | OTP sent to email address                                  | Body       | String   | FALSE    | ""                              |
tokenLifetimeSeconds | Lifetime of the OTP when requesting one                        | QueryString | Int | FALSE        | 300

> If you omit `passCode` in the request a new OTP is sent to the email address, otherwise the request attempts to verify the `passCode`.

#### Response Parameters
{:.api .api-response .api-response-params}

Parameter    | Description                                         | Param Type | DataType                                            | Required | Default
------------ | --------------------------------------------------- | ---------- | --------------------------------------------------- | -------- | -------
factorResult | verification result                                 | Body       | [Factor Verify Result](#factor-verify-result-object) | TRUE     |

If the passcode is invalid response will be `403 Forbidden` with the following error:

~~~json
{
  "errorCode": "E0000068",
  "errorSummary": "Invalid Passcode/Answer",
  "errorLink": "E0000068",
  "errorId": "oaei_IfXcpnTHit_YEKGInpFw",
  "errorCauses": [
    {
      "errorSummary": "Your passcode doesn't match our records. Please try again."
    }
  ]
}
~~~

`429 Too Many Requests` status code may be returned if you attempt to resend an Email challenge (OTP) within the same time window.

*The current rate limit is one per email address every 5 seconds.*

~~~json
{
    "errorCode": "E0000118",
    "errorSummary": "An email was recently sent. Please wait 5 seconds before trying again.",
    "errorLink": "E0000118",
    "errorId": "oae0qf10rGJQQeWFX1OSuStdQ",
    "errorCauses": []
}
~~~

#### Request Example
{:.api .api-request .api-request-example}

~~~sh
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "passCode": "123456"
}' "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/emfnf3gSScB8xXoXK0g3/verify?tokenLifetimeSeconds=600"
~~~

#### Response Example
{:.api .api-response .api-response-example}

~~~json
{
  "factorResult": "SUCCESS"
}
~~~

## Factor Model

### Example

~~~json
{
  "id": "smsk33ujQ59REImFX0g3",
  "factorType": "sms",
  "provider": "OKTA",
  "status": "ACTIVE",
  "created": "2015-02-04T07:07:25.000Z",
  "lastUpdated": "2015-02-04T07:07:25.000Z",
  "profile": {
    "phoneNumber": "+1415551337"
  },
  "_links": {
    "verify": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsk33ujQ59REImFX0g3/verify",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/smsk33ujQ59REImFX0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "user": {
      "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  }
}
~~~

### Factor Properties

Factors have the following properties:

|----------------+------------------------------------------------------------------+--------------------------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|
| Property       | Description                                                      | DataType                                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| -------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------- | ------ | -------- | --------- | --------- | ---------- |
| id             | unique key for factor                                            | String                                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| factorType     | type of factor                                                   | [Factor Type](#factor-type)                                                    | FALSE    | TRUE   | TRUE     |           |           |            |
| provider       | factor provider                                                  | [Provider Type](#provider-type)                                                | FALSE    | TRUE   | TRUE     |           |           |            |
| status         | status of factor                                                 | `NOT_SETUP`, `PENDING_ACTIVATION`, `ENROLLED`, `ACTIVE`, `INACTIVE`, `EXPIRED` | FALSE    | FALSE  | TRUE     |           |           |            |
| created        | timestamp when factor was created                                | Date                                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| lastUpdated    | timestamp when factor was last updated                           | Date                                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| profile        | profile of a [supported factor](#supported-factors-for-providers)| [Factor Profile Object](#factor-profile-object)                                | TRUE     | FALSE  | FALSE    |           |           |            |
| verify         | optional verification  for factor enrollment                     | [Factor Verification Object](#factor-verification-object)                      | TRUE     | FALSE  | FALSE    |           |           |            |
| _links         | [discoverable resources](#links-object) related to the factor    | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 | TRUE     | FALSE  | TRUE     |           |           |            |
| _embedded      | [embedded resources](#embedded-resources) related to the factor  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                 | TRUE     | FALSE  | TRUE     |           |           |            |
|----------------+------------------------------------------------------------------+--------------------------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|

> `id`, `created`, `lastUpdated`, `status`, `_links`, and `_embedded` are only available after a factor is enrolled.

#### Factor Type

The following factor types are supported:

|-----------------------+---------------------------------------------------------------------------------------------------------------------|
| Factor Type           | Description                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------|
| `push`                | Out-of-band verification via push notification to a device and transaction verification with digital signature      |
| `sms`                 | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent via SMS to a registered phone number            |
| `call`                | Software [OTP](http://en.wikipedia.org/wiki/One-time_password) sent via Voice Call to a registered phone number     |
| `token`               | Software or hardware [One-time Password (OTP)](http://en.wikipedia.org/wiki/One-time_password) device               |
| `token:software:totp` | Software [Time-based One-time Password (TOTP)](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) |
| `token:hardware`      | Hardware one-time password [OTP](http://en.wikipedia.org/wiki/One-time_password) device                             |
| `question`            | Additional knowledge based security question                                                                        |
| `web`                 | HTML inline frame (iframe) for embedding verification from a 3rd party                                              |
|-----------------------+---------------------------------------------------------------------------------------------------------------------|

#### Provider Type

The following providers are supported:

|------------+-------------------------------|
| Provider   | Description                   |
| ---------- | ----------------------------- |
| `OKTA`     | Okta                          |
| `RSA`      | RSA SecurID                   |
| `SYMANTEC` | Symantec VIP                  |
| `GOOGLE`   | Google                        |
| `DUO`      | Duo Security                  |
| `YUBICO`   | Yubico                        |
|------------+-------------------------------|

#### Supported Factors for Providers

Each provider supports a subset of factor types.  The following table lists the factor types supported for each provider:

|------------+------------------------|
| Provider   | Factor Type            |
| ---------- | -----------------------|
| `OKTA`     | `push`                 |
| `OKTA`     | `question`             |
| `OKTA`     | `sms`                  |
| `OKTA`     | `call`                 |
| `OKTA`     | `token:software:totp`  |
| `OKTA`     | `email`                |
| `GOOGLE`   | `token:software:totp`  |
| `SYMANTEC` | `token`                |
| `RSA`      | `token`                |
| `DUO`      | `web`                  |
| `YUBICO`   | `token:hardware`       |
|------------+------------------------|

### Factor Profile Object

Profiles are specific to the [factor type](#factor-type).

#### Question Profile

Specifies the profile for a `question` factor

|---------------+---------------------------+-----------+---------+---------+----------+-----------+-----------+------------|
| Property      | Description               | DataType  | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ------------- | ------------------------- | --------- | -------- | -------| -------- | --------- | --------- | ---------- |
| question      | unique key for question   | String    | FALSE    | TRUE   | TRUE     |           |           |            |
| questionText  | display text for question | String    | FALSE    | FALSE  | TRUE     |           |           |            |
| answer        | answer to question        | String    | TRUE     | FALSE  | FALSE    |           |           |            |
|---------------+---------------------------+-----------+---------+---------+----------+-----------+-----------+------------|

~~~json
{
  "profile": {
    "question": "favorite_art_piece",
    "questionText": "What is your favorite piece of art?"
  }
}
~~~

#### SMS Profile

Specifies the profile for a `sms` factor

|---------------+-------------------------------+-----------------------------------------------------------------+----------+---------+----------+-----------+-----------+------------|
| Property      | Description                   | DataType                                                        | Nullable | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------- | ----------------------------- | --------------------------------------------------------------- | -------- | ------- | -------- | --------- | --------- | ---------- |
| phoneNumber   | phone number of mobile device | String [E.164 formatted](http://en.wikipedia.org/wiki/E.164)    | FALSE    | TRUE    | FALSE    |           | 15        |            |
|---------------+-------------------------------+-----------------------------------------------------------------+----------+---------+----------+-----------+-----------+------------|

~~~json
{
  "profile": {
    "phoneNumber": "+1-555-415-1337"
  }
}
~~~

E.164 numbers can have a maximum of fifteen digits and are usually written as follows: [+][country code][subscriber number including area code]. Phone numbers that are not formatted in E.164 may work, but it depends on the phone or handset that is being used as well as the carrier from which the call or SMS is being originated.

For example, to convert a US phone number (415 599 2671) to E.164 format, one would need to add the ‘+’ prefix and the country code (which is 1) in front of the number (+1 415 599 2671). In the UK and many other countries internationally, local dialing requires the addition of a 0 in front of the subscriber number. However, to use E.164 formatting, this 0 must be removed. A number such as 020 7183 8750 in the UK would be formatted as +44 20 7183 8750.

#### Call Profile

Specifies the profile for a `call` factor

|---------------+-------------------------------+-----------------------------------------------------------------+----------+---------+----------+-----------+-----------+------------|
| Property      | Description                   | DataType                                                        | Nullable | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------- | ----------------------------- | --------------------------------------------------------------- | -------- | ------- | -------- | --------- | --------- | ---------- |
| phoneNumber   | phone number of the device    | String [E.164 formatted](http://en.wikipedia.org/wiki/E.164)    | FALSE    | TRUE    | FALSE    |           | 15        |            |
| phoneExtension| extension of the device       | String                                                          | TRUE     | FALSE   | FALSE    |           | 15        |            |
|---------------+-------------------------------+-----------------------------------------------------------------+----------+---------+----------+-----------+-----------+------------|

~~~json
{
  "profile": {
    "phoneNumber": "+1-555-415-1337",
    "phoneExtension": "1234"
  }
}
~~~

E.164 numbers can have a maximum of fifteen digits and are usually written as follows: [+][country code][subscriber number including area code]. Phone numbers that are not formatted in E.164 may work, but it depends on the phone or handset that is being used as well as the carrier from which the call or SMS is being originated.

For example, to convert a US phone number (415 599 2671) to E.164 format, one would need to add the ‘+’ prefix and the country code (which is 1) in front of the number (+1 415 599 2671). In the UK and many other countries internationally, local dialing requires the addition of a 0 in front of the subscriber number. However, to use E.164 formatting, this 0 must be removed. A number such as 020 7183 8750 in the UK would be formatted as +44 20 7183 8750.

PhoneExtension is optional.

#### Token Profile

Specifies the profile for a `token`, `token:hardware`, `token:software`, or `token:software:totp` factor

|---------------+--------------------+-----------+----------+---------+----------+-----------+-----------+------------|
| Property      | Description        | DataType  | Nullable | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------- | ------------------ | --------- | -------- | ------- | -------- | --------- | --------- | ---------- |
| credentialId  | id for credential  | String    | FALSE    | FALSE   | TRUE     |           |           |            |
|---------------+--------------------+-----------+----------+---------+----------+-----------+-----------+------------|

~~~json
{
  "profile": {
    "credentialId": "dade.murphy@example.com"
  }
}
~~~

#### Web Profile

Specifies the profile for a `web` factor

|---------------+--------------------+-----------+----------+---------+----------+-----------+-----------+------------|
| Property      | Description        | DataType  | Nullable | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------- | ------------------ | --------- | -------- | ------- | -------- | --------- | --------- | ---------- |
| credentialId  | id for credential  | String    | FALSE    | FALSE   | TRUE     |           |           |            |
|---------------+--------------------+-----------+----------+---------+----------+-----------+-----------+------------|

~~~json
{
  "profile": {
    "credentialId": "dade.murphy@example.com"
  }
}
~~~

#### Email Profile

Specifies the profile for a `email` factor

|---------------+-------------------------------+-----------------------------------------------------------------+----------+---------+----------+-----------+-----------+------------|
| Property      | Description                   | DataType                                                        | Nullable | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------- | ----------------------------- | --------------------------------------------------------------- | -------- | ------- | -------- | --------- | --------- | ---------- |
| email   | email address of the user | String  | FALSE    | TRUE    | FALSE    |           | 100        |            |
|---------------+-------------------------------+-----------------------------------------------------------------+----------+---------+----------+-----------+-----------+------------|

~~~json
{
  "profile": {
    "email": "alice@okta.com"
  }
}
~~~

##### Note

Email factor can be used

* As an out-of-band transactional factor to send an email challenge to a user. This can be injected into any custom step-up flow and is not part of Okta Sign-On (it does not count as MFA for logging onto Okta). This is currently EA.

* As a proper Okta 2nd factor (just like Okta Verify, SMS, etc). This can be configured via the standard MultiFactor UI in the Okta Administrator dashboard. The email factor is then eligible to be used during Okta Sign-On as a valid 2nd factor just like any of other the factors. This is currently BETA.

### Factor Verification Object

Specifies additional verification data for `token` or `token:hardware` factors

|---------------+----------------------------+-----------+----------+---------+----------+-----------+-----------+------------|
| Property      | Description                | DataType  | Nullable | Unique  | Readonly | MinLength | MaxLength | Validation |
| ------------- | -------------------------- | --------- | -------- | ------- | -------- | --------- | --------- | ---------- |
| passCode     | OTP for current time window | String    | FALSE    | FALSE   | FALSE    |           |           |            |
| nextPassCode | OTP for next time window    | String    | TRUE     | FALSE   | FALSE    |           |           |            |
|--------------+-----------------------------+-----------+----------+---------+----------+-----------+-----------+------------|

~~~json
{
  "verify": {
    "passCode": "875498",
    "nextPassCode": "678195"
  }
}
~~~

### Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current status of a factor using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and lifecycle operations.

|--------------------+--------------------------------------------------------------------------------- |
| Link Relation Type | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| self               | The actual factor                                                                |
| activate           | [Lifecycle action](#activate-factor) to transition factor to `ACTIVE` status     |
| questions          | List of questions for the `question` factor type                                 |
| verify             | [Verify the factor](#factor-verification-operations)                             |
| send               | List of delivery options to send an activation or factor challenge               |
| resend             | List of delivery options to resend activation or factor challenge                |
| poll               | Polls factor for completion of activation of verification                        |
|--------------------+--------------------------------------------------------------------------------- |

> The Links Object is **read-only**.

## Embedded Resources

### TOTP Factor Activation Object

TOTP factors when activated have an embedded activation object which describes the [TOTP](http://tools.ietf.org/html/rfc6238) algorithm parameters.

|----------------+---------------------------------------------------+----------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|
| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| timeStep       | time-step size for TOTP                           | String                                                         | FALSE    | FALSE  | TRUE     |           |           |            |
| sharedSecret   | unique secret key for prover                      | String                                                         | FALSE    | FALSE  | TRUE     |           |           |            |
| encoding       | encoding of `sharedSecret`                        | `base32` or `base64`                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| keyLength      | number of digits in an HOTP value                 | Number                                                         | FALSE    | FALSE  | TRUE     |           |           |            |
| _links         | discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
|----------------+---------------------------------------------------+----------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|

~~~json
{
  "activation": {
    "timeStep": 30,
    "sharedSecret": "HE64TMLL2IUZW2ZLB",
    "encoding": "base32",
    "keyLength": 6
  }
}
~~~

### Push Factor Activation Object

Push factors must complete activation on the device by scanning the QR code or visiting activation link sent via email or sms.

|----------------+---------------------------------------------------+----------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|
| Property       | Description                                       | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| expiresAt      | lifetime of activation                            | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| factorResult   | result of factor activation                       | `WAITING`, `CANCELLED`, `TIMEOUT`, or `ERROR`                  | FALSE    | FALSE  | TRUE     |           |           |            |
| _links         | discoverable resources related to the activation  | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE     |           |           |            |
|----------------+---------------------------------------------------+----------------------------------------------------------------+----------+--------+----------+-----------+-----------+------------|

~~~json
{
  "activation": {
    "expiresAt": "2015-11-13T07:44:22.000Z",
    "factorResult": "WAITING",
    "_links": {
      "send": [
        {
          "name": "email",
          "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/email",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        },
        {
          "name": "sms",
          "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/lifecycle/activate/sms",
          "hints": {
            "allow": [
              "POST"
            ]
          }
        }
      ],
      "qrcode": {
        "href": "https://{yourOktaDomain}.com/api/v1/users/00u15s1KDETTQMQYABRL/factors/opfbtzzrjgwauUsxO0g4/qr/00Ji8qVBNJD4LmjYy1WZO2VbNqvvPdaCVua-1qjypa",
        "type": "image/png"
      }
    }
  }
}
~~~

#### Push Factor Activation Links Object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the push factor activation object using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.  This object is used for dynamic discovery of related resources and operations.

|--------------------+------------------------------------------------------------------------------------|
| Link Relation Type | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| qrcode             | QR code that encodes the push activation code needed for enrollment on the device  |
| send               | Sends an activation link via `email` or `sms` for users who can't scan the QR code |
|--------------------+------------------------------------------------------------------------------------|


### Factor Verify Result Object

Describes the outcome of a factor verification request

|---------------+---------------------------------------------------+---------------------------------+----------+--------+----------|-----------|-----------+------------|
| Property      | Description                                       | DataType                        | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ------------- | ------------------------------------------------- | ------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| factorResult  | result of factor verification                     | [Factor Result](#factor-result) | FALSE    | FALSE  | TRUE     |           |           |            |
| factorMessage | optional display message for factor verification  | String                          | TRUE     | FALSE  | TRUE     |           |           |            |
|---------------+---------------------------------------------------+---------------------------------+----------+--------+----------|-----------|-----------+------------|

#### Factor Result

Specifies the status of a factor verification attempt

|------------------------+-------------------------------------------------------------------------------------------------------------------------------------|
| Result                 | Description                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------|
| `SUCCESS`              | The factor was successfully verified.                                                                                                    |
| `CHALLENGE`            | Another verification is required.                                                                                                    |
| `WAITING`              | The factor verification has started but not yet completed (e.g user hasn't answered phone call yet).                                     |
| `FAILED`               | The factor verification failed.                                                                                                          |
| `REJECTED`             | The factor verification was denied by user.                                                                                              |
| `CANCELLED`            | The factor verification was canceled by user.                                                                                            |
| `TIMEOUT`              | Okta was unable to verify the factor within the allowed time window.                                                                              |
| `TIME_WINDOW_EXCEEDED` | The factor was successfully verified but outside of the computed time window.  Another verification is required in current time window. |
| `PASSCODE_REPLAYED`    | The factor was previously verified within the same time window.  The user must wait another time window and retry with a new verification.  |
| `ERROR`                | An unexpected server error occurred verifying factor.                                                                                  |
|------------------------+-------------------------------------------------------------------------------------------------------------------------------------|
