import React, { Component } from "react";
import recovery from "../images/recovery.png";
import "../CSS/Common.css";

class AccountRecovery extends Component {
    render(){
        return(
            <html>
	
	    <body>
		<div class="wrapper">
			<div class="innerWrapper">
				<div class="area-left">
					<img src={recovery}/>
					<div class="fGalleryText">
						<h3>entitled</h3>
					</div>
				</div>
				<div class="area-right">
					<div class="formArea">
						<h3>Account recovery <span>Let's find your account enter your email</span></h3>
						<form action="">
						  	<div class="form-group">
						    	<label for="email">Email</label>
						    	<input type="email" class="form-control" placeholder="Please enter email" id="email"/>
						  	</div>
						  	<button type="submit" class="btn">Recover by email</button>
						</form>
						<p class="text-center"><a href="">Back to login</a></p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
            )
    }
}

export default AccountRecovery;