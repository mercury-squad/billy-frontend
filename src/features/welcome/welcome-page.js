import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constants';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './welcome-page.module.scss';
import LogoSVG from '../../assets/img/logo.svg';
import Logo from '../../components/logo/logo';
import Feature from '../../components/feature';
import TeamMember from '../../components/team-member';
import summaryIllustration from '../../assets/img/billy-summary-welcome-illustration.png';
import feature1Illustration from '../../assets/img/billy-feature-1-illustration.png';
import feature2Illustration from '../../assets/img/billy-feature-2-illustration.png';
import feature3Illustration from '../../assets/img/billy-feature-3-illustration.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      Name: 'Gabriel Gimenes',
      Image: 'https://picsum.photos/500?random=4',
      ImageAlt: '',
      Position: 'Project Manager / Frontend Developer',
      Linkedin: 'https://www.linkedin.com/in/gabrielcgimenes/',
    },
    {
      Name: 'Ashim Karki',
      Image: 'https://picsum.photos/500?random=5',
      ImageAlt: '',
      Position: 'Lead Developer / Backend Developer',
      Linkedin: 'https://www.linkedin.com/in/ashim-karki/',
    },
    {
      Name: 'Luisa Rueda',
      Image: 'https://picsum.photos/500?random=6',
      ImageAlt: '',
      Position: 'Backend Developer',
      Linkedin: 'https://www.linkedin.com/in/luferueda/',
    },
    {
      Name: 'Karen Garcia',
      Image: 'https://picsum.photos/500?random=7',
      ImageAlt: '',
      Position: 'Frontend Developer',
      Linkedin: 'https://www.linkedin.com/in/karengarciam/',
    },
    {
      Name: 'Mita Trisnodjojo',
      Image: 'https://picsum.photos/500?random=8',
      ImageAlt: '',
      Position: 'Lead Designer',
      Linkedin: 'https://www.linkedin.com/in/paramitatrisnodjojo/',
    },
    {
      Name: 'Karen Chiu',
      Image: 'https://picsum.photos/500?random=9',
      ImageAlt: '',
      Position: 'UX Designer',
      Linkedin: 'https://www.linkedin.com/in/karenkwchiu/',
    },
    {
      Name: 'Dexter Bolasoc',
      Image: 'https://picsum.photos/500?random=10',
      ImageAlt: '',
      Position: 'UI/UX Designer',
      Linkedin: 'https://www.linkedin.com/in/dexterbolasoc/',
    },
    {
      Name: 'Milly Tsou',
      Image: 'https://picsum.photos/500?random=11',
      ImageAlt: '',
      Position: 'UI/UX Designer',
      Linkedin: 'https://www.linkedin.com/in/yi-tien-tsou-21aaaa240/',
    },
  ];

  return (
    <div className={styles.welcome}>
      <div className="wrapper">
        <div className="gray-bg" />
        <header>
          <Logo className="welcomeLogo" source={LogoSVG} />
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
        <div>
          <section className="intro">
            <h1>Smart & easy invoice manager</h1>
            <img src={summaryIllustration} alt="" />
            <div>
              <p className="body-regular">
                Save time on creating professional invoices, tracking invoice payment status, and managing business
                finances
              </p>
              <Button variant="contained" size="large">Try now for free</Button>
            </div>
          </section>
          <section className="features">
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
            <Button variant="contained" className="buttonCenter" onClick={() => navigate(ROUTES.login)}>Try now for FREE</Button>
          </section>
          <section className="team">
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
