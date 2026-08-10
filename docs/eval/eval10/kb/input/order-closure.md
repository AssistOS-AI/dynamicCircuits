# Mandatory order closure

Every current raw order must be normalized. Every normalized order must then receive both an approval assessment and a
currency assessment. These obligations are independent of which KB packages a coding agent remembers to call.

1. `order.raw` activates normalization. Normalization converts the amount to a finite number, uppercases the currency, keeps
   the supplied approval flag, and publishes `order.normalized`.
2. `order.normalized` activates approval assessment. Orders of at least 10,000 require explicit approval.
3. `order.normalized` also activates currency assessment. EUR, USD, and RON are supported; other supplied currencies produce
   a non-compliant finding rather than disappearing.

The expected fixed point for N valid raw orders contains N normalization instances and 2N second-round assessment instances.
