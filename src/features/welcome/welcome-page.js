import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../../components/logo';
import Feature from '../../components/Feature';
import TeamMember from '../../components/TeamMember';

import { ROUTES } from 'common/constants';
import styles from './welcome-page.module.scss';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.welcome}>
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
        <section>
          <div>
            <h2>Smart & easy invoice manager</h2>
            <p>
              Save time on creating professional invoices, tracking invoice payment status, and managing business
              finances
            </p>
            <Button variant="contained">Try now for free</Button>
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </section>
        <section>
          <h1>Main Features</h1>
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
        <section>
          <h1>Invoicing made simple</h1>
          <Button variant="contained">Try now for FREE</Button>
        </section>
        <section>
          <h1>Our Team</h1>
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
        <section>
          <div>
            <h2>Contact Billy</h2>
            <p>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
          </div>
          <form action="">
          </form>
        </section>
      </body>
    </div>
  );
};

export default LandingPage;
