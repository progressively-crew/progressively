# The project DNA

This project is built with strong opinions concerning what the web could and should be according to me.

As part of this vision of a better web, I'm committing to strictly follow these statements as much as I can. Every contribution and contributors should also agree and make sure not to overcomes these.

If, at any points, you feel the product has issues regarding these statements, make sure to raise the point and [open an issue](https://github.com/mfrachet/rollout/issues) so that we can work on it.

## The dashboard

- Built using progressive enhancement, and will always be
- The service should work without JavaScript for less powerful devices
- Accessibility is not a feature, it's the UX of the product. No compromises.
- Be explicit about everything, every button, every text copy. **No icon without explicit labels.**
- Writing automated tests is not an option — it's mandatory

## The SDKs

- No client side tracking
- A very small SDK, defer computations to the server
- Rely as much as possible on standard APIs using as few external dependencies as possible

## The backend

- No server side tracking
- No database specific attributes and types in the ORM schemas
- Writing automated tests is not an option — it's mandatory
