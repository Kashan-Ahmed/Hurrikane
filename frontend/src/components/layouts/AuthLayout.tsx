import MCIImage from '@/assets/images/msi.png';
import Logo from '@/assets/images/logo.png';
import AuthBg from '@/assets/images/auth-image.jpg';
interface IProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${AuthBg})` }}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black to-black/0"></div>
      {/* <img className="h-[150px] z-10 absolute left-8 top-8" src={MCIImage} alt="Logo"></img> */}
      <div className="fixed inline-flex min-h-[calc(100vh_-_0px)] w-full items-center">
        <div className="w-full">
          <div className="mx-auto max-w-[476px] rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center gap-4">
              <img className="h-20" src={Logo} alt="Logo"></img>
              <img className="h-20" src={MCIImage} alt="Logo"></img>
            </div>
            {children}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center text-xs text-white">
        Copyright © {new Date().getFullYear()} Hurikane Knit | All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;
