import { Footer } from "flowbite-react";
const kettu = require("../img/kettu_wallpaper.jpg");

const Foot = () => {
  return (
    <Footer
      container={true}
      className="rounded-none bg-center"
      style={{ backgroundImage: `url(${kettu})` }}
    >
      <Footer.Copyright
        href="http://github.com/reijjo"
        by="Reijjo™"
        year={2023}
      />
      <Footer.LinkGroup>
        {/* <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link> */}
      </Footer.LinkGroup>
    </Footer>
  );
};

export default Foot;
