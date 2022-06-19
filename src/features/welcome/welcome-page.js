import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../../components/logo';
import Feature from '../../components/Feature';
import TeamMember from '../../components/TeamMember';

import { ROUTES } from 'common/constants';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <Logo />
        <Button onClick={() => navigate(ROUTES.signup)}>Sign up</Button>
        <Button variant="contained" onClick={() => navigate(ROUTES.login)}>
          Login
        </Button>
      </header>
      <body>
        <section>
          <div>
            <h2>About app</h2>
            <p>Brief description about the app</p>
            <Button variant="contained">Try now for free</Button>
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </section>
        <section>
          <h1>Main Features</h1>
          <Feature
            title="Feature 1"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, corporis blanditiis sapiente provident ullam temporibus nihil esse veritatis suscipit voluptatem!"
            imgPath="https://picsum.photos/200?random=1"
            imgAlt=""
          />
          <Feature
            title="Feature 2"
            text="Vel, inventore placeat, dignissimos repellendus harum eum non expedita, iste accusamus maiores reiciendis laboriosam! Molestias odio ducimus tempore possimus esse!"
            imgPath="https://picsum.photos/200?random=2"
            imgAlt=""
          />
          <Feature
            title="Feature 3"
            text="Atque nesciunt non fugiat dicta! Explicabo, quidem voluptatibus sapiente tenetur doloremque praesentium ut labore rem quis fuga iusto officiis dolore."
            imgPath="https://picsum.photos/200?random=3"
            imgAlt=""
          />
        </section>
        <section>
          <h1>Simplify your projects invoice</h1>
          <Button variant="contained">Try now for free</Button>
        </section>
        <section>
          <h1>Our Team</h1>
          <TeamMember
            memberName="Goku"
            memberImage="https://picsum.photos/200?random=4"
            memberImageAlt=""
            memberPosition="Lorem ipsum"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Kuririn"
            memberImage="https://picsum.photos/200?random=5"
            memberImageAlt=""
            memberPosition="Lorem ipsum"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Bulma"
            memberImage="https://picsum.photos/200?random=6"
            memberImageAlt=""
            memberPosition="Lorem ipsum"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Chichi"
            memberImage="https://picsum.photos/200?random=7"
            memberImageAlt=""
            memberPosition="Lorem ipsum"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Gohan"
            memberImage="https://picsum.photos/200?random=8"
            memberImageAlt=""
            memberPosition="Lorem ipsum"
            memberLinkedin=""
          />
          <TeamMember
            memberName="Vegeta"
            memberImage="https://picsum.photos/200?random=9"
            memberImageAlt=""
            memberPosition="Lorem ipsum"
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
