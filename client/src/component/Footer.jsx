import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="boredr border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full gap-3 justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl
        font-semibold data:text-white:"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-indigo-500
         via-purple-500 to bg-pink-500 rounded-lg text-white"
              >
                Shamin's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.Link
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreffer"
              >
                Youtube
              </Footer.Link>
              <Footer.Link
                href="/about"
                target="_blank"
                rel="noopener noreffer"
              >
                Shamin's Blog
              </Footer.Link>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.Link
                href="https://github.com/ShaminAkarsha"
                target="_blank"
                rel="noopener noreffer"
              >
                On GitHub
              </Footer.Link>
              <Footer.Link
                href="https://www.linkedin.com/in/akarsha-shamin-84a824218/"
                target="_blank"
                rel="noopener noreffer"
              >
                On LinkedIn
              </Footer.Link>
              <Footer.Link
                href="https://www.instagram.com/a_k_a_rsha/"
                target="_blank"
                rel="noopener noreffer"
              >
                On Instagram
              </Footer.Link>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.Link href="#" target="_blank" rel="noopener noreffer">
                Privacy
              </Footer.Link>
              <Footer.Link href="#" target="_blank" rel="noopener noreffer">
                Terms &amp; Conditions
              </Footer.Link>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Shamin's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:mt-0  sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
