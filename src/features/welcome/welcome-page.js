import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constants';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './welcome-page.module.scss';
import Logo from '../../components/logo';
import Feature from '../../components/Feature';
import TeamMember from '../../components/TeamMember';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.welcome}>
      <div className="gray-bg" />
      <header>
        <Logo />
        <nav className="welcomePageNavigationMenu">
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Features</a></li>
            <li><a href="">Our Team</a></li>
            <li><a href="">Contact</a></li>
            <li>
              <Button variant="contained" onClick={() => navigate(ROUTES.login)}>
                Login
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <body>
        <section className="intro">
          <div>
            <h1>Smart & easy invoice manager</h1>
            <img src="https://picsum.photos/200?random=15" alt="" />
            <p className="body-regular">
              Save time on creating professional invoices, tracking invoice payment status, and managing business
              finances
            </p>
            <Button variant="contained" size="large">Try now for free</Button>
          </div>
        </section>
        <section className="features">
          <Feature
            title="Generate and schedule invoice  quickly"
            text="Billy creates professional invoice in seconds, download as pdf, send to your customers or schedule for recurring invoice."
            imgPath="https://picsum.photos/200?random=1"
            imgAlt=""
          />
          <Feature
            title="Track your payment status"
            text="No need to worry about forget getting paid. Billy helps you keep on eye on pending and overdue payments. Let’s get paid faster!"
            imgPath="https://picsum.photos/200?random=2"
            imgAlt=""
          />
          <Feature
            title="Manage business income and expense"
            text="Billy easily manages all your projects, customers and invoices in one place. Get report of your business income and expense anywhere."
            imgPath="https://picsum.photos/200?random=3"
            imgAlt=""
          />
        </section>
        <section className="madeSimple">
          <h2 className="titleBlack titleCenter">Invoicing made simple</h2>
          <Button variant="contained" className="block buttonCenter">Try now for FREE</Button>
        </section>
        <section className="team">
          <h2 className="titleBlack">Our Team</h2>
          <TeamMember
            memberName="Gabriel Gimenes"
            memberImage="https://picsum.photos/200?random=4"
            memberImageAlt=""
            memberPosition="Project Manager / Developer"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Ashim Karki"
            memberImage="https://picsum.photos/200?random=5"
            memberImageAlt=""
            memberPosition="Lead Developer"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Luisa Rueda"
            memberImage="https://picsum.photos/200?random=6"
            memberImageAlt=""
            memberPosition="Developer"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Karen Garcia"
            memberImage="https://picsum.photos/200?random=7"
            memberImageAlt=""
            memberPosition="Developer"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Mita Trisnodjojo"
            memberImage="https://picsum.photos/200?random=8"
            memberImageAlt=""
            memberPosition="Lead Designer"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Karen Chiu"
            memberImage="https://picsum.photos/200?random=9"
            memberImageAlt=""
            memberPosition="Designer"
            memberLinkedin="Dolor sit"
          />
          <TeamMember
            memberName="Dexter Bolasoc"
            memberImage="https://picsum.photos/200?random=10"
            memberImageAlt=""
            memberPosition="Designer"
            memberLinkedin="Dolor sit"
          />
          <TeamMember
            memberName="Milly Tsou"
            memberImage="https://picsum.photos/200?random=11"
            memberImageAlt=""
            memberPosition="Designer"
            memberLinkedin="Dolor sit"
          />
        </section>
        <section className="contactUs">
          <div>
            <h2 className="titleBlack">Contact us</h2>
            <p>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
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
              fullWidth="true"
              margin="normal"
            />
            <TextField
              className="message"
              id="outlined-textarea"
              label="Message"
              type="text"
              placeholder="Message"
              fullWidth="true"
              margin="normal"
              multiline="true"
              minRows="4"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </section>
      </body>
    </div>
  );
};

export default LandingPage;
