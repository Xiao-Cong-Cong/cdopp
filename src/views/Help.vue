<template>
	<div class="container">
		<p>help {{ page }} / {{ total }}</p>
		<Pagination v-model="page" :total="total"></Pagination>
		<table class="table table-hover">
			<tr>
				<td>1</td>
				<td>2</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import Pagination from '../components/Pagination'
	export default {
		name: 'Help',
		data() {
			return {
				page: 1,
				total: 200
			}
		},
		components: {
			Pagination
		}
	}
</script>

<style>
</style>
