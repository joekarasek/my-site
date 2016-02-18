# Issues I'v found

1. [x] Navbar not responding to position on the page (should become transparent).

2. [x] Background image is not showing. Transparancy behavior is in the css tied to a class "landing" that is not being assigned to the body of the html upon load. Can hard code landing in, but I'm afraid that what ever is broken on assigning the class to body is failing to assign the proper class else where.  **Patched by adding class .landing to body, this should be assigned through js at load, not sure where it is broken.**

3. [ ] Background image Transparancy disappears at screen resize, anything that removes class .is-mobile.

4. [ ] Images next to project population has sizing issues in middle of range after .is-mobile disappears.
