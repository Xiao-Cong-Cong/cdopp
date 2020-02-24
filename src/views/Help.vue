<template>
	<div class="container">
		<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#recharge-modal">
			Launch demo modal
		</button>
		<Recharge></Recharge>
	</div>
</template>

<script>
	import Recharge from './user/Recharge'
	export default {
		name: 'Help',
		data() {
			return {
			}
		},
		components: {
			Recharge
		}
	}
</script>

<style>
</style>
