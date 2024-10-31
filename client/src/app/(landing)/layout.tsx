import NavBar from "@/components/nav-bar";


function LandingLayout({ children }:{children: React.ReactNode}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default LandingLayout;