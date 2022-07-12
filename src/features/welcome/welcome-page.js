import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from 'common/constants';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './welcome-page.module.scss';
import LogoSVG from '../../assets/img/logo.svg';
import Logo from '../../components/logo/logo';
import Feature from '../../components/feature';
import TeamMember from '../../components/team-member';
import summaryIllustration from '../../assets/img/billy-summary-welcome-illustration.png';
import feature1Illustration from '../../assets/img/billy-feature-1-illustration.png';
import feature2Illustration from '../../assets/img/billy-feature-2-illustration.png';
import feature3Illustration from '../../assets/img/billy-feature-3-illustration.png';
import ashim from '../../assets/img/ashim.jpg';
import dexter from '../../assets/img/dexter.jpg';
import gabriel from '../../assets/img/gabriel.jpg';
import karen from '../../assets/img/karen.jpg';
import kaWing from '../../assets/img/ka-wing.jpg';
import luisa from '../../assets/img/luisa.jpg';
import milly from '../../assets/img/milly.jpg';
import paramita from '../../assets/img/paramita.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState('mobile-nav-menu hidden');

  const teamMembers = [
    {
      Name: 'Gabriel Gimenes',
      Image: gabriel,
      ImageAlt: '',
      Position: 'Project Manager / Frontend Developer',
      Linkedin: 'https://www.linkedin.com/in/gabrielcgimenes/',
    },
    {
      Name: 'Ashim Karki',
      Image: ashim,
      ImageAlt: '',
      Position: 'Lead Developer / Backend Developer',
      Linkedin: 'https://www.linkedin.com/in/ashim-karki/',
    },
    {
      Name: 'Luisa Rueda',
      Image: luisa,
      ImageAlt: '',
      Position: 'Backend Developer',
      Linkedin: 'https://www.linkedin.com/in/luferueda/',
    },
    {
      Name: 'Karen Garcia',
      Image: karen,
      ImageAlt: '',
      Position: 'Frontend Developer',
      Linkedin: 'https://www.linkedin.com/in/karengarciam/',
    },
    {
      Name: 'Mita Trisnodjojo',
      Image: paramita,
      ImageAlt: '',
      Position: 'Lead Designer',
      Linkedin: 'https://www.linkedin.com/in/paramitatrisnodjojo/',
    },
    {
      Name: 'Karen Chiu',
      Image: kaWing,
      ImageAlt: '',
      Position: 'UX Designer',
      Linkedin: 'https://www.linkedin.com/in/karenkwchiu/',
    },
    {
      Name: 'Dexter Bolasoc',
      Image: dexter,
      ImageAlt: '',
      Position: 'UI/UX Designer',
      Linkedin: 'https://www.linkedin.com/in/dexterbolasoc/',
    },
    {
      Name: 'Milly Tsou',
      Image: milly,
      ImageAlt: '',
      Position: 'UI/UX Designer',
      Linkedin: 'https://www.linkedin.com/in/yi-tien-tsou-21aaaa240/',
    },
  ];

  return (
    <div className={styles.welcome}>
      <div className="wrapper">
        <div className="gray-bg" />
        <header id="home">
          <Logo className="welcomeLogo" source={LogoSVG} />
          <div className="hamburger-menu">
            <MenuIcon onClick={() => setToggle('mobile-nav-menu')} />
          </div>
          {toggle ? (
            <nav className={toggle}>
              <FontAwesomeIcon
                icon={faXmark}
                className="fa-icon xMark"
                onClick={() => setToggle('mobile-nav-menu hidden')}
              />
              <ul>
                <li>
                  <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#home">
                    Home
                  </a>
                </li>
                <li>
                  <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#features">
                    Features
                  </a>
                </li>
                <li>
                  <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#ourTeam">
                    Our Team
                  </a>
                </li>
                <li>
                  <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#contact">
                    Contact
                  </a>
                </li>
                <li>
                  <Button variant="contained" fullWidth size="large" onClick={() => navigate(ROUTES.login)}>
                    Login
                  </Button>
                </li>
              </ul>
            </nav>
          ) : (
            <div />
          )}
          <nav className="welcome-page-navigation-menu">
            <ul>
              <li>
                <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#home">
                  Home
                </a>
              </li>
              <li>
                <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#features">
                  Features
                </a>
              </li>
              <li>
                <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#ourTeam">
                  Our Team
                </a>
              </li>
              <li>
                <a onClick={() => setToggle('mobile-nav-menu hidden')} href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <Button variant="contained" onClick={() => navigate(ROUTES.login)}>
                  Login
                </Button>
              </li>
            </ul>
          </nav>
        </header>
        <div>
          <section className="intro">
            <h1>Smart & easy invoice manager</h1>
            <img src={summaryIllustration} alt="" />
            <div>
              <p className="body-regular">
                Save time on creating professional invoices, tracking invoice payment status, and managing business
                finances
              </p>
              <Button variant="contained" size="large" onClick={() => navigate(ROUTES.login)}>
                Try now for free
              </Button>
            </div>
          </section>
          <section className="features" id="features">
            <Feature
              className="feature"
              title="Generate and schedule invoice  quickly"
              text="Billy creates professional invoice in seconds, download as pdf, send to your customers or schedule for recurring invoice."
              imgPath={feature1Illustration}
              imgAlt=""
            />
            <Feature
              className="feature-inverted feature"
              title="Track your payment status"
              text="No need to worry about forget getting paid. Billy helps you keep on eye on pending and overdue payments. Let’s get paid faster!"
              imgPath={feature2Illustration}
              imgAlt=""
            />
            <Feature
              className="feature"
              title="Manage business income and expense"
              text="Billy easily manages all your projects, customers and invoices in one place. Get report of your business income and expense anywhere."
              imgPath={feature3Illustration}
              imgAlt=""
            />
          </section>
          <section className="madeSimple">
            <h2 className="titleBlack titleCenter">Invoicing made simple</h2>
            <Button variant="contained" className="buttonCenter" onClick={() => navigate(ROUTES.login)}>
              Try now for FREE
            </Button>
          </section>
          <section className="team" id="ourTeam">
            <div className="our-team-wrapper">
              <h2 className="titleBlack">Our Team</h2>
              {teamMembers.map((member) => (
                <TeamMember
                  key={member.Name}
                  memberName={member.Name}
                  memberImage={member.Image}
                  memberImageAlt={member.ImageAlt}
                  memberPosition={member.Position}
                  memberLinkedin={member.Linkedin}
                />
              ))}
            </div>
          </section>
          <section className="contactUs" id="contact">
            <div>
              <h2 className="titleBlack">Contact us</h2>
              <p>
                We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
              </p>
            </div>
            <form action="">
              <TextField
                className="firstName"
                id="outlined-password-input"
                label="First Name"
                type="text"
                placeholder="First Name"
                margin="normal"
              />
              <TextField
                className="lastName"
                id="outlined-password-input"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                margin="normal"
              />
              <TextField
                className="email"
                id="outlined-password-input"
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
                margin="normal"
              />
              <TextField
                className="message"
                id="outlined-textarea"
                label="Message"
                type="text"
                placeholder="Message"
                fullWidth
                margin="normal"
                multiline
                minRows="4"
              />
              <Button variant="contained" type="submit" size="large">
                Submit
              </Button>
            </form>
          </section>
        </div>
        <div className="footer-welcome-page">
          <p className="footer-text">InvoiceBilly©2022</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
