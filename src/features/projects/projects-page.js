import { useEffect } from 'react';
import { useOutletContext } from 'react-router';

const PAGE_TITLE = 'Projects';
const Projects = () => {
  const [setHeaderTitle] = useOutletContext();

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);
  return (
    <div>
      <p>Projects page</p>
    </div>
  );
};

export default Projects;
