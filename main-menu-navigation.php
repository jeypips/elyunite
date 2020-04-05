<div class="main-menu-area mg-tb-40">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<?php
					$home = ($page=='dashboard')||($page=='surveys');
					$maintenance = ($page=='groups')||($page=='accounts')||($page=='offices');					
				?>				
				<ul class="nav nav-tabs notika-menu-wrap menu-it-icon-pro">
					<li class="<?=($home)?'active':''?>"><a data-toggle="tab" href="#Home"><i class="fa fa-home"></i> Home</a></li>
					<li class="<?=($maintenance)?'active':''?>"><a data-toggle="tab" href="#Maintenance"><i class="fa fa-cogs"></i> Maintenance</a></li>
				</ul>
				<div class="tab-content custom-menu-content">			
					<div id="Home" class="tab-pane notika-tab-menu-bg animated flipInX <?=($home)?'active':''?>">
						<ul class="notika-main-menu-dropdown">
							<li><a href="index.html">Dashboard</a></li>
							<li><a href="surveys.html">Surveys</a></li>							
						</ul>
					</div>
					<div id="Maintenance" class="tab-pane notika-tab-menu-bg animated flipInX <?=($maintenance)?'active':''?>">
						<ul class="notika-main-menu-dropdown">
							<li><a href="groups.html">Groups</a></li>
							<li><a href="accounts.html">Accounts</a></li>
							<li><a href="offices.html">Offices</a></li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>