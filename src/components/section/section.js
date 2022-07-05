import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './section.module.scss';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Section = ({ title, collapsible = false, expanded = false, children, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <Box className={styles.sectionContainer}>
      <Box className="header">
        <h3 className="subtitle">{title}</h3>
        {collapsible && (
          <ExpandMore
            expand={isExpanded}
            onClick={() => setIsExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </Box>
      <Collapse in={isExpanded || !collapsible} timeout="auto" unmountOnExit>
        <Box className={otherProps.className}>{children}</Box>
      </Collapse>
    </Box>
  );
};

export default Section;
