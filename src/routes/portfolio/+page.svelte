<h1>Portfolio Page</h1>
<div class="portfolio">
	<div class="flex-row">
		<div class="cut-off">
			<!-- retrieve missing images from old project -->
			<img width="300px" src="./photo-1572985025058-f27aeca1b8bf.avif" alt="" />
			<h2>css</h2>
		</div>
		<ul>
			<li>style elements via class</li>
			<li>css properties like display, border, margins, etc</li>
		</ul>
	</div>
	<div class="flex-row">
		<div class="cut-off">
			<img width="300px" src="./photo-starbucks.avif" alt="" />
			<h2>javascript</h2>
		</div>
		<ul>
			<li>functions are pieces of code that we can run over and over again</li>
			<li>parameters are part of the function signature that the function uses</li>
		</ul>
	</div>
	<div class="flex-row">
		<div class="cut-off">
			<img width="300px" src="./premium_html.avif" alt="" />
			<h2>html</h2>
		</div>
		<ul>
			<li>the basic structure of the web page</li>
			<li>it contains the elements that we use to build the web</li>
		</ul>
	</div>
</div>

<style>
	.portfolio {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	/* media query : in this case, max-width means max size */
	@media (max-width: 1000px) {
		.portfolio {
			/* if the max size is less than 1000 as stated above */
			/* we apply this flex direction property */
			flex-direction: column;
			align-items: center;
		}

		.flex-row {
			margin-bottom: 20px;
		}
	}

	.flex-row {
		display: flex;
		flex-direction: column;
	}

	.cut-off {
		height: 175px;
		overflow: hidden;
		position: relative;
		border-radius: 6px;
		box-shadow: 4px 4px 4px #888;
		/* #RRGGBB */
	}

	h2 {
		position: absolute;
		top: 10px;
		left: 10px;
		color: white;
	}

	ul {
		width: 300px;
		list-style: circle;
		padding-left: 16px;
	}
</style>
