<!-- HTML Template-->
<template>
  <div class="flex row app-coffee">
    <div class="app-coffee__environment">
      <div class="header">
        #TeamTrees
      </div>

      <a href="https://teamtrees.org/#donate" class="team-trees-link" target="_blank">
        <span>Click Me</span> Let's Plant Some Trees! <span>Click Me</span>
      </a>

      <p class="content">
        <strong>Please take a moment to read this</strong>
        <br><br>
        Within the next 100 years, its said that all rainforests will be gone.
        <br>
        That means that if you've just had a child, they might see the end of the last rainforest.
        <br>
        There are more than 121 natural remedies in the rain forest, which can be used as medicines.
        <br>
        Up to 28,000 species are expected to become extinct by the next quarter of the century due to deforestation.
        <br>
        In fact, An average of 137 species of life forms are driven into extinction every day in the world’s tropical rainforests.
        <br>
        1.6 billion people across the globe depend on forest products for their livelihoods, thereby adding more to deforestation.
        <br><br>
        Unfortunately it's not good enough to just wait for the scientists to solve everybody's problems.
        <br>
        We need to all play our part, monitor our own personal carbon footprint, and consider buying more diverse forms of food.
        <br>
        We need to contribute to biome diversity and try to move away from monoculture agriculture in order to preserve our forests and natural habitats properly.
        <br><br>
        Environmental impact is one of the reasons that I created this application in the first place.
        <br>
        I would like to urge you to donate to #TeamTrees and help to restore the biome densities on our planet.
        <br>
        We only have one planet and we have been exploiting her for monetary gain for too long now.
        <br><br>
        If you want to pay something out of the kindness of your heart, please rather contribute to this charity
        rather than buying me a coffee.
        <br><br>
        <strong>Let's work together to save our planet! :)</strong>
      </p>
    </div>

    <div class="app-coffee__chris">
      <div class="my-details">
        <img src="@/assets/images/chris.jpg"/>

        <div class="name"> Christopher Oliver</div>
        <div class="tagline"> Author</div>

        <a class="app-coffee__facebook-link"
           href="https://www.facebook.com/LifeApp-free-102947295103698"
           target="_blank">
          Facebook Page
        </a>
        <a class="app-coffee__buy-link"
           href="https://www.buymeacoffee.com/lethiux"
           target="_blank">
          Buy me a coffee
        </a>
      </div>

      <p class="my-story">
        <strong>Hey! Nice to meet you! :)</strong>
        <br><br>
        I'm a developer by trade, specifically within the custom enterprise software solutions space.
        <br>
        I have a wife and son who are currently trapped in Venezuela due to the pandemic.
        <br>
        All money raised here will go toward getting visas and flight tickets for them to get home, once their passports
        that side have been processed.
        <br>
        I actually haven't met my son yet, as he was born that side during the beginning of the pandemic. So I'm really
        excited to meet him!

        <br><br>

        <strong>LifeApp Directions:</strong>
        <br><br>
        My goal is to create LifeApp into an all inclusive life management suite, but available for free.
        <br>
        I've only developed the Routine Planner module within the Desktop application so far, and it has yet to be
        digitally signed.
        <br>
        This is because I'm trying to get testing finished first, and then I will get it digitally signed afterward
        (it's expensive).
        <br>
        I have started developing a mobile application to compliment the LifeApp Desktop application, but both will be
        independent of one another.
        <br>
        The mobile application will also be free.
        <br>
        I'm open to ideas and opinions, so if you have any then please reach out!
        <br><br>
        Thanks for reading!
      </p>
    </div>
  </div>
</template>


<!-- TypeScript Class -->
<script lang="ts">

import 'reflect-metadata';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Coffee',
  components: {}
})
export default class Coffee extends Vue {
}

</script>

<style lang="scss">
@import "../theme/index";
</style>
