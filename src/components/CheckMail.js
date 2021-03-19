import React, { Component } from "react";
import mail from "../images/mail.png";
import "../CSS/Common.css";

class CheckMail extends Component {
    render(){
        return(

            <html>
	
	<body>
		<div class="wrapper">
			<div class="innerWrapper">
				<div class="area-whole">
					<div class="mailWrap text-center">
						<img src={mail}/>
						<h3>Check your email! <span>We have sent instructions to restore access to your email address</span></h3>
						<a href="" class="btn">Received</a>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
            )
    }
}

export default CheckMail;