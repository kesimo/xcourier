![Alt text](docs/icons/Xcourier-banner-1250x300px.png?raw=true 'Xcourier-Banner')

<center> <h2>Email Notification Api</h2> </center>
<center> Fast set-up and highly customizable based on NodeJs </center>
<center> Supports custom handlebars templates and many more features</center>

### Usage Example

#### Configuration

```yaml
email:
  #smtp_url: ''
  host: smtp.example.com
  port: 2528
  ignore_tls: false
  secure: false
  require_tls: true
  user: ***
  password: ***
  default_from: test@from.com
  default_name: 'Example from'
endpoints:
  - id: 'example-id'
    receivers: [alex.sampler@testmail.com, ann@company.example]
    payload_type: only_json
    message: 'New Notification from SystemX' # default 'new notificaton from id'
    linked_url: https://example.com
    linked_url_tag: example-action
    subject: 'Alert from SystemX'
```

#### Request

_note: GET,POST,PUT methods are allowed_
_for more information see [Request-Types](#Request-Types)_

```bash
curl --location --request POST 'http://localhost:3001/example-id' \
--header 'Authorization: Basic ********' \
--header 'Content-Type: application/json' \
--data-raw '{
"user": "systemRoot",
"id": 733599,
"Action": "get_overview",
"time": 1650949483,
"error_message": "TypeError: Cannot read properties of undefined",
"stacktrace": [
"at Object. (/home/cg/root/2523129/main.js:20:11)"
],
"hash": "00000000000000000007fc4fdf669fed9c64c210f48b2911c8c206e25bbf413b"
}'
```

#### Output

![Alt text](docs/images/screenshot-mail-template.png?raw=true 'Example-Template')

### Docker Set-Up

**docker run**

```bash
docker run -it --rm -v $(PWD)/config:/usr/src/app/xcourier/config \
  -p 3001:3001 \
  -e URL_PREFIX="/api" \
  -e PORT=3001 \
  -e DEBUG=false -e BASIC_AUTH_USERNAME="root" \
  -e BASIC_AUTH_PASSWORD="root" \
  -e TZ="Europe/Berlin" \
  --name xcourier-demo \
  kesim0/xcourier:latest
```

**docker-compose**

```bash
version: '3.3'
services:
    xcourier:
        container_name: xcourier-demo
        image: 'kesim0/xcourier:latest'
        volumes:
            - '$(PWD)/config:/usr/src/app/xcourier/config'
        ports:
            - '3001:3001'
        environment:
            - URL_PREFIX=/api
            - PORT=3001
            - DEBUG=false
            - BASIC_AUTH_USERNAME=root
            - BASIC_AUTH_PASSWORD=root
            - TZ=Europe/Berlin
```

### Configuration

#### Global configuration environment variables

| Property            | type    | example             |
| ------------------- | ------- | ------------------- |
| debug               | boolean | true                |
| port                | number  | 3000 (default)      |
| url_prefix          | string  | /sub (default: '/') |
| basic_auth_username | string  |                     |
| basic_auth_password | string  |                     |
| api_key             | string  | _in progress_       |

#### smtp configuration properties (email)

| Property     | type           | example                                      |
| ------------ | -------------- | -------------------------------------------- |
| smtp_url     | string         | smtps://user@domain.com:pass@smtp.domain.com |
| host         | string         | smtp.domain.com                              |
| port         | number         | 1025                                         |
| ignore_tls   | boolean        | false                                        |
| secure       | boolean        | false                                        |
| require_tls  | boolean        | true                                         |
| user         | string         | sampleuser1                                  |
| password     | string         | samplepass123                                |
| default_from | string (email) | test@domain.com                              |
| default_name | string         | example                                      |
|              |                |                                              |

#### endpoint configuration properties

| Property          | type             | description                                                                 | example                                                                 |
| ----------------- | ---------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| id                | string           | sub-url for endpoint [REQUIRED]                                             | 'alert-all' -> domain.com/notify-all                                    |
| payload_type      | string           | specify the payload source to use / prefer [DEFAULT: prefere_json]          | 'prefer_query', prefer_json', 'only_query', 'only_json', 'only_message' |
| receivers         | Array of strings | specify receivers by email for specific endpoint [REQUIRED]                 | [user1@domain1.com, user2@domain2.com]                                  |
| subject           | string           | subject of mail                                                             |                                                                         |
| template_path     | string           | path for custom handlebars template [OPTIONAL -> else use default template] | 'custom_template1.hbs', 'sub/custom_template2.hbs'                      |
| message           | string           | static message for default template [OPTIONAL]                              |                                                                         |
| linked_url        | string(URL)      | static url for call-to action button in default template [OPTIONAL]         |                                                                         |
| linked_url_tag    | string           | tag for call-to action button in default template [OPTIONAL]                |                                                                         |
| template_defaults | object (any)     | default value definitions for payload (use in case of missing properties)   |                                                                         |

#### example yaml configurations

```yaml
email:
  #smtp_url: ''
  host: smtp.domain.com
  port: 1234
  ignore_tls: false
  secure: false
  require_tls: true
  user: username1
  password: password123
  default_from: test@from.com
  default_name: 'Example from'
endpoints:
  - id: 'minimal'
    receivers: [test@mail1.de, test2@mail2.de]
    subject: 'Alert from minimal'
  - id: 'prefere-json1' #first defined id would be used in case of duplicate ids
    receivers: [test456@mail1.de, test2@mail2.de] # without "'"
    #default: prefere_json
    #possible values: 'prefer_query',prefer_json','only_query','only_json','only_message'
    payload_type:
      prefer_json
      # default 'new notificaton from {id}'
    message: 'New message from json example'
    linked_url: https://example.com #optional
    linked_url_tag: example-action #optional
    subject: 'Json Example send'
  - id: 'json-only1'
    receivers: [alex.sampler@testmail.com, ann@company.example]
    payload_type: only_json
    message: 'testmessage -> json only' # default 'new notificaton from id'
    linked_url: https://github.com
    linked_url_tag: git
    subject: 'Alert from 1 sub'
  - id: 'template-defaults1'
    receivers: [alex.sampler@testmail.com, ann@company.example]
    message: 'testmessage'
    subject: 'Message from defaults'
    # Default values overridden by payload
    template_defaults:
      user: 'unknown'
      property: 123123
      arrayprop:
        - id: '1'
        - id: '2'
  - id: 'custom1'
    receivers: [alex.sampler@testmail.com, ann@company.example]
    # sub-paths are allowed -> 'sub/custom_message.hbs'
    template_path: 'custom_message.hbs'
    message: 'custom template usage one'
    subject: 'Alert from custom template'
```

### Request-types

- Possible Types: GET, POST, PUT
- Possible Payload-Types: Json, Query parameters
- additional URL Prefix can be defined as environment variable: `URL_PREFIX`
- additional Basic-Auth can be defined as environment variable: `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` _(default: admin:admin)_
- additional API-Key can be defined as environment variable: `API_KEY` _(*in progress*)_

**Payload Type**

- `prefer_query`: merges json and query parameters but overwrite json props with query properties if key is equal
- `prefer_json`: merges json and query parameters but overwrite query props with json properties if key is equal
- `only_query`: only query parameters will be used
- `only_json`: only json payload is used (no query parameters)
- `only_message`: ignores payload and uses message instead

**Query-Parameters**

```bash
curl --location --request POST 'http://localhost:3000/{id}?param1=1&param2=value' \
--header 'Authorization: Basic ****'
```

### Custom Templates

It is possible to use custom handlebars templates. In this case some values are
reserved for the template:

- `internal.id`: id of the message
- `internal.message`: message title
- `internal.raw_data`: raw data of the message
- `internal.timestamp`: timestamp of the message (send time)
- `internal.subject`: subject of the message

The `*.hbs` files must be located in the `./templates/mail-templates` folder.
or in case of docker usage in the `/templates` directory. It is possible to use
sub-paths for the templates.

For more Information about how to use handlebars templates please see the [Handlebars](https://handlebarsjs.com/guide/expressions.html) documentation.

## Roadmap

- [ ] only env set-up (w/o \*.yaml)
- [ ] global properties
- [ ] token authentication
- [ ] Multi-user configuration
- [ ] sub-ids as entrypoint
- [ ] Parse XML data
- [ ] Enable/disable visualizations in default template
- [ ] Select Properties or sub property for grid in default template
- [ ] Fonts for default template
- [ ] queue incoming requests
