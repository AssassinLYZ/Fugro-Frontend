# 💻 React + TypeScript + Vite

- It is quicker than CRA and better for futher configrations

# 🐵 Features：

- Typescript used
- Fully responsive
- Well structured
- mapbox introduced

# 🏗️ Project Src Dir Structure

- src
  - components：components going to be used for the entire project
  - lib：
    - apis：encapsulation for Api Fetching
    - utils: Fuctions encapsulation
  - pages: pages
    - home:
      - components: home page components
      - index: home page
  - styles: general styles
  - types: general types
  - store: global store

# 🏠 Additional Libraries used

- eslint-plugin-react : eslint extansion
- sass : for better css structure

# 🎯Further Steps

1. I didn't add unit testing since there is only few utils functions. If necessary， I can do it later
2. Since it is a practice and there is no specific requirment to present the all the positions, I didn't take care of the proformance too much.
   I didn't initially store all the recieved positions to caculate the average position and the positions will only be loaded into memory when needed.
   As our dataset grows over time, displaying all points becomes increasingly resource-intensive.

   We can take care of it with several steps:

   - add a map cluster to reduce rendering
   - Load incrementally instead of all at once.
   - add Virtual List to render the previous postions on the board
