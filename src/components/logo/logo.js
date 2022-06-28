import LogoSVG from 'assets/img/logo.svg';

const Logo = ({ className, source = LogoSVG }) => {
  return (
    <div className={className}>
      <img src={source} alt="Logo" />
    </div>
  );
};

export default Logo;
