import Footer from "@/components/client/layout/footer";
import NavBar from "@/components/client/layout/navbar/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <>
        <NavBar />
        {children}
        <Footer />
      </>
    </>
  );
}
