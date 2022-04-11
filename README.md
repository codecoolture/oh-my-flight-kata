# OhMyFlight Kata

We need to create a service that pulls flights information from a 3rd party service and stores it for later consumption. This service will provide a REST-like API with the following two endpoints:

- `POST /_/sync?start_date=<YYYY-MM-DD>&end_date=<YYYY-MM-DD>`: performs a call to the 3rd party service and save the information in the database. We won't control when this endpoint will be called, but we know there will be some kind of scheduled process that will perform requests every X minutes. This endpoint will respond with a simple JSON report with the results.

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

- `GET /flights`: returns the collection of flights in the database. It has to support the following filters:

  - `max_price=<number>`: returns the flights with price less or equal than `<number>`.
  - `to=<location>`: returns the flights landing at `<location>`.
  - `from=<location>`: returns the flights departing from `<location>`.

  The response from this endpoint should comply with the following schema:

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
