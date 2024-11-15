<script>
  import Typed from 'typed.js';
  import { onMount } from 'svelte';

  export let messages;
  export let typeSpeed = 10;        // default typing speed
  export let deleteDelay = 60000;   // default delay before deleting
  export let startDelay = 1000;     // default start delay
  export let loop = false;          // default loop setting
  export let loopCount = false;     // default loop count
  export let cursorChar = '|';      // default cursor character

  let element;  // reference to the element where typing will occur

  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (currentIndex !== 0) {
      // pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // and swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onMount(() => {
    const shuffledMessages = [...messages];
    shuffle(shuffledMessages);

    const typed = new Typed(element, {
      strings: shuffledMessages,
      typeSpeed: typeSpeed,
      backDelay: deleteDelay,
      startDelay: startDelay,
      loop: loop,
      loopCount: loopCount,
      cursorChar: cursorChar,
      backSpeed: 30,        // speed of delete
      smartBackspace: true, // only delete what doesn't match next string
    });

    // cleanup on component destruction
    return () => {
      typed.destroy();
    };
  });
</script>

<div class="headline-container">
  <h3>
    <!-- add wrapper div with minimum width based on longest message -->
    <div class="typing-wrapper">
      <span bind:this={element}></span>
    </div>
  </h3>
</div>

<style>
  .headline-container {
    /* prevent layout shift by setting minimum height */
    min-height: 4rem;
    /* ensure container is always present */
    display: block;
  }

  .typing-wrapper {
    /* set minimum width based on longest message */
    min-width: 4ch;
    /* keep text aligned consistently */
    display: inline-block;
    /* ensure this wrapper doesn't collapse */
    min-height: 1.5em;
    /* vertical alignment */
    vertical-align: bottom;
  }

  h3 {
    /* ensure consistent height */
    line-height: 1.5;
  }
</style>
