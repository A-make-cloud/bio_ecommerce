import React from "react";

const footerHeight = 150;
const footerEltMarginTop = 15;

const div1Style = {
    width: "100vw",
    height: `${footerHeight + footerEltMarginTop}px`,
    backgroundColor: "#346344",
    marginTop: "30px",
    position: "absolute",
};

const div2Style = {
    width: "100%",
    position: "absolute",
    color: "white",
    height: `${footerHeight}px`,
    marginTop: `${footerEltMarginTop}px`,
};
function Footer() {
    return (
        <div style={{ width: "100%" }}>
            <div style={div1Style}>
                <h6>Informations légales</h6>
                <h6>Informations légales</h6>
                <h6>Informations légales</h6>
            </div>
            <div style={div2Style}>
                <div>footer content</div>
                <h6>Informations légales</h6>

                <hr />
            </div>
        </div>
    );
}

export default Footer;