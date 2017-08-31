# Making Music With Online Data Workshop
Or Fleisher + Dror Ayalon


### so, what's up?
- run stuff by loading ``index.html`` and running the test function on the console:
```javascript
test()
```

- In general, the function ``triggerNote(type, tweet)`` is being called for every socket.io message.  
This means that the socket message should contain the following stuff:
  - **type (string)**: The type of tweet - 'regular' or 'rare'. Maybe based on different hashtags.
  - **tweet (string)**: The raw text of the tweet.

- I tried to make the code as simple as possible. Even though it's not too long, I'm sure we can make this code even simpler for a workshop setup.

### things to keep in mind
- ``Tone.min.js``, ``Tone.min.js``, ``socket.io.min.js`` were added as files. If we want to serve them from a CDN, we'll need to update ``index.html``.

- When we integrate node.js, we'll probably want to move ``styles.css`` to ``public/css`` directory, ``index.html`` to ``views/``, etc. Again, we'll need to update ``index.html``.

- **socket.io** code is currently commented out on ``sound.js``. why? because it throws annoying errors when it doesn't detect a socket connection, which we would have since we'll serve all files with node.js.

  
--

☮️ + 💟
