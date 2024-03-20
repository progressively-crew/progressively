<div align="center">
 <p><strong>All in one toolbox for feature flags <br/>& analytics
Anonymous, Open Source & Self-hosted</strong></p>
 <img src="https://github.com/progressively-crew/progressively/assets/3874873/d3c331b1-25b2-41e9-a622-084b9e23fa7b" alt="Progressively" width="300px"/>
</div>

<br />

<div align="center">
 <a href="https://progressively.app/" target="_blank" rel="noopener noreferrer">Website</a> | 
 <a href="https://docs.progressively.app/" target="_blank" rel="noopener noreferrer">Get started</a>
</div>

## Overview

Imagine your product is a bustling metropolis, with features as its buildings and user interactions as its roads 🏙️.

Now, to understand and enhance the flow of traffic 🚃 – your users' journeys – you're equipped with four essential tools.

**Quantitative analytics** act as your high-tech traffic counters, measuring the volume of cars and their speed, giving you a bird's-eye view of which roads are most traveled.

**Qualitative analytics** are your street interviews, revealing why certain paths are favored and how the journey feels for the travelers.

**Feature flags** serve as your experimental detours 🚧, allowing you to test new routes on a small scale before opening them to the public.

**And event funneling** is your map 🗺️, showing the most common paths taken and highlighting bottlenecks. Together, these tools empower you to make data-driven decisions, optimizing the city's layout for smoother traffic, happier commuters, and a more vibrant metropolis.

## Roadmap

### Feature flags

- [x] Single variant feature flag (e.g: `true` or `false`)
- [x] Multi variants feature flags (e.g: `Control`, `A`, `B`, you name it)
- [x] Flag activation based on date & time (`before the`, `after the`, `always`)
- [x] Progressively rollout (from `0%` to `100%` of the target audience)
- [x] Attribute based targeting (you provide a couple fields/value and can restrict flag evaluation for these couples)
- [x] Webhooks triggering on flag toggle
- [x] Insights on variants evaluated by your audience over time
- [x] Real time update with websockets (opt-in) in the JS sdk
- [x] SSR SDK for frameworks like Remix, Nextjs etc...

### Analytics

**Quantitative**

- [x] Page views count
- [x] Unique visitors count
- [x] Bounce rate
- [x] Page views per browser
- [x] Page views per OS
- [x] Page views per viewport
- [x] Page views per refer(r)er
- [x] Page views per URL
- [ ] Compare the previous period to the current one to get percentage of evolution

**Qualitative**

- [ ] (In progress) Most clicked spots on the page

### Funnels

- [x] Configure a funnel with feature flags + variants and Page Views + URL
- [ ] (In progress) Find an optimized way to retrieve the funnel data with clickhouse

### Error and exception

Tbd.

### Screen recording

Tbd.
