<h1 align="center">
  OhMyFlight ✈️ Kata
</h1>

<div align="center">
  <img src="./.github/tddworkshop.png" width="600" align="center">

  <p>
    Hire
    <strong><a href="https://tddworkshop.com" target="blank">The TDD Workshop</a></strong>
    by
    <strong><a href="https://codecoolture.com" target="">Codecoolture</a></strong>.
  </p>
</div>

## The exercise

We need to create a service that pulls flights information from a 3rd party service and stores it for later consumption. This service will provide a REST-like API with the following two endpoints:

- `POST /_/sync?start_date=<YYYY-MM-DD>&end_date=<YYYY-MM-DD>`: performs a call to a 3rd party service and saves the information in the database. We don't control when this endpoint is called (but we may expect a scheduled process performing requests every few minutes). The response is a JSON document with the sync results.

```json
{
  "stats": {
    "flights": {
      "total": 23,
      "new": 4,
      "updated": 19,
      "deleted": 0
    },

    "pricing": {
      "min": 23,
      "median": 124.4,
      "max": 349
    }
  }
}
```

- `GET /flights`: returns the collection of flights in the database. It supports the following filters:

  - `max_price=<number>`: returns the flights with price less or equal than `<number>`.
  - `to=<location>`: returns the flights landing at `<location>`.
  - `from=<location>`: returns the flights departing from `<location>`.

  The responses from this endpoint comply with the following schema:

  ```json
  {
    "data": [
      {
        "code": "IB480",
        "departingAt": "20220510T10:50:00.000Z",
        "from": "OVD",
        "landingAt": "20220510T12:00:00.000Z",
        "to": "MAD",
        "price": 150
      },
      {
        "code": "FR5998",
        "departingAt": "20220510T17:10:00.000Z",
        "from": "STN",
        "landingAt": "20220510T19:30:00.000Z",
        "to": "MAD",
        "price": 50
      }
    ]
  }
  ```

## Considerations

### The 3rd party service

The 3rd party service to get flights information can be found at `https://oh.my.flight.com` (of course, this is a made-up service 😁). It is a pay-per-use, authenticated REST API. Authentication is done by setting an `X-OhMyFlight-Token` HTTP header with an API token. They provide the following endpoint to get all the flights information:

- `GET https://oh.my.flight.com/api/flights?start_date=<YYYY-MM-DD>&end_date=<YYYY-MM-DD>`. Both parameters are mandatory. The response will comply with the following schema:

```json
{
  "data": [
    {
      "code": "IB480",
      "departingAt": "20220510T10:50:00.000Z",
      "from": "OVD",
      "landingAt": "20220510T12:00:00.000Z",
      "to": "MAD",
      "price": 150
    },
    {
      "code": "FR5998",
      "departingAt": "20220510T17:10:00.000Z",
      "from": "STN",
      "landingAt": "20220510T19:30:00.000Z",
      "to": "MAD",
      "price": 50
    }
  ]
}
```
