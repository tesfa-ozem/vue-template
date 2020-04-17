<template>
	<v-app>
		<v-overlay class="overlay" :value="this.$store.getters.loading">
			<v-btn icon @click="overlay = false">
				<v-progress-circular
					:indeterminate="indeterminate"
					:rotate="rotate"
					:size="size"
					:value="value"
					:width="width"
					color="light-blue"
				></v-progress-circular>
			</v-btn>
		</v-overlay>
		<router-view />
	</v-app>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
	indeterminate = true;
	rotate = 0;
	size = 32;
	value = 0;
	width = 4;
}
</script>
<style>
  .overlay{
    z-index: 100!important;
  }
</style>
