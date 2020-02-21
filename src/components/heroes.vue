<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <div class="columns">
        <div class="column is-8" v-if="heroes">
          <!-- <heroes-list> -->
          <ul v-if="!selectedHero">
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">{{ hero.firstName }} {{ hero.lastName }}</div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button class="link card-footer-item" @click="selectHero(hero)">
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <!-- <heroes-list> -->

          <HeroDetail
            v-if="selectedHero"
            :hero="selectedHero"
            @cancel="cancelHero"
            @save="saveHero"
          />

          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { data, heroWatchers, lifecycleHooks } from "../shared";
import HeroDetail from "@/components/hero-detail";

export default {
  name: "Heroes",
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: ""
    };
  },
  components: { HeroDetail },
  mixins: [heroWatchers, lifecycleHooks],
  async created() {
    await this.loadHeroes();
  },
  methods: {
    async loadHeroes() {
      this.heroes = [];
      this.message = "getting the heroes, please be patient";
      this.heroes = await data.getHeroes();
      this.message = "";
    },
    cancelHero() {
      this.selectedHero = undefined;
    },
    saveHero(hero) {
      const index = this.heroes.findIndex(h => h.id === hero.id);
      this.heroes.splice(index, 1, hero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = "Where is my cape?";
          break;
        case 1:
          this.capeMessage = "One is all I need";
          break;
        case 2:
          this.capeMessage = "Alway have a spare";
          break;
        default:
          this.capeMessage = "You can never have enough capes";
          break;
      }
    }
  }
};
</script>
