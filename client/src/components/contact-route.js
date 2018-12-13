import React, { Component } from "react";

class ContactRoute extends Component {
  render() {
    return (
      <div className="route route__contact">
        <div className="squish-my-burrito">
          <form>
            <label className="tomato-vampires give-it-a-bit-more">Form doesn't actually work</label>
            <label className="label-loving" for="name-input">Name:</label>
            <input className="give-it-a-bit-more contact-schmontact" id="name-input" type="text"/>
            <label className="label-loving" for="email-input">Email:</label>
            <input className="give-it-a-bit-more contact-schmontact" id="email-input" type="text"/>
            <label className="label-loving" for="comment-input">Comment:</label>
            <textarea rows="10" className="give-it-a-bit-more contact-schmontact" id="comment-input" type="text"></textarea>
            <input type="submit" />
          </form>
          <div>
            <p>
              Text or call: <a className="lunk" href="tel:404-565-4762">404-565-4762</a>
              <small className="hide-a-bit">&nbsp;already regretting it</small>
            </p>
            <p>
              Email:&nbsp;
              <a className="lunk" href="mailto:manufacturedba@gmail.com?Subject=Not%20a%20Spam%20Bot" target="_top">
                manufacturedba@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactRoute;
