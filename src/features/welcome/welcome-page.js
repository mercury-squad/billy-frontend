import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../../components/logo';
import Feature from '../../components/Feature';

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
            name=""
            member_image=""
            
          />
        </section>
      </body>
    </div>
  );
};

export default LandingPage;
