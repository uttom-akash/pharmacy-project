import React, { Component } from 'react';
import '../css/Footer.css'
import ToolTip from '../../unitComp/tooltip/ToolTip';


export default  ()=> {
        return (
            <div className="footer-container">
                        <div className="footer">
                                <div className="con-soc">
                                    <div className="contact">
                                        <h4>Contact</h4>

                                        <div>
                                            <i className="fas fa-phone"></i>
                                            <label>0171999999</label>
                                        </div>

                                        <div>
                                            <i className="fas fa-envelope"></i>
                                            <label>email@email.com</label>
                                        </div>
                                    </div>

                                    <div className="social">
                                        <h4>stay in touch</h4>
                                        <div className="ttip">
                                            <ToolTip url="https://www.twitter.com" icon="fab fa-twitter" text="twitter" target="twitter" />
                                            <ToolTip url="https://www.facebook.com" icon="fab fa-facebook-f" text="facebook" target="facebook" />
                                        </div>
                                    </div>

                                </div>

                                <div className="about">
                                    <h4>About</h4>
                                    <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                                    <a href="">readmore..</a>
                                </div>

                        </div>
            </div>
        );
    }

