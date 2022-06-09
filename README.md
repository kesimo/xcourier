![Alt text](docs/icons/Xcourier-banner-1250x300px.png?raw=true 'Xcourier-Banner')

<center> <h2>Email Notification Api</h2> </center>
<center> Fast set-up and highly customizable based on NodeJs </center>

<h2 style="color: blue">Configuration</h2>

<h2 style="color: blue">Templates</h2>

### Default template

### Message only

### Custom Templates

<h2 style="color: blue">Docker Set-Up</h2>

<h2 style="color: blue">Usage example</h2>

### Configuration

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
    subject: 'Alert from 123'
  - id: 'prefere-json1' #first defined id qould be used in case of duplicate ids
    receivers: [test456@mail1.de, test2@mail2.de] # without "'"
    payload_type: prefer_json #default is prefere_json ; possible values ->   preferQuery = 'prefer_query',prefer_json','only_query','only_json','only_message'
    subject: 'Alert from 456'
  - id: 'json-only1'
    receivers: [kev.ed.simon@gmail.com, lg2xspeed@googlemail.com]
    payload_type: only_json
    message: 'testmessage -> json only' # default 'new notificaton from id'
    linked_url: https://github.com
    linked_url_tag: git
    subject: 'Alert from 1 sub'
  - id: 'message-only1'
    receivers: [kev.ed.simon@gmail.com, lg2xspeed@googlemail.com]
    payload_type: only_message
    message: 'testmessage -> only message'
    linked_url: https://github.com
    linked_url_tag: git
    subject: 'Alert from 1 sub'
  - id: 'only-query1'
    receivers: [kev.ed.simon@gmail.com, lg2xspeed@googlemail.com]
    payload_type: only_query
    message: 'testmessage'
    linked_url: https://github.com
    linked_url_tag: git
    subject: 'Alert from 1 sub'
  - id: 'template-defaults1'
    receivers: [kev.ed.simon@gmail.com, lg2xspeed@googlemail.com]
    message: 'testmessage'
    subject: 'Alert from 2 sub (second)'
    template_defaults:
      user: 'unknown'
      property: 123123
      arrayprop:
        - id: '1'
        - id: '2'
  - id: 'custom1'
    receivers: [kev.ed.simon@gmail.com, lg2xspeed@googlemail.com]
    template_path: 'custom_message.hbs'
    message: 'custom template usage one'
    subject: 'Alert from 1custom template'
  - id: 'custom2'
    receivers: [kev.ed.simon@gmail.com, lg2xspeed@googlemail.com]
    template_path: 'sub/custom_message.hbs'
    message: 'custom template usage two'
    subject: 'Alert from 2custom template sub'
```

### Request

### Output

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
